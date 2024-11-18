import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import loadingGif from '../assets/images/loading.gif';
import bgImage from '../assets/images/b.g.png';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        'https://digitizing-the-ges-curriculum-21yp.onrender.com/admin/auth/login',
        formData
      );

      if (response.status === 200) {
        localStorage.setItem('token', response.data.accessToken);
        toast.success('Login successful!');
        navigate('/admin-dashboard');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Login failed. Please check your credentials.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <ToastContainer />
      <form className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: '#333333' }}>Login</h2>

        {/* Email Input */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="appearance-none border rounded-lg w-full py-3 px-4 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter email"
            required
          />
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="appearance-none border rounded-lg w-full py-3 px-4 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/* Remember Me Checkbox and Forgot Password Link */}
        <div className="flex justify-between items-center mb-6">
          <label className="flex items-center text-gray-700">
            <input type="checkbox" className="form-checkbox" />
            <span className="ml-2">Remember me</span>
          </label>
          <a href="#forgot-password" className="text-gray-600 underline">Forgot password?</a>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="w-1/2 bg-[#456990] text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline"
            disabled={loading}
          >
            {loading ? <img src={loadingGif} alt="Loading..." className="h-6 mx-auto" /> : 'Login'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
