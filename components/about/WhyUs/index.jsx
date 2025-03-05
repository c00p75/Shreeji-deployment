import Image from "next/image";
import skylift from "@/public/elements/skylift.png";
import buildings from "@/public/backgrounds/city_buildings.png";
import "./style.scss";
import { Square } from "lucide-react";

const WhyUs = () => {
  const team = [
    {
      title: 'Experience & Expertise',
      description: 'Over 25 years of industry experience delivering high-quality solutions.'
    },
    {
      title: 'Innovation & Adaptability',
      description: 'We stay ahead of technological trends to provide future-proof solutions.'
    },
    {
      title: 'Nationwide Reach',
      description: 'Extensive experience in large-scale projects across Zambia.'
    },
    {
      title: 'Customer-First Approach',
      description: 'Every solution is tailored to meet and exceed client expectations.'
    },
    {
      title: 'Comprehensive Service Portfolio',
      description: 'From ICT and printing to advertising and software development, we provide end-to-end business solutions.'
    },
  ];
  return (
    <section className="why-us flex flex-row-reverse text-[#171717] pt-32 overflow-visible px-20">
      {/* <Image src={buildings} alt="Shreeji" className="buildings-bg-img absolute bottom-0 right-[0%] w-[100vh] h-[80vh] grayscale opacity-30"/> */}
      <div className="flex flex-col gap-10 relative flex-[3]">
        <div className="flex flex-col gap-5 relative">
          <h2 className="font-bold text-6xl text-center mb-10 text-[var(--primary)]">
            Why <span className="text-[#171717]">Choose</span> Shreeji Investments Limited?
          </h2>
          <div className="flex flex-col gap-10">
            <p className="">
              Our success is driven by a dedicated team of technology experts, engineers, project managers, and customer service professionals. Each member of the Shreeji family brings unique skills and experiences that contribute to our innovative and customer-centric approach.
              We foster a culture of collaboration, learning, and continuous improvement, ensuring that our team remains at the cutting edge of industry advancements.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-5 ml-[3rem]">
          {team.map((item, i) => (
            <div className="flex gap-3 items-center" key={`value-${i}`}>
              <span>
                <Square className="w-4 h-4" fill="#171717" strokeWidth={3} />
              </span>
              <p><span className="font-bold">{item.title}</span> - {item.description}</p>                
            </div>
          ))}                            
        </div>                  
      </div>

      <div className="flex-[2]">
        <div className="w-[90%] h-[80%] bg-stone-700 mt-28 rounded-md" />
      </div>
    </section>
  );
};

export default WhyUs;
