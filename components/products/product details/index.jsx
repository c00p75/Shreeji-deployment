'use client'

import Image from 'next/image'
import './style.scss'
import { ArrowRightCircle } from 'lucide-react'
import Link from 'next/link';
import ProductImage from './product image';
import SpecialFeaturBudge from './special feature badge';
import RequestQuoteModal from '../request quote';
import { useState } from 'react';
import { useCart } from '@/app/contexts/CartContext';
import toast from 'react-hot-toast';
import QuantityInput from '../QuantityInput';

const ProductDetails = ({product}) => {  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1)
  const [addingToCart, setAddingToCart] = useState(false)
  const { addItem } = useCart()
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <p className="text-3xl font-semibold text-gray-800">Product Currently Unavailable</p>
        <p className="text-lg text-gray-600 mt-2">
          Sorry, this product is out of stock or no longer available.
        </p>
        
        <Link
          href="/products"
          className="mt-5 px-6 py-3 bg-[var(--shreeji-primary)] text-white font-medium rounded-lg hover:scale-105 transition"
        >
          View More Products
        </Link>
      </div>
    );
  } 
  
  return (
    <div className="pl-5 md:pl-10 pr-5 text-black h-full pt-5 product-details">
      {product['brand logo'] && (
        <div className='w-full h-fit flex-center mb-5'>
          <Image 
            src={product['brand logo']} 
            quality={100} 
            alt={product['name']} 
            width={150}
            height={64}
            className='w-auto h-16 z-[1] object-cover' 
            unoptimized={typeof product['brand logo'] === 'string' && product['brand logo'].startsWith('http')}
          />
        </div>
      )}
      {product['name'] && <h1 className="text-6xl font-bold text-center pb-5 bg-gradient-to-r from-[#807045] to-[#544829] bg-clip-text text-transparent">{product['name']}</h1>}
      {product['description'] && (
        <div className='relative'>
          <p className="text-2xl text-[#544829] text-center relative z-[2]">{product['description']}</p>
          <SpecialFeaturBudge product={product} />
        </div>
      )}
      
      <div className={`flex justify-center items-start flex-col md:flex-row ${ product['special feature'] ? 'mt-14' : ''}`}>
        <div className='flex-1 relative mt-10'>
          {product['images'] && (
            <ProductImage images={product['images']} name={product.name} product={product} />
          )}      
        </div>

        <div className='product-specs mt-10 md:mt-0 flex-1 md:p-10 pr-0'>    
          {product['tagline'] && (
            <h1 className="text-3xl text-center md:text-start mb-6 font-bold bg-gradient-to-r from-[#807045] to-[#544829] bg-clip-text text-transparent relative">
              {product['tagline']}
            </h1>
          )}            
          {product['specs'] && (
            <div className='relative'>
              <div className='fadeUp fadeUp1' />
              <div className='fadeUp fadeUp2' />
              <div className='fadeUp fadeUp3' />
              <div className='fadeUp fadeUp4' />
              <div className='fadeUp fadeUp5' />
              <div className='fadeDown fadeDown1' />
              <div className='fadeDown fadeDown2' />
              <div className='fadeDown fadeDown3' />
              <div className='fadeDown fadeDown4' />
              <div className='fadeDown fadeDown5' />
              <ul className='scroll-container text-xl flex flex-col gap-2'>                          
                {Object.entries(product.specs).map(([key, value]) => (
                  <li key={key}>
                    <strong className='text-[#544829] capitalize'>{key.replace(/-/g, ' ')}:</strong>{" "}              
                    {typeof value === "object" && !Array.isArray(value) ? (
                      // Handle nested objects
                      Object.entries(value).map(([subKey, subValue]) => (
                        <div className='ml-10' key={subKey}>
                          <strong className='text-[#544829] capitalize'>{subKey.replace(/-/g, ' ')}:</strong> {subValue}
                        </div>
                      ))
                    ) : Array.isArray(value) ? (
                      // Handle arrays
                      <ul className='ml-10 list-disc'>
                        {value.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      // Handle regular values
                      value
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className='mt-10'>
            {/* <p className='text-xl font-semibold text-[#544829]'>Ready to purchase?</p>
            <p className='text-sm text-gray-500 mb-4'>Add this product to your cart and complete checkout when you&apos;re ready.</p> */}
            <div className='flex flex-col gap-3 md:flex-row md:items-center'>
              <QuantityInput
                value={quantity}
                onChange={setQuantity}
                min={1}
                className="w-auto"
              />
              
              <button
                type='button'
                onClick={async () => {
                  const productIdentifier = product?.documentId ?? product?.id
                  if (!productIdentifier) {
                    toast.error('Product identifier is missing')
                    return
                  }
                  setAddingToCart(true)
                  try {
                    await addItem(productIdentifier, quantity)
                    toast.success((t) => (
                      <div className="flex flex-col items-center gap-3">
                        <span>Added to cart!</span>
                        <Link
                          href="/checkout"
                          onClick={() => toast.dismiss(t.id)}
                          className="px-4 py-2 bg-[var(--shreeji-primary)] text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                        >
                          Proceed to Checkout
                        </Link>
                      </div>
                    ), {
                      duration: 5000,
                    })
                  } catch (err) {
                    console.error('Add to cart error:', err)
                    toast.error(err instanceof Error ? err.message : 'Unable to add to cart. Please check if the backend is running.')
                  } finally {
                    setAddingToCart(false)
                  }
                }}
                className='w-fit rounded-2xl bg-[var(--shreeji-primary)] px-6 py-3 text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70'
                disabled={addingToCart || !(product?.documentId || product?.id)}
              >
                {addingToCart ? 'Adding...' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <div className='bg-[var(--shreeji-primary)] px-10 py-3 mt-16 text-white md:text-2xl font-semibold flex justify-between items-center rounded-full border-t-[#e8d9c2] border-4'>
        <p className='hidden md:flex flex-1 text-base'>
          Shreeji House, Plot No. 1209,
          <br />
          Addis Ababa Drive
        </p>
        
        <div className='flex-1 flex justify-center items-center gap-2 text-center uppercase cursor-pointer'>
          <button onClick={handleOpenModal}>Request Quote</button>
          <ArrowRightCircle size={30} strokeWidth={2.5} />
        </div>

        <p className='hidden md:flex flex-1 text-right'>
          +260 77 116 1111
        </p>
      </div> */}

      <RequestQuoteModal 
        product={product}
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </div>
  )
}

export default ProductDetails