import React from 'react'
import Categories from './categories'
import HotDeals from './hot deals'

const SideGrid = () => {
  return (
    <section className="flex-[2] side-grid scroll-container hidden md:flex flex-col gap-5">
      <Categories />        
    </section>
  )
}

export default SideGrid