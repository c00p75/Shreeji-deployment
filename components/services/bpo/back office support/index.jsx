'use client'

import { motion } from "framer-motion";
import { FileText, Archive, FileCheck, Users } from "lucide-react";
import '@/components/services/style.scss';
import MovingTextEffect from "@/components/moving text";
import ContactModal from "./contact us";

export default function BackOfficeSupportPage() {
  return (
    <div className="back-office-support-page min-h-screen bg-gradient-to-br from-white to-[#f9f6e6] text-[#403d2a]">

      {/* Hero Section */}
      <MovingTextEffect
        title="Back Office Support"
        subtitle="Optimizing your business operations through expert back office support services, ensuring efficiency and seamless operations behind the scenes."
        image=""
      />

      {/* Our Back Office Support Services */}
      <div className="pt-20 pb-10 px-8 max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-[#807045]">Our Back Office Support Services</h2>
        <p className="mt-6 text-lg max-w-4xl mx-auto text-gray-700">
          At <strong>Shreeji Investments Ltd</strong>, we handle the crucial behind-the-scenes tasks so you can focus on your core business operations. Our back office support services are designed to improve your overall productivity, reduce operational costs, and enhance workflow efficiency. We provide tailored solutions to meet the specific needs of your business.
        </p>
      </div>

      {/* Key Features */}
      <div className="relative py-20 px-3 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold text-[#807045] text-center mb-12">Key Features of Our Back Office Support</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            {
              icon: <FileText size={50} className="text-[#807045]" />,
              title: "Data Entry & Management",
              description: "Accurate and efficient data entry, ensuring that all records are updated and organized for easy access and decision-making.",
            },
            {
              icon: <Archive size={50} className="text-[#807045]" />,
              title: "Document Management",
              description: "Streamlined document storage and management to improve accessibility, compliance, and workflow within your organization.",
            },
            {
              icon: <FileCheck size={50} className="text-[#807045]" />,
              title: "Invoice Processing",
              description: "Automated processing of invoices to ensure timely payments, maintain accurate records, and streamline financial operations.",
            },
            {
              icon: <Users size={50} className="text-[#807045]" />,
              title: "Human Resources Support",
              description: "Support for HR functions including recruitment, payroll, employee onboarding, and compliance management, ensuring a smooth HR operation.",
            },
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

      {/* Why Choose Our Back Office Support Services */}
      <div className="py-20 px-3 md:px-8 bg-white text-center">
        <h2 className="text-3xl font-bold text-[#807045]">Why Choose Our Back Office Support?</h2>
        <p className="mt-6 text-lg max-w-4xl mx-auto text-gray-700">
          Our back office support services help streamline your processes, reduce costs, and improve efficiency. Here’s why partnering with us is beneficial:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {[
            {
              icon: <FileText size={50} className="text-[#807045]" />,
              title: "Cost Reduction",
              description: "By outsourcing back office tasks, you can save on operational costs, allowing you to allocate resources to areas that drive growth.",
            },
            {
              icon: <Archive size={50} className="text-[#807045]" />,
              title: "Operational Efficiency",
              description: "Our optimized workflows improve operational efficiency, reducing delays and errors while boosting productivity.",
            },
            {
              icon: <FileCheck size={50} className="text-[#807045]" />,
              title: "Data Accuracy",
              description: "We ensure your data is handled with precision, improving the quality of decision-making and reducing operational risks.",
            },
            {
              icon: <Users size={50} className="text-[#807045]" />,
              title: "Scalability",
              description: "Our back office solutions are scalable, meaning we can adjust to the changing needs of your business as it grows.",
            },
            {
              icon: <FileText size={50} className="text-[#807045]" />,
              title: "Compliance Management",
              description: "We assist with compliance by ensuring all your documents and processes align with industry standards and regulations.",
            },
            {
              icon: <Archive size={50} className="text-[#807045]" />,
              title: "24/7 Availability",
              description: "Our team is available round-the-clock to support your business needs, ensuring that operations run smoothly at any time.",
            }
          ].map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.2 }}
              className="bg-[#fefdf5] p-8 rounded-xl shadow-lg hover:scale-105 transform transition-all"
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
      <div className="text-center px-5 py-16 bg-[#807045] text-white shadow-inner flex-center">
        <h2 className="text-3xl font-bold">Streamline Your Business Operations with Us</h2>
        <p className="my-5 max-w-5xl text-lg">Our back office support services are designed to free up your valuable resources, allowing your team to focus on strategic initiatives while we handle the administrative tasks.</p>
        <ContactModal />
      </div>

    </div>
  );
}
