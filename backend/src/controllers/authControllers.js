import { userModel } from "../models/userModel.js";
import dotenv from "dotenv"
import { sendOTPEmail } from "../utils/otpUtils.js";
import crypto from "crypto"
import transporter from "../utils/nodemailerConfig.js";
import bcrypt from "bcrypt"





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
    res.status(500).json({message:'Internal server error',
      error:error
    });
  }
};



export const resetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate email
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Find user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate reset token
    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpire = Date.now() + 3600000; // 1 hour

    // Save the user with the reset token and expiry
    await user.save();

    // Create reset URL
    const resetUrl = `/password-reset/${token}`;

    // Configure email options
    const mailOptions = {
      to: user.email,
      from: 'plus233Pixels <no-reply@plus233photography.com>',
      subject: 'Password Reset',
      text: `You are receiving this because you (or someone else) has requested the reset of the password for your account.\n\n
             Please click on the following link, or paste this into your browser to complete the process:\n\n
             ${resetUrl}\n\n
             If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    // Send the reset email
    await transporter.sendMail(mailOptions);

    // Return success response
    return res.status(200).json({ message: "Password reset email sent" });
    
  } catch (error) {
    console.error("Error during password reset process:", error.message);
    return res.status(500).json({ message: `Error requesting password reset: ${error.message}` });
  }
};


export const verifyPasswordReset = async(req,res)=>{
  const {token}= req.params
  const{newPassword,confirmPassword}=req.body

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    const user= await userModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() }
  
    })
  
    if (!user) {
      return res.status(400).json({message:'Password reset token is invalid or has expired'});
    }
    if (!newPassword) {
      return res.status(400).json({ message: 'Password is required' });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds); 
  
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    
    await user.save();
    
    res.status(200).json({message:'Password has been reset successfully'});
  } catch (error) {
    console.log("Error during password reset process:", error.message)
    res.status(500).json({message:'Error resetting password'});
  }
}