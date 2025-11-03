import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
import { useLocation } from "react-router-dom";
import EditEmail from "./emailEdit";
import EditProfile from "./editProfile";
import EditPassword from "./passwordEdit";

const ProfileDetailTeacher = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [selectedImage, setSelectedImage] = useState("https://placehold.co/200x200");
  const fileInputRef = useRef(null);
  const [userData, setUserData] = useState({});
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);

  const { token, userId } = useAuth();
  const location = useLocation();
  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    if (userId && token) {
      getUserData();
    }
  }, [location.pathname, userId, token]);

  const getUserData = async () => {
    try {
      const res = await axios.get(`${baseUrl}/user/${userId}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(res.data.user);
    } catch (err) {
      console.error("❌ Error fetching teacher profile:", err);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSelectedImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus("Please select a file first.");
      return;
    }

    let imageData = new FormData();
    imageData.append("avatar", selectedFile);

    try {
      const response = await axios.post(`${baseUrl}/updateAvatar`, imageData, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("✅ Image updated:", response.data);
      setUploadStatus("Image updated successfully!");
      getUserData();
    } catch (error) {
      console.error("❌ Error uploading avatar:", error);
      setUploadStatus("Error uploading file.");
    }
  };

  return (
    <>
      <div className="flex flex-wrap justify-center p-8">
        {/* LEFT SIDE - Avatar + Upload */}
        <div className="w-full h-full lg:w-1/3 p-4 backdrop-blur-sm bg-black/10 border border-[#A7D7C5] rounded-lg">
          <div className="text-center">
            <h2 className="text-2xl text-primary font-bold">
              {userData.firstName} {userData.lastName}
            </h2>
          </div>

          <div className="my-4 flex justify-center items-center">
            <img
              src={userData?.avatar ? `${baseUrl}/${userData.avatar}` : selectedImage}
              alt="Profile Avatar"
              className="rounded-full w-44 h-44 object-cover border border-secondary"
            />
          </div>

          <div className="text-center">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
            />
            <div className="flex flex-col gap-4">
              <button
                onClick={handleButtonClick}
                className="bg-gray-600 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded"
              >
                Select Image
              </button>
              <button
                onClick={handleUpload}
                className="bg-secondary hover:bg-primary text-black font-bold py-2 px-4 rounded"
              >
                Update Avatar
              </button>
            </div>
            <p className="text-sm text-zinc-500 mt-2">
              Upload a new avatar. Larger images will be resized automatically.
              Maximum upload size is 1MB.
            </p>
          </div>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-800">{uploadStatus}</p>
          </div>
        </div>

        {/* RIGHT SIDE - Profile Info */}
        <div className="w-full lg:w-2/3 px-4">
          <div className="backdrop-blur-sm bg-black/10 border border-[#A7D7C5] shadow-lg rounded-lg p-4">
            <div className="flex justify-between border-b pb-2">
              <h2 className="text-xl font-bold text-gray-800">Your Profile</h2>
              <button className="text-primary font-semibold">User Info</button>
            </div>

            <div className="flex flex-col gap-4 mt-4">
              <div className="flex flex-wrap gap-4 my-4">
                <div className="w-full md:w-2/3">
                  <label className="block text-gray-800 text-sm font-bold mb-2">
                    Full Name
                  </label>
                  <span className="text-[#9399A6] leading-tight">
                    {userData.firstName} {userData.lastName}
                  </span>
                </div>
                <button
                  onClick={() => setShowProfileModal(true)}
                  className="md:w-1/3 w-full bg-secondary hover:bg-primary text-black font-bold py-2 rounded"
                >
                  Update Profile
                </button>
              </div>

              <div className="flex flex-wrap gap-4 my-4">
                <div className="w-full md:w-2/3">
                  <label className="block text-gray-800 text-sm font-bold mb-2">
                    School
                  </label>
                  <span className="text-[#9399A6] leading-tight">
                    {userData.school || "—"}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 my-4">
                <div className="w-full md:w-2/3">
                  <label className="block text-gray-800 text-sm font-bold mb-2">
                    Email Address
                  </label>
                  <span className="text-[#9399A6] leading-tight">
                    {userData.email}
                  </span>
                </div>
                <button
                  onClick={() => setShowEmailModal(true)}
                  className="md:w-1/3 w-full bg-secondary hover:bg-primary text-black font-bold py-2 rounded"
                >
                  Update Email
                </button>
              </div>

              <div className="flex gap-4 my-4">
                <button
                  onClick={() => setShowPasswordModal(true)}
                  className="md:w-1/3 w-full bg-secondary hover:bg-primary text-black font-bold py-2 rounded"
                >
                  Update Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showProfileModal && <EditProfile closeModel={() => setShowProfileModal(false)} />}
      {showEmailModal && <EditEmail closeModel={() => setShowEmailModal(false)} />}
      {showPasswordModal && <EditPassword closeModel={() => setShowPasswordModal(false)} />}
    </>
  );
};

export default ProfileDetailTeacher;
