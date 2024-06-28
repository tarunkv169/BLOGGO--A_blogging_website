const express = require("express");
const router = express.Router();
const {renderHome,renderSignup,renderlogin} = require("../controllers/static_render");

router.get("/",renderHome)
router.get("/signup",renderSignup);
router.get("/login",renderlogin);


module.exports = router;

