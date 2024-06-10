"use client";
import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
//@ts-ignore
import Halo from "vanta/dist/vanta.halo.min";

const VantaBg = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [vantaEffect, setVantaEffect] = useState(null);
  const vantaRef = useRef(null);
  useEffect(() => {
    const threeScript = document.createElement("script");

    threeScript.setAttribute("id", "threeScript");
    threeScript.setAttribute(
      "src",
      "https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js"
    );

    document.getElementsByTagName("head")[0].appendChild(threeScript);

    return () => {
      if (threeScript) {
        threeScript.remove();
      }
    };
  }, []);
  useEffect(() => {
    const colorTheme = [0x34568b, 0xcf3da4, 0x1e73e8, 0x25b303];

    if (!vantaEffect) {
      setVantaEffect(
        Halo({
          el: vantaRef.current,
          THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          size: 1,
          amplitudeFactor: 2,
          color: 0x000,
          //   baseColor: colorTheme[Math.floor(Math.random() * 4)],
        })
      );
    }
    return () => {
      //@ts-ignore
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);
  return (
    <div className="vanta-container">
      <div ref={vantaRef} style={{ position: "absolute" }} className="vanta">
        <div className="vanta-overlay"></div>
      </div>

      {children}
    </div>
  );
};
export default VantaBg;
