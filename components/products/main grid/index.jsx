import React from 'react'
import {getProductByName, randomProduct} from '@/app/data/productsData'
import Featured from './featured'
import LatestProductsByCategory from './latest products category'
import PromotionBanner from './promotion banner'
import PrimaryPromotionalBanner from './primary promotional banner'
import LatestProductsBySubCategory from './latest products subcategory'
import Link from 'next/link'



const MainGrid = () => {
  let heroProductImage1 = randomProduct();
  let heroProductImage2 = randomProduct();
  let product = getProductByName('HP Proliant ML110 Desktop Server')
  return (
    <section className="main-grid relative flex flex-col gap-5">
      <div className="md:hidden bg-[var(--shreeji-primary)] text-xl font-medium mt-1 p-5 [text-shadow:2px_2px_4px_rgba(0,0,0,0.3)] px-10">
        <Link
          href="/products"
          className="font-medium text-white cursor-pointer"
        >
          All Products
        </Link>
      </div>
      <PrimaryPromotionalBanner promoProduct={heroProductImage1} />

      <LatestProductsByCategory category="Computers" count={5} heading="Latest Computers" />

      <PromotionBanner promoProduct={heroProductImage2} />

      <LatestProductsBySubCategory subcategory="Routers" count={5} heading="Latest Routers" />

      {/* <LatestProducts2 products={allProducts} heading={'Latest Scanners'} /> */}

      <Featured category="Computers" count={15} />

    </section>
  )
}

export default MainGrid