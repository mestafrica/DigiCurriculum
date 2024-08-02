import { useState } from "react";

function Signup() {
  const [formData, setFormData] = useState({
    fname: "",
    school: "",
    country: "",
    password: "",
    cpassword: "",
  });
  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validate form data
  const validate = () => {
    const newErrors = {};
    if (!formData.fname) newErrors.fname = "Full Name is required";
    if (!formData.school) newErrors.school = "School is required";
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.cpassword)
      newErrors.cpassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Submit form data
      console.log("Form submitted:", formData);
    }
  };

  return (
    <div
      className="bg-cover bg-center h-screen flex items-center justify-center"
      style={{ backgroundImage: `url('/src/assets/images/b.g.png')` }}
    >
      <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          <style>
            {`
              .placeholder-custom::placeholder {
                color: #32403B; 
              }
            `}
          </style>
          <h2 className="text-2xl font-bold mb-6 text-center">
            Create An Account
          </h2>
          <p className="text-center mb-6">
            Create an account to enjoy the world of streamlined learning.
          </p>
          <div className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Full Name"
                name="fname"
                value={formData.fname}
                onChange={handleChange}
                className="appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder-custom"
              />
              {errors.fname && (
                <p className="text-red-500 text-xs mt-1">{errors.fname}</p>
              )}
            </div>
            <div>
              <input
                type="text"
                placeholder="School"
                name="school"
                value={formData.school}
                onChange={handleChange}
                className="appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder-custom"
              />
              {errors.school && (
                <p className="text-red-500 text-xs mt-1">{errors.school}</p>
              )}
            </div>
            <div>
              <input
                type="text"
                placeholder="Country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder-custom"
              />
              {errors.country && (
                <p className="text-red-500 text-xs mt-1">{errors.country}</p>
              )}
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder-custom"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>
            <div>
              <input
                type="password"
                placeholder="Confirm Password"
                name="cpassword"
                value={formData.cpassword}
                onChange={handleChange}
                className="appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder-custom"
              />
              {errors.cpassword && (
                <p className="text-red-500 text-xs mt-1">{errors.cpassword}</p>
              )}
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="w-2/3 bg-buttonBg text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
            >
              Create Account
            </button>
          </div>
          <p className="mt-4 text-center text-gray-600">
            Already have an account?
            <a href="#signin" className="text-gray-600 underline">
              Sign In
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
