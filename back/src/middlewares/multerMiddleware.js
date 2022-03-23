import multer from "multer";
import path from "path";

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/'); //파일이 저장될 폴더 경로 지정, 'uploads/' 폴더 없으면 에러남!
    },

    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      const filename = path.basename(file.originalname, ext) + '-' + new Date().valueOf() + ext;
        cb(null, filename); //파일 이름 지정
      }
    }),
    // 아래는 Byte 단위로, 3MB 까지만 가능하며 그보다 크면 에러발생
  limits: { fileSize: 3 * 1024 * 1024 },
})

const nameField = "myImage";

export { upload, nameField };
