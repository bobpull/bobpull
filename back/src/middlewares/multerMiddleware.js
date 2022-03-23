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

// const singleUpload =  (req, res, next) => {
//     try{
//         //반드시! input 요소의 name 필드 값을 req.body.inputName에 넘겨줘야 한다!
//         // const nameField = req.body.inputName ?? null; 
//         // if(nameField === null){
//         //     res.status(400).send('요청 body에 InputName 속성을 지정해주지 않았습니다.');
//         //     return;
//         // } 
//         //console.log(req.body);
//         const nameField = "myImg";
        
//         //넘겨준 inputName 값을 가진 파일을 받아와 destination에 저장하고, 파일의 정보를 req.file에 담는다.
//         return upload.single(nameField)(req, res, next);
        
//     } catch(e) {
//         res.status(400).send('단일 파일 업로드를 실패했습니다. 파일 크기는 3MB 이하입니다.');
//         return;
//     }
// }

const nameField = "myImg";

export { upload, nameField };
