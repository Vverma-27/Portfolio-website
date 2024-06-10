import useStore from "@/store";
import Image from "next/image";
import React from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { IoExitOutline } from "react-icons/io5";

const StartModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const {
    onMinimize: rawOnMinimize,
    onClose: rawOnClose,
    fileStructure,
    onOpen,
  } = useStore();
  const onMinimize = () => rawOnMinimize("start");

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-[51]"
      onClick={(e) => {
        onMinimize();
      }}
    >
      <div
        className="bg-black bg-opacity-70 backdrop-blur-lg w-[40vw] rounded-lg shadow-lg flex flex-col p-4"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {/* Search Bar */}
        {/* <div className="mb-4 flex items-center space-x-2 bg-white bg-opacity-20 rounded-full p-2">
          <FaSearch className="text-gray-300" />
          <input
            type="text"
            placeholder="Search..."
            className="flex-grow px-1 bg-transparent text-white placeholder-gray-300 border-none focus:outline-none"
          />
        </div> */}

        {/* Files List */}
        <div className="p-4 flex justify-around flex-wrap gap-x-10 gap-y-8">
          {fileStructure?.getRootNodes().map((node) => {
            return node.renderNodeVertical(24, 24, (action: string) => {
              onOpen(
                action,
                action === "explorer" ? "/projects/" : "",
                "start"
              );
            });
          })}
          {/* {fileStructure?.getRootNodes().map((node) => (
            <div
              key={index}
              className="flex items-center p-[3.5vmin] hover:bg-gray-100 text-white hover:text-gray-900"
              onClick={(e) => {
                if (file.link) window.open(file.link, "_blank");
                if (file.action) onOpen(file.action);
                if (file.onclick) file.onclick();
              }}
            >
              <div className="w-6 h-6 flex flex-col items-center  justify-center">
                <Image
                  src={file.icon}
                  alt={file.title}
                  width={24}
                  height={24}
                />
                <div>{file.title}</div>
              </div>
            </div>
          ))} */}
        </div>

        {/* Exit Icon */}
        <div className="self-end mt-auto">
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-red-600 text-white transition"
          >
            <IoExitOutline fontSize={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartModal;
