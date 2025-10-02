'use client'

import { motion } from "framer-motion";
import { Printer, Scan, FileText, CheckCircle, Building, Briefcase, GraduationCap, ShieldCheck, HelpCircle } from "lucide-react";
import '@/components/services/style.scss'
import Link from "next/link";
import MovingTextEffect from "@/components/moving text";
import ContactModal from "./contact us";

export default function PrintingPage() {

  return (
    <div className="enterprise-printing min-h-screen bg-gradient-to-br from-[#ffffff] to-[#eae7df] text-[#403d2a]">
      
      {/* Hero Section */}
      <MovingTextEffect
        title="Enterprise Printing & Scanning"
        subtitle="Transform your document management with cutting-edge printing and scanning solutions designed for efficiency, security, and cost savings."
        image=""
      />

      {/* Features Section */}
      <div className="relative py-20 px-3 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-[#807045] text-center mb-12">Why Choose Our Printing & Scanning Solutions?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            {
              icon: <Printer size={50} className="text-[#807045]" />,
              title: "High-Speed Printing",
              description: "Experience enterprise-grade printing with precision, efficiency, and reduced operational costs.",
              link: '/services/enterprise-printing-and-scanning/printing'
            },
            {
              icon: <Scan size={50} className="text-[#807045]" />,
              title: "Smart Document Scanning",
              description: "OCR-powered scanning for seamless digitization, searchable documents, and automated workflows.",
              link: '/services/enterprise-printing-and-scanning/scanning'
            },
            {
              icon: <FileText size={50} className="text-[#807045]" />,
              title: "Automated Workflows",
              description: "Reduce manual processing with intelligent document classification and routing.",
            },
            {
              icon: <CheckCircle size={50} className="text-[#807045]" />,
              title: "Secure & Compliant",
              description: "Ensure document security with encrypted data storage, user authentication, and regulatory compliance.",
            },
            {
              icon: <ShieldCheck size={50} className="text-[#807045]" />,
              title: "Eco-Friendly Printing",
              description: "Reduce paper waste and lower carbon footprint with optimized print management solutions.",
            },
            {
              icon: <Building size={50} className="text-[#807045]" />,
              title: "Enterprise Integration",
              description: "Seamlessly integrate with existing IT systems, cloud storage, and ERP solutions.",
            }
          ].map((feature, index) => {
            if(feature.link){
              return (
                <Link href={feature.link} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.2 }}
                    className="backdrop-blur-lg bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all"
                  >
                    <div className="flex flex-col md:flex-row gap-2 md:gap-0 items-center md:space-x-4">
                      {feature.icon}
                      <h3 className="text-2xl font-semibold text-[#807045]">{feature.title}</h3>
                    </div>
                    <p className="mt-4 text-gray-700">{feature.description}</p>                
                    <div className="text-[#807045] mt-6 inline-block">Explore {feature.title} →</div>                
                  </motion.div>
                </Link>
              )
            } else {
              return (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.2 }}
                  className="backdrop-blur-lg bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all"
                >
                  <div className="flex flex-col md:flex-row gap-2 md:gap-0 items-center md:space-x-4">
                    {feature.icon}
                    <h3 className="text-2xl font-semibold text-[#807045]">{feature.title}</h3>
                  </div>
                  <p className="mt-4 text-gray-700">{feature.description}</p>                            
                </motion.div>
              )
            }
          })}
        </div>
      </div>


      {/* Industry Use Cases */}
      <div className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-3 md:px-6">
          <h2 className="text-3xl font-bold text-[#807045] text-center mb-8">Who Benefits from Our Solutions?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Briefcase size={50} className="text-[#807045]" />,
                title: "Corporate Offices",
                description: "Enhance efficiency in large organizations with centralized document management and secure printing.",
              },
              {
                icon: <GraduationCap size={50} className="text-[#807045]" />,
                title: "Educational Institutions",
                description: "Universities and schools benefit from cost-effective, high-volume printing for exams and reports.",
              },
              {
                icon: <Building size={50} className="text-[#807045]" />,
                title: "Government Agencies",
                description: "Secure document handling, compliance, and archiving solutions for public sector offices.",
              }
            ].map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.2 }}
                className="p-6 bg-[#f5f3ee] rounded-xl shadow-md transform hover:scale-105 transition-all"
              >
                <div className="flex flex-col md:flex-row gap-2 md:gap-0 items-center md:space-x-4">
                  {useCase.icon}
                  <h3 className="text-xl font-semibold text-[#807045]">{useCase.title}</h3>
                </div>
                <p className="mt-4 text-gray-700">{useCase.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 px-3 md:px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-[#807045] text-center mb-8">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {[
            {
              question: "Can your printing solutions handle high-volume printing?",
              answer: "Yes! Our enterprise printers are designed for high-speed, high-volume printing with minimal maintenance.",
            },
            {
              question: "Do you provide cloud-based printing options?",
              answer: "Absolutely! We support cloud printing, remote access, and seamless integration with enterprise cloud platforms.",
            },
            {
              question: "What security features do you offer?",
              answer: "Our solutions include encryption, user authentication, and audit trails to ensure document confidentiality.",
            }
          ].map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.2 }}
              className="p-6 bg-white rounded-lg shadow-md"
            >
              <div className="flex flex-col md:flex-row gap-2 md:gap-0 items-center md:space-x-4">
                <HelpCircle size={30} className="text-[#807045]" />
                <h3 className="text-lg font-semibold">{faq.question}</h3>
              </div>
              <p className="mt-2 text-gray-700">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center py-16 bg-[#807045] text-white shadow-inner px-5 md:px-0">
        <h2 className="text-3xl font-semibold mb-6">Get Started Today</h2>
        <p className="text-lg max-w-2xl mx-auto mb-8">
          Ready to take your business to the next level? Our printing and scanning solutions can help streamline your operations, reduce costs, and improve efficiency.
        </p>        
        <ContactModal />
      </div>
    </div>
  );
}
