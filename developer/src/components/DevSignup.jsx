import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import bgImage from "../../src/img/Bgimage.png";
import axios from "axios";
import Select from "react-select";
import { getNames } from "country-list";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { server } from "@/server";

const DeveloperSignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    companyName: "",
    companyDescription: "",
    country: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.companyName) newErrors.companyName = "Company name is required";
    if (!formData.companyDescription) newErrors.companyDescription = "Company description is required";
    if (!formData.country) newErrors.country = "Country is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (validate()) {
      const dataToSubmit = {
        ...formData,
        country: formData.country === "Other" ? formData.otherCountry : formData.country,
      };

      try {
        const response = await axios.post(`${server}/developers/signup`, dataToSubmit);
        toast.success("Registration successful!");
        setLoading(false);
        navigate("/developer/dashboard");
      } catch (error) {
        toast.error(error.response.data);
        setLoading(false);
      }
    }
  };

  const countryOptions = getNames().map((country) => ({
    value: country,
    label: country,
  }));

  return (
    <div
      className="flex justify-center items-center h-screen bg-gray-100"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-white shadow-lg rounded-lg w-full max-w-xl p-6 md:p-8">
        <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} />
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
              <Select
                options={countryOptions}
                value={countryOptions.find(
                  (option) => option.value === formData.country
                )}
                onChange={(selectedOption) =>
                  setFormData({ ...formData, country: selectedOption.value })
                }
                placeholder="Select a country"
                className="w-full"
              />
              {errors.country && (
                <p className="text-red-500 text-xs mt-1">{errors.country}</p>
              )}
            </div>
          </div>
          <div>
            <textarea
              placeholder="Company Description"
              name="companyDescription"
              value={formData.companyDescription}
              onChange={handleChange}
              className="appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.companyDescription && (
              <p className="text-red-500 text-xs mt-1">{errors.companyDescription}</p>
            )}
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3"
            >
              {showPassword ? (
                <IoEyeOffOutline className="h-5 w-5 text-black" />
              ) : (
                <IoEyeOutline className="h-5 w-5 text-black" />
              )}
            </button>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="w-2/3 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
            >
              {loading ? "loading..." : "Register as Developer"}
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
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg flex items-center space-x-2"
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" alt="Google logo" className="w-5 h-5" />
              <span>Sign up with Google</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeveloperSignupForm;
