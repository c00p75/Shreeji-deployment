'use client'

import { motion } from "framer-motion";
import { ShieldCheck, FileText, AlertCircle, Lock } from "lucide-react";
import '@/components/services/style.scss';
import MovingTextEffect from "@/components/moving text";

export default function RiskCompliancePage() {
  return (
    <div className="risk-compliance-page min-h-screen bg-gradient-to-br from-white to-[#f5f5f5] text-[#403d2a]">

      {/* Hero Section */}
      <MovingTextEffect
        title="Our Risk & Compliance Management Services"
        subtitle="At Company Name, we prioritize the identification, mitigation, and management of risks while ensuring your business adheres to industry regulations and best practices. Our holistic approach to risk and compliance management will help safeguard your business's assets, reputation, and sustainability."
        image=""
      />
      {/* <div className="relative py-32 px-6 text-center bg-[#f5f5f5] services-hero-section">
        <motion.h1 
          initial={{ opacity: 0, y: -50 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="text-5xl font-extrabold drop-shadow-md"
        >
          Risk & Compliance Management
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-lg max-w-3xl mx-auto opacity-80"
        >
          Ensure the security, integrity, and regulatory compliance of your operations with our comprehensive risk and compliance management services.
        </motion.p>
      </div> */}

      {/* Our Risk & Compliance Management Services */}
      <div className="py-20 px-8 max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-semibold text-[#807045]">Our Risk & Compliance Management Services</h2>
        <p className="mt-6 text-lg max-w-4xl mx-auto text-gray-700">
          At <strong>Company Name</strong>, we prioritize the identification, mitigation, and management of risks while ensuring your business adheres to industry regulations and best practices. Our holistic approach to risk and compliance management will help safeguard your business's assets, reputation, and sustainability.
        </p>
      </div>

      {/* Key Features */}
      <div className="relative py-20 px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold text-[#807045] text-center mb-12">Key Features of Our Risk & Compliance Management Services</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            {
              icon: <ShieldCheck size={50} className="text-[#807045]" />,
              title: "Risk Identification & Assessment",
              description: "We identify potential risks, assess their impact, and prioritize them based on severity, helping you avoid unforeseen challenges.",
            },
            {
              icon: <AlertCircle size={50} className="text-[#807045]" />,
              title: "Regulatory Compliance Monitoring",
              description: "We ensure your business is in compliance with local and international regulations, helping you avoid legal liabilities and reputational damage.",
            },
            {
              icon: <FileText size={50} className="text-[#807045]" />,
              title: "Policy Development & Implementation",
              description: "We create and implement risk management policies that align with your business objectives, ensuring consistency and clarity across your operations.",
            },
            {
              icon: <Lock size={50} className="text-[#807045]" />,
              title: "Security & Data Protection",
              description: "We help secure sensitive information, implement robust security protocols, and protect against potential cyber threats and data breaches.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.2 }}
              className="bg-white p-8 rounded-xl shadow-lg hover:scale-105 transform transition-all"
            >
              <div className="flex items-center space-x-4">
                {feature.icon}
                <h3 className="text-2xl font-semibold text-[#807045]">{feature.title}</h3>
              </div>
              <p className="mt-4 text-gray-700">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Why Choose Our Risk & Compliance Services */}
      <div className="py-20 px-8 bg-[#f5f5f5] text-center">
        <h2 className="text-3xl font-semibold text-[#807045]">Why Choose Our Risk & Compliance Management Services?</h2>
        <p className="mt-6 text-lg max-w-4xl mx-auto text-gray-700">
          Our services are designed to mitigate risks, ensure business continuity, and maintain regulatory compliance, giving you the confidence to operate in a dynamic market.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {[
            {
              icon: <ShieldCheck size={50} className="text-[#807045]" />,
              title: "Comprehensive Risk Mitigation",
              description: "We provide a 360-degree risk management approach, ensuring that every aspect of your business is thoroughly assessed and protected.",
            },
            {
              icon: <AlertCircle size={50} className="text-[#807045]" />,
              title: "Expert Regulatory Guidance",
              description: "Our team stays up-to-date with the latest regulations and helps you navigate the complexities of compliance to minimize legal risks.",
            },
            {
              icon: <FileText size={50} className="text-[#807045]" />,
              title: "Customized Compliance Solutions",
              description: "We create tailored compliance solutions that match your business's needs, ensuring the policies and protocols are effective and achievable.",
            },
            {
              icon: <Lock size={50} className="text-[#807045]" />,
              title: "Data Protection & Security",
              description: "Our comprehensive data protection strategies help safeguard your business's sensitive information and prevent potential breaches or cyberattacks.",
            },
            {
              icon: <ShieldCheck size={50} className="text-[#807045]" />,
              title: "Operational Continuity",
              description: "Our risk management plans ensure the smooth operation of your business, even in times of crisis, minimizing disruptions and maintaining productivity.",
            },
            {
              icon: <AlertCircle size={50} className="text-[#807045]" />,
              title: "Ongoing Risk Monitoring",
              description: "We continually monitor risks and compliance issues, providing ongoing support to help your business adapt to evolving threats and regulatory changes.",
            }
          ].map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.2 }}
              className="bg-white p-8 rounded-xl shadow-lg hover:scale-105 transform transition-all"
            >
              <div className="flex items-center space-x-4">
                {benefit.icon}
                <h3 className="text-xl font-semibold text-[#807045]">{benefit.title}</h3>
              </div>
              <p className="mt-4 text-gray-700">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center py-16 bg-[#807045] text-white rounded-[40px] m-5 mr-9 shadow-inner">
        <h2 className="text-3xl font-semibold">Secure Your Business with Our Risk & Compliance Services</h2>
        <p className="mt-2 text-lg">Partner with us to safeguard your business from potential risks and ensure regulatory compliance, empowering your business to thrive in a secure environment.</p>
        <button className="mt-6 px-8 py-3 bg-white text-[#807045] font-semibold rounded-full shadow-md hover:bg-[#f0ebd5] transition-all">
          Get Started with Risk & Compliance Management
        </button>
      </div>

    </div>
  );
}
