import { brandLogo, productImages } from "./productImages"

export const allProducts = [
  {
    "name": "HP Envy MOVE",
    "category": "Computers",
    "subcategory": "All in One",
    "images": [
      productImages.hpEnvyMoveAllInOne24,
      productImages.hpEnvyMoveAllInOne24_2,
      productImages.hpEnvyMoveAllInOne24_3,
      
    ],
    "brand": "HP",
    "brand logo": brandLogo.HP,
    "specs": {
      "processor": "Intel Core i5/i7/i9",
      "display": "23.8-inch FHD Touchscreen",
      "RAM": "8GB/16GB DDR4",
      "storage": "256GB/512GB SSD",
      "battery": "Built-in, portable design"
    },
    "date-added": "2025-3-6",
    "tagline": "Power, Performance, Portability.",
    "description": "Perfect for professionals who need power on the go.",
    "price": "K30,000",
    "discounted price": "K25,000",
    "special feature": {
      "stat": '8',
      'stat text size': 8,
      "symbol": "+",
      "feature": "Hours Battery Charge"
    }
  },
  {
    "name": "HP EliteOne",
    "category": "Computers",
    "subcategory": "All in One",
    "images": [      
      productImages.HPEliteOne870G9AllInOne_2,
      productImages.HPEliteOne870G9AllInOne,
      productImages.HPEliteOne870G9AllInOne_3
    ],
    "brand": "HP",
    "brand logo": brandLogo.HP,
    "specs": {
      "processor": "Intel Core i5/i7",
      "display": "23.8-inch/27-inch FHD Touchscreen",
      "RAM": "8GB/16GB DDR4",
      "storage": "256GB/512GB SSD"
    },
    "date-added": "2025-3-6",
    "tagline": "A premium All in One for business and home.",
    "description": "Designed for productivity and style.",
    "price": "K35,000",
    "discounted price": "K30,000",
    "special feature": {
      "stat": '8',
      "symbol": "+",
      'stat text size': 8,
      "feature": "Hours Battery Charge"
    }
  },
  {
    "name": "Lenovo YOGA AIO",
    "category": "Computers",
    "subcategory": "All in One",
    "images": [
      productImages.YogaAIO9i,
      productImages.YogaAIO9i_2,
      productImages.YogaAIO9i_3,
    ],
    "brand": "Lenovo",
    "brand logo": brandLogo.Lenovo,
    "specs": {
      "processor": "AMD Ryzen 7/Intel Core i7",
      "display": "27-inch 4K UHD Touchscreen",
      "RAM": "16GB/32GB DDR4",
      "storage": "512GB/1TB SSD",
      "Graphics":'Integrated Intel® Iris® Xe Graphics, NVIDIA® GeForce RTX™ 4050 6GB GDDR6'
      
    },
    "date-added": "2025-3-6",
    "tagline": "Flexibility meets performance.",
    "description": "A stylish and powerful all in one for creatives and professionals.",
    "price": "K40,000",
    "discounted price": "K35,000",
    "special feature": {
      "stat": '8',
      "symbol": "+",
      'stat text size': 8,
      "feature": "Hours Battery Charge"
    }
  },
  {
    "name": "HP ProTower 290",
    "category": "Computers",
    "subcategory": "Desktops",
    "images": [
      productImages.HPProTower290,
      productImages.HPProTower290_2,
      productImages.HPProTower290_3
    ],
    "brand": "HP",
    "brand logo": brandLogo.HP,
    "specs": {
      "processor": "Intel Core i3/i5/i7",
      "RAM": "8GB/16GB DDR4",
      "storage": "256GB/512GB SSD + 1TB HDD"
    },
    "date-added": "2025-3-6",
    "tagline": "Affordable performance for everyday business.",
    "description": "A reliable desktop solution for offices and home users.",
    "price": "K20,000",
    "discounted price": "K18,000",
    "special feature": {
      "stat": 'i7',
      'stat text size': 8,
      // "symbol": "",
      "feature": "intel core"
    }
  },
  {
    "name": "HP Proliant ML110 Desktop Server",
    "category": "Computers",
    "subcategory": "Desktops",
    "images": [
      productImages.HPProliantML110DesktopServer1,
      productImages.HPProliantML110DesktopServer2,
      productImages.HPProliantML110DesktopServer3,
    ],
    "brand": "HP",
    "brand logo": brandLogo.HP,
    "specs": {
      "processor": "Intel Xeon E-2224 2 GHz",
      "RAM": "16GB/32GB DDR4",
      "storage": "1TB HDD (Expandable)",
      "Height": '18.2"',
      "Width": '7.7"',
      "More Features": ["VGA/Display Port", "Energy Star", "USB 3.2 Gen1 Compliant", "USB 2.0 Compliant" ],
    },
    "date-added": "2025-3-6",
    "tagline": "A powerful entry-level server.",
    "description": "Provide enhanced single processor and storage flexibility in a 4.5U 1P tower optimized server with optional rackable chassis, outstanding compute performance, security, reliability, and expandability at an affordable price.",
    "price": "K50,000",
    "discounted price": "K45,000",
    "special feature": {
      "stat": '10',
      "stat text size": 8,
      "symbol": "Gen",
      // "feature": "Gen",
    }
  },
  {
    "name": "Lenovo Legion Tower 5",
    "category": "Computers",
    "subcategory": "Desktops",
    "images": [
      productImages.LenovoLegionTower1,
      productImages.LenovoLegionTower2,
      productImages.LenovoLegionTower3,
    ],
    "brand": "Lenovo",
    "brand logo": brandLogo.Lenovo,
    "specs": {
      "processor": "Intel Core i7/i9 or AMD Ryzen 7/9",
      "RAM": "16GB/32GB DDR5",
      "Desktop Class": 'Gaming',
      "storage": "512GB SSD + 2TB HDD",
      "graphics": "NVIDIA RTX 4060/4070",
      "More Features": ["RGB lighting & glass side panel", "Extreme air cooling & added vents for long sessions"]
    },
    "date-added": "2025-3-6",
    "tagline": "Unleash your gaming potential.",
    "description": "Gaming desktop that powers through 4K games in style, rocking an easily upgradable case with slick, customizable RGB lighting.",
    "price": "K60,000",
    "discounted price": "K55,000",    
  },
  {
    "name": "Lenovo V15",
    "category": "Computers",
    "subcategory": "Laptops",
    "images": [
      productImages.LenovoV15_1,
      productImages.LenovoV15_2,
      productImages.LenovoV15_3,
    ],
    "brand": "Lenovo",
    "brand logo": brandLogo.Lenovo,
    "specs": {
      "display": "15.6-inch HD/FHD",
      "processor": "Intel Core i3/i5",
      "RAM": "8GB DDR4",
      "storage": "256GB/512GB SSD",
      "Display": '15.6" FHD (1920x1080) IPS 300nits Anti-glare',
      "Graphic Card": "Integrated Intel Iris Xe Graphics",
      "Battery": 'Integrated 38Wh'
    },
    "date-added": "2025-3-6",
    "tagline": "Business-ready performance at an affordable price.",
    "description": "A budget-friendly laptop for everyday productivity.",
    "price": "K18,000",
    "discounted price": "K16,000",
    "special feature": {
      "stat": '8',
      "symbol": "+",
      "feature": "Hours Battery Charge"
    }
  },
  {
    "name": "HP Envy x360",
    "category": "Computers",
    "subcategory": "Laptops",
    "images": [
      productImages.HPEnvyx360_1,
      productImages.HPEnvyx360_2,
      productImages.HPEnvyx360_3,
    ],
    "brand": "HP",
    "brand logo": brandLogo.HP,
    "specs": {
      "display": "13.3-inch/15.6-inch FHD Touchscreen",
      "processor": "Intel Core i5/i7 or AMD Ryzen 5/7 (up to 5.1 GHz max boost clock, 16 MB L3 cache, 8 cores, 16 threads)",
      "RAM": "8GB/16GB DDR4",
      "storage": "512GB SSD",
      "battery": "Up to 10 hours",
      "Memory Note": "Transfer rates up to 6400 MT/s"
    },
    "date-added": "2025-3-6",
    "tagline": "Convertible. Powerful. Stylish.",
    "description": "A sleek, 2-in-1 laptop perfect for work and play. Designed to elevate your productivity and far faster.",
    "price": "K35,000",
    "discounted price": "K32,000",
    "special feature": {
      "stat": '8',
      "symbol": "+",
      "feature": "Hours Battery Charge"
    }
  },
  {
    "name": "APC UPS (500Va-40KVa)",
    "category": "Power Solutions",
    "subcategory": "UPS",
    "images": [
      productImages.APCUPS_1,
      productImages.APCUPS_2
    ],
    "brand": "APC",
    "brand logo": brandLogo.APC,
    "specs": {
      "capacity": "500VA - 40KVA",
      "type": "Line Interactive / Online Double Conversion",
      "features": "Battery Backup, Surge Protection, AVR",
      "Battery Characteristics": "Spill-proof, Maintenance-free",
      "Typical Battery Recharge Time": "10 Hour",
      "Form Factor": 'Tower'
    },
    "date-added": "2025-3-6",
    "tagline": "Reliable power backup for every need.",
    "description": "A wide range of UPS solutions to protect your critical equipment from power outages.",
    "price": "Contact for pricing",
    "discounted price": "Varies by model",
    "special feature": {
      "stat": '2',
      "symbol": "Yr",
      "feature": "Warranty"
    }
  },
  {
    "name": "HP ProDesk 600 G2 Micro Tower",
    "category": "Computers",
    "subcategory": "Desktops",
    "images": [
      productImages.HPProDesk600G2MicroTower_1,
      productImages.HPProDesk600G2MicroTower_2,
      productImages.HPProDesk600G2MicroTower_3,
    ],
    "brand": "HP",
    "brand logo": brandLogo.HP,
    "specs": {
      "processor": "Intel Core i5-6500T",
      "RAM": "8GB DDR4",
      "storage": "256GB SSD",
      "ports": "USB 3.0, VGA, DisplayPort",
      "operating-system": "Windows 10 Pro"
    },
    "date-added": "2025-3-6",
    "tagline": "Compact Design with Robust Performance.",
    "description": "Ideal for businesses requiring a space-saving solution without compromising on performance.",
    "price": "K14,000",
    "discounted price": "K11,500"
  },
  {
    "name": "HP EliteDesk 800 G4 Mini PC",
    "category": "Computers",
    "subcategory": "Desktops",
    "images": [
      productImages.HPEliteDesk800G4MiniPC_1,
      productImages.HPEliteDesk800G4MiniPC_2,
      productImages.HPEliteDesk800G4MiniPC_3,
    ],
    "brand": "HP",
    "brand logo": brandLogo.HP,
    "specs": {
      "processor": "intel Core i7-8700 (3.2 GHz Base Frequency, Max Turbo Boost 4.6 GHz, 12 MB Cache, 6 Cores)",
      "RAM": "16GB DDR4",
      "storage": "512GB SSD",
      "ports": "USB 3.1, DisplayPort, VGA",
      "operating-system": "Windows 10 Pro"
    },
    "date-added": "2025-3-6",
    "tagline": "High Performance in a Miniature Form Factor.",
    "description": "Focus on what matters with the whisper quiet and ultrasmall HP EliteDesk 800 G4 Mini PC. Perfect for environments where space is limited but high performance is essential.",
    "price": "K16,000",
    "discounted price": "K13,500"
  },
  {
    "name": "Dell OptiPlex 7020 Mini Desktop",
    "category": "Computers",
    "subcategory": "Desktops",
    "images": [
      productImages.DellOptiPlex7020MiniDesktop_1,
      productImages.DellOptiPlex7020MiniDesktop_2,
      productImages.DellOptiPlex7020MiniDesktop_3,
    ],
    "brand": "Dell",
    "brand logo": brandLogo.Dell,
    "specs": {
      "processor": "Intel Core i5-14500 2.60GHz (upto 5 GHz, 24MB Cache, 14-Core, 20 - Threads, 6)",
      "RAM": "8GB DDR3",
      "storage": "500GB HDD",
      "Graphics": "Intel UHD 770",
      "ports": "USB 3.0, DisplayPort, VGA",
      "operating-system": "Windows 10 Pro",
    },
    "date-added": "2025-3-6",
    "tagline": "Reliable Performance for Everyday Business Tasks.",
    "description": "A trusted solution for businesses requiring consistent and dependable desktop performance.",
    "price": "K12,000",
    "discounted price": "K10,500",
    "special feature": {
      "stat": 'i5',
      "stat text size": 8,
      // "symbol": "+",
      "feature": "intel"
    }
  },
  {
    "name": "Asus Mini PC PN41",
    "category": "Computers",
    "subcategory": "Desktops",
    "images": [
      productImages.AsusMiniPCPN41_1,
      productImages.AsusMiniPCPN41_2,
      productImages.AsusMiniPCPN41_3,
    ],
    "brand": "Asus",
    "brand logo": brandLogo.Asus,
    "specs": {
      "processor": "Intel Celeron N4500",
      "RAM": "4GB LPDDR4",
      "storage": "128GB eMMC",
      "ports": "USB 3.2, HDMI, Ethernet",
      "operating-system": "Windows 11 Home"
    },
    "date-added": "2025-3-6",
    "tagline": "Ultra-Compact Design with Essential Features.",
    "description": "Ultracompact computer with 11th Gen Intel Celeron or Pentium mobile processor. Ideal for basic computing tasks in environments where space is at a premium.",
    "price": "K8,000",
    "discounted price": "K7,000"
  },
  {
    "name": "Lenovo IdeaPad 1",
    "category": "Computers",
    "subcategory": "Laptops",
    "images": [
      productImages.LenovoIdeaPad1_1,
      productImages.LenovoIdeaPad1_2,
      productImages.LenovoIdeaPad1_3,
    ],
    "brand": "Lenovo",
    "brand logo": brandLogo.Lenovo,
    "specs": {
      "processor": "Intel Celeron N4020",
      "RAM": "4GB /8GB DDR4",
      "storage": "256GB/500GB SSD",
      "Graphics": "Integrated Intel UHD Graphics 600",
      "display": "14-inch HD (1366x768)",
      "ports": "USB 3.1, HDMI",
      "operating-system": "Windows 10 Home"
    },
    "date-added": "2025-3-6",
    "tagline": "Compact and Lightweight for On-the-Go Computing.",
    "description": "Perfect for basic tasks like browsing and document editing.",
    "price": "K5,000",
    "discounted price": "K4,500",
    "special feature": {
      "stat": '8',
      'stat text size': 8,
      "symbol": "+",
      "feature": "Hours Battery Charge"
    }
  },
  {
    "name": "Lenovo IdeaPad Slim 3",
    "category": "Computers",
    "subcategory": "Laptops",
    "images": [
      productImages.LenovoIdeaPad3_1,
      productImages.LenovoIdeaPad3_2,
      productImages.LenovoIdeaPad3_3,
    ],
    "brand": "Lenovo",
    "brand logo": brandLogo.Lenovo,
    "specs": {
      "processor": "AMD Ryzen 3 3250U",
      "RAM": "4GB DDR4",
      "storage": "128GB SSD",
      "display": "15.6-inch HD (1366x768)",
      "ports": "USB 3.2, HDMI, Ethernet",
      "operating-system": "Windows 10 Home"
    },
    "date-added": "2025-3-6",
    "tagline": "Balanced Performance for Daily Computing.",
    "description": "Make a statement wherever you go with the IdeaPad Slim 3 Gen 8 laptop, built for lightness and thinness, measuring up to 10% slimmer than the previous generation.",
    "price": "K6,500",
    "discounted price": "K6,000"
  },
  {
    "name": "Lenovo IdeaPad 5",
    "category": "Computers",
    "subcategory": "Laptops",
    "images": [
      productImages.LenovoIdeaPad5_1,
      productImages.LenovoIdeaPad5_2,
      productImages.LenovoIdeaPad5_3,
    ],
    "brand": "Lenovo",
    "brand logo": brandLogo.Lenovo,
    "specs": {
      "processor": "Intel Core i5-1135G7",
      "RAM": "8GB DDR4",
      "storage": "512GB SSD",
      "display": "14-inch Full HD (1920x1080)",
      "ports": "USB 3.2, Thunderbolt 4, HDMI",
      "operating-system": "Windows 10 Pro"
    },
    "date-added": "2025-3-6",
    "tagline": "Enhanced Performance for Demanding Tasks.",
    "description": "Designed for users requiring higher performance for applications and multitasking.",
    "price": "K12,000",
    "discounted price": "K11,500"
  },
  {
    "name": "Lenovo IdeaPad Duet",
    "category": "Computers",
    "subcategory": "Laptops",
    "images": [
      productImages.LenovoIdeaPadDuet_1,
      productImages.LenovoIdeaPadDuet_2,
      productImages.LenovoIdeaPadDuet_3,
    ],
    "brand": "Lenovo",
    "brand logo": brandLogo.Lenovo,
    "specs": {
      "processor": "MediaTek Helio P60T",
      "RAM": "4GB LPDDR4X",
      "storage": "64GB eMMC",
      "display": "10.1-inch Full HD (1920x1200) Touchscreen",
      "ports": "USB-C, Keyboard Dock",
      "operating-system": "Chrome OS"
    },
    "date-added": "2025-3-6",
    "tagline": "Versatile 2-in-1 Chromebook for Flexibility.",
    "description": "Combines the portability of a tablet with the functionality of a laptop.",
    "price": "K5,500",
    "discounted price": "K5,000",
    "special feature": {
      "stat": '10',
      'stat text size': 8,
      "symbol": "+",
      "feature": "Hours Battery Charge"
    }
  },
  {
    "name": "Lenovo ThinkPad",
    "category": "Computers",
    "subcategory": "Laptops",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "Lenovo",
    "brand logo": brandLogo.Lenovo,
    "specs": {
      "processor": "Intel Core i7-1185G7",
      "RAM": "16GB DDR4",
      "storage": "1TB SSD",
      "display": "14-inch Full HD (1920x1080)",
      "ports": "USB 3.2, Thunderbolt 4, HDMI, Ethernet",
      "operating-system": "Windows 10 Pro"
    },
    "date-added": "2025-3-6",
    "tagline": "Business-Class Performance and Durability.",
    "description": "Built to withstand rigorous use while delivering top-tier performance.",
    "price": "K18,000",
    "discounted price": "K17,500"
  },

  // Jonah
  {
    "name": "HP ProBook 430 G7",
    "category": "Computers",
    "subcategory": "Laptops",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "HP",
    "brand logo": brandLogo.HP,
    "specs": {
      "processor": "Intel Core i5-10210U",
      "RAM": "8GB DDR4",
      "storage": "256GB SSD",
      "display": "13.3-inch Full HD (1920x1080)",
      "ports": "USB 3.1, HDMI, Ethernet",
      "operating-system": "Windows 10 Pro"
    },
    "date-added": "2025-3-6",
    "tagline": "Compact Design with Professional Features.",
    "description": "Ideal for professionals needing portability without sacrificing performance.",
    "price": "K9,500",
    "discounted price": "K9,000"
  },
  {
    "name": "HP ProBook 450 G7",
    "category": "Computers",
    "subcategory": "Laptops",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "HP",
    "brand logo": brandLogo.HP,
    "specs": {
      "processor": "Intel Core i7-10510U",
      "RAM": "16GB DDR4",
      "storage": "512GB SSD",
      "display": "15.6-inch Full HD (1920x1080)",
      "ports": "USB 3.1, HDMI, Ethernet",
      "operating-system": "Windows 10 Pro"
    },
    "date-added": "2025-3-6",
    "tagline": "Enhanced Performance for Demanding Tasks.",
    "description": "Designed for users requiring higher performance for applications and multitasking.",
    "price": "K12,000",
    "discounted price": "K11,500"
  },
  {
    "name": "HP ProBook 460 G11",
    "category": "Computers",
    "subcategory": "Laptops",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "HP",
    "brand logo": brandLogo.HP,
    "specs": {
      "processor": "Intel Core i5-1255U",
      "RAM": "8GB DDR4",
      "storage": "512GB SSD",
      "display": "16-inch Full HD (1920x1080) with 16:10 aspect ratio",
      "ports": "USB 3.2, Thunderbolt 4, HDMI, Ethernet",
      "operating-system": "Windows 10 Pro"
    },
    "date-added": "2025-3-6",
    "tagline": "All-Day Battery Life Meets Quiet Cooling.",
    "description": "Offers good performance for office work with a quiet fan and comfortable keyboard.",
    "price": "K13,000",
    "discounted price": "K12,500"
  },
  {
    "name": "HP ProBook 465 G7",
    "category": "Computers",
    "subcategory": "Laptops",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "HP",
    "brand logo": brandLogo.HP,
    "specs": {
      "processor": "AMD Ryzen 5 3450U",
      "RAM": "8GB DDR4",
      "storage": "256GB SSD",
      "display": "15.6-inch Full HD (1920x1080)",
      "ports": "USB 3.1, HDMI, Ethernet",
      "operating-system": "Windows 10 Pro"
    },
    "date-added": "2025-3-6",
    "tagline": "Business-Class Performance and Durability.",
    "description": "Provides commercial-grade performance and durability for everyday business tasks.",
    "price": "K10,500",
    "discounted price": "K10,000"
  },
  {
    "name": "HP EliteBook 640 G11",
    "category": "Computers",
    "subcategory": "Laptops",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "HP",
    "brand logo": brandLogo.HP,
    "specs": {
      "processor": "Intel Core i5-1255U",
      "RAM": "8GB DDR4",
      "storage": "256GB SSD",
      "display": "14-inch Full HD (1920x1080) with 16:10 aspect ratio",
      "ports": "USB 3.2, Thunderbolt 4, HDMI, Ethernet",
      "operating-system": "Windows 11 Pro"
    },
    "date-added": "2025-3-6",
    "tagline": "Secure and Versatile Business Laptop.",
    "description": "Designed for professionals seeking a balance between performance and portability.",
    "price": "K11,000",
    "discounted price": "K10,500"
  },
  {
    "name": "HP EliteBook 650 G10",
    "category": "Computers",
    "subcategory": "Laptops",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "HP",
    "brand logo": brandLogo.HP,
    "specs": {
      "processor": "Intel Core i7-1355U",
      "RAM": "16GB DDR4",
      "storage": "512GB SSD",
      "display": "15.6-inch Full HD (1920x1080)",
      "ports": "USB 3.1, Thunderbolt 4, HDMI, Ethernet",
      "operating-system": "Windows 11 Pro"
    },
    "date-added": "2025-3-6",
    "tagline": "Enhanced Performance for Demanding Tasks.",
    "description": "Ideal for users requiring higher performance for multitasking and complex applications.",
    "price": "K12,500",
    "discounted price": "K12,000"
  },
  {
    "name": "HP EliteBook 660 G11",
    "category": "Computers",
    "subcategory": "Laptops",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "HP",
    "brand logo": brandLogo.HP,
    "specs": {
      "processor": "Intel Core Ultra 5 125U",
      "RAM": "16GB DDR5",
      "storage": "512GB SSD",
      "display": "16-inch Full HD+ (1920x1200) with 16:10 aspect ratio",
      "ports": "USB 3.2, Thunderbolt 4, HDMI, Ethernet",
      "operating-system": "Windows 11 Pro"
    },
    "date-added": "2025-3-6",
    "tagline": "AI-Enhanced Performance for Modern Workflows.",
    "description": "Equipped with the latest processors and collaboration features for a seamless work experience.",
    "price": "K13,500",
    "discounted price": "K13,000"
  },
  {
    "name": "HP Elite Dragonfly G3",
    "category": "Computers",
    "subcategory": "Laptops",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "HP",
    "brand logo": brandLogo.HP,
    "specs": {
      "processor": "Intel Core i5-1255U",
      "RAM": "8GB DDR4",
      "storage": "256GB SSD",
      "display": "13.5-inch Full HD (1920x1080) touchscreen",
      "ports": "USB-C Thunderbolt 4, USB-A 3.2, HDMI 2.0, RJ-45",
      "operating-system": "Windows 11 Pro"
    },
    "date-added": "2025-3-6",
    "tagline": "Premium Business Laptop with Convertible Design.",
    "description": "Combines luxury design with business-class performance and versatility.",
    "price": "K20,000",
    "discounted price": "K18,500"
  },
  {
    "name": "HP Envy x360 14",
    "category": "Computers",
    "subcategory": "Laptops",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "HP",
    "brand logo": brandLogo.HP,
    "specs": {
      "processor": "Intel Core i7-1255U",
      "RAM": "16GB DDR4",
      "storage": "512GB SSD",
      "display": "14-inch Full HD (1920x1080) touchscreen, 360-degree hinge",
      "ports": "USB-C, USB-A, HDMI, microSD card reader",
      "operating-system": "Windows 11 Home"
    },
    "date-added": "2025-3-6",
    "tagline": "Versatile 2-in-1 Laptop with Foldable Design.",
    "description": "Offers flexibility with its foldable design, suitable for work and play.",
    "price": "K15,000",
    "discounted price": "K14,500"
  },
  {
    "name": "Dell Latitude 3450",
    "category": "Computers",
    "subcategory": "Laptops",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "Dell",
    "brand logo": brandLogo.Dell,
    "specs": {
      "processor": "Intel Core i3/i5/i7 (5th Gen)",
      "RAM": "Up to 16GB DDR3L",
      "storage": "Up to 1TB HDD or 256GB SSD",
      "display": "14-inch HD (1366x768) or Full HD (1920x1080)",
      "ports": "USB 3.0, HDMI, Ethernet, SD card reader",
      "operating-system": "Windows 7/8/10 Pro"
    },
    "date-added": "2025-3-6",
    "tagline": "Affordable Performance for Everyday Tasks.",
    "description": "A budget-friendly laptop suitable for basic computing needs.",
    "price": "K6,500",
    "discounted price": "K6,000"
  },
  {
    "name": "Dell Latitude 3540",
    "category": "Computers",
    "subcategory": "Laptops",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "Dell",
    "brand logo": brandLogo.Dell,
    "specs": {
      "processor": "Intel Core i5/i7 (4th Gen)",
      "RAM": "Up to 16GB DDR3L",
      "storage": "Up to 1TB HDD or 256GB SSD",
      "display": "14-inch HD (1366x768) or Full HD (1920x1080)",
      "ports": "USB 3.0, HDMI, Ethernet, SD card reader",
      "operating-system": "Windows 7/8/10 Pro"
    },
    "date-added": "2025-3-6",
    "tagline": "Reliable Performance for Business Professionals.",
    "description": "Designed for professionals seeking a balance between performance and affordability.",
    "price": "K7,000",
    "discounted price": "K6,500"
  },
  {
    "name": "Dell Latitude 3550",
    "category": "Computers",
    "subcategory": "Laptops",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "Dell",
    "brand logo": brandLogo.Dell,
    "specs": {
      "processor": "Intel Core i5/i7 (5th Gen)",
      "RAM": "Up to 16GB DDR3L",
      "storage": "Up to 1TB HDD or 256GB SSD",
      "display": "15.6-inch HD (1366x768) or Full HD (1920x1080)",
      "ports": "USB 3.0, HDMI, Ethernet, SD card reader",
      "operating-system": "Windows 7/8/10 Pro"
    },
    "date-added": "2025-3-6",
    "tagline": "Enhanced Performance for Demanding Applications.",
    "description": "Offers improved performance for users requiring more computing power.",
    "price": "K7,500",
    "discounted price": "K7,000"
  },
  {
    "name": "Dell Latitude 5440",
    "category": "Computers",
    "subcategory": "Laptops",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "Dell",
    "brand logo": brandLogo.Dell,
    "specs": {
      "processor": "Intel Core i5/i7 (5th Gen)",
      "RAM": "Up to 16GB DDR3L",
      "storage": "Up to 1TB HDD or 256GB SSD",
      "display": "14-inch HD (1366x768) or Full HD (1920x1080)",
      "ports": "USB 3.0, HDMI, Ethernet, SD card reader",
      "operating-system": "Windows 7/8/10 Pro"
    },
    "date-added": "2025-3-6",
    "tagline": "Business-Class Performance with Enhanced Security.",
    "description": "Tailored for business users requiring reliable performance and security features.",
    "price": "K8,000",
    "discounted price": "K7,500"
  },
  {
    "name": "Dell Latitude 5450",
    "category": "Computers",
    "subcategory": "Laptops",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "Dell",
    "brand logo": brandLogo.Dell,
    "specs": {
      "processor": "Intel Core i5/i7 (5th Gen)",
      "RAM": "Up to 16GB DDR3L",
      "storage": "Up to 1TB HDD or 256GB SSD",
      "display": "14-inch HD (1366x768) or Full HD (1920x1080)",
      "ports": "USB 3.0, HDMI, Ethernet, SD card reader",
      "operating-system": "Windows 7/8/10 Pro"
    },
    "date-added": "2025-3-6",
    "tagline": "Enhanced Performance with Business Features.",
    "description": "Provides improved performance and additional features for business users.",
    "price": "K8,500",
    "discounted price": "K8,000"
  },
  {
    "name": "Dell Latitude 5550",
    "category": "Computers",
    "subcategory": "Laptops",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "Dell",
    "brand logo": brandLogo.Dell,
    "specs": {
      "processor": "Intel Core i5/i7 (5th Gen)",
      "RAM": "Up to 16GB DDR3L",
      "storage": "Up to 1TB HDD or 256GB SSD",
      "display": "15.6-inch HD (1366x768) or Full HD (1920x1080)",
      "ports": "USB 3.0, HDMI, Ethernet, SD card reader",
      "operating-system": "Windows 7/8/10 Pro"
    },
    "date-added": "2025-3-6",
    "tagline": "Larger Display with Robust Performance.",
    "description": "Offers a larger display and robust performance for users needing more screen space.",
    "price": "K9,000",
    "discounted price": "K8,500"
  },
  {
    "name": "Dell Latitude 7450",
    "category": "Computers",
    "subcategory": "Laptops",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "Dell",
    "brand logo": brandLogo.Dell,
    "specs": {
      "processor": "Intel Core Ultra i5-1255U",
      "RAM": "16GB LPDDR5x",
      "storage": "512GB SSD",
      "display": "14-inch FHD+ (1920x1200) IPS, Anti-Glare, 250 nits",
      "ports": "2 x USB-A 3.2 Gen 1, 2 x Thunderbolt 4 with DisplayPort, HDMI 2.1, Universal audio port, Nano SIM slot (optional), Wedge-shaped lock slot, Smart card reader (optional)",
      "operating-system": "Windows 11 Pro"
    },
    "date-added": "2025-3-6",
    "tagline": "Ultralight Business Laptop with High-End Performance.",
    "description": "Designed for professionals seeking a lightweight yet powerful device for business tasks.",
    "price": "K12,000",
    "discounted price": "K11,500"
  },
  {
    "name": "Dell Inspiron 7450 Foldable",
    "category": "Computers",
    "subcategory": "Laptops",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "Dell",
    "brand logo": brandLogo.Dell,
    "specs": {
      "processor": "Intel Core i7-1365U",
      "RAM": "16GB LPDDR5",
      "storage": "512GB SSD",
      "display": "14-inch FHD+ (1920x1200) touchscreen, 360-degree hinge",
      "ports": "2 x USB-A 3.2 Gen 1, 2 x Thunderbolt 4 with DisplayPort, HDMI 2.1, Universal audio port",
      "operating-system": "Windows 11 Pro"
    },
    "date-added": "2025-3-6",
    "tagline": "Flexible 2-in-1 Laptop with High-End Performance.",
    "description": "A versatile laptop offering both tablet and laptop modes, equipped with powerful specifications for demanding tasks.",
    "price": "K11,500",
    "discounted price": "K11,000"
  },
  {
    "name": "Dell Inspiron 7640",
    "category": "Computers",
    "subcategory": "Laptops",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "Dell",
    "brand logo": brandLogo.Dell,
    "specs": {
      "processor": "Intel Core i7-1365U",
      "RAM": "16GB LPDDR5",
      "storage": "256GB SSD",
      "display": "16-inch FHD+ (1920x1200) display",
      "ports": "2 x USB-A 3.2 Gen 1, Thunderbolt 4, HDMI 1.4, Universal audio jack",
      "operating-system": "Windows 11 Pro"
    },
    "date-added": "2025-3-6",
    "tagline": "Powerful Performance in a Sleek Design.",
    "description": "Ideal for professionals seeking a balance between performance and portability.",
    "price": "K9,500",
    "discounted price": "K9,000"
  },
  {
    "name": "Dell Inspiron 5530 Gaming Laptop",
    "category": "Computers",
    "subcategory": "Laptops",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "Dell",
    "brand logo": brandLogo.Dell,
    "specs": {
      "processor": "Intel Core i7-13700H",
      "RAM": "32GB DDR5",
      "storage": "1TB SSD",
      "display": "15.6-inch FHD (1920x1080) display with 144Hz refresh rate",
      "ports": "2 x USB-A 3.2 Gen 1, Thunderbolt 4, HDMI 2.1, RJ-45, Universal audio jack",
      "operating-system": "Windows 11 Pro"
    },
    "date-added": "2025-3-6",
    "tagline": "High-Performance Gaming Laptop.",
    "description": "Designed for gamers seeking high frame rates and immersive experiences.",
    "price": "K15,000",
    "discounted price": "K14,500"
  },
  {
    "name": "Dell Precision 3590",
    "category": "Computers",
    "subcategory": "Laptops",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "Dell",
    "brand logo": brandLogo.Dell,
    "specs": {
      "processor": "Intel Core Ultra 7 155H vPro® Essentials (24 MB cache, 16 cores, 22 threads, up to 4.8 GHz, 45W)",
      "RAM": "Up to 32GB DDR5, 5600 MT/s, non-ECC",
      "storage": "Up to 1TB SSD",
      "display": "15.6-inch FHD (1920x1080), 60Hz, 250 nits, Non-Touch",
      "ports": "USB-A 3.2 Gen 1, Thunderbolt 4, HDMI 2.1, RJ-45, Universal audio jack",
      "operating-system": "Windows 11 Pro"
    },
    "date-added": "2025-3-6",
    "tagline": "Reliable Workstation for Entry-Level Design and Creative Applications.",
    "description": "The Dell Precision 3590 offers intelligently optimized performance for light design and creative tasks, featuring the latest Intel Core Ultra processors with AI Boost.",
    "price": "K9,500",
    "discounted price": "K9,000"
  },
  {
    "name": "Dell Precision 3591",
    "category": "Computers",
    "subcategory": "Laptops",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "Dell",
    "brand logo": brandLogo.Dell,
    "specs": {
      "processor": "Intel Core Ultra 7 165H vPro® Enterprise (24MB cache, 16 cores, 22 threads, up to 5.0 GHz Turbo, 45W)",
      "RAM": "Up to 32GB DDR5, 5600 MT/s, non-ECC",
      "storage": "Up to 1TB SSD",
      "display": "15.6-inch FHD (1920x1080), 60Hz, 250 nits, Non-Touch",
      "ports": "USB-A 3.2 Gen 1, Thunderbolt 4, HDMI 2.1, RJ-45, Universal audio jack",
      "operating-system": "Windows 11 Pro"
    },
    "date-added": "2025-3-6",
    "tagline": "High-Performance Workstation for Demanding Applications.",
    "description": "The Dell Precision 3591 is a powerful entry-level workstation designed for design and creative applications, featuring Intel Core Ultra processors with AI Boost and optional NVIDIA RTX Ada professional graphics.",
    "price": "K10,500",
    "discounted price": "K10,000"
  },
  {
    "name": "Dell Vostro 3440",
    "category": "Computers",
    "subcategory": "Laptops",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "Dell",
    "brand logo": brandLogo.Dell,
    "specs": {
      "processor": "Intel Core i5-1135G7 (4 cores, 8 threads, 2.4 GHz to 4.2 GHz)",
      "RAM": "8 GB DDR4",
      "storage": "512GB SSD",
      "display": "14-inch HD (1366x768), Anti-Glare, 250 nits",
      "ports": "1 x USB-A 3.2, 1 x USB-C 3.2, 1 x HDMI 1.4, 1 x RJ-45, Universal audio jack, 1 x SD card reader",
      "operating-system": "Windows 10 Home"
    },
    "date-added": "2025-3-6",
    "tagline": "Compact and Efficient for Everyday Work.",
    "description": "Ideal for professionals looking for a portable laptop with efficient performance for business tasks.",
    "price": "K7,000",
    "discounted price": "K6,500"
  },
  {
    "name": "Dell Vostro 3501",
    "category": "Computers",
    "subcategory": "Laptops",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "Dell",
    "brand logo": brandLogo.Dell,
    "specs": {
      "processor": "Intel Core i3-1115G4 (2 cores, 4 threads, 3.0 GHz to 4.1 GHz)",
      "RAM": "4 GB DDR4",
      "storage": "256GB SSD",
      "display": "15.6-inch HD (1366x768), Anti-Glare",
      "ports": "1 x USB-A 3.2, 1 x USB-C 3.2, 1 x HDMI 1.4, 1 x RJ-45, Universal audio jack",
      "operating-system": "Windows 10 Home"
    },
    "date-added": "2025-3-6",
    "tagline": "Budget-Friendly Laptop for Daily Tasks.",
    "description": "A solid choice for everyday tasks with an affordable price point and reliable performance.",
    "price": "K6,500",
    "discounted price": "K6,000"
  },
  {
    "name": "Dell Vostro 3520",
    "category": "Computers",
    "subcategory": "Laptops",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "Dell",
    "brand logo": brandLogo.Dell,
    "specs": {
      "processor": "Intel Core i5-1235U (10 cores, 12 threads, 1.3 GHz to 4.4 GHz)",
      "RAM": "8 GB DDR4",
      "storage": "512GB SSD",
      "display": "15.6-inch FHD (1920x1080), Anti-Glare, 250 nits",
      "ports": "1 x USB-A 3.2, 1 x USB-C 3.2, 1 x HDMI 1.4, 1 x RJ-45, Universal audio jack",
      "operating-system": "Windows 11 Home"
    },
    "date-added": "2025-3-6",
    "tagline": "Mid-Range Laptop for Work and Play.",
    "description": "Designed to handle both work and entertainment with ample storage and memory.",
    "price": "K8,500",
    "discounted price": "K8,000"
  },
  {
    "name": "Dell Vostro 5510",
    "category": "Computers",
    "subcategory": "Laptops",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "Dell",
    "brand logo": brandLogo.Dell,
    "specs": {
      "processor": "Intel Core i7-1165G7 (4 cores, 8 threads, 2.8 GHz to 4.7 GHz)",
      "RAM": "16 GB DDR4",
      "storage": "512GB SSD",
      "display": "15.6-inch FHD (1920x1080), Anti-Glare, 300 nits",
      "ports": "1 x USB-A 3.2, 2 x USB-C 3.2, 1 x HDMI 2.0, 1 x RJ-45, Universal audio jack",
      "operating-system": "Windows 10 Pro"
    },
    "date-added": "2025-3-6",
    "tagline": "High Performance for Professionals.",
    "description": "A powerful laptop designed for professional use, with high-end specs and fast performance.",
    "price": "K10,000",
    "discounted price": "K9,500"
  },
  {
    "name": "Dell Vostro 5640",
    "category": "Computers",
    "subcategory": "Laptops",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "Dell",
    "brand logo": brandLogo.Dell,
    "specs": {
      "processor": "Intel Core i7-12700U (12 cores, 16 threads, 1.2 GHz to 4.8 GHz)",
      "RAM": "16 GB DDR4",
      "storage": "512GB SSD",
      "display": "14-inch FHD (1920x1080), 120Hz, Anti-Glare",
      "ports": "2 x USB-A 3.2, 1 x USB-C 3.2, 1 x HDMI 2.0, 1 x RJ-45, Universal audio jack",
      "operating-system": "Windows 11 Pro"
    },
    "date-added": "2025-3-6",
    "tagline": "Compact and Powerful for Professionals on the Go.",
    "description": "With a slim profile and powerful performance, this laptop is perfect for professionals needing portability and performance.",
    "price": "K12,000",
    "discounted price": "K11,500"
  },
  {
    "name": "Dell XPS 9345 X-Elite",
    "category": "Computers",
    "subcategory": "Laptops",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "Dell",
    "brand logo": brandLogo.Dell,
    "specs": {
      "processor": "Qualcomm Snapdragon X Elite X1E-80-100 (12 cores, up to 3.4 GHz dual-core boost)",
      "RAM": "16GB LPDDR5, 8448MT/s",
      "storage": "512GB SSD (M.2, PCIe NVMe)",
      "display": "13.4-inch OLED, 3K (2880x1800), 60Hz",
      "ports": "USB-C with Thunderbolt 4, USB-A 3.2, HDMI 2.1, Universal audio jack",
      "operating-system": "Windows 11 Home"
    },
    "date-added": "2025-3-6",
    "tagline": "Ultraportable Laptop with Snapdragon X Elite Performance.",
    "description": "The Dell XPS 9345 X-Elite combines sleek design with powerful performance, featuring Qualcomm's Snapdragon X Elite processor and a vibrant OLED display.",
    "price": "K13,000",
    "discounted price": "K12,500"
  },
  {
    "name": "Dell XPS 9340",
    "category": "Computers",
    "subcategory": "Laptops",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "Dell",
    "brand logo": brandLogo.Dell,
    "specs": {
      "processor": "Intel Core Ultra 7 155H (24 MB cache, 16 cores, up to 4.8 GHz)",
      "RAM": "Up to 32GB LPDDR5X",
      "storage": "Up to 1TB SSD",
      "display": "13.4-inch FHD+ (1920x1200) Non-Touch",
      "ports": "USB-A 3.2 Gen 1, Thunderbolt 4, HDMI 2.1, Universal audio jack",
      "operating-system": "Windows 11 Pro"
    },
    "date-added": "2025-3-6",
    "tagline": "Compact and Powerful Ultraportable Laptop.",
    "description": "The Dell XPS 9340 offers a blend of performance and portability, featuring the latest Intel Core Ultra processors and a high-resolution display.",
    "price": "K9,500",
    "discounted price": "K9,000"
  },
  {
    "name": "Dell XPS 9350",
    "category": "Computers",
    "subcategory": "Laptops",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "Dell",
    "brand logo": brandLogo.Dell,
    "specs": {
      "processor": "Intel Core Ultra 7 256V (Lunar Lake)",
      "RAM": "16GB LPDDR5X",
      "storage": "512GB SSD",
      "display": "13.4-inch OLED (2880x1800) Touchscreen",
      "ports": "USB-A 3.2 Gen 1, Thunderbolt 4, HDMI 2.1, Universal audio jack",
      "operating-system": "Windows 11 Pro"
    },
    "date-added": "2025-3-6",
    "tagline": "Sleek Design with Vibrant OLED Display.",
    "description": "The Dell XPS 9350 combines a slim profile with a stunning OLED display, powered by the latest Intel processors for efficient performance.",
    "price": "K10,500",
    "discounted price": "K10,000"
  },
  {
    "name": "Dell XPS 9440",
    "category": "Computers",
    "subcategory": "Laptops",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "Dell",
    "brand logo": brandLogo.Dell,
    "specs": {
      "processor": "Intel Core Ultra 7 155H (24 MB cache, 16 cores, up to 4.8 GHz)",
      "RAM": "Up to 32GB LPDDR5X",
      "storage": "Up to 1TB SSD",
      "display": "14.5-inch FHD+ (1920x1200) Non-Touch",
      "ports": "USB-A 3.2 Gen 1, Thunderbolt 4, HDMI 2.1, Universal audio jack",
      "operating-system": "Windows 11 Pro"
    },
    "date-added": "2025-3-6",
    "tagline": "Balanced Performance in a Compact Form Factor.",
    "description": "The Dell XPS 9440 offers a middle ground between the XPS 13 and XPS 16, providing robust performance in a portable design.",
    "price": "K9,800",
    "discounted price": "K9,300"
  },
  {
    "name": "Dell XPS 9640",
    "category": "Computers",
    "subcategory": "Laptops",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "Dell",
    "brand logo": brandLogo.Dell,
    "specs": {
      "processor": "Intel Core Ultra 7 155H (24 MB cache, 16 cores, up to 4.8 GHz)",
      "RAM": "Up to 32GB LPDDR5X",
      "storage": "Up to 1TB SSD",
      "display": "16.3-inch FHD+ (1920x1200) Non-Touch",
      "ports": "USB-A 3.2 Gen 1, Thunderbolt 4, HDMI 2.1, Universal audio jack",
      "operating-system": "Windows 11 Pro"
    },
    "date-added": "2025-3-6",
    "tagline": "Premium Performance with a Larger Display.",
    "description": "The Dell XPS 9640 is designed for users seeking high-end performance with a larger display, suitable for multitasking and entertainment.",
    "price": "K11,200",
    "discounted price": "K10,700"
  },
  {
    "name": "Asus ExpertBook B3 (B3405)",
    "category": "Computers",
    "subcategory": "Laptops",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "Asus",
    "brand logo": brandLogo.Asus,
    "specs": {
      "processor": "Up to Intel Core Ultra 7 with Intel vPro",
      "RAM": "Up to 64 GB",
      "storage": "Dual-SSD RAID supports up to 1TB capacity",
      "display": "14-inch display",
      "ports": "Multiple USB ports, HDMI, audio jack",
      "operating-system": "Windows 11 Pro"
    },
    "date-added": "2025-3-6",
    "tagline": "Business-grade performance with military-grade durability.",
    "description": "The Asus ExpertBook B3 is designed for professionals seeking a balance between performance and portability, featuring robust security features and a lightweight design starting at 1.4kg.",
    "price": "K8,500",
    "discounted price": "K8,000"
  },
  {
    "name": "Asus TUF Gaming F15",
    "category": "Computers",
    "subcategory": "Laptops",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "Asus",
    "brand logo": brandLogo.Asus,
    "specs": {
      "processor": "Up to Intel Core i7-10870H (8 cores, up to 5.0 GHz)",
      "RAM": "Up to 32 GB DDR4",
      "storage": "Up to 1TB SSD",
      "display": "15.6-inch FHD (1920x1080), up to 144Hz refresh rate",
      "ports": "USB-A 3.2, USB-C with DisplayPort, HDMI 2.1, Ethernet, audio jack",
      "operating-system": "Windows 11 Home"
    },
    "date-added": "2025-3-6",
    "tagline": "Durable gaming laptop with high-refresh-rate display.",
    "description": "The Asus TUF Gaming F15 is built for gamers seeking reliability and performance, featuring military-grade durability and efficient cooling for extended gaming sessions.",
    "price": "K9,000",
    "discounted price": "K8,500"
  },
  {
    "name": "Asus ROG Zephyrus G16 (2024)",
    "category": "Computers",
    "subcategory": "Laptops",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "Asus",
    "brand logo": brandLogo.Asus,
    "specs": {
      "processor": "AMD Ryzen AI 9 HX 370",
      "RAM": "16 GB",
      "storage": "1TB SSD",
      "display": "16-inch 2.5K (2560x1600), 240Hz OLED ROG Nebula Display",
      "ports": "USB-A, USB-C with Thunderbolt 4, HDMI 2.1, audio jack",
      "operating-system": "Windows 11 Pro"
    },
    "date-added": "2025-3-6",
    "tagline": "High-performance gaming laptop with stunning display.",
    "description": "The Asus ROG Zephyrus G16 offers top-tier gaming performance with advanced cooling and a vibrant OLED display, catering to both gamers and content creators.",
    "price": "K12,000",
    "discounted price": "K11,500"
  },
  {
    "name": "Asus X515",
    "category": "Computers",
    "subcategory": "Laptops",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "Asus",
    "brand logo": brandLogo.Asus,
    "specs": {
      "processor": "Up to Intel Core i7-1065G7 (1.3 GHz, 8M Cache, up to 3.9 GHz, 4 cores)",
      "RAM": "Up to 16 GB DDR4",
      "storage": "Up to 1 TB SSD or 1 TB HDD",
      "display": "15.6-inch Full HD (1920x1080) Anti-Glare",
      "ports": "USB-A 3.2, USB-C, HDMI 1.4, audio jack",
      "operating-system": "Windows 10 Home"
    },
    "date-added": "2025-3-6",
    "tagline": "Affordable and versatile laptop for everyday tasks.",
    "description": "The Asus X515 offers a balance between performance and affordability, suitable for daily computing needs with a variety of configuration options.",
    "price": "K7,500",
    "discounted price": "K7,000"
  },
  {
    "name": "Asus Zenbook 14 (UX3402)",
    "category": "Computers",
    "subcategory": "Laptops",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "Asus",
    "brand logo": brandLogo.Asus,
    "specs": {
      "processor": "Intel Core i7-13700U (up to 4.8 GHz, 14 cores)",
      "RAM": "Up to 16 GB LPDDR5",
      "storage": "Up to 1 TB SSD",
      "display": "14-inch 2.5K (2560x1600) IPS NanoEdge, 100% sRGB color gamut",
      "ports": "USB-A 3.2, USB-C with Thunderbolt 4, HDMI 2.1, audio jack",
      "operating-system": "Windows 11 Pro"
    },
    "date-added": "2025-3-6",
    "tagline": "Sleek and powerful ultrabook for professionals and students.",
    "description": "The Asus Zenbook 14 combines premium design with robust performance, featuring a high-resolution display and long-lasting battery life.",
    "price": "K12,000",
    "discounted price": "K11,500"
  },
  {
    "name": "LG 27UL500-W",
    "category": "Monitors",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "LG",
    "brand logo": "",
    "specs": {
      "size": "27 inches",
      "resolution": "4K UHD (3840x2160)",
      "panel-type": "IPS",
      "refresh-rate": "60Hz",
      "response-time": "5ms",
      "color-gamut": "sRGB 98%",
      "hdr": "HDR10",
      "vesa-mount": "Yes",
      "ports": ["HDMI", "DisplayPort"]
    },
    "date-added": "2025-03-06",
    "tagline": "Stunning 4K clarity with versatile connectivity.",
    "description": "The LG 27UL500-W offers a sharp 4K resolution with accurate color reproduction, making it ideal for both work and entertainment. Its VESA mount compatibility allows for flexible installation options.",
    "price": "K5,500",
    "discounted-price": "K5,000"
  },
  {
    "name": "LG 27QN880-B",
    "category": "Monitors",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "LG",
    "brand logo": "",
    "specs": {
      "size": "27 inches",
      "resolution": "QHD (2560x1440)",
      "panel-type": "IPS",
      "refresh-rate": "75Hz",
      "response-time": "5ms",
      "color-gamut": "sRGB 99%",
      "hdr": "HDR10",
      "vesa-mount": "Yes",
      "ports": ["USB Type-C", "HDMI", "DisplayPort"]
    },
    "date-added": "2025-03-06",
    "tagline": "Ergonomic design with comprehensive connectivity.",
    "description": "The LG 27QN880-B features an ergonomic stand with multiple adjustments and a USB Type-C port for convenient connectivity, catering to professionals seeking comfort and versatility.",
    "price": "K6,500",
    "discounted-price": "K6,000"
  },
  {
    "name": "LG 29WQ500-B",
    "category": "Monitors",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "LG",
    "brand logo": "",
    "specs": {
      "size": "29 inches",
      "resolution": "FHD (2560x1080)",
      "panel-type": "IPS",
      "refresh-rate": "75Hz",
      "response-time": "5ms",
      "color-gamut": "sRGB 99%",
      "hdr": "HDR10",
      "vesa-mount": "Yes",
      "ports": ["HDMI", "DisplayPort"]
    },
    "date-added": "2025-03-06",
    "tagline": "Wide-screen productivity with immersive visuals.",
    "description": "The LG 29WQ500-B ultrawide monitor enhances productivity with its expansive screen, providing clear and vibrant visuals suitable for multitasking and entertainment.",
    "price": "K4,500",
    "discounted-price": "K4,000"
  },
  {
    "name": "LG 32GP850-B",
    "category": "Monitors",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "LG",
    "brand logo": "",
    "specs": {
      "size": "32 inches",
      "resolution": "QHD (2560x1440)",
      "panel-type": "Nano IPS",
      "refresh-rate": "165Hz",
      "response-time": "1ms",
      "color-gamut": "sRGB 98%",
      "hdr": "HDR10",
      "vesa-mount": "Yes",
      "ports": ["HDMI", "DisplayPort"]
    },
    "date-added": "2025-03-06",
    "tagline": "High-speed gaming monitor with vibrant visuals.",
    "description": "The LG 32GP850-B offers a fast refresh rate and response time, ensuring smooth gameplay. Its Nano IPS panel delivers rich colors, and it's VESA mount compatible for flexible setup.",
    "price": "K7,500",
    "discounted-price": "K7,000"
  },
  {
    "name": "LG 55UL3J-M",
    "category": "Monitors",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "LG",
    "brand logo": "",
    "specs": {
      "size": "55 inches",
      "resolution": "4K UHD (3840x2160)",
      "panel-type": "IPS",
      "refresh-rate": "60Hz",
      "response-time": "8ms",
      "color-gamut": "sRGB 99%",
      "hdr": "HDR10",
      "vesa-mount": "Yes",
      "ports": ["HDMI", "DisplayPort", "USB"]
    },
    "date-added": "2025-03-06",
    "tagline": "Professional display with extended duty cycle.",
    "description": "Designed for continuous operation, the LG 55UL3J-M features a 16-hour duty cycle, making it suitable for business environments requiring prolonged display usage.",
    "price": "K12,000",
    "discounted-price": "K11,500"
  },
  {
    "name": "LG 65EP5G-B",
    "category": "Monitors",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "LG",
    "brand logo": "",
    "specs": {
      "size": "65 inches",
      "resolution": "UHD (3840x2160)",
      "panel-type": "OLED",
      "refresh-rate": "120Hz",
      "response-time": "1ms",
      "color-gamut": "P3 98.5%",
      "hdr": "HDR10, Dolby Vision",
      "vesa-mount": "Yes",
      "ports": ["HDMI", "DisplayPort", "USB-C"]
    },
    "date-added": "2025-03-06",
    "tagline": "Premium OLED display for professional applications.",
    "description": "The LG 65EP5G-B offers exceptional color accuracy and contrast with OLED technology, suitable for professional use with its 24/7 operation capability and advanced connectivity options.",
    "price": "K20,000",
    "discounted-price": "K19,500"
  },
  {
    "name": "Asus ZenScreen MB16AC",
    "category": "Monitors",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "Asus",
    "brand logo": brandLogo.Asus,
    "specs": {
      "size": "15.6 inches",
      "resolution": "Full HD (1920x1080)",
      "panel-type": "IPS",
      "refresh-rate": "60Hz",
      "response-time": "5ms",
      "color-gamut": "sRGB 100%",
      "hdr": "No",
      "vesa-mount": "No",
      "ports": ["USB Type-C", "USB Type-A (requires DisplayLink driver)"]
    },
    "date-added": "2025-03-06",
    "tagline": "Portable Full HD display with hybrid signal compatibility.",
    "description": "The Asus ZenScreen MB16AC is a 15.6-inch portable monitor featuring a Full HD IPS display. Its hybrid-signal solution allows compatibility with both USB Type-C and Type-A devices, making it versatile for various setups. The monitor is ultra-portable, weighing just 0.78 kg (1.7 lbs), and includes a foldable smart case that doubles as a stand, supporting both landscape and portrait orientations. ASUS Eye Care technology ensures a comfortable viewing experience by reducing blue light emissions and eliminating flicker.",
    "price": "K3,500",
    "discounted-price": "K3,000"
  },
  {
    "name": "Asus ZenScreen MB166C",
    "category": "Monitors",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "Asus",
    "brand logo": brandLogo.Asus,
    "specs": {
      "size": "15.6 inches",
      "resolution": "Full HD (1920x1080)",
      "panel-type": "IPS",
      "refresh-rate": "60Hz",
      "response-time": "5ms",
      "color-gamut": "sRGB 100%",
      "hdr": "No",
      "vesa-mount": "No",
      "ports": ["USB Type-C"]
    },
    "date-added": "2025-03-06",
    "tagline": "Sleek portable monitor with single-cable connectivity.",
    "description": "The Asus ZenScreen MB166C is a 15.6-inch Full HD portable monitor with an anti-glare IPS display. It features a single USB Type-C connection for both power and video transmission, simplifying setup and reducing cable clutter. The monitor is designed for portability, with a slim profile and lightweight build. ASUS Eye Care technology is incorporated to minimize eye strain during extended use.",
    "price": "K3,200",
    "discounted-price": "K2,800"
  },
  {
    "name": "Asus ZenScreen MB16QHG",
    "category": "Monitors",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "Asus",
    "brand logo": brandLogo.Asus,
    "specs": {
      "size": "15.6 inches",
      "resolution": "WQXGA (2560x1600)",
      "panel-type": "IPS",
      "refresh-rate": "120Hz",
      "response-time": "3ms",
      "color-gamut": "DCI-P3 100%",
      "hdr": "DisplayHDR 400",
      "vesa-mount": "Yes",
      "ports": ["USB Type-C", "HDMI"]
    },
    "date-added": "2025-03-06",
    "tagline": "High-refresh-rate portable monitor for smooth visuals.",
    "description": "The Asus ZenScreen MB16QHG is a 15.6-inch portable monitor featuring a high-resolution WQXGA IPS display with a 120Hz refresh rate, ensuring smooth visuals for multimedia and productivity tasks. It supports DisplayHDR 400 and covers 100% of the DCI-P3 color gamut, providing vibrant and accurate colors. Connectivity options include USB Type-C and HDMI ports, and the monitor comes with an L-shaped kickstand and tripod socket for flexible positioning.",
    "price": "K4,500",
    "discounted-price": "K4,000"
  },
  {
    "name": "Dell SE2422H",
    "category": "Monitors",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "Dell",
    "brand logo": brandLogo.Dell,
    "specs": {
      "size": "24 inches",
      "resolution": "Full HD (1920x1080)",
      "panel-type": "VA",
      "refresh-rate": "75Hz",
      "response-time": "5ms",
      "color-gamut": "sRGB 99%",
      "hdr": "No",
      "vesa-mount": "Yes",
      "ports": ["HDMI"]
    },
    "date-added": "2025-03-06",
    "tagline": "24-inch FHD monitor with fast response time for leisure gaming.",
    "description": "The Dell SE2422H features a 24-inch VA panel with a 75Hz refresh rate and 5ms response time, ensuring smooth visuals for casual gaming and daily tasks. Its slim design and VESA compatibility offer flexibility in mounting options.",
    "price": "K3,000",
    "discounted-price": "K2,800"
  },
  {
    "name": "Dell SE2722H",
    "category": "Monitors",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "Dell",
    "brand logo": brandLogo.Dell,
    "specs": {
      "size": "27 inches",
      "resolution": "Full HD (1920x1080)",
      "panel-type": "VA",
      "refresh-rate": "75Hz",
      "response-time": "5ms",
      "color-gamut": "sRGB 99%",
      "hdr": "No",
      "vesa-mount": "Yes",
      "ports": ["HDMI"]
    },
    "date-added": "2025-03-06",
    "tagline": "27-inch FHD monitor with enhanced comfort features.",
    "description": "The Dell SE2722H offers a larger 27-inch display with a 75Hz refresh rate and 5ms response time, providing a comfortable viewing experience for extended periods. Its ergonomic design includes tilt and height adjustments, and it supports VESA mounting.",
    "price": "K3,500",
    "discounted-price": "K3,200"
  },
  {
    "name": "Dell P2722H",
    "category": "Monitors",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "Dell",
    "brand logo": brandLogo.Dell,
    "specs": {
      "size": "27 inches",
      "resolution": "Full HD (1920x1080)",
      "panel-type": "IPS",
      "refresh-rate": "75Hz",
      "response-time": "5ms",
      "color-gamut": "sRGB 99%",
      "hdr": "No",
      "vesa-mount": "Yes",
      "ports": ["HDMI", "DisplayPort", "USB 3.2"]
    },
    "date-added": "2025-03-06",
    "tagline": "Professional-grade 27-inch monitor with versatile connectivity.",
    "description": "The Dell P2722H is designed for professionals, featuring a 27-inch IPS display with wide viewing angles and accurate color reproduction. It offers a range of connectivity options, including HDMI, DisplayPort, and USB 3.2 ports, and supports VESA mounting.",
    "price": "K4,000",
    "discounted-price": "K3,800"
  },
  {
    "name": "Dell S3422DW",
    "category": "Monitors",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "Dell",
    "brand logo": brandLogo.Dell,
    "specs": {
      "size": "34 inches",
      "resolution": "WQHD (3440x1440)",
      "panel-type": "VA",
      "refresh-rate": "100Hz",
      "response-time": "4ms",
      "color-gamut": "99% sRGB, 90% DCI-P3",
      "hdr": "HDR Ready",
      "vesa-mount": "Yes",
      "ports": ["HDMI", "DisplayPort", "USB 3.2"]
    },
    "date-added": "2025-03-06",
    "tagline": "Immersive curved display with wide color coverage.",
    "description": "The Dell S3422DW features a 34-inch curved VA panel with WQHD resolution, offering an immersive viewing experience. It provides 99% sRGB and 90% DCI-P3 color coverage, ensuring vibrant visuals. The monitor includes built-in dual 5W speakers and a height-adjustable stand for ergonomic comfort.",
    "price": "K5,500",
    "discounted-price": "K5,000"
  },
  {
    "name": "Dell U2723QE",
    "category": "Monitors",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "Dell",
    "brand logo": brandLogo.Dell,
    "specs": {
      "size": "27 inches",
      "resolution": "4K UHD (3840x2160)",
      "panel-type": "IPS",
      "refresh-rate": "120Hz",
      "response-time": "5ms",
      "color-gamut": "99% sRGB, 98% DCI-P3",
      "hdr": "DisplayHDR 400",
      "vesa-mount": "Yes",
      "ports": ["USB-C", "HDMI", "DisplayPort", "USB 3.2"]
    },
    "date-added": "2025-03-06",
    "tagline": "UltraSharp 4K display with enhanced refresh rate.",
    "description": "The Dell U2723QE offers a 27-inch 4K IPS display with a 120Hz refresh rate, providing sharp and smooth visuals. It features enhanced IPS Black technology for improved contrast and includes comprehensive connectivity options, including USB-C with 90W power delivery.",
    "price": "K7,000",
    "discounted-price": "K6,500"
  },
  {
    "name": "Dell U3223QE",
    "category": "Monitors",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "Dell",
    "brand logo": brandLogo.Dell,
    "specs": {
      "size": "32 inches",
      "resolution": "4K UHD (3840x2160)",
      "panel-type": "IPS",
      "refresh-rate": "120Hz",
      "response-time": "5ms",
      "color-gamut": "99% sRGB, 98% DCI-P3",
      "hdr": "DisplayHDR 400",
      "vesa-mount": "Yes",
      "ports": ["USB-C", "HDMI", "DisplayPort", "USB 3.2"]
    },
    "date-added": "2025-03-06",
    "tagline": "Larger UltraSharp 4K display with versatile connectivity.",
    "description": "The Dell U3223QE features a 32-inch 4K IPS display with a 120Hz refresh rate, offering expansive and detailed visuals. It includes multiple connectivity options, including USB-C with 90W power delivery, making it suitable for various professional setups.",
    "price": "K8,000",
    "discounted-price": "K7,500"
  },
  {
    "name": "Dell U4323QE",
    "category": "Monitors",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "Dell",
    "brand logo": brandLogo.Dell,
    "specs": {
      "size": "43 inches",
      "resolution": "4K UHD (3840x2160)",
      "panel-type": "IPS",
      "refresh-rate": "60Hz",
      "response-time": "8ms",
      "color-gamut": "99% sRGB, 98% DCI-P3",
      "hdr": "DisplayHDR 400",
      "vesa-mount": "Yes",
      "ports": ["USB-C", "HDMI", "DisplayPort", "USB 3.2"]
    },
    "date-added": "2025-03-06",
    "tagline": "Ultra-large 4K display for expansive workspace.",
    "description": "The Dell U4323QE offers a massive 43-inch 4K IPS display, ideal for multitasking and immersive viewing. It includes a variety of connectivity options, including USB-C with 90W power delivery, and features integrated speakers for enhanced audio.",
    "price": "K10,000",
    "discounted-price": "K9,500"
  },
  {
    "name": "Hikvision DS-D5019QE-B",
    "category": "Monitors",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "Hikvision",
    "brand logo": brandLogo.Hikvision,
    "specs": {
      "size": "19 inches",
      "resolution": "HD (1366x768)",
      "panel-type": "LED",
      "refresh-rate": "Not specified",
      "response-time": "Not specified",
      "color-gamut": "Not specified",
      "hdr": "No",
      "vesa-mount": "Not specified",
      "ports": ["HDMI", "VGA"]
    },
    "date-added": "2025-03-06",
    "tagline": "Compact monitor with HD resolution and versatile connectivity.",
    "description": "The Hikvision DS-D5019QE-B is a 19-inch LCD monitor featuring a high-definition resolution of 1366x768. It offers HDMI and VGA connectivity options, making it suitable for various surveillance setups. Designed for 24/7 operation, it's ideal for security monitoring needs.",
    "price": "K2,500",
    "discounted-price": "K2,200"
  },
  {
    "name": "Hikvision DS-D5032FC-A",
    "category": "Monitors",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "Hikvision",
    "brand logo": brandLogo.Hikvision,
    "specs": {
      "size": "32 inches",
      "resolution": "Full HD (1920x1080)",
      "panel-type": "LCD",
      "refresh-rate": "Not specified",
      "response-time": "Not specified",
      "color-gamut": "Not specified",
      "hdr": "No",
      "vesa-mount": "Not specified",
      "ports": ["HDMI", "VGA"]
    },
    "date-added": "2025-03-06",
    "tagline": "Large display with Full HD resolution and multiple input options.",
    "description": "The Hikvision DS-D5032FC-A is a 32-inch LCD monitor offering a Full HD resolution of 1920x1080. It includes HDMI and VGA ports, providing flexibility for different video sources. Designed for continuous operation, it's well-suited for surveillance and control center applications.",
    "price": "K5,000",
    "discounted-price": "K4,800"
  },
  {
    "name": "Hisense 32A4F",
    "category": "Smart TVs",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "Hisense",
    "brand logo": "",
    "specs": {
      "size": "32 inches",
      "resolution": "Full HD (1920x1080)",
      "panel-type": "LED",
      "smart-platform": "VIDAA U",
      "ports": ["HDMI", "USB"]
    },
    "date-added": "2025-03-06",
    "tagline": "32-inch Full HD Smart TV with VIDAA U platform.",
    "description": "The Hisense 32A4F offers clear Full HD resolution and comes equipped with the VIDAA U smart platform, providing access to popular streaming services. It includes multiple HDMI and USB ports for versatile connectivity.",
    "price": "K2,500",
    "discounted-price": "K2,200"
  },
  {
    "name": "Hisense 40A6G",
    "category": "Smart TVs",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "Hisense",
    "brand logo": "",
    "specs": {
      "size": "40 inches",
      "resolution": "Full HD (1920x1080)",
      "panel-type": "LED",
      "smart-platform": "Roku TV",
      "ports": ["HDMI", "USB"]
    },
    "date-added": "2025-03-06",
    "tagline": "40-inch Full HD Smart TV with Roku integration.",
    "description": "The Hisense 40A6G features a Full HD display and integrates Roku TV, offering a user-friendly interface with access to thousands of channels. It includes essential connectivity options like HDMI and USB ports.",
    "price": "K3,000",
    "discounted-price": "K2,800"
  },
  {
    "name": "Hisense 43A6G",
    "category": "Smart TVs",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "Hisense",
    "brand logo": "",
    "specs": {
      "size": "43 inches",
      "resolution": "4K UHD (3840x2160)",
      "panel-type": "LED",
      "smart-platform": "Roku TV",
      "ports": ["HDMI", "USB"]
    },
    "date-added": "2025-03-06",
    "tagline": "43-inch 4K UHD Smart TV with Roku integration.",
    "description": "The Hisense 43A6G offers a 4K UHD display with Roku TV, providing an expansive selection of streaming options. It comes with multiple HDMI and USB ports for various device connections.",
    "price": "K4,500",
    "discounted-price": "K4,200"
  },
  {
    "name": "Hisense 50U8G",
    "category": "Smart TVs",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "Hisense",
    "brand logo": "",
    "specs": {
      "size": "50 inches",
      "resolution": "4K UHD (3840x2160)",
      "panel-type": "ULED",
      "smart-platform": "Google TV",
      "ports": ["HDMI", "USB"]
    },
    "date-added": "2025-03-06",
    "tagline": "50-inch 4K ULED Smart TV with Google TV.",
    "description": "The Hisense 50U8G features ULED technology for enhanced picture quality and comes with Google TV, offering personalized recommendations and access to a wide range of apps. It includes multiple HDMI and USB ports for connectivity.",
    "price": "K6,000",
    "discounted-price": "K5,800"
  },
  {
    "name": "Hisense 55U8H",
    "category": "Smart TVs",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "Hisense",
    "brand logo": "",
    "specs": {
      "size": "55 inches",
      "resolution": "4K UHD (3840x2160)",
      "panel-type": "ULED",
      "smart-platform": "Google TV",
      "ports": ["HDMI", "USB"]
    },
    "date-added": "2025-03-06",
    "tagline": "55-inch 4K ULED Smart TV with Google TV.",
    "description": "The Hisense 55U8H offers a large 4K ULED display with Google TV, providing a rich array of streaming options and smart features. It includes multiple HDMI and USB ports for versatile connectivity.",
    "price": "K7,500",
    "discounted-price": "K7,200"
  },
  {
    "name": "Hisense 58U8H",
    "category": "Smart TVs",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "Hisense",
    "brand logo": "",
    "specs": {
      "size": "58 inches",
      "resolution": "4K UHD (3840x2160)",
      "panel-type": "ULED",
      "smart-platform": "Google TV",
      "ports": ["HDMI", "USB"]
    },
    "date-added": "2025-03-06",
    "tagline": "58-inch 4K ULED Smart TV with Google TV.",
    "description": "The Hisense 58U8H provides a spacious 4K ULED display with Google TV, offering extensive streaming capabilities and smart features. It comes with multiple HDMI and USB ports for various device connections.",
    "price": "K8,000",
    "discounted-price": "K7,800"
  },
  {
    "name": "Hisense 65U8H",
    "category": "Smart TVs",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "Hisense",
    "brand logo": "",
    "specs": {
      "size": "65 inches",
      "resolution": "4K UHD (3840x2160)",
      "panel-type": "ULED",
      "smart-platform": "Google TV",
      "ports": ["HDMI", "USB"]
    },
    "date-added": "2025-03-06",
    "tagline": "65-inch 4K ULED Smart TV with Google TV.",
    "description": "The Hisense 65U8H features a large 4K ULED display with Google TV, delivering an immersive viewing experience with access to a wide range of streaming services. It includes multiple HDMI and USB ports for connectivity.",
    "price": "K10,000",
    "discounted-price": "K9,800"
  },
  {
    "name": "Hisense 75U8H",
    "category": "Smart TVs",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "Hisense",
    "brand logo": "",
    "specs": {
      "size": "75 inches",
      "resolution": "4K UHD (3840x2160)",
      "panel-type": "ULED",
      "smart-platform": "Google TV",
      "ports": ["HDMI", "USB"]
    },
    "date-added": "2025-03-06",
    "tagline": "75-inch 4K ULED Smart TV with Google TV.",
    "description": "The Hisense 75U8H offers a massive 75-inch 4K ULED display with Google TV, providing excellent picture quality and access to a variety of streaming apps. It includes multiple HDMI and USB ports for diverse connectivity options.",
    "price": "K15,000",
    "discounted-price": "K14,500"
  },
  {
    "name": "Hisense 85U8H",
    "category": "Smart TVs",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "Hisense",
    "brand logo": "",
    "specs": {
      "size": "85 inches",
      "resolution": "4K UHD (3840x2160)",
      "panel-type": "ULED",
      "smart-platform": "Google TV",
      "ports": ["HDMI", "USB"]
    },
    "date-added": "2025-03-06",
    "tagline": "85-inch 4K ULED Smart TV with Google TV.",
    "description": "The Hisense 85U8H features an 85-inch 4K ULED display with Google TV, offering an immersive cinematic experience with a broad range of smart features. With HDMI and USB ports, it's ideal for large living rooms and entertainment spaces.",
    "price": "K20,000",
    "discounted-price": "K19,500"
  },
  {
    "name": "Hisense 4K Trichroma Laser Cinema Projector",
    "category": "Projectors",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "Hisense",
    "brand logo": "",
    "specs": {
      "resolution": "4K UHD (3840x2160)",
      "light-source": "TriChroma RGB laser engine",
      "brightness": "Up to 3,000 ANSI lumens",
      "color-gamut": "110% BT.2020 color space",
      "screen-size": "80 to 150 inches",
      "hdr-support": "HDR10, HLG, Dolby Vision, HDR10+",
      "audio": "Harman Kardon speakers with Dolby Atmos",
      "gaming": "Certified for Xbox, high refresh rates, low latency",
      "smart-platform": "Google TV"
    },
    "date-added": "2025-03-06",
    "tagline": "Trichroma Laser for superior color accuracy and immersive 4K HDR visuals.",
    "description": "The Hisense 4K Trichroma Laser Cinema Projector delivers stunning picture quality with its tri-chroma RGB laser engine and support for a wide range of color and HDR formats. Its built-in Harman Kardon speakers offer immersive audio, while Google TV provides easy access to your favorite streaming services.",
    "price": "K12,000",
    "discounted-price": "K11,500"
  },
  {
    "name": "Hisense C1 Laser Smart Projector",
    "category": "Projectors",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "Hisense",
    "brand logo": "",
    "specs": {
      "resolution": "4K UHD (3840x2160)",
      "light-source": "RGB triple laser",
      "brightness": "Up to 1,600 ANSI lumens",
      "color-gamut": "110% BT.2020 color space",
      "screen-size": "65 to 300 inches",
      "hdr-support": "HDR10, Dolby Vision",
      "audio": "JBL 20-watt speakers with Dolby Atmos",
      "smart-platform": "VIDAA OS",
      "safety-features": "Curious toddler detection system"
    },
    "date-added": "2025-03-06",
    "tagline": "Portable and compact with stunning 4K laser performance.",
    "description": "The Hisense C1 Laser Smart Projector offers 4K resolution, RGB triple laser technology, and vivid color accuracy, making it perfect for both home entertainment and on-the-go use. It includes JBL audio with Dolby Atmos and runs on VIDAA OS, giving you access to popular streaming services.",
    "price": "K8,000",
    "discounted-price": "K7,500"
  },
  {
    "name": "Hisense PL1 Laser TV 4K",
    "category": "Projectors",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "Hisense",
    "brand logo": "",
    "specs": {
      "resolution": "4K UHD (3840x2160)",
      "light-source": "Blue phosphor laser",
      "brightness": "2,200 ANSI lumens",
      "screen-size": "80 to 120 inches",
      "hdr-support": "HDR10, Dolby Vision",
      "audio": "Dolby Atmos",
      "smart-platform": "VIDAA U6",
      "ports": ["HDMI 2.1", "USB"]
    },
    "date-added": "2025-03-06",
    "tagline": "Transform your home into a cinematic experience with vibrant 4K visuals and immersive sound.",
    "description": "The Hisense PL1 Laser TV 4K utilizes ultra-short throw technology to project images ranging from 80 to 120 inches, delivering vivid and lifelike visuals. It supports HDR10 and Dolby Vision for enhanced picture quality and features Dolby Atmos for an immersive audio experience. The projector operates on VIDAA U6, providing access to various streaming services. Please note that the projector screen is sold separately.",
    "price": "K10,500",
    "discounted-price": "K9,800"
  },
  {
    "name": "Huawei IdeaHub S2 65\" Interactive Display",
    "category": "Interactive Displays",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "Huawei",
    "brand logo": "",
    "specs": {
      "screen-size": "65 inches",
      "resolution": "4K UHD (3840x2160)",
      "touchpoints": "20-point multi-touch",
      "camera": "1080p30 resolution with Auto Framing and voice tracking",
      "speakers": "6 stereo speakers (40Hz–20kHz)",
      "microphones": "12 microphones with 8m pickup distance",
      "ports": ["HDMI 2.1", "USB Type-C", "USB 3.0", "RJ45 Ethernet", "Wi-Fi 6"]
    },
    "date-added": "2025-03-06",
    "tagline": "Seamless collaboration with HD video conferencing and interactive touch capabilities.",
    "description": "The Huawei IdeaHub S2 65\" Interactive Display transforms meeting rooms into smart collaboration spaces. It features a 4K UHD display with 20-point multi-touch support, a 1080p camera with Auto Framing, and high-fidelity audio with 6 stereo speakers and 12 microphones. Equipped with Wi-Fi 6 for direct projection, it ensures smooth connectivity and collaboration.",
    "price": "K15,000",
    "discounted-price": "K14,500"
  },
  {
    "name": "Huawei IdeaHub S2 75\" Interactive Display",
    "category": "Interactive Displays",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "Huawei",
    "brand logo": "",
    "specs": {
      "screen-size": "75 inches",
      "resolution": "4K UHD (3840x2160)",
      "touchpoints": "20-point multi-touch",
      "camera": "1080p30 resolution with Auto Framing and voice tracking",
      "speakers": "6 stereo speakers (40Hz–20kHz)",
      "microphones": "12 microphones with 8m pickup distance",
      "ports": ["HDMI 2.1", "USB Type-C", "USB 3.0", "RJ45 Ethernet", "Wi-Fi 6"]
    },
    "date-added": "2025-03-06",
    "tagline": "Enhanced collaboration experience with a larger interactive display and advanced features.",
    "description": "The Huawei IdeaHub S2 75\" Interactive Display offers an expansive 75-inch 4K UHD touchscreen, ideal for larger meeting spaces. It includes a 1080p camera with Auto Framing, immersive audio with 6 stereo speakers and 12 microphones, and Wi-Fi 6 connectivity for seamless collaboration and productivity.",
    "price": "K18,000",
    "discounted-price": "K17,500"
  },
  {
    "name": "Huawei IdeaHub S2 86\" Interactive Display",
    "category": "Interactive Displays",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "Huawei",
    "brand logo": "",
    "specs": {
      "screen-size": "86 inches",
      "resolution": "4K UHD (3840x2160)",
      "touchpoints": "20-point multi-touch",
      "camera": "1080p30 resolution with Auto Framing and voice tracking",
      "speakers": "6 stereo speakers (40Hz–20kHz)",
      "microphones": "12 microphones with 8m pickup distance",
      "ports": ["HDMI 2.1", "USB Type-C", "USB 3.0", "RJ45 Ethernet", "Wi-Fi 6"]
    },
    "date-added": "2025-03-06",
    "tagline": "Ultimate interactive display solution for large venues with superior collaboration features.",
    "description": "The Huawei IdeaHub S2 86\" Interactive Display provides a massive 86-inch 4K UHD touchscreen, perfect for large conference rooms and auditoriums. It features a 1080p camera with Auto Framing, high-quality audio with 6 stereo speakers and 12 microphones, and Wi-Fi 6 technology for efficient wireless collaboration.",
    "price": "K22,000",
    "discounted-price": "K21,500"
  },

  // George
  {
    "name": "ADATA XPG INVADER Mid-Tower Gaming Case",
    "category": "Components",
    "subcategory": "Cases",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "ADATA",
    "brand logo": "",
    "specs": {
      "type": "Mid-Tower",
      "motherboard-support": "ATX, Micro-ATX, Mini-ITX",
      "drive-bays": "2 x 2.5\" / 3.5\" Combo Bays, 1 x 2.5\" Bay",
      "expansion-slots": "7",
      "front-i-o-ports": "2 x USB 3.2 Gen 1, 1 x Headphone, 1 x Microphone",
      "radiator-support": {
        "front": "120 mm, 140 mm, 240 mm, 280 mm, 360 mm",
        "top": "120 mm, 140 mm, 240 mm, 280 mm, 360 mm",
        "rear": "120 mm"
      },
      "cooling-support": {
        "front": "3 x 120 mm, 2 x 140 mm",
        "top": "3 x 120 mm, 2 x 140 mm",
        "rear": "1 x 120 mm"
      },
      "maximum-cpu-cooler-height": "165 mm",
      "maximum-gpu-length": "380 mm",
      "maximum-psu-length": "210 mm",
      "dimensions": "220 mm (W) x 430 mm (H) x 465 mm (D)",
      "weight": "7.3 kg",
      "features": [
        "Tool-less design for easy installation",
        "High-airflow layout for optimal cooling",
        "Front RGB downlight with customizable lighting modes"
      ]
    },
    "date-added": "2025-03-06",
    "tagline": "Sleek design with customizable RGB lighting and efficient airflow.",
    "description": "ADATA XPG INVADER case offers stylish design, easy assembly, and customizable RGB lighting.",
    "price": "K1,500",
    "discounted-price": "K1,400"
  },
  {
    "name": "ASUS A21 Micro-ATX Chassis",
    "category": "Components",
    "subcategory": "Cases",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "ASUS",
    "brand logo": brandLogo.Asus,
    "specs": {
      "type": "Micro-ATX",
      "motherboard-support": "Micro-ATX, Mini-ITX",
      "drive-bays": "2 x 2.5\" / 3.5\" Combo Bays, 1 x 2.5\" Bay",
      "expansion-slots": "5",
      "front-i-o-ports": "2 x USB 3.2 Gen 1, 1 x Headphone, 1 x Microphone",
      "radiator-support": {
        "front": "120 mm, 140 mm, 240 mm, 280 mm, 360 mm",
        "top": "120 mm, 140 mm, 240 mm, 280 mm, 360 mm",
        "rear": "120 mm"
      },
      "cooling-support": {
        "front": "3 x 120 mm, 2 x 140 mm",
        "top": "3 x 120 mm, 2 x 140 mm",
        "rear": "1 x 120 mm"
      },
      "maximum-cpu-cooler-height": "165 mm",
      "maximum-gpu-length": "380 mm",
      "maximum-psu-length": "210 mm",
      "dimensions": "220 mm (W) x 430 mm (H) x 465 mm (D)",
      "features": [
        "Supports hidden-connector motherboards for clean cable management",
        "Front-panel mesh design for enhanced airflow",
        "Ample space for high-performance components"
      ]
    },
    "date-added": "2025-03-06",
    "tagline": "Compact design with excellent cooling and cable management features.",
    "description": "The ASUS A21 Micro-ATX Chassis is designed for minimalist DIY PC builders seeking a balance between size and functionality. It supports various AIO coolers and graphics cards, providing flexibility for different build configurations. The front-panel mesh enhances airflow, and the chassis offers sufficient space for cable management to maintain a clean interior.",
    "price": "K1,200",
    "discounted-price": "K1,100"
  },
  {
    "name": "ASUS AMD Ryzen Micro-ATX Motherboard",
    "category": "Components",
    "subcategory": "Motherboards",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "ASUS",
    "brand logo": brandLogo.Asus,
    "specs": {
      "socket": "AM4",
      "chipset": "B550",
      "form-factor": "Micro-ATX",
      "memory-support": "DDR4",
      "pci-express": "PCIe 4.0",
      "m-2-slots": "2",
      "usb-ports": "USB 3.2 Gen 1",
      "ethernet": "Realtek 1Gb",
      "video-outputs": "HDMI, DisplayPort",
      "features": [
        "Dual M.2 slots",
        "Aura Sync RGB lighting",
        "Comprehensive cooling solutions"
      ]
    },
    "date-added": "2025-03-06",
    "tagline": "Micro-ATX motherboard designed for AMD Ryzen processors with advanced features.",
    "description": "This ASUS motherboard supports AMD Ryzen processors with the AM4 socket and B550 chipset. It offers dual M.2 slots, PCIe 4.0 support, and comprehensive cooling solutions, making it ideal for compact gaming builds.",
    "price": "K1,200",
    "discounted-price": "K1,100"
  },
  {
    "name": "ASUS Intel H610 LGA1700 Micro-ATX Motherboard",
    "category": "Components",
    "subcategory": "Motherboards",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "ASUS",
    "brand logo": brandLogo.Asus,
    "specs": {
      "socket": "LGA1700",
      "chipset": "H610",
      "form-factor": "Micro-ATX",
      "memory-support": "DDR4",
      "pci-express": "PCIe 4.0",
      "m-2-slots": "1",
      "usb-ports": "USB 3.2 Gen 1",
      "ethernet": "Realtek 1Gb",
      "video-outputs": "HDMI, DisplayPort, D-Sub",
      "features": [
        "PCIe 4.0 support",
        "32Gbps M.2 slot",
        "Aura Sync RGB header"
      ]
    },
    "date-added": "2025-03-06",
    "tagline": "Micro-ATX motherboard for Intel LGA1700 processors with essential features.",
    "description": "The ASUS Intel H610 motherboard supports LGA1700 processors and offers features like PCIe 4.0, a 32Gbps M.2 slot, and Aura Sync RGB lighting, catering to both daily users and DIY builders.",
    "price": "K1,100",
    "discounted-price": "K1,000"
  },
  {
    "name": "ASUS PRIME A520M-K Micro-ATX Motherboard",
    "category": "Components",
    "subcategory": "Motherboards",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "ASUS",
    "brand logo": brandLogo.Asus,
    "specs": {
      "socket": "AM4",
      "chipset": "A520",
      "form-factor": "Micro-ATX",
      "memory-support": "DDR4",
      "pci-express": "PCIe 3.0",
      "m-2-slots": "1",
      "usb-ports": "USB 3.2 Gen 1",
      "ethernet": "Realtek 1Gb",
      "video-outputs": "HDMI, D-Sub",
      "features": [
        "M.2 support",
        "Realtek 1Gb Ethernet",
        "Affordable and reliable"
      ]
    },
    "date-added": "2025-03-06",
    "tagline": "Budget-friendly Micro-ATX motherboard for AMD Ryzen processors.",
    "description": "The ASUS PRIME A520M-K motherboard offers essential features for AMD Ryzen processors, including M.2 support and Realtek 1Gb Ethernet, making it a reliable choice for budget-conscious builds.",
    "price": "K800",
    "discounted-price": "K700"
  },
  {
    "name": "ASUS AMD B650 PLUS RYZEN AM5 ATX TUF GAMING Motherboard",
    "category": "Components",
    "subcategory": "Motherboards",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "ASUS",
    "brand logo": brandLogo.Asus,
    "specs": {
      "socket": "AM5",
      "chipset": "B650",
      "form-factor": "ATX",
      "memory-support": "DDR5",
      "pci-express": "PCIe 5.0",
      "m-2-slots": "2",
      "usb-ports": "USB 3.2 Gen 2",
      "ethernet": "2.5Gb Ethernet",
      "video-outputs": "HDMI",
      "features": [
        "PCIe 5.0 support",
        "Dual M.2 slots",
        "TUF Gaming durability"
      ]
    },
    "date-added": "2025-03-06",
    "tagline": "High-performance ATX motherboard for AMD Ryzen AM5 processors with gaming features.",
    "description": "The ASUS TUF Gaming B650 PLUS motherboard is designed for AMD Ryzen AM5 processors, offering PCIe 5.0 support, dual M.2 slots, and enhanced durability, making it ideal for gaming enthusiasts.",
    "price": "K1,500",
    "discounted-price": "K1,400"
  },
  {
    "name": "ASUS PRIME X670-P WiFi AMD AM5 ATX Motherboard",
    "category": "Components",
    "subcategory": "Motherboards",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "ASUS",
    "brand logo": brandLogo.Asus,
    "specs": {
      "socket": "AM5",
      "chipset": "X670",
      "form-factor": "ATX",
      "memory-support": "DDR5",
      "pci-express": "PCIe 5.0",
      "m-2-slots": "3",
      "usb-ports": "USB 3.2 Gen 2x2 Type-C®, USB4®",
      "ethernet": "2.5Gb Ethernet",
      "wifi": "Wi-Fi 6",
      "features": [
        "PCIe 5.0 storage support",
        "Three M.2 slots",
        "USB4 support",
        "BIOS FlashBack™",
        "DisplayPort/HDMI",
        "Thunderbolt™ 4 header",
        "AI Cooling II",
        "Aura Sync",
        "M.2 Q-Latch",
        "Q-LED Core",
        "ASUS OptiMem II",
        "MyASUS"
      ]
    },
    "date-added": "2025-03-06",
    "tagline": "High-performance ATX motherboard with advanced connectivity and cooling features.",
    "description": "The ASUS PRIME X670-P WiFi motherboard is designed for AMD Ryzen AM5 processors, offering PCIe 5.0 storage support, three M.2 slots, USB4 support, and Wi-Fi 6 connectivity. It also features comprehensive cooling solutions and customizable lighting options.",
    "price": "K1,800",
    "discounted-price": "K1,700"
  },
  {
    "name": "ASUS Prime GeForce RTX™ 4070 SUPER OC Edition 12GB GDDR6X Graphics Card",
    "category": "Components",
    "subcategory": "Graphics Cards",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "ASUS",
    "brand logo": brandLogo.Asus,
    "specs": {
      "gpu": "NVIDIA GeForce RTX™ 4070 SUPER",
      "memory": "12GB GDDR6X",
      "pci-express": "PCIe 4.0",
      "ports": "HDMI 2.1a, DisplayPort™ 1.4a",
      "features": [
        "Triple-fan cooling system",
        "Axial-tech fan design",
        "0dB technology",
        "Powered by NVIDIA DLSS3",
        "Ultra-efficient Ada Lovelace architecture",
        "Full ray tracing support"
      ]
    },
    "date-added": "2025-03-06",
    "tagline": "High-performance graphics card with advanced cooling and AI-enhanced gaming features.",
    "description": "The ASUS Prime GeForce RTX™ 4070 SUPER OC Edition graphics card delivers exceptional gaming performance with its 12GB GDDR6X memory and advanced cooling system. It supports NVIDIA DLSS3 and full ray tracing for immersive gaming experiences.",
    "price": "K3,500",
    "discounted-price": "K3,300"
  },
  {
    "name": "ASUS ROG Strix X870-A Gaming WiFi AMD AM5 ATX Motherboard",
    "category": "Components",
    "subcategory": "Motherboards",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "ASUS",
    "brand logo": brandLogo.Asus,
    "specs": {
      "socket": "AM5",
      "chipset": "X870",
      "form-factor": "ATX",
      "memory-support": "DDR5",
      "pci-express": "PCIe 5.0",
      "m-2-slots": "4",
      "usb-ports": "USB4®",
      "ethernet": "Wi-Fi 7",
      "features": [
        "16+2+2 power stages",
        "Dynamic OC Switcher",
        "Core Flex",
        "DDR5 AEMP",
        "Q-Release Slim",
        "AI OCing & Networking"
      ]
    },
    "date-added": "2025-03-06",
    "tagline": "Premium ATX motherboard with advanced overclocking and networking features.",
    "description": "The ASUS ROG Strix X870-A Gaming WiFi motherboard is built for AMD Ryzen processors, offering robust power delivery, advanced overclocking capabilities, and high-speed networking with Wi-Fi 7 support. It also features multiple M.2 slots and USB4® connectivity.",
    "price": "K2,000",
    "discounted-price": "K1,900"
  },
  {
    "name": "ASUS ROG Strix GeForce RTX™ 4070 SUPER 12GB GDDR6X OC Edition",
    "category": "Components",
    "subcategory": "Graphics Cards",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "ASUS",
    "brand logo": brandLogo.Asus,
    "specs": {
      "gpu": "NVIDIA GeForce RTX™ 4070 SUPER",
      "memory": "12GB GDDR6X",
      "pci-express": "PCIe 4.0",
      "ports": "HDMI 2.1a, DisplayPort™ 1.4a",
      "features": [
        "DLSS 3 support",
        "Advanced thermal design for optimal cooling",
        "Aura Sync RGB lighting",
        "Robust power delivery system"
      ]
    },
    "date-added": "2025-03-06",
    "tagline": "High-performance graphics card with DLSS 3 and superior thermal management.",
    "description": "The ASUS ROG Strix GeForce RTX™ 4070 SUPER OC Edition offers exceptional gaming performance with 12GB of GDDR6X memory and advanced cooling solutions. It supports NVIDIA's DLSS 3 technology for enhanced frame rates and visual quality.",
    "price": "K3,200",
    "discounted-price": "K3,000"
  },
  {
    "name": "ASUS TUF Gaming GeForce RTX™ 4070 Ti SUPER 16GB GDDR6X OC Edition",
    "category": "Components",
    "subcategory": "Graphics Cards",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "ASUS",
    "brand logo": brandLogo.Asus,
    "specs": {
      "gpu": "NVIDIA GeForce RTX™ 4070 Ti SUPER",
      "memory": "16GB GDDR6X",
      "pci-express": "PCIe 4.0",
      "ports": "HDMI 2.1a, DisplayPort™ 1.4a",
      "features": [
        "DLSS 3 support",
        "Enhanced cooling with advanced fan design",
        "Military-grade durability components",
        "Factory overclocked for superior performance"
      ]
    },
    "date-added": "2025-03-06",
    "tagline": "Enhanced durability and performance with DLSS 3 support.",
    "description": "The ASUS TUF Gaming GeForce RTX™ 4070 Ti SUPER OC Edition is built for gamers seeking high performance and reliability. With 16GB of GDDR6X memory and DLSS 3 support, it delivers smooth and immersive gaming experiences.",
    "price": "K3,800",
    "discounted-price": "K3,600"
  },
  {
    "name": "ASUS TUF Gaming GeForce RTX™ 4080 SUPER 16GB GDDR6X OC Edition",
    "category": "Components",
    "subcategory": "Graphics Cards",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "ASUS",
    "brand logo": brandLogo.Asus,
    "specs": {
      "gpu": "NVIDIA GeForce RTX™ 4080 SUPER",
      "memory": "16GB GDDR6X",
      "pci-express": "PCIe 4.0",
      "ports": "HDMI 2.1a, DisplayPort™ 1.4a",
      "features": [
        "DLSS 3 support",
        "Enhanced cooling with advanced fan design",
        "Military-grade durability components",
        "Factory overclocked for superior performance"
      ]
    },
    "date-added": "2025-03-06",
    "tagline": "Top-tier performance with DLSS 3 and superior cooling.",
    "description": "The ASUS TUF Gaming GeForce RTX™ 4080 SUPER OC Edition is designed for enthusiasts seeking the pinnacle of gaming performance. With 16GB of GDDR6X memory and DLSS 3 support, it ensures exceptional frame rates and visual fidelity.",
    "price": "K5,000",
    "discounted-price": "K4,800"
  },
  {
    "name": "AMD Ryzen 3 1200",
    "category": "Components",
    "subcategory": "Processors",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "AMD",
    "brand logo": "",
    "specs": {
      "cores": 4,
      "threads": 4,
      "base-clock": "3.1 GHz",
      "boost-clock": "3.4 GHz",
      "cache": "192 KB L1, 512 KB L2, 2 MB L3",
      "tdp": "95W",
      "socket": "AM4"
    },
    "date-added": "2025-03-06",
    "tagline": "Quad-core processor suitable for entry-level gaming and multitasking.",
    "description": "The AMD Ryzen 3 1200 offers four cores and four threads, providing a base clock of 3.1 GHz with a boost up to 3.4 GHz. It's ideal for users seeking reliable performance for everyday computing tasks.",
    "price": "K500",
    "discounted-price": "K450"
  },
  {
    "name": "AMD Ryzen 5 3600",
    "category": "Components",
    "subcategory": "Processors",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "AMD",
    "brand logo": "",
    "specs": {
      "cores": 6,
      "threads": 12,
      "base-clock": "3.6 GHz",
      "boost-clock": "4.2 GHz",
      "cache": "384 KB L1, 512 KB L2, 16 MB L3",
      "tdp": "95W",
      "socket": "AM4"
    },
    "date-added": "2025-03-06",
    "tagline": "Hexa-core processor delivering strong performance for gaming and productivity.",
    "description": "The AMD Ryzen 5 3600 features six cores and twelve threads, with a base clock of 3.6 GHz and boost up to 4.2 GHz. It's well-suited for gaming, content creation, and multitasking.",
    "price": "K800",
    "discounted-price": "K750"
  },
  {
    "name": "AMD Ryzen 7 5800X",
    "category": "Components",
    "subcategory": "Processors",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "AMD",
    "brand logo": "",
    "specs": {
      "cores": 8,
      "threads": 16,
      "base-clock": "3.8 GHz",
      "boost-clock": "4.7 GHz",
      "cache": "384 KB L1, 512 KB L2, 32 MB L3",
      "tdp": "105W",
      "socket": "AM4"
    },
    "date-added": "2025-03-06",
    "tagline": "Octa-core processor offering high-end performance for gaming and professional applications.",
    "description": "The AMD Ryzen 7 5800X provides eight cores and sixteen threads, with a base clock of 3.8 GHz and boost up to 4.7 GHz. It's designed for users requiring top-tier performance for demanding tasks.",
    "price": "K1,200",
    "discounted-price": "K1,100"
  },
  {
    "name": "Intel Core i3-10100",
    "category": "Components",
    "subcategory": "Processors",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "Intel",
    "brand logo": "",
    "specs": {
      "cores": 4,
      "threads": 8,
      "base-clock": "3.6 GHz",
      "boost-clock": "4.3 GHz",
      "cache": "6 MB",
      "tdp": "65W",
      "socket": "LGA1200"
    },
    "date-added": "2025-03-06",
    "tagline": "Quad-core processor ideal for everyday computing tasks.",
    "description": "The Intel Core i3-10100 offers four cores and eight threads, providing reliable performance for web browsing, office applications, and light multitasking.",
    "price": "K600",
    "discounted-price": "K550"
  },
  {
    "name": "Intel Core i5-10400",
    "category": "Components",
    "subcategory": "Processors",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "Intel",
    "brand logo": "",
    "specs": {
      "cores": 6,
      "threads": 12,
      "base-clock": "2.9 GHz",
      "boost-clock": "4.3 GHz",
      "cache": "12 MB",
      "tdp": "65W",
      "socket": "LGA1200"
    },
    "date-added": "2025-03-06",
    "tagline": "Hexa-core processor offering a balance between performance and power efficiency.",
    "description": "The Intel Core i5-10400 features six cores and twelve threads, suitable for gaming, content creation, and multitasking without significant power consumption.",
    "price": "K800",
    "discounted-price": "K750"
  },
  {
    "name": "Intel Core i7-10700K",
    "category": "Components",
    "subcategory": "Processors",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "Intel",
    "brand logo": "",
    "specs": {
      "cores": 8,
      "threads": 16,
      "base-clock": "3.8 GHz",
      "boost-clock": "5.1 GHz",
      "cache": "16 MB",
      "tdp": "125W",
      "socket": "LGA1200"
    },
    "date-added": "2025-03-06",
    "tagline": "Octa-core processor delivering high-end performance for demanding applications.",
    "description": "The Intel Core i7-10700K provides eight cores and sixteen threads, ideal for enthusiasts seeking top-tier performance in gaming and professional workloads.",
    "price": "K1,200",
    "discounted-price": "K1,100"
  },
  {
    "name": "Intel Xeon Silver 4208",
    "category": "Components",
    "subcategory": "Processors",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "Intel",
    "brand logo": "",
    "specs": {
      "cores": 8,
      "threads": 16,
      "base-clock": "2.1 GHz",
      "boost-clock": "3.2 GHz",
      "cache": "11 MB",
      "tdp": "85W",
      "socket": "LGA3647"
    },
    "date-added": "2025-03-06",
    "tagline": "Server-grade processor offering essential performance for entry-level data centers.",
    "description": "The Intel Xeon Silver 4208 features eight cores and sixteen threads, providing reliable performance and power efficiency for server applications.",
    "price": "K1,500",
    "discounted-price": "K1,400"
  },
  {
    "name": "Intel Xeon Silver 4310",
    "category": "Components",
    "subcategory": "Processors",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "Intel",
    "brand logo": "",
    "specs": {
      "cores": 12,
      "threads": 24,
      "base-clock": "2.1 GHz",
      "boost-clock": "3.3 GHz",
      "cache": "18 MB",
      "tdp": "120W",
      "socket": "LGA3647"
    },
    "date-added": "2025-03-06",
    "tagline": "High-performance processor designed for demanding server workloads.",
    "description": "The Intel Xeon Silver 4310 offers twelve cores and twenty-four threads, delivering enhanced performance for complex data center applications.",
    "price": "K2,000",
    "discounted-price": "K1,900"
  },
  {
    "name": "ASUS GeForce GT 710 2GB DDR3",
    "category": "Components",
    "subcategory": "Graphics Cards",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "ASUS",
    "brand logo": brandLogo.Asus,
    "specs": {
      "graphics_engine": "NVIDIA GeForce GT 710",
      "bus_standard": "PCI Express 2.0",
      "video_memory": "2GB DDR3",
      "engine_clock": "954 MHz",
      "cuda_cores": 192,
      "memory_speed": "900 MHz",
      "memory_interface": "64-bit",
      "max_resolution": "2560 x 1600",
      "interface": "HDMI, DVI-D, VGA",
      "directx": "DirectX 12",
      "opengl": "OpenGL 4.5",
      "dimensions": "167 x 69 x 17 mm"
    },
    "date_added": "2025-03-06",
    "tagline": "Low-profile graphics card ideal for silent HTPC builds.",
    "description": "The ASUS GeForce GT 710 2GB DDR3 EVO is a low-profile graphics card designed for silent home theater PC (HTPC) builds. It offers reliable performance for multimedia applications and supports resolutions up to 2560 x 1600.",
    "price": "K500",
    "discounted price": "K450"
  },
  {
    "name": "ASUS Dual GeForce GTX 1650 V2 OC Edition 4GB GDDR6",
    "category": "Components",
    "subcategory": "Graphics Cards",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "ASUS",
    "brand logo": brandLogo.Asus,
    "specs": {
      "graphics_engine": "NVIDIA GeForce GTX 1650",
      "bus_standard": "PCI Express 3.0",
      "video_memory": "4GB GDDR6",
      "engine_clock": "Base: 1410 MHz, Boost: 1620 MHz (OC Mode)",
      "cuda_cores": 896,
      "memory_speed": "12 Gbps",
      "memory_interface": "128-bit",
      "max_resolution": "7680 x 4320",
      "interface": "HDMI 2.0b, DisplayPort 1.4, DVI-D",
      "directx": "DirectX 12",
      "opengl": "OpenGL 4.6",
      "dimensions": "204 x 115 x 42 mm"
    },
    "date_added": "2025-03-06",
    "tagline": "Experience high-definition gaming with advanced cooling.",
    "description": "The ASUS Dual GeForce GTX 1650 V2 OC Edition 4GB GDDR6 is built with advanced cooling technologies derived from flagship graphics cards. It delivers high refresh rates in high definition, making it a perfect choice for a well-balanced gaming build.",
    "price": "K1,200",
    "discounted price": "K1,100"
  },
  {
    "name": "ASUS Dual GeForce RTX 3050 OC Edition 8GB GDDR6",
    "category": "Components",
    "subcategory": "Graphics Cards",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "ASUS",
    "brand logo": brandLogo.Asus,
    "specs": {
      "graphics_engine": "NVIDIA GeForce RTX 3050",
      "bus_standard": "PCI Express 4.0",
      "video_memory": "8GB GDDR6",
      "engine_clock": "Base: 1552 MHz, Boost: 1777 MHz (OC Mode)",
      "cuda_cores": 2560,
      "memory_speed": "14 Gbps",
      "memory_interface": "128-bit",
      "max_resolution": "7680 x 4320",
      "interface": "HDMI 2.1, DisplayPort 1.4a",
      "directx": "DirectX 12 Ultimate",
      "opengl": "OpenGL 4.6",
      "dimensions": "200 x 123 x 38 mm"
    },
    "date_added": "2025-03-06",
    "tagline": "Elevate your gaming experience with real-time ray tracing.",
    "description": "The ASUS Dual GeForce RTX 3050 OC Edition 8GB GDDR6 brings the power of real-time ray tracing and AI to your PC games. With advanced cooling solutions and robust performance, it offers an immersive gaming experience.",
    "price": "K2,500",
    "discounted price": "K2,300"
  },
  {
    "name": "ASUS Dual GeForce RTX 4060 OC Edition 8GB GDDR6",
    "category": "Components",
    "subcategory": "Graphics Cards",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "ASUS",
    "brand logo": brandLogo.Asus,
    "specs": {
      "graphics_engine": "NVIDIA GeForce RTX 4060",
      "bus_standard": "PCI Express 4.0",
      "video_memory": "8GB GDDR6",
      "engine_clock": "Base: 1830 MHz, Boost: 2100 MHz (OC Mode)",
      "cuda_cores": 3072,
      "memory_speed": "16 Gbps",
      "memory_interface": "192-bit",
      "max_resolution": "7680 x 4320",
      "interface": "HDMI 2.1, DisplayPort 1.4a",
      "directx": "DirectX 12 Ultimate",
      "opengl": "OpenGL 4.6",
      "dimensions": "242 x 130 x 53 mm"
    },
    "date_added": "2025-03-06",
    "tagline": "Unleash next-gen gaming performance with advanced cooling.",
    "description": "The ASUS Dual GeForce RTX 4060 OC Edition 8GB GDDR6 is designed for gamers seeking next-generation performance. With enhanced cooling solutions and support for the latest technologies, it ensures smooth and immersive gameplay.",
    "price": "K3,800",
    "discounted price": "K3,500"
  },
  {
    "name": "ASUS Dual GeForce RTX 4060 EVO OC Edition 8GB GDDR6",
    "category": "Components",
    "subcategory": "Graphics Cards",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "ASUS",
    "brand logo": brandLogo.Asus,
    "specs": {
      "graphics_engine": "NVIDIA GeForce RTX 4060",
      "bus_standard": "PCI Express 4.0",
      "video_memory": "8GB GDDR6",
      "engine_clock": "Boost Clock: 2535 MHz (OC mode), 2505 MHz (default mode)",
      "cuda_cores": 3072,
      "memory_speed": "17 Gbps",
      "memory_interface": "128-bit",
      "max_resolution": "7680 x 4320",
      "interface": ["1 x HDMI 2.1a", "3 x DisplayPort 1.4a"],
      "directx": "DirectX 12 Ultimate",
      "opengl": "OpenGL 4.6",
      "dimensions": "227 x 123 x 50 mm"
    },
    "date_added": "2025-03-06",
    "tagline": "Experience next-gen gaming with advanced cooling in a compact design.",
    "description": "The ASUS Dual GeForce RTX 4060 EVO OC Edition 8GB GDDR6 leverages advanced cooling technologies from flagship graphics cards, including two Axial-tech fans, to maximize airflow to the heatsink. Its compact 22.7 cm length and 2.5-slot design deliver powerful performance in less space, making it ideal for well-balanced builds.",
    "price": "K3,000",
    "discounted price": "K2,800",
    "product_page": "https://www.asus.com/us/motherboards-components/graphics-cards/dual/dual-rtx4060-o8g-evo/"
  },
  {
    "name": "ASUS Dual Radeon RX 7700 XT OC Edition 12GB GDDR6",
    "category": "Components",
    "subcategory": "Graphics Cards",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "ASUS",
    "brand logo": brandLogo.Asus,
    "specs": {
      "graphics_engine": "AMD Radeon RX 7700 XT",
      "bus_standard": "PCI Express 4.0",
      "video_memory": "12GB GDDR6",
      "engine_clock": "Boost Clock: up to 2599 MHz (OC mode), Game Clock: up to 2239 MHz (OC mode)",
      "stream_processors": 3456,
      "memory_speed": "18 Gbps",
      "memory_interface": "192-bit",
      "max_resolution": "7680 x 4320",
      "interface": ["1 x HDMI 2.1", "3 x DisplayPort 2.1"],
      "directx": "DirectX 12 Ultimate",
      "opengl": "OpenGL 4.6",
      "dimensions": "267 x 135 x 51 mm"
    },
    "date_added": "2025-03-06",
    "tagline": "Unleash high-performance gaming with robust cooling and durability.",
    "description": "The ASUS Dual Radeon RX 7700 XT OC Edition 12GB GDDR6 is equipped with advanced cooling solutions, including Axial-tech fans and dual ball fan bearings, ensuring efficient heat dissipation and extended lifespan. Auto-Extreme Technology enhances reliability, making it a solid choice for gamers seeking performance and durability.",
    "price": "K4,500",
    "discounted price": "K4,200",
    "product_page": "https://www.asus.com/us/motherboards-components/graphics-cards/dual/dual-rx7700xt-o12g/"
  },
  {
    "name": "Intel 1.92TB 6Gb/s 2.5\" SATA TLC Enterprise Server SSD",
    "category": "Components",
    "subcategory": "Server Hard Drives",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "Intel",
    "brand logo": "",
    "specs": {
      "capacity": "1.92TB",
      "interface": "SATA 6Gb/s",
      "form_factor": "2.5-inch",
      "nand_flash": "TLC",
      "sequential_read": "Up to 560 MB/s",
      "sequential_write": "Up to 510 MB/s",
      "random_read_iops": "97,000",
      "random_write_iops": "35,500",
      "latency_read": "36 µs",
      "latency_write": "37 µs",
      "mtbf": "2 million hours",
      "power_consumption_active": "3.2W",
      "power_consumption_idle": "1.1W"
    },
    "date_added": "2025-03-06",
    "tagline": "High-capacity SSD with reliable performance for enterprise servers.",
    "description": "The Intel 1.92TB 2.5\" SATA TLC Enterprise Server SSD offers high-capacity storage with reliable performance, making it ideal for enterprise server applications. With a sequential read speed of up to 560 MB/s and write speed up to 510 MB/s, it ensures quick data access and transfer.",
    "price": "K3,500",
    "discounted price": "K3,200",
    "product_page": "https://www.amazon.com/Intel-1-92TB-Enterprise-Server-Sequential/dp/B07GJV5KF6"
  },
  {
    "name": "Dell 1.2TB 10K RPM SAS 12Gbps 2.5in Hot-plug Hard Drive",
    "category": "Components",
    "subcategory": "Server Hard Drives",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "Dell",
    "brand logo": brandLogo.Dell,
    "specs": {
      "capacity": "1.2TB",
      "interface": "SAS 12Gbps",
      "form_factor": "2.5-inch",
      "rotational_speed": "10,000 RPM",
      "data_transfer_rate": "Up to 12Gbps"
    },
    "date_added": "2025-03-06",
    "tagline": "High-speed SAS drive for enhanced data transfer in enterprise systems.",
    "description": "The Dell 1.2TB 10K RPM SAS 12Gbps 2.5-inch Hot-plug Hard Drive offers high-speed data transfer and reliable performance, making it suitable for enterprise systems requiring quick data access and storage.",
    "price": "K2,800",
    "discounted price": "K2,600",
    "product_page": "https://www.dell.com/en-us/shop/dell-12tb-10k-rpm-sas-ise-12gbps-512n-25in-hot-plug-hard-drive/apd/400-atjl/storage-drives-media"
  },
  {
    "name": "Dell 1.92TB SSD SATA Read Intensive 6Gbps 512e 2.5in Hot-Plug",
    "category": "Components",
    "subcategory": "Server Hard Drives",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "Dell",
    "brand logo": brandLogo.Dell,
    "specs": {
      "capacity": "1.92TB",
      "interface": "SATA 6Gbps",
      "form_factor": "2.5-inch",
      "read_intensive": true,
      "endurance": "1 DWPD",
      "total_bytes_written": "3504 TBW"
    },
    "date_added": "2025-03-06",
    "tagline": "High-capacity read-intensive SSD for enterprise applications.",
    "description": "The Dell 1.92TB SSD SATA Read Intensive 6Gbps 2.5-inch Hot-Plug drive is designed for enterprise applications requiring high-capacity and read-intensive performance. With an endurance of 1 Drive Write Per Day (DWPD) and Total Bytes Written (TBW) of 3504, it ensures reliability for demanding workloads.",
    "price": "K4,000",
    "discounted price": "K3,700",
    "product_page": "https://fornida.com/product/1-92tb-ssd-sata-read-intensive-6gbps-512-2-5in-hot-plug-ag-drive-1-dwpd-3504-tbw-400-axsd/"
  },
  {
    "name": "Dell 8TB 7.2K RPM NLSAS 12Gbps 3.5in Hot-Plug Hard Drive",
    "category": "Components",
    "subcategory": "Server Hard Drives",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "Dell",
    "brand logo": brandLogo.Dell,
    "specs": {
      "capacity": "8TB",
      "interface": "NLSAS 12Gbps",
      "form_factor": "3.5-inch",
      "rotational_speed": "7,200 RPM",
      "sector_size": "512e"
    },
    "date_added": "2025-03-06",
    "tagline": "High-capacity storage solution with efficient data transfer speeds.",
    "description": "The Dell 8TB 7.2K RPM NLSAS 12Gbps 3.5-inch Hot-Plug Hard Drive offers ample storage capacity and reliable performance for enterprise systems. Its 7,200 RPM speed ensures efficient data access, while the NLSAS interface provides enhanced data transfer rates. Please note, VMware does not support 512e or 4Kn hard drives. Compatibility is limited to specific operating systems and configurations.",
    "price": "K6,500",
    "discounted price": "K6,200",
    "product_page": "https://www.dell.com/en-us/shop/dell-8tb-72k-rpm-nlsas-12gbps-512e-35in-hot-plug-hard-drive/apd/400-ampd/storage-drives-media"
  },
  {
    "name": "Dell 12TB 7.2K RPM SATA 6Gbps 3.5in Hot-Plug Hard Drive",
    "category": "Components",
    "subcategory": "Server Hard Drives",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "Dell",
    "brand logo": brandLogo.Dell,
    "specs": {
      "capacity": "12TB",
      "interface": "SATA 6Gbps",
      "form_factor": "3.5-inch",
      "rotational_speed": "7,200 RPM",
      "sector_size": "512e"
    },
    "date_added": "2025-03-06",
    "tagline": "Expand your system's storage with high-capacity and reliable performance.",
    "description": "The Dell 12TB 7.2K RPM SATA 6Gbps 3.5-inch Hot-Plug Hard Drive is designed to increase the storage capacity of your system efficiently. With a rotational speed of 7,200 RPM and SATA interface, it ensures fast data access and transfer rates. Please note, VMware does not support 512e or 4Kn hard drives. Compatibility is limited to specific operating systems and configurations.",
    "price": "K9,800",
    "discounted price": "K9,400",
    "product_page": "https://www.dell.com/en-us/shop/dell-12tb-72k-rpm-sata-6gbps-512e-35in-hot-plug-drive/apd/400-auwk/storage-drives-media"
  },
  {
    "name": "Dell 480GB Mixed-Use SATA 6Gbps 2.5in Hot-Plug SSD",
    "category": "Components",
    "subcategory": "Server Hard Drives",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "Dell",
    "brand logo": brandLogo.Dell,
    "specs": {
      "capacity": "480GB",
      "interface": "SATA 6Gbps",
      "form_factor": "2.5-inch",
      "drive_type": "SSD",
      "usage": "Mixed-Use"
    },
    "date_added": "2025-03-06",
    "tagline": "Balanced performance and endurance for mixed-use applications.",
    "description": "The Dell 480GB Mixed-Use SATA 6Gbps 2.5-inch Hot-Plug SSD is optimized for environments that require a balance between read and write operations. Its SATA interface ensures efficient data transfer, making it suitable for various enterprise applications.",
    "price": "K3,200",
    "discounted price": "K3,000",
    "product_page": "https://www.dell.com/en-us/shop/dell-480gb-sata-mixed-use-6gbps-512-25in-hot-plug-drive-3-5in-hybrid-carrier-sc/apd/400-bfkt/storage-drives-media"
  },
  {
    "name": "Dell 600GB 10K RPM SAS 12Gbps 2.5in Hot-Plug Hard Drive",
    "category": "Components",
    "subcategory": "Server Hard Drives",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "Dell",
    "brand logo": brandLogo.Dell,
    "specs": {
      "capacity": "600GB",
      "interface": "SAS 12Gbps",
      "form_factor": "2.5-inch",
      "rotational_speed": "10,000 RPM",
      "sector_size": "512n"
    },
    "date_added": "2025-03-06",
    "tagline": "High-speed data access for demanding enterprise applications.",
    "description": "The Dell 600GB 10K RPM SAS 12Gbps 2.5-inch Hot-Plug Hard Drive offers reliable and fast data access, making it ideal for enterprise environments. Its 10,000 RPM speed and SAS interface ensure high data transfer rates, enhancing overall system performance.",
    "price": "K2,500",
    "discounted price": "K2,300",
    "product_page": "https://www.dell.com/en-us/shop/dell-600gb-10k-rpm-sas-12gbps-512n-25in-hot-plug-drive/apd/400-ajpp/storage-drives-media"
  },
  {
    "name": "ADATA Ultimate SU650 256GB SSD",
    "category": "Components",
    "subcategory": "Consumer Storage",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "ADATA",
    "brand logo": "",
    "specs": {
      "capacity": "256GB",
      "interface": "SATA 6Gb/s",
      "form_factor": "2.5-inch",
      "nand_flash": "3D NAND",
      "sequential_read": "Up to 520 MB/s",
      "sequential_write": "Up to 450 MB/s",
      "features": ["SLC Caching", "Advanced Error Correction"]
    },
    "date_added": "2025-03-06",
    "tagline": "Enhanced performance and reliability with 3D NAND technology.",
    "description": "The ADATA Ultimate SU650 256GB SSD utilizes 3D NAND Flash and a high-speed controller, offering improved performance and reliability over 2D NAND SSDs. With read/write speeds up to 520/450 MB/s, it ensures quick data access and transfer. Features like SLC caching and advanced error correction technologies further optimize performance and data integrity.",
    "price": "K1,200",
    "discounted price": "K1,100",
    "product_page": "https://www.adata.com/in/specification/503?tab=specification"
  },
  {
    "name": "ADATA Ultimate SU650 480GB SSD",
    "category": "Components",
    "subcategory": "Consumer Storage",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "ADATA",
    "brand logo": "",
    "specs": {
      "capacity": "480GB",
      "interface": "SATA 6Gb/s",
      "form_factor": "2.5-inch",
      "nand_flash": "3D NAND",
      "sequential_read": "Up to 520 MB/s",
      "sequential_write": "Up to 450 MB/s",
      "features": ["SLC Caching", "Advanced Error Correction"]
    },
    "date_added": "2025-03-06",
    "tagline": "High-capacity SSD with enhanced speed and reliability.",
    "description": "The ADATA Ultimate SU650 480GB SSD offers ample storage with enhanced performance, thanks to 3D NAND Flash technology. It delivers read/write speeds up to 520/450 MB/s, ensuring efficient data processing. Additional features like SLC caching and advanced error correction technologies enhance overall performance and data reliability.",
    "price": "K2,000",
    "discounted price": "K1,900",
    "product_page": "https://www.adata.com/in/specification/503?tab=specification"
  },
  {
    "name": "DELL 240GB SSD",
    "category": "Components",
    "subcategory": "Consumer Storage",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "DELL",
    "brand logo": brandLogo.Dell,
    "specs": {
      "capacity": "240GB",
      "interface": "SATA 6Gb/s",
      "form_factor": "2.5-inch",
      "nand_flash": "3D NAND",
      "sequential_read": "Up to 550 MB/s",
      "sequential_write": "Up to 520 MB/s",
      "features": ["TRIM Support", "S.M.A.R.T Monitoring"]
    },
    "date_added": "2025-03-06",
    "tagline": "Reliable and efficient storage solution for everyday computing.",
    "description": "The DELL 240GB SSD provides reliable storage with efficient performance, suitable for everyday computing needs. With read/write speeds up to 550/520 MB/s, it ensures quick data access and transfer. Features like TRIM support and S.M.A.R.T monitoring enhance the drive's longevity and reliability.",
    "price": "K1,100",
    "discounted price": "K1,000",
    "product_page": "https://www.dell.com/en-us/shop/dell-240gb-ssd-sata-6gbps-25in-hot-plug-drive/apd/400-aqcd/storage-drives-media"
  },
  {
    "name": "HIKSEMI HS-SSD-FUTURE 512GB SSD",
    "category": "Components",
    "subcategory": "Consumer Storage",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "HIKSEMI",
    "brand logo": "",
    "specs": {
      "capacity": "512GB",
      "interface": "PCIe 4.0 NVMe",
      "form_factor": "M.2 2280",
      "nand_flash": "3D NAND",
      "sequential_read": "Up to 7450 MB/s",
      "sequential_write": "Up to 6400 MB/s",
      "features": ["Advanced Thermal Dissipation", "Low Power Consumption"]
    },
    "date_added": "2025-03-06",
    "tagline": "High-performance SSD with cutting-edge PCIe 4.0 technology.",
    "description": "The HIKSEMI HS-SSD-FUTURE 512GB SSD leverages PCIe 4.0 NVMe technology to deliver exceptional performance, with read/write speeds up to 7450/6400 MB/s. Its advanced thermal dissipation and low power consumption make it ideal for high-performance computing and gaming applications.",
    "price": "K3,500",
    "discounted price": "K3,300",
    "product_page": "https://www.hiksemitech.com/en/hiksemi/all-products/solid-state-drive/hs-ssd-future.html"
  },
  {
    "name": "HIKSEMI HS-SSD-FUTURE 1TB SSD",
    "category": "Components",
    "subcategory": "Consumer Storage",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "HIKSEMI",
    "brand logo": "",
    "specs": {
      "capacity": "1TB",
      "interface": "PCIe 4.0 NVMe",
      "form_factor": "M.2 2280",
      "nand_flash": "3D NAND",
      "sequential_read": "Up to 7450 MB/s",
      "sequential_write": "Up to 6400 MB/s",
      "features": ["Advanced Thermal Dissipation", "Low Power Consumption"]
    },
    "date_added": "2025-03-06",
    "tagline": "Expand your storage with high-speed PCIe 4.0 NVMe technology.",
    "description": "The HIKSEMI HS-SSD-FUTURE 1TB SSD offers expansive storage with top-tier performance, utilizing PCIe 4.0 NVMe technology. With read/write speeds up to 7450/6400 MB/s and features like advanced thermal dissipation, it caters to demanding applications and gaming.",
    "price": "K6,800",
    "discounted price": "K6,500",
    "product_page": "https://www.hiksemitech.com/en/hiksemi/all-products/solid-state-drive/hs-ssd-future.html"
  },
  {
    "name": "HIKSEMI HS-SSD-FUTURE 2TB SSD",
    "category": "Components",
    "subcategory": "Consumer Storage",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "HIKSEMI",
    "brand logo": "",
    "specs": {
      "capacity": "2TB",
      "interface": "PCIe 4.0 NVMe",
      "form_factor": "M.2 2280",
      "nand_flash": "3D NAND",
      "sequential_read": "Up to 7450 MB/s",
      "sequential_write": "Up to 6400 MB/s",
      "features": ["Advanced Thermal Dissipation", "Low Power Consumption"]
    },
    "date_added": "2025-03-06",
    "tagline": "Ultimate performance and storage capacity for professionals and gamers.",
    "description": "The HIKSEMI HS-SSD-FUTURE 2TB SSD offers massive storage with lightning-fast PCIe 4.0 NVMe speeds, ideal for high-performance computing. With read/write speeds up to 7450/6400 MB/s and advanced thermal management, it's designed for professionals, content creators, and gamers who demand peak performance.",
    "price": "K12,500",
    "discounted price": "K12,000",
    "product_page": "https://www.hiksemitech.com/en/hiksemi/all-products/solid-state-drive/hs-ssd-future.html"
  },
  {
    "name": "HIKSEMI NAND SATA SSD",
    "category": "Components",
    "subcategory": "Consumer Storage",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "HIKSEMI",
    "brand logo": "",
    "specs": {
      "capacity": "240GB / 480GB / 960GB",
      "interface": "SATA III 6Gb/s",
      "form_factor": "2.5-inch",
      "nand_flash": "3D NAND",
      "sequential_read": "Up to 550 MB/s",
      "sequential_write": "Up to 500 MB/s",
      "features": ["High Durability", "Energy Efficient", "Shock Resistant"]
    },
    "date_added": "2025-03-06",
    "tagline": "Reliable and fast storage solution for everyday computing.",
    "description": "HIKSEMI NAND SATA SSDs provide a balance of speed, durability, and power efficiency, making them ideal for upgrading laptops and desktops. With advanced 3D NAND technology, they deliver improved performance and longevity.",
    "price": "K1,500 - K4,500",
    "discounted price": "K1,400 - K4,200"
  },
  {
    "name": "Seagate SATA HDD",
    "category": "Components",
    "subcategory": "Consumer Storage",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "Seagate",
    "brand logo": "",
    "specs": {
      "capacity": "1TB / 2TB / 4TB / 5TB / 6TB / 8TB / 10TB / 12TB / 14TB / 16TB / 18TB / 20TB",
      "interface": "SATA III 6Gb/s",
      "form_factor": "3.5-inch",
      "cache": "Up to 256MB",
      "rpm": "5400/7200 RPM",
      "features": ["High Storage Capacity", "Reliable Performance", "Long Lifespan"]
    },
    "date_added": "2025-03-06",
    "tagline": "Massive storage capacity for personal and professional use.",
    "description": "Seagate's SATA HDD lineup offers a variety of storage options, ensuring reliability and high performance for desktops, NAS systems, and external drives. Perfect for data backup and large multimedia libraries.",
    "price": "K3,000 - K25,000",
    "discounted price": "K2,800 - K24,000"
  },
  {
    "name": "Western Digital SATA HDD",
    "category": "Components",
    "subcategory": "Consumer Storage",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "Western Digital",
    "brand logo": "",
    "specs": {
      "capacity": "1TB / 2TB / 4TB / 6TB / 8TB / 10TB",
      "interface": "SATA III 6Gb/s",
      "form_factor": "3.5-inch",
      "cache": "Up to 256MB",
      "rpm": "5400/7200 RPM",
      "features": ["Enhanced Reliability", "Power-Efficient", "Optimized for Data Storage"]
    },
    "date_added": "2025-03-06",
    "tagline": "Western Digital reliability with optimized performance for storage needs.",
    "description": "Western Digital SATA HDDs offer a range of storage solutions with dependable performance and high capacity for personal and professional use. Ideal for PC upgrades and bulk storage requirements.",
    "price": "K3,200 - K20,000",
    "discounted price": "K3,000 - K19,500"
  },
  {
    "name": "ADATA/HIKSEMI DDR4 & DDR5 RAM",
    "category": "Components",
    "subcategory": "RAM",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "ADATA / HIKSEMI",
    "brand logo": "",
    "specs": {
      "capacity": "8GB / 16GB / 32GB",
      "type": "DDR4 & DDR5",
      "speed": "3200MHz (DDR4) / 4800MHz+ (DDR5)",
      "voltage": "1.2V (DDR4) / 1.1V (DDR5)",
      "features": ["High Performance", "Low Latency", "Energy Efficient"]
    },
    "date_added": "2025-03-06",
    "tagline": "Reliable and fast memory for smooth computing performance.",
    "description": "ADATA and HIKSEMI RAM modules offer high-speed performance, stability, and power efficiency for gaming, workstations, and everyday computing. Available in both DDR4 and DDR5 variants.",
    "price": "K3,000 - K12,000",
    "discounted price": "K2,800 - K11,500"
  },
  {
    "name": "Kingston DDR4 & DDR5 RAM",
    "category": "Components",
    "subcategory": "RAM",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "Kingston",
    "brand logo": "",
    "specs": {
      "capacity": "8GB / 16GB / 32GB / 64GB",
      "type": "DDR4 & DDR5",
      "speed": "3200MHz (DDR4) / 5600MHz+ (DDR5)",
      "voltage": "1.2V (DDR4) / 1.1V (DDR5)",
      "features": ["Enhanced Stability", "Low Power Consumption", "Optimized for Performance"]
    },
    "date_added": "2025-03-06",
    "tagline": "High-capacity memory with unmatched reliability and speed.",
    "description": "Kingston RAM is built for performance and reliability, ensuring smooth multitasking and enhanced system speed. Ideal for gaming, content creation, and professional applications.",
    "price": "K3,500 - K20,000",
    "discounted price": "K3,300 - K19,500"
  },
  {
    "name": "D-Link 24-Port GB Smart Managed Switch",
    "category": "Networking",
    "subcategory": "Switches",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "D-Link",
    "brand logo": "",
    "specs": {
      "ports": "24 x Gigabit Ethernet",
      "management": "Smart Managed",
      "features": ["VLAN Support", "QoS", "Energy Efficient"]
    },
    "date_added": "2025-03-06",
    "tagline": "High-performance managed networking for businesses.",
    "description": "D-Link's 24-port smart switch offers gigabit speeds, advanced control, and efficient traffic management.",
    "price": "K12,000",
    "discounted price": "K11,500"
  },
  {
    "name": "D-Link 52-Port Smart Managed PoE Switch",
    "category": "Networking",
    "subcategory": "Switches",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "D-Link",
    "brand logo": "",
    "specs": {
      "ports": "52 x Gigabit Ethernet",
      "PoE": "Yes",
      "management": "Smart Managed",
      "features": ["Power Over Ethernet", "VLAN Support", "Traffic Prioritization"]
    },
    "date_added": "2025-03-06",
    "tagline": "Power and performance for large networks.",
    "description": "A 52-port smart managed PoE switch designed for enterprise networks requiring high-speed connectivity and power distribution.",
    "price": "K25,000",
    "discounted price": "K24,000"
  },
  {
    "name": "D-Link 5-Port Unmanaged Switch",
    "category": "Networking",
    "subcategory": "Switches",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "D-Link",
    "brand logo": "",
    "specs": {
      "ports": "5 x Gigabit Ethernet",
      "management": "Unmanaged",
      "features": ["Plug-and-Play", "Energy Efficient", "Compact Design"]
    },
    "date_added": "2025-03-06",
    "tagline": "Simple and fast networking for home and small offices.",
    "description": "D-Link’s 5-port unmanaged switch provides plug-and-play connectivity with high-speed gigabit performance for home or small office networks.",
    "price": "K2,500",
    "discounted price": "K2,200"
  },
  {
    "name": "D-Link 6-Port Unmanaged Switch",
    "category": "Networking",
    "subcategory": "Switches",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "D-Link",
    "brand logo": "",
    "specs": {
      "ports": "6 x Gigabit Ethernet",
      "management": "Unmanaged",
      "features": ["Plug-and-Play", "Compact Size", "Energy Efficient"]
    },
    "date_added": "2025-03-06",
    "tagline": "Compact and efficient network expansion.",
    "description": "D-Link’s 6-port unmanaged switch offers a simple and reliable way to expand network connectivity in homes or small offices.",
    "price": "K3,000",
    "discounted price": "K2,800"
  },
  {
    "name": "HUAWEI S110-16LP2SR EKIT Switch 16 Port",
    "category": "Networking",
    "subcategory": "Switches",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "Huawei",
    "brand logo": "",
    "specs": {
      "ports": "16 x Gigabit Ethernet",
      "PoE": "Yes",
      "power": "Supports PoE Power Supply",
      "management": "Managed",
      "features": ["Energy Efficient", "VLAN Support", "Advanced QoS"]
    },
    "date_added": "2025-03-06",
    "tagline": "Reliable 16-port PoE switch for small businesses.",
    "description": "The Huawei S110-16LP2SR EKIT switch provides a high-speed and efficient networking solution with PoE support for small and medium-sized enterprises.",
    "price": "K10,500",
    "discounted price": "K10,000"
  },
  {
    "name": "HUAWEI S110-24LP2SR EKIT Switch 24 Port",
    "category": "Networking",
    "subcategory": "Switches",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "Huawei",
    "brand logo": "",
    "specs": {
      "ports": "24 x Gigabit Ethernet",
      "PoE": "Yes",
      "power": "Supports PoE Power Supply",
      "management": "Managed",
      "features": ["Smart Traffic Management", "High-speed Connectivity", "Energy Efficient"]
    },
    "date_added": "2025-03-06",
    "tagline": "Scalable and efficient 24-port PoE switch.",
    "description": "A 24-port managed switch designed to enhance network performance with PoE capabilities, ideal for growing businesses.",
    "price": "K14,500",
    "discounted price": "K14,000"
  },
  {
    "name": "HUAWEI S220-48P4X EKIT Switch 48 Port 380W PoE",
    "category": "Networking",
    "subcategory": "Switches",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "Huawei",
    "brand logo": "",
    "specs": {
      "ports": "48 x Gigabit Ethernet",
      "PoE": "Yes",
      "power": "380W PoE Power",
      "management": "Advanced Managed",
      "features": ["Enterprise-Grade Performance", "Layer 2 & Layer 3 Capabilities", "Enhanced Security"]
    },
    "date_added": "2025-03-06",
    "tagline": "High-power PoE switch for enterprise networks.",
    "description": "Huawei’s 48-port managed switch with 380W PoE power is designed for enterprise-grade networks needing high-speed and reliable connectivity.",
    "price": "K28,000",
    "discounted price": "K27,500"
  },
  {
    "name": "HUAWEI S310-24P4X EKIT Switch 24 Port 400W PoE",
    "category": "Networking",
    "subcategory": "Switches",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "Huawei",
    "brand logo": "",
    "specs": {
      "ports": "24 x Gigabit Ethernet",
      "PoE": "Yes",
      "power": "400W PoE Power",
      "management": "Advanced Managed",
      "features": ["Optimized for Large Networks", "High-Speed Uplink Ports", "Enhanced Security"]
    },
    "date_added": "2025-03-06",
    "tagline": "Powerful 24-port PoE switch with 400W capacity.",
    "description": "Designed for demanding networks, the Huawei S310-24P4X EKIT switch delivers high-power PoE capabilities with advanced security features.",
    "price": "K20,500",
    "discounted price": "K20,000"
  },
  {
    "name": "TP-LINK 10 Port L2 Switch",
    "category": "Networking",
    "subcategory": "Switches",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "TP-Link",
    "brand logo": brandLogo.TPLink,
    "specs": {
      "ports": "10 x Gigabit Ethernet",
      "management": "Layer 2 Managed",
      "PoE": "No",
      "features": ["VLAN Support", "QoS Optimization", "Energy Efficient"]
    },
    "date_added": "2025-03-06",
    "tagline": "Reliable and efficient Layer 2 switch.",
    "description": "A 10-port managed Layer 2 switch, ideal for businesses requiring network segmentation and enhanced traffic control.",
    "price": "K7,500",
    "discounted price": "K7,000"
  },
  {
    "name": "TP-LINK 10 Port Smart PoE Switch",
    "category": "Networking",
    "subcategory": "Switches",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "TP-Link",
    "brand logo": brandLogo.TPLink,
    "specs": {
      "ports": "10 x Gigabit Ethernet",
      "PoE": "Yes",
      "power": "Supports PoE for multiple devices",
      "management": "Smart Managed",
      "features": ["High-speed Connectivity", "PoE Power Optimization", "Network Monitoring"]
    },
    "date_added": "2025-03-06",
    "tagline": "Smart PoE switch for small business networks.",
    "description": "The TP-Link 10-port smart PoE switch is perfect for powering IP cameras, VoIP phones, and other PoE devices while maintaining high-speed connectivity.",
    "price": "K9,000",
    "discounted price": "K8,500"
  },
  {
    "name": "TP-LINK 16 Channel PoE",
    "category": "Networking",
    "subcategory": "Switches",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "TP-Link",
    "brand logo": brandLogo.TPLink,
    "specs": {
      "ports": "16 x PoE Ports",
      "PoE": "Yes",
      "power": "Supports multiple PoE devices",
      "management": "Unmanaged",
      "features": ["Plug & Play", "Reliable PoE Supply", "High-speed Data Transfer"]
    },
    "date_added": "2025-03-06",
    "tagline": "Seamless PoE connectivity for surveillance networks.",
    "description": "A 16-channel PoE switch designed for security camera systems and other PoE-enabled devices, ensuring stable and efficient power distribution.",
    "price": "K12,000",
    "discounted price": "K11,500"
  },
  {
    "name": "TP-LINK 18 Port Smart PoE Switch",
    "category": "Networking",
    "subcategory": "Switches",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "TP-Link",
    "brand logo": brandLogo.TPLink,
    "specs": {
      "ports": "18 x Gigabit Ethernet",
      "PoE": "Yes",
      "power": "Smart PoE Power Allocation",
      "management": "Smart Managed",
      "features": ["Advanced Traffic Management", "Network Security Features", "Energy Efficient"]
    },
    "date_added": "2025-03-06",
    "tagline": "Powerful smart PoE switch for growing networks.",
    "description": "An 18-port PoE switch with smart management features for growing businesses and network expansions.",
    "price": "K15,500",
    "discounted price": "K15,000"
  },
  {
    "name": "TP-LINK 24-Port Gigabit Easy Smart Switch",
    "category": "Networking",
    "subcategory": "Switches",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "TP-Link",
    "brand logo": brandLogo.TPLink,
    "specs": {
      "ports": "24 x Gigabit Ethernet",
      "PoE": "No",
      "management": "Easy Smart Managed",
      "features": ["QoS Optimization", "VLAN Support", "Energy Efficient"]
    },
    "date_added": "2025-03-06",
    "tagline": "Simple and reliable 24-port Gigabit switch.",
    "description": "A 24-port easy smart switch offering gigabit speeds and essential management features for small and medium businesses.",
    "price": "K10,500",
    "discounted price": "K10,000"
  },

  // George End
  {
    "name": "ASUS AX1800 Dual Band WiFi 6 Router",
    "category": "Networking",
    "subcategory": "Routers",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "ASUS",
    "brand logo": brandLogo.Asus,
    "specs": {
      "WiFi Standard": "WiFi 6 (802.11ax)",
      "Bands": "Dual Band (2.4GHz + 5GHz)",
      "Speed": "Up to 1800 Mbps",
      "Ports": "Gigabit Ethernet, USB (available in select versions)",
      "Features": ["OFDMA & MU-MIMO", "Beamforming", "Parental Controls", "AiProtection Security"]
    },
    "date_added": "2025-03-06",
    "tagline": "Fast and efficient WiFi 6 performance.",
    "description": "The ASUS AX1800 Dual Band WiFi 6 Router provides stable and fast connections, ideal for home and small office networks.",
    "price": "K5,500",
    "discounted price": "K5,000"
  },
  {
    "name": "ASUS AX3000 Dual Band WiFi 6 Router",
    "category": "Networking",
    "subcategory": "Routers",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "ASUS",
    "brand logo": brandLogo.Asus,
    "specs": {
      "WiFi Standard": "WiFi 6 (802.11ax)",
      "Bands": "Dual Band (2.4GHz + 5GHz)",
      "Speed": "Up to 3000 Mbps",
      "Ports": "Gigabit Ethernet, USB (available in select versions)",
      "Features": ["OFDMA & MU-MIMO", "Adaptive QoS", "Parental Controls", "AiMesh Support"]
    },
    "date_added": "2025-03-06",
    "tagline": "Seamless connectivity for high-speed browsing.",
    "description": "The ASUS AX3000 WiFi 6 Router delivers ultra-fast wireless speeds and improved coverage for smooth streaming and gaming.",
    "price": "K7,500",
    "discounted price": "K7,000"
  },
  {
    "name": "ASUS TUF Gaming AX3000 Dual Band WiFi 6 Gaming Router",
    "category": "Networking",
    "subcategory": "Routers",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "ASUS",
    "brand logo": brandLogo.Asus,
    "specs": {
      "WiFi Standard": "WiFi 6 (802.11ax)",
      "Bands": "Dual Band (2.4GHz + 5GHz)",
      "Speed": "Up to 3000 Mbps",
      "Ports": "Gigabit Ethernet, USB 3.0",
      "Features": ["Gaming-Optimized QoS", "WPA3 Security", "OFDMA & MU-MIMO", "AiMesh Support"]
    },
    "date_added": "2025-03-06",
    "tagline": "Game without limits with WiFi 6 power.",
    "description": "The ASUS TUF Gaming AX3000 Router is designed for gamers, providing low-latency connections and stable speeds for an immersive gaming experience.",
    "price": "K9,500",
    "discounted price": "K9,000"
  },
  {
    "name": "ASUS TUF Gaming AX4200 Dual Band WiFi 6 Gaming Router",
    "category": "Networking",
    "subcategory": "Routers",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "ASUS",
    "brand logo": brandLogo.Asus,
    "specs": {
      "WiFi Standard": "WiFi 6 (802.11ax)",
      "Bands": "Dual Band (2.4GHz + 5GHz)",
      "Speed": "Up to 4200 Mbps",
      "Ports": "Gigabit Ethernet, USB 3.0",
      "Features": ["Gaming-Optimized QoS", "AiProtection Pro", "AiMesh Support", "WPA3 Security"]
    },
    "date_added": "2025-03-06",
    "tagline": "Ultra-fast gaming and streaming with WiFi 6.",
    "description": "The ASUS TUF Gaming AX4200 is built for high-performance gaming and seamless 4K streaming with ultra-low latency and enhanced security features.",
    "price": "K11,500",
    "discounted price": "K11,000"
  },
  {
    "name": "ASUS TUF Gaming AX6000 Dual Band WiFi 6 Gaming Router",
    "category": "Networking",
    "subcategory": "Routers",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "ASUS",
    "brand logo": brandLogo.Asus,
    "specs": {
      "WiFi Standard": "WiFi 6 (802.11ax)",
      "Bands": "Dual Band (2.4GHz + 5GHz)",
      "Speed": "Up to 6000 Mbps",
      "Ports": "2.5G Ethernet, USB 3.0",
      "Features": ["Gaming-Optimized QoS", "AiProtection Pro", "AiMesh Support", "WPA3 Security"]
    },
    "date_added": "2025-03-06",
    "tagline": "Elite gaming performance with extreme speeds.",
    "description": "The ASUS TUF Gaming AX6000 delivers the fastest WiFi speeds, designed for competitive gaming, lag-free streaming, and ultra-fast file transfers.",
    "price": "K15,000",
    "discounted price": "K14,500"
  },
  {
    "name": "ASUS ROG Rapture AX6000 Dual Band WiFi 6 Gaming Router",
    "category": "Networking",
    "subcategory": "Routers",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "ASUS",
    "brand logo": brandLogo.Asus,
    "specs": {
      "WiFi Standard": "WiFi 6 (802.11ax)",
      "Bands": "Dual Band (2.4GHz + 5GHz)",
      "Speed": "Up to 6000 Mbps",
      "Ports": "2.5G Ethernet, USB 3.0",
      "Features": ["Gaming-Optimized QoS", "AiProtection Pro", "AiMesh Support", "WPA3 Security", "VPN Fusion"]
    },
    "date_added": "2025-03-06",
    "tagline": "Powerful gaming performance with ultra-low latency.",
    "description": "The ASUS ROG Rapture AX6000 is built for competitive gaming, delivering high-speed connectivity, game acceleration, and enhanced security.",
    "price": "K16,000",
    "discounted price": "K15,500"
  },
  {
    "name": "ASUS ROG Rapture AX11000 Tri-Band WiFi 6 Gaming Router",
    "category": "Networking",
    "subcategory": "Routers",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "ASUS",
    "brand logo": brandLogo.Asus,
    "specs": {
      "WiFi Standard": "WiFi 6 (802.11ax)",
      "Bands": "Tri-Band (2.4GHz + 5GHz + 5GHz)",
      "Speed": "Up to 11000 Mbps",
      "Ports": "2.5G Ethernet, USB 3.0",
      "Features": ["Triple-Level Game Acceleration", "AiMesh Support", "AiProtection Pro", "Game Boost", "Adaptive QoS"]
    },
    "date_added": "2025-03-06",
    "tagline": "Extreme gaming speeds with triple-band WiFi 6.",
    "description": "The ASUS ROG Rapture AX11000 offers unmatched WiFi speeds, delivering seamless gaming, 4K streaming, and ultra-fast data transfers.",
    "price": "K22,000",
    "discounted price": "K21,500"
  },
  {
    "name": "ASUS ROG Rapture GT-AXE16000 Quad-Band WiFi 6E Gaming Router",
    "category": "Networking",
    "subcategory": "Routers",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "ASUS",
    "brand logo": brandLogo.Asus,
    "specs": {
      "WiFi Standard": "WiFi 6E (802.11ax)",
      "Bands": "Quad-Band (2.4GHz + 5GHz + 5GHz + 6GHz)",
      "Speed": "Up to 16000 Mbps",
      "Ports": "Dual 10G Ethernet, USB 3.0",
      "Features": ["4-Band WiFi Optimization", "Game Acceleration", "AiMesh Support", "AiProtection Pro", "WPA3 Security"]
    },
    "date_added": "2025-03-06",
    "tagline": "The ultimate gaming router with WiFi 6E.",
    "description": "The ASUS ROG Rapture GT-AXE16000 is the first quad-band gaming router, designed for extreme gaming, multi-device connectivity, and high-speed networking.",
    "price": "K30,000",
    "discounted price": "K29,500"
  },
  {
    "name": "ASUS ZenWiFi Mesh Network Routers – BT10 / ET12 / XT12 / XD4 / XD5 / XT8",
    "category": "Networking",
    "subcategory": "Routers",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "ASUS",
    "brand logo": brandLogo.Asus,
    "specs": {
      "WiFi Standard": "WiFi 6 / WiFi 7 (model-dependent)",
      "Bands": "Dual Band / Tri-Band (model-dependent)",
      "Coverage": "Up to 6,000 sq. ft.",
      "Speed": "Varies by model",
      "Features": ["Whole Home Mesh Coverage", "AiMesh Support", "Parental Controls", "AiProtection Pro"]
    },
    "date_added": "2025-03-06",
    "tagline": "Seamless whole-home WiFi with next-gen mesh technology.",
    "description": "The ASUS ZenWiFi series offers high-performance mesh networking solutions, providing ultra-fast WiFi coverage for large homes and offices.",
    "price": "K10,000 - K28,000",
    "discounted price": "K9,500 - K27,500"
  },
  {
    "name": "HUAWEI AR303 EKIT Router",
    "category": "Networking",
    "subcategory": "Routers",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "HUAWEI",
    "brand logo": "",
    "specs": {
      "WiFi Standard": "WiFi 5 (802.11ac)",
      "Speed": "Up to 1Gbps",
      "Ports": "Multiple GE interfaces, WAN/LAN support",
      "Features": ["Enterprise-grade Security", "Load Balancing", "VPN Support", "Cloud Management"]
    },
    "date_added": "2025-03-06",
    "tagline": "Reliable enterprise networking with advanced security.",
    "description": "The HUAWEI AR303 EKIT Router is designed for small to medium businesses, offering stable connectivity, VPN support, and cloud management.",
    "price": "K12,000",
    "discounted price": "K11,500"
  },
  {
    "name": "HUAWEI AR720 EKIT Router",
    "category": "Networking",
    "subcategory": "Routers",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "HUAWEI",
    "brand logo": "",
    "specs": {
      "WiFi Standard": "WiFi 6 (802.11ax)",
      "Speed": "Up to 3Gbps",
      "Ports": "Multi-GE WAN/LAN, USB",
      "Features": ["AI-Powered Traffic Control", "VPN Support", "Cloud Management", "Enhanced Network Security"]
    },
    "date_added": "2025-03-06",
    "tagline": "High-speed, AI-driven enterprise networking.",
    "description": "The HUAWEI AR720 EKIT Router delivers high-performance networking with AI-driven traffic optimization and enterprise-grade security.",
    "price": "K18,000",
    "discounted price": "K17,500"
  },
  {
    "name": "HUAWEI AR730 EKIT Router",
    "category": "Networking",
    "subcategory": "Routers",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "HUAWEI",
    "brand logo": "",
    "specs": {
      "WiFi Standard": "WiFi 6E (802.11ax)",
      "Speed": "Up to 6Gbps",
      "Ports": "10G WAN/LAN, USB 3.0",
      "Features": ["AI-Powered Traffic Management", "Advanced VPN Security", "Cloud & Remote Management", "Load Balancing"]
    },
    "date_added": "2025-03-06",
    "tagline": "Ultimate enterprise networking with 10G connectivity.",
    "description": "The HUAWEI AR730 EKIT Router offers ultra-fast speeds, advanced security, and cloud-based management for businesses needing top-tier networking solutions.",
    "price": "K25,000",
    "discounted price": "K24,500"
  },
  {
    "name": "TP-LINK AC1200 Dual-Band WiFi Router",
    "category": "Networking",
    "subcategory": "Routers",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "TP-LINK",
    "brand logo": brandLogo.TPLink,
    "specs": {
      "WiFi Standard": "WiFi 5 (802.11ac)",
      "Bands": "Dual Band (2.4GHz + 5GHz)",
      "Speed": "Up to 1200 Mbps",
      "Ports": "4 Gigabit LAN, 1 WAN",
      "Features": ["Parental Controls", "Guest Network", "MU-MIMO Technology", "QoS Optimization"]
    },
    "date_added": "2025-03-06",
    "tagline": "Fast and reliable dual-band WiFi for homes and offices.",
    "description": "The TP-LINK AC1200 Dual-Band Router provides fast and stable connectivity, ensuring smooth streaming, gaming, and browsing for multiple devices.",
    "price": "K3,500",
    "discounted price": "K3,200"
  },
  {
    "name": "TP-LINK AC1200 Whole Home Mesh WiFi System",
    "category": "Networking",
    "subcategory": "Routers",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "TP-LINK",
    "brand logo": brandLogo.TPLink,
    "specs": {
      "WiFi Standard": "WiFi 5 (802.11ac)",
      "Bands": "Dual Band (2.4GHz + 5GHz)",
      "Speed": "Up to 1200 Mbps",
      "Coverage": "Up to 5,500 sq. ft.",
      "Features": ["Seamless Mesh Connectivity", "Parental Controls", "Guest Network", "Adaptive Routing"]
    },
    "date_added": "2025-03-06",
    "tagline": "Whole-home WiFi with seamless coverage and smart connectivity.",
    "description": "The TP-LINK AC1200 Whole Home Mesh WiFi System provides reliable, uninterrupted internet coverage for larger homes with smart roaming and adaptive routing.",
    "price": "K7,000",
    "discounted price": "K6,500"
  },
  {
    "name": "TP-LINK AC1350 High Power Dual-Band Wi-Fi Router",
    "category": "Networking",
    "subcategory": "Routers",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "TP-LINK",
    "brand logo": brandLogo.TPLink,
    "specs": {
      "WiFi Standard": "WiFi 5 (802.11ac)",
      "Bands": "Dual Band (2.4GHz + 5GHz)",
      "Speed": "Up to 1350 Mbps",
      "Ports": "4 Gigabit LAN, 1 WAN",
      "Features": ["High Power Amplifiers", "Parental Controls", "MU-MIMO Technology", "QoS Optimization"]
    },
    "date_added": "2025-03-06",
    "tagline": "High-power, long-range Wi-Fi for seamless connectivity.",
    "description": "The TP-LINK AC1350 provides strong, long-range wireless coverage, ensuring smooth gaming, streaming, and browsing for multiple devices.",
    "price": "K3,800",
    "discounted price": "K3,500"
  },
  {
    "name": "TP-LINK AX1500 Whole Home Mesh Wi-Fi 6 System",
    "category": "Networking",
    "subcategory": "Routers",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "TP-LINK",
    "brand logo": brandLogo.TPLink,
    "specs": {
      "WiFi Standard": "WiFi 6 (802.11ax)",
      "Bands": "Dual Band (2.4GHz + 5GHz)",
      "Speed": "Up to 1500 Mbps",
      "Coverage": "Up to 4,500 sq. ft.",
      "Features": ["Seamless Mesh Connectivity", "OFDMA & MU-MIMO", "Parental Controls", "Adaptive Routing"]
    },
    "date_added": "2025-03-06",
    "tagline": "Next-gen mesh Wi-Fi with Wi-Fi 6 technology.",
    "description": "The TP-LINK AX1500 provides stable, high-speed internet with advanced Wi-Fi 6 features, ensuring fast and seamless connectivity across your home.",
    "price": "K6,500",
    "discounted price": "K6,000"
  },
  {
    "name": "TP-LINK AX1800 Whole Home Mesh Wi-Fi System",
    "category": "Networking",
    "subcategory": "Routers",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "TP-LINK",
    "brand logo": brandLogo.TPLink,
    "specs": {
      "WiFi Standard": "WiFi 6 (802.11ax)",
      "Bands": "Dual Band (2.4GHz + 5GHz)",
      "Speed": "Up to 1800 Mbps",
      "Coverage": "Up to 5,500 sq. ft.",
      "Features": ["Seamless Mesh Connectivity", "AI-Driven Mesh", "Parental Controls", "Adaptive Routing"]
    },
    "date_added": "2025-03-06",
    "tagline": "Stronger, smarter, and faster Wi-Fi 6 mesh coverage.",
    "description": "The TP-LINK AX1800 Whole Home Mesh Wi-Fi System ensures high-speed, AI-powered connectivity with robust security and seamless roaming.",
    "price": "K7,500",
    "discounted price": "K7,000"
  },
  {
    "name": "TP-LINK AC1900 Whole Home Mesh Wi-Fi System",
    "category": "Networking",
    "subcategory": "Routers",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "TP-LINK",
    "brand logo": brandLogo.TPLink,
    "specs": {
      "WiFi Standard": "WiFi 5 (802.11ac)",
      "Bands": "Dual Band (2.4GHz + 5GHz)",
      "Speed": "Up to 1900 Mbps",
      "Coverage": "Up to 6,000 sq. ft.",
      "Features": ["Smart Mesh Technology", "Parental Controls", "Guest Network", "Adaptive Routing"]
    },
    "date_added": "2025-03-06",
    "tagline": "High-speed mesh Wi-Fi for the entire home.",
    "description": "The TP-LINK AC1900 Whole Home Mesh Wi-Fi System provides seamless, high-performance internet access with wide coverage and advanced security features.",
    "price": "K8,000",
    "discounted price": "K7,500"
  },
  {
    "name": "TP-LINK AX3000 Whole Home Mesh Wi-Fi 6 System",
    "category": "Networking",
    "subcategory": "Routers",
    "images": [
      productImages.HPEnvyMOVE
    ],
    "brand": "TP-LINK",
    "brand logo": brandLogo.TPLink,
    "specs": {
      "WiFi Standard": "WiFi 6 (802.11ax)",
      "Bands": "Dual Band (2.4GHz + 5GHz)",
      "Speed": "Up to 3000 Mbps",
      "Coverage": "Up to 7,500 sq. ft.",
      "Features": ["AI-Powered Mesh", "OFDMA & MU-MIMO", "Parental Controls", "Adaptive Routing"]
    },
    "date_added": "2025-03-06",
    "tagline": "Blazing-fast Wi-Fi 6 mesh system with AI optimization.",
    "description": "The TP-LINK AX3000 Whole Home Mesh Wi-Fi 6 System offers ultra-fast speeds, seamless connectivity, and AI-powered optimizations for smooth performance.",
    "price": "K9,500",
    "discounted price": "K9,000"
  },
  {
    "name": "TP-LINK AX5400 Whole Home Mesh Wi-Fi 6 System",
    "category": "Networking",
    "subcategory": "Routers",
    "images": [
      productImages.TP_LINK_AX5400_1,
      productImages.TP_LINK_AX5400_2,
      productImages.TP_LINK_AX5400_3,
    ],
    "brand": "TP-LINK",
    "brand logo": brandLogo.TPLink,
    "specs": {
      "WiFi Standard": "WiFi 6 (802.11ax)",
      "Bands": "Dual Band (2.4GHz + 5GHz)",
      "Speed": "Up to 5400 Mbps",
      "Coverage": "Up to 9,000 sq. ft.",
      "Features": ["AI-Driven Mesh", "6-Stream Wi-Fi", "Parental Controls", "Adaptive Routing"]
    },
    "date_added": "2025-03-06",
    "tagline": "The ultimate whole-home Wi-Fi 6 experience.",
    "description": "The TP-LINK AX5400 Whole Home Mesh Wi-Fi 6 System provides lightning-fast speeds, ultra-wide coverage, and AI-driven performance for modern smart homes.",
    "price": "K12,000",
    "discounted price": "K11,500"
  },

  // Access Point
  {
    "name": "D-LINK ACCESS POINT AC1200",
    "category": "Accessories",
    "subcategory": "Access Points",
    "brand": "D-Link",
    "brand logo": "",
    "specs": {
      "speed": "300Mbps",
      "frequency": "Dual-band 2.4GHz & 5GHz",
      "ports": "1x Gigabit Ethernet",
      "antennas": "2 external antennas",
      "security": "WPA/WPA2 encryption",
      "features": "MU-MIMO, Beamforming, WPS support"
    },
    "date-added": "2025-03-06",
    "tagline": "Reliable and fast Wi-Fi coverage.",
    "description": "A high-performance dual-band access point designed for seamless wireless connectivity in homes and offices.",
    "price": "K2,500",
    "discounted price": "K2,200"
  },
  {
    "name": "D-LINK ACCESS POINT AC1300",
    "category": "Accessories",
    "subcategory": "Access Points",
    "brand": "D-Link",
    "brand logo": "",
    "specs": {
      "speed": "400Mbps",
      "frequency": "Dual-band 2.4GHz & 5GHz",
      "ports": "1x Gigabit Ethernet",
      "antennas": "2 high-gain external antennas",
      "security": "WPA/WPA2 encryption",
      "features": "MU-MIMO, Beamforming, AP Mode"
    },
    "date-added": "2025-03-06",
    "tagline": "Enhanced performance for streaming and gaming.",
    "description": "Offers reliable wireless connectivity with advanced security features and improved range.",
    "price": "K3,000",
    "discounted price": "K2,700"
  },
  {
    "name": "D-LINK ACCESS POINT N300",
    "category": "Accessories",
    "subcategory": "Access Points",
    "brand": "D-Link",
    "brand logo": "",
    "specs": {
      "speed": "300Mbps",
      "frequency": "Single-band 2.4GHz",
      "ports": "1x Fast Ethernet",
      "antennas": "2 external antennas",
      "security": "WEP/WPA/WPA2 encryption",
      "features": "WPS, AP Mode, Repeater Mode"
    },
    "date-added": "2025-03-06",
    "tagline": "Affordable and efficient wireless coverage.",
    "description": "A budget-friendly access point for small homes and offices looking for stable internet connectivity.",
    "price": "K1,800",
    "discounted price": "K1,600"
  },
  {
    "name": "HUAWEI AC650-128AP",
    "category": "Accessories",
    "subcategory": "Access Points",
    "brand": "Huawei",
    "brand logo": "",
    "specs": {
      "capacity": "Supports up to 128 access points",
      "frequency": "Dual-band 2.4GHz & 5GHz",
      "ports": "Multiple Gigabit Ethernet ports",
      "security": "WPA3, 802.1X authentication, firewall support",
      "features": "Centralized AP management, high-speed roaming, PoE support"
    },
    "date-added": "2025-03-06",
    "tagline": "Enterprise-grade access point controller.",
    "description": "Designed for large-scale Wi-Fi deployments, providing high-capacity connectivity with robust security and management features.",
    "price": "K50,000",
    "discounted price": "K45,000"
  },
  {
    "name": "HUAWEI AC650-256AP",
    "category": "Accessories",
    "subcategory": "Access Points",
    "brand": "Huawei",
    "brand logo": "",
    "specs": {
      "capacity": "Supports up to 256 access points",
      "frequency": "Dual-band 2.4GHz & 5GHz",
      "ports": "Multiple Gigabit Ethernet ports",
      "security": "Advanced WPA3 encryption, firewall, VLAN support",
      "features": "Cloud-based management, seamless roaming, PoE compatibility"
    },
    "date-added": "2025-03-06",
    "tagline": "Scalable and reliable wireless networking.",
    "description": "Perfect for enterprises needing a powerful and scalable Wi-Fi controller for high-density environments.",
    "price": "K80,000",
    "discounted price": "K75,000"
  },
  {
    "name": "HUAWEI AIRENGINE5761",
    "category": "Accessories",
    "subcategory": "Access Points",
    "brand": "Huawei",
    "brand logo": "",
    "specs": {
      "speed": "Up to 6Gbps",
      "frequency": "Tri-band 2.4GHz, 5GHz, 6GHz",
      "ports": "1x 10GbE uplink, 1x PoE+",
      "antennas": "Internal smart antennas",
      "security": "WPA3, AI-driven threat detection, 802.1X authentication",
      "features": "AI-powered optimization, MU-MIMO, IoT-ready"
    },
    "date-added": "2025-03-06",
    "tagline": "AI-powered Wi-Fi for next-generation networks.",
    "description": "A high-performance access point designed for ultra-fast connectivity, security, and AI-driven optimization.",
    "price": "K60,000",
    "discounted price": "K55,000"
  },
  {
    "name": "HUAWEI AP160",
    "category": "Accessories",
    "subcategory": "Access Points",
    "brand": "Huawei",
    "brand logo": "",
    "specs": {
      "speed": "Up to 1.2Gbps",
      "frequency": "Dual-band 2.4GHz & 5GHz",
      "ports": "1x Gigabit Ethernet, PoE support",
      "antennas": "Internal antennas",
      "security": "WPA2/WPA3 encryption, MAC filtering",
      "features": "Seamless roaming, centralized management, MU-MIMO"
    },
    "date-added": "2025-03-06",
    "tagline": "Compact and powerful enterprise Wi-Fi.",
    "description": "Ideal for small businesses and branch offices requiring stable and secure wireless networking.",
    "price": "K18,000",
    "discounted price": "K16,500"
  },
  {
    "name": "HUAWEI AP263",
    "category": "Accessories",
    "subcategory": "Access Points",
    "brand": "Huawei",
    "brand logo": "",
    "specs": {
      "speed": "Up to 1.75Gbps",
      "frequency": "Dual-band 2.4GHz & 5GHz",
      "ports": "2x Gigabit Ethernet, PoE+ support",
      "antennas": "Internal smart antennas",
      "security": "WPA3, 802.1X authentication",
      "features": "High-density connectivity, seamless roaming, AI-driven optimization"
    },
    "date-added": "2025-03-06",
    "tagline": "Reliable high-performance enterprise Wi-Fi.",
    "description": "A robust access point designed for offices, campuses, and retail environments.",
    "price": "K25,000",
    "discounted price": "K23,000"
  },
  {
    "name": "HUAWEI AP361",
    "category": "Accessories",
    "subcategory": "Access Points",
    "brand": "Huawei",
    "brand logo": "",
    "specs": {
      "speed": "Up to 3Gbps",
      "frequency": "Tri-band 2.4GHz, 5GHz, 6GHz",
      "ports": "2x 2.5GbE, PoE+ support",
      "antennas": "High-gain directional antennas",
      "security": "WPA3, IoT security enhancements",
      "features": "Mesh networking, cloud-based management, AI-powered optimization"
    },
    "date-added": "2025-03-06",
    "tagline": "Next-gen tri-band wireless networking.",
    "description": "A powerful enterprise-grade AP built for high-speed data and seamless connectivity.",
    "price": "K35,000",
    "discounted price": "K32,000"
  },
  {
    "name": "HUAWEI AP371",
    "category": "Accessories",
    "subcategory": "Access Points",
    "brand": "Huawei",
    "brand logo": "",
    "specs": {
      "speed": "Up to 4.8Gbps",
      "frequency": "Tri-band 2.4GHz, 5GHz, 6GHz",
      "ports": "2x 10GbE, PoE++ support",
      "antennas": "Smart omnidirectional antennas",
      "security": "WPA3, AI-driven threat detection",
      "features": "AI-powered performance tuning, seamless roaming, IoT-ready"
    },
    "date-added": "2025-03-06",
    "tagline": "Ultra-fast enterprise-grade access point.",
    "description": "Designed for high-demand environments such as campuses, stadiums, and corporate buildings.",
    "price": "K45,000",
    "discounted price": "K42,000"
  },
  {
    "name": "HUAWEI AP661",
    "category": "Accessories",
    "subcategory": "Access Points",
    "brand": "Huawei",
    "brand logo": "",
    "specs": {
      "speed": "Up to 6Gbps",
      "frequency": "Tri-band 2.4GHz, 5GHz, 6GHz",
      "ports": "2x 10GbE, PoE++ support",
      "antennas": "Adaptive beamforming antennas",
      "security": "WPA3, Zero Trust Network security",
      "features": "AI-driven QoS, cloud management, IoT edge computing"
    },
    "date-added": "2025-03-06",
    "tagline": "Enterprise Wi-Fi redefined.",
    "description": "A top-tier access point built for large-scale business deployments, ensuring peak performance and security.",
    "price": "K60,000",
    "discounted price": "K57,000"
  },
  {
    "name": "HUAWEI AP761",
    "category": "Accessories",
    "subcategory": "Access Points",
    "brand": "Huawei",
    "brand logo": "",
    "specs": {
      "speed": "Up to 7.8Gbps",
      "frequency": "Tri-band 2.4GHz, 5GHz, 6GHz",
      "ports": "2x 10GbE, PoE++ support",
      "antennas": "High-performance smart antennas",
      "security": "WPA3, AI-powered cybersecurity",
      "features": "Cloud-managed networking, seamless roaming, IoT-ready"
    },
    "date-added": "2025-03-06",
    "tagline": "The pinnacle of wireless performance.",
    "description": "Huawei’s most advanced access point, built for extreme performance and future-proof networking.",
    "price": "K75,000",
    "discounted price": "K70,000"
  },
  {
    "name": "TP-LINK AC1200 DUAL-BAND WI-FI ACCESS POINT",
    "category": "Accessories",
    "subcategory": "Access Points",
    "brand": "TP-Link",
    "brand logo": brandLogo.TPLink,
    "specs": {
      "speed": "Up to 1200Mbps",
      "frequency": "Dual-band 2.4GHz & 5GHz",
      "ports": "1x Gigabit Ethernet, PoE support",
      "antennas": "2 external high-gain antennas",
      "security": "WPA3, Guest Network, MAC Filtering",
      "features": "Seamless roaming, MU-MIMO, AP mode"
    },
    "date-added": "2025-03-06",
    "tagline": "Reliable dual-band Wi-Fi for seamless connectivity.",
    "description": "Ideal for small businesses and homes, offering strong Wi-Fi coverage with easy setup and security.",
    "price": "K12,000",
    "discounted price": "K10,500"
  },
  {
    "name": "TP-LINK AC1200 WHOLE HOME MESH WI-FI SYSTEM",
    "category": "Accessories",
    "subcategory": "Access Points",
    "brand": "TP-Link",
    "brand logo": brandLogo.TPLink,
    "specs": {
      "speed": "Up to 1200Mbps",
      "frequency": "Dual-band 2.4GHz & 5GHz",
      "ports": "2x Gigabit Ethernet per unit",
      "security": "WPA3, Parental Controls, Guest Network",
      "features": "Mesh technology, AI-driven optimization, seamless roaming"
    },
    "date-added": "2025-03-06",
    "tagline": "Whole-home Wi-Fi with mesh technology.",
    "description": "Eliminates Wi-Fi dead zones and ensures smooth connectivity across your home with a mesh network.",
    "price": "K20,000",
    "discounted price": "K18,500"
  },
  {
    "name": "TP-LINK AC1350 WIRELESS MU-MIMO GIGABIT CEILING MOUNT ACCESS POINT",
    "category": "Accessories",
    "subcategory": "Access Points",
    "brand": "TP-Link",
    "brand logo": brandLogo.TPLink,
    "specs": {
      "speed": "Up to 1350Mbps",
      "frequency": "Dual-band 2.4GHz & 5GHz",
      "ports": "1x Gigabit Ethernet, PoE support",
      "antennas": "Internal high-performance antennas",
      "security": "WPA3, VLAN support, Rogue AP detection",
      "features": "Ceiling-mount design, MU-MIMO, seamless roaming"
    },
    "date-added": "2025-03-06",
    "tagline": "High-performance ceiling-mount access point for businesses.",
    "description": "Perfect for offices, hotels, and enterprises looking for reliable, high-speed wireless coverage.",
    "price": "K15,000",
    "discounted price": "K13,500"
  },
  {
    "name": "TP-LINK AX1500 Whole Home Mesh Wi-Fi 6 System",
    "category": "Accessories",
    "subcategory": "Access Points",
    "brand": "TP-Link",
    "brand logo": brandLogo.TPLink,
    "specs": {
      "WiFi Standard": "Wi-Fi 6 (802.11ax)",
      "Bands": "Dual-band 2.4GHz & 5GHz",
      "Speed": "Up to 1500Mbps",
      "Coverage": "Up to 4,500 sq. ft.",
      "Features": ["Mesh Technology", "Parental Controls", "OFDMA", "MU-MIMO", "Adaptive Routing"]
    },
    "date-added": "2025-03-06",
    "tagline": "Whole-home Wi-Fi with next-gen speed and coverage.",
    "description": "The TP-LINK AX1500 Mesh System ensures seamless Wi-Fi coverage with advanced features like MU-MIMO and adaptive routing for fast, reliable connectivity.",
    "price": "K7,500",
    "discounted price": "K7,000"
  },
  {
    "name": "TP-LINK AX1800 Whole Home Mesh Wi-Fi System",
    "category": "Accessories",
    "subcategory": "Access Points",
    "brand": "TP-Link",
    "brand logo": brandLogo.TPLink,
    "specs": {
      "WiFi Standard": "Wi-Fi 6 (802.11ax)",
      "Bands": "Dual-band 2.4GHz & 5GHz",
      "Speed": "Up to 1800Mbps",
      "Coverage": "Up to 5,500 sq. ft.",
      "Features": ["Seamless Roaming", "Parental Controls", "AI-Driven Mesh", "OFDMA & MU-MIMO"]
    },
    "date-added": "2025-03-06",
    "tagline": "Next-level Wi-Fi 6 mesh coverage for every corner.",
    "description": "The AX1800 system offers AI-driven mesh technology, ensuring consistent performance and seamless roaming across your entire home.",
    "price": "K9,500",
    "discounted price": "K9,000"
  },
  {
    "name": "TP-LINK AC1900 Whole Home Mesh Wi-Fi System",
    "category": "Accessories",
    "subcategory": "Access Points",
    "brand": "TP-Link",
    "brand logo": brandLogo.TPLink,
    "specs": {
      "WiFi Standard": "Wi-Fi 5 (802.11ac)",
      "Bands": "Dual-band 2.4GHz & 5GHz",
      "Speed": "Up to 1900Mbps",
      "Coverage": "Up to 6,000 sq. ft.",
      "Features": ["Mesh Technology", "Parental Controls", "Adaptive Routing", "MU-MIMO"]
    },
    "date-added": "2025-03-06",
    "tagline": "Whole-home Wi-Fi with high-speed connectivity.",
    "description": "The AC1900 Mesh System delivers seamless whole-home Wi-Fi, eliminating dead zones and ensuring fast, stable connections.",
    "price": "K8,000",
    "discounted price": "K7,500"
  },
  {
    "name": "TP-LINK AX3000 Ceiling Mount Dual-Band Wi-Fi 6 Access Point",
    "category": "Accessories",
    "subcategory": "Access Points",
    "images": [
      productImages.TP_LINK_AX3000_1,
      productImages.TP_LINK_AX3000_2,
      productImages.TP_LINK_AX3000_3,
    ],
    "brand": "TP-Link",
    "brand logo": brandLogo.TPLink,
    "specs": {
      "WiFi Standard": "Wi-Fi 6 (802.11ax)",
      "Bands": "Dual-band 2.4GHz & 5GHz",
      "Speed": "Up to 3000Mbps",
      "Ports": "1x Gigabit Ethernet, PoE support",
      "Features": ["MU-MIMO", "Seamless Roaming", "High-Density Performance", "VLAN Support"]
    },
    "date-added": "2025-03-06",
    "tagline": "Enterprise-grade Wi-Fi 6 ceiling mount access point.",
    "description": "The AX3000 access point offers high-speed Wi-Fi 6 coverage with seamless roaming and robust performance for business environments.",
    "price": "K10,000",
    "discounted price": "K9,500"
  },
  {
    "name": "TP-LINK AX5400 Whole Home Mesh Wi-Fi 6 System",
    "category": "Accessories",
    "subcategory": "Access Points",
    "images": [
      productImages.TP_LINK_AX5400_1,
      productImages.TP_LINK_AX5400_2,
      productImages.TP_LINK_AX5400_3,
    ],
    "brand": "TP-Link",
    "brand logo": brandLogo.TPLink,
    "specs": {
      "WiFi Standard": "Wi-Fi 6 (802.11ax)",
      "Bands": "Dual-band 2.4GHz & 5GHz",
      "Speed": "Up to 5400Mbps",
      "Coverage": "Up to 9,000 sq. ft.",
      "Features": ["AI-Driven Mesh", "Parental Controls", "Seamless Roaming", "MU-MIMO", "OFDMA"]
    },
    "date-added": "2025-03-06",
    "tagline": "High-speed whole-home mesh coverage with AI optimization.",
    "description": "The AX5400 mesh system provides ultra-fast Wi-Fi coverage with advanced features, making it perfect for smart homes and large spaces.",
    "price": "K14,000",
    "discounted price": "K13,500"
  }
]

export const getProductByName = (name) => {
  console.log('Product name search',name)
  return allProducts.find(product => product.name.toLowerCase() === name.toLowerCase()) || null;
};

export const filterProducts = (filterBy, filter, count) => {
  let products = allProducts
    .filter(product => product[filterBy] === filter)
    .sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded))
    
  if(count){ return products.slice(0, count); } 

  return products  
};

export const randomProduct = (filterBy, filter, count) => {
  if(filterBy, filter) {
    let filteredProductsArr = filterProducts(filterBy, filter, count)
    let index = Math.floor(Math.random() * filteredProductsArr.length)
    return filteredProductsArr[index]
  }

  let index = Math.floor(Math.random() * allProducts.length)
  return allProducts[index]
}

// export const getRecentProductsByCategory = (category, count) => {
//   let products = allProducts
//     .filter(product => product.category === category)
//     .sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded))
    
//   if(count){ return products.slice(0, count); } 

//   return products  
// };

// export const getRecentProductsBySubCategory = (subcategory, count) => {
//   let products = allProducts
//     .filter(product => product.subcategory === subcategory)
//     .sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded))

//   if(count){ return products.slice(0, count); } 

//   return products; 
// };

