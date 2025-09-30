import React, { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext"; // ✅ keep only one import
import { getUserById } from "../../../services/authService";
import image from "../../../assets/Images/lesson.svg";
import image2 from "../../../assets/Images/calendar.svg";
import image3 from "../../../assets/Images/assignment.svg";

const StudentDashboard = () => {
  const { token, userId } = useAuth(); // ✅ values come from AuthContext
  const [userInfo, setUserInfo] = useState(null);

 useEffect(() => {
  // Grab query params first
  const urlParams = new URLSearchParams(window.location.search);
  let token = urlParams.get("token");
  let userId = urlParams.get("userId");

  if (token && userId) {
    // ✅ Save in localStorage for persistence
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
  } else {
    // Fallback: use localStorage
    token = localStorage.getItem("token");
    userId = localStorage.getItem("userId");
  }

  if (!token || !userId) {
    console.error("❌ No auth info found (token/userId missing)");
    return;
  }

  const fetchUserInfo = async () => {
    try {
      const response = await getUserById(userId, token);
      console.log("✅ Fetched user:", response);
      setUserInfo(response.user || response);
    } catch (error) {
      console.error("❌ Error fetching user:", error);
    }
  };

  fetchUserInfo();
}, []);


  return (
    <div className="p-24 bg-background">
      <h1 className="text-2xl font-semibold text-foreground">
        Hello, {userInfo?.name || "Loading..."}
      </h1>
      <p className="text-muted-foreground">
        Let's create amazing learning experiences together.
      </p>

      <div className="flex items-center justify-center h-96">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-card bg-yellow-50 p-4 rounded-lg shadow-md">
            <div className="items-center">
              <img alt="lesson-notes" src={image} className="mr-2" />
              <h2 className="font-semibold">Lesson Notes</h2>
            </div>
            <p className="text-muted-foreground">
              Easily generate lessons notes
            </p>
          </div>

          <div className="bg-card bg-green-50 p-4 rounded-lg shadow-md">
            <div className="items-center">
              <img alt="lesson-calendar" src={image2} className="mr-2" />
              <h2 className="font-semibold">Lesson Calendar</h2>
            </div>
            <p className="text-muted-foreground">
              Prepare your lesson calendar with just a click
            </p>
          </div>

          <div className="bg-card bg-blue-50 p-4 rounded-lg shadow-md">
            <div className="items-center">
              <img alt="assignment" src={image3} className="mr-2" />
              <h2 className="font-semibold">Assignment</h2>
            </div>
            <p className="text-muted-foreground">
              Easily generate assignments tailored to your students' needs
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <button className="bg-secondary text-secondary-foreground hover:bg-primary py-4 px-16 rounded-full w-full">
          Explore our suite of tools tailored to your teaching needs
        </button>
      </div>
    </div>
  );
};

export default StudentDashboard;
