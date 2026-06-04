import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUserById } from "../../../../services/authService";
import image from "../../../../assets/dashboard/Images/lesson.svg";
import image2 from "../../../../assets/dashboard/Images/calendar.svg";
import image3 from "../../../../assets/dashboard/Images/assignment.svg";

const TeacherDashboard = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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

    if (!token || !userId) {
      console.error("❌ No auth info found for teacher (token/userId missing)");
      setIsLoading(false);
      return;
    }

    const fetchUserInfo = async () => {
      try {
        const response = await getUserById(userId, token);
        setUserInfo(response.user || response);
      } catch (error) {
        console.error("❌ Error fetching teacher:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div className="w-full min-h-screen p-6 md:p-10 lg:p-16 bg-gray-50/50">
      <header className="mb-10 animate-fade-in">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">
          Hello, {isLoading ? (
            <span className="inline-block w-32 h-8 bg-gray-200 animate-pulse rounded align-middle"></span>
          ) : (
            <span className="text-primary">{userInfo?.firstName || "Teacher"}</span>
          )}!
        </h1>
        <p className="mt-2 text-lg text-gray-500">
          Let's create amazing learning experiences together.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mb-12">
        {/* Lesson Notes Card */}
        <Link 
          to="/teacher/lessons" 
          className="group flex flex-col justify-between bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-xl hover:border-yellow-200 transition-all duration-300 transform hover:-translate-y-1"
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-yellow-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <img alt="lesson-notes" src={image} className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Lesson Notes</h2>
            <p className="text-gray-500 leading-relaxed">
              Easily generate lesson plans and notes with AI assistance.
            </p>
          </div>
          <div className="mt-6 flex items-center text-yellow-600 font-semibold text-sm">
            Generate Now 
            <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          </div>
        </Link>

        {/* Lesson Calendar Card */}
        <Link 
          to="/teacher/calendar"
          className="group flex flex-col justify-between bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-xl hover:border-green-200 transition-all duration-300 transform hover:-translate-y-1"
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <img alt="lesson-calendar" src={image2} className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Lesson Calendar</h2>
            <p className="text-gray-500 leading-relaxed">
              Prepare and manage your lesson calendar with just a click.
            </p>
          </div>
          <div className="mt-6 flex items-center text-green-600 font-semibold text-sm">
            View Calendar 
            <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          </div>
        </Link>

        {/* AI Chat / Tools Card */}
        <Link 
          to="/teacher/tools"
          className="group flex flex-col justify-between bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-1"
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-2xl">
              🤖
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">AI Assistant</h2>
            <p className="text-gray-500 leading-relaxed">
              Chat with our advanced AI to find curriculum details and resources.
            </p>
          </div>
          <div className="mt-6 flex items-center text-blue-600 font-semibold text-sm">
            Start Chatting 
            <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          </div>
        </Link>
      </section>

      <div className="mt-12 text-center w-full max-w-2xl mx-auto">
        <div className="bg-gradient-to-r from-teal-500 to-emerald-500 rounded-3xl p-8 shadow-lg text-white">
          <h3 className="text-2xl font-bold mb-3">Looking for more?</h3>
          <p className="text-teal-50 mb-6">
            Explore our full suite of tools tailored specifically to your teaching needs.
          </p>
          <Link 
            to="/teacher/ready"
            className="inline-block bg-white text-teal-600 hover:bg-gray-50 font-bold py-3 px-8 rounded-full shadow-md transition-transform hover:scale-105"
          >
            Explore Tools
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
