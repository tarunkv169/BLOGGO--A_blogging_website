const mongoose = require("mongoose");


const commentSchema = new mongoose.Schema({
    content:{
        type: String,
        required: true
    }, 
    blogId:{                                     // kis pe comment kiya
        type: mongoose.Schema.Types.ObjectId,   
        ref: "Blog"
    },
    createdby:{                                 // kisne comment kiya
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

},{timestamps:true})


const Comment = mongoose.model("Comment",commentSchema);
module.exports = Comment