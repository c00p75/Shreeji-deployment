import "./style.scss";
import Image from "next/image";
import shreejiHouse from "@/public/elements/Shreeji house.png";

const Welcome  = () => {

  return (
    <div className="welcome pt-2 bg-[var(--light-secondary)]">
      <div className="flex items-stretch gap-2 md:gap-4">
        <div className="welcome-text flex-[3] px-5 md:px-10">
          <h2 className="text-5xl md:text-6xl font-bold">Empowering Businesses Since 1998</h2>
          <p className="mt-10">
            At Shreeji Investments Limited, we are dedicated to providing cutting-edge ICT solutions, high-quality enterprise printing, innovative advertising, and system-platform development to businesses and organizations across Zambia.
          </p>
          <p className="mt-10">
            With over 25 years of experience, we have built a reputation for excellence, affordability, and customer satisfaction—helping companies transform, streamline operations, and achieve their goals with technology-driven solutions.
          </p>
        </div>        
        <div className="hidden md:flex flex-[2]">
          <Image 
            src={shreejiHouse} 
            alt="Shreeji House" 
            className="grayscale object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Welcome  ;
