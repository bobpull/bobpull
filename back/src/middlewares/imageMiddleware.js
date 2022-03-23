import AWS from "aws-sdk";
import path from "path";
import multer from "multer";
import multerS3 from "multer-s3";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

const endpoint = new AWS.Endpoint('https://kr.object.ncloudstorage.com');

const S3 = new AWS.S3({
  endpoint: endpoint,
  region: 'kr-standard',
  credentials: {
    accessKeyId : process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

const bucketName = 'bobpull';

const upload = multer({
  storage: multerS3({
    s3: S3,
    bucket: bucketName,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      cb(null, uuidv4() + path.extname(file.originalname))
    },
  }),
  limits: { fileSize: 5 * 256 * 256 },
})

const delImg = async (req, res, next) => {
  let objectKey = null;
  if (req.body.prevImage) {
    objectKey = req.body.prevImage.split("/").slice(-1)[0];
  } else if (req.params.id) {
    objectKey = req.params.id;
  }
  
  if (objectKey) { 
    S3.deleteObject({
      Bucket : bucketName,
      Key: objectKey,
    }, function(err, data){
      if (err) console.log(err);
    });
  }
  next();
}

export { upload, delImg };