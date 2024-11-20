import React from "react";
import Sidebar07 from "./Sidebar07"; // Adjust the path as needed

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar07 />

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100">{children}</div>
    </div>
  );
};

export default DashboardLayout;
