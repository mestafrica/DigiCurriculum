import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../../context/AuthContext";
import EditEmail from "./emailEdit";
import EditPassword from "./passwordEdit";
import EditProfile from "./editProfile";

const ProfileDetailsTeacher = () => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null); // local preview only
  const fileInputRef = useRef(null);
  const [userData, setUserData] = useState({});
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const { token, userId } = useAuth();
  const location = useLocation();
  const baseUrl =
    import.meta.env.VITE_API_URL ||
    import.meta.env.VITE_API_BASE_URL ||
    "http://localhost:8080";

  useEffect(() => {
    if (userId && token) {
      getUserData();
    }
  }, [location.pathname, userId, token]);

  // Load saved avatar from localStorage on mount
  useEffect(() => {
    const savedAvatar = localStorage.getItem(`avatar_${userId}`);
    if (savedAvatar) {
      setAvatarUrl(savedAvatar);
    }
  }, [userId]);

  const getUserData = async () => {
    try {
      const res = await axios.get(`${baseUrl}/user/${userId}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(res.data.user || res.data);
    } catch (err) {
      console.error("❌ Error fetching teacher profile:", err);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file size (max 1MB)
    if (file.size > 1024 * 1024) {
      setUploadStatus("File too large. Maximum size is 1MB.");
      return;
    }

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarUrl(reader.result);
      setUploadStatus(""); // clear any previous status
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus("Please select an image first.");
      return;
    }

    setIsUploading(true);
    setUploadStatus("Saving avatar...");

    // Since the backend has no /updateAvatar endpoint, we save the avatar
    // as a base64 string in localStorage (client-side persistence).
    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result;
        localStorage.setItem(`avatar_${userId}`, base64);
        setAvatarUrl(base64);
        setUploadStatus("Avatar updated successfully!");
        setSelectedFile(null);
        setIsUploading(false);
        // Clear status after 3 seconds
        setTimeout(() => setUploadStatus(""), 3000);
      };
      reader.onerror = () => {
        setUploadStatus("Error reading file.");
        setIsUploading(false);
      };
      reader.readAsDataURL(selectedFile);
    } catch (err) {
      console.error("❌ Error saving avatar:", err);
      setUploadStatus("Error updating avatar.");
      setIsUploading(false);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const displayAvatar =
    avatarUrl ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      (userData.firstName || "T") + "+" + (userData.lastName || "")
    )}&background=10b981&color=fff&size=200`;

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-center items-start gap-6 p-6">
        {/* LEFT SIDE - Avatar + Upload */}
        <div className="w-full lg:w-1/3 backdrop-blur-sm bg-white/60 border border-[#A7D7C5] rounded-2xl p-6 shadow-md">
          <div className="text-center mb-4">
            <h2 className="text-xl md:text-2xl text-primary font-bold">
              {userData.firstName} {userData.lastName}
            </h2>
            <p className="text-sm text-gray-500 mt-1">{userData.userType}</p>
          </div>

          <div className="my-4 flex justify-center">
            <img
              src={displayAvatar}
              alt="Profile Avatar"
              className="rounded-full w-40 h-40 md:w-44 md:h-44 object-cover border-4 border-secondary shadow-lg"
            />
          </div>

          <div className="flex flex-col gap-3 mt-6">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />

            <button
              onClick={handleButtonClick}
              disabled={isUploading}
              className={`w-full md:w-3/4 mx-auto text-white font-semibold py-2 rounded-lg transition ${
                isUploading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              Select Image
            </button>

            <button
              onClick={handleUpload}
              disabled={!selectedFile || isUploading}
              className={`w-full md:w-3/4 mx-auto font-semibold py-2 rounded-lg transition ${
                !selectedFile || isUploading
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-secondary hover:bg-primary text-black"
              }`}
            >
              {isUploading ? "Saving..." : "Update Avatar"}
            </button>

            <p className="text-xs text-gray-500 mt-2 text-center leading-snug">
              Upload a new avatar. Larger images will be resized automatically.{" "}
              <br />
              Maximum upload size is 1MB.
            </p>

            {uploadStatus && (
              <p
                className={`text-sm font-medium mt-2 text-center ${
                  uploadStatus.toLowerCase().includes("error") ||
                  uploadStatus.toLowerCase().includes("large")
                    ? "text-red-600"
                    : uploadStatus.toLowerCase().includes("success")
                    ? "text-green-600"
                    : "text-blue-600"
                }`}
              >
                {uploadStatus}
              </p>
            )}
          </div>
        </div>

        {/* RIGHT SIDE - Profile Info */}
        <div className="w-full lg:w-2/3 backdrop-blur-sm bg-white/60 border border-[#A7D7C5] rounded-2xl p-6 shadow-md">
          <div className="flex flex-col sm:flex-row justify-between border-b pb-3 mb-4">
            <h2 className="text-lg md:text-xl font-bold text-gray-800">
              Your Profile
            </h2>
            <span className="text-primary font-semibold text-sm mt-2 sm:mt-0">
              {userData.userType || "Teacher"}
            </span>
          </div>

          <div className="flex flex-col gap-5">
            {/* Full Name */}
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <div className="flex-1">
                <label className="block text-gray-800 text-sm font-bold mb-1">
                  Full Name
                </label>
                <p className="text-[#9399A6]">
                  {userData.firstName} {userData.lastName}
                </p>
              </div>
              <button
                onClick={() => setShowProfileModal(true)}
                className="w-full md:w-1/3 bg-secondary hover:bg-primary text-black font-bold py-2 rounded-lg transition"
              >
                Update Profile
              </button>
            </div>

            {/* School */}
            <div>
              <label className="block text-gray-800 text-sm font-bold mb-1">
                School
              </label>
              <p className="text-[#9399A6]">{userData.school || "—"}</p>
            </div>

            {/* Country */}
            <div>
              <label className="block text-gray-800 text-sm font-bold mb-1">
                Country
              </label>
              <p className="text-[#9399A6]">{userData.country || "—"}</p>
            </div>

            {/* Email */}
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <div className="flex-1">
                <label className="block text-gray-800 text-sm font-bold mb-1">
                  Email Address
                </label>
                <p className="text-[#9399A6]">{userData.email}</p>
              </div>
              <button
                onClick={() => setShowEmailModal(true)}
                className="w-full md:w-1/3 bg-secondary hover:bg-primary text-black font-bold py-2 rounded-lg transition"
              >
                Update Email
              </button>
            </div>

            <div className="flex justify-start mt-2">
              <button
                onClick={() => setShowPasswordModal(true)}
                className="w-full md:w-1/3 bg-secondary hover:bg-primary text-black font-bold py-2 rounded-lg transition"
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showProfileModal && (
        <EditProfile
          closeModel={() => {
            setShowProfileModal(false);
            getUserData();
          }}
        />
      )}
      {showEmailModal && (
        <EditEmail closeModel={() => setShowEmailModal(false)} />
      )}
      {showPasswordModal && (
        <EditPassword closeModel={() => setShowPasswordModal(false)} />
      )}
    </>
  );
};

export default ProfileDetailsTeacher;
