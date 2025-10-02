"use client"

import Image from 'next/image';
import Link from 'next/link';
import { getPrintingProductBySlug, getRelatedPrintingProducts } from '@/data/printingProducts';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import emailjs from '@emailjs/browser';
import { emailJsVariables, salesTeamEmail } from '@/utils/email-handler';
import RequestQuoteModal from '@/components/products/request quote';
import './style.scss';
export default function PrintingProductDetails() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const product = getPrintingProductBySlug(slug);
  const images = product?.images || (product?.image ? [product.image] : []);
  const related = getRelatedPrintingProducts(slug, 3);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || null);
  const [fulfilment, setFulfilment] = useState('withPrint');
  const options = product?.options || { withPrint: [], systemOnly: [], printOnly: [] };
  const [quantity, setQuantity] = useState(1);
  const [openQuote, setOpenQuote] = useState(false);
  const formRef = useRef(null);
  const [submited, setSubmited] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitionFailed, setSubmitionFailed] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    email_2: salesTeamEmail,
    phone: '',
    company: '',
    size: selectedSize || '',
    option: fulfilment,
    quantity: 1,
    message: '',
    productName: product?.name || '',
    productId: ''
  });

  useEffect(() => {
    setFormData((d) => ({ ...d, size: selectedSize || '', option: fulfilment, quantity }));
  }, [selectedSize, fulfilment, quantity]);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const body = document.querySelector('body');
    const nav = document.querySelector('#website-navigation');
    const footer = document.querySelector('.footer-section');
    const contactCard = document.querySelector('.contact-card-container');
    if (openQuote) {
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
      if (footer) footer.style.zIndex = '2';
      if (contactCard) contactCard.style.zIndex = '5';
      if (body) body.classList.remove('overflow-hidden');
      if (nav) nav.style.zIndex = '10';
    };
  }, [openQuote]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const sendEmail = async () => {
    const emailParams = {
      name: formData.fullName || 'not provided',
      email: formData.email,
      email_2: formData.email_2,
      phone: formData.phone || 'not provided',
      company: formData.company || 'not provided',
      quantity: formData.quantity || 'not provided',
      size: formData.size || 'not provided',
      option: formData.option || 'not provided',
      message: formData.message || 'not provided',
      productName: formData.productName,
      productId: formData.productId || 'N/A'
    };

    await emailjs
      .send(emailJsVariables.ballo_service_id, emailJsVariables.quote_request_template_id, emailParams, {
        publicKey: emailJsVariables.ballo_public_key,
      })
      .then(async () => {
        await emailjs.send(
          emailJsVariables.shreeji_service_id,
          emailJsVariables.request_recieved_template_id,
          emailParams,
          { publicKey: emailJsVariables.shreeji_public_key }
        );
        setSubmited(true);
        setSubmitting(false);
      }, (error) => {
        setSubmitting(false);
        setSubmitionFailed(true);
        console.log('FAILED...', error?.text);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!submitting && product?.name) {
      setSubmitting(true);
      sendEmail();
    }
  };

  if (!product) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-semibold text-[#807045]">Product not found</h1>
        <p className="mt-2 text-gray-600">The item you’re looking for doesn’t exist.</p>
        <Link href="/services/enterprise-printing-and-scanning/printing" className="inline-block mt-6 px-5 py-2 bg-[#807045] text-white rounded-lg">Back to Printing</Link>
      </div>
    );
  }

  return (
    <div className="text-gray-800 print-details">
      <div className="mx-auto pt-10">
        <div className="max-w-6xl mx-auto px-5 md:px-0">
        <nav className="mb-6 mt-12">
          <div className="inline-flex items-center gap-3 bg-[#807045] text-white rounded-2xl px-5 py-3 shadow w-full">
            <Link href="/services/enterprise-printing-and-scanning/printing" className="hover:underline">Printing</Link>
            <span className="opacity-80">›</span>
            <span className="font-medium">{product.name}</span>
          </div>
        </nav>

        <h1 className="text-3xl md:text-4xl font-semibold text-[#807045] mb-6">{product.name}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="relative w-full aspect-[4/5] bg-gray-50 rounded-lg overflow-hidden">
              {images[activeIndex] && (
                <Image src={images[activeIndex]} alt={product.name} fill className="object-contain p-6" />
              )}
            </div>
            {images.length > 1 && (
              <div className="mt-3 grid grid-cols-4 sm:grid-cols-6 gap-3">
                {images.map((src, idx) => (
                  <button
                    key={`${src}-${idx}`}
                    onClick={() => setActiveIndex(idx)}
                    className={`relative aspect-square rounded-md overflow-hidden border ${idx === activeIndex ? 'border-[#807045]' : 'border-transparent'}`}
                    aria-label={`View image ${idx + 1}`}
                  >
                    <Image src={src} alt={`${product.name} ${idx + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
          <div className="mt-12">
            <h2 className="text-xl font-semibold text-[#807045] mb-3">Description</h2>
            <p className="text-gray-700">{product.description}</p>
          </div>

            {product.price && (
              <p className="text-xl font-semibold text-[#807045] mb-6">{product.price}</p>
            )}

            <h2 className="text-xl font-semibold text-[#807045] mt-6 mb-3">Request a Quote</h2>
    
            {/* Size chips */}
            {product?.sizes?.length > 0 && (
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedSize(s)}
                      className={`px-3 py-1.5 rounded-full border text-sm ${selectedSize === s ? 'bg-[#807045] text-white border-[#807045]' : 'bg-white text-gray-700 border-gray-300 hover:border-[#807045]'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Fulfilment segmented control */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Select option</label>
              <div className="inline-flex rounded-lg overflow-hidden border border-gray-300">
                {[
                  { key: 'withPrint', label: 'System with Print' },
                  { key: 'systemOnly', label: 'System Only' },
                  { key: 'printOnly', label: 'Print Only' },
                ].map(({ key, label }) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setFulfilment(key)}
                    className={`px-4 py-2 text-sm ${fulfilment === key ? 'bg-[#807045] text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Fulfilment option chips */}
            <div className="mt-4">
              <div className="flex flex-wrap gap-2">
                {(options[fulfilment] || []).map((opt, i) => (
                  <span key={`${fulfilment}-${typeof opt === 'string' ? opt : i}`} className="px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 text-sm border border-gray-200">
                    {opt}
                  </span>
                ))}
              </div>
            </div>

            {/* Quantity selector */}
            <div className="mt-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
              <div className="inline-flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 text-lg hover:bg-gray-50"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
                  className="w-16 text-center py-2 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-2 text-lg hover:bg-gray-50"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            <button onClick={() => setOpenQuote(true)} className="mt-6 px-5 py-2 bg-[#807045] text-white rounded-lg">Request Quote</button>
          </div>
        </div>
        </div>

        {openQuote && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-[0.93]" onClick={() => setOpenQuote(false)}>
            <div className={`bg-white rounded-xl shadow-2xl w-[95%] md:w-[85%] h-[95%] md:h-[85%] flex flex-col md:flex-row relative overflow-auto`} onClick={(e) => e.stopPropagation()}>
              <div className='quote-image-bg flex-1 h-full px-16 flex-center py-20 md:py-0 relative '>
                <div className='w-[80%]'>
                  {images?.length > 0 && (
                    <img src={images[0]} alt={product.name} className='w-full h-auto object-contain' />
                  )}
                </div>
              </div>
              <div className='md:overflow-auto flex-1 p-8'>
                <h2 className="text-3xl font-semibold text-center mb-6">Request a Quote for <span className="font-bold bg-gradient-to-r from-[#807045] to-[#544829] bg-clip-text text-transparent">{product.name}</span></h2>
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input name="fullName" type="text" value={formData.fullName} onChange={handleChange} required className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email Address</label>
                    <input name="email" type="email" value={formData.email} onChange={handleChange} required className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone Number</label>
                    <input name="phone" type="tel" value={formData.phone} onChange={handleChange} className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Company Name</label>
                    <input name="company" type="text" value={formData.company} onChange={handleChange} className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-sm font-medium mb-1">Selected Size</label>
                      <input name="size" type="text" value={formData.size} onChange={handleChange} className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Selected Option</label>
                      <input name="option" type="text" value={formData.option} onChange={handleChange} className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Quantity</label>
                      <input name="quantity" type="number" min={1} value={formData.quantity} onChange={handleChange} className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Message (optional)</label>
                    <textarea name="message" rows={4} value={formData.message} onChange={handleChange} className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500" placeholder="Any additional details" />
                  </div>
                  <div className="flex justify-center gap-3 mt-6">
                    <button type="button" onClick={() => setOpenQuote(false)} className="px-4 py-2 bg-black/80 text-white rounded-md hover:bg-gray-600 transition">Cancel</button>
                    <button type="submit" className={`px-4 py-2  ${submitting ? 'bg-gray-600' : 'bg-[#544829] hover:bg-green-700'} text-white rounded-md transition`}>{submitionFailed ? 'Try again' : submitting ? 'Sending..' : 'Submit'}</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-14 bg-[#807045] p-10">
            <h3 className="text-lg font-semibold text-white mb-4">Related products</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((rp, i) => (
                <a key={`${rp.name}-${i}`} href={`/services/enterprise-printing-and-scanning/printing/${rp.name.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-')}`} className="block bg-white rounded-lg border hover:shadow-md transition overflow-hidden">
                  <div className="relative w-full aspect-[4/3]">
                    <img src={(rp.images && rp.images[0]) || rp.image} alt={rp.name} className="w-full h-full object-contain p-4" />
                  </div>
                  <div className="p-3">
                    <p className="text-md text-center font-semibold text-[#807045]">{rp.name}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


