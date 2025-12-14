import React, { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import StudentSideBar from "./Sidebar";

const StudentRoom = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/"); // Redirect to login if not authenticated
    }
  }, [navigate]);

  return (
    <div className="md:min-h-[calc(100vh-64px)] flex gap-10 w-full md:max-w-screen transparent">
      <aside className="fixed z-30">
        <StudentSideBar isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} />
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

export default StudentRoom;
