const Blog = require("../models/blog");
const Comment = require("../models/comment")


   async function handleAddBlog(req,res)
   {
      const {title,body} = req.body;
      
      if(!title || !body){ return res.redirect("/blog/add-new")};

      const newBlog = await Blog.create({    // ➡️ save in database....it pick up from database at 💯index.js "render home"💯
            title,
            body,
            createdby: req.user._id,     // "user's req" id
            coverImageUrl: `/uploads/${req.file.filename}`, // public >> upload >> "user's req" me "file" upload "filename"
          }) ;
   
      //  return res.redirect("/");
      return res.redirect(`/blog/${newBlog._id}`);
   }

   

   async function handleAddComment(req, res) {
      console.log("Request Body:", req.body);  // Add this line for debugging
       const { content } = req.body;
   
       if (!content) {
           return res.redirect(`/blog/${req.params.blogId}`);
       }
   
       const new_comment = await Comment.create({
           content: content,
           blogId: req.params.blogId,
           createdby: req.user._id
       });
   
       return res.redirect(`/blog/${req.params.blogId}`);
   }
   
   module.exports = {
       handleAddBlog,
       handleAddComment
   };
   


module.exports = {
    handleAddBlog,
    handleAddComment
}

