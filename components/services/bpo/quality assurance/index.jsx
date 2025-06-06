'use client'

import MovingTextEffect from "@/components/moving text";
import { motion } from "framer-motion";
import { CheckCircle, ShieldCheck, LifeBuoy, FileCheck } from "lucide-react";
import ContactModal from "./contact us";
// import './style.scss';

export default function QualityAssurancePage() {
  return (
    <div className="quality-assurance-page min-h-screen bg-gradient-to-br from-white to-[#f9f6e6] text-[#403d2a]">

      {/* Hero Section */}
      <MovingTextEffect
        title="Quality Assurance Services"
        subtitle="Ensuring the highest standards of performance, reliability, and security for your products and services through comprehensive quality assurance processes."
        image=""
      />

      {/* What is Quality Assurance? */}
      <div className="py-20 px-8 max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-[#807045]">What is Quality Assurance?</h2>
        <p className="mt-6 text-lg max-w-4xl mx-auto text-gray-700">
          Quality Assurance (QA) is a vital process that ensures products or services meet a specified set of standards, ensuring reliability, performance, and customer satisfaction. Our QA services provide businesses with systematic testing, continuous monitoring, and proactive measures to improve the overall quality of their offerings.
          From software testing to product evaluations, we deliver expert QA solutions that ensure every aspect of your product or service operates at peak efficiency.
        </p>
      </div>

      {/* Key Features */}
      <div className="relative py-20 px-3 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-[#807045] text-center mb-12">Our Quality Assurance Process</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            {
              icon: <CheckCircle size={50} className="text-[#807045]" />,
              title: "Comprehensive Testing",
              description: "We use a variety of testing methods, including functional, regression, and user acceptance testing (UAT) to ensure every part of your system works flawlessly.",
            },
            {
              icon: <ShieldCheck size={50} className="text-[#807045]" />,
              title: "Security Assurance",
              description: "Our team performs extensive security testing to identify vulnerabilities and ensure that your product adheres to best security practices.",
            },
            {
              icon: <LifeBuoy size={50} className="text-[#807045]" />,
              title: "Risk Management",
              description: "We identify and mitigate potential risks, ensuring your product is reliable and resilient under various conditions and use cases.",
            },
            {
              icon: <FileCheck size={50} className="text-[#807045]" />,
              title: "Compliance & Standards",
              description: "We make sure your products comply with relevant industry standards, certifications, and regulatory requirements, ensuring consistency in quality and service.",
            },
            {
              icon: <CheckCircle size={50} className="text-[#807045]" />,
              title: "Performance Testing",
              description: "We assess the performance of your products to ensure they meet industry benchmarks for speed, stability, and scalability.",
            },
            {
              icon: <ShieldCheck size={50} className="text-[#807045]" />,
              title: "Continuous Monitoring",
              description: "We provide continuous monitoring and feedback on your products, helping you address potential issues before they affect your customers.",
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

      {/* Why Quality Assurance Matters */}
      <div className="py-20 px-3 md:px-8 bg-[#fbfbfb] text-center">
        <h2 className="text-3xl font-bold text-[#807045]">Why Quality Assurance Matters</h2>
        <p className="mt-6 text-lg max-w-4xl mx-auto text-gray-700">
          Implementing a robust QA strategy ensures your products are free from defects, comply with industry regulations, and deliver a consistent user experience. The benefits of our Quality Assurance services include:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {[
            {
              icon: <CheckCircle size={50} className="text-[#807045]" />,
              title: "Customer Satisfaction",
              description: "By ensuring your product is thoroughly tested and meets user expectations, we help boost customer satisfaction and loyalty.",
            },
            {
              icon: <ShieldCheck size={50} className="text-[#807045]" />,
              title: "Reduced Costs",
              description: "Early detection of issues reduces the cost of fixing problems later in the development cycle and prevents costly recalls or fixes post-launch.",
            },
            {
              icon: <LifeBuoy size={50} className="text-[#807045]" />,
              title: "Better Reliability",
              description: "With our comprehensive testing methods, we ensure your product performs as expected, resulting in fewer crashes, downtimes, or operational failures.",
            },
            {
              icon: <FileCheck size={50} className="text-[#807045]" />,
              title: "Improved Compliance",
              description: "Ensuring your product complies with industry standards and regulations reduces legal risks and enhances your reputation in the market.",
            },
            {
              icon: <CheckCircle size={50} className="text-[#807045]" />,
              title: "Faster Time to Market",
              description: "Through continuous testing and feedback, we streamline the development process, helping you launch your product faster while maintaining quality.",
            },
            {
              icon: <ShieldCheck size={50} className="text-[#807045]" />,
              title: "Scalable Solutions",
              description: "Our testing and QA services ensure that your product can handle increased demand, ensuring long-term scalability and success in the market.",
            }
          ].map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.2 }}
              className="bg-white p-8 rounded-xl shadow-lg hover:scale-105 transform transition-all"
            >
              <div className="flex flex-col md:flex-row gap-2 md:gap-0 items-center md:space-x-4">
                {benefit.icon}
                <h3 className="text-xl font-semibold text-[#807045]">{benefit.title}</h3>
              </div>
              <p className="mt-4 text-gray-700">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center flex-center py-16 bg-[#807045] text-white shadow-inner">
        <h2 className="text-3xl font-semibold">Get Reliable Quality Assurance Today</h2>
        <p className="my-5 text-lg max-w-xl">With our QA services, ensure your product meets the highest standards of quality, security, and performance. Trust our expertise to deliver seamless experiences for your users.</p>
        <ContactModal />
      </div>

    </div>
  );
}
