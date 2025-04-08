import styles from "./style.scss";
import Partner1 from "@/public/logos/adobe.png";
import Partner2 from "@/public/logos/cisco.png";
import Partner3 from "@/public/logos/dellpartner.png";
import Partner4 from "@/public/logos/Epson.png";
import Partner5 from "@/public/logos/ESET.png";
import Partner6 from "@/public/logos/IBM.png";
import Image from "next/image";
import expertiseImg from "@/public/elements/Shreeji house.png";
import { Square } from "lucide-react";

const OurStory = () => {
  return (
    <div className="our-story md:px-14 bg-white z-[2] relative">
      <div className="logos flex flex-col-reverse md:flex-row items-start gap-2 md:gap-10">
        <div className="side-grid-container pt-[4rem] flex-[2] relative">
          <div className="side-grid scroll-container flex flex-row md:flex-col gap-5  stat-container px-5 text-[whitesmoke] rounded-md">
            <p className="flex">
              <span>25+</span>
              <span>Years of Experience</span>
            </p>

            <p>
              <span>3M+</span>
              <span>documents scanned</span>
            </p>

            <p>
              <span>150+</span>
              <span>schools & examination centers computerized across 6 provinces</span>
            </p>

            <p>
              <span>1.5K+</span>
              <span>computers supplied and installed nationwide</span>
            </p>

            <p>
              <span>500+</span>
              <span>large-format advertising projects</span>
            </p>

            <p>
              <span>1.5M+</span>
              <span>handwritten KYC forms converted into digital format</span>
            </p>
          </div>
        </div>

        <div className="flex-[5] md:pt-[3.5rem] leading-8">
          <Image src={expertiseImg} fill className="w-full h-full object-cover z-[-1] opacity-10 mt-20"/>
          <h2 className="font-bold text-5xl md:text-6xl text-center md:text-start mb-10 text-[var(--primary)] pt-20 flex items-center relative gap-3 md:gap-10 px-5">
            <p className="w-fit">Our <span className="text-[#171717]">Story</span></p>
            <span className="flex-grow h-[2px] mt-5 bg-[#87703fe6]"/>
          </h2>
          <div className="flex gap-5 px-5 md:px-0">
            <p className="flex-[2] md:mt-10">
              Founded in 1998, Shreeji Investments Limited is a proudly Zambian, citizen-owned company with a strong reputation in the ICT, printing, advertising, and system-platform development industries. Over the years, we have been committed to providing cutting-edge, cost-effective, and customer-focused solutions to businesses, government institutions, and organizations across the country.
              With a foundation built on innovation, integrity, and excellence, we continue to bridge technology gaps, empower businesses, and deliver solutions that drive efficiency, productivity, and success. Our unwavering commitment to customer satisfaction and continuous improvement has positioned us as a trusted partner in Zambia’s digital transformation journey.
            </p>  
            {/* <div className="md:flex-1 flex-center h-fit bg-[#87703f] rounded-md p-2 rotate-6 mt-10">
              <Image src={expertiseImg} className="h-[auto] w-full object-fill rounded-md -rotate-6 border-2 border-[#87703f]"/>
            </div>             */}
          </div>
          <h2 className="font-bold text-5xl md:text-6xl mb-10 text-[var(--primary)] pt-20 flex items-center relative gap-3 md:gap-10 px-5">
            <p className="w-fit"><span className="text-[#171717]">Our</span> Mission</p>
            <span className="flex-grow h-[2px] mt-2 bg-[black]"/>
          </h2>
          <div className="flex gap-5 px-5 md:px-0">
            <div className="flex flex-col gap-5 md:ml-5">
              <p>
                At Shreeji Investments Limited, our mission is to provide innovative, reliable, and efficient technology and business solutions tailored to the needs of our clients. We are driven by a passion for delivering excellence, ensuring that every project we undertake results in customer satisfaction and long-term success.
              </p>
              <p className="flex gap-3 md:items-center">
                <span className="mt-2 md:mt-0">
                  <Square className="w-8 h-8" fill="#87703f" strokeWidth={0} />
                </span>
                <div>We may not have the answer, but <strong>we’ll find it.</strong></div>
              </p>
              <p className="flex gap-3 md:items-center">
                <span className="mt-2 md:mt-0">
                  <Square className="w-8 h-8" fill="#87703f" strokeWidth={0} />
                </span>
                <div>We may not have the time, but <strong>we’ll make it.</strong></div>
              </p>
              <p className="flex gap-3 md:items-center">
                <span className="mt-2 md:mt-0">
                  <Square className="w-8 h-8" fill="#87703f" strokeWidth={0} />
                </span>
                <div>We may not be the biggest, but <strong>we’ll be the most committed to your success.</strong></div>
              </p>              
            </div>            
          </div>
        </div>            
      </div>
    </div>
  );
};

export default OurStory;
