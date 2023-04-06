const config = require("config");
const nodemailer = require("nodemailer");
// const sgMail = require("@sendgrid/mail");

// sgMail.setApiKey(config.get("Email.password"));

async function sendEmail(to, from, subject, data) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: config.get("Email.username"),
      pass: config.get("Email.password"),
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  let info = await transporter.sendMail({
    from: config.get("Email.username"),
    to: to,
    subject: subject,
    text: "",
    html: data,
  });

  console.log("Message sent: %s", info);
  //   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

// async function sendEmail(to, from, subject, data) {
//     console.log(to);
//     const msg = {
//         to: to,
//         from: config.get("Email.username"), // Change to your verified sender
//         subject: subject,
//         html: data,
//     };
//     try {
//         sgMail.send(msg).then(res => console.log(res));
//         console.log("mail send")
//     } catch (error) {
//         console.log(err);
//         throw error;
//     }
// }

exports.sendEmail = sendEmail;

// iyminappdev*123#
