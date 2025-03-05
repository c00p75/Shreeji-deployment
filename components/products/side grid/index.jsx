import React from 'react'
import Categories from './categories'
import HotDeals from './hot deals'
import SpecialDeals from './special deals'

const SideGrid = ({allProducts}) => {
  return (
    <section className="flex-[1] side-grid scroll-container flex flex-col gap-5">
        <Categories categories={Object.keys(allProducts)} />        
        <HotDeals products={allProducts} heading={'Hot Deals'} />
        <SpecialDeals products={allProducts} heading={'Special Deals'} />
      </section>
  )
}

export default SideGrid