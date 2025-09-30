// src/services/authService.js
import axios from "axios";

const API_BASE_URL = "https://digicurriculum.onrender.com"; // ✅ correct backend domain

// ================= USER AUTH =================

// Signup
export const registerUser = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signup`, data, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Registration failed" };
  }
};

// Login
export const loginUser = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, data, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Login failed" };
  }
};

// Get single user
export const getUserById = async (id, token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Fetching user failed" };
  }
};
