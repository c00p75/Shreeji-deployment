'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import './style.scss';
import { filterProducts } from '@/data/productsData';
import ProductPreview from '../../ProductPreview';

const Featured = ({category, count}) => {
  const [slides, setSlides] = useState([]);
  const scrollRef = useRef(null);
  const scrollRef2 = useRef(null);
  const featuredProducts = filterProducts('category', category, count)
  
  useEffect(() => {
    // Split products into groups of 6 (2 rows x 3 columns)
    const groupedSlides = [];
    for (let i = 0; i < featuredProducts.length; i += 6) {
      groupedSlides.push(featuredProducts.slice(i, i + 6));
    }
    setSlides(groupedSlides);

  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollRef.current.offsetWidth : scrollRef.current.offsetWidth,
        behavior: 'smooth',
      });
    }
  };

  const scroll2 = (direction) => {
    if (scrollRef2.current) {
      scrollRef2.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth", 
      });
    }
  };

  return (
    <div className="featured-section bg-[var(--shreeji-primary)] h-fit relative flex flex-col">
      <div className="py-5 mt-5 mx-5 border-b flex justify-between">
        <h2 className="text-4xl md:text-5xl font-bold md:px-10">Featured</h2>
        <div className="flex gap-5 text-black">
          <button onClick={() => {scroll('left'); scroll2("left")}} className="z-10 bg-white shadow-lg rounded-full p-3 h-10 w-10 flex-center">
            <ChevronLeft strokeWidth={3} className="w-6 h-6" />
          </button>
          <button onClick={() => {scroll('right'); scroll2("right")}} className="z-10 bg-white shadow-lg rounded-full p-3 h-10 w-10 flex-center">
            <ChevronRight strokeWidth={3} className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Scrollable Container */}
      <div ref={scrollRef} className="scroll-container overflow-hidden relative">
        <div className="hidden md:flex w-full">
          {slides.map((slide, index) => (
            <div key={index} className="slide min-w-full grid grid-cols-3 grid-rows-2 gap-10 p-5">
              {slide.map((product, index) => (
                <ProductPreview product={product} index={index} />  
              ))}
            </div>
          ))}
        </div>
      </div>

      <div ref={scrollRef2} className='flex md:hidden overflow-x-auto overflow-visible scroll-container pt-10 gap-14'>
        {featuredProducts.map((product, index) => (
          <ProductPreview product={product} index={index} additionalClass={'min-w-[20rem] first:ml-20'} />  
        ))}
      </div>
    </div>
  );
};

export default Featured;
