"use client";

import { useRef } from "react";
import "./style.scss";
// import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import product1 from "@/public/products/product (1).png";
import product2 from "@/public/products/product (2).png";
import product3 from "@/public/products/product (3).png";
import product4 from "@/public/products/product (4).png";
import product5 from "@/public/products/product (5).png";
import product6 from "@/public/products/product (1).png";
import Image from "next/image";
import LatestProductsByCategory from "@/components/products/main grid/latest products category";

const discountedProducts = [
  {
    id: 1,
    name: `HP Pavilion Laptop 16t-af000, 16"`,
    price: "K5000",
    discount: "K3000",
    images: [product1],
  },
  {
    id: 2,
    name: `HP Pavilion Laptop 16t-af000, 16"`,
    price: "K8000",
    discount: "K6000",
    images: [product1],
  },
  {
    id: 3,
    name: `HP Pavilion Laptop 16t-af000, 16"`,
    price: "K10000",
    discount: "K7500",
    images: [product1],
  },
  {
    id: 4,
    name: `HP Pavilion Laptop 16t-af000, 16"`,
    price: "K12000",
    discount: "K9000",
    images: [product1],
  },
  {
    id: 5,
    name: `HP Pavilion Laptop 16t-af000, 16"`,
    price: "K15000",
    discount: "K11000",
    images: [product1],
  },
  {
    id: 1,
    name: `HP Pavilion Laptop 16t-af000, 16"`,
    price: "K5000",
    discount: "K3000",
    images: [product1],
  },
  {
    id: 2,
    name: `HP Pavilion Laptop 16t-af000, 16"`,
    price: "K8000",
    discount: "K6000",
    images: [product1],
  },
  {
    id: 3,
    name: `HP Pavilion Laptop 16t-af000, 16"`,
    price: "K10000",
    discount: "K7500",
    images: [product1],
  },
  {
    id: 4,
    name: `HP Pavilion Laptop 16t-af000, 16"`,
    price: "K12000",
    discount: "K9000",
    images: [product1],
  },
  {
    id: 5,
    name: `HP Pavilion Laptop 16t-af000, 16"`,
    price: "K15000",
    discount: "K11000",
    images: [product1],
  },
];

const DiscountedProducts = () => {
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
    <div className="discounted-product-container relative w-screen scroll-smooth pb-10 md:pb-28 pt-5 md:pt-32 text-white">
      <LatestProductsByCategory category="Computers" count={5} heading="Discounted Products" />
    </div>
  );
};

export default DiscountedProducts;
