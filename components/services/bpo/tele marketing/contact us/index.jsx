'use client'

import { useRef, useState } from "react";
import { X } from "lucide-react";
import "./style.scss"
import emailjs from '@emailjs/browser';
import { emailJsVariables, salesTeamEmail } from "@/utils/email-handler";

export default function ContactModal() {
  const form = useRef();

  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    email_2: salesTeamEmail,    // Shreeji team email
    phone: "",
    company: "",
    industry: "",
    size: "1–10",
    solutions: ['IT services'],
    volume: "N/A",
    message: "",
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
      name: formData.fullName || "not provided",
      email: formData.email,
      email_2: formData.email_2,
      phone: formData.phone || "not provided",
      company: formData.company || "not provided",
      industry: formData.industry || "not provided",
      size: formData.size || "not provided",
      volume: formData.volume,
      solutions: formData.solutions.join(', '),
      message: formData.message || "not provided",      
    }


    await emailjs
      .send(emailJsVariables.ballo_service_id, emailJsVariables.service_inquiry_template_id, emailParams, {
        publicKey: emailJsVariables.ballo_public_key,
      })
      .then(
        async() => {
          await emailjs      
            .send(emailJsVariables.shreeji_service_id, emailJsVariables.request_recieved_template_id, emailParams, {
              publicKey: emailJsVariables.shreeji_public_key,
            })
            .then(
              () => {
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
    if(submitting){return}
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
        Get in Touch with Our Experts
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
                Start Your Telemarketing Campaign with Us
              </h2>

              <form ref={form} onSubmit={handleSubmit} className="space-y-6 flex flex-col">
                <div className="flex flex-col gap-10 md:gap-4">
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
                      <label className="text-white font-semibold mb-2">Industry</label>
                      <select name="industry" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange}>
                        <option value="">Select Industry</option>
                        <option value="Corporate">Corporate</option>
                        <option value="Education">Education</option>
                        <option value="Government">Government</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    
                    <div className="flex flex-col w-full text-start mt-2">
                      <label className="text-white font-semibold mb-2">Company Size</label>
                      <select name="size" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange}>
                        <option value="1–10">1–10</option>
                        <option value="11–50">11–50</option>
                        <option value="51–200">51–200</option>
                        <option value="201–500">201–500</option>
                        <option value="500+">500+</option>
                      </select>
                    </div>
                  </div>
                  
                </div>

                <fieldset className="space-y-2 flex-center text-white">
                  <legend className="font-semibold text-3xl pt-10">Services of Interest</legend>
                  <div className="flex md:justify-center flex-wrap md:space-x-5 gap-5 py-5">
                    {[
                      "Outbound Calling Campaigns",
                      "Lead Generation & Qualification",
                      "Customer Follow-Ups",
                      "Event/Promotion Announcements",
                      "Product/Service Feedback Collection",
                      "Other",
                    ].map((solution) => (
                      <label key={solution} className="flex items-center w-fit">
                        <input
                          type="checkbox"
                          value={solution}
                          onChange={handleCheckbox}
                          className="mr-2 w-6 h-6"
                        />
                        {solution}
                      </label>
                    ))}
                  </div>
                </fieldset>

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
