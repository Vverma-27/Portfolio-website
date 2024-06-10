import Image from "next/image";
import React from "react";

const FileGroup = ({
  icon,
  title,
  link,
  action,
}: {
  icon: string;
  title: string;
  link?: string;
  action?: string;
}) => {
  return (
    <div
      className="flex flex-col gap-[0.5vh] items-center justify-center px-2.5 relative cursor-pointer"
      id="file-group"
      tabIndex={0}
    >
      <Image
        src={icon}
        alt={"chrome"}
        height={50}
        width={50}
        className="z-20"
      />
      <p className="font-extralight text-sm text-white z-20">{title}</p>
      <div className="overlay absolute top-0 left-0 w-full h-full bg-blue-500 opacity-0 transition-opacity duration-300 hover:opacity-20 focus:opacity-50"></div>
    </div>
  );
};

export default FileGroup;
