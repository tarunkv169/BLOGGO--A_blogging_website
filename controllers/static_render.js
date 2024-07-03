const User = require("../models/user");
const Blog = require("../models/blog");
const Comment = require("../models/comment");



async function renderSignup(req,res)
{
   return res.render("signup");
}


async function renderlogin(req, res)
{
    return res.render("login");
}

async function renderAddBlog(req,res)
{
    return res.render("addblog",{user: req.user});  // user: req.user is useful in navbar(not to show create account or login when already login)
 }

async function renderViewBlog(req,res)
{
    const blog = await Blog.findById(req.params.id).populate("createdby"); //✨ Blog Schema contains createdby(which we populate with data who create blog)
    const blogId = req.params.id;
    const All_Comments = await Comment.find({blogId: blogId}).populate("createdby");

    console.log(All_Comments)
    return res.render("viewblog",{user: req.user,blog: blog, comments: All_Comments});  // user: req.user is useful in navbar(not to show create account or login when already login)
}


module.exports = {
    renderSignup,
    renderlogin,
    renderAddBlog,
    renderViewBlog
}