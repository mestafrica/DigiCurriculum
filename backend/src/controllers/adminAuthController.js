import { adminModel } from "../models/adminModel.js";
import dotenv from "dotenv";
import { sendOTPEmail } from "../utils/otpUtils.js";
import crypto from "crypto"
import transporter from "../utils/nodemailerConfig.js";
import bcrypt from "bcryptjs";

dotenv.config();


export const verifyAdminOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const admin = await adminModel.findOne({ email });

        if (!admin) {
            return res.status(404).json('Admin not found');
        }

        if (!admin.otp || admin.otp !== otp || admin.otpExpiry && new Date(Date.now()) > admin.otpExpiry) {
            return res.status(400).json('Invalid or expired OTP');
        }

        admin.isVerified = true;
        admin.otp = undefined;
        admin.otpExpiry = undefined;

        await admin.save();

        res.status(200).json('OTP verified successfully');
    } catch (error) {
        console.error("Error during OTP verification:", error);
        res.status(500).json('Internal server error');
    }
};



export const resendAdminOtp = async (req, res) => {
    const { email } = req.body;

    const admin = await adminModel.findOne({ email });

    if (!admin) {
        return res.status(404).json('Admin not found');
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const otpExpiry = new Date(Date.now() + 15 * 60 * 1000);

    admin.otp = otp;
    admin.otpExpiry = otpExpiry;

    try {
        await admin.save();
        await sendOTPEmail(email, otp);

        res.status(200).json({ message: 'OTP Resent successfully' });
    } catch (error) {
        console.error("Error during OTP resending:", error);
        res.status(500).json({
            message: 'Internal server error',
            error: error
        });
    }
};



export const resetAdminPassword = async (req, res) => {
    try {
        const { email } = req.body;

        // Validate email
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        // Find user by email
        const admin = await adminModel.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        // Generate reset token
        const token = crypto.randomBytes(20).toString('hex');
        admin.resetPasswordToken = token;
        admin.resetPasswordExpire = new Date(Date.now() + 3600000); // 1 hour

        // Save the user with the reset token and expiry
        await admin.save();

        // Create reset URL
        const resetUrl = `${process.env.BASE_URL}/password-reset/${token}`;

        // Configure email options
        const mailOptions = {
            to: admin.email,
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


export const verifyAdminPasswordReset = async (req, res) => {
    const { token } = req.params
    const { newPassword, confirmPassword } = req.body

    if (newPassword !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }

    try {
        const admin = await adminModel.findOne({
            resetPasswordToken: token,
            resetPasswordExpire: { $gt: Date.now() }

        })

        if (!admin) {
            return res.status(400).json({ message: 'Password reset token is invalid or has expired' });
        }
        if (!newPassword) {
            return res.status(400).json({ message: 'Password is required' });
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        admin.password = hashedPassword;
        admin.resetPasswordToken = undefined;
        admin.resetPasswordExpire = undefined;

        await admin.save();

        res.status(200).json({ message: 'Password has been reset successfully' });
    } catch (error) {
        console.log("Error during password reset process:", error.message)
        res.status(500).json({ message: 'Error resetting password' });
    }
};