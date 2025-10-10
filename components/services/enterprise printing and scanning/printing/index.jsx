'use client'

import { motion } from 'framer-motion';
import { Printer, Package, Home, Sun } from 'lucide-react';
import '@/components/services/style.scss'
import zicta from "@/public/elements/zicta.jpg";
import mtn from "@/public/elements/mtn.jpg";
import lafarge from "@/public/elements/lafarge-holcim.png";
import Image from 'next/image';
import sample1 from "@/public/backgrounds/hero-print.png";
import sample2 from "@/public/backgrounds/hero-print.png";
import sample3 from "@/public/backgrounds/hero-print.png";
import MovingTextEffect from '@/components/moving text';
import ContactModal from '../contact us';
import Link from 'next/link';
import { useState } from 'react';
import { slugify, products as printingProducts } from '@/data/printingProducts';

export default function PrintingPage() {
  // Product categories data structure
  const productCategories = {
    indoor: {
      name: "Indoor",
      icon: <Home size={24} className="text-[#807045]" />,
      subCategories: [
        "Banner Stands",
        "Floor Stands & Free Stands", 
        "Brochure Stands",
        "Fabric Stretch Frame",
        "Point of Sale Tables & Counters",
        "Light Boxes & Illuminated Displays",
        "Wall & Hanging Displays",
        "Accessories & Equipment",
        "Flag Indoor Options",
        "Floating Display System",
        "Hanging Extrusions",
        "Ideal Applicator",
        "Ideal Media Roll Dispenser",
        "Ideal Vinyl Weeding Machine & Take-up System",
        "Picture Frames & Shutter Frame",
        "Table Cloth"
      ]
    },
    outdoor: {
      name: "Outdoor",
      icon: <Sun size={24} className="text-[#807045]" />,
      subCategories: [
        "Gazebos",
        "Flags & Flying Banners",
        "A Frames",
        "Outdoor Banner Frames & Wall Systems",
        "BackPack",
        "Billboards",
        "Bunting",
        "Car Options",
        "Director Chair Options",
        "Floor Stand Outdoor",
        "Star Tents",
        "Umbrella",
        "Magnetic Decals",,
        "Selfie Frame",
        "Windsock"
      ]
    }
  };

  // Use shared printing products dataset for details route parity
  const products = printingProducts;


  // State management for tabs
  const [activeMainTab, setActiveMainTab] = useState('indoor');
  const [activeSubTab, setActiveSubTab] = useState(0);

  // Get current products based on selected sub-category
  const getCurrentProducts = () => {
    const currentSubCategory = productCategories[activeMainTab].subCategories[activeSubTab];
    return products[currentSubCategory] || [];
  };

  return (
    <div className="enterprise-level-printing-page bg-white text-gray-800">
      {/* Hero Section */}
      <MovingTextEffect
        title="Enterprise-Level Printing"
        subtitle="Innovative, cost-effective, and high-quality printing solutions tailored to meet the demands of your business."
        image=""
      />

<div className="absolute top-0 left-0 w-screen h-screen z-[0] p-0 m-0">
        <video src="/videos/printing.mp4" autoPlay loop muted playsInline className="w-full h-full object-none" />
      </div>

      {/* About the Service */}
      <section className="py-16 px-5 md:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.3 }}
            className="text-4xl font-semibold mb-6 text-[#807045]"
          >
            Streamlined Enterprise Printing Solutions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-gray-700 mb-16"
          >
            Whether you’re exhibiting at a trade show, setting up an in-store promotion, or enhancing your corporate reception area, your brand deserves to stand out. We specialize in premium indoor branding and display solutions, offering a full range of custom-printed banners, stands, counters, frames, and illuminated displays that combine durability, portability, and visual impact.
          </motion.p>
        </div>

      {/* Product Categories */}
        <div className="max-w-7xl mx-auto px-3 md:px-8">
          
          {/* Main Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 rounded-lg p-1 flex">
              {Object.entries(productCategories).map(([key, category]) => (
                <button
                  key={key}
                  onClick={() => {
                    setActiveMainTab(key);
                    setActiveSubTab(0); // Reset to first sub-tab when switching main tabs
                  }}
                  className={`flex items-center gap-2 px-6 py-3 rounded-md transition-all duration-300 ${
                    activeMainTab === key
                      ? 'bg-white text-[#807045] shadow-md'
                      : 'text-gray-600 hover:text-[#807045]'
                  }`}
                >
                  {category.icon}
                  <span className="font-semibold">{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Sub Tabs */}
          <div className="mb-8">
            <div className="flex flex-wrap justify-center gap-2">
              {productCategories[activeMainTab].subCategories.map((subCategory, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSubTab(index)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeSubTab === index
                      ? 'bg-[#807045] text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-[#807045]'
                  }`}
                >
                  {subCategory}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {getCurrentProducts().map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                <Link href={`/services/enterprise-printing-and-scanning/printing/${slugify(product.name)}`}>
                  <div className="aspect-square bg-gray-100 flex items-center justify-center relative overflow-hidden">
                    <Image 
                      src={(product.images && product.images[0]) || product.image} 
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-contain p-4"
                    />
                </div>
                </Link>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-[#807045] mb-2">{product.name}</h3>
                  {/* <p className="text-gray-600 text-sm mb-3">{product.description}</p> */}
                  <div className="flex justify-between items-center">
                    <span className="text-[#807045] font-bold">{product.price}</span>
                    {/* <Link 
                      href={`/services/enterprise-printing-and-scanning/printing/${slugify(product.name)}`}
                      className="bg-[#807045] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#6b5d3a] transition-colors"
                    >
                      View Details
                    </Link> */}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* No products message */}
          {getCurrentProducts().length === 0 && (
            <div className="text-center py-12">
              <Package size={60} className="text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Products Coming Soon</h3>
              <p className="text-gray-500">We're working on adding products for this category. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Service Highlights */}
      <section className="bg-[#f9f6e6] py-16 px-3 md:px-8">
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

      {/* Service Features */}
      {/* <section className="py-16 px-3 md:px-8">
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
      </section> */}

      {/* Client Testimonials */}
      {/* <section className="py-16 px-8 bg-[#f9f6e6]">
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
      </section> */}

      {/* Contact Section */}
        <div className="bg-[#807045] text-white py-16 px-8">
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
            
            <ContactModal />
          </div>
        </div>        
    </div>
  );
}
