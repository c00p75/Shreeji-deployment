'use client'

import { motion } from "framer-motion";
import { Handshake, Users, Globe, Building, Network, Star } from "lucide-react";
import MovingTextEffect from "../moving text";
// import './style.scss';

export default function CollaborationsPage() {
  return (
    <div className="collaborations-page min-h-screen bg-white">
      {/* Hero Section */}
      <MovingTextEffect
        title="Collaborate With Us"
        subtitle="We build powerful partnerships to drive innovation, efficiency, and mutual growth."
        image=""
      />

      {/* Why Collaborate? */}
      <div className="py-16 px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-semibold text-center text-[#807045]"
        >
          Why Collaborate With Us?
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {[
            {
              icon: <Handshake size={50} className="text-[#807045]" />,
              title: "Strategic Partnerships",
              description: "Align with an industry leader to drive innovation and market expansion."
            },
            {
              icon: <Users size={50} className="text-[#807045]" />,
              title: "Industry Expertise",
              description: "Leverage our decades of experience in ICT, business solutions, and enterprise services."
            },
            {
              icon: <Globe size={50} className="text-[#807045]" />,
              title: "Global Reach",
              description: "Expand your presence with our extensive network and international collaborations."
            },
            {
              icon: <Building size={50} className="text-[#807045]" />,
              title: "Enterprise-Level Solutions",
              description: "Partner with us for large-scale, customized solutions tailored to your needs."
            },
            {
              icon: <Network size={50} className="text-[#807045]" />,
              title: "Technology Integration",
              description: "Integrate cutting-edge technologies to enhance efficiency and productivity."
            },
            {
              icon: <Star size={50} className="text-[#807045]" />,
              title: "Proven Success",
              description: "Work with a trusted partner known for delivering high-impact results."
            }
          ].map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.2 }}
              className="bg-[#F8F6F0] rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:translate-y-[-5px] cursor-pointer"
            >
              <div className="flex items-center space-x-4">
                {benefit.icon}
                <h3 className="text-2xl font-semibold text-[#807045]">{benefit.title}</h3>
              </div>
              <p className="mt-4 text-gray-700">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Collaboration Models */}
      <div className="bg-[#807045] text-white py-16 px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-semibold text-center"
        >
          How We Collaborate
        </motion.h2>
        <div className="max-w-3xl mx-auto mt-12 space-y-8">
          {[
            { step: "Technology Partnerships", description: "Join forces with us to create next-generation solutions in ICT, printing, and enterprise software." },
            { step: "Joint Ventures", description: "Combine resources and expertise for mutual business growth and market expansion." },
            { step: "Research & Development", description: "Work with us on cutting-edge projects that drive innovation and industry advancement." },
            { step: "Enterprise Solutions", description: "Collaborate on large-scale projects that deliver high-impact business transformations." }
          ].map((collab, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.2 }}
              className="bg-white text-[#807045] p-6 rounded-xl shadow-lg"
            >
              <h3 className="text-xl font-semibold">{collab.step}</h3>
              <p className="mt-2 text-gray-700">{collab.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Success Stories */}
      <div className="py-16 px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-semibold text-center text-[#807045]"
        >
          Success Stories
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {[
            { title: "Telecom Partnerships", description: "We work with major telecom providers for seamless connectivity and enterprise solutions." },
            { title: "Corporate Digital Transformation", description: "Helping businesses transition to cloud-based, data-driven infrastructures." },
            { title: "Smart City Initiatives", description: "Developing urban solutions with biometric kiosks, enterprise software, and data analytics." },
            { title: "Financial & Banking Sector", description: "Enabling secure, efficient banking through advanced IT and BPO services." }
          ].map((story, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.2 }}
              className="bg-[#F8F6F0] p-8 rounded-xl shadow-lg"
            >
              <h3 className="text-xl font-semibold text-[#807045]">{story.title}</h3>
              <p className="mt-4 text-gray-700">{story.description}</p>
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
          Ready to Collaborate?
        </motion.h2>
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 px-8 py-3 bg-white text-[#807045] rounded-lg hover:bg-[#E0A200] hover:text-white transition-colors"
        >
          Get in Touch
        </motion.button>
      </div>
    </div>
  );
}
