import styles from "./style.scss";
import Partner1 from "@/public/logos/adobe.png";
import Partner2 from "@/public/logos/cisco.png";
import Partner3 from "@/public/logos/dellpartner.png";
import Partner4 from "@/public/logos/Epson.png";
import Partner5 from "@/public/logos/ESET.png";
import Partner6 from "@/public/logos/IBM.png";
import Image from "next/image";

const Partners   = () => {
  const partners = [
    Partner1,
    Partner2,
    Partner3,
    Partner4,
    Partner5,
    // Partner6,
    // Partner1,
    // Partner2,
    // Partner3,
    // Partner4,
    // Partner5,
    // Partner6,
  ];

  return (
    <div className="scrollContainer pt-2">
      <div className="logos flex flex-col md:flex-row items-center gap-2 md:gap-4 w-full md:w-auto">
        <div className="px-10">
          <h2 className="text-4xl md:text-6xl font-bold">Our High Level Partners</h2>
          <p className="mt-10">
            We cooperate with top partners and provide access to over 1m
            products and services.
          </p>
        </div>
        <div className="logos-slide flex flex-wrap w-max gap-2 md:gap-4">
          {/* <div className="fadeLeft"></div> */}

          {partners.map((logo, index) => {
            return (
              <div
                key={`index-${index + 1}`}
                className="partner-logo-container flex-center px-10 py-5 h-32 rounded-lg grayscale-0 hover:grayscale-0 transition duration-300"
              >
                <Image src={logo} alt="aeiforia" className="partner-logo" />
              </div>
            );
          })}
          {/* <div className="fadeRight"></div> */}
        </div>
        {/* <div className="logos-slide flex w-max gap-2 md:gap-4">
          {partners.map((logo, index) => {
            return (
              <div
                key={`index-${index + 1}`}
                className="flex-center px-10 py-5"
              >
                <Image src={logo} alt="aeiforia" className="partner-logo" />
              </div>
            );
          })}
        </div> */}
      </div>
    </div>
  );
};

export default Partners ;
