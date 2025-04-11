import styles from "./style.scss";
import Partner1 from "@/public/logos/hp_enterprise.png";
import Partner2 from "@/public/logos/hp_amplify.png";
import Partner3 from "@/public/logos/adobe.png";
import Partner4 from "@/public/logos/Epson.png";
import Partner5 from "@/public/logos/ubiquit.png";
import Partner6 from "@/public/logos/cisco.png";
import Partner7 from "@/public/logos/acer.png";
import Partner8 from "@/public/logos/kaspersky.png";
import Partner9 from "@/public/logos/apc.png";
import Partner10 from "@/public/logos/canon.png";
import Partner11 from "@/public/logos/dell_partner.png";
import Partner12 from "@/public/logos/apple.png";
import Partner13 from "@/public/logos/microsoft.png";
import Partner14 from "@/public/logos/trelix.png";
import Partner15 from "@/public/logos/lenovo_partner.png";
import Partner16 from "@/public/logos/zebra.png";
import Partner17 from "@/public/logos/lenovo_gold.png";
import Partner18 from "@/public/logos/logitech.png";
import Image from "next/image";

const Partners = () => {
  const partners = [
    Partner1,
    Partner2,
    Partner3,
    Partner4,
    Partner5,
    Partner6,
    Partner7,
    Partner8,
    Partner9,
    Partner10,
    Partner11,
    Partner12,
    Partner13,
    Partner14,
    Partner15,
    Partner16,
    Partner17,
    Partner18
  ];

  return (
    <div className="scrollContainer pt-10 md:pt-2 flex flex-col md:flex-row">
      <div className="px-8 md:px-10 text-center md:text-left">
        <h2 className="text-4xl md:text-6xl font-bold">Our High Level Partners</h2>
        <p className="mt-10">
          We cooperate with top partners and provide access to over 1m products and services.
        </p>
      </div>
      <div className="flex flex-col md:w-[55%] relative">
        <div className="fadeLeft"/>
        {/* Row 1: Left to Right */}
        <div className="logo-row logo-row-1 overflow-hidden whitespace-nowrap mt-10">
          <div className="logo-track animate-leftToRight">
            {partners.map((logo, index) => (
              <div
                key={`row1-${index}`}
                className="bg-[whitesmoke] rounded-lg mx-3 inline-block px-8 md:px-10 py-8 md:py-10 h-28 md:h-36 grayscale hover:grayscale-0 transition duration-600"
              >
                <Image src={logo} alt="partner-logo" className="h-full w-auto" />
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {partners.map((logo, index) => (
              <div
                key={`row1-dup-${index}`}
                className="bg-[whitesmoke] rounded-lg mx-3 inline-block px-8 md:px-10 py-8 md:py-10 h-28 md:h-36 grayscale hover:grayscale-0 transition duration-600"
              >
                <Image src={logo} alt="partner-logo" className="h-full w-auto" />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Right to Left */}
        <div className="logo-row logo-row-2 overflow-hidden whitespace-nowrap mt-5">
          <div className="logo-track animate-rightToLeft">
            {partners.map((logo, index) => (
              <div
                key={`row2-${index}`}
                className="bg-[whitesmoke] rounded-lg mx-3  inline-block px-8 md:px-10 py-8 md:py-10 h-28 md:h-36 grayscale hover:grayscale-0 transition duration-600"
              >
                <Image src={logo} alt="partner-logo" className="h-full w-auto" />
              </div>
            ))}
            {partners.map((logo, index) => (
              <div
                key={`row2-dup-${index}`}
                className="bg-[whitesmoke] rounded-lg mx-3 inline-block px-8 md:px-10 py-8 md:py-10 h-28 md:h-36 grayscale hover:grayscale-0 transition duration-600"
              >
                <Image src={logo} alt="partner-logo" className="h-full w-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partners;
