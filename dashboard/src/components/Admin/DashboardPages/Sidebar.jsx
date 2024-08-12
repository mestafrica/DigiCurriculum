import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { BsBroadcast } from "react-icons/bs";
import { TbReportAnalytics } from "react-icons/tb";

import {
  LuTable2,
  LuUsers2,
  LuCog,
  LuArrowLeftFromLine,
  LuChevronLeft,
} from "react-icons/lu";


const AdminSideBar = () => {
  const Menus = [
    {
      title: "Dashboard",
      icon: <LuTable2 />,
      link: "/admin-dashboard/dashboard",
    },
    {
      title: "Broadcasts",
      icon: <BsBroadcast />,
      link: "/admin-dashboard/broadcasts",
    },
    {
      title: "Users",
      icon: <LuUsers2 />,
      link: "/admin-dashboard/users",
    },
    // {
    //   title: "Reporting",
    //   icon: <TbReportAnalytics />,
    //   link: "/admin-dashboard/report",
    //   gap: true,
    // },
    {
      title: "Settings",
      icon: <LuCog />,
      link: "/admin-dashboard/settings",
      gap: true,
    },
  ];

  const [open, setOpen] = useState(false);
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
      window.location.href = "/"
  };

  useEffect(() => {
    getUserData();
  }, [Index]);

  console.log(Index);
  return (
    <div
      className={` ${
        open ? "w-72 bg-gray-900" : "w-20"
      } flex flex-col justify-between backdrop-blur-sm bg-white/10 text-white h-[100vh] p-5 duration-300 sticky`}
    >
      <div>
        <LuChevronLeft
          className={`absolute text-sky-700 -right-3 top-12 bg-zinc-100 text-4xl border-cyan-700 border rounded-full ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img src="" alt="unilogo" className="w-8" />
          {userData ? (
            <div>
              <h1
                className={`text-white rounded-lg  origin-left font-medium text-xl duration-200 font-serif ${
                  !open && "scale-0"
                }`}
              >
                {`${userData.firstName} ${userData.lastName}`}
              </h1>

              <h1
                className={`text-white rounded-lg  origin-left text-sm duration-200 font-serif ${
                  !open && "scale-0"
                }`}
              >
                {`${userData.email}`}
              </h1>
            </div>
          ) : (
            ""
          )}
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <Link key={index} to={`${Menu.link}`}>
              <li
                className={`flex  rounded-md p-2 cursor-pointer bg-none text-white hover:text-[#68A803] focus:text-white text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-7" : "mt-2"} ${
                  Index == index ? "backdrop-blur-sm bg-white/10" : ""
                } `}
                onClick={() => changeIndex(index)}
              >
                {Menu.icon}
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  {Menu.title}
                </span>
              </li>
            </Link>
          ))}
          <li
            onClick={() => signOut()}
            className="flex rounded-md p-2 cursor-pointer text-white hover:text-[#68A803] focus:text-white text-sm items-center gap-x-4 mt-2"
          >
            <LuArrowLeftFromLine />
            <span className={`${!open && "hidden"} origin-left duration-200`}>
              Signout
            </span>
          </li>
        </ul>
        <br />

      </div>
        <div className={`${!open && "hidden"}`}>
          <hr />
          <smallFooter />
        </div>
    </div>
  );
};

export default AdminSideBar;
