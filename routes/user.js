const express = require("express");
const router = express.Router();
const {handleSignup,handlelogin} = require("../controllers/user")

router.post("/signup",handleSignup);
router.post("/login",handlelogin);

module.exports = router;