'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import './style.scss';
import { getRecentProductsByCategory } from '@/app/data/productsData';

const Featured = ({category, count}) => {
  const [slides, setSlides] = useState([]);
  const scrollRef = useRef(null);
  const featuredProducts = getRecentProductsByCategory(category, count)
  
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

  return (
    <div className="featured-section bg-[var(--shreeji-primary)] h-fit relative flex flex-col">
      <div className="py-5 mt-5 mx-5 border-b flex justify-between">
        <h2 className="text-5xl font-bold px-10">Featured</h2>
        <div className="flex gap-5 text-black">
          <button onClick={() => scroll('left')} className="z-10 bg-white shadow-lg rounded-full p-3 h-10 w-10 flex-center">
            <ChevronLeft strokeWidth={3} className="w-6 h-6" />
          </button>
          <button onClick={() => scroll('right')} className="z-10 bg-white shadow-lg rounded-full p-3 h-10 w-10 flex-center">
            <ChevronRight strokeWidth={3} className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Scrollable Container */}
      <div ref={scrollRef} className="scroll-container overflow-hidden relative">
        <div className="flex w-full">
          {slides.map((slide, index) => (
            <div key={index} className="slide min-w-full grid grid-cols-3 grid-rows-2 gap-5 p-5">
              {slide.map((product, idx) => (
                <Link
                  key={idx}
                  href={
                    product["subcategory"]
                      ? `/products/${encodeURIComponent(product.category)}/${encodeURIComponent(product["subcategory"])}/${encodeURIComponent(product.name)}`
                      : `/products/${encodeURIComponent(product.category)}/${encodeURIComponent(product.name)}`
                  }
                >
                  <div className="product-item p-4 rounded-lg cursor-pointer">
                    <Image src={product.image} alt={product.name} width={200} height={200} className="w-full h-auto object-cover" />
                    <p className="text-center mt-2">{product.name}</p>
                  </div>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Featured;
