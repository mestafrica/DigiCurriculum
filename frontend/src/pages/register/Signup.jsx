import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoEyeOutline, IoEyeOffOutline, IoChevronDown } from "react-icons/io5";
import bgImage from '../../assets/images/b.g.png'; 

function Signup() {
  const [formData, setFormData] = useState({
    role: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState({
    password: false,
    cpassword: false,
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("I am a");

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
    if (!formData.role) newErrors.role = "Role is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.cpassword)
      newErrors.cpassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form submitted:", formData);
      navigate('/completesignup');
    }
  };

  const handleRoleSelect = (role) => {
    setFormData({ ...formData, role });
    setSelectedRole(role);
    setIsDropdownOpen(false);
  };

  return (
    <div
      className="bg-cover bg-center h-screen flex items-center justify-center"
      style={{ backgroundImage: `url(${bgImage})` }} // Correct usage of imported image
    >
      <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-6 text-center">
            Create An Account
          </h2>
          <p className="text-center mb-6">
            Create an account to enjoy the world of streamlined tutoring.
          </p>
          <div className="space-y-4">
            <div className="relative">
              <div
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="appearance-none border rounded-lg w-full py-3 px-4 text-black leading-tight focus:outline-none focus:shadow-outline placeholder-custom pr-8 cursor-pointer"
              >
                {selectedRole}
                <IoChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black" />
              </div>
              {isDropdownOpen && (
                <div className="absolute z-10 bg-white border rounded-lg shadow-lg w-full mt-1">
                  <div
                    className="py-2 px-4 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleRoleSelect("Teacher")}
                  >
                    Teacher
                  </div>
                  <div
                    className="py-2 px-4 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleRoleSelect("Student")}
                  >
                    Student
                  </div>
                  <div
                    className="py-2 px-4 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleRoleSelect("Researcher")}
                  >
                    Researcher
                  </div>
                </div>
              )}
              {errors.role && (
                <p className="text-red-500 text-xs mt-1">{errors.role}</p>
              )}
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder-custom"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
            <div className="relative">
              <input
                type={showPassword.password ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder-custom"
              />
              <button
                type="button"
                onClick={() => setShowPassword({ ...showPassword, password: !showPassword.password })}
                className="absolute right-3 top-3"
              >
                {showPassword.password ? <IoEyeOffOutline className="h-5 w-5 text-black" /> : <IoEyeOutline className="h-5 w-5 text-black" />}
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
                className="appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder-custom"
              />
              <button
                type="button"
                onClick={() => setShowPassword({ ...showPassword, cpassword: !showPassword.cpassword })}
                className="absolute right-3 top-3"
              >
                {showPassword.cpassword ? <IoEyeOffOutline className="h-5 w-5 text-black" /> : <IoEyeOutline className="h-5 w-5 text-black" />}
              </button>
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
            <a href="/signin" className="text-gray-600 underline">
              Sign In
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
