import React from 'react'
import LatestProducts1 from './latest products 1'
import PromotionBanner1 from './promotion banner 1'
import LatestProducts2 from './latest products 2'
import Image from 'next/image'
import Featured from '../featured'

const MainGrid = ({allProducts}) => {
  return (
    <section className="main-grid flex-[3] relative flex flex-col gap-5">
        <div className="bg-[var(--shreeji-primary)] h-fit relative">
          <div className="flex flex-col w-[60%] justify-center items-center gap-10 py-24 px-10 text-center">
            <h2 className="text-5xl font-extralight [text-shadow:2px_2px_4px_rgba(0,0,0,0.3)]">Power Meets Duraility</h2>
            <h2 className="text-5xl font-extrabold [text-shadow:2px_2px_4px_rgba(0,0,0,0.2)]">Your Perfect EveryDay Laptop</h2>
            <span className="border-4 border-white py-1 px-5 rounded-full uppercase cursor-pointer">
              Shop Now
            </span>
          </div>

          <Image src={allProducts.Computers['HP Envy x360 14-fa0008na'].image} className="h-[52%] w-auto absolute top-[45%] -right-[15%] -translate-x-1/2 -translate-y-1/2" />

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

        <LatestProducts1 products={allProducts} heading={'Latest Servers'} />

        <PromotionBanner1 />

        <LatestProducts2 products={allProducts} heading={'Latest Scanners'} />

        <Featured allProducts={allProducts} />
      </section>
  )
}

export default MainGrid