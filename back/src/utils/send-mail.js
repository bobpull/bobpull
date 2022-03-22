const nodemailer = require("nodemailer");

// nodemailer로 gmail transport 생성하기
const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "elice4thteamsmail@gmail.com",
    pass: "kqeyiihkfyafjmwy",
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