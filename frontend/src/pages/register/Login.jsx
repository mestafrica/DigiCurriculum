import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; 
import bgImage from '../../assets/images/b.g.png';

function SignIn() {
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.emailOrPhone) newErrors.emailOrPhone = "Email or phone number is required";
    if (!formData.password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form submitted:", formData);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-6 text-left" style={{ color: '#333333' }}>Sign in</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="emailOrPhone">
                Email or phone number
              </label>
              <input
                type="text"
                id="emailOrPhone"
                name="emailOrPhone"
                value={formData.emailOrPhone}
                onChange={handleChange}
                className="appearance-none border rounded-lg w-full py-3 px-4 leading-tight focus:outline-none focus:shadow-outline"
                style={{ color: '#666666' }}
              />
              {errors.emailOrPhone && (
                <p className="text-red-500 text-xs mt-1">{errors.emailOrPhone}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
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
                  style={{ color: '#666666' }}
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
              <input type="checkbox" className="form-checkbox" style={{ color: '#111111' }} />
              <span className="ml-2">Remember me</span>
            </label>
            <a href="#need-help" className="text-gray-600 underline">Need help?</a>
          </div>
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="w-1/2 bg-blue-300 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
          <p className="mt-4 text-center text-gray-600">
            Don’t have an account? <a href="/signup" className="text-black underline">Sign up</a>
          </p>
          <p className="mt-2 text-center text-gray-600 text-xs">
            This page is protected by Google reCAPTCHA to ensure you're not a bot. <a href="https://www.google.com/recaptcha/about/" target="_blank" rel="noopener noreferrer" className="text-black underline">Learn more.</a>
          </p>
        </form>
        <div className="flex justify-center mt-4">
          <button
            type="button"
            onClick={() => navigate('/')} 
            className="text-gray-600 underline"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
