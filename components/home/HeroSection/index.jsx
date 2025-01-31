"use client";

import Image from "next/image";
import laptops from "@/public/elements/laptops-crossed.png";
import "./style.scss";
import { useState } from "react";
import ActiveButton from "./ActiveButton";

const HeroSection = () => {
  const [active, setActive] = useState(1);
  const handleActiveVid = (selected) => {
    if (selected == 1) {
      setActive(1);
    } else if (selected == 2) {
      setActive(2);
    } else if (selected == 3) {
      setActive(3);
    } else if (selected == 4) {
      setActive(4);
    }
  };

  const videoSources = {
    1: "/videos/it.mp4",
    2: "/videos/bpo.mp4",
    3: "/videos/printing.mp4",
    4: "/videos/skylift.mp4",
  };

  return (
    <section className="h-screen relative overflow-hidden bg-[var(--primary)]">
      <video
        className="absolute left-0 top-0 w-full h-full object-cover rounded-lg z-0"
        muted
        loop
        autoPlay
        playsInline
        src={videoSources[active]}
      />

      <div className="z-[1] absolute left-0 top-0 h-full w-full hero-overlay" />

      <div className="absolute bottom-0 h-[13rem] mb-4 w-full z-[2] flex justify-around text-white slide-btn-container">
        <ActiveButton
          title="IT Solutions"
          desc="IT Solutions"
          index={1}
          current={active}
          onClick={() => handleActiveVid(1)}
          progress={40}
        />

        <ActiveButton
          title="BPO Services"
          desc="BPO Services"
          index={2}
          current={active}
          onClick={() => handleActiveVid(2)}
          progress={100}
        />

        <ActiveButton
          title="Print Advertisement"
          desc="Print Advertisement"
          index={3}
          current={active}
          onClick={() => handleActiveVid(3)}
          progress={100}
        />

        <ActiveButton
          title="Skylift Services"
          desc="Skylift Services"
          index={4}
          current={active}
          onClick={() => handleActiveVid(4)}
          progress={100}
        />
      </div>
      {/* <div className="z-[2] hero-bg absolute top-[-150%] left-[52%] rotate-[24.5deg] w-[200%] h-[400%] overflow-hidden" /> */}
      {/* <div className="z-[3] hero-text-card absolute top-[70%] left-[40%] transform -translate-x-1/2 -translate-y-1/2">
        <div className="hero-text-container flex-center text-center">
          <p className="opacity-0">Empowering</p>
          <div className="words">
            <span className="word">Tried</span>
            <span className="word">Tested</span>
            <span className="word">Trusted</span>
            <span className="word">Tried</span>
          </div>
        </div>
      </div> */}
      {/* <Image
        src={laptops}
        alt="Logo"
        quality={100}
        className="z-[3] h-full w-auto absolute top-1/2 left-[42%] transform -translate-x-1/2 -translate-y-1/2"
      /> */}
      <div className="z-[1] w-full h-full text-white flex hero-text">
        <div className="w-full text-xl px-10 z-[1] mt-[15%]">
          <h1 className="font-bold text-3xl">Empowering Your Business</h1>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
