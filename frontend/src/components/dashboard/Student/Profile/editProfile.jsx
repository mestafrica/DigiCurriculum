import axios from "axios";
import { useEffect, useRef, useState } from "react";
// PropTypes removed: not used in this component
import AshtokenLoader from "./AshtokenLoader";

function EditProfile({ closeModel }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    school: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const modelRef = useRef();
  const baseUrl = import.meta.env.VITE_API_URL;

  const refCloseFormModel = (e) => {
    if (modelRef.current === e.target) closeModel();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`${baseUrl}/user/${userId}`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const user = res.data.user;
        setForm({
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          school: user.school || "",
          email: user.email || "",
        });
      } catch (err) {
        console.error("Error fetching user data:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const updateProfile = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await axios.patch(
        `${baseUrl}/update-user/${userId}`,
        {
          firstName: form.firstName,
          lastName: form.lastName,
          school: form.school,
          email: form.email,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccessMessage("Profile updated successfully!");
      setTimeout(() => closeModel(), 1200);
    } catch (err) {
      console.error("Error updating profile:", err);
      setErrorMessage(err.response?.data?.message || "Update failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      ref={modelRef}
      onClick={refCloseFormModel}
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center text-white"
    >
      <div className="w-full lg:w-2/3 p-4">
        <form onSubmit={updateProfile}>
          <div className="bg-white border border-secondary shadow-lg rounded-lg p-6">
            <div className="flex justify-between border-b pb-2 mb-4">
              <h2 className="text-xl font-bold text-black">Edit Profile</h2>
              <button type="button" className="text-primary font-semibold">User info</button>
            </div>

            {successMessage && (
              <p className="mb-3 text-sm text-green-600 font-medium">{successMessage}</p>
            )}
            {errorMessage && (
              <p className="mb-3 text-sm text-red-600 font-medium">{errorMessage}</p>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-primary text-sm font-bold mb-2">First Name</label>
                <input
                  name="firstName"
                  type="text"
                  value={form.firstName}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-[#9399A6] leading-tight bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-primary text-sm font-bold mb-2">Last Name</label>
                <input
                  name="lastName"
                  type="text"
                  value={form.lastName}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-[#9399A6] leading-tight bg-gray-100"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-primary text-sm font-bold mb-2">School</label>
                <input
                  name="school"
                  type="text"
                  value={form.school}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-[#9399A6] leading-tight bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-primary text-sm font-bold mb-2">Email Address</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-[#9399A6] leading-tight bg-gray-100"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              {!isLoading ? (
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary text-white font-bold py-2 px-4 rounded"
                >
                  Update
                </button>
              ) : (
                <AshtokenLoader />
              )}
              <button
                type="button"
                onClick={closeModel}
                className="bg-secondary hover:bg-primary text-white font-bold py-2 px-4 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
