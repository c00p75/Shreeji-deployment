'use client'

import { useRef, useState } from "react";
import { X } from "lucide-react";
import "./style.scss";
import emailjs from '@emailjs/browser';

export default function ContactModal() {
  const form = useRef();

  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    email_2: "george.m@balloinnovations.com",    // Shreeji team email
    phone: "null",
    company: "null",
    industry: "null",
    size: "null",
    solutions: ['IT services'],
    volume: "1–100",
    message: "null",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      solutions: checked
        ? [...prev.solutions, value]
        : prev.solutions.filter((s) => s !== value),
    }));
  };

  const sendEmail = async() => {
    const emailParams = {
      name: formData.fullName,
      email: formData.email,
      email_2: formData.email_2,
      phone: formData.phone,
      company: formData.company,
      industry: formData.industry,
      size: formData.size,
      volume: formData.volume,
      solutions: formData.solutions.join(', '),
      message: formData.message,      
    }


    await emailjs
      .send('service_rvtatdj', 'template_qsqeewk', emailParams, {
        publicKey: 'j3E2XBrXnLlcLJ96U',
      })
      .then(
        async() => {
          console.log(emailParams)
          await emailjs      
            .send('service_rvtatdj', 'template_mkclybe', emailParams, {
              publicKey: 'j3E2XBrXnLlcLJ96U',
            })
            .then(
              () => {
                console.log(emailParams)
                console.log('SUCCESS!');
              },
              (error) => {
                console.log('FAILED...', error.text);
              },
            );

          setSubmitting(false)
          setSubmitted(true)
          setTimeout(() => { setOpen(false) }, 3000);
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );      
  };

  const handleSubmit = (e) => {
    setSubmitting(true)
    e.preventDefault();
    sendEmail()
  };

  return (
    <>
      <button 
        onClick={() => setOpen(true)}
        className="px-8 py-3 bg-white text-[#807045] font-semibold rounded-full shadow-md hover:bg-[#5c5132] hover:text-white transition-all"
      >
        Get Started
      </button>

      {open && (
        <div
          className="printing-contact w-screen h-screen fixed inset-0 z-50 bg-black bg-opacity-80 flex justify-center items-center md:p-20 text-[black]"
          onClick={() => setOpen(false)} // Close on backdrop click
        >
          <div
            className="brown-bg-gradient rounded-2xl shadow-lg relative overflow-hidden"
            onClick={(e) => e.stopPropagation()} // Prevent modal click from closing
          >
            <div className="h-[98vh] md:h-[90vh] w-[95vw] md:w-[70vw] overflow-y-auto p-6 relative">
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 bg-black text-[whitesmoke] rounded-full p-2"
              >
                <X size={24} />
              </button>

              <h2 className="md:px-20 pb-5 text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[white] to-[whitesmoke] bg-clip-text text-transparent text-center mt-10 mb-14">
                Streamline Your SIM Registration & Management
              </h2>

              <form ref={form} onSubmit={handleSubmit} className="space-y-6 flex flex-col">
                <div className="flex flex-col gap-10 md:gap-4 pb-5">
                  <div className="flex flex-col md:flex-row gap-10 md:gap-10">
                    <div className="flex flex-col w-full text-start">
                      <label className="text-white font-semibold mb-2">Name</label>
                      <input name="fullName" type="text" required placeholder="Full Name" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange} />
                    </div>

                    <div className="flex flex-col w-full text-start">
                      <label className="text-white font-semibold mb-2">Email</label>
                      <input name="email" type="email" required placeholder="Email Address" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange} />
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-8 md:gap-10">
                    <div className="flex flex-col w-full text-start mt-2">
                      <label className="text-white font-semibold mb-2">Phone Number</label>
                      <input name="phone" type="tel" placeholder="+260" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange} />
                    </div>
                    
                    <div className="flex flex-col w-full text-start mt-2">
                      <label className="text-white font-semibold mb-2">Company Name</label>
                      <input name="company" type="text" placeholder="e.g Gradle Holdings" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange} />
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-8 md:gap-10">
                    <div className="flex flex-col w-full text-start mt-2">
                      <label className="text-white font-semibold mb-2">Service Type</label>
                        <select name="industry" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange}>
                        <option value="Telecom Operator">Telecom Operator</option>
                        <option value="Corporate Client">Corporate Client</option>
                        <option value="Individual Subscriber">Individual Subscriber</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    
                    <div className="flex flex-col w-full text-start mt-2">
                      <label className="text-white font-semibold mb-2">SIM Registration Volume (per month)</label>
                      <select name="size" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange}>
                        <option value="1–100">1–100</option>
                        <option value="101–500">101–500</option>
                        <option value="501–1000">501–1000</option>
                        <option value="1001–3000">1001–3000</option>
                        <option value="3000+">3000+</option>
                      </select>
                    </div>
                  </div>
                </div>

                <textarea
                  name="message"
                  rows={5}
                  placeholder="How can we help you? (Optional)"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange}
                />

                <div className="flex-center py-5">
                  <button type="submit" disabled={submitted} className={`text-white font-semibold px-6 py-3 rounded-xl transition w-fit ${submitted ? 'bg-black scale-150 transition-all ease-in-out shadow-2xl shadow-[var(--shreeji-primary)]' : submitting ? 'bg-gray-600' : 'bg-green-600 hover:bg-green-700'}`}>
                    {!submitted && !submitting && ("Submit")}
                    {submitted && !submitting && ("Sent ✔")} 
                    {!submitted && submitting && ("Submitting...")} 
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
