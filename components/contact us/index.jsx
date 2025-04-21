'use client'

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import MovingTextEffect from "../moving text";
// import './style.scss';

export default function ContactUsPage() {
  return (
    <div className="contact-page min-h-screen bg-white">
      
      {/* Hero Section */}
      <MovingTextEffect
        title="Get In Touch"
        subtitle="We’d love to hear from you! Contact us for inquiries, collaborations, or support."
        image=""
      />

      {/* Contact Info Section */}
      <div className="py-16 px-8 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-[#807045]">
        {[
          { icon: <Mail size={40} />, title: "Email Us", info: "sales@shreeji.co.zm" },
          { icon: <Phone size={40} />, title: "Call Us", info: "+260 97 774 0588" },
          { icon: <MapPin size={40} />, title: "Visit Us", info: "Shreeji House, Plot No. 1209, Addis Ababa Drive" },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.2 }}
            className="bg-[#F8F6F0] rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:translate-y-[-5px] text-center"
          >
            <div className="flex justify-center">{item.icon}</div>
            <h3 className="text-2xl font-semibold mt-4">{item.title}</h3>
            <p className="mt-2 text-gray-700">{item.info}</p>
          </motion.div>
        ))}
      </div>

      {/* Contact Form */}
      <div className="bg-[#807045] text-white py-16 px-2 md:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-semibold text-center"
        >
          Send Us a Message
        </motion.h2>

        <form className="max-w-3xl mx-auto mt-12 bg-white py-8 px-5 md:px-8 rounded-xl shadow-lg text-[#807045] space-y-6">
          <div>
            <label className="block font-semibold">Name</label>
            <input type="text" required placeholder="Name" className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#807045]" />
          </div>
          <div>
            <label className="block font-semibold">Company</label>
            <input type="text" placeholder="Company" className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#807045]" />
          </div>
          <div>
            <label className="block font-semibold">Email</label>
            <input type="email" required placeholder="Email" className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#807045]" />
          </div>
          <div>
            <label className="block font-semibold">Message</label>
            <textarea required placeholder="Type your message..." rows="4" className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#807045]"></textarea>
          </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            className="flex items-center justify-center gap-2 w-full bg-[#807045] text-white py-3 rounded-lg hover:bg-[#6e6340] transition-colors"
          >
            Send Message <Send size={18} />
          </motion.button>
        </form>
      </div>

      {/* Map Section (Optional) */}
      <div className="py-16 md:px-8 mx-auto text-center bg-[#F8F6F0]">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-[#807045]"
        >
          Find Us Here
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 rounded-2xl overflow-hidden shadow-lg mx-3 md:mx-20"
        >
          <iframe 
            className="w-full h-[60vh]"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3846.5344434981585!2d28.307104199999998!3d-15.401679699999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19408b36cfc88f83%3A0x35e0f42d1a0f1487!2sShreeji%20House!5e0!3m2!1sen!2szm!4v1743500618985!5m2!1sen!2szm"
            loading="lazy"
          ></iframe>
        </motion.div>
      </div>
    </div>
  );
}
