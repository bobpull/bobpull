import express from "express";
const router = express.Router();
const multer = require("multer");

// multer-optional
var storage = multer.diskStorage({
 destination: (req, file, cb) => {
   cb(null, "uploads/");
 },
 filename: (req, file, cb) => {
   cb(null, `${Date.now()}_${file.originalname}`);
 },
});
var upload = multer({ storage: storage }).single("profile_img");

// Router
router.post("/", (req, res) => {
 upload(req, res, (err) => {
   if (err) {
     return res.json({ success: false, err });
   }
   return res.json({
     success: true,
     image: res.req.file.path,
     fileName: res.req.file.filename,
   });
 });
});

export default router;