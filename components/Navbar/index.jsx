"use client";

import { useState, useEffect } from "react";
import {allProducts} from "@/app/data/productsData";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "@/public/logos/Shreeji Logos 3.png";
import logo2 from "@/public/logos/Shreeji Logos w2.png";
import "./style.scss";
import ThemeBtn from "./ThemeBtn";
import { ChevronDown } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServiceMenuOpen, setIsServiceMenuOpen] = useState(false);
  const [productCategories, setProductCategories] = useState([]);
  const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  useEffect(() => {
    // Group categories with their subcategories
    const categoryMap = allProducts.reduce((acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = new Set();
      }
      acc[product.category].add(product.subcategory);
      return acc;
    }, {});

    // Convert sets to arrays
    const structuredCategories = Object.entries(categoryMap).map(([category, subcategories]) => ({
      category,
      subcategories: [...subcategories],
    }));

    setProductCategories(structuredCategories);
  }, []);

  return (
    <header id="website-navigation">
      <nav className={`fixed z-50 w-full transition-all duration-300 ${isScrolled ? "scrolled-nav bg-opacity-100 text-[var(--primary)]" : "bg-white/0"} ${pathname.includes("/products") ? 'scrolled-nav bg-opacity-100 text-[var(--primary)]' : ''}`}>
        <div className="container mx-auto flex items-center p-2">
          <Link href="/" className="text-lg font-bold">
            <Image src={logo} alt="Logo" quality={100} className="logo-light h-10 md:h-16 w-auto nav-logo" />
            <Image src={logo2} alt="Logo" quality={100} className="logo-dark absolute top-[0.5rem] h-10 md:h-16 w-auto nav-logo" />
          </Link>

          {/* Navbar Links */}
          <ul className="hidden md:flex space-x-6 pl-1 py-5 rounded-lg">
            <li><Link href="/" className={`${pathname === "/" ? "active-link" : ""}`}>Home</Link></li>
            <li><Link href="/about-us" className={`${pathname === "/about-us" ? "active-link" : ""}`}>About Us</Link></li>

            {/* Mega Menu Trigger */}
            <li className="group flex items-center">
              <Link
                href="/services"
                className={` ${
                  pathname == "/services"
                    ? "active-link"
                    : ""
                }`}
              >
                Services
              </Link>
              <button
                onMouseEnter={() => setIsServiceMenuOpen(true)} onMouseLeave={() => setIsServiceMenuOpen(false)}
                className="mt-[1px] focus:outline-none"
              >
                <ChevronDown size={24} />
              </button>

              {/* Mega Menu */}
              {isServiceMenuOpen && (
                <div
                  className=" pt-5 absolute left-0 top-10"
                  onMouseEnter={() => setIsServiceMenuOpen(true)} onMouseLeave={() => setIsServiceMenuOpen(false)}
                >
                  <div className="mega-menu">
                    <div>
                      <Link href="/services/it-solutions" className="relative">
                        <h4 className="font-bold text-lg">ICT Solutions</h4>
                        <span className="absolute mt-1 h-[2px] w-full bg-[#dbd4c0] rounded-full" />
                      </Link>
                      <ul className="mt-5 space-y-2">
                        <li><Link href="/services/it-solutions/hardware-and-infrastructure">Hardware & Infrastructure</Link></li>
                        <li><Link href="/services/it-solutions/system-and-platform-development">System & Platform Development</Link></li>
                        <li><Link href="/services/it-solutions/it-consulting-and-managed-services">IT Consulting & Managed Services</Link></li>
                      </ul>
                    </div>
                    <div>
                      <Link href="/services/enterprise-printing-and-Scanning" className="relative">
                        <h4 className="font-bold text-lg">Enterprise-Level Printing & Scanning</h4>
                        <span className="absolute mt-1 h-[2px] w-full bg-[#dbd4c0] rounded-full" />
                      </Link>
                      <ul className="mt-5 space-y-2">
                        <li><Link href="/services/enterprise-printing-and-Scanning/printing">Printing</Link></li>
                        <li><Link href="/services/enterprise-printing-and-Scanning/scanning">Document Scanning</Link></li>
                      </ul>
                    </div>
                    <div>
                      <Link href="/services/bpo" className="relative">
                        <h4 className="font-bold text-lg">Business Process Outsourcing (BPO)</h4>
                        <span className="absolute mt-1 h-[2px] w-full bg-[#dbd4c0] rounded-full" />
                      </Link>
                      <ul className="mt-5 space-y-2">
                        <li><Link href="/services/bpo/sim-registration-and-management">SIM Registration & Management</Link></li>
                        <li><Link href="/services/bpo/mobile-money-services">Mobile Money Services</Link></li>
                        <li><Link href="/services/bpo/quality-assurance">Quality Assurance</Link></li>
                        <li><Link href="/services/bpo/customer-support-services">Customer Support Services</Link></li>
                        <li><Link href="/services/bpo/back-office-support">Back Office Support</Link></li>
                        <li><Link href="/services/bpo/risk-and-compliance-management">Risk & Compliance Management</Link></li>
                      </ul>
                    </div>
                    <div>
                      <Link href="/services/skylift" className="relative">
                        <h4 className="font-bold text-lg">Skylift Services</h4>
                        <span className="absolute mt-1 h-[2px] w-full bg-[#dbd4c0] rounded-full" />
                      </Link>
                      <ul className="mt-5 space-y-2">
                        <li><Link href="/services/skylift">Skylift Services</Link></li>                        
                      </ul>
                    </div>                    
                  </div>
                </div>
              )}
            </li>

            <li className="group flex gap-1">
              <Link href="/products" className={`${pathname === "/products" ? "active-link" : ""}`}>Products</Link>
              <button onMouseEnter={() => setIsProductMenuOpen(true)} onMouseLeave={() => setIsProductMenuOpen(false)} className="focus:outline-none">
                <ChevronDown size={24} />
              </button>

              {/* Mega Menu */}
              {isProductMenuOpen && (
                <div className=" pt-5 absolute left-0 top-10" onMouseEnter={() => setIsProductMenuOpen(true)} onMouseLeave={() => setIsProductMenuOpen(false)}>
                  <div className="mega-menu">
                    {productCategories && productCategories.map(({ category, subcategories }, index) => (
                      <div>                        
                        <Link href={`/products/${encodeURIComponent(category)}`} className="font-medium cursor-pointer relative">
                          <h4 className="font-bold text-lg">{category}</h4>
                          <span className="absolute mt-1 h-[2px] w-full bg-[#dbd4c0] rounded-full" />
                        </Link>                       

                        {subcategories[0] ? (
                          <ul className="mt-5 space-y-2">
                            {subcategories.map((sub, subIndex) => (
                              <li key={subIndex}>
                                <Link href={`/products/${encodeURIComponent(category)}/${encodeURIComponent(sub)}`} className="font-medium cursor-pointer">{sub}</Link>
                              </li>                            
                            ))}                          
                          </ul>
                          ) : (
                            <ul className="mt-5 space-y-2">
                              <li>
                                <Link href={`/products/${encodeURIComponent(category)}`} className="font-medium cursor-pointer">{category}</Link>
                              </li>                      
                          </ul>
                          )
                        }                        
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </li>
            <li><Link href="/collaborate-with-us" className={`${pathname === "/collaborate-with-us" ? "active-link" : ""}`}>Collaborate</Link></li>
            <li><Link href="/contact-us" className={`${pathname === "/contact-us" ? "active-link" : ""}`}>Contact Us</Link></li>
          </ul>

          <ThemeBtn isScrolled={isScrolled} />
          
          {/* Mobile Menu Button */}
          <button className="block md:hidden focus:outline-none" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg className="w-9 h-9" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
