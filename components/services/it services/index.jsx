'use client'

import { useState } from "react";
import { motion } from "framer-motion";
import { Server, Monitor, Shield } from "lucide-react";
import bg from '@/public/backgrounds/service-hero-bg.jpg'
import '@/components/services/style.scss'
import Link from "next/link";
import Image from "next/image";
import MovingTextEffect from "@/components/moving text";
import ContactModal from "./contact us";

const itSolutions = [
  {
    title: "Hardware & Infrastructure",
    link: "it-solutions/hardware-and-infrastructure",
    description:
      "We deliver end-to-end hardware solutions—from supplying computers and networking gear to setting up servers and custom devices like biometric scanners and kiosks. Our team handles installation, maintenance, and 24/7 support to keep your systems running smoothly.",
    icon: <Server size={40} className="text-[#807045]" />,
  },
  {
    title: "System & Platform Development",
    link: "it-solutions/system-and-platform-development",
    description:
      "We build custom platforms to solve real business challenges—from mobile apps to data-driven reporting tools. Whether you're integrating systems or launching enterprise apps, our scalable and secure solutions are tailored to your goals and workflows.",
    icon: <Monitor size={40} className="text-[#807045]" />,
  },
  {
    title: "IT Consulting & Managed Services",
    link: "it-solutions/it-consulting-and-managed-services",
    description:
      "We help businesses optimize IT strategies and infrastructure through expert consulting, system integration, cloud services, and cybersecurity. Our managed services include 24/7 support, proactive monitoring, and disaster recovery to keep your operations secure and resilient.",
    icon: <Shield size={40} className="text-[#807045]" />,
  },
];

export default function ITSolutionsPage() {

  return (
    <div className="bg-gradient-to-br from-white to-[#f9f6e6] min-h-screen">
      {/* Hero Section */}
      <MovingTextEffect
        title="Our IT Solutions"
        subtitle="Comprehensive IT services tailored for your business success."
        image="https://w0.peakpx.com/wallpaper/1019/567/HD-wallpaper-white-3d-polygons-background-geometric-abstraction-white-background-3d-honeycomb-white-honeycomb-background.jpg"
      />

      {/* Introduction Section */}
      <div className="max-w-6xl mx-auto pt-16 px-6 text-center">
        <p className="text-lg text-gray-600">
          At Shreeji Investments Limited, we understand that IT is the backbone of modern businesses. We offer a full suite of IT services designed to support businesses of all sizes. From providing state-of-the-art hardware and infrastructure to developing custom systems and platforms, our team is dedicated to delivering innovative, efficient, and secure solutions to meet your unique needs.
        </p>
      </div>  
      {/* IT Solutions List */}
      <div className="max-w-7xl mx-auto py-16 px-3 md:px-6 grid md:grid-cols-3 gap-8">
        {itSolutions.map((solution, index) => (
          <Link href={solution.link} key={index}>
            <motion.div              
              className="bg-white rounded-2xl p-6 shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-center">
                {solution.icon}
                <h2 className="text-2xl font-semibold text-[#807045]">{solution.title}</h2>
              </div>
              <motion.p
                className="mt-4 text-gray-700 cursor-pointer text-base"             
              >     
                {solution.description}         
              </motion.p>
              <div className="text-[#807045] mt-6 inline-block">Explore →</div> 
            </motion.div>
          </Link>
        ))}
      </div>

      {/* Additional Section - Benefits of Our IT Solutions */}
      <div className="py-16 px-3 md:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#807045]">Why Choose Our IT Solutions?</h2>
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

      {/* Call to Action */}
      <div className="text-center py-16 bg-[#807045] text-white shadow-inner px-5 md:px-0">
        <h2 className="text-3xl font-semibold mb-6">Get Started Today</h2>
        <p className="text-lg max-w-2xl mx-auto mb-8">
          Your business deserves IT solutions that evolve with your needs. From infrastructure to custom platforms, our team is here to help you scale, streamline, and succeed.
        </p>        
        <ContactModal />
      </div>
    </div>
  );
}
