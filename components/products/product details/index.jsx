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
import { ToastWithProgress } from '@/app/components/ToastWithProgress';
import ProductVariantSelector from '@/app/components/products/ProductVariantSelector';

const ProductDetails = ({product, previewMode = false}) => {  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1)
  const [addingToCart, setAddingToCart] = useState(false)
  const [brandLogoError, setBrandLogoError] = useState(false)
  const [selectedVariant, setSelectedVariant] = useState(null)
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
  
  // Brand logo path mapping - maps incorrect paths to actual file paths
  const mapBrandLogoPath = (path) => {
    if (!path || typeof path !== 'string') return path;
    
    const brandLogoMap = {
      '/logos/HP.png': '/logos/HP-Logo.png',
      '/logos/Lenovo.png': '/products/brand logos/lenovo.svg',
      '/logos/Dell.png': '/products/brand logos/dell.png',
      '/logos/Asus.png': '/products/brand logos/Asus.png',
      '/logos/APC.png': '/products/brand logos/APC.svg',
      '/logos/LG.png': '/products/brand logos/LG.png',
      '/logos/Huawei.png': '/products/brand logos/huawei.png',
      '/logos/XPG.png': '/products/brand logos/xpg-logo.svg',
      '/logos/TPLink.png': '/products/brand logos/tp-link.png',
    };
    
    // Return mapped path if exists, otherwise return original
    return brandLogoMap[path] || path;
  };
  
  // Helper to normalize brand logo URL - handles both object and string formats
  const getBrandLogoUrl = () => {
    const brandLogo = product['brand logo'];
    if (!brandLogo) return null;
    
    // If it's an object with url property (Strapi format)
    if (typeof brandLogo === 'object' && brandLogo !== null) {
      const url = brandLogo.url || brandLogo.logoUrl || null;
      return url ? mapBrandLogoPath(url) : null;
    }
    
    // If it's a string, map it to correct path
    if (typeof brandLogo === 'string' && brandLogo.trim()) {
      return mapBrandLogoPath(brandLogo);
    }
    
    return null;
  };
  
  const brandLogoUrl = getBrandLogoUrl();
  
  // Helper function to format price with currency prefix
  const formatPrice = (price) => {
    if (!price) return null;
    
    // If price is already a string with "K" prefix, return as is
    if (typeof price === 'string' && price.trim().startsWith('K')) {
      return price;
    }
    
    // If price is a number, format it with "K" prefix
    if (typeof price === 'number') {
      return `K ${price.toLocaleString()}`;
    }
    
    // If price is a string without "K", try to extract number and format
    if (typeof price === 'string') {
      const numericValue = parseFloat(price.replace(/[^0-9.]/g, ''));
      if (!isNaN(numericValue)) {
        return `K ${numericValue.toLocaleString()}`;
      }
    }
    
    return price; // Fallback to original value
  };
  
  return (
    <div className="pl-5 md:pl-10 pr-5 text-black h-full pt-5 product-details pb-[2rem]">
      {brandLogoUrl && !brandLogoError && (
        <div className='w-full h-fit flex-center mb-5'>
          <Image 
            src={brandLogoUrl} 
            quality={100} 
            alt={product['name'] || 'Brand logo'} 
            width={150}
            height={64}
            className='w-auto h-16 z-[1] object-contain' 
            unoptimized={typeof brandLogoUrl === 'string' && brandLogoUrl.startsWith('http')}
            onError={() => {
              console.warn('Brand logo image failed to load:', brandLogoUrl);
              setBrandLogoError(true);
            }}
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
        <div className='flex-1 mt-10 sticky top-[250px]'>
          {product['images'] && (
            <ProductImage images={product['images']} name={product.name} product={product} />
          )}      
        </div>
          
        <div className='product-specs mt-10 md:mt-0 flex-1 md:p-10 pr-0'>  
            {/* Price Display */}
            {(product?.price || product?.['discounted price']) && (
              <div className='mb-6'>
                {product?.['discounted price'] ? (
                  <div className='flex flex-col gap-2'>
                    <div className='flex items-center gap-3 flex-wrap'>
                      <span className='price-zigzag-pattern text-3xl font-bold text-white'>
                        {formatPrice(product['discounted price'])}
                      </span>
                      {product.price && (
                        <span className='text-xl text-gray-500 line-through'>
                          {formatPrice(product.price)}
                        </span>
                      )}
                    </div>
                  </div>
                ) : (
                  product.price && (
                    <div className='price-zigzag-pattern text-3xl font-bold text-white'>
                      {formatPrice(product.price)}
                    </div>
                  )
                )}
              </div>
            )}

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
              <ul className='scroll-container text-xl flex flex-col gap-2' style={{ minHeight: 'fit-content' }}>                          
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

          <div>
            {/* Recommendations */}
          
            {/* Product Variants Selector */}
            {product?.id && (
              <div className='mb-6'>
                <ProductVariantSelector
                  productId={product.id}
                  productPrice={product.price ? parseFloat(product.price.toString().replace(/[^0-9.]/g, '')) : 0}
                  productDiscountedPrice={product['discounted price'] ? parseFloat(product['discounted price'].toString().replace(/[^0-9.]/g, '')) : undefined}
                  onVariantSelect={setSelectedVariant}
                />
              </div>
            )}
            
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
                  if (previewMode) return;
                  const productIdentifier = product?.documentId ?? product?.id
                  if (!productIdentifier) {
                    toast.error('Product identifier is missing')
                    return
                  }
                  setAddingToCart(true)
                  try {
                    // If variant is selected, we need to pass variant info
                    // For now, add the base product - variant handling in cart will be added later
                    await addItem(productIdentifier, quantity, selectedVariant?.id)
                    toast.success((t) => (
                      <ToastWithProgress t={t} duration={8000} />
                    ), {
                      duration: 8000,
                      position: 'top-center',
                      className: 'animation-toast',
                      icon: null,
                      style: {
                        background: '#fff',
                        color: '#000',
                        padding: '20px',
                        paddingBottom: '0',
                        borderRadius: '16px',
                        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
                        fontSize: '16px',
                        minWidth: '320px',
                        maxWidth: '400px',
                        position: 'relative',
                        overflow: 'hidden',
                      },
                    })
                  } catch (err) {
                    console.error('Add to cart error:', err)
                    toast.error(err instanceof Error ? err.message : 'Unable to add to cart. Please check if the backend is running.')
                  } finally {
                    setAddingToCart(false)
                  }
                }}
                className='w-fit rounded-2xl bg-[var(--shreeji-primary)] px-6 py-3 text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70'
                disabled={previewMode || addingToCart || !(product?.documentId || product?.id)}
                style={previewMode ? { cursor: 'not-allowed', opacity: 0.6 } : {}}
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