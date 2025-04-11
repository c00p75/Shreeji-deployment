// app/services/telemarketing/page.tsx

'use client';

import MovingTextEffect from "@/components/moving text";
import { motion } from "framer-motion";
import { PhoneCall, Headphones, MessageCircle } from "lucide-react";

export default function TelemarketingPage() {
  return (
    <div className="telemarketing-page min-h-screen bg-white">
      {/* Hero Section */}
      <MovingTextEffect
        title="Tele-marketing Services"
        subtitle="Engage, convert, and retain customers through strategic outbound communication powered by data-driven targeting and a passionate team of professionals."
        image=""
      />

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto my-24 overflow-visible">
        {[
          {
            icon: <PhoneCall size={40} />,
            title: "Outbound Calling Campaigns",
            description:
              "Drive results with professional outbound calls for product promotions, event invitations, lead nurturing, and customer follow-ups, all tailored to your business goals.",
          },
          {
            icon: <Headphones size={40} />,
            title: "Live Customer Support",
            description:
              "Our well-trained agents provide real-time customer support and feedback collection through scripted and dynamic engagement. We're your extended frontline.",
          },
          {
            icon: <MessageCircle size={40} />,
            title: "Lead Generation & Qualification",
            description:
              "Our team identifies and qualifies potential leads through personalized interactions, improving conversion rates and equipping your sales team with warm prospects.",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
            className="bg-[#fdfdfc] border border-[#ddd8cb] p-6 rounded-2xl shadow-md hover:shadow-xl"
          >
            <div className="flex items-center space-x-4 mb-4 text-[#807045]">
              {item.icon}
              <h2 className="text-2xl font-semibold">{item.title}</h2>
            </div>
            <p className="text-[#5e5633]">{item.description}</p>
          </motion.div>
        ))}
      </section>

      {/* Deep Content Section */}
      <div className="text-[#807045] bg-[#F8F6F0] py-16 px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-semibold text-center"
        >
          Why Choose Shreeji for Telemarketing?
        </motion.h2>
        <div className="max-w-3xl mx-auto mt-12 space-y-8">
          {[
            { step: "1. Experienced Agents", description: "Our multilingual agents are trained to build rapport quickly and follow compliance protocols strictly." },
            { step: "2. Customized Scripts", description: "Every campaign benefits from tailored scripts and dynamic branching to improve engagement and conversion." },
            { step: "3. Real-Time Analytics", description: "Monitor campaign performance with dashboards that offer actionable insights, feedback loops, and optimization recommendations." },
            { step: "4. CRM & Database Integration", description: "We seamlessly connect with your systems, updating lead statuses and syncing conversations in real time." },
            { step: "5. Multi-Channel Follow-up", description: "Combine voice calls with SMS and WhatsApp outreach for broader reach and increased customer responsiveness." },
          ].map((process, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.2 }}
              className="text-white bg-[#807045] p-6 rounded-xl shadow-lg"
            >
              <h3 className="text-xl font-semibold">{process.step}</h3>
              <p className="mt-2">{process.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
      {/* Call to Action */}
      <div className="text-center py-16 bg-[#807045] text-white flex-center shadow-inner">
        <h2 className="text-3xl font-semibold">Let's Talk Growth</h2>
        <p className="mt-5 text-lg max-w-5xl">Ready to scale your outreach, nurture your leads, and improve customer retention through impactful voice campaigns? Our team is ready to amplify your brand.</p>
        <button className="mt-6 px-8 py-4 bg-white text-[#807045]  hover:text-white hover:bg-[#5c5132] font-semibold rounded-full shadow-md transition-all">
        Get in Touch with Our Experts
        </button>
      </div>      
    </div>
  );
}
