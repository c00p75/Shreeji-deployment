import React from 'react'
import HPEnvyx36014fa0008na from "@/public/products/HP Envy x360 14-fa0008na.png";
import Image from 'next/image';

const PromotionBanner1 = () => {
  const promoProduct = {
    'name': 'HP Envy',
    'image': HPEnvyx36014fa0008na,
    'tag line 1': 'Style Meets Performance',
    'tag line 2': 'The Ultimate HP Spectre Laptop'
  }
  return (
    <div className='bg-[var(--shreeji-primary)] py-10 flex items-center gap-10 px-10'>
      <Image src={promoProduct.image} alt={promoProduct.name} className="h-auto w-[40%] object-cover" />
      <div className='flex-1 w-[60%] flex flex-col gap-3'>
        <h2 className="text-4xl font-extralight [text-shadow:2px_2px_4px_rgba(0,0,0,0.3)]">{promoProduct['tag line 1']}</h2>
        <h2 className="text-4xl font-bold [text-shadow:2px_2px_4px_rgba(0,0,0,0.3)]">{promoProduct['tag line 2']}</h2>
        <span className="border-4 border-white py-1 px-5 rounded-full uppercase cursor-pointer w-fit mt-3">
          Shop Now
        </span>
      </div>
    </div>
  )
}

export default PromotionBanner1