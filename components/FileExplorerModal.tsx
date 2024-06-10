import React, { useState } from "react";
import Image from "next/image";
import {
  FaWindowMinimize,
  FaWindowMaximize,
  FaTimes,
  FaRegSquare,
  FaFolderOpen,
  FaBackward,
  FaForward,
} from "react-icons/fa";
import {
  VscChromeClose,
  VscChromeMaximize,
  VscChromeMinimize,
  VscChromeRestore,
} from "react-icons/vsc";
import { RiCloseFill } from "react-icons/ri";
import Modal from "./Modal";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import useStore from "@/store";
import ModalHeader from "./ModalHeader";

const FileExplorerModal = ({
  os,
  open,
  zIndex,
}: {
  os: string;
  open: boolean;
  zIndex: string;
}) => {
  const [maximized, setMaximized] = useState(os === "mobile");
  const {
    fileStructure,
    history,
    currentHistoryIndex,
    setCurrentHistoryIndex,
    setTabsOpen,
    tabsOpen,
    onMinimize: rawOnMinimize,
    onOpen,
    onClose: rawOnClose,
  } = useStore();
  const [onClose, onMinimize] = [
    () => rawOnClose("explorer"),
    () => rawOnMinimize("explorer"),
  ];
  return (
    <Modal maximized={maximized} open={open} zIndex={zIndex}>
      <>
        <ModalHeader
          os={os}
          onClose={onClose}
          title="File Explorer"
          onMinimize={onMinimize}
          onMaximize={() => setMaximized(!maximized)}
          maximized={maximized}
        />
        {/* <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 relative">
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
                  onClick={() => setMaximized(!maximized)}
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
                      <VscChromeMinimize className="text-black" />
                    </div>
                    <div
                      onClick={() => setMaximized(!maximized)}
                      className="p-1 hover:bg-gray-400 hover:bg-opacity-40 h-full items-center flex px-[1vw] duration-150 transition-all"
                    >
                      {maximized ? (
                        <VscChromeRestore className="text-black" />
                      ) : (
                        <VscChromeMaximize className="text-black" />
                      )}
                    </div>
                  </>
                )}
                <div
                  onClick={() => {
                    onClose();
                  }}
                  className="p-1 hover:bg-red-500 hover:bg-opacity-100 h-full items-center flex px-[1vw] duration-150 transition-all text-black hover:text-white"
                >
                  <VscChromeClose />
                </div>
              </>
            )}
          </div>
          <div className="text-sm font-medium">File Explorer</div>
        </div> */}
        <div className="px-2 py-1 border-b border-gray-200 bg-gray-100 flex items-center">
          <div className="flex items-center mr-5 gap-2">
            <IoMdArrowBack
              className=" cursor-pointer"
              onClick={() => {
                if (currentHistoryIndex - 1 > 0)
                  setCurrentHistoryIndex(currentHistoryIndex - 1);
              }}
            />
            <IoMdArrowForward
              className=" cursor-pointer"
              onClick={() => {
                if (currentHistoryIndex < history.length)
                  setCurrentHistoryIndex(currentHistoryIndex + 1);
              }}
            />
          </div>
          <FaFolderOpen className="text-gray-500 mr-2" fontSize={18} />
          <input
            type="text"
            readOnly
            value={
              "C://users/Vihaan/myportfolio" + history[currentHistoryIndex - 1]
            }
            className="w-full bg-transparent text-sm text-black focus:outline-none"
          />
        </div>
        {/* File List */}
        <div className="p-4">
          {fileStructure
            ?.getNodesAtPath(history[currentHistoryIndex - 1])
            .map((node) => {
              return node.renderNodeHorizontal(
                50,
                50,
                (action: string, path, key) => {
                  // setTabsOpen((to) => {
                  onOpen(
                    action,
                    action === "explorer" ? path : "",
                    "",
                    false,
                    key
                  );
                  // });
                }
              );
            })}
          {/* {fileList.map((file, index) => (
            <div
              key={index}
              className="flex items-center py-2 hover:bg-gray-100"
              onClick={() => {
                if (file.link) window.open(file.link, "_blank");
                if (file.action) onOpen(file.action);
                if (file.onclick) file.onclick();
              }}
            >
              <div className="w-6 h-6 mr-2">
                <Image
                  src={file.title === "Github" ? "/github-mark.png" : file.icon}
                  alt={file.title}
                  width={24}
                  height={24}
                />
              </div>
              <div>{file.title}</div>
            </div>
          ))} */}
        </div>
      </>
    </Modal>
  );
};

export default FileExplorerModal;
