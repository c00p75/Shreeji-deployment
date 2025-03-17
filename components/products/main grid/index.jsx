import React from 'react'
import {getProductByName, randomProduct} from '@/app/data/productsData'
import Featured from './featured'
import LatestProductsByCategory from './latest products category'
import PromotionBanner from './promotion banner'
import PrimaryPromotionalBanner from './primary promotional banner'
import LatestProductsBySubCategory from './latest products subcategory'



const MainGrid = () => {
  let heroProductImage1 = randomProduct();
  let heroProductImage2 = randomProduct();
  let product = getProductByName('HP Proliant ML110 Desktop Server')
  return (
    <section className="main-grid relative flex flex-col gap-5">
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