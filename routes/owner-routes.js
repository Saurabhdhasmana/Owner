const express =require("express");
let router = express.Router();
const isloggedIn=require("../middlewares/isloggedin");
const {app1,login,ownerlogin,postlogin,logout,middleware}=require("../controllers/owner-controllers");

router.get("/", app1);
router.get("/login", login);
router.post("/register",ownerlogin );
router.post("/login",postlogin);
router.get("/profile", isloggedIn, middleware);
router.get("/logout", logout);

module.exports=router;