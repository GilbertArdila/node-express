const nodemailer = require("nodemailer");
const {config} = require('./src/config/config');
// async..await is not allowed in global scope, must use a wrapper
async function sendMain() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure: true, // true for 465, false for other ports
    port: 465,
    auth: {
        user: config.mailAdress,
        pass: config.mailPassword
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "gilbertferney@gmail.com" , // sender address
    to: "gilbertardila@yahoo.es", // list of receivers
    subject: "Hello this is a proobe mail ✔", // Subject line
    text: "Hello world from nodejs", // plain text body
    html: "<h1>Hello world</h1><br/><p>from nodejs</p>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

sendMain()
