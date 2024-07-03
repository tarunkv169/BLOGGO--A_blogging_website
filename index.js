const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const path = require("path");
const userRouter = require("./routes/user");
const blogRouter = require("./routes/blog");
const cookieParser = require("cookie-parser");
const { checkAuthentication } = require("./middleware/auth");
const Blog = require("./models/blog");


const app = express();
const port = 8000;

//mongodb connection
mongoose.connect("mongodb://localhost:27017/BLOGGO")
        .then((e)=>console.log("mongodb connected"));

//middleware
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cookieParser())
app.use(checkAuthentication("token"));
app.use(express.static(path.resolve("./public")))    // useful for images ...i.e public me jo hai usse static parse kardo
 

//ejs
app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

//routes
app.use('/user',userRouter);

app.get("/", async (req,res)=>{
    const allBlogs = await Blog.find({});          // using ➡️find({}) pick from database and send to 💯render💯
    res.render("home",{user: req.user, blogs: allBlogs})  //<%# 💯see "viewblog.ejs render callback" here u see how to pick "particular blog" by id from database💯 %>
})                     // user: req.user is useful in navbar(not to show create account or login when already login)


app.get("/myblog/:id", async (req, res) => {
    try {
      const userId = req.params.id;
      console.log(userId)
      const userBlogs = await Blog.find({ createdby: userId });
      console.log(userBlogs);
      res.render("myblog", { user: req.user, blogs: userBlogs });

    } catch (error) {

      console.error("Error fetching blog by ID:", error);
      res.status(500).send("Internal Server Error");
    }
  });                 // user: req.user is useful in navbar(not to show create account or login when already login)

app.use("/blog",blogRouter);


app.listen(port,()=>{console.log(`server is listened at http://localhost:${port}`)})