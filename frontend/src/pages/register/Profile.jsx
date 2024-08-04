import { useState } from "react";
import CountryDropdown from "../../components/ui/ui/Country";
import bgImage from '../../assets/images/b.g.png';

function Profile() {
  const [formData, setFormData] = useState({
    fullName: "",
    country: "",
    institution: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCountrySelect = (country) => {
    setFormData({ ...formData, country });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.institution) newErrors.institution = "Institution is required";

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
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
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
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder-custom"
              />
              {errors.fullName && (
                <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
              )}
            </div>
            <div>
              <CountryDropdown
                selectedCountry={formData.country} 
                onSelect={handleCountrySelect} 
              />
              {errors.country && (
                <p className="text-red-500 text-xs mt-1">{errors.country}</p>
              )}
            </div>
            <div>
              <input
                type="text"
                placeholder="Institution"
                name="institution"
                value={formData.institution}
                onChange={handleChange}
                className="appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder-custom"
              />
              {errors.institution && (
                <p className="text-red-500 text-xs mt-1">{errors.institution}</p>
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

export default Profile;
