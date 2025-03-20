import Image from "next/image";
import skylift from "@/public/elements/skylift.png";
import buildings from "@/public/backgrounds/city_buildings.png";
import "./style.scss";
import { Square } from "lucide-react";

const JoinUs = () => {
  return (
    <section className="join-us flex-center text-[#171717] pt-32 pb-20 px-10 overflow-visible">
      {/* <Image src={buildings} alt="Shreeji" className="buildings-bg-img absolute bottom-0 right-[0%] w-[100vh] h-[80vh] grayscale opacity-30"/> */}
      <div className="flex flex-col w-full gap-10 relative text-white">
        <div className="w-full flex flex-col gap-5 relative">
          <h2 className="font-bold text-6xl text-center px-32 mb-10">
          <span className="text-[#171717]">Join Us</span> on Our Journey
          </h2>
          <div className="flex flex-col gap-10">
            <div className="flex gap-3 flex-center flex-1">            
              <form class="w-[50%] mx-auto p-6 space-y-6 shadow-2xl rounded-lg">            
                
                <p className="mb-10 text-5xl font-semibold text-center">{`Let's innovate together :)`}</p>  

                <p>At Shreeji Investments Limited, we are more than just a technology company—we are partners in your success. Whether you are looking for cutting-edge ICT solutions, enterprise printing, advertising, or system development, we are here to help you achieve your business goals.</p>

                <div>
                  <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                  <input type="text" id="name" name="name" required
                    class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#87703f]"/>
                </div>

                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                  <input type="email" id="email" name="email" required
                    class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#87703f]"/>
                </div>

                <div>
                  <label for="message" class="block text-sm font-medium text-gray-700">Message</label>
                  <textarea id="message" name="message" rows="4" required
                    class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#87703f]"></textarea>
                </div>

                <button type="submit"
                  class="w-full p-3 text-white bg-[#87703f] rounded-lg hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-[#87703f]">
                  Send Message
                </button>
              </form>
                             
            </div>
          </div>
        </div>                 
      </div>
    </section>
  );
};

export default JoinUs;
