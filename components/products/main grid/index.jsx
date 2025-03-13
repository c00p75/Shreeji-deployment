import React from 'react'
import {getProductByName, heroProduct} from '@/app/data/productsData'
import Featured from './featured'
import LatestProductsByCategory from './latest products category'
import PromotionBanner from './promotion banner'
import PrimaryPromotionalBanner from './primary promotional banner'
import LatestProductsBySubCategory from './latest products subcategory'



const MainGrid = () => {
  let heroProductImage = heroProduct();
  let product = getProductByName('HP Proliant ML110 Desktop Server')
  return (
    <section className="main-grid relative flex flex-col gap-5">
        <PrimaryPromotionalBanner promoProduct={product} />

        <LatestProductsByCategory category="Computers" count={5} heading="Latest Computers" />

        <PromotionBanner promoProduct={heroProductImage} />

        <LatestProductsBySubCategory subcategory="Routers" count={5} heading="Latest Routers" />

        {/* <LatestProducts2 products={allProducts} heading={'Latest Scanners'} /> */}

        <Featured category="Computers" count={15} />

        
      </section>
  )
}

export default MainGrid