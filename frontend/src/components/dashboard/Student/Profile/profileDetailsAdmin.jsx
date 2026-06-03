import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../../context/AuthContext";
import { useLocation } from "react-router-dom";
import EditProfile from "./editProfile";

const ProfileDetailStudent = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [selectedImage, setSelectedImage] = useState("https://placehold.co/200x200");
  const fileInputRef = useRef(null);
  const [userData, setUserData] = useState({});
  const [showProfileModal, setShowProfileModal] = useState(false);

  const { token, userId } = useAuth();
  const location = useLocation();
  const baseUrl = import.meta.env.VITE_API_URL;

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
      console.error("❌ Error fetching profile:", err);
    }
  };

  const handleButtonClick = () => fileInputRef.current.click();

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
    const imageData = new FormData();
    imageData.append("avatar", selectedFile);
    try {
      await axios.post(`${baseUrl}/updateAvatar/${userId}`, imageData, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setUploadStatus("Image updated successfully!");
      getUserData();
    } catch (error) {
      console.error("❌ Error uploading avatar:", error);
      setUploadStatus("Error uploading file.");
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-center items-start gap-6 p-6">
        {/* LEFT SIDE - Avatar */}
        <div className="w-full lg:w-1/3 backdrop-blur-sm bg-orange-100 border border-[#A7D7C5] rounded-2xl p-6 shadow-md">
          <div className="text-center mb-4">
            <h2 className="text-xl md:text-2xl text-primary font-bold">
              {userData.firstName} {userData.lastName}
            </h2>
          </div>

          <div className="my-4 flex justify-center">
            <img
              src={
                userData?.avatar
                  ? `${baseUrl}/${userData.avatar.replace("uploads/", "")}`
                  : selectedImage
              }
              alt="Profile Avatar"
              className="rounded-full w-40 h-40 md:w-44 md:h-44 object-cover border border-secondary shadow"
            />
          </div>

          <div className="text-center flex flex-col items-center gap-3">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
            />
            <button
              onClick={handleButtonClick}
              className="w-full md:w-3/4 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 rounded-lg transition"
            >
              Select Image
            </button>
            <button
              onClick={handleUpload}
              className="w-full md:w-3/4 bg-secondary hover:bg-primary text-black font-bold py-2 rounded-lg transition"
            >
              Update Avatar
            </button>
            <p className="text-xs text-gray-500 mt-2 text-center leading-snug">
              Upload a new avatar. Larger images will be resized automatically. <br />
              Maximum upload size is 1MB.
            </p>
            {uploadStatus && (
              <p className="text-sm text-gray-800 font-medium mt-2">{uploadStatus}</p>
            )}
          </div>
        </div>

        {/* RIGHT SIDE - Profile Info */}
        <div className="w-full lg:w-2/3 backdrop-blur-sm bg-orange-100 border border-[#A7D7C5] rounded-2xl p-6 shadow-md">
          <div className="flex flex-col sm:flex-row justify-between border-b pb-3 mb-4">
            <h2 className="text-lg md:text-xl font-bold text-gray-800">Your Profile</h2>
            <button className="text-primary font-semibold text-sm mt-2 sm:mt-0">User Info</button>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col md:flex-row md:items-start gap-3">
              <div className="flex-1 flex flex-col gap-4">
                <div>
                  <label className="block text-gray-800 text-sm font-bold mb-1">Full Name</label>
                  <p className="text-[#9399A6]">{userData.firstName} {userData.lastName}</p>
                </div>
                <div>
                  <label className="block text-gray-800 text-sm font-bold mb-1">School</label>
                  <p className="text-[#9399A6]">{userData.school || "—"}</p>
                </div>
                <div>
                  <label className="block text-gray-800 text-sm font-bold mb-1">Email Address</label>
                  <p className="text-[#9399A6]">{userData.email}</p>
                </div>
              </div>
              <button
                onClick={() => setShowProfileModal(true)}
                className="w-full md:w-1/3 bg-secondary hover:bg-primary text-black font-bold py-2 rounded-lg self-start mt-1"
              >
                Update Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {showProfileModal && (
        <EditProfile
          closeModel={() => {
            setShowProfileModal(false);
            getUserData();
          }}
        />
      )}
    </>
  );
};

export default ProfileDetailStudent;
