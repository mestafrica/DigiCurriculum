// src/services/authService.js
import axios from "axios";

const API_BASE_URL = "https://digiccurriculum.onrender.com";

// ================= USER AUTH =================

// Signup for students/teachers/etc.
export const registerUser = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signup`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Registration failed" };
  }
};

// Login for students/teachers/etc.
export const loginUser = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Login failed" };
  }
};

// ================= DEVELOPER AUTH =================

export const registerDeveloper = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/developers/register`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Developer registration failed" };
  }
};

export const loginDeveloper = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/developers/login`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Developer login failed" };
  }
};

export const verifyOtp = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/developers/verify-otp`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "OTP verification failed" };
  }
};

export const resendOtp = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/developers/resend-otp`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Resend OTP failed" };
  }
};
