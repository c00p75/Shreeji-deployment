import React from 'react'
import Categories from './categories'
import HotDeals from './hot deals'

const SideGrid = () => {
  return (
    <section className="flex-[2] side-grid scroll-container flex flex-col gap-5">
        <Categories />        
        {/* <HotDeals products={allProducts} heading={'Hot Deals'} /> */}
      </section>
  )
}

export default SideGrid