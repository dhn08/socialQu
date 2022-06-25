import nodemailer from "nodemailer";

export const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMPT_MAIL, // generated ethereal user
      pass: process.env.SMPT_PASSWORD, // generated ethereal password
    },
    service: process.env.SMPT_SERVICE,
    /*
    var transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "f9409f20dc4d5e",
    pass: "ddb15ee8baba1f"
  }
});*/
  });
  const mailOption = {
    from: process.env.SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  await transporter.sendMail(mailOption);
};
