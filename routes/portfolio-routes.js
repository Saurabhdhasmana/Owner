const express=require("express");
const Portmodel=require("../models/portfolio-models");
let {upload}=require("./multer");
const router=express.Router();
const {portfolio,portlogin,portfind,portedit,portupdate,portdelete}=require("../controllers/portfolio-controllers");

router.get("/",portfolio);
router.post("/", upload.single("image"), portlogin);
router.get("/portfolio1",portfind );
router.get("/edit2/:id", portedit);
router.post("/edit2/:id", upload.single("image"),portupdate )
router.get("/delete1/:id",portdelete);

module.exports=router;