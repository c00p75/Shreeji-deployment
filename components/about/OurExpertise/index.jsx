"use client";

import { useRef } from "react";
import "./style.scss";
import Image from "next/image";
import { Square } from "lucide-react";
import expertiseImg from "@/public/backgrounds/about-bg-3.jpg";

const expertise = [
  {
    title: 'ICT Solutions',
    description: 'Supply, installation, and maintenance of computers, networking equipment, biometric systems, and communication devices.'
  },
  {
    title: 'Enterprise-Level Printing & Scanning',
    description: 'High-speed document scanning, OCR conversions, and cost-per-click enterprise printing solutions.'
  },
  {
    title: 'Custom Hardware Solutions',
    description: 'Development of internet kiosks, biometric-enabled scanners, and digital data capture devices.'
  },
  {
    title: 'Software & System Development',
    description: 'Mobile apps, e-forms, document management, and custom enterprise solutions.'
  },
  {
    title: 'Large Format Printing & Advertising',
    description: 'High-quality branding solutions, banners, billboards, and promotional materials.'
  },
];

const OurExpertise = () => {

  return (
    <section className="z-[1] bg-white our-expertise relative w-screen scroll-smooth pb-28 pt-10">
      <h2 className="font-bold text-6xl text-left px-32 mb-10 text-[var(--primary)]">
        Our <span className="text-[#171717]">Expertise</span>
      </h2>
  
      
      <div className="flex pt-10 px-20">
        <div className="flex flex-[3] gap-5 expertise-card-container">
          {expertise.map((item, i) => (
            <div className="flex gap-3 items-center expertise-card" key={`expertise-${i}`}>
              {/* <span>
                <Square className="w-4 h-4" fill="#171717" strokeWidth={3} />
              </span> */}
              <div>
                <span className="font-bold">{item.title}</span>
                <p>{item.description}</p>
              </div>                
            </div>
          ))}
        </div> 

        <div className="flex-[2]">
          <Image src={expertiseImg} className="h-full object-cover rounded-ss-[10%] rounded-ee-[10%]  " />
        </div>    
      </div>   
    </section>
  );
};

export default OurExpertise;
