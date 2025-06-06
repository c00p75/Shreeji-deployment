'use client'

import { motion } from "framer-motion";
import { Phone, Clipboard, ShieldCheck, CheckCircle, UserPlus, Database } from "lucide-react";
import '@/components/services/style.scss'
import MovingTextEffect from "@/components/moving text";
import ContactModal from "./contact us";

export default function SIMRegistrationPage() {
  return (
    <div className="sim-registration-page min-h-screen bg-gradient-to-br from-white to-[#f9f6e6] text-[#403d2a]">

      {/* Hero Section */}
      <MovingTextEffect
        title="SIM Registration & Management"
        subtitle="Efficient, compliant, and secure SIM registration services designed to enhance mobile network operations and customer satisfaction."
        image=""
      />

      {/* What is SIM Registration & Management? */}
      <div className="py-20 px-8 max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-semibold text-[#807045]">What is SIM Registration & Management?</h2>
        <p className="mt-6 text-lg max-w-4xl mx-auto text-gray-700">
          SIM Registration & Management refers to the process of securely collecting and managing subscriber information for the activation of mobile network services. This includes collecting required documents, verifying identity, storing data securely, and ensuring regulatory compliance.
          Our services simplify and speed up the process while adhering to local and international compliance requirements.
        </p>
        <p className="mt-6 text-lg max-w-4xl mx-auto text-gray-700">
          Whether you're a <strong>telecom operator</strong> or a <strong>corporate client</strong>, our SIM registration and management services ensure a smooth, secure, and compliant process that reduces bottlenecks and accelerates service delivery.
          </p>
      </div>

      {/* Key Features */}
      <div className="relative py-10 md:py-20 px-3 md:px-8 max-w-7xl mx-auto">
        <h2 className="px-5 text-3xl font-bold text-[#807045] text-center mb-12">Key Features of Our SIM Registration & Management Service</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            {
              icon: <Phone size={50} className="text-[#807045]" />,
              title: "Fast and Secure Registration",
              description: "We provide quick, secure, and accurate SIM registration services, ensuring minimal customer wait times while maintaining high standards of data protection and regulatory compliance.",
            },
            {
              icon: <Clipboard size={50} className="text-[#807045]" />,
              title: "Compliance with Regulatory Standards",
              description: "Our SIM registration process fully complies with local regulatory frameworks, ensuring that all information is verified and securely stored in line with industry standards.",
            },
            {
              icon: <ShieldCheck size={50} className="text-[#807045]" />,
              title: "Data Security and Privacy",
              description: "We prioritize the protection of subscriber data, leveraging the latest encryption methods and secure storage protocols to safeguard sensitive information.",
            },
            {
              icon: <UserPlus size={50} className="text-[#807045]" />,
              title: "Customer Onboarding",
              description: "Our service makes the customer onboarding process seamless, helping new users quickly and securely register their SIM cards, ensuring a smooth experience from start to finish.",
            },
            {
              icon: <CheckCircle size={50} className="text-[#807045]" />,
              title: "Real-Time Activation",
              description: "SIM cards are activated promptly after successful registration, allowing customers to use their services without unnecessary delays.",
            },
            {
              icon: <Database size={50} className="text-[#807045]" />,
              title: "Centralized Data Management",
              description: "Our system provides a centralized database for easy tracking, reporting, and auditing of all registered SIMs, streamlining operations for telecom providers and businesses alike.",
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.2 }}
              className="bg-white p-8 rounded-xl shadow-lg hover:scale-105 transform transition-all"
            >
              <div className="flex flex-col md:flex-row gap-2 md:gap-0 items-center md:space-x-4">
                {feature.icon}
                <h3 className="text-2xl font-semibold text-[#807045]">{feature.title}</h3>
              </div>
              <p className="mt-4 text-gray-700">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Why Choose Us? */}
      <div className="py-20 px-3 md:px-8 bg-[#f5f5f5] text-center">
        <h2 className="text-3xl font-bold text-[#807045]">Why Choose Our SIM Registration & Management Service?</h2>
        <p className="mt-6 text-lg max-w-4xl mx-auto text-gray-700">
          Our SIM Registration & Management service is designed to help telecom operators, corporate clients, and organizations meet <strong>regulatory compliance</strong>, <strong>improve service delivery</strong>, and <strong>reduce operational costs</strong>. Here are some reasons why we're the best choice:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {[
            {
              icon: <CheckCircle size={50} className="text-[#807045]" />,
              title: "Efficient Process",
              description: "Our processes are optimized for speed and accuracy, ensuring that subscribers can start using their services with minimal delay while maintaining data integrity.",
            },
            {
              icon: <ShieldCheck size={50} className="text-[#807045]" />,
              title: "Regulatory Compliance",
              description: "We ensure full compliance with the latest telecom regulations and data protection laws, keeping your business secure and compliant.",
            },
            {
              icon: <Phone size={50} className="text-[#807045]" />,
              title: "Seamless Integration",
              description: "Our system integrates seamlessly with existing telecom infrastructures, ensuring a hassle-free transition for both operators and end-users.",
            },
            {
              icon: <Clipboard size={50} className="text-[#807045]" />,
              title: "Advanced Reporting & Analytics",
              description: "We offer robust reporting and analytics features, providing telecom providers with valuable insights into their customer base, usage patterns, and more.",
            },
            {
              icon: <Database size={50} className="text-[#807045]" />,
              title: "Scalable Solution",
              description: "Our SIM registration and management platform is highly scalable, capable of handling large volumes of data as your business grows and expands.",
            },
            {
              icon: <UserPlus size={50} className="text-[#807045]" />,
              title: "Customer-Centric Approach",
              description: "We focus on providing a smooth and efficient customer experience, making SIM registration simple and fast, with the support needed at every step.",
            }
          ].map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.2 }}
              className="bg-white p-8 rounded-xl shadow-lg hover:scale-105 transform transition-all"
            >
              <div className="flex flex-col md:flex-row gap-2 md:gap-0 items-center space-x-4">
                {benefit.icon}
                <h3 className="text-xl font-semibold text-[#807045]">{benefit.title}</h3>
              </div>
              <p className="mt-4 text-gray-700">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center px-5 py-16 bg-[#807045] text-white shadow-inner">
        <h2 className="text-3xl font-bold">Let’s Streamline Your SIM Registration Process</h2>
        <p className="my-5 text-lg">Start enhancing your customer experience and compliance with our efficient SIM Registration & Management services today.</p>
        <ContactModal />
      </div>

    </div>
  );
}
