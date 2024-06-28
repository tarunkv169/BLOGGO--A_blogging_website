const User = require("../models/user");


async function handleSignup(req,res)
{ 
    try {
        const { fullname, email, password } = req.body;
        const new_user = await User.create({ fullname, email, password });

        // if (!new_user) { return res.redirect("/signup"); }

        return res.redirect("/");
    } catch (error) {
        console.error("Error during signup:", error);
        return res.status(400).send("Signup failed. Please try again.");
    }

}


async function handlelogin(req,res)
{
    const {email,password} = req.body;

    const check_user = User.matchpassword(email,password);


    if(!check_user){ return res.redirect("/login")};

    return res.redirect("/");
}



module.exports={
    handleSignup,
    handlelogin
}