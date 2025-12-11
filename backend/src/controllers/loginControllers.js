import { userModel } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signIn = async (req, res) => {
    try {
      const { email, password } = req.body;

      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json("Please enter a valid email") ; 
      }
  
  
      // Validate the request body
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }
  
      // Check if the user exists and select the password field
      const user = await userModel.findOne({ email }).select('password email firstName lastName userType isVerified');
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Check if the password is correct
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
  
      // Check if the user's email is verified
      if (!user.isVerified) {
        return res.status(403).json({ message: "Please verify your account before signing in" });
      }
  
      // Generate a JWT token
      const token = jwt.sign(
        { userId: user._id, email: user.email, userType: user.userType },
        process.env.JWT_PRIVATE_KEY,
        { expiresIn: "1h" }
      );


      res.cookie('authToken', token, {
        httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
        secure: process.env.NODE_ENV === 'production', // Only send the cookie over HTTPS in production
        maxAge: 3600000 // Cookie expires in 1 hour
      });
  
  
      // Send the response with the token and user details
      res.status(200).json({
        message: "Sign in successful",
        token,
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          userType: user.userType,
        },
      });
    } catch (error) {
      console.error("Error during signin:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  