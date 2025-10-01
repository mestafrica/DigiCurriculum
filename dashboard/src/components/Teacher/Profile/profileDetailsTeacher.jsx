import React, { useEffect, useRef } from "react";
import { useState } from "react";
import EditEmail from "./emailEdit";
import EditProfile from "./editProfile";
import EditPassword from "./passwordEdit";
import axios from "axios";
import { token } from "../../../../config";

const ProfileDetailsTeacher = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [selectedImage, setSelectedImage] = useState(
    "https://placehold.co/200x200"
  );
  const fileInputRef = useRef(null);
  const [userData, setUserData] = useState({});
  const [modelpassowrd, showPasswordModel] = useState(false);
  const [modelprofile, showProfileModel] = useState(false);
  const [modelemail, showEmailModel] = useState(false);

  const handleButtonClick = () => {
    fileInputRef.current.click();
    // setSelectedFile(event.target.files[0]);
  };

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = () => {
    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("http://3.89.152.217/api/user", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setUserData(result);
        console.log(result);
      })
      .catch((error) => console.error(error));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
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

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://3.89.152.217/api/v1/updateAvatar",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: imageData,
    };

    await axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setUploadStatus("Image Updated successfully!");
        getUserData();
      })
      .catch((error) => {
        console.log(error);
        setUploadStatus("Error uploading file.");
        console.error("Error uploading file:", error);
      });
  };

  return (
    <>
      <div className="flex flex-wrap justify-center  p-8">
        <div className="w-full h-full lg:w-1/3 p-4 backdrop-blur-sm bg-black/10 border border-[#A7D7C5] rounded-lg">
          <div className="text-center">
            <h2 className="text-2xl text-primary font-bold">{userData.name}</h2>
          </div>
          <div className="my-4 flex justify-center items-center">
            <img
              src={
                userData
                  ? `http://3.89.152.217/${userData.avatar}`
                  : selectedImage
              }
              alt="Profile Image"
              className="rounded-full w-44 h-44"
            />
          </div>
          <div className="text-center ">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
            />
           <div className="flex flex-col gap-4">
           <button
              onClick={handleButtonClick}
              className="bg-gray-600 hover:bg-gray-500 text-black font-bold py-2 px-4 rounded"
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
              Upload a new avatar. Larger image will be resized automatically.
              Maximum upload size is 1 MB
            </p>
          </div>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-800">{uploadStatus}</p>
          </div>
        </div>
        <div className="w-full lg:w-2/3 px-4">
          <div className="backdrop-blur-sm bg-black/10 border border-[#A7D7C5] shadow-lg rounded-lg md:p-4">
            <div className="flex justify-between border-b pb-2">
              <h2 className="text-xl font-bold text-gray-800">Edit Profile</h2>
              <div className="flex">
                <button className="text-primary font-semibold">User info</button>
              </div>
            </div>
            <div className="flex w-full flex-col gap-4 mt-4">
              <div className="flex gap-4 my-4">
                <div className="w-full">
                  <label className="block text-gray-800 text-sm font-bold mb-2">
                    Full Name
                  </label>
                  <span className=" rounded w-full  text-[#9399A6] leading-tight">
                    {userData.name}
                  </span>
                </div>
                <button
                  onClick={() => showProfileModel(true)}
                  className="w-1/3 h-8 bg-secondary hover:bg-primary text-black font-bold rounded"
                >
                  Update Profile
                </button>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-4">
                  <div className="w-full">
                    <label className="block text-black text-sm font-bold mb-2">
                      Phone
                    </label>
                    <span className=" rounded w-full  text-[#9399A6] leading-tight">
                      {userData.phone}
                    </span>
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="genderOptions"
                      className="block text-black text-sm font-bold mb-2"
                    >
                      Gender
                    </label>
                    <span className=" rounded w-full  text-[#9399A6] leading-tight">
                      {userData.gender}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <label className="block text-gray-800 text-sm font-bold mb-2">
                      Facebook Username
                    </label>
                    <span className=" rounded w-full  text-[#9399A6] leading-tight">
                      {userData.name}
                    </span>
                  </div>
                  <div>
                    <label className="block text-gray-800 text-sm font-bold mb-2">
                      Twitter Username
                    </label>
                    <span className=" rounded w-full  text-[#9399A6] leading-tight">
                      {userData.name}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 my-4">
                <div className="w-full">
                  <label className="block text-gray-800 text-sm font-bold mb-2">
                    Email Address
                  </label>
                  <span className=" rounded w-full  text-[#9399A6] leading-tight">
                    {userData.email}
                  </span>
                </div>

                <button
                  onClick={() => showEmailModel(true)}
                  className="w-1/3 h-8 bg-secondary hover:bg-primary text-black font-bold rounded"
                >
                  Update Email
                </button>
              </div>
            </div>

            <div className="flex gap-4 my-4">
              <div className="w-full">
                <label className="block text-gray-800 text-sm font-bold mb-2">
                  Password
                </label>
                <span className=" rounded w-full  text-[#9399A6] leading-tight">
                  {"••••••••••••••••••"}
                </span>
              </div>
              <button
                onClick={() => showPasswordModel(true)}
                className="w-1/3 max-h-8 min-h-4 bg-secondary hover:bg-primary text-black font-bold rounded"
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      </div>

      {modelprofile && (
        <EditProfile closeModel={() => showProfileModel(false)} />
      )}
      {modelemail && <EditEmail closeModel={() => showEmailModel(false)} />}
      {modelpassowrd && (
        <EditPassword closeModel={() => showPasswordModel(false)} />
      )}
    </>
  );
};

export default ProfileDetailsTeacher;
