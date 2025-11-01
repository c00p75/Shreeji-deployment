'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import './style.scss';
import { filterProducts } from '@/app/lib/client/products';
import ProductPreview from '../../ProductPreview';

const ProductList = ({filterBy, filter}) => {
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const products = await filterProducts(filterBy, filter);
        setCategoryProducts(products || []);
      } catch (error) {
        console.error('Error fetching products:', error);
        setCategoryProducts([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [filterBy, filter]);

  if (loading) {
    return (
      <div className="product-category-list bg-[var(--shreeji-primary)] h-fit relative flex flex-col">
        <div className="scroll-container overflow-visible md:overflow-hidden relative px-5 md:px-10 pt-10">
          <div className="w-full product-containermin-w-full flex flex-col md:grid grid-cols-3 gap-7">
            <p className="text-white">Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-category-list bg-[var(--shreeji-primary)] h-fit relative flex flex-col">
      {/* Scrollable Container */}
      <div className="scroll-container overflow-visible md:overflow-hidden relative px-5 md:px-10 pt-10">
        <div className="w-full product-containermin-w-full flex flex-col md:grid grid-cols-3 gap-7">
          {categoryProducts.length > 0 ? (
            categoryProducts.map((product, index) => (
              <ProductPreview key={product.id || index} product={product} index={index} />  
            ))
          ) : (
            <p className="text-white col-span-full text-center py-10">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
