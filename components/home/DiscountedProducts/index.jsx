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

const discountedProducts = [
  {
    id: 1,
    name: "Product 1",
    price: "K5000",
    discount: "K3000",
    image: product1,
  },
  {
    id: 2,
    name: "Product 2",
    price: "K8000",
    discount: "K6000",
    image: product2,
  },
  {
    id: 3,
    name: "Product 3",
    price: "K10000",
    discount: "K7500",
    image: product3,
  },
  {
    id: 4,
    name: "Product 4",
    price: "K12000",
    discount: "K9000",
    image: product4,
  },
  {
    id: 5,
    name: "Product 5",
    price: "K15000",
    discount: "K11000",
    image: product5,
  },
  {
    id: 1,
    name: "Product 1",
    price: "K5000",
    discount: "K3000",
    image: product1,
  },
  {
    id: 2,
    name: "Product 2",
    price: "K8000",
    discount: "K6000",
    image: product2,
  },
  {
    id: 3,
    name: "Product 3",
    price: "K10000",
    discount: "K7500",
    image: product3,
  },
  {
    id: 4,
    name: "Product 4",
    price: "K12000",
    discount: "K9000",
    image: product4,
  },
  {
    id: 5,
    name: "Product 5",
    price: "K15000",
    discount: "K11000",
    image: product5,
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
    <div className="discounted-product-container relative w-screen bg-[var(--secondary)] scroll-smooth pb-28">
      <h2 className="text-[var(--primary)] font-extrabold text-4xl p-10 underline underline-offset-8 text-center">
        <span className="text-black">Discounted</span> Products
      </h2>
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-4 no-scrollbar scroll-smooth overflow-visible p-10"
      >
        {discountedProducts.map((product) => (
          <div
            key={product.id}
            className="product-container cursor-pointer min-w-[200px] p-4 flex flex-col items-center transition-transform duration-200"
          >
            <Image
              src={product.image}
              alt={product.name}
              className="w-32 h-32 object-cover mb-2 overflow-visible"
            />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-red-500 font-bold">{product.discount}</p>
            <p className="text-gray-500 line-through">{product.price}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-10 absolute left-10 bottom-10">
        <button
          onClick={() => scroll("left")}
          className=" z-10 bg-white shadow-lg rounded-full p-4"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>

        <button
          onClick={() => scroll("right")}
          className="z-10 bg-white shadow-lg rounded-full p-4"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
};

export default DiscountedProducts;
