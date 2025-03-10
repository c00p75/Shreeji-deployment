import React from 'react'
import HPEnvyx36014fa0008na from "@/public/products/HP Envy x360 14-fa0008na.png";
import Image from 'next/image';
import Link from 'next/link';

const PromotionBanner = ({promoProduct}) => {
  
  return (
    <div className='bg-[var(--shreeji-primary)] py-10 flex items-center gap-10 px-10'>
      <Image src={promoProduct.image} alt={promoProduct.name} className="h-auto w-[40%] object-cover" />
      <div className='flex-1 w-[60%] flex flex-col gap-3'>
        <h2 className="text-4xl font-extralight [text-shadow:2px_2px_4px_rgba(0,0,0,0.3)]">{promoProduct['tagline']}</h2>
        <h2 className="text-4xl font-bold [text-shadow:2px_2px_4px_rgba(0,0,0,0.3)]">{promoProduct['description']}</h2>
        <Link 
          href={`/products/${encodeURIComponent(promoProduct.category)}/${encodeURIComponent(promoProduct.name)}`}
          className="border-4 border-white py-1 px-5 rounded-full uppercase cursor-pointer w-fit mt-3"
        >
          Shop Now
        </Link>
      </div>
    </div>
  )
}

export default PromotionBanner;