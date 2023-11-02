const nodemailer = require("nodemailer");
require("dotenv").config();


const {EMAIL_API_USER, EMAIL_API_PASSWORD} = process.env;

const sendEmail = async ({to, subject, html}) => {

    const email = {
        to, 
        from: "info@book.club.com",
        subject,
        html
    };

      const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        secure: false,
        auth: {
          user: EMAIL_API_USER,
          pass: EMAIL_API_PASSWORD
        }
      });

    const response = await transport.sendMail(email);
    console.log(response);
};


module.exports = sendEmail;