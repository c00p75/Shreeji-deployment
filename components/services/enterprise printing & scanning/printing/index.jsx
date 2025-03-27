'use client'

import { motion } from 'framer-motion';
import { Printer } from 'lucide-react';
import '@/components/services/style.scss'
import zicta from "@/public/elements/zicta.jpg";
import mtn from "@/public/elements/mtn.jpg";
import lafarge from "@/public/elements/lafarge-holcim.png";
import Image from 'next/image';
import sample1 from "@/public/backgrounds/hero-print.png";
import sample2 from "@/public/backgrounds/hero-print.png";
import sample3 from "@/public/backgrounds/hero-print.png";

export default function PrintingPage() {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <div className="services-hero-section relative bg-[#807045] text-white py-20 px-8 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="text-5xl font-extrabold drop-shadow-lg"
        >
          Enterprise-Level Printing
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-lg max-w-2xl mx-auto opacity-90"
        >
          Innovative, cost-effective, and high-quality printing solutions tailored to meet the demands of your business.
        </motion.p>
      </div>

      {/* About the Service */}
      <section className="py-16 px-8">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.3 }}
            className="text-4xl font-semibold mb-6"
          >
            Streamlined Enterprise Printing Solutions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-gray-700 mb-8"
          >
            At Shreeji Investments, we specialize in providing scalable, high-speed printing solutions designed to meet the growing needs of your enterprise. Our state-of-the-art enterprise-level printers are built for durability, speed, and precision, delivering results that consistently exceed expectations.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-lg text-gray-700 mb-8"
          >
            Whether you're printing high volumes of marketing materials, internal documents, or other business-critical materials, our printing solutions are designed to save you time, reduce costs, and improve operational efficiency.
          </motion.p>
        </div>
      </section>

      {/* Service Highlights */}
      <section className="bg-[#f8f8f8] py-16 px-8">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h3 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.5 }}
            className="text-3xl font-semibold mb-6"
          >
            Why Choose Our Printing Solutions?
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <Printer size={40} className="mx-auto text-[#807045]" />
              <h4 className="text-2xl font-semibold mt-4 text-[#807045]">High-Speed Printing</h4>
              <p className="mt-4 text-gray-700">
                Our printers can handle large print volumes quickly and efficiently, ensuring minimal downtime and maximum productivity for your business.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <Printer size={40} className="mx-auto text-[#807045]" />
              <h4 className="text-2xl font-semibold mt-4 text-[#807045]">Cost-Effective Solutions</h4>
              <p className="mt-4 text-gray-700">
                With cost-per-click SLAs and bulk printing options, we help you optimize your printing budget while maintaining the highest quality standards.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <Printer size={40} className="mx-auto text-[#807045]" />
              <h4 className="text-2xl font-semibold mt-4 text-[#807045]">Custom Solutions</h4>
              <p className="mt-4 text-gray-700">
                We understand that each business has unique needs. Our team works with you to provide customized printing solutions that fit your requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Showcase Works Section */}
      <section className="py-16 px-8 bg-[#f8f8f8]">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h3 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.5 }}
            className="text-3xl font-semibold mb-6"
          >
            Our Work Samples
          </motion.h3>
          <p className="text-lg text-gray-700 mb-8">
            We take pride in delivering exceptional printing solutions that meet industry standards. Explore some of our latest work below.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-xl transform">
              <Image src={sample1} alt="Sample Work 1" className="w-full h-64 object-cover rounded-lg" />
              <h4 className="text-2xl font-semibold mt-4 text-[#807045]">Corporate Brochure</h4>
              <p className="text-gray-700 mt-2">High-quality, full-color brochures designed to represent your brand professionally.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-xl transform">
              <Image src={sample2} alt="Sample Work 2" className="w-full h-64 object-cover rounded-lg" />
              <h4 className="text-2xl font-semibold mt-4 text-[#807045]">Annual Reports</h4>
              <p className="text-gray-700 mt-2">Detailed, structured, and elegantly printed reports for corporate stakeholders.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-xl transform">
              <Image src={sample3} alt="Sample Work 3" className="w-full h-64 object-cover rounded-lg" />
              <h4 className="text-2xl font-semibold mt-4 text-[#807045]">Marketing Materials</h4>
              <p className="text-gray-700 mt-2">Eye-catching posters, flyers, and promotional materials that make an impact.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Features */}
      <section className="py-16 px-8">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h3 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.6 }}
            className="text-3xl font-semibold mb-6"
          >
            Advanced Features of Our Printing Solutions
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h4 className="text-2xl font-semibold mt-4 text-[#807045]">Environmentally Friendly</h4>
              <p className="mt-4 text-gray-700">
                Our printers are designed to minimize waste and energy consumption, helping your business reduce its environmental impact while maintaining high-performance output.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h4 className="text-2xl font-semibold mt-4 text-[#807045]">Secure Printing</h4>
              <p className="mt-4 text-gray-700">
                Protect your sensitive business information with our secure printing solutions. We offer encryption and authentication measures to ensure your documents are printed safely.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h4 className="text-2xl font-semibold mt-4 text-[#807045]">Flexible Paper Handling</h4>
              <p className="mt-4 text-gray-700">
                Our printers offer a variety of paper handling options, allowing you to print on different sizes and types of media, making them suitable for all your printing needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="py-16 px-8 bg-[#f8f8f8]">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h3 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.7 }}
            className="text-3xl font-semibold mb-6"
          >
            Trusted by Leading Brands
          </motion.h3>
          <div className="flex justify-center space-x-8">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
              <Image src={zicta} alt="zicta" className="h-full w-full object-cover" />
            </div>
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
              <Image src={mtn} alt="mtn" className="h-full w-full object-cover" />
            </div>
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
              <Image src={lafarge} alt="lafarge" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="p-5 pr-9">
        <div className="bg-[#807045] text-white py-16 px-8 rounded-[40px]">
          <div className="max-w-6xl mx-auto text-center">
            <motion.h3 
              initial={{ opacity: 0, y: -20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.8 }}
              className="text-3xl font-semibold mb-6"
            >
              Get in Touch
            </motion.h3>
            <p className="text-lg mb-8">
              Ready to optimize your business's printing operations? Contact us today for a personalized consultation and discover how we can help streamline your printing processes.
            </p>
            <button className="mt-6 px-8 py-3 bg-white text-[#807045] font-semibold rounded-full shadow-md hover:bg-[#f0ebd5] transition-all">
              Contact us
            </button>
          </div>
        </div>
      </section>      
    </div>
  );
}
