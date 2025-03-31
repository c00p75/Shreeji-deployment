import "./style.scss";
import footerLogo from "@/public/logos/Shreeji Logos w1.png";
import footerBg from "@/public/backgrounds/footer-bg.jpeg";
import Image from "next/image";
import { Facebook, Linkedin } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <section className="footer-section relative">
      <div className="footer-overlay" />
      <div className="footer-content z-[2] flex text-white gap-5 relative flex-wrap">
        <div className="footer-logo w-full sm:w-[30%] flex flex-col gap-10 mb-10 sm:mb-0 mr-10">
          <Image
            src={footerLogo}
            alt="Shreeji"
            quality={100}
            className="w-full h-auto md:h-16"
          />
          <p>
            At Shreeji Investments, we deliver proven excellence across IT, BPO,
            print advertising, and skylift services, driven by innovation and
            client satisfaction.
          </p>
        </div>
        <div className="footer-info w-full sm:w-[22%] flex-1 flex flex-col gap-5 mb-10 sm:mb-0">
          <h2>Information</h2>
          <p>About Us</p>
          <p>Privacy & Policy</p>
          <p>Terms & Conditions</p>
        </div>

        <div className="footer-social w-full sm:w-[22%] flex-1 flex flex-col gap-5 mb-10 sm:mb-0">
          <h2>Our Social</h2>
          <p className="flex items-center gap-2">
            <Linkedin strokeWidth={1} color="#807045" />
            <span className="pt-1">LinkedIn</span>
          </p>
          <p className="flex items-center gap-2">
            <Facebook color="#807045" strokeWidth={1} />
            <span className="py-1">Facebook</span>
          </p>
        </div>

        <div className="footer-contact w-full sm:w-[22%] flex-1 flex flex-col gap-5 mb-10 sm:mb-0">
          <h2>Opening Time</h2>
          <p>Mon - Fri: 08:00am - 05:00pm</p>
          <p>Shreeji House, Plot No. 1209, Addis Ababa Drive</p>
          <p>+260 97 774 0588</p>
          <p>sales@shreeji.co.zm</p>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center z-[2] relative text-white mt-14 gap-2">
        <p className="text-[1rem] text-[#ece5de] font-extralight">
          Designed & created by <Link href="https://www.balloinnovations.com/" className="font-semibold hover:underline">Ballo Innovations</Link>
        </p>
        <p>
          ©2025 Shreeji Investments Limited Limited. All Rights Reserved
        </p>
      </div>
    </section>
  );
};

export default Footer;
