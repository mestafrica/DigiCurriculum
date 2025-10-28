import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

export const getDeveloperApiKey = async (token) => {
  console.log("Developer token being sent (GET):", token);  // 👈 ADD THIS
  const res = await api.get("/developer/api-key", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const generateDeveloperApiKey = async (token) => {
  console.log("Developer token being sent (POST):", token);  // 👈 ADD THIS
  const res = await api.post("/developer/api-key", {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
