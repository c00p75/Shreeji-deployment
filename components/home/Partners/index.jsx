import styles from "./style.scss";
import Partner1 from "@/public/logos/adobe.png";
import Partner2 from "@/public/logos/cisco.png";
import Partner3 from "@/public/logos/dellpartner.png";
import Partner4 from "@/public/logos/Epson.png";
import Partner5 from "@/public/logos/ESET.png";
import Partner6 from "@/public/logos/IBM.png";
import Image from "next/image";

const Partners = () => {
  const partners = [
    Partner1,
    Partner2,
    Partner3,
    Partner4,
    Partner5,
    Partner6,
    Partner1,
    Partner2,
    Partner3,
    Partner4,
    Partner5,
    Partner6,
  ];

  return (
    <div className="scrollContainer border-t-8 border-b-8 border-[var(--secondary)]">
      <div className="fadeLeft"></div>
      <div className="logos flex gap-2 md:gap-4">
        <div className="logos-slide flex w-max gap-2 md:gap-4">
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
        </div>
        <div className="logos-slide flex w-max gap-2 md:gap-4">
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
        </div>
      </div>
      <div className="fadeRight"></div>
    </div>
  );
};

export default Partners;
