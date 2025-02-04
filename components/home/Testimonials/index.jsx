import Image from "next/image";
import bpo from "@/public/elements/bpo.jpg";
import liveChat from "@/public/elements/live-chat.png";
import laptop from "@/public/elements/laptop.png";
import factory from "@/public/elements/factory.png";
import "./style.scss";
import { Quote, Star, UserRound } from "lucide-react";

const Testimonials = () => {
  return (
    <section className="testimonials-section flex-center text-white py-20 px-10">
      <p>Testemonials</p>
      <h2 className="font-bold text-4xl text-center px-32 mt-5 mb-10">
        What Our Clients Say
      </h2>
      <div className="flex w-full gap-10">
        <figure className="snip1533">
          <figcaption>
            <blockquote>
              <Quote
                strokeWidth={3}
                fill="black"
                className=" absolute text-black -top-3 left-0 right-0 m-auto rounded-full"
              />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea,
                error molestiae! Sequi non, excepturi iure architecto ratione
              </p>
            </blockquote>
            <h3>Lombe Lusale</h3>
            <h4>Ballo Innovations</h4>
          </figcaption>
        </figure>
        <figure className="snip1533">
          <figcaption>
            <blockquote>
              <Quote
                strokeWidth={3}
                fill="black"
                className=" absolute text-black -top-3 left-0 right-0 m-auto rounded-full"
              />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea,
                error molestiae! Sequi non, excepturi iure architecto ratione
              </p>
            </blockquote>
            <h3>Lombe Lusale</h3>
            <h4>Ballo Innovations</h4>
          </figcaption>
        </figure>
        <figure className="snip1533">
          <figcaption>
            <blockquote>
              <Quote
                strokeWidth={3}
                fill="black"
                className=" absolute text-black -top-3 left-0 right-0 m-auto rounded-full"
              />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea,
                error molestiae! Sequi non, excepturi iure architecto ratione
              </p>
            </blockquote>
            <h3>Lombe Lusale</h3>
            <h4>Ballo Innovations</h4>
          </figcaption>
        </figure>
      </div>
    </section>
  );
};

export default Testimonials;
