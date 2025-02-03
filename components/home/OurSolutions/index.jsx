import Image from "next/image";
import bpo from "@/public/elements/bpo.jpg";
import liveChat from "@/public/elements/live-chat.png";
import laptop from "@/public/elements/laptop.png";
import factory from "@/public/elements/factory.png";
import "./style.scss";
import { Printer } from "lucide-react";

const OurSolutions = () => {
  return (
    <section className="our-solutions-section flex-center text-[#171717] pt-10 pb-52 px-16">
      <p className="text-4xl pb-12">Solutions That Deliver</p>
      <div className="flex w-full gap-10">
        <div className="flex flex-col justify-between flex-1 gap-16">
          <div className="flex flex-col gap-5">
            <div className="flex gap-5 items-center">
              <Image
                src={laptop}
                alt="Shreeji"
                quality={100}
                className="w-10 h-10 object-contain grayscale"
              />

              <h3 className="font-bold text-2xl">Computer Connections</h3>
            </div>

            <div>
              <p>
                Our Computer Connections division specialises in supplying,
                supporting, and customising IT equipment to meet your business's
                specific requirements.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex gap-5 items-center">
              <Printer strokeWidth={1.1} className="w-10 h-10" />
              <h3 className="font-bold text-2xl">Print Advertising</h3>
            </div>

            <div>
              <p>
                Our Print Advertising division offers high-quality printing
                solutions, including large-format printing, lithographic paper,
                signage, and fine-art (gi- clée) printing.
              </p>
            </div>
          </div>
        </div>

        <div className="flex-center w-[50%] relative flex-1">
          <h2 className="font-bold text-6xl text-center mb-10">
            Over <span className="text-[var(--primary)]">20 Years</span> of
            Expertise!
          </h2>
          <Image
            src={bpo}
            alt="SHreeji"
            quality={100}
            className="hidden z-[1] rounded-2xl w-[20rem] h-[27rem] object-cover object-[70%] grayscale"
          />

          <div className="hidden absolute z-[0] rounded-2xl w-[20rem] h-[30rem] border-4 border-[var(--primary)] -ml-[50%]" />
        </div>

        <div className="flex flex-col justify-between flex-1 text-right gap-16">
          <div className="flex flex-col gap-5">
            <div className="flex gap-5 items-center justify-end">
              <h3 className="font-bold text-2xl">
                Business Process Outsourcing
              </h3>

              <Image
                src={liveChat}
                alt="SHreeji"
                quality={100}
                className="w-10 h-10 object-contain"
              />
            </div>

            <div>
              <p>
                We provide tailored BPO solutions, with a strong focus on the
                telecom sector, to optimise your operations and improve customer
                experiences.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex gap-5 items-center justify-end">
              <h3 className="font-bold text-2xl">Skylift Services</h3>
              <Image
                src={factory}
                alt="SHreeji"
                quality={100}
                className="w-10 h-10 object-contain"
              />
            </div>

            <div>
              <p>
                Our cherry-picker skylift services provide safe and efficient
                solutions for elevated tasks such as maintenance, installations,
                and inspections.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurSolutions;
