import Image from "next/image";
import "./style.scss";
import expertiseImg from "@/public/elements/team.jpg";
const Team = () => {
  const team = [
    {
      name: 'John Doe',
      position: 'Director',
      image: ""
    },
    {
      name: 'John Doe',
      position: 'Director',
      image: ""
    },
    {
      name: 'John Doe',
      position: 'Director',
      image: ""
    },
    {
      name: 'John Doe',
      position: 'Director',
      image: ""
    },
    {
      name: 'John Doe',
      position: 'Director',
      image: ""
    },
    {
      name: 'John Doe',
      position: 'Director',
      image: ""
    },
  ]
  return (
    <section className="our-team z-[1] bg-white our-team flex flex-col md:flex-row items-center text-[#171717] py-10 md:py-20 px-5 md:px-10 overflow-visible relative gap-10">
      {/* <Image src={buildings} alt="Shreeji" className="buildings-bg-img absolute bottom-0 right-[0%] w-[100vh] h-[80vh] grayscale opacity-30"/> */}
      <div className="flex flex-col gap-10 relative flex-[4]">
        <div className="w-full flex flex-col gap-5 relative">
          <h2 className="w-full font-bold text-6xl mb-5 md:mb-16 text-[var(--primary)] mt-10 flex flex-center relative gap-10">
            <p className="w-fit relative md:bg-[#87703f] z-[1] text-white px-2"><span className="text-[#171717]">Meet</span> Our Team</p>
            <span className="hidden md:flex w-full h-[2px] bg-white absolute z-0 top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2"/>
          </h2>
          <div className="flex flex-col gap-10 md:px-10">
            <p className="text-white">
              Our success is driven by a dedicated team of technology experts, engineers, project managers, and customer service professionals. Each member of the Shreeji family brings unique skills and experiences that contribute to our innovative and customer-centric approach.
              We foster a culture of collaboration, learning, and continuous improvement, ensuring that our team remains at the cutting edge of industry advancements.
            </p>
          </div>
        </div>                   
      </div>

      {/* <div className="flex-[6]">
        <div className="flex justify-center flex-wrap gap-3 md:gap-10">
          {team.map((item, i) => (
            <div className="flex-center gap-5">
              <div className="flex gap-3 items-center flex-center team-member" key={`value-${i}`}>
                <p className="text-center">
                  <span className="font-bold">{item.name}</span> <br /> {item.position}
                </p>
              </div>                
            </div>
          ))}                            
        </div>
      </div> */}
      <div className="flex-[4] hidden md:flex">
        <div className="bg-[#f1eeee] p-2 rounded-sm m-10 mr-20 mt-5 rotate-6 expertise-img-container h-[85vh]">
          <Image src={expertiseImg} className="scale-x-[-1] h-full object-cover rounded-sm -rotate-6 shadow-xl shadow-black/40" />
        </div>
      </div>
    </section>
  );
};

export default Team;
