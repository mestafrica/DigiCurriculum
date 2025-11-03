import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import TeacherSideBar from "./Sidebar";

const TeacherRoom = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="md:min-h-[calc(100vh-64px)] flex gap-10 w-full md:max-w-screen transparent">
      <aside className="fixed z-30">
        <TeacherSideBar isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} />
      </aside>

      <div
        className={`flex-1 w-full flex flex-col duration-300 ${
          isSidebarOpen ? "md:ml-60" : "md:ml-20"
        }`}
      >
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default TeacherRoom;
