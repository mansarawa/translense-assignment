
import nodemailer from "nodemailer";
import dotenv from 'dotenv'

dotenv.config()
const otpMail = async (email,otp) => {


    const transporter = nodemailer.createTransport({
        service: "gmail",
        secure: true,
        port: 465,
        auth: {
            user: "rawamansa@gmail.com",
            pass: process.env.APP_PASSWORD
        }
    });
const name=getNameFromEmail(email);
    const mailOptions = {
        from: "rawa@gmail.com",
        to: email,
        subject: "OTP For smartX",
        html: `Hello, your otp is <strong>${otp}</strong>`
       
    };

    sendMail(transporter, mailOptions);
};
const sendMail = (transporter, mailOptions, res) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error); 
        return res.status(500).json({ error: "Failed to send email" });
      }
      console.log("Email sent:", info.response); 
      return res.json({ success: true, message: "Email sent successfully!" });
    });
  };
export default otpMail


