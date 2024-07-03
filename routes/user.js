const express = require("express");
const router = express.Router();
//all user routes ...none other....home route in index.js
const {handleSignup,handlelogin, handlelogout} = require("../controllers/user")
const {renderSignup,renderlogin} = require("../controllers/static_render");

const multer  = require('multer');
const path = require("path");
const storage = multer.diskStorage({

    destination: function (req, file, cb) {
      cb(null, path.resolve("./public/images/"))  // public >> upload >> / me save kariyo uploading file
    },

    filename: function (req, file, cb) {
      const fileName = `${Date.now()}-${file.originalname}` 
      cb(null, fileName)
    }
  })


  const upload = multer({ storage: storage })   // dont forget enctype="multipart/form-data"


router.post("/signup",upload.single('profileImage'),handleSignup);
router.post("/login",handlelogin);
router.get("/logout",handlelogout);


router.get("/signup",renderSignup);
router.get("/login",renderlogin);

module.exports = router;