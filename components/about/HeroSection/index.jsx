"use client";

import heroBg from "@/public/backgrounds/about-bg-2.jpg";
import "./style.scss";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="z-[1] about-hero-section h-screen relative overflow-hidden" style={{backgroundImage: `url(${heroBg.src})` }}>  
      {/* <Image src={heroBg} className="absolute bottom-[-10%] right-0 w-[40%] h-[80%] z-[2]" /> */}
      <div className="z-[1] absolute left-0 top-0 h-full w-full hero-overlay" />
      <div className="absolute left-0 top-0 h-full w-full z-[1] flex-center">        
        <div className="text-container">
          <h1 className="home-title text-8xl">
            <span>About Us</span>            
          </h1>
        </div>        
      </div>      
    </section>
  );
};

export default HeroSection;
