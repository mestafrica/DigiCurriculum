import { userModel } from "../models/userModel.js";
import dotenv from "dotenv"
import { sendOTPEmail } from "../utils/otpUtils.js";



dotenv.config()



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



export const resendOtp = async (req, res) => {
  const { email } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(404).json('User not found');
  }

  const otp = Math.floor(1000 + Math.random() * 9000000).toString();
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
