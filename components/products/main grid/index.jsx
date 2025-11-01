'use client'

import React, { useEffect, useState } from 'react'
import {getProductByName, randomProduct} from '@/app/lib/client/products'
import Featured from './featured'
import LatestProductsByCategory from './latest products category'
import PromotionBanner from './promotion banner'
import PrimaryPromotionalBanner from './primary promotional banner'
import LatestProductsBySubCategory from './latest products subcategory'
import Link from 'next/link'



const MainGrid = () => {
  const [heroProductImage1, setHeroProductImage1] = useState(null);
  const [heroProductImage2, setHeroProductImage2] = useState(null);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Get random products for banners (from any category)
        const random1 = await randomProduct('category', 'Computers', 10);
        const random2 = await randomProduct('category', 'Computers', 10);
        setHeroProductImage1(random1);
        setHeroProductImage2(random2);
        
        // Get specific product
        const specificProduct = await getProductByName('HP Proliant ML110 Desktop Server');
        setProduct(specificProduct);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);
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
      {heroProductImage1 && <PrimaryPromotionalBanner promoProduct={heroProductImage1} />}

      <LatestProductsByCategory category="Computers" count={5} heading="Latest Computers" />

      {heroProductImage2 && <PromotionBanner promoProduct={heroProductImage2} />}

      <LatestProductsBySubCategory subcategory="Routers" count={5} heading="Latest Routers" />

      {/* <LatestProducts2 products={allProducts} heading={'Latest Scanners'} /> */}

      <Featured category="Computers" count={15} />

    </section>
  )
}

export default MainGrid