import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../../services/authService";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "",
    school: "",
    country: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await registerUser({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        userType: formData.userType,
        school: formData.school,
        country: formData.country,
      });
      navigate("/otp");
    } catch (err) {
      setError(err.message || "Signup failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-lg transition-all hover:shadow-3xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
          Create Your Account
        </h2>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Join DigiCurriculum and unlock a world of learning 🚀
        </p>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First & Last Name */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-300 outline-none"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-300 outline-none"
            />
          </div>

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-300 outline-none"
          />

          {/* UserType */}
          <select
            name="userType"
            value={formData.userType}
            onChange={handleChange}
            required
            className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-300 outline-none"
          >
            <option value="">I am a...</option>
            <option value="Student">Student</option>
            <option value="Teacher">Teacher</option>
            <option value="Developer">Developer</option>
          </select>

          {/* School */}
          <input
            type="text"
            name="school"
            placeholder="School"
            value={formData.school}
            onChange={handleChange}
            required
            className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-300 outline-none"
          />

          {/* Country */}
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
            required
            className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-300 outline-none"
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-300 outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-sm text-gray-500"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-300 outline-none"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-sm text-gray-500"
            >
              {showConfirmPassword ? "🙈" : "👁️"}
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-400 to-green-400 hover:from-blue-500 hover:to-green-500 text-white font-semibold py-2 rounded-md transition transform hover:scale-[1.02]"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-500 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
