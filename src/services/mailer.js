const configs = require("../configs/global.dev.json");
const nodeMailer = require("nodemailer");
const sendMail = async ({ from = configs.mail, to, subject, text }) => {
  return new Promise((resolve, reject) => {
    const transporter = nodeMailer.createTransport({
      service: configs.type,
      auth: {
        user: configs.mail,
        pass: configs["password:"],
      },
    });
    transporter.sendMail(
      { from: from, to: to, subject: subject, html: text },
      function (error, info) {
        if (error) {
          console.log(error);
          resolve(false);
        } else {
          console.log("Email sent: " + info.response);
          resolve(true);
        }
      }
    );
  });
};
module.exports = {
  sendMail: sendMail,
};
