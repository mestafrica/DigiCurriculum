import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsBroadcast } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import { TbReportAnalytics } from "react-icons/tb";
import {
  LuTable2,
  LuUsers2,
  LuCog,
  LuArrowLeftFromLine,
  LuChevronLeft,
  LuScroll,
  LuCalendar,
} from "react-icons/lu";
import { MdOutlineAssessment } from "react-icons/md";
import SmallFooter from "../../Small-Footer/smallfooter";

const AdminSideBar = ({ isOpen, setIsOpen }) => {
  const Menus = [
    {
      title: "Dashboard",
      icon: <LuTable2 />,
      link: "/admin/dashboard",
    },
     {
      title: "Curriculum",
      icon: <LuScroll />,
      link: "/admin/curriculum",
    },
    {
      title: "Assessment",
      icon: <MdOutlineAssessment />,
      link: "/admin/assessment",
    },
    {
      title: "Calendar",
      icon: <LuCalendar />,
      link: "/admin/calendar",
    },
    {
      title: "Broadcasts",
      icon: <BsBroadcast />,
      link: "/admin/broadcasts",
    },
    {
      title: "Users",
      icon: <LuUsers2 />,
      link: "/admin/users",
    },
    {
      title: "Settings",
      icon: <LuCog />,
      link: "/settings",
      gap: true,
    },
  ];

  const [userData, setUserData] = useState({});
  const [Index, setIndex] = useState(null);

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
    localStorage.clear();
    window.location.href = "/";
  };

  useEffect(() => {
    getUserData();
  }, [Index]);

  return (
    <div>
      
        {/* Humburger Menu for Mobile devices */}
      {!isOpen && (
          <button className="md:hidden fixed top-4  bg-slate-950 left-2.5 z-50  text-black "  onClick={() => setIsOpen(true)} >
          <FaBars className="w-6 h-6 bg-white " />
        </button>
      ) }
      
       {/* Overlay when sidebar is open (closes sidebar on click) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <div className={ `fixed top-0 left-0 h-screen  z-50 transition-transform duration-300
          transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          bg-[#EAFAF4] text-black p-5 border border-secondary 
          flex flex-col justify-between md:translate-x-0 md:static`}
           >

            
        
          {/* <LuChevronLeft
          className={`absolute text-sky-700 -right-3 top-12 bg-zinc-100 text-4xl border-secondary border rounded-full ${
            !isOpen && "rotate-180"
          }`}
          onClick={() => setIsOpen(!isOpen)}
        /> */}
            {/* 3. Close Button for Mobile View */}
        {isOpen && (
          <button 
          className="absolute top-4  right-4 md:hidden text-black text-2xl" 
          onClick={() => setIsOpen(false)}
        >
          &times;
        </button>
        )}

        {/* Sidebar container */}
        <div className="flex md:gap-x-4  items-center  ">
        <Link to="/admin" className={`${isOpen} text-black font-bold text-3xl`}>
          LitmusTest
        </Link>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex rounded-md cursor-pointer bg-none text-black hover:text-primary focus:text-black text-sm items-center 
              ${Menu.gap ? "mt-7" : "mt-2"} ${
                Index == index ? "backdrop-blur-sm bg-white/70" : ""
              } `}
              onClick={() => changeIndex(index)}
            >
              <Link to={`${Menu.link}`} className="flex p-2 items-center gap-x-4 w-full">
                {Menu.icon}
                <span
                  className={`${isOpen} origin-left duration-200`}
                >
                  {Menu.title}
                </span>
              </Link>
            </li>
          ))}
          <li
            onClick={() => signOut()}
            className="flex rounded-md p-2 cursor-pointer text-black hover:text-primary focus:text-black text-sm items-center gap-x-4 mt-2"
          >
            <LuArrowLeftFromLine />
            <span className={`${!isOpen && "hidden"} origin-left duration-200`}>
              Sign out
            </span>
          </li>
        </ul>
        <br />
      
      <div className={`${isOpen}`}>
        <hr />
        <SmallFooter/>
      </div>
      
        </div>
    </div>
  );
};

export default AdminSideBar;


