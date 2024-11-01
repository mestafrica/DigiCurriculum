import React from "react";

const SmallFooter = () => {
  return (
    <div className="bg-card bg-yellow-50 p-4 rounded-lg shadow-lg">
      <div className="flex items-center mb-4">
        <img aria-hidden="true" alt="" src="" className="" />
        <h2 className="text-sm font-semibold">Need help?</h2>
      </div>
      <p className="text-sm mb-4">Please check our docs</p>
      <button className="bg-black text-white hover:bg-black/80 py-2 px-4 rounded-full">
        <a href="https://documenter.getpostman.com/view/37671016/2sA3s6Ep5V" target="_blank" rel="noopener noreferrer">DOCUMENTATION</a>
      </button>
    </div>
  );
};

export default SmallFooter;
