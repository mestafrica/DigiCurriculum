import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  LuTable2,
  LuUser2,
  LuArrowLeftFromLine,
  LuChevronLeft,
} from "react-icons/lu";
import { FaTasks, FaBars } from "react-icons/fa";
import { PiSparkleLight } from "react-icons/pi";
import { IoLibraryOutline } from "react-icons/io5";
import SmallFooter from "../../Small-Footer/smallfooter";

const StudentSideBar = () => {
  // Use local state for isOpen and a way to set it
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const [Index, setIndex] = useState(null);

  const Menus = [
    {
      title: "Home",
      icon: <LuTable2 />,
      link: "/dashboard",
    },
    {
      title: "Tasks",
      icon: <FaTasks />,
      link: "/tasks",
    },
    {
      title: "Tools",
      icon: <PiSparkleLight />,
      link: "/tools",
    },
    {
      title: "Library",
      icon: <IoLibraryOutline />,
      link: "/library",
    },
    {
      title: "Profile",
      icon: <LuUser2 />,
      link: "/settings",
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
    localStorage.clear();
    window.location.href = "/";
  };

  useEffect(() => {
    getUserData();
  }, [Index]);

  return (
    <div>
        
      {/* 1. Hamburger Icon - visible only on mobile (md:hidden) */}
     {!isOpen && (
       <button
        className="md:hidden fixed top-3 bg-slate-950 left-2.5 z-50 text-black m"
        onClick={() => setIsOpen(true)} 
      >
        <FaBars className="w-6 h-6 bg-white " />
      </button>
     )}
       
        {/* Overlay when sidebar is open (closes sidebar on click) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* 2. Sidebar Container */}
      <div
        className={`
          fixed top-0 left-0 h-screen z-40 transition-transform duration-300
          transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          bg-[#EAFAF4]/80 text-black p-5 border border-secondary 
          flex flex-col justify-between md:translate-x-0 md:static
        `}
      >
        {/* 3. Close Button for Mobile View */}
        {isOpen && (
          <button 
          className="absolute top-4  right-4 md:hidden text-black text-2xl" 
          onClick={() => setIsOpen(false)}
        >
          &times;
        </button>
        )}
        
        {/* 4. Desktop Collapse Button */}
        <LuChevronLeft
          className={`
            hidden md:flex absolute md:text-sky-700 -right-3 top-12  bg-zinc-100 text-4xl 
            border-secondary border rounded-full cursor-pointer 
            ${isOpen ? "" : "rotate-180"  } 
          `}
          onClick={() => setIsOpen(!isOpen)}
        />
        
        {/* Sidebar Content */}
        <div>
          <div className="flex md:gap-x-4 mt-8 md:items-center">
            <Link to="/" className={`${!isOpen && "hidden"} text-black font-bold text-3xl`}>
              LitmusTest
            </Link>
          </div>
          <ul className="pt-6 ">
            {Menus.map((Menu, index) => (
              <Link key={index} to={`${Menu.link}`}>
                <li
                  className={`
                    flex rounded-md p-2 cursor-pointer bg-none text-black hover:text-primary focus:text-black text-sm items-center gap-x-4 
                    ${Menu.gap ? "mt-7" : "mt-2"} 
                    ${Index == index ? "backdrop-blur-sm bg-white/70" : ""}
                  `}
                  onClick={() => {
                    changeIndex(index);
                    setIsOpen(false); // Close sidebar after selecting a link on mobile
                  }}
                >
                  {Menu.icon}
                  <span
                    className={`${!isOpen && "hidden"} origin-left  duration-200`}
                  >
                    {Menu.title}
                  </span>
                </li>
              </Link>
            ))}
            <li
              onClick={() => signOut()}
              className="flex rounded-md p-2 cursor-pointer text-black hover:text-primary focus:text-black text-sm items-center gap-x-4 mt-2"
            >
              <LuArrowLeftFromLine />
              <span className={`${!isOpen && "hidden"}  origin-left duration-200`}>
                Signout
              </span>
            </li>
          </ul>
          <br />
        </div>

        {/* Footer */}
        <div className={`${!isOpen && "hidden"}`}>
          <hr />
          <SmallFooter />
        </div>
      </div>
    </div>
  );
};

export default StudentSideBar;