'use client'

import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Triangle } from "lucide-react";

const LatestProducts2 = ({products, heading}) => {
  let allProducts = products;
  console.log(allProducts)
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
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-[var(--shreeji-primary)] h-fit relative flex flex-col ">
      <div className='py-5 mt-5 mx-5 border-b flex justify-between'>
        <h2 className="text-5xl font-bold [text-shadow:2px_2px_4px_rgba(0,0,0,0.3)] px-10">{heading}</h2>
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
      <div ref={scrollRef} className='flex overflow-x-auto overflow-visible scroll-container mt-10'>
        {latestProducts.map((product, index) => (
          <div key={index} className="mr-2 px-5 flex gap-5 items-center py-4 cursor-pointer min-w-[30rem]">
            <Image src={product.image} alt={product.name} className="h-auto w-[20rem] object-cover" />
          </div>
        ))}
      </div>
    </div> 
  )
}

export default LatestProducts2