const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const path = require("path");
const userRouter = require("./routes/user");
const staticRouter = require("./routes/static_render");


const app = express();
const port = 8000;

//mongodb connection
mongoose.connect("mongodb://localhost:27017/BLOGGO")
        .then((e)=>console.log("mongodb connected"));

//middleware
app.use(express.urlencoded({extended:false}));
app.use(express.json());


//ejs
app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

//routes
app.use('/user',userRouter);
app.use('/',staticRouter)



app.listen(port,()=>{console.log(`server is listened at http://localhost:${port}`)})