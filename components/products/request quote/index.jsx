'use state'
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import ProductImage from '../product details/product image';
import "./style.scss";
import { X } from 'lucide-react';
import checkmark from "@/public/elements/checkmark.png";
import Image from "next/image";

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

const RequestQuoteModal = ({ product, isOpen, onClose }) => {
  const [submited, setSubmited] = useState(false)
  const body = document.querySelector('body')
  const nav = document.querySelector('#website-navigation')
  const footer = document.querySelector('.footer-section')
  const contactCard = document.querySelector('.contact-card-container')
  
  if(isOpen) {    
    if (footer) { footer.style.zIndex = '0' }

    if (contactCard) { contactCard.style.zIndex = '0' }

    if (body) { body.classList.add('overflow-hidden') }

    if(nav){ nav.style.zIndex = '-1' }

  } else {
    if (footer) { footer.style.zIndex = '2' }

    if (contactCard) { contactCard.style.zIndex = '5' }

    if (body) { body.classList.remove('overflow-hidden') }

    if(nav){ nav.style.zIndex = '5'}
  }
 

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    projectType: '',
    description: '',
    quantity: '',
    deadline: '',
    budget: '',
    file: null,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setSubmited(true)
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
            </div>
            <div className='md:overflow-auto flex-1 p-8'>
              <h2 className="text-3xl font-semibold text-center mb-6">
                Request a Quote for <span className="font-bold bg-gradient-to-r from-[#807045] to-[#544829] bg-clip-text text-transparent">{product['name']}</span>
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <InputField name="name" label="Name" type="text" value={formData.name} onChange={handleChange} required />
                <InputField name="email" label="Email Address" type="email" value={formData.email} onChange={handleChange} required />
                <InputField name="phone" label="Phone Number" type="tel" value={formData.phone} onChange={handleChange} />
                <InputField name="companyName" label="Company Name" type="text" value={formData.companyName} onChange={handleChange} />

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

                <InputField name="quantity" label="Quantity / Volume" type="number" value={formData.quantity} onChange={handleChange} required />
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
                    className="px-4 py-2 bg-[#544829] text-white rounded-md hover:bg-green-700 transition"
                  >
                    Submit
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
                  <div className='flex-1 flex-center' />

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
