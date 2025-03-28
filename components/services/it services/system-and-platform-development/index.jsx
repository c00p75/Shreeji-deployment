'use client'

import { motion } from "framer-motion";
import { Layers, Code, Cloud, Server, Settings } from "lucide-react";
import '@/components/services/style.scss'
import MovingTextEffect from "@/components/moving text";

export default function SystemPlatformDevelopmentPage() {
  return (
    <div className="system-platform-page min-h-screen bg-white">
      {/* Hero Section */}
      <MovingTextEffect
        title="System & Platform Development"
        subtitle="Scalable, high-performance, and future-proof platforms tailored to your business needs."
        image=""
      />
      {/* <div className="services-hero-section relative py-32 px-6 text-center bg-[#807045] text-white">
        <motion.h1 
          initial={{ opacity: 0, y: -50 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="text-6xl font-extrabold"
        >
          System & Platform Development
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-lg max-w-3xl mx-auto opacity-90"
        >
          Scalable, high-performance, and future-proof platforms tailored to your business needs.
        </motion.p>
      </div> */}

      {/* Our Solutions */}
      <div className="py-16 px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-semibold text-center text-[#807045]"
        >
          Our System & Platform Development Solutions
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {[
            {
              icon: <Code size={50} className="text-[#807045]" />,
              title: "Custom Software Development",
              description: "Tailored applications, CRM systems, and enterprise-grade software built for scalability."
            },
            {
              icon: <Server size={50} className="text-[#807045]" />,
              title: "API & Backend Development",
              description: "High-performance APIs and robust backends optimized for security and speed."
            },
            {
              icon: <Cloud size={50} className="text-[#807045]" />,
              title: "Cloud & SaaS Solutions",
              description: "Cloud-native applications, SaaS platforms, and serverless computing for seamless operations."
            },
            {
              icon: <Layers size={50} className="text-[#807045]" />,
              title: "Platform Engineering",
              description: "Microservices, DevOps automation, and containerized architectures for efficiency."
            },
            {
              icon: <Settings size={50} className="text-[#807045]" />,
              title: "System Integration",
              description: "Connecting business systems, third-party software, and legacy applications."
            }
          ].map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.2 }}
              className="bg-[#F8F6F0] rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:translate-y-[-5px] cursor-pointer"
            >
              <div className="flex items-center space-x-4">
                {service.icon}
                <h3 className="text-2xl font-semibold text-[#807045]">{service.title}</h3>
              </div>
              <p className="mt-4 text-gray-700">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Development Process */}
      <div className="bg-[#807045] text-white py-16 px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-semibold text-center"
        >
          Our Development Process
        </motion.h2>
        <div className="max-w-3xl mx-auto mt-12 space-y-8">
          {[
            { step: "1. Discovery & Analysis", description: "We assess business needs and define technical requirements." },
            { step: "2. System Architecture", description: "Scalable, secure, and efficient architectures are designed." },
            { step: "3. Agile Development", description: "Rapid development using best industry practices and agile methodologies." },
            { step: "4. Quality Assurance", description: "Comprehensive testing to ensure security, performance, and usability." },
            { step: "5. Deployment & Support", description: "Seamless deployment and ongoing maintenance for optimal performance." }
          ].map((process, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.2 }}
              className="bg-white text-[#807045] p-6 rounded-xl shadow-lg"
            >
              <h3 className="text-xl font-semibold">{process.step}</h3>
              <p className="mt-2 text-gray-700">{process.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="py-16 px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-semibold text-center text-[#807045]"
        >
          Why Choose Us?
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {[
            { title: "Expert Development Team", description: "Seasoned professionals delivering innovative, high-performance solutions." },
            { title: "Scalability & Security", description: "Future-proof systems designed with security and scalability at the core." }
          ].map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.2 }}
              className="bg-[#F8F6F0] p-8 rounded-xl shadow-lg"
            >
              <h3 className="text-xl font-semibold text-[#807045]">{benefit.title}</h3>
              <p className="mt-4 text-gray-700">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center py-16 bg-[#807045] text-white">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-semibold"
        >
          Ready to Elevate Your Business?
        </motion.h2>
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 px-8 py-3 bg-white text-[#807045] rounded-lg hover:bg-[#E0A200] hover:text-white transition-colors"
        >
          Get a Free Consultation
        </motion.button>
      </div>
    </div>
  );
}
