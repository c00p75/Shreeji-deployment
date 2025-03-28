'use client'

import { motion } from "framer-motion";
import { Server, HardDrive, Cpu } from "lucide-react";
import '@/components/services/style.scss'
import MovingTextEffect from "@/components/moving text";

export default function HardwareInfrastructurePage() {
  return (
    <div className="hardware-infrastructure-page min-h-screen bg-gradient-to-br from-[#F9F9F9] to-[#E0E0E0]">
      {/* Hero Section */}
      <MovingTextEffect
        title="Hardware & Infrastructure Solutions"
        subtitle="Providing reliable and cutting-edge infrastructure to support your business operations and growth."
        image=""
      />

      {/* Introduction Section */}
      <div className="py-16 px-8 text-center max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-semibold text-[#584d2a]"
        >
          Why Hardware & Infrastructure Matter
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-4 text-lg text-gray-700"
        >
          In today’s fast-paced world, a strong IT infrastructure is the backbone of every successful business. Whether you’re expanding your operations, upgrading existing systems, or integrating new technologies, we provide the expertise and solutions to meet your business’s unique needs. From scalable hardware setups to fully managed IT infrastructure, we ensure your systems run seamlessly.
        </motion.p>
      </div>

      {/* Key Offerings Section */}
      <div className="bg-[#f1f1f1] py-16 px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-semibold text-center text-[#807045]"
        >
          Our Hardware & Infrastructure Offerings
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:translate-y-[-5px] cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              <Server size={50} className="text-[#807045]" />
              <h3 className="text-2xl font-semibold text-[#584d2a]">Network Infrastructure</h3>
            </div>
            <p className="mt-4 text-gray-600">
              Build a robust and scalable network infrastructure with high-speed connections, wireless solutions, and seamless integrations to ensure business continuity.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:translate-y-[-5px] cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              <HardDrive size={50} className="text-[#807045]" />
              <h3 className="text-2xl font-semibold text-[#584d2a]">Server Solutions</h3>
            </div>
            <p className="mt-4 text-gray-600">
              From dedicated servers to cloud-based solutions, we offer reliable hosting and server management for your critical business applications and data.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:translate-y-[-5px] cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              <Cpu size={50} className="text-[#807045]" />
              <h3 className="text-2xl font-semibold text-[#584d2a]">Workstation Setup</h3>
            </div>
            <p className="mt-4 text-gray-600">
              We provide complete workstation setups tailored to your business’s specific needs, including desktop and laptop configurations, software installations, and more.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Our Approach & Solutions Section */}
      <div className="py-16 px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-semibold text-center text-[#807045]"
        >
          Our Approach & Solutions
        </motion.h2>
        <div className="max-w-3xl mx-auto mt-12 text-gray-700">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg leading-relaxed"
          >
            We understand that no two businesses are the same, and that’s why we offer custom IT infrastructure solutions. Whether you need an enterprise-grade server setup, a secure network, or an optimized workstation environment, we work closely with you to design and implement a system that fits your unique business requirements.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-lg leading-relaxed mt-6"
          >
            Our team of experts uses industry-standard practices and cutting-edge technologies to ensure that your infrastructure is scalable, secure, and efficient. From initial consultation to installation and ongoing maintenance, we’re committed to providing long-term value and support for your business.
          </motion.p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-[#F1F1F1] py-16 px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-semibold text-center text-[#807045]"
        >
          Why Choose Us?
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-8 rounded-xl shadow-lg"
          >
            <h3 className="text-xl font-semibold text-[#584d2a]">Proven Expertise</h3>
            <p className="mt-4 text-gray-600">
              Our team has years of experience in providing robust hardware and infrastructure solutions that drive businesses forward.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white p-8 rounded-xl shadow-lg"
          >
            <h3 className="text-xl font-semibold text-[#584d2a]">Scalable Solutions</h3>
            <p className="mt-4 text-gray-600">
              Whether you're a small startup or an enterprise, our solutions are scalable to meet your evolving business needs.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="text-center py-16 bg-[#807045] text-white">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-semibold"
        >
          Ready to Upgrade Your Infrastructure?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-lg max-w-2xl mx-auto"
        >
          Contact us today to discuss your hardware and infrastructure needs, and let us help you build a scalable, secure, and reliable IT ecosystem.
        </motion.p>
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 px-8 py-3 bg-[white] text-[#807045] rounded-lg hover:bg-[#5d5232] hover:text-white transition-colors"
        >
          Get a Free Consultation
        </motion.button>
      </div>
    </div>
  );
}
