import styles from "./style.scss";
import Partner1 from "@/public/logos/adobe.png";
import Partner2 from "@/public/logos/cisco.png";
import Partner3 from "@/public/logos/dellpartner.png";
import Partner4 from "@/public/logos/Epson.png";
import Partner5 from "@/public/logos/ESET.png";
import Partner6 from "@/public/logos/IBM.png";
import Image from "next/image";

const OurStory = () => {
  return (
    <div className="our-story pt-2 px-20 bg-white z-[1]">
      <div className="logos flex flex-row-reverse items-start gap-2 md:gap-4">
        <div className="flex-[2] stat-container bg-[#87703f] px-5 text-[whitesmoke] rounded-md">
          <p className="">
            <span>25+</span>
            <span>Years of Experience</span>
          </p>

          <p>
            <span>3,000,000+</span>
            <span>documents scanned</span>
          </p>

          <p>
            <span>150+</span>
            <span>schools & examination centers computerized across 6 provinces</span>
          </p>

          <p>
            <span>1,764+</span>
            <span>computers supplied and installed nationwide</span>
          </p>

          <p>
            <span>500+</span>
            <span>large-format advertising projects</span>
          </p>

          <p>
            <span>1,500,000+</span>
            <span>handwritten KYC forms converted into digital format</span>
          </p>
        </div>

        <div className="flex-[5] px-10">
          <h2 className="font-bold text-6xl mb-10 text-[var(--primary)] pt-20">
            Our <span className="text-[#171717]">Story</span>
          </h2>
          <p className="mt-10">
            Founded in 1998, Shreeji Investments Limited is a proudly Zambian, citizen-owned company with a strong reputation in the ICT, printing, advertising, and system-platform development industries. Over the years, we have been committed to providing cutting-edge, cost-effective, and customer-focused solutions to businesses, government institutions, and organizations across the country.
            With a foundation built on innovation, integrity, and excellence, we continue to bridge technology gaps, empower businesses, and deliver solutions that drive efficiency, productivity, and success. Our unwavering commitment to customer satisfaction and continuous improvement has positioned us as a trusted partner in Zambia’s digital transformation journey.
          </p>          
          <h2 className="font-bold text-6xl mb-10 text-[#171717] pt-20">
            Our <span className="text-[var(--primary)]">Mission</span>
          </h2>
          <p className="">
            "We may not have the answer, but we’ll find it.
            We may not have the time, but we’ll make it.
            We may not be the biggest, but we’ll be the most committed to your success."
            At Shreeji Investments Limited, our mission is to provide innovative, reliable, and efficient technology and business solutions tailored to the needs of our clients. We are driven by a passion for delivering excellence, ensuring that every project we undertake results in customer satisfaction and long-term success.
            </p>
        </div>            
      </div>
    </div>
  );
};

export default OurStory;
