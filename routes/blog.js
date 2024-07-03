const express = require("express");
const router = express.Router();
const {renderAddBlog,renderViewBlog} = require("../controllers/static_render");
const {handleAddBlog,handleAddComment} = require("../controllers/blog");

const multer  = require('multer');
const path = require("path");
const storage = multer.diskStorage({

    destination: function (req, file, cb) {
      cb(null, path.resolve("./public/uploads/"))  // public >> upload >> / me save kariyo uploading file
    },

    filename: function (req, file, cb) {
      const fileName = `${Date.now()}-${file.originalname}` 
      cb(null, fileName)
    }
  })


  const upload = multer({ storage: storage })   // dont forget enctype="multipart/form-data"




router.get("/add-new",renderAddBlog);
router.get("/:id",renderViewBlog);

router.post("/add-new",upload.single('coverImageUrl'),handleAddBlog);
router.post("/comment/:blogId",handleAddComment);


module.exports = router;