import "./style.scss";
import footerLogo from "@/public/logos/Shreeji Logos w1.png";
import footerBg from "@/public/backgrounds/footer-bg.jpeg";
import Image from "next/image";

const Footer = () => {
  return (
    <section className="footer-section relative">
      <video
        className="absolute left-0 top-0 w-full h-full object-cover rounded-lg z-0"
        muted
        loop
        autoPlay
        playsInline
        src="/videos/black-bg.mp4"
      />

      <div className="footer-overlay" />
      <div className="footer-content z-[2] flex text-white gap-5 relative">
        <div className="flex-1 flex flex-col gap-5">
          <Image
            src={footerLogo}
            alt="Shreeji"
            quality={100}
            className="h-10 md:h-16 w-auto nav-logo"
          />

          <p>
            At Shreeji Investments, we deliver proven excellence across IT, BPO,
            print advertising, and skylift services, driven by innovation and
            client satisfaction.
          </p>
        </div>
        <div className="flex-1 flex flex-col">
          <h2>Information</h2>
          <p>About Us</p>
          <p>Privacy & Policy</p>
          <p>Terms & Conditions</p>
        </div>
        <div className="flex-1 flex flex-col">
          <h2>Our Social</h2>
          <p>Facebook</p>
          <p>Twitter</p>
          <p>RSS</p>
          <p>YouTube</p>
        </div>
        <div className="flex-1 flex flex-col">
          <h2>Openning Time</h2>
          <p>Mon - Fri: 08:00am - 05:00pm</p>
          <p>Shreeji House, Plot No. 1209, Addis Ababa Drive</p>
          <p>+260 97 774 0588</p>
          <p>sales@shreeji.co.zm</p>
        </div>
      </div>
    </section>
  );
};

export default Footer;
