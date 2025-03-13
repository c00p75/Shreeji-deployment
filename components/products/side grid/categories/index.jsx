'use client'

import { ChevronDown, CircleDot } from "lucide-react";
import React, { useEffect, useState } from "react";
import {allProducts} from "@/app/data/productsData";
import Link from "next/link";

const Categories = () => {
  const [categories, setCategories] = useState([]); // Use an array instead of an object
  const [openCategory, setOpenCategory] = useState(null); // Add state for toggling

  useEffect(() => {
    // Group categories with their subcategories
    const categoryMap = allProducts.reduce((acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = new Set();
      }
      acc[product.category].add(product.subcategory);
      return acc;
    }, {});

    // Convert sets to arrays
    const structuredCategories = Object.entries(categoryMap).map(([category, subcategories]) => ({
      category,
      subcategories: [...subcategories],
    }));

    setCategories(structuredCategories);
  }, []);

  return (
    <div className={`bg-[var(--shreeji-primary)] flex flex-col px-5 py-7 ${openCategory ? 'h-auto' : 'h-full'}`}>
      <ul>
        {categories.map(({ category, subcategories }, index) => (
          <li
            key={index}
            className="mr-2 px-5 flex flex-col gap-2 items-start border-b py-4 last:border-none"
          >
            <div
              className="flex gap-5 items-center"
              
            >
              <CircleDot color="#ffffff" strokeWidth={3} size={20} />
              
              <Link href={`/products/${encodeURIComponent(category)}`} className="font-medium text-white cursor-pointer">{category}</Link>
              
              {subcategories[0] && (<ChevronDown onClick={() => setOpenCategory(openCategory === category ? null : category)} className="cursor-pointer" />)}
            </div>

            {openCategory === category && (
              <ul className="ml-8 mt-3 text-gray-300 flex flex-col gap-5">
                {subcategories.map((sub, subIndex) => (
                  <li key={subIndex} className="text-base flex gap-4">
                    <CircleDot color="#ffffff" strokeWidth={3} size={20} />
                    <Link href={`/products/${encodeURIComponent(category)}/${encodeURIComponent(sub)}`} className="font-medium text-white cursor-pointer">{sub}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
