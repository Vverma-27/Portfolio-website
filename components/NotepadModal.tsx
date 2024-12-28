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

const NotepadModal = ({
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
    onMinimize: rawOnMinimize,
    onClose: rawOnClose,
    currNotepadElem,
  } = useStore();
  console.log("🚀 ~ currNotepadElem:", currNotepadElem);
  const [onClose, onMinimize] = [
    () => rawOnClose("notepad"),
    () => rawOnMinimize("notepad"),
  ];
  let content;
  switch (currNotepadElem?.toLowerCase() || "connect with me") {
    case "connect with me":
      content = (
        <>
          <p className="font-bold">
            I look forward to connecting and potentially working on projects
            together.
          </p>
          <br />
          <a href="mailto:vverma270705@gmail.com">
            Email: vverma270705@gmail.com
          </a>
          <br />
          <a href="tel:+919971024733">Mobile: 9971024733</a>
        </>
      );
      break;
    case "qdine":
      content = (
        <>
          <p className="font-bold">
            Skills: AWS, React, Express, MongoDB, TypeScript, Socket.IO, Caddy,
            Docker, Subdomaining, React Charts
          </p>
          <br />
          <p className="font-bold">Project Description:</p>
          <p className="font-light text-sm leading-6 mt-2">
            This comprehensive fullstack application revolutionizes the
            restaurant ordering process through QR code technology. Built with
            React and TypeScript on the frontend, and Express with MongoDB on
            the backend, it offers a seamless experience for both customers and
            restaurant owners. Customers can scan a QR code to access the menu,
            select dishes, specify split payments, and complete orders directly
            from their phones. For restaurant management, the system includes an
            advanced admin dashboard featuring real-time analytics, employee and
            inventory management, customer database with insights, and
            streamlined payout options. The application leverages Socket.IO for
            real-time updates, is containerized with Docker for easy deployment,
            and utilizes Caddy for efficient reverse proxying and automatic
            HTTPS. AWS services are employed for robust cloud infrastructure,
            while subdomaining allows for multi-tenant support. React Charts are
            integrated to visualize critical business metrics, providing owners
            with actionable insights to optimize their operations.
          </p>
        </>
      );
      break;
    case "kalyan trust":
      content = (
        <>
          <p className="font-bold">
            Skills: Razorpay, Tailwind CSS, Next.js, TypeScript
          </p>
          <br />
          <p className="font-bold">Project Description:</p>
          <p className="font-light text-sm leading-6 mt-2">
            This fullstack application, developed for an NGO, integrates payment
            processing and receipt storage using Razorpay. Built with Next.js
            and TypeScript, it employs a custom Express server for backend
            functionality and is styled with Tailwind CSS for a modern and
            responsive user interface. The app facilitates secure and efficient
            payment transactions, ensuring reliable record-keeping for the
            NGO&apos;s financial operations.
          </p>
        </>
      );
      break;
    case "ai/multiplayer stone paper scissors":
      content = (
        <>
          <p className="font-bold">
            Skills: TypeScript, Socket.io, React, Node.js
          </p>
          <br />
          <p className="font-bold">Project Description:</p>
          <p className="font-light text-sm leading-6 mt-2">
            Developed a sophisticated stone-paper-scissors game with both AI and
            multiplayer modes. The AI opponent is designed using advanced
            pattern recognition techniques to adapt and respond to the
            player&apos;s strategies, providing a challenging and dynamic
            gameplay experience. In multiplayer mode, users can easily create
            and share a game room link to invite friends for a match. The game
            utilizes WebSockets for real-time communication, ensuring a seamless
            and interactive multiplayer experience.
          </p>
        </>
      );
      break;
    case "insta create clone":
      content = (
        <>
          <p className="font-bold">Skills: React, TypeScript, React DnD</p>
          <br />
          <p className="font-bold">Project Description:</p>
          <p className="font-light text-sm leading-6 mt-2">
            This application is developed using React and TypeScript, leveraging
            the React DnD library to replicate Instagram&apos;s create mode. It
            enables users to design and customize memes, providing functionality
            for exporting the finished creations.
          </p>
        </>
      );
      break;
    case "monopoly online":
      content = (
        <>
          <p className="font-bold">
            Skills: Typescript, React, Socket.io, WebRTC, Zustand
          </p>
          <br />
          <p className="font-bold">Project Description:</p>
          <p className="font-light text-sm leading-6 mt-2">
            This fullstack online Monopoly game allows users to create or join
            games and play with friends. The game features dynamic
            functionalities like property auctions, a marketplace for selling
            properties, and trading between players. Additionally, it includes a
            video calling feature powered by WebRTC, providing an immersive and
            interactive experience. The application is built for seamless
            real-time communication and game state management using Socket.io
            and Zustand, ensuring a smooth and engaging gameplay experience.
          </p>
        </>
      );
      break;
    case "tragency media":
      content = (
        <>
          <p className="font-bold">
            Skills: Express, Typescript, Mongodb, React, Redux, PWA, Socket.io
          </p>
          <br />
          <p className="font-bold">Project Description:</p>
          <p className="font-light text-sm leading-6 mt-2">
            This advanced fullstack MERN progressive web application allows
            users to post content in three diverse formats: vlogs, blogs, and
            text entries. It includes a comprehensive travel diary feature for
            detailed journey documentation and incorporates chat villages where
            travelers can connect and share experiences in real-time using
            WebSockets. The application is further enhanced with robust push
            notification capabilities, ensuring continuous user engagement and
            timely updates.
          </p>
        </>
      );
      break;
    case "stills":
      content = (
        <>
          <p className="font-bold">
            Skills: React Native, Expo, Typescript, Firebase-auth, Neo4j,
            Express
          </p>
          <br />
          <p className="font-bold">Project Description:</p>
          <p className="font-light text-sm leading-6 mt-2">
            I created a Snapchat clone enriched with camera functionality,
            friend recommendations, and chat features. Additionally, it offers
            the capability to discover users based on contacts. Leveraging Neo4j
            for the backend, I provide friend recommendations by harnessing the
            graph capabilities of the database. This project showcases the
            fusion of innovative features with advanced backend technology to
            deliver a dynamic social media experience.
          </p>
        </>
      );
      break;
    default:
      break;
  }

  return (
    <Modal maximized={maximized} open={open} zIndex={zIndex}>
      <>
        <ModalHeader
          os={os}
          onClose={onClose}
          title={currNotepadElem || "Connect with me"}
          onMinimize={onMinimize}
          onMaximize={() => setMaximized(!maximized)}
          maximized={maximized}
        />
        {/* <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 relative">
          <div
            className={`flex items-center space-x-2 absolute right-0 h-full ${
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
          <div className="text-sm font-medium capitalize">
            {currNotepadElem || "Connect with me"}
          </div>
        </div> */}

        <div className="p-4 h-[40vh] min-h-full overflow-y-auto">{content}</div>
      </>
    </Modal>
  );
};

export default NotepadModal;
