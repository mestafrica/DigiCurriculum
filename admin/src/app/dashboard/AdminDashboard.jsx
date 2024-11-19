import React, { useState } from "react";
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
} from "react-icons/fa";

const AdminDashboard = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isSettingsDropdownOpen, setSettingsDropdownOpen] = useState(false);
  const [isProfileCardOpen, setProfileCardOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const [user, setUser] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
  });

  const location = useLocation();

  const toggleSidebar = () => setSidebarCollapsed(!isSidebarCollapsed);

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
      <ul className="flex space-x-2">
        <li>
          <Link to="/admin-dashboard" className="text-blue-500 hover:underline">
            Home
          </Link>
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          return (
            <li key={to} className="flex space-x-2">
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

  return (
    <div
      className={`flex h-screen ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
      } relative`}
    >
      {/* Sidebar */}
      <div
        className={`${
          isSidebarCollapsed ? "w-16" : "w-64"
        } bg-[#EEFBF6] text-black transition-all duration-300 z-50 fixed top-0 left-0 h-full`}
      >
        <div className="flex justify-between items-center p-4">
          <h1
            className={`${
              isSidebarCollapsed ? "hidden" : "block"
            } text-lg font-bold`}
          >
            Admin Dashboard
          </h1>
          <button onClick={toggleSidebar} className="text-xl">
            {isSidebarCollapsed ? "☰" : "✕"}
          </button>
        </div>
        <nav className="mt-10 relative">
          {navLinks.map((link) => (
            <div key={link.name} className="relative group">
              <Link
                to={link.path}
                className={`flex items-center p-4 hover:bg-green-200 cursor-pointer ${
                  location.pathname === link.path ? "bg-green-200" : ""
                }`}
              >
                <span className="text-xl">{link.icon}</span>
                {!isSidebarCollapsed && (
                  <span className="ml-4">{link.name}</span>
                )}
              </Link>
              {/* Tooltip */}
              {isSidebarCollapsed && (
                <span className="absolute left-20 top-1/2 transform -translate-y-1/2 bg-black text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100">
                  {link.name}
                </span>
              )}
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

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarCollapsed ? "ml-16" : "ml-64"
        }`}
      >
        {/* Fixed Breadcrumb */}
        <div
          className="bg-[#EEFBF6] shadow p-4 fixed top-0 left-0 right-0 z-40"
          style={{ marginLeft: isSidebarCollapsed ? "4rem" : "16rem" }}
        >
          <nav className="text-sm">{generateBreadcrumbs()}</nav>
        </div>

        {/* Content Area */}
        <div className="p-4 flex-1 mt-16">
          {isProfileCardOpen && user && (
            <div className="bg-white p-6 rounded shadow-md w-96">
              <h2 className="text-xl font-bold mb-4">User Profile</h2>
              <div className="flex items-center mb-2">
                <FaUserAlt className="mr-2" />
                <span>{user.firstName}</span>
              </div>
              <div className="flex items-center mb-2">
                <FaUserAlt className="mr-2" />
                <span>{user.lastName}</span>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="mr-2" />
                <span>{user.email}</span>
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
