import multer from "multer"
import path from "path"

const upload = multer({
  storage: multer.diskStorage({  // 이미지 저장 정보 설정
    destination(req, file, done) { 
      done(null, "uploads/"); 
    },
    filename(req, file, done) {   // 이미지 이름 설정
      const ext = path.extname(file.originalname);
      const filename = path.basename(file.originalname, ext) + '-' + new Date().valueOf() + ext;
      done(null, filename); // 파일 이름 지정
    }
  }),
  limits: { fileSize: 3 * 1024 * 1024 },
});

const nameField = "myImg";

export { upload, nameField };