import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import loadingGif from "../assets/images/loading.gif"; 
import 'react-toastify/dist/ReactToastify.css';
import bgImage from '../assets/images/b.g.png';

const AdminSignupForm = () => {
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isOtpStage, setIsOtpStage] = useState(false);
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    // Collect form data
    const formData = new FormData(event.target);
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const password = formData.get("password");
    const role = formData.get("role");

    const data = { firstName, lastName, email, password, role };

    try {
      // Send API request to the backend
      const response = await axios.post('https://digitizing-the-ges-curriculum-21yp.onrender.com/admin/auth/register', data);

      // Handle successful response
      if (response.status === 201) {
        toast.success('Signup successful! OTP sent to your email.');
        navigate('/otp');

        // Move to OTP verification stage
        setIsOtpStage(true);
      }
    } catch (error) {
      // Handle error response from API
      toast.error(error.response?.data || 'Signup failed. Please try again.');
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  // Handles OTP input changes
  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (/[^0-9]/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <ToastContainer />
      {isOtpStage ? (
        // OTP Verification Stage
        <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Verify OTP</h2>
          <div className="flex space-x-2 mb-4 justify-center">
            {otp.map((value, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type="text"
                value={value}
                onChange={(e) => handleOtpChange(e, index)}
                maxLength={1}
                className="w-12 h-12 text-center text-xl border rounded-md focus:outline-none focus:ring-2 focus:ring-[#456990] focus:border-[#456990]"
                placeholder="-"
              />
            ))}
          </div>
          <button
            onClick={handleOtpSubmit}
            disabled={loading}
            className="w-full bg-[#456990] text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline"
          >
            {loading ? <img src={loadingGif} alt="Loading..." className="h-6 mx-auto" /> : "Verify OTP"}
          </button>
          <div className="text-center mt-4">
            <button onClick={handleResendOtp} className="text-[#456990] hover:underline">
              Resend OTP
            </button>
          </div>
        </div>
      ) : (
        // Signup Stage
        <form
          className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: '#333333' }}>Sign up</h2>
          {/* Input fields */}
          <div className="flex gap-4 mb-4">
            <div className="w-1/2">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">First Name</label>
              <input
                name="firstName"
                id="firstName"
                type="text"
                className="appearance-none border rounded-lg w-full py-3 px-4 leading-tight focus:outline-none focus:shadow-outline"
                style={{ color: '#666666' }}
                placeholder="Enter first name"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">Last Name</label>
              <input
                name="lastName"
                id="lastName"
                type="text"
                className="appearance-none border rounded-lg w-full py-3 px-4 leading-tight focus:outline-none focus:shadow-outline"
                style={{ color: '#666666' }}
                placeholder="Enter last name"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
            <input
              name="email"
              id="email"
              type="email"
              className="appearance-none border rounded-lg w-full py-3 px-4 leading-tight focus:outline-none focus:shadow-outline"
              style={{ color: '#666666' }}
              placeholder="Enter email"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
            <input
              name="password"
              id="password"
              type="password"
              className="appearance-none border rounded-lg w-full py-3 px-4 leading-tight focus:outline-none focus:shadow-outline"
              style={{ color: '#666666' }}
              placeholder="******"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">Role</label>
            <input
              name="role"
              id="role"
              type="text"
              className="appearance-none border rounded-lg w-full py-3 px-4 leading-tight focus:outline-none focus:shadow-outline"
              style={{ color: '#666666' }}
              placeholder="Enter role"
              required
            />
          </div> 

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="w-1/2 bg-[#456990] text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline"
              disabled={loading}
            >
              {loading ? (
                <img src={loadingGif} alt="Loading..." className="h-6 mx-auto" />
              ) : (
                "Sign up"
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AdminSignupForm;
