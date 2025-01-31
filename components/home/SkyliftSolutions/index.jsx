import Image from "next/image";
import skylift from "@/public/elements/skylift.png";
import liveChat from "@/public/elements/live-chat.png";
import laptop from "@/public/elements/laptop.png";
import factory from "@/public/elements/factory.png";
import "./style.scss";
import { Square } from "lucide-react";

const SkyliftSolutions = () => {
  return (
    <section className="skylift-solutions-section flex-center text-white py-20 px-10">
      <div className="flex w-full gap-10 relative">
        <div className="flex items-center w-[40%]">
          <Image
            src={skylift}
            alt="SHreeji"
            quality={100}
            className="z-[1] rounded-2xl w-auto h-[100vh] object-cover object-[70%]"
          />

          <div className="z-[0] box rounded-2xl w-[20rem] h-[25rem] mb-10 -ml-[70%] bg-[var(--secondary)]" />
        </div>

        <div className="w-[60%] flex flex-col gap-10 mt-10">
          <h2 className="font-bold text-4xl text-center px-32 mb-10">
            Why Skylift Solutions
          </h2>
          <div className="flex flex-col gap-10 text-lg">
            <p className="text-xl">
              Cherry picker skylift services have become essential for various
              industries due to their versatility, safety, and efficiency.
            </p>
            <div className="flex flex-col gap-10">
              <p className="flex gap-3 items-center">
                <span>
                  <Square
                    className="w-4 h-4"
                    color="#ffffff"
                    fill="white"
                    strokeWidth={3}
                  />
                </span>
                Enhanced Safety for Elevated Tasks{" "}
              </p>
              <p className="flex gap-3 items-center">
                <span>
                  <Square
                    className="w-4 h-4"
                    color="#ffffff"
                    fill="white"
                    strokeWidth={3}
                  />
                </span>
                Versatility Across Industries
              </p>
              <p className="flex gap-3 items-center">
                <span>
                  <Square
                    className="w-4 h-4"
                    color="#ffffff"
                    fill="white"
                    strokeWidth={3}
                  />
                </span>
                Precise and Efficient Operations{" "}
              </p>
              <p className="flex gap-3 items-center">
                <span>
                  <Square
                    className="w-4 h-4"
                    color="#ffffff"
                    fill="white"
                    strokeWidth={3}
                  />
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
