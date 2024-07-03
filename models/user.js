
const createHmac = require("create-hmac");
const mongoose = require("mongoose");
const { randomBytes } = require("crypto"); 
const {createTokenForUser,validateToken} =require("../service/auth");

const userSchema = new mongoose.Schema({

    
    email:{
        type: String,
        required:true
    },
    fullname:{
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
        type: String,
        // default:"/images/default_profile.png"
        required: false
    },
    role:{
        type: String,
        enum:["USER","ADMIN"],
        default:"USER"
    },
},{timestamps:true})


//"save hone se pehle"--make hashpassword(salt + password) using createHmac(sha224)
userSchema.pre("save", function(next) {
    const user = this; // represent user itself
    if (!user.isModified("password")) {
        return next();
    }

    const salt = randomBytes(16).toString("hex"); // Ensure the salt is a hex string
    const hashed_password = createHmac("sha256", salt).update(user.password).digest("hex");

    user.salt = salt; // Ensure the correct context is used
    user.password = hashed_password;

    next();
});


//salt---- is used to "protect" our "password" in "database"
//token---- is used for authentication(verifying our login)

userSchema.static("matchPasswordAndCreateToken",async function(email,password){
     const Loginuser = await this.findOne({email});                        //async and await is must to use everywhere
     if(!Loginuser){throw new Error("Incorrect password");};    // now 2-person password can same ...but email is uique...
                                                               //so firstly we check email exist or not ...if not then throw "same error" on "password unmatch"
     const stored_salt = Loginuser.salt;
     const stored_hashed_password = Loginuser.password;

     const hashing_user_password = createHmac("sha256",stored_salt).update(password).digest("hex");

     if(stored_hashed_password !== hashing_user_password)
        {
            throw new Error("Incorrect password");
        }

     const token = createTokenForUser(Loginuser);
     
     return token;
})


const User = mongoose.model("User",userSchema);
module.exports = User;