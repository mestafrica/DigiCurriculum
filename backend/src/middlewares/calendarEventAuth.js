


import { userModel } from "../models/userModel.js";

import { expressjwt } from 'express-jwt';

import dotenv from 'dotenv';        


export const isAuthenticatedCalendarEvent = expressjwt({
    secret: process.env.JWT_PRIVATE_KEY || "default_secret",
    algorithms: ['HS256'],
    requestProperty: "auth",
    // The code above attaches the token payload to the req.auth property
}).unless({ path: [] }); // Add error handling

export const isAuthorizedCalendarEvent = (roles) => {
  return async (req, res, next) => {
    try {
      // console.log('Full auth object:', req.auth); // Debug: see entire token payload
      // console.log('Token user ID:', req.auth?.userId); // Debug: see what ID is in token
      
      // Check if auth exists - FIXED: using userId instead of id
      if (!req.auth || !req.auth.userId) {
        return res.status(401).json({ message: "Invalid or missing authentication token" });
      }
      
      const user = await userModel.findById(req.auth.userId); // FIXED: using userId
      // console.log('User found:', user ? 'Yes' : 'No'); // Debug: check if user exists
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      if (roles?.includes(user.userType)) {
        next();
      } else {
        return res.status(403).json({ message: "You have to be Authorized" }); // Added return
      }
    } catch (error) {
      console.error('Authorization error:', error);
      return res.status(500).json({ message: "Internal Server Error" }); // Added return
    }
  };
};