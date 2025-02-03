"use client";

import Image from "next/image";
import laptops from "@/public/elements/laptops-crossed.png";
import it from "@/public/backgrounds/hero-it.png";
import bpo from "@/public/backgrounds/hero-bpo.png";
import print from "@/public/backgrounds/hero-print.png";
import skylift from "@/public/backgrounds/hero-skylift.png";
import "./style.scss";
import { useEffect, useState } from "react";
import ActiveButton from "./ActiveButton";
import logo2 from "@/public/logos/Shreeji icon.png";

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

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prevActive) => (prevActive < 4 ? prevActive + 1 : 1));
    }, 10000);

    return () => clearInterval(interval); // Cleanup to prevent memory leaks
  }, [active]);

  return (
    <section className="home-hero-section h-screen relative overflow-hidden bg-[var(--primary)]">
      <div className="video-container absolute right-0 top-0 w-1/2 h-full">
        <Image
          src={it}
          alt="Shreeji"
          quality={100}
          className={`object-cover z-0 ${
            active == 1 ? "opacity-100" : "opacity-0"
          }`}
          fill
        />

        <Image
          src={bpo}
          alt="Shreeji"
          quality={100}
          className={`object-cover z-0 ${
            active == 2 ? "opacity-100" : "opacity-0"
          }`}
          fill
        />

        <Image
          src={print}
          alt="Shreeji"
          quality={100}
          className={`object-cover z-0 ${
            active == 3 ? "opacity-100" : "opacity-0"
          }`}
          fill
        />

        <Image
          src={skylift}
          alt="Shreeji"
          quality={100}
          className={`object-cover z-0 ${
            active == 4 ? "opacity-100" : "opacity-0"
          }`}
          fill
        />
        <video
          className="w-full h-full object-cover rounded-lg z-[1] relative"
          muted
          loop
          autoPlay
          playsInline
          src={videoSources[active]}
        />
      </div>

      <div className="z-[1] absolute left-0 top-0 h-full w-full hero-overlay" />
      <div className="absolute right-0 top-0 h-full w-1/2 z-[1] flex-center">
        {/* <h1 className="slider-text">
          {active == 1 && "IT Solutions"}
          {active == 2 && "BPO Services"}
          {active == 3 && "Print Advertisement"}
          {active == 4 && "Skylift Services"}
        </h1> */}

        {active == 1 && (
          <div className="text-container">
            <h1 className="home-title">
              <span>IT</span>
              <span>Solutions</span>
            </h1>
          </div>
        )}

        {active == 2 && (
          <div className="text-container">
            <h1 className="home-title">
              <span>BPO</span>
              <span>Services</span>
            </h1>
          </div>
        )}

        {active == 3 && (
          <div className="text-container">
            <h1 className="home-title">
              <span>Print</span>
              <span>Advertisement</span>
            </h1>
          </div>
        )}

        {active == 4 && (
          <div className="text-container">
            <h1 className="home-title">
              <span>Skylift</span>
              <span>Services</span>
            </h1>
          </div>
        )}
      </div>

      <div className="hidden absolute bottom-0 h-[13rem] mb-4 w-full z-[2] flex justify-around text-white slide-btn-container">
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
      <div className="z-[1] h-full text-white flex hero-text">
        <video
          className="absolute left-0 top-0 w-full h-full object-cover rounded-lg z-0"
          muted
          loop
          autoPlay
          playsInline
          src="/videos/black-bg.mp4"
        />
        <div className="w-full text-xl px-10 z-[1] flex-center justify-center bg-[rgba(0,0,0,0.85)]">
          <Image
            src={logo2}
            alt="Logo"
            quality={100}
            className="h-auto w-[50%]"
          />
          {/* <h1 className="font-bold text-3xl">Empowering Your Business</h1> */}
          <div className="content">
            <h1 className="title flex-center h-32">
              Shreeji
              <div className="aurora">
                <div className="aurora__item"></div>
                <div className="aurora__item"></div>
                <div className="aurora__item"></div>
                <div className="aurora__item"></div>
              </div>
            </h1>
            <div className="subtitle flex gap-2 font-semibold text-3xl">
              <div>Tried,</div>
              <div>Trusted &</div>
              <div>Tested</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
