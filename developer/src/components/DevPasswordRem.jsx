import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bgImage from "../../src/img/Bgimage.png"

function DevPasswordRem() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const validate = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      // Process password reset request (e.g., API call)
      console.log("Password reset email sent to:", email);
      navigate('/password-reset-confirmation'); 
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-6 text-center">
            Forgot Password
          </h2>
          <p className="text-center mb-6">
            Enter your registered email address to receive a password reset link.
          </p>
          <div className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleChange}
                className="appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="w-2/3 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
            >
              Send Reset Link
            </button>
          </div>
          <p className="mt-4 text-center text-gray-600">
            Remember your password?{" "}
            <Link to="/devlogin" className="text-gray-600 underline">
              Sign In
            </Link>
          </p>
          <div className="flex justify-center mt-4">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="text-gray-600 underline"
            >
              Back to Home
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DevPasswordRem;
