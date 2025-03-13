'use client'

import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Triangle } from "lucide-react";
import { filterProducts } from '@/app/data/productsData';
import ProductPreview from '../../ProductPreview';

const LatestProductsByCategory = ({category, count, heading}) => {
  
  let latestProducts = filterProducts('category', category, count)
  // console.log(latestProducts)

  const scrollRef = useRef(null);
  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-[var(--shreeji-primary)] h-fit relative flex flex-col ">
      <div className='py-5 mt-5 mx-5 border-b flex justify-between'>
        <h2 className="text-4xl font-bold [text-shadow:2px_2px_4px_rgba(0,0,0,0.3)] px-10">{heading}</h2>
        <div className="flex gap-5 text-black">
          <button
            onClick={() => scroll("left")}
            className="z-10 bg-white shadow-lg rounded-full p-3 h-10 w-10 flex-center"
          >            
            <ChevronLeft strokeWidth={3} className="w-6 h-6" />
          </button>

          <button
            onClick={() => scroll("right")}
            className="z-10 bg-white shadow-lg rounded-full p-3 h-10 w-10 flex-center"
          >
            <ChevronRight strokeWidth={3} className="w-6 h-6" />
          </button>
        </div>
      </div>
      <div ref={scrollRef} className='flex overflow-x-auto overflow-visible scroll-container mt-10 gap-14'>
        {latestProducts.map((product, index) => (
          <ProductPreview product={product} index={index} additionalClass={'min-w-[20rem] first:ml-20'} />            
        ))}
      </div>
    </div> 
  )
}

export default LatestProductsByCategory