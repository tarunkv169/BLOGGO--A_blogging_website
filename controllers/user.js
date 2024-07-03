const User = require("../models/user");


async function handleSignup(req,res)
{ 
    try {
        const { fullname,email, password} = req.body;

        console.log("Received signup data:", { fullname, email, password });
        const profileImage = req.file ? `/images/${req.file.filename}` : `/images/default_profile.png`; // Get the uploaded file path
        const new_user = await User.create(              // while create "dbs of user" 
            {                                            //we need to include all which Schema contain (exclude: default,required:false)
                fullname, 
                email, 
                password,
                profileImage
                
            });
         
        console.log("Created user:", new_user);
        if (!new_user) { return res.redirect("/signup"); }

        return res.redirect("/user/login");

    } catch (error) {
        console.error("Error during signup:", error);
        return res.status(400).send("Signup failed. Please try again.");
    }

}


async function handlelogin(req,res)
{
    const {email,password} = req.body;

    try {
        const token = await User.matchPasswordAndCreateToken(email,password);
        res.cookie("token",token);
        return res.redirect("/");

    } catch (error) {              //this error is used show alert if not authenticate with token
        // console.error("Error during login:", error);
        return res.render("login", { error: "Incorrect email and password" });
    }
}


async function handlelogout(req,res)
{
    res.clearCookie("token");

    return res.redirect("/");
}


module.exports={
    handleSignup,
    handlelogin,
    handlelogout
}