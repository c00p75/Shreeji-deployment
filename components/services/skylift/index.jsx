'use client'

import { motion } from "framer-motion";
import { Truck, Loader, Server, ArrowUpRight, Building, HardHat, Factory, Eclipse, Construction } from "lucide-react";
import ContactModal from "./contact us";
import '@/components/services/style.scss';
import MovingTextEffect from "@/components/moving text";

export default function SkyliftServicesPage() {
  return (
    <div className="skylift-services-page bg-gradient-to-br from-[#fffdf5] to-[#f9f6e6] text-[#2a2a2a]">

      {/* Hero Section */}
      <MovingTextEffect
        title="Skylift Services"
        subtitle="Comprehensive lifting and material handling solutions for large-scale industrial, construction, and infrastructure projects. We offer top-tier cranes, equipment, and a highly trained team to elevate your operations."
        image=""
      />

      {/* Skylift Services Overview */}
      <div className="max-w-6xl mx-auto py-20 px-3 md:px-8">
        <h2 className="text-4xl font-bold text-[#807045] mb-8 text-center">Skylift Solutions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {[
            {
              icon: <Truck size={50} className="text-[#807045]" />,
              title: "Heavy Lifting Solutions",
              description: "With our fleet of powerful cranes and lifting equipment, we can safely and efficiently lift and move heavy materials, maximizing operational uptime and safety."
            },
            {
              icon: <Loader size={50} className="text-[#807045]" />,
              title: "Material Handling Services",
              description: "Our expert team provides tailored material handling services, ensuring efficient movement and safe delivery of materials across your construction or industrial sites."
            },
            {
              icon: <Server size={50} className="text-[#807045]" />,
              title: "Site Consultation & Planning",
              description: "Our team offers comprehensive site consultations and planning services to ensure that every lifting operation is optimized for safety and efficiency, minimizing delays and risks."
            }
          ].map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:scale-105 transform transition-all hover:shadow-2xl"
            >
              <div className="flex flex-col md:flex-row gap-2 md:gap-0 items-center justify-center space-x-6 mb-4">
                {service.icon}
                <h3 className="text-2xl font-semibold text-[#807045]">{service.title}</h3>
              </div>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="light-bg-gradient py-20 px-8 relative">
        <h2 className="text-4xl font-bold text-[#807045] mb-12 text-center">Advanced Skylift Technology</h2>
        <div className="flex flex-col md:flex-row items-center space-y-12 md:space-y-0 justify-between">
          <div className="flex-1 text-center md:text-left">
            <div className="text-center max-w-4xl mx-auto">
              <h3 className="text-4xl font-semibold text-[#807045]">State-of-the-Art Equipment</h3>
              <p className="mt-4 text-gray-600 px-3 md:px-0">
                Our fleet of cutting-edge cranes and lifting equipment is constantly updated to ensure that we provide the most efficient and reliable service. Our technology is rigorously tested to meet the highest standards of safety and performance.
              </p>
            </div>
          </div>
        </div>

        <h2 className="text-4xl font-semibold text-[#807045] mt-16 mb-5 text-center">Safety Standards</h2>
        <div className="text-center max-w-4xl mx-auto">
          <p className="text-lg text-gray-600 mb-6">
            At Skylift Services, safety is our number one priority. Our team follows strict safety protocols and utilizes the latest safety equipment to ensure that all operations are carried out with the highest standards of safety and performance.
          </p>
          <p className="text-lg text-gray-600">
            All our equipment undergoes regular safety inspections, and our operators are highly trained in both safety procedures and operational efficiency. You can trust Skylift Services to provide a safe working environment at every stage of your project.
          </p>
        </div>
      </div>

      {/* Industries Served Section */}
      <div className="py-20 px-3 md:px-8 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-[#807045] mb-12 text-center">Industries We Serve</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-16">
          {[
            {
              icon: <Construction size={50} className="text-[#807045]" />,
              title: "Construction",
              description: "We offer precise and efficient lifting solutions for large construction projects, from high-rise buildings to residential developments."
            },
            {
              icon: <HardHat size={50} className="text-[#807045]" />,
              title: "Oil & Gas",
              description: "Our lifting equipment is built to handle the toughest demands in the oil and gas industry, ensuring safety and efficiency in challenging environments."
            },
            {
              icon: <Truck size={50} className="text-[#807045]" />,
              title: "Logistics & Transportation",
              description: "We support logistics companies with reliable and efficient material handling and lifting solutions to streamline operations."
            },
            {
              icon: <Factory size={50} className="text-[#807045]" />,
              title: "Manufacturing",
              description: "Our equipment assists manufacturing companies in handling heavy materials and machinery with precision and safety."
            },
            {
              icon: <Eclipse size={50} className="text-[#807045]" />,
              title: "Renewable Energy",
              description: "We provide lifting and installation services for renewable energy projects, including solar farms and wind turbine construction."
            },
            {
              icon: <Building size={50} className="text-[#807045]" />,            
              title: "Infrastructure Projects",
              description: "Our skylift services support large-scale infrastructure projects, from bridges to road construction, ensuring smooth and safe operations."
            }
          ].map((industry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.2 }}
              className="bg-white px-3 md:px-8 py-8 rounded-2xl shadow-lg transform hover:scale-105 transition-all hover:shadow-2xl"
            >
              <div className="flex flex-col md:flex-row gap-2 md:gap-0 items-center justify-center md:space-x-6 mb-4">
                {industry.icon}
                <h3 className="text-2xl font-semibold text-[#807045]">{industry.title}</h3>
              </div>
              <p className="mt-4 text-gray-600">{industry.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="light-bg-gradient py-20 px-8">
        <h2 className="text-4xl font-bold text-[#807045] mb-12 text-center">Why Choose Skylift Services?</h2>
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-lg text-gray-600 mb-6">
            Skylift Services stands out in the industry for several reasons. Our fleet of modern equipment, highly skilled operators, and commitment to safety ensure that we deliver superior lifting solutions for every project. Whether you're working on a construction site or an infrastructure project, Skylift Services has the expertise to meet your needs.
          </p>
          <p className="text-lg text-gray-600">
            We also pride ourselves on providing unparalleled customer service, ensuring that each project runs smoothly and efficiently from start to finish.
          </p>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-[#807045] text-white py-16 px-8 text-center flex-center shadow-lg">
        <h2 className="text-3xl font-semibold">Get Started with Skylift Services</h2>
        <p className="mt-2 text-lg max-w-5xl mb-5">Maximize the efficiency and safety of your lifting operations with our expert solutions. Let us handle the heavy lifting so you can focus on your core business.</p>
        <ContactModal />
      </div>
    </div>
  );
}
