import Image from "next/image";
import skylift from "@/public/elements/skylift.png";
import buildings from "@/public/backgrounds/city_buildings.png";
import "./style.scss";
import { Square } from "lucide-react";

const MissionVision = () => {
  const values = [
    {
      title: 'Striving for Excellence',
      value: 'We continuously push boundaries to provide top-tier solutions.',
    },
    {
      title: 'Happy & Satisfied Customers',
      value: 'Our success is measured by the satisfaction of our clients.',
    },
    {
      title: 'Affordability for All',
      value: 'We believe in providing high-quality services at competitive prices.',
    },
    {
      title: 'Team Spirit & Collaboration',
      value: 'A strong, unified team ensures efficiency and creativity in every project.',
    },
    {
      title: 'Impeccable Ethics',
      value: 'Honesty and integrity are non-negotiable in our dealings.',
    },
    {
      title: 'Responsibility with Accountability',
      value: 'We take ownership of our work and ensure reliability in every service.',
    },
    {
      title: 'Simple & Efficient Systems',
      value: 'Our goal is to simplify complex processes for seamless user experiences.',
    },
  ]
  return (
    <section className="mission-vision-section flex-center text-[#171717] pt-10 px-10 overflow-visible">
      {/* <Image src={buildings} alt="Shreeji" className="buildings-bg-img absolute bottom-0 right-[0%] w-[100vh] h-[80vh] grayscale opacity-30"/> */}
      <div className="flex flex-col w-full gap-10 relative">
        <div className="w-[60%] flex flex-col gap-5 relative">
          <h2 className="font-bold text-6xl text-center px-32 mb-10 text-[var(--primary)]">
            Our <span className="text-[#171717]">Mission</span>
          </h2>
          <div className="flex flex-col gap-10">
            <p className="">
            "We may not have the answer, but we’ll find it.
            We may not have the time, but we’ll make it.
            We may not be the biggest, but we’ll be the most committed to your success."
            At Shreeji Investments Limited, our mission is to provide innovative, reliable, and efficient technology and business solutions tailored to the needs of our clients. We are driven by a passion for delivering excellence, ensuring that every project we undertake results in customer satisfaction and long-term success.
            </p>
          </div>
        </div>

        <div>
          <h2 className="font-bold text-6xl text-center px-32 mb-10 text-[var(--primary)]">
            Our <span className="text-[#171717]">Values</span>
          </h2>

          <p className="">
            At the core of our operations are values that define our approach to business and customer service:
          </p>
          
          <div className="flex flex-col gap-5 ml-[7rem]">
            {values.map((item, i) => (
              <div className="flex gap-3 items-center" key={`value-${i}`}>
                <span>
                  <Square className="w-4 h-4" fill="#171717" strokeWidth={3} />
                </span>
                <p><span className="font-bold">{item.title}</span> - {item.value}</p>                
              </div>
            ))}                            
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
