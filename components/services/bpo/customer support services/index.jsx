'use client'

import { motion } from "framer-motion";
import { Headphones, MessageCircle, Smartphone, LifeBuoy } from "lucide-react";
import '@/components/services/style.scss';
import MovingTextEffect from "@/components/moving text";

export default function CustomerSupportPage() {
  return (
    <div className="customer-support-page min-h-screen bg-gradient-to-br from-white to-[#f9f6e6] text-[#403d2a]">

      {/* Hero Section */}
      <MovingTextEffect
        title="Customer Support Services"
        subtitle="Delivering exceptional support for your customers, ensuring satisfaction, retention, and long-term relationships through multiple support channels."
        image=""
      />
      {/* <div className="relative py-32 px-6 text-center bg-[#f5f5f5] services-hero-section">
        <motion.h1 
          initial={{ opacity: 0, y: -50 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="text-5xl font-extrabold drop-shadow-md"
        >
          Customer Support Services
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-lg max-w-3xl mx-auto opacity-80"
        >
          <strong>Delivering exceptional support</strong> for your customers, ensuring satisfaction, retention, and long-term relationships through multiple support channels.
        </motion.p>
      </div> */}

      {/* Our Support Services */}
      <div className="pt-20 pb-10 px-8 max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-semibold text-[#807045]">Our Customer Support Services</h2>
        <p className="mt-6 text-lg max-w-4xl mx-auto text-gray-700">
          At <strong>Company Name</strong>, we understand the importance of customer satisfaction. Our comprehensive customer support services are designed to provide timely, effective solutions across various communication channels. Whether it's through phone, email, chat, or social media, we ensure your customers receive seamless support at all times.
        </p>
      </div>

      {/* Key Support Features */}
      <div className="relative py-20 px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold text-[#807045] text-center mb-12">Key Support Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            {
              icon: <Headphones size={50} className="text-[#807045]" />,
              title: "24/7 Phone Support",
              description: "Our expert support team is available around the clock to assist with any customer inquiries or issues, ensuring a quick resolution to problems.",
            },
            {
              icon: <MessageCircle size={50} className="text-[#807045]" />,
              title: "Live Chat Support",
              description: "Real-time assistance through live chat ensures customers can get instant help, improving their experience and satisfaction.",
            },
            {
              icon: <Smartphone size={50} className="text-[#807045]" />,
              title: "Mobile Support",
              description: "We provide mobile-first support for users, ensuring seamless interaction with customers through mobile apps or messaging platforms.",
            },
            {
              icon: <LifeBuoy size={50} className="text-[#807045]" />,
              title: "Email Support",
              description: "Our email support system ensures that all customer queries are responded to promptly, with detailed solutions to their issues.",
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

      {/* Why Choose Our Support Services */}
      <div className="py-20 px-8 bg-[#f5f5f5] text-center">
        <h2 className="text-3xl font-semibold text-[#807045]">Why Choose Our Support Services?</h2>
        <p className="mt-6 text-lg max-w-4xl mx-auto text-gray-700">
          With our comprehensive customer support services, we ensure that your customers always feel heard and valued. Here's why choosing us makes sense:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {[
            {
              icon: <Headphones size={50} className="text-[#807045]" />,
              title: "Timely Assistance",
              description: "We understand the importance of quick resolution. Our team is committed to providing fast responses, ensuring minimal disruption to your business.",
            },
            {
              icon: <MessageCircle size={50} className="text-[#807045]" />,
              title: "Multi-Channel Support",
              description: "We offer support through various channels, including phone, live chat, email, and social media, allowing customers to choose the best method for them.",
            },
            {
              icon: <Smartphone size={50} className="text-[#807045]" />,
              title: "Mobile Optimization",
              description: "With mobile-first support, your customers can interact with our team seamlessly through any mobile device, enhancing accessibility.",
            },
            {
              icon: <LifeBuoy size={50} className="text-[#807045]" />,
              title: "Expert Support Team",
              description: "Our trained support team is dedicated to providing expert solutions, resolving issues with professionalism and efficiency.",
            },
            {
              icon: <Headphones size={50} className="text-[#807045]" />,
              title: "Enhanced Customer Satisfaction",
              description: "Our services are designed to ensure that every interaction leaves your customers satisfied, leading to improved retention rates.",
            },
            {
              icon: <MessageCircle size={50} className="text-[#807045]" />,
              title: "Scalability",
              description: "Whether you're a small business or a large enterprise, we can scale our support services to meet your growing needs.",
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
      <div className="text-center py-16 bg-[#807045] text-white shadow-inner flex-center">
        <h2 className="text-3xl font-semibold">Enhance Your Customer Experience with Us</h2>
        <p className="mt-5 text-lg max-w-5xl">Partner with us for superior customer support solutions that drive satisfaction, retention, and business growth. Let’s work together to elevate your support services.</p>
        <button className="mt-6 px-8 py-3 bg-white text-[#807045] font-semibold rounded-full shadow-md hover:bg-[#5c5132] hover:text-white transition-all">
          Get Started with Customer Support
        </button>
      </div>

    </div>
  );
}
