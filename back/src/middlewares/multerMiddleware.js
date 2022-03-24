import multer from "multer";
import path from "path";

const nameField = "profile";

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "uploads/"); 
    },

    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      const filename = path.basename(file.originalname, ext) + '-' + new Date().valueOf() + ext;
      cb(null, filename);
    }
  }),
    
  limits: { fileSize: 3 * 1024 * 1024 },
})

export { upload, nameField };
