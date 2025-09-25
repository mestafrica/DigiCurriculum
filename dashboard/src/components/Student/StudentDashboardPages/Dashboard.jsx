import React, { useState, useEffect } from "react";
import { FaAngleRight } from "react-icons/fa6";
import axios from "axios";
import image from "../../../assets/Images/lesson.svg";
import image2 from "../../../assets/Images/calendar.svg";
import image3 from "../../../assets/Images/assignment.svg";

const StudentDashboard = () => {
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(
          "https://digicurriculum.onrender.com/user/68c2d63504c670a41f02403b",
          { withCredentials: true }
        );
        setUserInfo(response.data.user);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserInfo();
  }, []);

  return (
    <div className="p-24 bg-background">
      <h1 className="text-2xl font-semibold text-foreground">
        Hello, {userInfo.firstName} {userInfo.lastName}
      </h1>
      <p className="text-muted-foreground">
        Let's create amazing learning experiences together.
      </p>
      <div className="flex items-center justify-center h-96">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-card bg-yellow-50 p-4 rounded-lg shadow-md">
            <div className="items-center">
              <img
                aria-hidden="true"
                alt="lesson-notes"
                src={image}
                className="mr-2"
              />
              <h2 className="font-semibold">Lesson Notes</h2>
            </div>
            <p className="text-muted-foreground">
              easily generate lessons notes
            </p>
          </div>

          <div className="bg-card bg-green-50 p-4 rounded-lg shadow-md">
            <div className="items-center">
              <img
                aria-hidden="true"
                alt="lesson-calendar"
                src={image2}
                className="mr-2"
              />
              <h2 className="font-semibold">Lesson Calendar</h2>
            </div>
            <p className="text-muted-foreground">
              prepare your lesson calendar with just a click
            </p>
          </div>

          <div className="bg-card bg-blue-50 p-4 rounded-lg shadow-md">
            <div className="items-center">
              <img
                aria-hidden="true"
                alt="assignment"
                src={image3}
                className="mr-2"
              />
              <h2 className="font-semibold">Assignment</h2>
            </div>
            <p className="text-muted-foreground">
              easily generate assignments tailored to your students needs
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <button className="bg-secondary text-secondary-foreground hover:bg-primary py-4 px-16 rounded-full w-full">
          Explore our suit of tools tailored to your teaching needs
        </button>
      </div>
    </div>
  );
};

export default StudentDashboard;
