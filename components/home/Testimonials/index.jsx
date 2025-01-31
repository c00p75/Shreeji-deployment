import Image from "next/image";
import bpo from "@/public/elements/bpo.jpg";
import liveChat from "@/public/elements/live-chat.png";
import laptop from "@/public/elements/laptop.png";
import factory from "@/public/elements/factory.png";
import "./style.scss";
import { Star, UserRound } from "lucide-react";

const Testimonials = () => {
  return (
    <section className="testimonials-section flex-center text-white py-20 px-10">
      <p>Testemonials</p>
      <h2 className="font-bold text-4xl text-center px-32 mt-5 mb-10">
        What Our Clients Say
      </h2>
      <div className="flex w-full gap-10">
        <div className="w-1/3 flex flex-col card gap-5">
          <div className="flex justify-between items-center">
            <UserRound fill="white" className="h-10 w-10 text-[white]" />
            <div className="mx-10">
              <span className="text-2xl font-bold">BalloInnovations</span>
              <span className="flex gap-2 text-[gold]">
                <Star fill="gold" />
                <Star fill="gold" />
                <Star fill="gold" />
                <Star fill="gold" />
                <Star fill="gold" />
              </span>
            </div>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error,
            suscipit minima sunt cum laboriosam eaque autem? Illum modi placeat
            inventore, nemo nihil harum provident debitis quidem libero
          </p>
        </div>

        <div className="w-1/3 flex flex-col card gap-5">
          <div className="flex justify-between items-center">
            <UserRound fill="white" className="h-10 w-10 text-[white]" />
            <div className="mx-10">
              <span className="text-2xl font-bold">BalloInnovations</span>
              <span className="flex gap-2 text-[gold]">
                <Star fill="gold" />
                <Star fill="gold" />
                <Star fill="gold" />
                <Star fill="gold" />
                <Star fill="gold" />
              </span>
            </div>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error,
            suscipit minima sunt cum laboriosam eaque autem? Illum modi placeat
            inventore, nemo nihil harum provident debitis quidem libero
          </p>
        </div>

        <div className="w-1/3 flex flex-col card gap-5">
          <div className="flex justify-between items-center">
            <UserRound fill="white" className="h-10 w-10 text-[white]" />
            <div className="mx-10">
              <span className="text-2xl font-bold">BalloInnovations</span>
              <span className="flex gap-2 text-[gold]">
                <Star fill="gold" />
                <Star fill="gold" />
                <Star fill="gold" />
                <Star fill="gold" />
                <Star fill="gold" />
              </span>
            </div>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error,
            suscipit minima sunt cum laboriosam eaque autem? Illum modi placeat
            inventore, nemo nihil harum provident debitis quidem libero
          </p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
