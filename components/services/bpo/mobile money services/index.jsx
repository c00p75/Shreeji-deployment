'use client'

import { motion } from "framer-motion";
import { CheckCircle, CreditCard, DollarSign, Phone, ShieldCheck, ShoppingCart, Users } from "lucide-react";
import '@/components/services/style.scss'
import MovingTextEffect from "@/components/moving text";
import ContactModal from "./contact us";

export default function MobileMoneyPage() {
  return (
    <div className="mobile-money-page min-h-screen bg-gradient-to-br from-white to-[#f9f6e6] text-[#403d2a]">

      {/* Hero Section */}
      <MovingTextEffect
        title="Mobile Money Services"
        subtitle="Convenient, fast, and secure mobile money solutions that empower individuals and businesses to manage financial transactions on the go."
        image=""
      />

      {/* What is Mobile Money? */}
      <div className="py-14 md:py-20 px-8 max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-[#807045]">What is Mobile Money?</h2>
        <p className="mt-6 text-lg max-w-4xl mx-auto text-gray-700">
          Mobile Money is a digital financial service that allows users to send, receive, and store money using their mobile phones. It offers a fast, secure, and convenient alternative to traditional banking services, especially in regions with limited access to physical banks.
          Our Mobile Money services offer seamless transactions, secure payment processing, and the ability to transfer funds across different platforms, making financial services more accessible for everyone.
        </p>

        <p className="mt-6 text-lg max-w-4xl mx-auto text-gray-700">
          Whether you're an individual looking for a simple way to send money to family or a business needing a fast, scalable way to process payments, our Mobile Money service is designed to provide <strong>secure</strong> <strong>instant</strong> and <strong>affordable</strong> financial solutions.
        </p>
      </div>

      {/* Key Features */}
      <div className="relative py-20 px-3 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-[#807045] text-center mb-12">Key Features of Our Mobile Money Service</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            {
              icon: <CreditCard size={50} className="text-[#807045]" />,
              title: "Secure Payment Processing",
              description: "Our system ensures that all mobile money transactions are processed securely, protecting both businesses and individuals from fraud and unauthorized access.",
            },
            {
              icon: <DollarSign size={50} className="text-[#807045]" />,
              title: "Affordable Transfers",
              description: "Enjoy low transaction fees, enabling affordable money transfers to and from anyone, anytime, anywhere, without hidden charges or complex processes.",
            },
            {
              icon: <Phone size={50} className="text-[#807045]" />,
              title: "Mobile Accessibility",
              description: "Access your funds from any mobile device, anywhere. No need for physical bank visits, as our service allows you to manage finances right from your phone.",
            },
            {
              icon: <ShoppingCart size={50} className="text-[#807045]" />,
              title: "Online & In-Store Payments",
              description: "Our platform supports payments for both online and in-store transactions, offering businesses and consumers a versatile way to settle bills and purchases.",
            },
            {
              icon: <Users size={50} className="text-[#807045]" />,
              title: "Peer-to-Peer Transfers",
              description: "Send money to anyone, anywhere, using only their mobile number. Our peer-to-peer transfer service allows individuals to send and receive funds with ease.",
            },
            {
              icon: <CreditCard size={50} className="text-[#807045]" />,
              title: "Bill Payments & Top-Ups",
              description: "Pay your utility bills, top-up your mobile airtime, and perform other transactions with ease. Manage all your financial needs in one place.",
            }
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

      {/* Why Choose Us? */}
      <div className="py-20 px-3 md:px-8 bg-[#f5f5f5] text-center">
        <h2 className="text-3xl font-bold text-[#807045]">Why Choose Our Mobile Money Service?</h2>
        <p className="mt-6 text-lg max-w-4xl mx-auto text-gray-700">
          Our Mobile Money service is built to cater to a wide range of financial needs, whether you're an individual looking for an easy way to send money or a business seeking efficient, secure payment solutions. Here's why we stand out:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {[
            {
              icon: <CheckCircle size={50} className="text-[#807045]" />,
              title: "Instant Transfers",
              description: "Money transfers are processed instantly, ensuring that recipients can access their funds without unnecessary delays.",
            },
            {
              icon: <ShieldCheck size={50} className="text-[#807045]" />,
              title: "Top-Tier Security",
              description: "Our platform employs cutting-edge security protocols, including encryption and two-factor authentication, to ensure every transaction is safe and secure.",
            },
            {
              icon: <Phone size={50} className="text-[#807045]" />,
              title: "User-Friendly Interface",
              description: "Our platform is easy to use, allowing anyone—regardless of technical ability—to make and receive payments with just a few taps on their mobile phone.",
            },
            {
              icon: <Users size={50} className="text-[#807045]" />,
              title: "Extensive Network",
              description: "We offer a vast network of users and businesses, ensuring that money transfers can be made globally, facilitating seamless transactions across borders.",
            },
            {
              icon: <ShoppingCart size={50} className="text-[#807045]" />,
              title: "Multiple Payment Options",
              description: "Our service supports various payment methods, including mobile wallets, bank accounts, and debit/credit cards, making it versatile and accessible.",
            },
            {
              icon: <CreditCard size={50} className="text-[#807045]" />,
              title: "24/7 Availability",
              description: "Our service is available 24/7, ensuring you can make payments or transfers at any time, from anywhere in the world.",
            }
          ].map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.2 }}
              className="bg-white p-8 rounded-xl shadow-lg hover:scale-105 transform transition-all"
            >
              <div className="flex flex-col md:flex-row gap-2 md:gap-0 items-center space-x-4">
                {benefit.icon}
                <h3 className="text-xl font-semibold text-[#807045]">{benefit.title}</h3>
              </div>
              <p className="mt-4 text-gray-700">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center px-5 py-16 bg-[#807045] text-white shadow-inner">
        <h2 className="text-3xl font-bold">Start Using Mobile Money Today</h2>
        <p className="my-5 text-lg">Efficient, secure, and affordable mobile money services designed to help individuals and businesses manage their finances with ease.</p>
        <ContactModal />
      </div>

    </div>
  );
}
