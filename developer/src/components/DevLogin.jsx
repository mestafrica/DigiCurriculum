import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import bgImage from "../../src/img/Bgimage.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"; // 👈 import axios

const baseUrl = import.meta.env.VITE_BASE_URL;

function DevLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    // Posting User data to the backend registration endpoint
    event.preventDefault();
    setLoading(true);
    if (validate()) {
      try {
        const res = await axios.post(`${baseUrl}/developers/login`, formData, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        // Token returned from the backend.

        const token = res.data.token;
        localStorage.setItem("authToken", token);

        toast.success("Login successful! Redirecting to dashboard...");
        setLoading(false);
        // Here, I set a setTimeout of two seconds and this is to allow users to read the success and redirecting message above
        setTimeout(() => {
          navigate("/devdashboard");
        }, 2000);
      } catch (error) {
        setLoading(false);

        console.error(error.response?.data || error.message);
        toast.error(
          error.response?.data?.message || "Invalid login credentials"
        );
      }
    } else {
      toast.error("Please fill in all fields correctly.");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          <h2
            className="text-2xl font-bold mb-6 text-center"
            style={{ color: "#333333" }}
          >
            Developer Login
          </h2>
          <div className="space-y-4">
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="appearance-none border rounded-lg w-full py-3 px-4 leading-tight focus:outline-none focus:shadow-outline"
                style={{ color: "#666666" }}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none border rounded-lg w-full py-3 px-4 leading-tight focus:outline-none focus:shadow-outline"
                  style={{ color: "#666666" }}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>
          </div>
          <div className="flex justify-between items-center mt-6">
            <label className="flex items-center text-gray-700">
              <input
                type="checkbox"
                className="form-checkbox"
                style={{ color: "#111111" }}
              />
              <span className="ml-2">Remember me</span>
            </label>
            <Link to="/devpasswordreset" className="text-gray-600 underline">
              Forgot Password?
            </Link>
          </div>
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="w-1/2 bg-blue-300 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline"
              disabled={loading}
            >
              {loading ? "Please wait..." : "Log In"}
            </button>
          </div>
          <p className="mt-4 text-center text-gray-600">
            Don’t have an account?{" "}
            <Link to="/devsignup" className="text-black underline">
              Sign up
            </Link>
          </p>
          <p className="mt-2 text-center text-gray-600 text-xs">
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot.{" "}
            <a
              href="https://www.google.com/recaptcha/about/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black underline"
            >
              Learn more.
            </a>
          </p>
        </form>
        <div className="flex justify-center mt-4">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="text-gray-600 underline"
          >
            Back to Home
          </button>
        </div>
      </div>

      {/* Toast Container to display toast messages */}
      <ToastContainer />
    </div>
  );
}

export default DevLogin;
