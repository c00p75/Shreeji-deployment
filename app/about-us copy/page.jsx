import HeroSection from "@/components/about/HeroSection";
import ProductCategory from "@/components/home/ProductCategory";
import Testimonials from "@/components/home/Testimonials";
import OurStory from "@/components/about/OurStory";
import MissionVision from "@/components/about/MissionVision";
import OurExpertise from "@/components/about/OurExpertise";
import OurJourney from "@/components/about/OurJourney";
import Team from "@/components/about/Team";
import WhyUs from "@/components/about/WhyUs";
import JoinUs from "@/components/about/JoinUs";


export default function Home() {
  return (
    <>
      <HeroSection />
      <OurStory />
      {/* <MissionVision /> */}
      <OurExpertise />
      <OurJourney />
      <Team />
      <WhyUs />
      <JoinUs />
    </>
  );
}
