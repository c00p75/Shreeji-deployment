import Image from "next/image";
import skylift from "@/public/elements/skylift.png";
import buildings from "@/public/backgrounds/city_buildings.png";
import "./style.scss";
import { Square } from "lucide-react";

const JoinUs = () => {
  return (
    <section className="why-us flex-center text-[#171717] pt-32 pb-20 px-10 overflow-visible">
      {/* <Image src={buildings} alt="Shreeji" className="buildings-bg-img absolute bottom-0 right-[0%] w-[100vh] h-[80vh] grayscale opacity-30"/> */}
      <div className="flex flex-col w-full gap-10 relative">
        <div className="w-full flex flex-col gap-5 relative">
          <h2 className="font-bold text-6xl text-center px-32 mb-10 text-[var(--primary)]">
          <span className="text-[#171717]">Join Us</span> on Our Journey
          </h2>
          <div className="flex flex-col gap-10">
            <p className="">
              At Shreeji Investments Limited, we are more than just a technology company—we are partners in your success. Whether you are looking for cutting-edge ICT solutions, enterprise printing, advertising, or system development, we are here to help you achieve your business goals.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-5 ml-[7rem]">
          
            <div className="flex gap-3 items-center">
              <p>Let&apos;s innovate together.</p>                
            </div>

            <div className="flex gap-3 items-center">
              <p>Get in touch with us today!</p>                
            </div>
                            
        </div>                  
      </div>
    </section>
  );
};

export default JoinUs;
