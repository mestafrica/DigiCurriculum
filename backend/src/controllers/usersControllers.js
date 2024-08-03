import { userModel } from "../models/userModel.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function hashPassword(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

const generateOtp = () => Math.floor(1000 + Math.random() * 900000).toString(); //6 digit code

export const handleSignup = async (req, res) => {
  console.log('Request Body:', req.body);
  try {
    const { firstName, lastName, email, password, school, userType, country } = req.body;


    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return next(new ErrorHandler("Please enter a valid email", 400));
    }

    
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json("Password must be at least 6 characters long and contain at least one letter and one number");
    }


    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json('User already exists');
    }

    const otp = generateOtp();
    const hashedPassword = await hashPassword(password);

    const newUser = new userModel({
      email,
      userType,
      school,
      country,
      lastName,
      firstName,
      password: hashedPassword,
      isVerified: false,
      otp, 
      otpExpiry: Date.now() + 15 * 60 * 1000  // 15 mins expiration
    });

    await newUser.save();
    await sendOTPEmail(email, otp);

    res.status(201).json({ message: "Signup successful, OTP sent" });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json('Internal server error');
  }
};

export const sendOTPEmail = async (email, otp) => {
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






export const allUsers = async (req, res) => {
  console.log("Received request to fetch all users");

  try {
    const data = req.body;
    console.log("Request data:", data);

    const fetchAllUsers = await userModel.find({}); // Fetch all users for basic testing

    console.log("Fetched users:", fetchAllUsers);

    if (fetchAllUsers.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json(fetchAllUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const singleUser = async (req, res) => {
  console.log("Received request to fetch all users");

  try {
    const id = req.params.id;
    console.log("Request data:", id);

    const fetchSingleUser = await userModel.findById(id); // Fetch all users for basic testing

    console.log("Fetched user:", fetchSingleUser);

    res.status(200).json(fetchSingleUser);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;

    const updatedUser = await userModel.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};




export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    const deletedUser = await userModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
