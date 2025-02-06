"use client";

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
import { useState } from "react";

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
];

const activePannel = 1;

const ProductCategory = () => {
  const categorySelect = [
    "All",
    "IT Solutions",
    "BPO Services",
    "Print Advertisement",
    "Skylift Services",
  ];

  const [activeCat, setActiveCat] = useState("All");

  return (
    <div className="home-products-category-container relative w-screen scroll-smooth pb-28 flex-center">
      <p className="text-center pt-20 text-xl font-bold">
        Solutions That Deliver
      </p>
      <h2 className="uppercase text-[var(--primary)] font-extrabold text-4xl p-10 text-center">
        <span>Smart</span> & Great <span>Solutions</span>
      </h2>

      <div className="flex gap-20 tab-select mb-14">
        {categorySelect.map((cat, index) => (
          <button
            onClick={() => setActiveCat(cat)}
            className={`py-2 ${activeCat == cat ? "active" : ""}`}
            key={index}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="min-h-screen flex flex-wrap px-32 gap-16">
        {activeCat == "All" &&
          discountedProducts.map((product) => (
            // <div
            //   key={product.id}
            //   className="product-container w-[20%] rounded-xl bg-[#f5f5f5] cursor-pointer p-4 pb-0 flex flex-col items-center transition-transform duration-200"
            // >
            //   <Image
            //     src={product.image}
            //     alt={product.name}
            //     className="w-32 h-32 object-cover mb-2 overflow-visible"
            //   />
            //   <h3 className="text-lg font-semibold">{product.name}</h3>
            //   <p className="text-red-500 font-bold">{product.discount}</p>
            //   <p className="text-gray-500 line-through">{product.price}</p>
            // </div>

            <div className="product">
              <span className="product__price">{product.price}</span>
              <Image
                src={product.image}
                alt={product.name}
                className="product__image object-cover mb-2 overflow-visible"
              />

              <h1 className="product__title">{product.name}</h1>
              <hr />
              <p>Product discription.</p>
              <a href="#" className="product__btn btn">
                Buy Now
              </a>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductCategory;
