import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsBroadcast } from "react-icons/bs";
import { TbReportAnalytics } from "react-icons/tb";
import {
  LuTable2,
  LuUsers2,
  LuCog,
  LuArrowLeftFromLine,
} from "react-icons/lu";
import { FaBars } from "react-icons/fa";
import SmallFooter from "../../Small-Footer/smallfooter";

const localUrl = import.meta.env.VITE_LOCAL_URI;

const TeacherSideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const [Index, setIndex] = useState(null);

  const Menus = [
    {
      title: "Home",
      icon: <LuTable2 />,
      link: "/teacher/dashboard",
    },
    {
      title: "My Lessons",
      icon: <BsBroadcast />,
      link: "/teacher/lessons",
    },
    {
      title: "My Materials",
      icon: <LuUsers2 />,
      link: "/teacher/material",
    },
    {
      title: "Calendar",
      icon: <TbReportAnalytics />,
      link: "/teacher/calendar",
    },
    {
      title: "Ready To Use",
      icon: <TbReportAnalytics />,
      link: "/teacher/ready",
    },
    {
      title: "Profile",
      icon: <LuCog />,
      link: "/teacher/profile",
      gap: true,
    },
  ];

  const changeIndex = (index) => {
    localStorage.setItem("sidebarIndex", index);
    setIndex(index);
  };

  const getUserData = () => {
    const sidebarIndex = localStorage.getItem("sidebarIndex");
    setIndex(sidebarIndex);
    setUserData({
      _id: "",
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
    });
  };

  const signOut = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("userType");
  localStorage.removeItem("sidebarIndex");

  // ✅ Force redirect to the actual frontend landing page
  window.location.href = import.meta.env.VITE_BASE_URL;
};


  useEffect(() => {
    getUserData();
  }, [Index]);

  return (
    <div>
      {/* 1. Hamburger Icon for Mobile */}
      {!isOpen && (
        <button
          className="md:hidden fixed top-3 bg-slate-950 left-2.5 z-50"
          onClick={() => setIsOpen(true)}
        >
          <FaBars className="w-6 h-6 bg-white" />
        </button>
      )}

      {/* 2. Overlay (Mobile only) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* 3. Sidebar Container */}
      <div
        className={`fixed top-0 left-0 h-screen z-50 transition-transform duration-300
          transform ${isOpen ? "translate-x-0" : "-translate-x-full"}
          bg-[#EAFAF4] text-black p-5 border border-secondary 
          flex flex-col justify-between md:translate-x-0 md:static`}
      >
        {/* Close Button (Mobile) */}
        {isOpen && (
          <button
            className="absolute top-4 right-4 md:hidden text-black text-2xl"
            onClick={() => setIsOpen(false)}
          >
            &times;
          </button>
        )}

        {/* Header + Menu */}
        <div>
          <div className="flex md:gap-x-4 mt-8 md:items-center">
            <Link to="/teacher/dashboard" className="text-black font-bold text-3xl">
              LitmusTest
            </Link>
          </div>

          <ul className="pt-6">
            {Menus.map((Menu, index) => (
              <Link key={index} to={Menu.link}>
                <li
                  className={`flex rounded-md p-2 cursor-pointer text-black hover:text-primary text-sm items-center gap-x-4 
                    ${Menu.gap ? "mt-7" : "mt-2"} 
                    ${Index == index ? "backdrop-blur-sm bg-white/70" : ""}
                  `}
                  onClick={() => {
                    changeIndex(index);
                    setIsOpen(false);
                  }}
                >
                  {Menu.icon}
                  <span className="origin-left duration-200">
                    {Menu.title}
                  </span>
                </li>
              </Link>
            ))}

            {/* Signout */}
            <li
              onClick={signOut}
              className="flex rounded-md p-2 cursor-pointer text-black hover:text-primary text-sm items-center gap-x-4 mt-2"
            >
              <LuArrowLeftFromLine />
              <span className="origin-left duration-200">Signout</span>
            </li>
          </ul>
        </div>

        {/* Footer */}
        <div>
          <hr />
          <SmallFooter />
        </div>
      </div>
    </div>
  );
};

export default TeacherSideBar;
