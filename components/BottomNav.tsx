// components/BottomNavbar.js
import useStore from "@/store";
import Image from "next/image";
import React, { useState } from "react";

const BottomNavbar = ({ os }: { os: string }) => {
  const { tabsOpen, onOpen } = useStore();
  const getIndicator = (name: string) => {
    const tab = tabsOpen.find((tab) => {
      return tab.name === name;
    });
    if (tab) {
      if (tab.status === "open") {
        return (
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-1.5 bg-blue-500 rounded-full"></div>
        );
      } else if (tab.status === "minimized") {
        return (
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-gray-500 rounded-full"></div>
        );
      }
    }
    return null;
  };
  const navList = [
    {
      icon: os === "macos" ? "/finder.png" : "/windows-start.png",
      name: "start",
    },
    {
      icon: os === "macos" ? "/folder-macos.png" : "/file-explorer.png",
      name: "explorer",
    },
    { icon: "/command-prompt.png", name: "prompt" },
    {
      icon: os === "macos" ? "/notepad-macos.png" : "/notepad.png",
      name: "notepad",
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-black bg-opacity-70 backdrop-blur-md border-t border-gray-700 z-[100] ">
      <div className="max-w-7xl mx-auto px-4 pb-1.5 pt-0.5">
        <div className="h-[6vh] flex items-center justify-center">
          <div className="flex items-center space-x-1 h-full">
            {navList.map((e) => {
              return (
                <div
                  onClick={() => {
                    if (e.name) onOpen(e.name, "/", "", e.name === "explorer");
                  }}
                  key={e.name}
                  className="h-full relative aspect-square  hover:bg-gray-500 hover:bg-opacity-35 flex justify-center items-center transition-colors rounded-md duration-500"
                >
                  <Image
                    className="active:h-[28px] active:w-[28px] transition-all ease-linear duration-75"
                    src={e.icon}
                    alt="Start"
                    width={32}
                    height={32}
                  />
                  {(e.name && e.name !== "start" && getIndicator(e.name)) ||
                    null}
                </div>
              );
            })}
            {/* <div className="h-full aspect-square  hover:bg-gray-500 hover:bg-opacity-35 flex justify-center items-center transition-colors rounded-md duration-500">
              <Image
                className="active:h-[28px] active:w-[28px] transition-all ease-linear duration-75"
                src="/windows-start.png"
                alt="Start"
                width={32}
                height={32}
              />
            </div>
            <div className="h-full aspect-square  hover:bg-gray-500 hover:bg-opacity-35  flex justify-center items-center transition-colors rounded-md duration-500">
              <Image
                className="active:h-[28px] active:w-[28px] transition-all ease-linear duration-75"
                src="/file-explorer.png"
                alt="File Explorer"
                width={32}
                height={32}
              />
              {getIndicator("explorer")}
            </div>
            <div className="h-full aspect-square  hover:bg-gray-500 hover:bg-opacity-35  flex justify-center items-center transition-colors rounded-md duration-500">
              <Image
                className="active:h-[28px] active:w-[28px] transition-all ease-linear duration-75"
                src="/command-prompt.png"
                alt="Command Prompt"
                width={32}
                height={32}
              />
              {getIndicator("prompt")}
            </div>
            <div className="h-full aspect-square  hover:bg-gray-500 hover:bg-opacity-35  flex justify-center items-center transition-colors rounded-md duration-500">
              <Image
                src="/chrome.png"
                alt="Chrome"
                width={32}
                height={32}
                className="active:h-[28px] active:w-[28px] transition-all ease-linear duration-75"
              />
              {getIndicator("chrome")}
            </div> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default BottomNavbar;
