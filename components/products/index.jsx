"use client";

import heroBg from "@/public/backgrounds/about-bg-2.jpg";
import HPEnvyx36014fa0008na from "@/public/products/HP Envy x360 14-fa0008na.png";
import "./style.scss";
import Image from "next/image";
import { CircleDot } from "lucide-react";
import LatestProducts1 from "./main grid/latest products 1";
import HotDeals from "./side grid/hot deals";
import Categories from "./side grid/categories";
import PromotionBanner1 from "./main grid/promotion banner 1";
import LatestProducts2 from "./main grid/latest products 2";
import MainGrid from "./main grid";
import SideGrid from "./side grid";

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
  return (
    <section className="z-[1] products-hero-section min-h-screen relative pl-5 pr-8 gap-5 pb-[2rem] text-white h-fit">      
      <SideGrid allProducts={allProducts}  />
      <MainGrid allProducts={allProducts} />
    </section>    
  );
};

export default Products;
