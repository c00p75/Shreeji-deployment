'use client'

import { motion } from "framer-motion";
import { Briefcase, ShieldCheck, UserCheck, Globe, ServerCog, Headset } from "lucide-react";
import '@/components/services/style.scss'
import MovingTextEffect from "@/components/moving text";

export default function ITConsultingPage() {
  return (
    <div className="it-consulting-page min-h-screen bg-white">
      {/* Hero Section */}
      <MovingTextEffect
        title="IT Consulting & Managed Services"
        subtitle="Optimize your IT infrastructure, enhance security, and streamline business operations with our expert consulting services."
        image=""
      />

      {/* Our Services Section */}
      <div className="py-16 px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-semibold text-center text-[#807045]"
        >
          Our IT Consulting & Managed Services
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {[
            {
              icon: <Briefcase size={50} className="text-[#807045]" />,
              title: "IT Strategy & Advisory",
              description: "We align technology with your business goals, ensuring long-term efficiency and innovation."
            },
            {
              icon: <ShieldCheck size={50} className="text-[#807045]" />,
              title: "Cybersecurity & Risk Management",
              description: "Protect your business from cyber threats with advanced security protocols and risk assessment."
            },
            {
              icon: <UserCheck size={50} className="text-[#807045]" />,
              title: "IT Support & Helpdesk",
              description: "24/7 support and proactive monitoring to ensure uninterrupted business operations."
            },
            {
              icon: <Globe size={50} className="text-[#807045]" />,
              title: "Cloud Consulting & Migration",
              description: "Seamlessly transition to the cloud with expert guidance on infrastructure and security."
            },
            {
              icon: <ServerCog size={50} className="text-[#807045]" />,
              title: "Managed IT Infrastructure",
              description: "We manage your IT environment, reducing downtime and improving efficiency."
            },
            {
              icon: <Headset size={50} className="text-[#807045]" />,
              title: "Business Continuity & Disaster Recovery",
              description: "Ensure data protection and rapid recovery with tailored business continuity plans."
            }
          ].map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.2 }}
              className="bg-[#F8F6F0] rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:translate-y-[-5px] cursor-pointer"
            >
              <div className="flex items-center space-x-4">
                {service.icon}
                <h3 className="text-2xl font-semibold text-[#807045]">{service.title}</h3>
              </div>
              <p className="mt-4 text-gray-700">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Our Process Section */}
      <div className="bg-[#807045] text-white py-16 px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-semibold text-center"
        >
          Our Consulting Process
        </motion.h2>
        <div className="max-w-3xl mx-auto mt-12 space-y-8">
          {[
            { step: "1. Assessment & Analysis", description: "We evaluate your current IT landscape and identify areas for improvement." },
            { step: "2. Strategy Development", description: "Customized IT roadmaps designed to enhance efficiency and growth." },
            { step: "3. Implementation & Integration", description: "Deploying solutions with minimal disruption to your operations." },
            { step: "4. Monitoring & Optimization", description: "Continuous support to ensure performance, security, and compliance." }
          ].map((process, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.2 }}
              className="bg-white text-[#807045] p-6 rounded-xl shadow-lg"
            >
              <h3 className="text-xl font-semibold">{process.step}</h3>
              <p className="mt-2 text-gray-700">{process.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="py-16 px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-semibold text-center text-[#807045]"
        >
          Why Choose Us?
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {[
            { title: "Expert IT Consultants", description: "A team of certified professionals with years of industry experience." },
            { title: "Proactive IT Management", description: "We prevent problems before they impact your business." },
            { title: "Customized Solutions", description: "Tailored IT strategies designed to match your unique business needs." },
            { title: "Cost-Effective Services", description: "Optimized IT solutions that deliver measurable ROI." }
          ].map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.2 }}
              className="bg-[#F8F6F0] p-8 rounded-xl shadow-lg"
            >
              <h3 className="text-xl font-semibold text-[#807045]">{benefit.title}</h3>
              <p className="mt-4 text-gray-700">{benefit.description}</p>
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
          Ready to Optimize Your IT Strategy?
        </motion.h2>
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 px-8 py-3 bg-white text-[#807045] rounded-lg hover:bg-[#4b4228] hover:text-white transition-colors"
        >
          Get a Free IT Consultation
        </motion.button>
      </div>
    </div>
  );
}
