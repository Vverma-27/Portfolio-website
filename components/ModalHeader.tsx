import React from "react";
import {
  VscChromeClose,
  VscChromeMaximize,
  VscChromeMinimize,
  VscChromeRestore,
} from "react-icons/vsc";

const ModalHeader = ({
  os,
  onClose,
  onMinimize,
  onMaximize,
  maximized,
  title,
  dark,
}: {
  os: string;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  maximized: boolean;
  title: string;
  dark?: boolean;
}) => {
  return (
    <div
      className={`flex items-center justify-between px-4 py-2 border-b border-gray-200 relative ${
        !dark ? "" : "bg-gray-800 text-white"
      }`}
    >
      <div
        className={`flex items-center space-x-2 absolute  h-full ${
          os === "macos" ? "right-2" : "right-0"
        }`}
      >
        {os === "macos" ? (
          <>
            <div
              onClick={() => {
                onClose();
              }}
              className="w-3 h-3 bg-red-500 rounded-full"
            ></div>
            <div
              onClick={() => {
                // setMinimized(!minimized);
                onMinimize();
              }}
              className="w-3 h-3 bg-yellow-500 rounded-full"
            ></div>
            <div
              onClick={onMaximize}
              className="w-3 h-3 bg-green-500 rounded-full"
            ></div>
          </>
        ) : (
          <>
            {os === "mobile" ? null : (
              <>
                <div
                  onClick={() => {
                    // setMinimized(!minimized);
                    onMinimize();
                  }}
                  className="p-1 hover:bg-gray-400 hover:bg-opacity-40 h-full items-center flex px-[1vw] duration-150 transition-all"
                >
                  <VscChromeMinimize
                    className={dark ? "text-white" : "text-black"}
                  />
                </div>
                <div
                  onClick={onMaximize}
                  className="p-1 hover:bg-gray-400 hover:bg-opacity-40 h-full items-center flex px-[1vw] duration-150 transition-all"
                >
                  {maximized ? (
                    <VscChromeRestore
                      className={dark ? "text-white" : "text-black"}
                    />
                  ) : (
                    <VscChromeMaximize
                      className={dark ? "text-white" : "text-black"}
                    />
                  )}
                </div>
              </>
            )}
            <div
              onClick={() => {
                onClose();
              }}
              className={`p-1 hover:bg-red-500 hover:bg-opacity-100 h-full items-center flex px-[1vw] duration-150 transition-all ${
                dark ? "text-white " : "text-black "
              } hover:text-white`}
            >
              <VscChromeClose />
            </div>
          </>
        )}
      </div>
      <div className="text-sm font-medium capitalize">{title}</div>
    </div>
  );
};

export default ModalHeader;
