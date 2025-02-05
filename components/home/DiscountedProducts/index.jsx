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
    name: `HP Pavilion Laptop 16t-af000, 16"`,
    price: "K5000",
    discount: "K3000",
    image: product1,
  },
  {
    id: 2,
    name: `HP Pavilion Laptop 16t-af000, 16"`,
    price: "K8000",
    discount: "K6000",
    image: product1,
  },
  {
    id: 3,
    name: `HP Pavilion Laptop 16t-af000, 16"`,
    price: "K10000",
    discount: "K7500",
    image: product1,
  },
  {
    id: 4,
    name: `HP Pavilion Laptop 16t-af000, 16"`,
    price: "K12000",
    discount: "K9000",
    image: product1,
  },
  {
    id: 5,
    name: `HP Pavilion Laptop 16t-af000, 16"`,
    price: "K15000",
    discount: "K11000",
    image: product1,
  },
  {
    id: 1,
    name: `HP Pavilion Laptop 16t-af000, 16"`,
    price: "K5000",
    discount: "K3000",
    image: product1,
  },
  {
    id: 2,
    name: `HP Pavilion Laptop 16t-af000, 16"`,
    price: "K8000",
    discount: "K6000",
    image: product1,
  },
  {
    id: 3,
    name: `HP Pavilion Laptop 16t-af000, 16"`,
    price: "K10000",
    discount: "K7500",
    image: product1,
  },
  {
    id: 4,
    name: `HP Pavilion Laptop 16t-af000, 16"`,
    price: "K12000",
    discount: "K9000",
    image: product1,
  },
  {
    id: 5,
    name: `HP Pavilion Laptop 16t-af000, 16"`,
    price: "K15000",
    discount: "K11000",
    image: product1,
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
    <div className="discounted-product-container relative w-screen scroll-smooth pb-28">
      <h2 className=" font-extrabold text-4xl p-10 underline underline-offset-8 text-center">
        <span>Discounted</span> Products
      </h2>
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-10 no-scrollbar scroll-smooth overflow-visible p-10"
      >
        {discountedProducts.map((product) => (
          <div
            key={product.id}
            className="product-container min-w-[40rem] flex items-center transition-transform duration-200 rounded-2xl"
          >
            <Image
              src={product.image}
              alt={product.name}
              className="absolute w-[12rem] h-[12rem] top-[25%] left-[15%] object-cover mb-2 overflow-visible scale-x-[-1]"
            />
            <div className="flex-[3] bg-[var(--primary)] h-full relative" />
            <div className="flex-[4] h-full p-4 pl-[10rem] discounted-card-bg-2 text-[var(--primary)]">
              <h3 className="font-semibold text-3xl">{product.name}</h3>
              <p className="">
                {`Windows 11 HomeIntel® Core™ i5-1334U (up to 4.6 GHz, 12 MB L3
                cache, 10 cores, 12 threads) + Intel® Iris® Xe Graphics + 8
                GB(Onboard)512 GB PCIe® NVMe™ M.2 SSD`}
              </p>

              <div className="flex gap-5 my-2">
                <p className="text-red-800 line-through text-2xl">
                  {product.price}
                </p>

                <p className="text-[var(--primary) font-bold text-2xl">
                  {product.discount}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-10 absolute left-10 bottom-10 text-black">
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
