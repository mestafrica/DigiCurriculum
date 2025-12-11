import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../services/authService";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const data = await loginUser(formData);

      // ✅ Save authentication info in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user?.id);
      localStorage.setItem("userType", data.user?.userType);
      // Store user's name for navbar initial
if (data.user?.name || data.user?.firstName) {
  localStorage.setItem("userName", data.user.name || data.user.firstName);
}

      // ✅ Redirect users by role
      if (data.user?.userType === "Student") {
        // Student → /dashboard
        window.location.href = `${
          import.meta.env.VITE_DASHBOARD_URL
        }/dashboard?token=${data.token}&userId=${data.user.id}`;
      } else if (data.user?.userType === "Teacher") {
        // Teacher → /teacher/dashboard
        window.location.href = `${
          import.meta.env.VITE_DASHBOARD_URL
        }/teacher/dashboard?token=${data.token}&userId=${data.user.id}`;
      } else {
        // fallback → main dashboard
        window.location.href = `${
          import.meta.env.VITE_DASHBOARD_URL
        }/dashboard`;
      }
    } catch (err) {
      setError(err.message || "Login failed");
      setIsLoading(false);
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
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-300 outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-300 outline-none"
          />

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center items-center gap-2 bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white font-semibold py-2 rounded-md transition transform hover:scale-[1.02] disabled:opacity-70`}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
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
