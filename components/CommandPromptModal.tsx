import React, { useEffect, useState } from "react";
import {
  VscChromeClose,
  VscChromeMaximize,
  VscChromeMinimize,
  VscChromeRestore,
} from "react-icons/vsc";
import Modal from "./Modal";
import useStore from "@/store";
import ModalHeader from "./ModalHeader";

const CommandPromptModal = ({
  os,
  open,
  zIndex,
}: {
  os: string;
  open: boolean;
  zIndex: string;
}) => {
  const [maximized, setMaximized] = useState(os === "mobile");
  const [typedCommand, setTypedCommand] = useState("");
  const [showResponse, setShowResponse] = useState(false);
  const { onMinimize: rawOnMinimize, onClose: rawOnClose } = useStore();
  const [onClose, onMinimize] = [
    () => rawOnClose("prompt"),
    () => rawOnMinimize("prompt"),
  ];

  useEffect(() => {
    let commandTimeout: any, responseTimeout: any;
    if (open) {
      let command = "whoami";
      let index = 0;
      setTypedCommand("");
      setShowResponse(false);

      const typeCommand = () => {
        if (index < command.length) {
          setTypedCommand(command.slice(0, index + 1));
          index++;
          commandTimeout = setTimeout(typeCommand, 200); // Adjust typing speed here
        } else {
          responseTimeout = setTimeout(() => setShowResponse(true), 200); // Delay before showing response
        }
      };

      typeCommand();
    } else {
      setTypedCommand("");
      setShowResponse(false);
    }
    return () => {
      clearTimeout(responseTimeout);
      clearTimeout(commandTimeout);
    };
  }, [open]);

  return (
    <Modal maximized={maximized} open={open} theme="dark" zIndex={zIndex}>
      <>
        <ModalHeader
          os={os}
          onClose={onClose}
          title="Command Prompt"
          onMinimize={onMinimize}
          onMaximize={() => setMaximized(!maximized)}
          maximized={maximized}
          dark
        />
        {/* <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 relative bg-gray-800 text-white">
          <div
            className={`flex items-center space-x-2 absolute right-0 h-full ${
              os === "macos" ? "right-2" : "right-0"
            }`}
          >
            {os === "macos" ? (
              <>
                <div
                  onClick={onClose}
                  className="w-3 h-3 bg-red-500 rounded-full cursor-pointer"
                ></div>
                <div
                  onClick={onMinimize}
                  className="w-3 h-3 bg-yellow-500 rounded-full cursor-pointer"
                ></div>
                <div
                  onClick={() => setMaximized(!maximized)}
                  className="w-3 h-3 bg-green-500 rounded-full cursor-pointer"
                ></div>
              </>
            ) : (
              <>
                <div
                  onClick={onMinimize}
                  className="p-1 hover:bg-gray-400 hover:bg-opacity-40 h-full items-center flex px-[1vw] duration-150 transition-all cursor-pointer"
                >
                  <VscChromeMinimize className="text-white" />
                </div>
                <div
                  onClick={() => setMaximized(!maximized)}
                  className="p-1 hover:bg-gray-400 hover:bg-opacity-40 h-full items-center flex px-[1vw] duration-150 transition-all cursor-pointer"
                >
                  {maximized ? (
                    <VscChromeRestore className="text-white" />
                  ) : (
                    <VscChromeMaximize className="text-white" />
                  )}
                </div>
                <div
                  onClick={onClose}
                  className="p-1 hover:bg-red-500 hover:bg-opacity-100 h-full items-center flex px-[1vw] duration-150 transition-all text-white cursor-pointer"
                >
                  <VscChromeClose />
                </div>
              </>
            )}
          </div>
          <div className="text-sm font-medium">Command Prompt</div>
        </div> */}
        <div className="p-4 bg-black text-white font-mono h-[40vh] min-h-full">
          <div>C:\Users\Vihaan&gt; {typedCommand}</div>
          {showResponse ? (
            <>
              <div>
                Vihaan Verma | MERN stack developer | Freelancer | College
                Student
              </div>
              <br />
              <div>C:\Users\Vihaan&gt;</div>
            </>
          ) : null}
        </div>
      </>
    </Modal>
  );
};

export default CommandPromptModal;
