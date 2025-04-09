'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import './style.scss';
import { filterProducts } from '@/app/data/productsData';
import ProductPreview from '../../ProductPreview';

const ProductList = ({filterBy, filter}) => {
  const categoryProducts = filterProducts(filterBy, filter)

  return (
    <div className="product-category-list bg-[var(--shreeji-primary)] h-fit relative flex flex-col">
      {/* Scrollable Container */}
      <div className="scroll-container overflow-visible md:overflow-hidden relative px-10 pt-10">
        <div className="w-full product-containermin-w-full flex flex-col md:grid grid-cols-3 gap-7">
          {categoryProducts.map((product, index) => (
            <ProductPreview product={product} index={index} />  
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
