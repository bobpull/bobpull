import multer from "multer"
import path from "path"

const upload = multer({
  storage: multer.diskStorage({  
    destination(req, file, cb) { 
      cb(null, 'uploads/profile_img'); 
    },
    
    filename(req, file, cb) {   
      const ext = path.extname(file.originalname); 
      const user_id = req.params.id
      cb(null, user_id + "_" + Date.now() + ext);
    }
  }),
});

export { upload }