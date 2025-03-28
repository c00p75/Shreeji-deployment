"use client";

import { useRef } from "react";
import "./style.scss";
import Image from "next/image";
import { Square } from "lucide-react";
import celtel from "@/public/elements/celtel.png";
import zicta from "@/public/elements/zicta.jpg";
import mtn from "@/public/elements/mtn.jpg";
import moe from "@/public/elements/moe.png";
import lafarge from "@/public/elements/lafarge-holcim.png";
import stc from "@/public/elements/save-the-children.jpg";

const milestones = [    
  {
    title: 'ZICTA Initiative',
    description: `Computerization of over 150 schools and examination centers in 6 provinces countrywide. Supplied delivered and installed over 1764 Computers and 1200 Thin Clients with Teachers PC/Server using Class-room Manager.`,
    image: zicta,
  },
  {
    title: 'LaFarge Holcim',
    description: `Developed Electronic Proof of Delivery platform for use with various freighters to tie up delivery reports with back-end system in realtime and for theft mitigation by use of two-stage delivery check (client OTP, and GPS coordinates)`,
    image: lafarge,
  },
  {
    title: 'MTN Zambia',
    description: ` Bulk scanning of 3,000,000 documents, including handwritten KYC forms, and converting them to Digital Format. Recreation of 1,500,000 unrecognizable handwritten KYC forms to Digital forms by using Meta Data.`,
    image: mtn,
  },
  {
    title: 'Ministry of Education',
    description: `CSR-Support rendered in branding, Lab design, creation and maintenance for the Ministry's Mobile Computer E-Learning Bus platform.`,
    image: moe,
  },
  {
    title: 'Save the Children',
    description: `Developed and deployed a custom Asset Management Software for Save the Children, enhancing transparency, efficiency, and resource utilization.`,
    image: stc,
  },
  {
    title: 'CELTEL Zambia',
    description: `Implemented an NMS for 1,800+ GSM payphones in Zambia, enabling real-time tracking. Supplied payphones with thermal printers and long-range antennae to improve rural connectivity.`,
    image: celtel,
  },  
];

const OurJourney = () => {

  return (
    <section className="z-[1] our-journey relative w-screen scroll-smooth pb-28 pt-10 bg-gradient-to-br from-white to-[#f9f6e6]">
      <h2 className="w-full font-bold text-6xl mb-20 text-[var(--primary)] mt-20 flex flex-center relative gap-10 md:px-5">
        <p className="w-fit relative px-5 bg-gradient-to-br from-white to-[#fcfaf2] z-[1]"><span className="text-[#171717]">Our</span> Journey <span className="text-[#171717]"> & </span> Milestones</p>
        <span className="w-[90%] h-[2px] bg-[#87703fe6] absolute z-0 top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2"/>
      </h2>
   
      <p className="text-center pb-20">
        Our journey has been marked by strategic growth, impactful projects, and long-lasting partnerships.
      </p>

      {/* <p className="text-center">Some of our key achievements include.</p> */}
      
      <div className="flex relative overflow-x-auto gap-10 no-scrollbar scroll-smooth overflow-visible milestone-container">        
        {milestones.map((item, i) => (
          <div className="flex gap-3 items-start milestone" key={`expertise-${i}`}>
            <div className="relative">
              <Image src={item.image} className="object-cover rounded-md w-[20rem] " />              
            </div>
            <p className="milestone-title flex items-center rounded-md p-5 text-2xl">
              <span className="font-bold text-[#807045]">{item.title}</span>
              <span className="h-[1px] w-full bg-[#807045]" />
            </p>
            <p className="text-base">              
              {item.description}
            </p>                
          </div>
        ))}                            
      </div>
  
    </section>
  );
};

export default OurJourney;
