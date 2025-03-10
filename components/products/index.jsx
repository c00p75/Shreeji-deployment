"use client";

import HPEnvyx36014fa0008na from "@/public/products/HP Envy x360 14-fa0008na.png";
import "./style.scss";
import MainGrid from "./main grid";
import SideGrid from "./side grid";

import allProducts from "@/app/data/productsData";
import SpecialOrders from "./special orders";

const Products = () => {
  return (
    <div className="text-white">
    <section className="z-[1] products-main-section min-h-screen relative pl-5 pr-8 gap-5 pb-[2rem]  h-fit">      
      <SideGrid />
      <MainGrid />
    </section> 

    <section className="">
      <SpecialOrders />   
    </section>
    
    </div>
  );
};

export default Products;
