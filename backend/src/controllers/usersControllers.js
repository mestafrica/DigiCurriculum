import { userModel } from "../models/userModel.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
// import { sendOTPEmail } from "../utils/otpUtils.js";

dotenv.config();

async function hashPassword(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

// const generateOtp = () => Math.floor(1000 + Math.random() * 9000).toString(); //4 digit code

export const handleSignup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, school, userType, country } =
      req.body;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json("Please enter a valid email");
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(password)) {
      return res
        .status(400)
        .json(
          "Password must be at least 6 characters long and contain at least one letter and one number"
        );
    }

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json("User already exists");
    }

    // const otp = generateOtp();
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
      // otp,
      // otpExpiry: Date.now() + 15 * 60 * 1000, // 15 mins expiration
    });

    await newUser.save();
    // await sendOTPEmail(email, otp);

    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
};

export const allUsers = async (req, res) => {
  try {
    const data = req.body;

    const fetchAllUsers = await userModel.find({}); // Fetch all users

    if (fetchAllUsers.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json({
      message: "Users fetched successfully",
      users: fetchAllUsers,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const singleUser = async (req, res) => {
  try {
    const id = req.params.id;

    const fetchSingleUser = await userModel.findById(id);

    res.status(200).json({
      message: "user fetched successfully",
      user: fetchSingleUser,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;

    const updatedUser = await userModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "user updated successfully",
      user: updatedUser,
    });
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


//logic to logout user
export const logoutUser = async (req, res) => {
  try {
    res.status(200).json({ 
      message: "User logged out successfully" 
    });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};