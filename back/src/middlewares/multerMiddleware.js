import multer from "multer";
import path from "path";

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, "upload/"); 
    },

    filename(req, file, callback) {
      const ext = path.extname(file.originalname);
      const filename = path.basename(file.originalname, ext) + '_' + new Date().valueOf() + ext;
      callback(null, filename);
    }
  }),
    
  limits: { fileSize: 3 * 1024 * 1024 }
})

export { upload };
