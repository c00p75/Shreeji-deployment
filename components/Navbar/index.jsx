"use client";

import { useState, useEffect } from "react";
import logo from "@/public/logos/Shreeji Logos 3.png";
import logo2 from "@/public/logos/Shreeji Logos w2.png";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./style.scss";

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Toggle menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close the menu
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Detect scroll
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <button
        onClick={scrollToTop}
        className={`fixed bottom-5 right-1 md:right-5 z-20 transition-all ${
          isScrolled ? "opacity-1" : "opacity-0"
        }`}
      >
        <button className="button">
          <svg className="svgIcon" viewBox="0 0 384 512">
            <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"></path>
          </svg>
        </button>
      </button>

      <Link
        target="_"
        href="https://wa.me/+260974594654"
        className={`fixed bottom-24 right-2 md:right-6 z-20 transition-all ${
          isScrolled ? "opacity-1" : "opacity-0"
        }`}
      >
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-14 md:w-14"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16 31C23.732 31 30 24.732 30 17C30 9.26801 23.732 3 16 3C8.26801 3 2 9.26801 2 17C2 19.5109 2.661 21.8674 3.81847 23.905L2 31L9.31486 29.3038C11.3014 30.3854 13.5789 31 16 31ZM16 28.8462C22.5425 28.8462 27.8462 23.5425 27.8462 17C27.8462 10.4576 22.5425 5.15385 16 5.15385C9.45755 5.15385 4.15385 10.4576 4.15385 17C4.15385 19.5261 4.9445 21.8675 6.29184 23.7902L5.23077 27.7692L9.27993 26.7569C11.1894 28.0746 13.5046 28.8462 16 28.8462Z"
              fill="#BFC8D0"
            ></path>
            <path
              d="M28 16C28 22.6274 22.6274 28 16 28C13.4722 28 11.1269 27.2184 9.19266 25.8837L5.09091 26.9091L6.16576 22.8784C4.80092 20.9307 4 18.5589 4 16C4 9.37258 9.37258 4 16 4C22.6274 4 28 9.37258 28 16Z"
              fill="url(#paint0_linear_87_7264)"
            ></path>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16 30C23.732 30 30 23.732 30 16C30 8.26801 23.732 2 16 2C8.26801 2 2 8.26801 2 16C2 18.5109 2.661 20.8674 3.81847 22.905L2 30L9.31486 28.3038C11.3014 29.3854 13.5789 30 16 30ZM16 27.8462C22.5425 27.8462 27.8462 22.5425 27.8462 16C27.8462 9.45755 22.5425 4.15385 16 4.15385C9.45755 4.15385 4.15385 9.45755 4.15385 16C4.15385 18.5261 4.9445 20.8675 6.29184 22.7902L5.23077 26.7692L9.27993 25.7569C11.1894 27.0746 13.5046 27.8462 16 27.8462Z"
              fill="white"
            ></path>
            <path
              d="M12.5 9.49989C12.1672 8.83131 11.6565 8.8905 11.1407 8.8905C10.2188 8.8905 8.78125 9.99478 8.78125 12.05C8.78125 13.7343 9.52345 15.578 12.0244 18.3361C14.438 20.9979 17.6094 22.3748 20.2422 22.3279C22.875 22.2811 23.4167 20.0154 23.4167 19.2503C23.4167 18.9112 23.2062 18.742 23.0613 18.696C22.1641 18.2654 20.5093 17.4631 20.1328 17.3124C19.7563 17.1617 19.5597 17.3656 19.4375 17.4765C19.0961 17.8018 18.4193 18.7608 18.1875 18.9765C17.9558 19.1922 17.6103 19.083 17.4665 19.0015C16.9374 18.7892 15.5029 18.1511 14.3595 17.0426C12.9453 15.6718 12.8623 15.2001 12.5959 14.7803C12.3828 14.4444 12.5392 14.2384 12.6172 14.1483C12.9219 13.7968 13.3426 13.254 13.5313 12.9843C13.7199 12.7145 13.5702 12.305 13.4803 12.05C13.0938 10.953 12.7663 10.0347 12.5 9.49989Z"
              fill="white"
            ></path>
            <defs>
              <linearGradient
                id="paint0_linear_87_7264"
                x1="26.5"
                y1="7"
                x2="4"
                y2="28"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#5BD066"></stop>
                <stop offset="1" stopColor="#27B43E"></stop>
              </linearGradient>
            </defs>
          </g>
        </svg>
      </Link>

      <nav
        className={`fixed md:px-20 z-50 w-full transition-all duration-300
        ${
          isScrolled
            ? "scrolled-nav bg-white bg-opacity-100 text-[var(--primary)]"
            : "bg-[#0d1520]/0"
        }      
      `}
      >
        <div className="container mx-auto flex items-center justify-between p-2">
          <Link href="/" className="text-lg font-bold">
            <Image
              src={isScrolled ? logo : logo2}
              alt="Logo"
              quality={100}
              className="h-10 md:h-16 w-auto nav-logo"
            />
          </Link>

          <ul className="hidden md:flex space-x-6 pl-1 py-5 rounded-lg">
            <li>
              <Link
                href="/"
                className={` ${
                  pathname == "/" ? "active-link" : "hover:text-gray-300"
                }`}
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                href="/about-us"
                className={` ${
                  pathname == "/about-us"
                    ? "active-link"
                    : "hover:text-gray-300"
                }`}
              >
                About Us
              </Link>
            </li>

            <li>
              <Link
                href="/services"
                className={` ${
                  pathname == "/services"
                    ? "active-link"
                    : "hover:text-gray-300"
                }`}
              >
                Services
              </Link>
            </li>

            <li>
              <Link
                href="/impact-and-sustainability"
                className={` ${
                  pathname == "/impact-and-sustainability"
                    ? "active-link"
                    : "hover:text-gray-300"
                }`}
              >
                Products
              </Link>
            </li>

            <li>
              <Link
                href="/collaborate-with-us"
                className={` ${
                  pathname == "/collaborate-with-us"
                    ? "active-link"
                    : "hover:text-gray-300"
                }`}
              >
                Collaborate
              </Link>
            </li>

            <li>
              <Link
                href="/contact-us"
                className={` ${
                  pathname == "/contact-us"
                    ? "active-link"
                    : "hover:text-gray-300"
                }`}
              >
                Contact Us
              </Link>
            </li>
          </ul>

          <button
            className="block md:hidden focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              className="w-9 h-9"
              fill="none"
              stroke="white"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              ></path>
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={closeMenu}
          ></div>
        )}

        <div
          className={`fixed top-0 right-0 h-full w-64 bg-gray-800 z-50 transform transition-transform duration-300 ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="w-full flex justify-end">
            <button
              className="text-white m-4 focus:outline-none"
              onClick={closeMenu}
            >
              <svg
                viewBox="0 0 1024 1024"
                xmlns="http://www.w3.org/2000/svg"
                fill="#ffffff"
                stroke="#ffffff"
                height={30}
                width={30}
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    fill="#ffffff"
                    d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"
                  ></path>
                </g>
              </svg>
            </button>
          </div>
          <ul className="space-y-8 p-4">
            <li>
              <Link
                href="/"
                className="block text-white hover:text-gray-300"
                onClick={closeMenu}
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                href="/about-us"
                className="block text-white hover:text-gray-300"
                onClick={closeMenu}
              >
                About Us
              </Link>
            </li>

            <li>
              <Link
                href="/services"
                className="block text-white hover:text-gray-300"
                onClick={closeMenu}
              >
                Services
              </Link>
            </li>

            <li>
              <Link
                href="/impact-and-sustainability"
                className="block text-white hover:text-gray-300"
                onClick={closeMenu}
              >
                Products
              </Link>
            </li>

            <li>
              <Link
                href="/collaborate-with-us"
                className="block text-white hover:text-gray-300"
                onClick={closeMenu}
              >
                Collaborate
              </Link>
            </li>

            <li>
              <Link
                href="/contact-us"
                className="block text-white hover:text-gray-300"
                onClick={closeMenu}
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
