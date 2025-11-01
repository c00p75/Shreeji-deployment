'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import SpecialFeaturBudge from '@/components/products/product details/special feature badge';
import './style.scss'

const ProductImage = ({images, name, product}) => {
  if (!images || images.length === 0) {
    return null;
  }
  
  const [activeImage, setActiveImage] = useState(images[0]);
  const isExternalUrl = (url) => typeof url === 'string' && url.startsWith('http');
  
  return (
    <div className='product-details-image flex flex-col'>
      <div className='relative z-[2]'>
        {images.map((img, index) => (
          <Image
            src={img}
            key={`img-${index}`}
            alt={name || 'Product image'}            
            width={800}
            height={600}
            className={`absolute w-full h-auto z-[1] mt-4 cursor-pointer transition-all duration-150 object-contain opacity-0 product-shadow ${img == activeImage && 'active-image'}`}
            unoptimized={isExternalUrl(img)}
          />
        ))}
        <Image 
          src={images[0]} 
          alt={name || 'Product image'} 
          width={800}
          height={600}
          className='w-full h-auto z-[1] relative mt-2 transition-all duration-200 opacity-0' 
          unoptimized={isExternalUrl(images[0])}
        />        
      </div>
      <div className='flex gap-7 justify-center mt-3 relative z-[3]'>
        {images.map((img, index) => (
          <Image
            src={img}
            key={`thumb-${index}`}
            alt={name || 'Product image'}            
            width={80}
            height={80}
            className={`w-20 h-20 z-[1] relative mt-4 cursor-pointer transition-all duration-100 object-contain ${img == activeImage && 'active-image-select'}`}
            onClick={() => setActiveImage(img)}
            unoptimized={isExternalUrl(img)}
          />
        ))}
      </div>
    </div>
  )
}

export default ProductImage