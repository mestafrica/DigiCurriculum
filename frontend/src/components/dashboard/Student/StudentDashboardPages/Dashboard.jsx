import React, { useState, useEffect } from "react";
import { useAuth } from "../../../../context/AuthContext";
import { getUserById } from "../../../../services/authService";
import image from "../../../../assets/dashboard/Images/lesson.svg";
import image2 from "../../../../assets/dashboard/Images/calendar.svg";
import image3 from "../../../../assets/dashboard/Images/assignment.svg";
import { Link } from "react-router-dom";

const StudentDashboard = () => {
  const { token, userId } = useAuth();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    let token = urlParams.get("token");
    let userId = urlParams.get("userId");

    if (token && userId) {
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
    } else {
      token = localStorage.getItem("token");
      userId = localStorage.getItem("userId");
    }

    if (!token || !userId) return;

    const fetchUserInfo = async () => {
      try {
        const response = await getUserById(userId, token);
        setUserInfo(response.user || response);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div className="mt-24 px-4 md:px-20 w-full text-foreground">
      {/* Greeting Section */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold">
          Hello,{" "}
          <span className="text-primary text-orange-500">
            {userInfo?.firstName || "Loading..."}
          </span>
        </h1>
        <p className="text-muted-foreground mt-1 text-lg">
          Let's create amazing learning experiences together ✨
        </p>
      </div>

      {/* Cards Section */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        <Link to="/tasks">
          {/* Lesson Notes */}
          <div className="p-6 bg-yellow-50 rounded-xl shadow hover:shadow-lg transition hover:-translate-y-1 cursor-pointer">
            <img src={image} alt="lesson-notes" className="w-16 mx-auto" />
            <h2 className="text-xl font-semibold text-center mt-4">tasks</h2>
            <p className="text-muted-foreground text-center mt-2">
              Easily generate structured lesson notes.
            </p>
          </div>
        </Link>

        {/* Lesson Calendar */}
        <Link to="/tools">
          <div className="p-6 bg-green-50 rounded-xl shadow hover:shadow-lg transition hover:-translate-y-1 cursor-pointer">
            <img src={image2} alt="lesson-calendar" className="w-16 mx-auto" />
            <h2 className="text-xl font-semibold text-center mt-4">
              AI Tools
            </h2>
            <p className="text-muted-foreground text-center mt-2">
              Prepare your lesson calendar instantly.
            </p>
          </div>
        </Link>

        {/* Assignment */}
        <Link to="/library">
          <div className="p-6 bg-blue-50 rounded-xl shadow hover:shadow-lg transition hover:-translate-y-1 cursor-pointer">
            <img src={image3} alt="assignment" className="w-16 mx-auto" />
            <h2 className="text-xl font-semibold text-center mt-4">
              Library
            </h2>
            <p className="text-muted-foreground text-center mt-2">
              Generate customized student assignments effortlessly.
            </p>
          </div>
        </Link>
      </div>

      {/* Explore Button */}
      <div className="mt-10 flex justify-center">
        <button className="bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition font-medium py-4 px-10 rounded-full shadow-md w-full md:w-auto">
          Explore our suite of tools tailored to your teaching needs
        </button>
      </div>
    </div>
  );
};

export default StudentDashboard;
