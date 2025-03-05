'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import './style.scss';

const Featured = ({ allProducts }) => {
  const [latestProducts, setLatestProducts] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const itemsPerPage = 6; // Display 6 products per slide (2 rows x 3 columns)

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
            dateAdded: new Date(product['date-added']),
          });
        }
      }

      productsArr.sort((a, b) => b.dateAdded - a.dateAdded);
      return productsArr;
    };

    setLatestProducts(getRecentProducts(allProducts));
  }, [allProducts]);

  // Calculate the total number of slides needed
  const totalSlides = Math.ceil(latestProducts.length / itemsPerPage);

  const scroll = (direction) => {
    if (direction === 'left' && currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    } else if (direction === 'right' && currentSlide < totalSlides - 1) {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  return (
    <div className="featured-section bg-[var(--shreeji-primary)] h-fit relative flex flex-col">
      {/* Header */}
      <div className="py-5 mt-5 mx-5 border-b flex justify-between">
        <h2 className="text-5xl font-bold [text-shadow:2px_2px_4px_rgba(0,0,0,0.3)] px-10">Featured</h2>
        <div className="flex gap-5 text-black">
          <button onClick={() => scroll('left')} className="nav-button" disabled={currentSlide === 0}>
            <ChevronLeft strokeWidth={3} className="w-6 h-6" />
          </button>
          <button onClick={() => scroll('right')} className="nav-button" disabled={currentSlide >= totalSlides - 1}>
            <ChevronRight strokeWidth={3} className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Product Slider */}
      <div className="slider-container">
        <div className="slides-wrapper" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {Array.from({ length: totalSlides }).map((_, slideIndex) => (
            <div key={slideIndex} className="slide">
              {latestProducts
                .slice(slideIndex * itemsPerPage, slideIndex * itemsPerPage + itemsPerPage)
                .map((product, index) => (
                  <div key={index} className="product-item">
                    <Image src={product.image} alt={product.name} className="product-image" width={200} height={200} />
                    <p className="product-name">{product.name}</p>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Featured;
