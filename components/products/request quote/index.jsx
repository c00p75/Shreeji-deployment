"use client"
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import ProductImage from '../product details/product image';
import "./style.scss";
import { X } from 'lucide-react';
import checkmark from "@/public/elements/checkmark.png";
import Image from "next/image";
import emailjs from '@emailjs/browser';
import { emailJsVariables, salesTeamEmail } from '@/utils/email-handler';

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

const RequestQuoteModal = ({ product, isOpen, onClose, initialValues = {} }) => {
  const form = useRef();
  const [submited, setSubmited] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitionFailed, setSubmitionFailed] = useState(false)
  let body, nav, footer, contactCard;
  useEffect(() => {
    if (typeof document === 'undefined') return;
    body = document.querySelector('body');
    nav = document.querySelector('#website-navigation');
    footer = document.querySelector('.footer-section');
    contactCard = document.querySelector('.contact-card-container');

    if (isOpen) {
      if (footer) footer.style.zIndex = '0';
      if (contactCard) contactCard.style.zIndex = '0';
      if (body) body.classList.add('overflow-hidden');
      if (nav) nav.style.zIndex = '-1';
    } else {
      if (footer) footer.style.zIndex = '2';
      if (contactCard) contactCard.style.zIndex = '5';
      if (body) body.classList.remove('overflow-hidden');
      if (nav) nav.style.zIndex = '10';
    }

    return () => {
      // Ensure cleanup on unmount
      if (footer) footer.style.zIndex = '2';
      if (contactCard) contactCard.style.zIndex = '5';
      if (body) body.classList.remove('overflow-hidden');
      if (nav) nav.style.zIndex = '10';
    };
  }, [isOpen]);
  
  if(isOpen) {    
    if (footer) { footer.style.zIndex = '0' }

    if (contactCard) { contactCard.style.zIndex = '0' }

    if (body) { body.classList.add('overflow-hidden') }

    if(nav){ nav.style.zIndex = '-1' }

  } else {
    if (footer) { footer.style.zIndex = '2' }

    if (contactCard) { contactCard.style.zIndex = '5' }

    if (body) { body.classList.remove('overflow-hidden') }

    if(nav){ nav.style.zIndex = '10'}
  }
 

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    email_2: salesTeamEmail,    // Shreeji team email
    phone: '',
    company: '',
    quantity: initialValues.quantity || '',
    size: initialValues.size || '',
    option: initialValues.option || '',
    message: initialValues.message || '',
    productName: product['name'],
    productId: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const sendEmail = async() => {
    const emailParams = {      
      name: formData.fullName || "not provided",
      email: formData.email,
      email_2: formData.email_2,
      phone: formData.phone || "not provided",
      company: formData.company || "not provided",
      quantity: formData.quantity || "not provided",
      size: formData.size || "not provided",
      option: formData.option || "not provided",
      message: formData.message || "not provided",
      productName: formData.productName,
      productId: formData.productId || "N/A",
    }


    await emailjs
      .send(emailJsVariables.ballo_service_id, emailJsVariables.quote_request_template_id, emailParams, {
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
          
          setSubmited(true); 
          setSubmitting(false)         
        },
        (error) => {
          setSubmitting(false)  
          setSubmitionFailed(true);
          console.log('FAILED...', error.text);
        },
      );      
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!submitting && product['name']){
      setSubmitting(true);
      sendEmail();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="request-quote fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-[0.93]"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={handleBackdropClick}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.3 }}
            className={`bg-white rounded-xl shadow-2xl w-[95%] md:w-[85%] h-[95%] md:h-[85%] flex flex-col md:flex-row relative ${submited ? 'overflow-hidden' : 'overflow-auto'}`}
            onClick={(e) => e.stopPropagation()}
          > 
            <div className='quote-image-bg flex-1 h-full px-16 flex-center py-20 md:py-0 relative '>
              <button
                type="button"
                onClick={() => onClose()}
                className="md:hidden absolute top-3 right-3 p-2 rounded-full bg-[whitesmoke] text-black"
              >
                <X />
              </button>
              <div className='w-[80%]'>
                {product['images'] && (
                  <ProductImage images={product['images']} name={product.name} product={product} />
                )}  
              </div> 
              {product['brand logo'] && (
                <div className='absolute inset-0 w-full h-full flex-center mb-5'>
                  <Image src={product['brand logo']} quality={100} alt={product['name']} className='w-auto h-[95%] z-[1] object-contain opacity-[0.1] drop-shadow-2xl' />
                </div>
              )}           
            </div>
            <div className='md:overflow-auto flex-1 p-8'>
              <h2 className="text-3xl font-semibold text-center mb-6">
                Request a Quote for <span className="font-bold bg-gradient-to-r from-[#807045] to-[#544829] bg-clip-text text-transparent">{product['name']}</span>
              </h2>
              <form ref={form} onSubmit={handleSubmit} className="space-y-5">
                <InputField name="fullName" label="Name" type="text" value={formData.fullName} onChange={handleChange} required />
                <InputField name="email" label="Email Address" type="email" value={formData.email} onChange={handleChange} required />
                <InputField name="phone" label="Phone Number" type="tel" value={formData.phone} onChange={handleChange} />
                <InputField name="company" label="Company Name" type="text" value={formData.company} onChange={handleChange} />

                {/* <div>
                  <label className="block text-sm font-medium mb-1">Project Type / Service Needed</label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Printing">Printing</option>
                    <option value="Software">Software</option>
                  </select>
                </div> */}

                {/* <div>
                  <label className="block text-sm font-medium mb-1">Project Description / Requirements</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                    required
                    className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe your project or requirements"
                  />
                </div> */}

                <InputField name="size" label="Selected Size" type="text" value={formData.size} onChange={handleChange} />
                <InputField name="option" label="Selected Option" type="text" value={formData.option} onChange={handleChange} />
                <InputField name="quantity" label="Quantity / Volume" type="number" value={formData.quantity} onChange={handleChange} />
                <div>
                  <label className="block text-sm font-medium mb-1">Message (optional)</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="Any additional details"
                  />
                </div>
                {/* <InputField name="deadline" label="Deadline / Timeframe" type="date" value={formData.deadline} onChange={handleChange} /> */}

                {/* <div>
                  <label className="block text-sm font-medium mb-1">Budget Range</label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Budget</option>
                    <option value="<1000">Less than $1000</option>
                    <option value="1000-5000">$1000 - $5000</option>
                    <option value="5000+">More than $5000</option>
                  </select>
                </div> */}

                {/* <div>
                  <label className="block text-sm font-medium mb-1">Upload File</label>
                  <input
                    type="file"
                    name="file"
                    onChange={(e) => setFormData({ ...formData, file: e.target.files[0] })}
                    className="w-full p-3 border rounded-md"
                  />
                </div> */}

                <div className="flex justify-center gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => onClose()}
                    className="px-4 py-2 bg-black/80 text-white rounded-md hover:bg-gray-600 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`px-4 py-2  ${submitting ? 'bg-gray-600' : 'bg-[#544829] hover:bg-green-700'} text-white rounded-md transition`}
                  >
                    {submitionFailed ? 'Try again' : submitting ? 'Sending..' : 'Submit'}
                  </button>
                </div>
              </form>
            </div>
            
            {
              submited && (
                <div
                  className="absolute z-10 top-[-100vh] md:top-0 left-0 w-full h-[200vh] md:h-full backdrop-blur-md bg-white/20 rounded-xl shadow-2xl flex items-center flex-col md:flex-row overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className='flex-1 flex-center cursor-pointer h-full' onClick={() => setSubmited(false)} />

                  <div className='flex-1 bg-green-50 h-full flex-center submited-container p-5 md:p-0 text-center'>
                    <Image
                      src={checkmark}
                      alt="Success"            
                      className='w-[50%] h-auto mt-[-10%]'
                    />
                    <p className='text-4xl md:text-8xl font-bold text-[green]'>
                      SUCCESS!
                    </p>
                    
                    <p className='my-5'>Your request has been received. We'll be in touch shortly.</p>
                    
                    <button
                      type="button"
                      onClick={() => onClose()}
                      className="px-10 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 transition"
                    >
                      Ok
                    </button>
                  </div>
                </div>
              )
            }
          </motion.div>          
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const InputField = ({ name, label, type, value, onChange, required }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium mb-1">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

export default RequestQuoteModal;
