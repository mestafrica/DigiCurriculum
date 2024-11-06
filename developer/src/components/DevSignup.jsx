import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import bgImage from "../../src/img/Bgimage.png"
// import axios from 'axios';

const DeveloperSignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
    companyName: "",
    companyDescription: "",
    country: "",
    otherCountry: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState({
    password: false,
    cpassword: false,
  });

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
    // Validation logic
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      // Proceed with registration
      const dataToSubmit = {
        ...formData,
        country: formData.country === "Other" ? formData.otherCountry : formData.country,
      };

      try {
        // Uncomment the following lines to send the form data to the backend
        // const response = await axios.post('/api/developer-registration', dataToSubmit);
        // console.log('Registration successful:', response.data);
        navigate('/developer/dashboard');
      } catch (error) {
        console.error('Error registering developer:', error);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100"
    style={{ backgroundImage: `url(${bgImage})` }}>
      
      <div className="bg-white shadow-lg rounded-lg w-full max-w-xl p-6 md:p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Developer Registration</h2>
        <p className="text-center mb-6">
          Create an account to manage your API access and view documentation.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <input
                type="text"
                placeholder="Company Name"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.companyName && (
                <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>
              )}
            </div>
            <div>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select Country</option>
                <option value="USA">United States</option>
                <option value="UK">United Kingdom</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
                <option value="Other">Other</option>
              </select>
              {errors.country && (
                <p className="text-red-500 text-xs mt-1">{errors.country}</p>
              )}
            </div>
          </div>
          {formData.country === "Other" && (
            <div>
              <input
                type="text"
                placeholder="Specify Country"
                name="country"
                value={formData.otherCountry}
                onChange={handleChange}
                className="appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.otherCountry && (
                <p className="text-red-500 text-xs mt-1">{errors.otherCountry}</p>
              )}
            </div>
          )}
          <div>
            <textarea
              placeholder="Company Description"
              name="companyDescription"
              value={formData.companyDescription}
              onChange={handleChange}
              className="appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <input
                type={showPassword.password ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <button
                type="button"
                onClick={() =>
                  setShowPassword({
                    ...showPassword,
                    password: !showPassword.password,
                  })
                }
                className="absolute right-3 top-3"
              >
                {showPassword.password ? (
                  <IoEyeOffOutline className="h-5 w-5 text-black" />
                ) : (
                  <IoEyeOutline className="h-5 w-5 text-black" />
                )}
              </button>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>
            <div className="relative">
              <input
                type={showPassword.cpassword ? "text" : "password"}
                placeholder="Confirm Password"
                name="cpassword"
                value={formData.cpassword}
                onChange={handleChange}
                className="appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <button
                type="button"
                onClick={() =>
                  setShowPassword({
                    ...showPassword,
                    cpassword: !showPassword.cpassword,
                  })
                }
                className="absolute right-3 top-3"
              >
                {showPassword.cpassword ? (
                  <IoEyeOffOutline className="h-5 w-5 text-black" />
                ) : (
                  <IoEyeOutline className="h-5 w-5 text-black" />
                )}
              </button>
              {errors.cpassword && (
                <p className="text-red-500 text-xs mt-1">{errors.cpassword}</p>
              )}
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="w-2/3 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
            >
              Register as Developer
            </button>
          </div>
          <p className="mt-4 text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/devsignup" className="text-blue-600 underline">
              Sign In
            </Link>
          </p>
          <div className="flex justify-center mt-4">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="text-blue-600 underline"
            >
              Back to Home
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeveloperSignupForm;