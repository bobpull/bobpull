import multer from "multer"
import path from "path"

const upload = multer({
  storage: multer.diskStorage({  
    destination(req, file, done) { 
      done(null, "uploads/profile_img"); 
    },
    filename(req, file, done) {   
      const ext = path.extname(file.originalname); 
      const user_id = req.params.id
      done(null, user_id + "_" + Date.now() + ext); 
    }
  }),
});

export { upload }