import HeroSection from "@/components/home/HeroSection";
import Partners from "@/components/home/Partners";
import OurSolutions from "@/components/home/OurSolutions";
import DiscountedProducts from "@/components/home/DiscountedProducts";
import SkyliftSolutions from "@/components/home/SkyliftSolutions";
import ProductCategory from "@/components/home/ProductCategory";
import Testimonials from "@/components/home/Testimonials";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Partners />
      <OurSolutions />
      <SkyliftSolutions />
      <DiscountedProducts />
      <ProductCategory />
      <Testimonials />
    </>
  );
}
