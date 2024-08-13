import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import StudentSideBar from "./Sidebar";

const StudentRoom = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true); // Sidebar is open by default

  return (
    <div className="min-h-[calc(100vh-64px)] flex gap-10 w-full max-w-screen-2xl mx-auto transparent">
      <aside className="fixed z-30">
        {/* Pass the state and setter to AdminSideBar */}
        <StudentSideBar isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} />
      </aside>
      <div
        className={`flex-1 w-full flex flex-col duration-300 ${
          isSidebarOpen ? "ml-60" : "ml-20"
        }`}
      >
        {/* <NavBar /> */}
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default StudentRoom;
