import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [userId, setUserId] = useState(localStorage.getItem("userId") || null);
  const [userType, setUserType] = useState(localStorage.getItem("userType") || null);

  // ✅ whenever token changes, decode it and update userId if missing
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded?.userId) {
          setUserId(decoded.userId);
          localStorage.setItem("userId", decoded.userId);
        }
        if (decoded?.userType) {
          setUserType(decoded.userType);
          localStorage.setItem("userType", decoded.userType);
        }
      } catch (err) {
        console.error("❌ Failed to decode token:", err);
      }
    }
  }, [token]);

  const login = (data) => {
    setToken(data.token);
    localStorage.setItem("token", data.token);

    // ✅ also save userId + userType from login response
    if (data.userId) {
      setUserId(data.userId);
      localStorage.setItem("userId", data.userId);
    }
    if (data.userType) {
      setUserType(data.userType);
      localStorage.setItem("userType", data.userType);
    }
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
    setUserType(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ token, userId, userType, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
