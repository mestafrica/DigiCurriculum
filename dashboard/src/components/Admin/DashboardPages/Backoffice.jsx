import React from "react";
import { Outlet } from "react-router-dom";
import AdminSideBar from "./Sidebar";

const Backoffice = () => {
  return (
    <>
      <div className="min-h-[calc(100vh-64px)] flex gap-10 w-full max-w-screen-2xl mx-auto transparent">
        <aside className="fixed z-30 max-w-56 ">
          <AdminSideBar />
        </aside>
        <div className="flex-1 ml-20 w-full flex flex-col">
          {/* <NavBar /> */}
          <div className="flex-1 overflow-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Backoffice;