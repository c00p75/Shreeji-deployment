"use client";

import heroBg from "@/public/backgrounds/about-bg-2.jpg";
import "./style.scss";
import Image from "next/image";
import hex from "@/public/backgrounds/hex-pattern.jpeg";

const HeroSection = () => {
  return (
    <section className="z-[1] about-hero-section h-screen relative overflow-hidden" style={{backgroundImage: `url(${heroBg.src})` }}>  
      {/* <Image src={heroBg} className="absolute bottom-[-10%] right-0 w-[40%] h-[80%] z-[2]" /> */}
      <div className="z-[1] absolute left-0 top-0 h-full w-full hero-overlay" />
      <div className="absolute left-0 top-0 h-full w-full z-[1] flex-center">        
        <div className="text-center absolute">
          <h1
            className="flex-center md:w-[70%] font-extrabold text-8xl uppercase text-transparent bg-clip-text leading-[80px] px-10 text-wrap pb-1"
            style={{
              backgroundImage: `url('${hex.src}')`,
              backgroundPosition: '20% 30%',
              backgroundSize: '40%',
              // backgroundAttachment: 'fixed'
            }}
          >
            <span className="font-extrabold">ICT, enterprise printing, and digital solutions.</span>
            <span className="text-2xl capitalize font-normal pt-7">We provide ICT, enterprise printing, and digital solutions to drive efficiency and innovation in Zambia.</span>            
          </h1>
        </div>        
      </div>      
    </section>
  );
};

export default HeroSection;
