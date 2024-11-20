import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import {
  Home,
  Box,
  UserCog,
  BarChart2,
  Key,
  LifeBuoy,
  Bell,
  Settings,
  LogOut,
} from "lucide-react"; // Import LogOut icon

const Sidebar = () => {
  return (
    <div className="h-screen w-1/5 bg-[#A9DEF9] text-black p-5 flex flex-col justify-between">
      {/* Top Section with Admin Icon and Updated Title */}
      <div>
        <ul className="space-y-4">
          {/* Home Link */}
          <li>
            <Link
              to="."
              className="flex items-center space-x-2 hover:bg-[#91c3dc] p-2 rounded cursor-pointer"
            >
              <span>GES Digital Curriculum</span>
            </Link>
          </li>
          <li>
            <Link
              to="."
              className="flex items-center space-x-2 hover:bg-[#A9DEF9] p-2 rounded cursor-pointer"
            >
              <Home className="w-5 h-5" />
              <span>Home</span>
            </Link>
          </li>

          <li>
            <Link
              to="api-keys-management"
              className="flex items-center space-x-2 hover:bg-[#A9DEF9] p-2 rounded cursor-pointer"
            >
              <Key className="w-5 h-5" />
              <span>API Keys Management</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Bottom Section - Settings and Logout Links */}
      <div className="flex flex-col mt-4">
        {/* Logout Button */}
        <div className="flex items-center space-x-2 hover:bg-[#A9DEF9] p-2 rounded cursor-pointer">
          <Link to="/" className="flex items-center space-x-2">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;