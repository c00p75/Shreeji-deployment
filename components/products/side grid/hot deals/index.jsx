'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'

const HotDeals = ({products, heading}) => {
  let allProducts = products;
  const [latestProducts, setLatestProducts] = useState([])

  useEffect(() => {
    const getRecentProducts = (products) => {
      let productsArr = [];
      
      for (const category in products) {
          for (const productName in products[category]) {
              const product = products[category][productName];
              productsArr.push({
                  name: productName,
                  image: product.image,
                  price: product.price,
                  dateAdded: new Date(product['date-added'])
              });
          }
      }    
      productsArr.sort((a, b) => b.dateAdded - a.dateAdded);
      
      return productsArr.slice(0, 6);
    }
  
    setLatestProducts(getRecentProducts(allProducts));
  }, [allProducts])

  const scrollRef = useRef(null);
  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -485 : 485,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-[var(--shreeji-primary)] flex flex-col py-1 h-fit">
      <div className="py-5 border-b mx-5 flex justify-between">
        <h2 className="text-2xl font-light [text-shadow:2px_2px_4px_rgba(0,0,0,0.3)] uppercase">{heading}</h2>
        <div className="flex gap-5 text-black">
          <button
            onClick={() => scroll("left")}
            className="z-10 bg-white shadow-lg rounded-full p-2 h-8 w-8 flex-center"
          >
            
            <ChevronLeft strokeWidth={3} className="w-8 h-8" />
          </button>

          <button
            onClick={() => scroll("right")}
            className="z-10 bg-white shadow-lg rounded-full p-2 h-8 w-8 flex-center"
          >
            <ChevronRight strokeWidth={3} className="w-8 h-8" />
          </button>
        </div>
      </div>
      <div ref={scrollRef} className="flex overflow-x-auto overflow-visible scroll-container">
        {latestProducts.map((product, index) => (
          <div key={index} className="mr-2 px-5 flex gap-5 items-center py-4 cursor-pointer min-w-[30rem]">
            <Image src={product.image} alt={product.name} className="h-auto w-[20rem] object-cover" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default HotDeals