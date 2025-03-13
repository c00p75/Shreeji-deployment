import { filterProducts } from '@/app/data/productsData'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const CategoryPromotionalBanner = ({category, subcategory}) => {
  let promoProduct;
  if(subcategory) {
    promoProduct = filterProducts('subcategory', subcategory, 1)[0]
  } else if (category) {
    promoProduct = filterProducts('category', category, 1)[0]
  };

  return (
    <div className="bg-[var(--shreeji-primary)] h-fit relative">
      
      <div className="flex flex-col w-[60%] justify-center items-center gap-10 py-24 px-10 text-center z-[1] relative">
        {promoProduct['tagline'] && (<h2 className="text-4xl font-extralight [text-shadow:2px_2px_4px_rgba(0,0,0,0.3)]">{promoProduct['tagline']}</h2>)}
        {promoProduct['description'] && ( <h2 className="text-4xl font-bold [text-shadow:2px_2px_4px_rgba(0,0,0,0.3)]">{promoProduct['description']}</h2>)}
        <Link 
          href={
            promoProduct["subcategory"]
              ? `/products/${encodeURIComponent(promoProduct.category)}/${encodeURIComponent(promoProduct["subcategory"])}/${encodeURIComponent(promoProduct.name)}`
              : `/products/${encodeURIComponent(promoProduct.category)}/${encodeURIComponent(promoProduct.name)}`
          }
          className="border-4 border-white py-1 px-5 rounded-full uppercase cursor-pointer"
        >
          Shop Now
        </Link>
      </div>

      <Image src={promoProduct.image} alt={promoProduct.name} className="z-0 h-[52%] w-auto absolute top-[45%] -right-[15%] -translate-x-1/2 -translate-y-1/2" />

      <div className="bg-[#605432] flex justify-around text-center rounded-2xl py-5 px-5">
        <div>
          <h3 className="text-2xl">Money Back</h3>
          <p className="text-base font-extralight">30 Days Money Back Guarantee</p>
        </div>

        <div>
          <h3 className="text-2xl">Free Delivery</h3>
          <p className="text-base font-extralight">Delivery on orders</p>
        </div>

        <div>
          <h3 className="text-2xl">Special Sale</h3>
          <p className="text-base font-extralight">Discounts on selected items</p>
        </div>
      </div>
    </div>
  )
}

export default CategoryPromotionalBanner