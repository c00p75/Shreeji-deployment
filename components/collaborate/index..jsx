'use client'

import { Briefcase, Handshake, Globe, Users, CheckCircle, Building, Lightbulb, Layers, Award, BarChart, ShieldCheck, PhoneCall } from "lucide-react";
import Image from "next/image";
import collaborateImage from "@/public/backgrounds/hex-pattern.jpeg";
import partner1 from "@/public/backgrounds/hex-pattern.jpeg";
import partner2 from "@/public/backgrounds/hex-pattern.jpeg";
import partner3 from "@/public/backgrounds/hex-pattern.jpeg";
import partner4 from "@/public/backgrounds/hex-pattern.jpeg";
import testimonialImage from "@/public/backgrounds/hex-pattern.jpeg";

export default function CollaborateWithUs() {
  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#403d2a]">
      
      {/* Hero Section */}
      <div className="relative bg-white shadow-md rounded-[40px] mx-6 mt-10 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center max-w-6xl mx-auto p-12">
          <div className="text-center md:text-left">
            <h1 className="text-5xl font-extrabold mb-6 text-[#403d2a]">Collaborate With Us</h1>
            <p className="text-lg text-gray-700 mb-6">
              Partner with us to leverage <strong>cutting-edge enterprise solutions</strong>, enhance business efficiency, and drive growth in a competitive landscape.
            </p>
            <a 
              href="/contact" 
              className="inline-block py-3 px-8 bg-[#807045] text-white text-lg font-semibold rounded-full transform hover:bg-[#403d2a] transition-all"
            >
              Get In Touch
            </a>
          </div>
          <div className="hidden md:block">
            <Image 
              src={collaborateImage} 
              alt="Collaboration" 
              className="rounded-xl shadow-lg"
              width={500} 
              height={400} 
            />
          </div>
        </div>
      </div>

      {/* Why Collaborate With Us? */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-semibold text-center mb-12 text-[#403d2a]">Why Collaborate With Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              icon: <Handshake size={50} className="text-[#807045]" />, 
              title: "Trusted Partnerships", 
              description: "We have built strong alliances with leading enterprises, ensuring seamless collaboration for success-driven projects."
            },
            {
              icon: <Globe size={50} className="text-[#807045]" />, 
              title: "Global Reach", 
              description: "With a presence in diverse industries, we provide innovative solutions that cater to businesses worldwide."
            },
            {
              icon: <Users size={50} className="text-[#807045]" />, 
              title: "Industry Expertise", 
              description: "Our team of professionals brings years of experience, helping businesses navigate challenges and achieve their goals."
            },
            {
              icon: <Award size={50} className="text-[#807045]" />, 
              title: "Proven Track Record", 
              description: "We have successfully partnered with top companies to deliver impactful and sustainable solutions."
            },
            {
              icon: <ShieldCheck size={50} className="text-[#807045]" />, 
              title: "Security & Compliance", 
              description: "We prioritize security and regulatory compliance to ensure a safe and transparent collaboration experience."
            },
            {
              icon: <BarChart size={50} className="text-[#807045]" />, 
              title: "Data-Driven Insights", 
              description: "We leverage analytics to make informed decisions and optimize business operations for long-term success."
            }
          ].map((item, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-lg text-center transform hover:scale-105 transition-all hover:shadow-2xl">
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-2xl font-semibold mb-2 text-[#403d2a]">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Industries We Serve */}
      <div className="bg-[#f9f9f9] py-20 px-6">
        <h2 className="text-4xl font-semibold text-center mb-12 text-[#403d2a]">Industries We Collaborate With</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          {[
            { title: "Finance & Banking", icon: <Building size={50} className="text-[#807045] mx-auto" /> },
            { title: "Telecommunications", icon: <PhoneCall size={50} className="text-[#807045] mx-auto" /> },
            { title: "Retail & E-Commerce", icon: <Layers size={50} className="text-[#807045] mx-auto" /> },
            { title: "Healthcare", icon: <ShieldCheck size={50} className="text-[#807045] mx-auto" /> },
            { title: "Government & Public Sector", icon: <Globe size={50} className="text-[#807045] mx-auto" /> },
            { title: "Technology & IT", icon: <Lightbulb size={50} className="text-[#807045] mx-auto" /> }
          ].map((item, index) => (
            <div key={index} className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all">
              {item.icon}
              <h3 className="text-2xl font-semibold mt-4 text-[#403d2a]">{item.title}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Partners Section */}
      <div className="bg-[#f9f9f9] py-20 px-6">
        <h2 className="text-4xl font-semibold text-center mb-12 text-[#403d2a]">Our Trusted Partners</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-center">
          {[partner1, partner2, partner3, partner4].map((partner, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all">
              <Image src={partner} alt={`Partner ${index + 1}`} className="rounded-xl" width={150} height={150} />
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="text-center py-16 bg-[#f9f9f9]">
        <h2 className="text-3xl font-bold text-[#403d2a]">Let’s Build a Stronger Future Together</h2>
        <p className="text-lg text-gray-700 mt-4 mb-8">
          Contact us today to discuss how we can collaborate for success.
        </p>
        <a 
          href="/contact" 
          className="inline-block py-3 px-8 bg-[#807045] text-white text-lg font-semibold rounded-full transform hover:bg-[#403d2a] transition-all"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
}
