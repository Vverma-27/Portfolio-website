"use client";
import React, { useEffect, useState } from "react";
import FileGroup from "./FileGroup";
import BottomNavbar from "./BottomNav";
import FileExplorerModal from "./FileExplorerModal";
import CommandPromptModal from "./CommandPromptModal";
import NotepadModal from "./NotepadModal";
import StartModal from "./StartModal";
import Tree from "@/FileTree";
import useStore from "@/store";

const HomePage = ({ os }: { os: string }) => {
  const { setFileStructure, fileStructure } = useStore();
  const fileList = [
    {
      icon: "/command-prompt.png",
      title: "About",
      action: "prompt",
      type: "file",
    },
    {
      icon: os === "macos" ? "/folder-macos.png" : "/folder.png",
      title: "Projects",
      action: "explorer",
      type: "folder",
    },
    {
      icon: os === "macos" ? "/notepad-macos.png" : "/notepad.png",
      title: "Connect",
      action: "notepad",
      type: "file",
    },
    {
      icon: "/github.png",
      title: "Github",
      link: "https://github.com/Vverma-27",
      type: "file",
    },
    {
      icon: "/upwork.png",
      title: "Upwork",
      link: "https://www.upwork.com/freelancers/~011685aff9a1ec110b",
      type: "file",
    },
  ];
  const projects = [
    {
      name: "Kalyan Trust",
      icon: "/kalyan.png",
      link: "https://kalyantrust.org/",
      githubLink: "https://github.com/Vverma-27/Kalyan",
    },
    {
      name: "Tragency Media",
      icon: "/tragency.png",
      link: "https://tragency-server.onrender.com",
      githubLink: "https://github.com/Tragency-Media",
    },
    {
      name: "AI/Multiplayer Stone Paper Scissors",
      icon: "/sps.png",
      link: "https://meta-sps.netlify.app/",
      githubLink: "https://github.com/Vverma-27/stone-paper-scissor",
    },
    {
      name: "Insta Create Clone",
      icon: "/chrome.png",
      link: "https://meta-meme.netlify.app/",
      githubLink: "https://github.com/Vverma-27/Meme-maker",
    },
    {
      name: "Stills",
      icon: "/stills.png",
      link: "",
      githubLink: "https://github.com/Vverma-27/Stills",
    },
    {
      name: "Compare Spotify",
      icon: "/spotify.png",
      link: "https://compare-spotify.vercel.app/",
      githubLink: "https://github.com/Vverma-27/compare-spotify",
    },
  ];
  const { tabsOpen, setTabsOpen, onOpen, pushHistory } = useStore();
  const [fullScreen, setFullScreen] = useState(false);

  useEffect(() => {
    const handleFullScreenChange = () => {
      setFullScreen(document.fullscreenElement != null);
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Meta") {
        e.preventDefault();
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Meta") {
        e.preventDefault();
        onOpen("start");
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    document.addEventListener("fullscreenchange", handleFullScreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullScreenChange);
    document.addEventListener("mozfullscreenchange", handleFullScreenChange);
    document.addEventListener("msfullscreenchange", handleFullScreenChange);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullScreenChange
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullScreenChange
      );
      document.removeEventListener(
        "msfullscreenchange",
        handleFullScreenChange
      );
    };
  }, []);
  useEffect(() => {
    const tree: Tree = new Tree();
    fileList.forEach((file) => {
      tree.insert(
        "root",
        file.title,
        //@ts-ignore
        file.type,
        file.icon,
        file.link,
        file.action
      );
    });
    projects.forEach((project) => {
      tree.insert(
        "Projects",
        project.name,
        "folder",
        os === "macos" ? "/folder-macos.png" : "/folder.png",
        "",
        "explorer"
      );
      if (project.link)
        tree.insert(project.name, "Visit", "file", project.icon, project.link);
      tree.insert(
        project.name,
        "Github",
        "file",
        "/github.png",
        project.githubLink
      );
      tree.insert(
        project.name,
        "Project Description",
        "file",
        os === "macos" ? "/notepad-macos.png" : "/notepad.png",
        "",
        "notepad"
      );
    });
    setFileStructure(tree);
    // const nodes = tree.getRootNodes();
    // console.log("🚀 ~ useEffect ~ nodes:", nodes);
  }, []);

  const handleFullscreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen().catch((err) => {
        console.error("Error attempting to enable full-screen mode:", err);
      });
      //@ts-ignore
    } else if (elem.webkitRequestFullscreen) {
      //@ts-ignore
      elem.webkitRequestFullscreen();
      //@ts-ignore
    } else if (elem.msRequestFullscreen) {
      //@ts-ignore
      elem.msRequestFullscreen();
    }
  };

  // if (!fullScreen) {
  //   return (
  //     <div className="w-full h-full flex justify-center items-center">
  //       <div className="bg-white p-8 rounded shadow-lg text-center">
  //         <h2 className="mb-4 text-lg font-bold">Enter Fullscreen</h2>
  //         <button
  //           onClick={handleFullscreen}
  //           className="p-2 bg-blue-500 text-white rounded"
  //         >
  //           Go Fullscreen
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <>
      <div
        className={`${
          os === "mobile"
            ? "h-auto flex-wrap flex-row pt-[2vh] px-[2vw] gap-[8vh] justify-start"
            : "h-full  flex-col justify-start items-center gap-[2vh]"
        }  w-fit z-[45] relative flex`}
      >
        {fileStructure?.getRootNodes().map((node) => {
          return node.renderNodeVertical(
            os === "mobile" ? 60 : 50,
            os === "mobile" ? 60 : 50,
            (action: string) => {
              onOpen(action, action === "explorer" ? "/projects/" : "");
            }
          );
        })}
      </div>
      <BottomNavbar os={os} />
      <FileExplorerModal
        os={os}
        open={
          tabsOpen.filter((e) => e.name === "explorer")[0]?.status === "open"
        }
        zIndex={`${
          tabsOpen.findIndex((e) => e.name === "explorer") === 0
            ? "z-10"
            : tabsOpen.findIndex((e) => e.name === "explorer") === 1
            ? "z-20"
            : tabsOpen.findIndex((e) => e.name === "explorer") === 1
            ? "z-30"
            : "z-40"
        }`}
      />
      <CommandPromptModal
        os={os}
        zIndex={`${
          tabsOpen.findIndex((e) => e.name === "prompt") === 0
            ? "z-10"
            : tabsOpen.findIndex((e) => e.name === "prompt") === 1
            ? "z-20"
            : tabsOpen.findIndex((e) => e.name === "prompt") === 1
            ? "z-30"
            : "z-40"
        }`}
        open={tabsOpen.filter((e) => e.name === "prompt")[0]?.status === "open"}
      />
      <NotepadModal
        os={os}
        zIndex={`${
          tabsOpen.findIndex((e) => e.name === "notepad") === 0
            ? "z-10"
            : tabsOpen.findIndex((e) => e.name === "notepad") === 1
            ? "z-20"
            : tabsOpen.findIndex((e) => e.name === "notepad") === 1
            ? "z-30"
            : "z-40"
        }`}
        open={
          tabsOpen.filter((e) => e.name === "notepad")[0]?.status === "open"
        }
      />
      {os.toLowerCase() === "windows" ? (
        <StartModal
          open={
            tabsOpen.filter((e) => e.name === "start")[0]?.status === "open"
          }
          onClose={() => {
            document.exitFullscreen();
            setFullScreen(false);
          }}
        />
      ) : null}
    </>
  );
};

export default HomePage;
