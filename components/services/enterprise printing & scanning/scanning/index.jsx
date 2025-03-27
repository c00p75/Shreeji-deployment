'use client'

import { motion } from 'framer-motion';
import { Printer, ShieldCheck, FileText, CloudUpload, Users } from 'lucide-react';
import print from "@/public/backgrounds/hero-print.png";
import '@/components/services/style.scss'

export default function DocumentScanningPage() {
  return (
    <div className="bg-[#f9f8f6] text-gray-900">
      {/* Hero Section */}
      <section className="services-hero-section relative bg-[#807045] text-white py-24 px-8 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="text-5xl font-bold drop-shadow-md"
        >
          Precision Document Scanning
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-lg max-w-3xl mx-auto opacity-90"
        >
          Convert physical documents into secure, high-quality digital formats with our enterprise-level scanning solutions.
        </motion.p>
      </section>

      {/* Service Overview */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-4xl font-semibold text-[#807045]">
              Secure, Fast & Reliable Document Digitization
            </h2>
            <p className="text-lg text-gray-700">
              Our high-speed scanning technology ensures the safe transformation of physical documents into searchable, secure, and easily accessible digital formats. Whether you need to scan invoices, contracts, legal records, or large-scale archives, we have you covered.
            </p>
            <button className="px-6 py-3 bg-[#807045] text-white rounded-md hover:bg-[#6d6237] transition">
              Get a Free Consultation
            </button>
          </motion.div>
          <motion.img 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            src={print.src}
            alt="Document Scanning Process"
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Service Highlights */}
      <section className="bg-[#fffdf9] py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-3xl font-semibold text-[#807045] mb-10">
            Why Choose Our Document Scanning Services?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Printer size={40} />,
                title: "Ultra-Fast Processing",
                description: "We process large volumes efficiently, ensuring quick turnaround times without compromising on quality."
              },
              {
                icon: <ShieldCheck size={40} />,
                title: "Top-Tier Security",
                description: "Our document handling is fully secure, ensuring your sensitive data remains confidential."
              },
              {
                icon: <FileText size={40} />,
                title: "OCR & Indexing",
                description: "We enhance digital files with Optical Character Recognition (OCR), making them searchable and well-organized."
              },
              {
                icon: <CloudUpload size={40} />,
                title: "Cloud Integration",
                description: "Seamlessly upload scanned files to your preferred cloud storage for easy accessibility and management."
              },
              {
                icon: <Users size={40} />,
                title: "Custom Solutions",
                description: "We tailor our scanning services to meet the needs of enterprises, legal firms, government agencies, and healthcare providers."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="p-6 bg-white rounded-lg shadow-md text-center"
              >
                <div className="text-[#807045] mx-auto">{feature.icon}</div>
                <h4 className="text-xl font-semibold mt-4 text-[#807045]">{feature.title}</h4>
                <p className="mt-3 text-gray-700">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Served */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-3xl font-semibold text-[#807045] mb-8">
            Who Benefits from Our Scanning Services?
          </h3>
          <p className="text-lg text-gray-700 mb-10 max-w-4xl mx-auto">
            Our advanced document scanning solutions cater to diverse industries, ensuring digital transformation, compliance, and efficient document management.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Healthcare & Medical Records",
              "Government Agencies",
              "Legal & Law Firms",
              "Financial Institutions",
              "Manufacturing & Logistics",
              "Education & Research Institutions"
            ].map((industry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="p-6 bg-white rounded-lg shadow-md text-center"
              >
                <h4 className="text-xl font-semibold text-[#807045]">{industry}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="p-5 pr-9">
        <div className='bg-[#807045] text-white py-16 px-8 text-center rounded-[40px]'>
          <h3 className="text-3xl font-semibold mb-6">
            Ready to Streamline Your Document Management?
          </h3>
          <p className="text-lg max-w-2xl mx-auto mb-8">
            Let’s help you transition into a paperless environment with secure and efficient document scanning.
          </p>
          <button className="mt-6 px-8 py-3 bg-white text-[#807045] font-semibold rounded-full shadow-md hover:bg-[#f0ebd5] transition-all">
            Get Started Today
          </button>
        </div>
      </section>
    </div>
  );
}
