import multer from "multer"
import path from "path"

const upload = multer({
  storage: multer.diskStorage({  // 이미지 저장 정보 설정
    destination(req, file, done) { 
      done(null, 'uploads/profile_img'); 
    },
    filename(req, file, done) {   // 이미지 이름 설정
      const ext = path.extname(file.originalname); 
      const user_id = req.params.id
      done(null, user_id + "_" + Date.now() + ext); // userId + 날짜 + 확장자 이름으로 저장
    }
  }),
});

export { upload }