import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  FaHome,
  FaFileAlt,
  FaList,
  FaTasks,
  FaUserCircle,
  FaSignOutAlt,
  FaCog,
  FaUserAlt,
  FaEnvelope,
  FaBars
} from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const AdminDashboard = () => {

  const [userId, setUserId] = useState(localStorage.getItem("userId") || null);
  const [userType, setUserType] = useState(localStorage.getItem("userType") || null);


  const [isOpen, setIsOpen] = useState(false);
  // const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isSettingsDropdownOpen, setSettingsDropdownOpen] = useState(false);
  const [isProfileCardOpen, setProfileCardOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const [user, setUser] = useState(null);


  const location = useLocation();

  // const toggleSidebar = () => setSidebarCollapsed(!isSidebarCollapsed);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    document.body.className =
      newTheme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black";
  };

  const handleLogout = () => {
    setUser(null);
    console.log("User logged out");

  };

  const navLinks = [
    {
      name: "Home",
      icon: <FaHome />,
      path: "/admin-dashboard/dashboard-overview",
    },
    {
      name: "Curriculum Form",
      icon: <FaFileAlt />,
      path: "/admin-dashboard/curriculum",
    },
    {
      name: "Curriculum List",
      icon: <FaList />,
      path: "/admin-dashboard/curriculum-list",
    },
    // {
    //   name: "Bulk Operations",
    //   icon: <FaTasks />,
    //   path: "/admin-dashboard/bulk-operations",
    // },
  ];

  const generateBreadcrumbs = () => {
    const pathnames = location.pathname.split("/").filter((x) => x);
    return (
      <ul className="flex md:space-x-2">
        <li>
          <Link to="/admin-dashboard" className="text-blue-500 hover:underline">
            Home
          </Link>
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          return (
            <li key={to} className="flex md:space-x-2">
              <span>/</span>
              <Link to={to} className="text-blue-500 hover:underline">
                {value.replace(/-/g, " ")}
              </Link>
            </li>
          );
        })}
      </ul>
    );
  };



  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedAdminId = localStorage.getItem("adminId");

     console.log("Token from localStorage:", token);
  console.log("Admin ID from localStorage:", storedAdminId);

    if (token && storedAdminId) {
      const BASE_URL = import.meta.env.VITE_BASE_URL;
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);

        axios.get(`${BASE_URL}/admin/auth/me/${storedAdminId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((res) => setUser(res.data))
          .catch((error) => console.error("Error fetching admin profile:", error));
        console.log("Decoded token:", decoded);
        console.log("Admin ID from localStorage:", storedAdminId);
      } catch (err) {
        console.error("Failed to decode token:", err);
      }
    }
  }, []);

  if (!user) {
    return <p>Loading user info...</p>;
  }




  return (
    <div
      className={`flex h-screen ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
        } relative`}
    >
      {/* Sidebar */}
      <div
        className={"bg-[#EEFBF6] text-black transition-all duration-300 z-50 fixed top-0 left-0 h-full"}
      >
        {/* 1. Hamburger Icon - visible only on mobile (md:hidden) */}
        {!isOpen && (
          <button
            className="md:hidden fixed top-3 bg-slate-950 left-2.5 z-50  text-black "
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


        <div
          className={`
          fixed top-0 left-0 h-screen  z-50 transition-transform duration-300
          transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          bg-[#EAFAF4] text-black  border border-secondary 
          flex flex-col justify-between md:translate-x-0 md:relative
            
        `}>
          {/* 3. Close Button for Mobile View */}
          {isOpen && (
            <button
              className="absolute top-2 right-0 md:hidden text-black text-3xl"
              onClick={() => setIsOpen(false)}
            >
              &times;
            </button>
          )}
          {/* Sidebar Content */}
          <div className="flex justify-between items-center p-4">
            <h1
              className={" text-lg tracking-wide font-bold"}
            >
              Admin Dashboard
            </h1>
            {/* <button onClick={toggleSidebar} className="text-xl">
            {isSidebarCollapsed ? "☰" : "✕"}
          </button> */}
          </div>
          <nav className="mt-4  space-y-1 overflow-y-auto flex-1 px-2">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                <Link
                  to={link.path}
                  className={`flex items-center p-4 hover:bg-green-200 cursor-pointer ${location.pathname === link.path ? "bg-green-200" : ""
                    }`}
                >
                  <span className="text-xl">{link.icon}</span>

                  <span className="ml-4">{link.name}</span>

                </Link>
                {/* Tooltip */}
                {/* {isSidebarCollapsed && (
                <span className="absolute left-20 top-1/2 transform -translate-y-1/2 bg-black text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100">
                  {link.name}
                </span>
              )} */}
              </div>
            ))}
          </nav>
          {/* Profile Icon */}
          <div className="absolute bottom-4 w-full">
            <div
              className="flex items-center justify-center p-4 hover:bg-green-200 cursor-pointer relative"
              onClick={() => setProfileDropdownOpen(!isProfileDropdownOpen)}
            >
              <FaUserCircle className="text-2xl" />
            </div>
            {isProfileDropdownOpen && (
              <div className="absolute bottom-16 left-4 bg-white text-black rounded shadow-lg w-40 z-50">
                <div
                  className="flex items-center p-4 hover:bg-gray-100 cursor-pointer"
                  onClick={() => setSettingsDropdownOpen(!isSettingsDropdownOpen)}
                >
                  <FaCog className="mr-2" />
                  <span>Settings</span>
                </div>
                {isSettingsDropdownOpen && (
                  <div className="bg-gray-100 text-sm text-black mt-2 rounded shadow-md">
                    <div
                      className="p-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => handleThemeChange("light")}
                    >
                      Light Theme
                    </div>
                    <div
                      className="p-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => handleThemeChange("dark")}
                    >
                      Dark Theme
                    </div>
                  </div>
                )}
                <div
                  className="flex items-center p-4 hover:bg-gray-100 cursor-pointer"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt className="mr-2" />
                  <span>Logout</span>
                </div>
                <div
                  className="flex items-center p-4 hover:bg-gray-100 cursor-pointer"
                  onClick={() => setProfileCardOpen(!isProfileCardOpen)}
                >
                  <FaUserCircle className="mr-2" />
                  <span>Profile</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={"flex-1 flex flex-col transition-all duration-300 "}
      >
        {/* Fixed Breadcrumb */}
        <div
          className="bg-[#EEFBF6] md:ml-52 ml-10 shadow p-3 md:p-4 fixed top-0 left-0 right-0 z-40 flex items-center  "
        // style={{ marginLeft: isSidebarCollapsed ? "4rem" : "16rem" }}
        >
          <nav className="text-sm truncate">{generateBreadcrumbs()}</nav>
        </div>

        {/* Content Area */}
        <div className="p-4 flex-1 mt-16 md:ml-48">
          {isProfileCardOpen && user && (
            <div className="bg-white p-6 rounded shadow-md w-96">
              <h2 className="text-xl font-bold mb-4">User Profile</h2>
              <div className="flex items-center mb-2">
                <FaUserAlt className="mr-2" />
                <span>{user?.firstName || 'N/A'}</span>
              </div>
              <div className="flex items-center mb-2">
                <FaUserAlt className="mr-2" />
                <span>{user?.lastName || 'N/A'}</span>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="mr-2" />
                <span>{user?.email || "N/A"}</span>
              </div>
            </div>
          )}
          {!isProfileCardOpen && <Outlet />} {/* Displays nested components */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
