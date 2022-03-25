const AWS = require('aws-sdk');
const fs = require('fs')

const BUCKET_NAME = 'llndqoqbucket'
AWS.config.update({
  region:         'ap-northeast-2',
  accessKeyId:    'AKIAWAZJXPLP526VT45L',
  secretAccessKey:'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'
})

const filename = 'testimage' // 버킷에 저장할 이름
const imageStream = fs.createReadStream('./rice.jpg')  // 버킷에 업로드할 이미지
const params = { Bucket:BUCKET_NAME, Key:filename, Body:imageStream, ContentType: 'image' }
const upload = new AWS.S3.ManagedUpload({ params });
upload.promise()
console.log("돌아는 가는지 확인")