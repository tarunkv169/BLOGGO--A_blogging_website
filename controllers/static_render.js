const User = require("../models/user");

async function renderHome(req,res)
{
    return res.render("home")
}

async function renderSignup(req,res)
{
   return res.render("signup");
}


async function renderlogin(req,res)
{
   return res.render("login");
}

module.exports = {
    renderHome,
    renderSignup,
    renderlogin
}