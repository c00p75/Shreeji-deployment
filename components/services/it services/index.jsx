'use client'

import { useState } from "react";
import { motion } from "framer-motion";
import { Server, Monitor, Shield } from "lucide-react";
import bg from '@/public/backgrounds/service-hero-bg.jpg'
import '@/components/services/style.scss'
import Link from "next/link";
import Image from "next/image";
import MovingTextEffect from "@/components/moving text";

const itSolutions = [
  {
    title: "Hardware & Infrastructure",
    link: "it-solutions/hardware-and-infrastructure",
    description:
      "We provide a complete range of hardware solutions, from supplying computers, mobile devices, and networking equipment to setting up your server infrastructure. Our team ensures smooth installation and setup of your IT infrastructure, along with ongoing maintenance and support. We specialize in custom-built hardware solutions such as biometric scanners, internet kiosks, and multi-function printers tailored to your business needs. We offer 24/7 monitoring and support services to ensure your systems are always operating at peak performance.",
    icon: <Server size={40} className="text-[#807045]" />,
  },
  {
    title: "System & Platform Development",
    link: "it-solutions/system-and-platform-development",
    description:
      "We specialize in developing custom systems and platforms designed to solve specific business challenges. Our expertise includes developing mobile apps, document management systems, and data capture platforms for real-time reporting and analytics. Whether it's building enterprise-level applications or integrating existing software into your infrastructure, we focus on delivering scalable, secure, and efficient solutions. Our team works with you every step of the way to ensure your platform aligns with your business objectives and enhances operational efficiency.",
    icon: <Monitor size={40} className="text-[#807045]" />,
  },
  {
    title: "IT Consulting & Managed Services",
    link: "it-solutions/it-consulting-and-managed-services",
    description:
      "Our IT consulting services help businesses optimize their IT strategies, improve infrastructure, and address technical challenges. We provide expert advice on system integration, network design, cloud services, and cybersecurity. Our managed services offering includes proactive monitoring, security patching, troubleshooting, and IT support, ensuring your business stays up-to-date and secure. We also provide disaster recovery planning, backup solutions, and business continuity services to minimize downtime and safeguard your data.",
    icon: <Shield size={40} className="text-[#807045]" />,
  },
];

export default function ITSolutionsPage() {

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <MovingTextEffect
        title="Our IT Solutions"
        subtitle="Comprehensive IT services tailored for your business success."
        image="https://w0.peakpx.com/wallpaper/1019/567/HD-wallpaper-white-3d-polygons-background-geometric-abstraction-white-background-3d-honeycomb-white-honeycomb-background.jpg"
      />
      {/* <div className="text-center text-white py-32 relative services-hero-section">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="font-extrabold drop-shadow-lg mt-10 relative z-[1] text-transparent bg-clip-text flex-center h-[6rem] bg-cover"
          style={{ backgroundImage: `url(https://img.freepik.com/free-photo/abstract-blue-geometric-shapes-background_24972-1837.jpg)` }}
        >
          
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="pt-14 text-lg max-w-2xl mx-auto opacity-90 relative z-[1]"
        >
          
        </motion.p>
      </div> */}

      {/* Introduction Section */}
      <div className="max-w-6xl mx-auto py-16 px-6 text-center">
        <p className="text-lg text-gray-600">
          At Shreeji Investments Limited, we understand that IT is the backbone of modern businesses. We offer a full suite of IT services designed to support businesses of all sizes. From providing state-of-the-art hardware and infrastructure to developing custom systems and platforms, our team is dedicated to delivering innovative, efficient, and secure solutions to meet your unique needs.
        </p>
      </div>

      {/* IT Solutions List */}
      <div className="max-w-7xl mx-auto py-16 px-6 grid md:grid-cols-3 gap-8">
        {itSolutions.map((solution, index) => (
          <Link href={solution.link} key={index}>
            <motion.div              
              className="bg-gray-100 rounded-2xl p-6 shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center gap-4">
                {solution.icon}
                <h2 className="text-2xl font-semibold text-[#807045]">{solution.title}</h2>
              </div>
              <motion.p
                className="mt-4 text-gray-700 cursor-pointer text-base"             
              >     
                {solution.description}         
              </motion.p>
            </motion.div>
          </Link>
        ))}
      </div>

      {/* Additional Section - Benefits of Our IT Solutions */}
      <div className="bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-[#807045]">Why Choose Our IT Solutions?</h2>
          <p className="mt-4 text-lg text-gray-600">
            Our IT solutions go beyond just providing products and services. We focus on delivering long-term value to your business through:
          </p>
          <div className="mt-8 grid md:grid-cols-2 gap-12">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-[#807045]">Expertise and Experience</h3>
              <p className="mt-4 text-gray-600">
                With over 20 years in the IT industry, our team brings in-depth knowledge and experience to solve even the most complex challenges. We understand the evolving technology landscape and stay ahead of the curve to provide cutting-edge solutions.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-[#807045]">Tailored Solutions</h3>
              <p className="mt-4 text-gray-600">
                We take the time to understand your business and its unique requirements, providing solutions that are customized to fit your needs. Whether you're a small startup or an established enterprise, we offer scalable services to meet your growth ambitions.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-[#807045]">Security & Reliability</h3>
              <p className="mt-4 text-gray-600">
                Security is a top priority for us. We implement the latest security protocols to safeguard your data, ensuring your systems are protected from vulnerabilities and cyber threats. Our managed services guarantee minimal downtime and maximum uptime.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-[#807045]">Cost-Effective Solutions</h3>
              <p className="mt-4 text-gray-600">
                We provide cost-effective IT solutions that deliver a high return on investment. Our pricing models are transparent, and we offer flexible packages to suit your business needs and budget. You get more value for every dollar spent.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="bg-[#807045] text-white py-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-lg">
            For more information, contact us at <strong>sales@shreeji.co.zm</strong> or call <strong>+260 211 257141</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
