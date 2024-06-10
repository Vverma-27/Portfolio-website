import React from "react";

const Modal = ({ maximized, open, children, theme, zIndex }: any) => {
  // console.log("🚀 ~ Modal ~ open:", open);
  return (
    <div
      className={`fixed inset-0 flex justify-center items-center ${
        maximized && open ? "z-50" : !open ? "-z-10" : zIndex
      }`}
    >
      <div
        className={`${
          theme === "dark" ? "bg-[#777] text-white" : "bg-white"
        } w-[600px] overflow-hidden ${
          maximized && open ? "h-full w-full" : "rounded-lg"
        } ${!open ? "h-0 w-0" : ""} transition-all duration-75 `}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
