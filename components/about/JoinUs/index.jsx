import Image from "next/image";
import skylift from "@/public/elements/skylift.png";
import buildings from "@/public/backgrounds/city_buildings.png";
import "./style.scss";
import { Square } from "lucide-react";

const JoinUs = () => {
  return (
    <section className="join-us flex-center text-[#171717] pt-10 md:pt-32 pb-10 md:pb-20 md:px-20 overflow-visible">
      {/* <Image src={buildings} alt="Shreeji" className="buildings-bg-img absolute bottom-0 right-[0%] w-[100vh] h-[80vh] grayscale opacity-30"/> */}
      <div className="flex flex-col w-full gap-10 relative text-white">
        <div className="w-full flex flex-col gap-5 relative">
          <div className="flex flex-col gap-10">
            <div className="flex gap-3 flex-center flex-1">            
              <form class="bg-white/5 w-[96%] md:w-[90%] mx-auto p-2 md:p-8 flex-center gap-5 pt-10 shadow-[0_0_10px_rgba(0,0,0,0.4)] rounded-lg border-[#e8d9c24f] border-4">            
                <h2 className="font-bold text-6xl text-center md:px-32 my-3">
                  <span className="text-[#171717]">Join Us</span> on Our Journey
                </h2>
                <p className="px-2 md:px-10 pb-5">At Shreeji Investments Limited, we are more than just a technology company—we are partners in your success. Whether you are looking for cutting-edge ICT solutions, enterprise printing, advertising, or system development, we are here to help you achieve your business goals.</p>
                <div className="flex flex-col md:flex-row gap-5 md:gap-0 justify-evenly text-[#524427] font-medium w-full">
                  <div>
                    {/* <label for="name" class="block text-white font-bold">Full Name</label> */}
                    <input type="text" id="name" name="name" placeholder="Full Name" required
                      class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#87703f]"/>
                  </div>

                  <div>
                    {/* <label for="email" class="block text-white font-bold">Email</label> */}
                    <input type="email" id="email" name="email" placeholder="Email" required
                      class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#87703f]"/>
                  </div>

                  <div>
                    {/* <label for="tel" class="block text-white font-bold">Phone Number</label> */}
                    <input type="tel" id="tel" name="phone number" placeholder="Phone Number" required
                      class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#87703f]"/>
                  </div>

                  {/* <div>
                    <label for="message" class="block text-white font-bold">Message</label>
                    <textarea id="message" name="message" rows="4" placeholder="Me" required
                      class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#87703f]"></textarea>
                  </div> */}
                </div>

                <button type="submit"
                  class="w-fit mt-5 mb-10 md:mb-0 px-10 py-2 text-white bg-[#786437] md:bg-[#87703f] rounded-full hover:bg-opacity-90 border-[#e8d9c2] border-2 md:border-4 focus:outline-none focus:ring-2 focus:ring-[#87703f]">
                  Submit
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
