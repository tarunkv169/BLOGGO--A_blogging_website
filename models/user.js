
const createHmac = require("create-hmac");
const mongoose = require("mongoose");
const { randomBytes } = require("crypto"); 

const userSchema = new mongoose.Schema({
    fullname:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    salt:{
        type: String,
        // required:true  //no need
    },
    password:{
        type: String,
        required:true
    },
    profileImage:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"../public/profile/default_profile.png"
    },
    role:{
        type: String,
        enum:["USER","ADMIN"],
        default:"USER"
    },
},{timestamps:true})


//"save hone se pehle"--make hashpassword(salt + password) using createHmac(sha224)
userSchema.pre("save", async function(next) {
    const user = this; // represent user itself
    if (!user.isModified("password")) {
        return next();
    }

    const salt = randomBytes(16).toString("hex"); // Ensure the salt is a hex string
    const hashed_password = createHmac("sha256", salt).update(user.password).digest(hex);

    user.salt = salt; // Ensure the correct context is used
    user.password = hashed_password;

    next();
});


userSchema.static("matchpassword",async function(email,password){
     const user = await this.findOne({email});                        //async and await is must to use everywhere
     if(!user){return false};

     const stored_salt = user.salt;
     const stored_hashed_password = user.password;

     const hashing_user_password = createHmac("sha256",stored_salt).update(password).digest(hex);

     if(stored_hashed_password !== hashing_user_password)
        {
            throw new Error("Incorrect password");
        }


     return {...user,password: undefined,salt: undefined}
})


const User = mongoose.model("User",userSchema);
module.exports = User;