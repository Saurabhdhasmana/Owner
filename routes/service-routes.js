const express=require("express");
let {cpUpload}=require("./multer");
const router=express.Router();
const {service,servicepost,servicefind, servicefindone,serviceupdate,servicedelete}=require("../controllers/service-controllers");

router.get("/",service);
router.post("/", cpUpload, servicepost)
router.get("/servicepage", servicefind);
router.get("/edit/:id", servicefindone);
router.post("/edit1/:id", cpUpload, serviceupdate);
router.get("/delete/:id1", servicedelete);

module.exports=router;