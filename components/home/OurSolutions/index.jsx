import Image from "next/image";
import bpo from "@/public/elements/bpo.jpg";
import liveChat from "@/public/elements/live-chat.png";
import laptop from "@/public/elements/laptop.png";
import factory from "@/public/elements/factory.png";
import './style.scss';

const OurSolutions = () => {
  return (
    <section className="our-solutions-section flex-center text-white py-20 px-10">
      <p>Solutions That Deliver</p>
      <h2 className="font-bold text-4xl text-center px-32 mb-10">    
        Over 20 Years of Expertise in IT, BPO, Print Advertising, and Skylift Services
      </h2>
      <div className="flex w-full gap-10">
        <div className="w-[60%] flex flex-col gap-5 mt-10">
          <div className="flex gap-5">
            <div>
              <Image
                src={laptop}
                alt="SHreeji"
                quality={100}
                className="w-20 h-20 object-contain"
              />
            </div>
              
            <div>
              <h3 className="font-bold text-2xl">Computer Connections</h3>
              <p>Our Computer Connections division specialises in supplying, supporting, and customising IT equipment to meet your business's specific requirements.</p>
            </div>
          </div>

          <div className="flex gap-5">
            <div>
              <Image
                src={liveChat}
                alt="SHreeji"
                quality={100}
                className="w-20 h-20 object-contain"
              />
            </div>
              
            <div>
              <h3 className="font-bold text-2xl">Business Process Outsourcing</h3>
              <p>We provide tailored BPO solutions, with a strong focus on the telecom sector, to optimise your operations and improve customer experiences.</p>
            </div>
          </div>

          <div className="flex gap-5">
            <div>
              <Image
                src={liveChat}
                alt="SHreeji"
                quality={100}
                className="w-20 h-20 object-contain"
              />
            </div>
              
            <div>
              <h3 className="font-bold text-2xl">Print Advertising</h3>
              <p>Our Print Advertising division offers high-quality printing solutions, including large-format printing, lithographic paper, signage, and fine-art (gi- clée) printing.</p>
            </div>
          </div>

          <div className="flex gap-5">
            <div>
              <Image
                src={factory}
                alt="SHreeji"
                quality={100}
                className="w-20 h-20 object-contain"
              />
            </div>
              
            <div>
              <h3 className="font-bold text-2xl">Skylift Services</h3>
              <p>Our cherry-picker skylift services provide safe and efficient solutions for elevated tasks such as maintenance, installations, and inspections.</p>
            </div>
          </div>
        </div>

        <div className="flex items-center w-[40%]">
        <Image
          src={bpo}
          alt="SHreeji"
          quality={100}
          className="z-[1] rounded-2xl w-[20rem] h-[27rem] object-cover object-[70%]"
        />

        <div className="z-[0] rounded-2xl w-[20rem] h-[30rem] border-4 -ml-[50%]" />
      </div>
      </div>      
    </section>
  )
}

export default OurSolutions;