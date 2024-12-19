const multer =require("multer");
const crypto=require("crypto");
const path=require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/uploads')
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(12,(err,bytes)=>{
     let temp= bytes.toString("hex")+path.extname(file.originalname);
          cb(null,temp);
     })
  }
})

const upload = multer({ storage: storage })
const cpUpload = upload.fields([  // Only 1 file for avatar
  { name: 'image', maxCount: 8 }   // Up to 8 files for gallery
]);
module.exports={cpUpload,upload};