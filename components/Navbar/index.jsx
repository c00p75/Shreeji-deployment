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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServiceMenuOpen, setIsServiceMenuOpen] = useState(false);
  const [productCategories, setProductCategories] = useState([]);
  const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);

  const links = {
    services: [
      { 
        'name': 'ICT Solutions',
        'link': '/services/it-solutions',
        'sub-links': [
          {
            'title': 'Hardware & Infrastructure',
            'link': '/services/it-solutions/hardware-and-infrastructure'
          },
          {
            'title': 'System & Platform Development',
            'link': '/services/it-solutions/system-and-platform-development'
          },
          {
            'title': 'IT Consulting & Managed Services',
            'link': '/services/it-solutions/it-consulting-and-managed-services'
          },
        ]
      },
      {
        'name': 'Enterprise-Level Printing & Scanning',
        'link': '/services/enterprise-printing-and-scanning',
        'sub-links': [
          {
            'title': 'Printing',
            'link': '/services/enterprise-printing-and-scanning/printing'
          },
          {
            'title': 'Document Scanning',
            'link': '/services/enterprise-printing-and-scanning/scanning'
          },
        ]
      },
      {
        'name': 'Business Process Outsourcing (BPO)',
        'link': '/services/bpo',
        'sub-links': [
          {
            'title': 'Back Office Support',
            'link': '/services/bpo/back-office-support'
          },
          {
            'title': 'Customer Support Services',
            'link': '/services/bpo/customer-support-services'
          },
          {
            'title': 'Tele-Marketing',
            'link': '/services/bpo/tele-marketing-services'
          },
          {
            'title': 'SIM Registration & Management',
            'link': '/services/bpo/sim-registration-and-management'
          },
          // {
          //   'title': 'Mobile Money Services',
          //   'link': '/services/bpo/mobile-money-services'
          // },
          {
            'title': 'Quality Assurance',
            'link': '/services/bpo/quality-assurance'
          },
          {
            'title': 'Risk & Compliance Management',
            'link': '/services/bpo/risk-and-compliance-management'
          },
        ]
      },
      {
        'name': 'Skylift Services',
        'link': '/services/skylift',
        'sub-links': [
          {
            'title': 'Skylift Services',
            'link': '/services/skylift'
          },
        ]
      },
    ]
  }
  
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth < 1024) {
      setIsScrolled(true);
    }
    const handleScroll = () => {
      if (window.innerWidth >= 1024) {
        setIsScrolled(window.scrollY > 10)
      } else {
        setIsScrolled(true);
      }
    };
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

          {/*Navbar Links */}
          <ul id="navbar-links" className={`flex space-x-6 pl-1 py-5 rounded-lg ${isMobileMenuOpen ? 'mobile-menu-open': 'mobile-menu-closed'}`}>
            <li><Link href="/" className={`${pathname === "/" ? "active-link" : ""}`} onClick={() => setIsMobileMenuOpen(false)}>Home</Link></li>            

            {/* Mege Menus Start */}

            {/* Desktop Mega Menu Trigger */}   
            <li className="group flex gap-1">
              <Link href="/products" className={`${pathname === "/products" ? "active-link" : ""}`} onMouseEnter={() => setIsProductMenuOpen(true)} onMouseLeave={() => setIsProductMenuOpen(false)}>
                Products
              </Link>
              <button onMouseEnter={() => setIsProductMenuOpen(true)} onMouseLeave={() => setIsProductMenuOpen(false)} className="focus:outline-none -ml-5 pl-5">
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
                                <Link
                                  href={`/products/${encodeURIComponent(category)}/${encodeURIComponent(sub)}`}
                                  className={`font-medium cursor-pointer ${pathname === `/products/${encodeURIComponent(category)}/${encodeURIComponent(sub)}` ? "mega-menu-active-link  " : ""}`}
                                >
                                    {sub}
                                </Link>
                              </li>                            
                            ))}                          
                          </ul>
                          ) : (
                            <ul className="mt-5 space-y-2">
                              <li>
                                <Link className={`font-medium cursor-pointer ${pathname === `/products/${encodeURIComponent(category)}` ? "mega-menu-active-link  " : ""}`} href={`/products/${encodeURIComponent(category)}`}>{category}</Link>
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

            <li className="group flex items-center">
              <Link
                href="/services"
                className={` ${
                  pathname == "/services"
                    ? "active-link"
                    : ""
                }`}
                onMouseEnter={() => setIsServiceMenuOpen(true)} onMouseLeave={() => setIsServiceMenuOpen(false)}
              >
                Services
              </Link>
              <button
                onMouseEnter={() => setIsServiceMenuOpen(true)} onMouseLeave={() => setIsServiceMenuOpen(false)}
                className="mt-[1px] focus:outline-none -ml-5 pl-5"
              >
                <ChevronDown size={24} />
              </button>

              {/* Mega Menu */}
              {isServiceMenuOpen && (
                <div
                  className="mega-menu-container pt-5 absolute left-0 top-10"
                  onMouseEnter={() => setIsServiceMenuOpen(true)} onMouseLeave={() => setIsServiceMenuOpen(false)}
                >                  
                  <div className="mega-menu">
                    {links.services.map((service, index) => (
                      <div key={service}>
                        <Link href={service['link']} className="relative">
                          <h4 className="font-bold text-lg">{service['name']}</h4>
                          <span className="absolute mt-1 h-[2px] w-full bg-[#dbd4c0] rounded-full" />
                        </Link>

                        <ul className="mt-5 space-y-2">
                          {service['sub-links'].map((link, index) => (
                            <li key={index}>
                              <Link
                                href={link['link']}
                                className={`${pathname === link['link'] ? "mega-menu-active-link  " : ""}`}
                              >
                                {link['title']}
                              </Link>
                            </li>
                          ))}                        
                        </ul>
                      </div>
                    ))}                                 
                  </div>
                </div>
              )}
            </li>

            {/* Mobile Mega Menu Products */}
            
            <li tabIndex={1} className="lg:hidden mobile-link collapse collapse-plus">
              <input type="checkbox" className="peer" />
              <div className="collapse-title" />
              <Link href="/products" className={`absolute z-[2] top-4 left-4 ${ pathname == "/services" ? "active-link" : ""}`} onClick={() => setIsMobileMenuOpen(false)}>
                Products
              </Link>
              <div
                className="collapse-content"
              >
                {productCategories && productCategories.map(({ category, subcategories }, index) => (
                    <div>                        
                      <Link href={`/products/${encodeURIComponent(category)}`} className="font-medium cursor-pointer relative" onClick={() => setIsMobileMenuOpen(false)}>
                        <h4 className="font-bold text-lg">{category}</h4>
                        <span className="absolute mt-1 h-[2px] w-full bg-[#dbd4c0] rounded-full" />
                      </Link>                       

                      {subcategories[0] ? (
                        <ul className="mt-5 space-y-2">
                          {subcategories.map((sub, subIndex) => (
                            <li key={subIndex}>
                              <Link
                                href={`/products/${encodeURIComponent(category)}/${encodeURIComponent(sub)}`}
                                className={`font-medium cursor-pointer ${pathname === `/products/${encodeURIComponent(category)}/${encodeURIComponent(sub)}` ? "mega-menu-active-link  " : ""}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                  {sub}
                              </Link>
                            </li>                            
                          ))}                          
                        </ul>
                        ) : (
                          <ul className="mt-5 space-y-2">
                            <li>
                              <Link className={`font-medium cursor-pointer ${pathname === `/products/${encodeURIComponent(category)}` ? "mega-menu-active-link  " : ""}`} href={`/products/${encodeURIComponent(category)}`} onClick={() => setIsMobileMenuOpen(false)}>
                                {category}
                              </Link>
                            </li>                      
                        </ul>
                        )
                      }                        
                    </div>
                  ))}                              
              </div>
            </li>

            {/* Mobile Mega Menu Serices */}
            <li tabIndex={0} className="lg:hidden mobile-link collapse collapse-plus">
              <input type="checkbox" className="peer" />
              <div className="collapse-title" />                
              <Link onClick={() => setIsMobileMenuOpen(false)} href="/services" className={`absolute z-[2] top-4 left-4 ${ pathname == "/services" ? "active-link" : ""}`}>
                Services
              </Link>
              <div
                className="collapse-content"
              >
                {links.services.map((service, index) => (
                  <div key={service}>
                    <Link href={service['link']} className="relative" onClick={() => setIsMobileMenuOpen(false)}>
                      <h4 className="font-bold text-lg">{service['name']}</h4>
                      <span className="absolute mt-1 h-[2px] w-full bg-[#dbd4c0] rounded-full" />
                    </Link>

                    <ul className="mt-5 space-y-2">
                      {service['sub-links'].map((link, index) => (
                        <li key={index}>
                          <Link
                            href={link['link']}
                            className={`${pathname === link['link'] ? "mega-menu-active-link  " : ""}`}
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {link['title']}
                          </Link>
                        </li>
                      ))}                        
                    </ul>
                  </div>
                ))}                                 
              </div>
            </li>
            
            {/* Mege Menus End */}

            <li><Link href="/about-us" className={`${pathname === "/about-us" ? "active-link" : ""}`} onClick={() => setIsMobileMenuOpen(false)}>About Us</Link></li>

            <li>
              <Link href="/collaborations" className={`${pathname === "/collaborations" ? "active-link" : ""}`} onClick={() => setIsMobileMenuOpen(false)}>Collaborations</Link>
            </li>
            <li>
              <Link href="/contact-us" className={`${pathname === "/contact-us" ? "active-link" : ""}`} onClick={() => setIsMobileMenuOpen(false)}>Contact Us</Link>
            </li>
          </ul>

          <ThemeBtn isScrolled={isScrolled} />
          
          {/* Mobile Menu Button */}
          <button className="fixed right-5 lg:hidden focus:outline-none" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <svg className="w-9 h-9" fill="none" stroke={isMobileMenuOpen ? "white" : isScrolled ? "#807045" : "white"} strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
