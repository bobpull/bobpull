const nodemailer = require("nodemailer");
import 'dotenv/config'

// nodemailer로 gmail transport 생성하기
const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.NODEMAILER_ID,
    pass: process.env.NODEMAILER_PW,
  },
});

module.exports = (to, subject, text) => new Promise((resolve, reject) => {
  const message = {
    to,
    subject,
    text,
  };

  transport.sendMail(message, (err, info) => {
    if (err) {
      reject (err);
      return;
    }

    resolve(info);
  })
})