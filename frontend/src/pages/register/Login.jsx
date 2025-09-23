import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../services/authService";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await loginUser(formData);

      // Save token + userId + userType
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user?._id);
      localStorage.setItem("userType", data.user?.userType);

      // Redirect based on user type
      if (data.user?.userType === "Student") {
        navigate("/student-dashboard");
      } else if (data.user?.userType === "Teacher") {
        navigate("/teacher-dashboard");
      } else {
        navigate("/dashboard"); // fallback
      }
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md transition-all hover:shadow-3xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Welcome Back 👋
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-300 outline-none"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-300 outline-none"
          />

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white font-semibold py-2 rounded-md transition transform hover:scale-[1.02]"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-purple-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
