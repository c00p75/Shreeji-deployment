"use client";

import heroBg from "@/public/backgrounds/about-bg-2.jpg";
import HPEnvyx36014fa0008na from "@/public/products/HP Envy x360 14-fa0008na.png";
import "./style.scss";
import Image from "next/image";
import { CircleDot } from "lucide-react";
import { useEffect, useState } from "react";

const allProducts = {
  'Computers': {
    'HP Envy x360 14-fa0008na': {
      'image': HPEnvyx36014fa0008na,
      'price': 'K24,000',
      'date-added': '2025-3-6'
    }
  },
  'Networking': {
    'HP Envy x360 14-fa0008na': {
      'image': HPEnvyx36014fa0008na,
      'price': 'K24,000',
      'date-added': '2025-3-5'
    }
  },
  'Servers': {
    'HP Envy x360 14-fa0008na': {
      'image': HPEnvyx36014fa0008na,
      'price': 'K24,000',
      'date-added': '2025-3-4'
    }
  },
  'Printers': {
    'HP Envy x360 14-fa0008na': {
      'image': HPEnvyx36014fa0008na,
      'price': 'K24,000',
      'date-added': '2025-3-3'
    }
  },
  'Scanners': {
    'HP Envy x360 14-fa0008na': {
      'image': HPEnvyx36014fa0008na,
      'price': 'K24,000',
      'date-added': '2025-3-2'
    }
  },
  'Accessories': {
    'HP Envy x360 14-fa0008na': {
      'image': HPEnvyx36014fa0008na,
      'price': 'K24,000',
      'date-added': '2025-3-3'
    }
  },
  'Special Orders': {
    'HP Envy x360 14-fa0008na': {
      'image': HPEnvyx36014fa0008na,
      'price': 'K24,000',
      'date-added': '2025-3-1'
    }
  },
  'IT Solftware': {
    'HP Envy x360 14-fa0008na': {
      'image': HPEnvyx36014fa0008na,
      'price': 'K24,000',
      'date-added': '2025-3-1'
    }
  },
  'Print Proucts': {
    'HP Envy x360 14-fa0008na': {
      'image': HPEnvyx36014fa0008na,
      'price': 'K24,000',
      'date-added': '2025-3-1'
    }
  },
}

const Products = () => {
  const [latestProducts, setLatestProducts] = useState([])

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
                  dateAdded: new Date(product['date-added'])
              });
          }
      }    
      productsArr.sort((a, b) => b.dateAdded - a.dateAdded);
      
      return productsArr.slice(0, 6);
    }
  
    setLatestProducts(getRecentProducts(allProducts));
  }, [])

  return (
    <section className="z-[1] products-hero-section min-h-screen flex relative pl-5 pr-8 gap-5 pb-[2rem] text-white h-fit">
      <section className="flex-[1] side-grid scroll-container flex flex-col gap-10">
        <div className="bg-[var(--shreeji-primary)] flex flex-col px-5 py-1 h-fit">
          {Object.keys(allProducts).map((key, index) => (
            <div key={index} className="mr-2 px-5 flex gap-5 items-center border-b py-4 last:border-none cursor-pointer">
              <CircleDot color="#ffffff" strokeWidth={3} size={20} />
              <span>{key}</span>
            </div>
          ))}
        </div>

        <div className="bg-[var(--shreeji-primary)] flex flex-col px-5 py-1 h-fit">
          {Object.keys(allProducts).map((key, index) => (
            <div key={index} className="mr-2 px-5 flex gap-5 items-center border-b py-4 last:border-none cursor-pointer">
              <CircleDot color="#ffffff" strokeWidth={3} size={20} />
              <span>{key}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="main-grid flex-[3] relative flex flex-col gap-10">
        <div className="bg-[var(--shreeji-primary)] h-fit relative">
          <div className="flex flex-col w-[60%] justify-center items-center gap-10 py-24 px-10 text-center">
            <h2 className="text-5xl font-extralight [text-shadow:2px_2px_4px_rgba(0,0,0,0.5)]">Power Meets Duraility</h2>
            <h2 className="text-5xl font-extrabold">Your Perfect EveryDay Laptop</h2>
            <span className="border-4 border-white py-1 px-5 rounded-full uppercase cursor-pointer">
              Shop Now
            </span>
          </div>

          <Image src={allProducts.Computers['HP Envy x360 14-fa0008na'].image} className="h-[52%] w-auto absolute top-[45%] -right-[15%] -translate-x-1/2 -translate-y-1/2" />

          <div className="bg-[#605432] flex justify-around text-center rounded-2xl py-5 px-5">
            <div>
              <h3 className="text-2xl">Money Back</h3>
              <p className="text-base font-extralight">30 Days Money Back Guarantee</p>
            </div>

            <div>
              <h3 className="text-2xl">Free Delivery</h3>
              <p className="text-base font-extralight">Delivery on orders</p>
            </div>

            <div>
              <h3 className="text-2xl">Special Sale</h3>
              <p className="text-base font-extralight">Discounts on selected items</p>
            </div>
          </div>
        </div>    

        <div className="bg-[var(--shreeji-primary)] h-fit relative flex overflow-x-auto overflow-visible scroll-container">
          {latestProducts.map((product, index) => (
            <div key={index} className="mr-2 px-5 flex gap-5 items-center py-4 cursor-pointer min-w-[30rem]">
              <Image src={product.image} alt={product.name} className="h-auto w-[20rem] object-cover" />
            </div>
          ))}
        </div>   
      </section>
    </section>
    
  );
};

export default Products;
