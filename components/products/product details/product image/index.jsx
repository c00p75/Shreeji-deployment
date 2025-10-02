'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import SpecialFeaturBudge from '@/components/products/product details/special feature badge';
import './style.scss'

const ProductImage = ({images, name, product}) => {
  const [activeImage, setActiveImage] = useState(images[0]);
  return (
    <div className='product-details-image flex flex-col'>
      <div className='relative z-[2]'>
        {images.map((img, index) => (
          <Image
            src={img}
            key={`img-${index}`}
            alt={name}            
            className={`absolute w-full h-auto z-[1] mt-4 cursor-pointer transition-all duration-150 object-contain opacity-0 product-shadow ${img == activeImage && 'active-image'}`}
          />
        ))}
        <Image src={images[0]} alt={name} className='w-full h-auto z-[1] relative mt-2 transition-all duration-200 opacity-0' />        
      </div>
      <div className='flex gap-7 justify-center mt-3 relative z-[3]'>
        {images.map((img, index) => (
          <Image
            src={img}
            key={`thumb-${index}`}
            alt={name}            
            className={`w-20 h-20 z-[1] relative mt-4 cursor-pointer transition-all duration-100 object-contain ${img == activeImage && 'active-image-select'}`}
            onClick={() => setActiveImage(img)}
          />
        ))}
      </div>
    </div>
  )
}

export default ProductImage