import { userModel } from "../models/userModel.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv"
import { sendOTPEmail } from "./usersControllers.js";



dotenv.config()


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json('User not found');
    }

    if (!user.otp || user.otp !== otp || Date.now() > user.otpExpiry) {
      return res.status(400).json('Invalid or expired OTP');
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;

    await user.save();

    res.status(200).json('OTP verified successfully');
  } catch (error) {
    console.error("Error during OTP verification:", error);
    res.status(500).json('Internal server error');
  }
};


const resendOTPEmail = async (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}. It is valid for 15 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("OTP email sent successfully");
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw new Error("Error sending OTP email");
  }
};

export const resendOtp = async (req, res) => {
  const { email } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(404).json('User not found');
  }

  const otp = Math.floor(1000 + Math.random() * 900000).toString();
  const otpExpiry = Date.now() + 15 * 60 * 1000;

  user.otp = otp;
  user.otpExpiry = otpExpiry;

  try {
    await user.save();
    await sendOTPEmail(email, otp);
    res.status(200).json({ message: 'OTP Resent successfully' });
  } catch (error) {
    console.error("Error during OTP resending:", error);
    res.status(500).json('Internal server error');
  }
};