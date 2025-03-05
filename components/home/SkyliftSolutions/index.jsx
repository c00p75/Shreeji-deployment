import Image from "next/image";
import skylift from "@/public/elements/skylift.png";
import buildings from "@/public/backgrounds/city_buildings.png";
import "./style.scss";
import { Square } from "lucide-react";

const SkyliftSolutions = () => {
  return (
    <section className="skylift-solutions-section flex-center text-[#171717] pt-10 px-10 overflow-visible">
      <Image src={buildings} alt="Shreeji" className="buildings-bg-img absolute bottom-0 right-[0%] w-[100vh] h-[80vh] grayscale opacity-30"/>
      <div className="flex w-full gap-10 relative">
        <div className="flex items-center w-[40%] overflow-visible skylift-img-container" />

        <div className="curved-lines">
          <div>
            <div />
          </div>
        </div>

        <Image
          src={skylift}
          alt="SHreeji"
          quality={100}
          className="absolute z-[0] rounded-2xl w-auto grayscale h-[120vh] object-cover mt-[-25rem]"
        />

        <div className="w-[60%] flex flex-col gap-5 relative">
          {/* <div className="absolute z-[0] box rounded-2xl w-[20rem] h-[25rem] mb-10 -ml-[70%] bg-[var(--secondary)]" /> */}

          <h2 className="font-bold text-6xl text-center px-32 mb-10 text-[var(--primary)]">
            Why <span className="text-[#171717]">Skylift Solutions</span> ?
          </h2>
          <div className="flex flex-col gap-10">
            <p>
              Cherry picker skylift services have become essential for various
              industries due to their versatility, safety, and efficiency.
            </p>
            <div className="flex flex-col gap-5 ml-[7rem]">
              <p className="flex gap-3 items-center">
                <span>
                  <Square className="w-4 h-4" fill="#171717" strokeWidth={3} />
                </span>
                Enhanced Safety for Elevated Tasks{" "}
              </p>
              <p className="flex gap-3 items-center">
                <span>
                  <Square className="w-4 h-4" fill="#171717" strokeWidth={3} />
                </span>
                Versatility Across Industries
              </p>
              <p className="flex gap-3 items-center">
                <span>
                  <Square className="w-4 h-4" fill="#171717" strokeWidth={3} />
                </span>
                Precise and Efficient Operations{" "}
              </p>
              <p className="flex gap-3 items-center">
                <span>
                  <Square className="w-4 h-4" fill="#171717" strokeWidth={3} />
                </span>
                Minimising Disruption and Downtime
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkyliftSolutions;
