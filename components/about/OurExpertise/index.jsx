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
    <section className="our-expertise z-[3] bg-white our-expertise relative w-screen scroll-smooth pb-28 gap-10">      
      <div className="flex mt-24 px-20 gap-10 items-center">
        <div className="flex-[3] bg-[whitesmoke] p-2 rounded-sm m-10 mr-20 mt-5 rotate-6 expertise-img-container h-[85vh]">
          <Image src={expertiseImg} className="scale-x-[-1] h-full object-cover rounded-sm -rotate-6 shadow-xl shadow-black/40" />
        </div>

        <div className="flex flex-[4] expertise-card-container">
          <h2 className="w-full font-bold text-6xl mb-16 text-[var(--primary)] mt-10 flex flex-center relative gap-10 md:px-5">
            <p className="w-fit relative bg-[#87703f] z-[1] text-white px-2">Our <span className="text-[#171717]">Expertise</span></p>
            <span className="w-full h-[2px] bg-white absolute z-0 top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2"/>
          </h2>

          {expertise.map((item, i) => (
            <div className="flex m-3 items-center justify-center expertise-card" key={`expertise-${i}`}>
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
      </div>   
    </section>
  );
};

export default OurExpertise;
