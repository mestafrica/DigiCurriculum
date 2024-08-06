import nodemailer from "nodemailer"
import dotenv from "dotenv"


dotenv.config()




const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  



export const sendOTPEmail = async (email, otp) => {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is ${otp}. It is valid for 15 minutes.`,
    };
  
    try {
      await transporter.sendMail(mailOptions);
     
    } catch (error) {
      console.error("Error sending OTP email:", error);
      throw new Error("Error sending OTP email");
    }
  };