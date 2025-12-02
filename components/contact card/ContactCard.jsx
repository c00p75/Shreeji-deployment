"use client";

import { useRef, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import "./style.scss";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from '@emailjs/browser';
import thumbsUp from "@/public/elements/thumbs up.png";
import Image from "next/image";
import { emailJsVariables, salesTeamEmail } from "@/utils/email-handler";


const steps = [
  { id: 1, title: "What service are you looking for?", field: "solutions", options: ["ICT Solutions", "Printing", "Skylift services", "Business Process Outsourcing"] },
  { id: 2, title: "Can you provide more details about your needs?", field: "message", placeholder: "Describe your needs..." },
  { id: 3, title: "How can we contact you?", field: "email", placeholder: "Enter your email..." },
];

const ContactCard = () => {
  const form = useRef();
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  const pathname = usePathname();
  const [showCard, setShowCard] = useState(false);
  const [minimize, setMinimize] = useState(false);
  const [displayForm, setDisplayForm] = useState(false);
  const [fieldValidated, setFieldValidated] = useState(true)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [deliveryConfirmed, setDeliveryConfirmed] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    email_2: salesTeamEmail,    // Shreeji team email
    phone: "",
    company: "",
    industry: "",
    size: "",
    solutions: "",
    volume: "N/A",
    message: "",
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleScroll = () => {
      setShowCard(window.scrollY > 700);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);

  const handleNext = () => {
    if(currentStep == 0 && !formData[steps[currentStep].field].length){
      setFieldValidated(false);
    }

    if ((currentStep < steps.length - 1 && formData[steps[currentStep].field].length)) {
      setDirection(1);
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep(currentStep - 1);
    } else {
      setDisplayForm(false)
    }
  };

  const handleChange = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if(formData.solutions){
      setFieldValidated(true);
    }
    setFormData((prev) =>({...prev, [steps[currentStep].field]: e.target.value }));
  };

  const sendEmail = async() => {
    const emailParams = {
      name: formData.fullName,
      email: formData.email,
      email_2: formData.email_2,
      phone: formData.phone || "not provided",
      company: formData.company || "not provided",
      industry: formData.industry || "not provided",
      size: formData.size || "not provided",
      volume: formData.volume,
      solutions: formData.solutions,
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
          setMinimize(true); 
          setDisplayForm(false);
          setSubmitted(false);
          setDeliveryConfirmed(true);
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );      
  };
  

  const handleSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    // alert("Form submitted successfully"); 
    
    
    if(currentStep == 2 && !submitted && isValidEmail(formData.email)){
      setSubmitted(true)
      setSubmitting(true)
      sendEmail()      
    }
  };

  return (
    <>
      <div
        className={`contact-card-container bg-transparent ${
          showCard
            ? "opacity-1 z-20 pointer-events-auto"
            : "opacity-0 -z-40 pointer-events-none"
        }`}
      >
        <div
          className={`card_container ${minimize ? "card-minimized cursor-pointer" : ""}`}
        >
          <div
            className="card_hover"
            onClick={() => {
              minimize && setMinimize(false);
            } }
          >
            <div
              className="card-part part-1 cursor-pointer"
              onClick={() => setMinimize(false)}
             />
            <div
              className="card-part part-2 cursor-pointer"
              onClick={() => setMinimize(false)}
             />
            <div 
              className="card-part part-3"
              onClick={() => {!minimize && setDisplayForm(true)}}  
             />
            <div 
              className="card-part part-4"
              onClick={() => {!minimize && setDisplayForm(true)}}  
             />
            <div
              className="card-part part-5 cursor-pointer"
              onClick={() => setMinimize(true)}
             />
            <div
              className="card-part part-6"
              onClick={() => {!minimize && setDisplayForm(true)}} 
            />
            <div
              className="card-part part-7"
              onClick={() => {!minimize && setDisplayForm(true)}} 
            />
            <div
              className="card-part part-8"
              onClick={() => {!minimize && setDisplayForm(true)}} 
            />
            <div
              className="card-part part-9"
              onClick={() => {!minimize && setDisplayForm(true)}} 
            />
            <div
              className="card-part part-10"
              onClick={() => {!minimize && setDisplayForm(true)}} 
            />
            <div
              className="card-part part-11"
              onClick={() => {!minimize && setDisplayForm(true)}} 
            />
            <div
              className="card-part part-12"
              onClick={() => {!minimize && setDisplayForm(true)}} 
            />
            <div
              className="card-part part-13"
              onClick={() => {!minimize && setDisplayForm(true)}} 
            />
            <div
              className="card-part part-14"
              onClick={() => {!minimize && setDisplayForm(true)}} 
            />
            <div
              className="card-part part-15"
              onClick={() => {!minimize && setDisplayForm(true)}} 
            />
          </div>
          <div className="contact-card flex">
            <div className="absolute right-4 top-3 p-1 flex-center w-8 h-8 z-0 close-btn">
              <X className="close-btn" />
            </div>
            <button
              onClick={() => setMinimize(true)}
              className="absolute right-4 top-3 p-1 flex-center w-8 h-8 z-[2] close-btn" />
            <div
              className="say-hi cursor-pointer"
              onClick={() => setMinimize(false)}
            >
              {!deliveryConfirmed && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 71 74"
                  className="icon_say-hi"
                >
                <path
                  fill="white"
                  d="M43.6574 32.6925C46.2318 27.3745 42.4638 8.00882 50.0978 4.62384C53.3046 3.19858 56.1818 5.55916 57.0637 8.98869C58.7918 15.723 56.7074 24.034 54.9793 30.5011C54.712 31.5166 53.8925 33.7525 54.0261 34.7413C58.5781 27.5437 59.4243 18.9209 63.0587 16.3644C65.9894 14.2978 68.9201 15.4647 70.372 18.7339C72.8573 24.3369 65.6776 37.2266 62.4084 41.7963C67.0227 52.1917 65.9538 64.93 54.9347 70.4083C51.7814 71.21 49.0734 71.2813 45.9556 70.2569C45.9378 70.2569 45.6973 70.1767 45.6706 70.1678C41.0741 73.2588 30.358 73.7309 27.4362 72.3502C20.6395 68.8138 18.2522 61.8479 6.11974 55.3273C4.40052 54.4098 1.96868 53.2518 0.721583 51.0159C-2.53869 45.1902 6.16428 41.0748 14.3773 44.5666C16.7023 45.5554 20.5772 48.1565 22.2251 50.624C23.7395 49.7688 22.9556 47.9071 22.047 44.4954C19.3479 34.4206 8.0082 21.9763 9.7096 14.7699C10.8676 9.85275 16.0965 7.11804 20.0338 10.984C25.5923 16.4535 29.0574 27.9624 31.7031 35.2045C32.8166 34.4117 32.7453 35.2668 31.5873 30.9554C30.2689 26.0472 28.6388 21.1657 27.6322 16.3377C26.492 10.8415 24.746 2.69084 31.4091 0.321349C40.1744 -2.80531 42.2232 18.4132 42.8201 23.6421L43.6841 32.7014L43.6574 32.6925ZM46.5881 69.5888H46.8197C47.5769 69.5977 48.3608 69.6155 49.0823 69.66C51.8615 69.8293 52.8859 69.2146 55.2109 68.1813C63.9584 64.2975 64.6087 52.2452 61.0455 43.5155C60.3685 41.8497 60.6447 41.3509 61.3128 40.2285C64.4661 34.9016 71.343 24.8714 68.6439 18.8051C67.7442 16.792 64.8314 16.2129 63.032 18.333C60.9297 20.8094 59.3976 28.4702 57.0815 32.2916C56.5114 33.2358 55.7275 34.1444 55.2554 34.9818C56.0839 35.5163 55.9859 35.3114 56.4134 36.3981C55.1396 36.3001 51.6299 35.828 50.9886 35.0352C53.1086 34.0821 53.2423 31.8195 54.0885 27.9891C54.6764 25.3079 55.2554 22.9918 55.6385 20.0879C55.9859 17.46 56.3333 14.5116 56.0126 11.7412C55.6117 8.29387 53.9905 4.63275 50.1512 6.34305C44.6105 8.80162 47.7728 25.9314 44.8689 33.6456C45.8131 34.2068 45.8398 33.9039 46.5792 35.2312L39.9696 34.67C41.9738 32.9063 42.152 35.1332 41.083 26.3768C40.602 22.4574 39.3906 11.0019 38.1969 7.79503C36.2728 2.62848 34.4467 0.704387 30.5629 2.43251C27.2135 3.92012 28.9862 13.9414 29.4939 16.8098C29.9571 19.402 30.7856 22.4039 31.5427 25.1208L34.0013 33.8238C34.3754 34.6611 34.8119 34.2603 35.774 35.1421C33.4134 36.1933 31.0973 36.3269 28.8347 37.1731C28.8169 35.8904 29.6365 36.1487 30.3045 35.1154C28.4517 30.51 20.5415 8.29387 15.0009 10.7524C2.31609 16.3822 24.8975 35.7122 24.4165 49.3056C31.9347 45.8048 38.1078 49.4927 42.2678 54.9532C39.542 54.971 36.3708 48.3792 28.2736 49.9559C25.8417 50.428 24.5501 51.4257 22.3142 52.2096C19.7398 50.9357 16.5776 46.8203 12.088 45.3951C10.44 44.8695 -0.391898 43.8985 2.18247 49.7065C3.58991 52.8777 8.96134 54.6681 11.3576 56.1112C15.179 58.4094 17.0497 60.4048 20.2743 63.7898C34.028 78.2294 44.9669 67.54 47.6036 67.8339C47.3898 68.4842 46.9711 69.0721 46.3743 69.5977L46.5703 69.5888H46.5881ZM53.6698 46.5798L43.31 44.914C37.5644 44.3617 35.6938 45.1724 33.7608 45.1545C32.291 45.1456 33.1907 45.3951 32.5048 44.6379C34.0102 42.9454 41.6531 43.1948 43.693 43.2839C47.2295 43.4353 50.9708 44.2994 53.6698 46.5798Z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                ></path>
              </svg>
              )}
              {deliveryConfirmed && (
                <Image src={thumbsUp} className="h-[4rem] w-[4rem] mt-[-1.5rem] absolute object-cover overflow-visible" alt="Shreeji Investments Ltd" />
              )}
            </div>
            <div className="card-title">
              {!deliveryConfirmed && (<span>How can we assist you today?</span>)}
              {deliveryConfirmed && (<span className="mt-2">We'll be in touch soon!</span>)}
            </div>
            <div className="paragraph">
              <span>
                We&apos;re committed to finding the right solution for you.
                Let&apos;s start with your contact details.
              </span>
            </div>
          </div>
        </div>
      </div>

      {displayForm && (
        <div className="contact-card-container contact-card-form max-w-md mx-auto p-6 rounded-lg shadow-lg overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              initial={{ x: direction > 0 ? 100 : -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction > 0 ? -100 : 100, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <form id="quick-contact" ref={form} onSubmit={handleSubmit}>
              <h2 className="text-xl font-bold mb-4">{steps[currentStep].title}</h2>
              {steps[currentStep].options ? (
                <select className={`w-full p-2 border rounded bg-transparent focus:outline-none ${!fieldValidated && 'border-transparent shadow-[0_0_2px_4px_red]'}`} onChange={handleChange} value={formData[steps[currentStep].field] || ""}>
                  <option value="" disabled>Select an option</option>
                  {steps[currentStep].options.map((option) => (
                    <option key={option} value={option} className="text-[var(--shreeji-primary)] cursor-pointer">{option}</option>
                  ))}
                </select>
              ) : (
                <input
                  type={`${currentStep == 2 ? 'email' : 'text'}`}
                  placeholder={steps[currentStep].placeholder}
                  className="w-full p-2 border rounded text-[var(--shreeji-primary)] focus:outline-none"
                  onChange={handleChange}
                  required
                  value={formData[steps[currentStep].field] || ""} />
              )}
              </form>
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-between mt-4">
            {currentStep >= 0 && <button className="px-4 py-2 bg-[#171717b2] rounded" onClick={handleBack}>Back</button>}
            {currentStep < steps.length - 1 ? (
              <button className="px-4 py-2 bg-white text-[var(--shreeji-primary)] rounded" onClick={handleNext} type="submit" form="quick-contact">Next</button>
            ) : (
              <button className={`px-4 py-2 ${!submitted ? 'bg-green-500' : 'bg-gray-500'} text-white rounded`} onClick={() => {handleSubmit()}} type="submit" form="quick-contact">Submit</button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ContactCard;
