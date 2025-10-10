import { description } from "@/siteMetaData";

export const slugify = (name) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

export const productCategories = {
  indoor: {
    name: 'Indoor',
    subCategories: [
      'Banner Stands',
      'Floor Stands & Free Stands',
      'Brochure Stands',
      'Fabric Stretch Frame',
      'Point of Sale Tables & Counters',
      'Light Boxes & Illuminated Displays',
      'Wall & Hanging Displays',
      'Accessories & Equipment',
      'Flag Indoor Options',
      'Floating Display System',
      'Hanging Extrusions',
      'Ideal Applicator',
      'Ideal Media Roll Dispenser',
      'Ideal Vinyl Weeding Machine & Take-up System',
      'Picture Frames & Shutter Frame',
      'Table Cloth'
    ],
  },
  outdoor: {
    name: 'Outdoor',
    subCategories: [
      'Gazebos',
      'Flags & Flying Banners',
      'A Frames',
      'Outdoor Banner Frames & Wall Systems',
      'BackPack',
      'Billboards',
      'Bunting',
      'Car Options',
      'Director Chair Options',
      'Floor Stand Outdoor',
      'Star Tents',
      'Umbrella',
      'Magnetic Decals'
    ],
  },
};

export const products = {
  'Banner Stands': [
    {
      id: 1,
      name: 'Banner Stand',
      description:
        'Banner Stand include a top and bottom extrusion for print suspension, weighted base, pole and carry bag, with or without full color print – fully collapsible and compact. Banner Stand standard sizes available include: Banner Stand 850mm x 2000mm , Banner Stand 1000mm x 2000mm',
      // price: 'From R250',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Banner-Stand-Indoor-Front-Back-1-e1747921600362.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Banner-Stand-Indoor-Side-e1646055021980.png',
      ],
      sizes: ['850 x 2000mm', '1000 x 2000mm'],
    },
    {
      id: 2,
      name: 'Banner Plus',
      description: "Banner Plus system include a sturdy aluminium base, two side poles and top extrusion to hold a single PVC banner with double sided print – fully collapsible and compact. Banner Plus custom sizes are available on request. Standard size available includes:850mm x 2000mm",
      // price: 'From R129',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/Banner-Plus.png'
      ],
      sizes: ['850mm x 2000mm'],
    },
    {
      id: 3,
      name: 'Banner Plus 1',
      description: 'Banner Plus 1 system include a sturdy aluminium base, two side poles and top extrusion to hold two PVC banners with print – fully collapsible and compact. Banner Plus 1 custom sizes are available on request. Standard size available includes: 850mm x 2000mm',
      // price: 'From R199',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/Banner-Plus-1.png'
      ],
      sizes: ['850mm x 2000mm'],
    },
    {
      id: 4,
      name: 'Harpoon Banner 1',
      description: 'Harpoon Banner 1 system include a sturdy aluminium base, two side flexible uprights and top extrusion to hold a single PVC banner with double sided print – fully collapsible and compact. Custom sizes are available on request. Harpoon Banner 1 850mm x 2000mm',
      // price: 'From R199',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/Harpoon-Banner-1.png'
      ],
      sizes: ['850mm x 2000mm'],
    },
    {
      id: 5,
      name: 'Harpoon Banner 2',
      description: 'Harpoon Banner 2 system include a sturdy aluminium base, two side flexible uprights and top extrusion to hold a single PVC banner with double sided print – fully collapsible and compact. Harpoon Banner 2 custom sizes are available on request.Harpoon Banner 2 system include a sturdy aluminium base, two side flexible uprights and top extrusion to hold a single PVC banner with double sided print – fully collapsible and compact. Harpoon Banner 2 custom sizes are available on request.',
      // price: 'From R199',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/Harpoon-Banner-2.png'
      ],
      sizes: ['850mm x 2000mm'],
    },
    {
      id: 6,
      name: 'Harpoon Banner 3',
      description: 'Harpoon Banner 3 system include a sturdy aluminium base, two side flexible uprights and top extrusions to hold two PVC banners with print – fully collapsible and compact. Harpoon Banner 3 custom sizes are available on request.',
      // price: 'From R199',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/Harpoon-Banner-3.png'
      ],
      sizes: ['850mm x 2000mm'],
    },
    {
      id: 7,
      name: 'Harpoon Banner 4',
      description: 'Harpoon Banner 4 system include a sturdy aluminium base, two side flexible uprights and top extrusions to hold two PVC banners with print – fully collapsible and compact. Harpoon Banner 4 custom sizes are available on request.',
      // price: 'From R199',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/Harpoon-Banner-4.png'
      ],
      sizes: ['850mm x 2000mm'],
    },
    {
      id: 8,
      name: 'S Banner',
      description: 'S Banner system include a sturdy aluminium tubular frame, frame tubes are elastic connected for ease of assembly and or disassembly, with or without full color double sided cloth print – fully collapsible and compact. Custom sizes are available on request. S Banner standard size available include: 900mm x 2000mm.',
      // price: 'From R199',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/S-Banner.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/S-Banner-Front-View-scaled-e1748249090617.jpg'
      ],
      sizes: ['900mm x 2000mm'],
    },
    {
      id: 9,
      name: 'S Banner 1',
      description: 'S Banner 1 system include a sturdy aluminium tubular frame, frame tubes are elastic connected for ease of assembly and or disassembly, with or without full color double sided cloth print – fully collapsible and compact. Custom sizes are available on request. S Banner 1 standard size available include: 900mm x 2000mm.',
      // price: 'From R199',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2024/12/S-Banner-New-Graphics-Applied-6-e1745310238813.jpg',
        'https://www.idealdisplays.co.za/wp-content/uploads/2024/12/S-Banner-New-Graphics-Applied-4-e1748249293980.jpg'
      ],
      sizes: ['900mm x 2000mm'],
    },
    {
      id: 10,
      name: 'Tri - Banner',
      description: 'Tri Banner is a three sided self standing display devise that accommodates a print size of 910mm X 2070mm with carry bag, with or without print – fully collapsible and compact. Tri Banner',
      // price: 'From R199',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Tri-Banner-2-e1748252398773.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Tri-Banner-Top-Perspective-e1646056068321.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Tri-Banner-Print-System-1-e1748252474513.png'
      ],
      sizes: ['910mm X 2070mm'],
    },
    {
      id: 11,
      name: 'X Banner XS1',
      description: 'X Banner XS1 is a single sided self standing display device that accommodates a print size of 750mm x 1750mm with carry bag, with or without print – fully collapsible and compact. X Banner XS1',
      // price: 'From R199',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/X-Banner-XS-1.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/XS-1-X-Banner-1-e1748252918543.jpg'
      ],
      sizes: ['750mm x 1750mm'],
    },
    {
      id: 12,
      name: 'X Banner XS2',
      description: 'X Banner XS2 is a single sided self standing display device that accommodates a print size of 600mm x 1700mm with carry bag, with or without print – fully collapsible and compact. X Banner XS2',
      // price: 'From R199',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/X-Banner-XS-2.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/XS-2-X-Banner-I-e1748253099527.jpg',
      ],
      sizes: ['600mm x 1700mm'],
    },
    {
      id: 13,
      name: 'X Banner Tabe',
      description: 'X Banner Table (XS-3) is a single sided self standing display device that accommodates a print size of 200mm x 400mm with carry bag, with or without print – fully collapsible and compact. Table X Banner',
      // price: 'From R199',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/X-Banner-XS-3.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/XS-3-Table-X-Banner-I-e1748253341377.jpg',
      ],
      sizes: ['200mm x 400mm'],
    },
    {
      id: 14,
      name: 'Overhead Rotating Banner',
      description: 'Overhead Rotating Banner attracts attention by means of continuous 360 degree rotation – electrical motor driven. Allowing a maximum of four double sided printed panels that is overhead suspended for maximum exposure – with or without full color print – fully collapsible and compact. Overhead Rotating Banner',
      // price: 'From R199',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Overhead-Rotating-Banner.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Overhead-Rotating-Banner-1-1-e1748263442904.png',
      ],
      //sizes: ['200mm x 400mm'],
    },
    {
      id: 15,
      name: 'Econo Wall Banner 5 panel',
      description: 'Econo Wall Banner 5 Panel includes five Econo Rola banners which comprise a sturdy aluminium base, pole and top extrusion to hold a PVC banner print, all interconnected to form a single wall that can be manipulated to required shape or form. Econo Wall Banner custom sizes are available on request.',
      // price: 'From R199',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/Econo-Wall-Banner.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/PSD-Mockup-Econo-Wall-Banner-1-e1748430904923.png',
      ],
      sizes: ['850mm x 2000mm'],
    },
    {
      id: 16,
      name: 'Wall Banner Cloth Straight',
      description: 'Cloth Banner Wall Straight comprise of an aluminium round tubing construction, soft carry case, with or without full color prints – fully collapsible and compact. This system as a standard is available in straight configuration although a curved and non-standard alternatives are available on request. Cloth Banner Wall Straight',
      // price: 'From R199',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2023/05/WBC-3x4-Straight-Perspective-e1636641659933.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/WBC-3x5-Straight-Perspective-e1748431127390.png',
      ],
      sizes: [
        'WC36: 3 cubes high x 6 cubes wide = 2220mm high x 4320mm wide',
        'WC35: 3 cubes high x 5 cubes wide = 2220mm high x 3700mm wide',
        'WC34: 3 cubes high x 4 cubes wide = 2220mm high x 2920mm wide',
        'WC33: 3 cubes high x 3 cubes wide = 2220mm high x 2220mm wide',
        'WC32: 3 cubes high x 2 cubes wide = 2220mm high x 1490mm wide',
        'WC31: 3 cubes high x 1 cube wide = 2220mm high x 770mm wide'
      ],
    },
    {
      id: 17,
      name: 'Wall Banner Cloth Straight with closed sides',
      description: 'Cloth Banner Wall Straight with closed sides comprise of an aluminium round tubing construction, soft carry case, with or without full color print that wraps the sides of the system – fully collapsible and compact. This system as a standard is available in straight configuration although a curved and non-standard alternatives are available on request. Cloth Banner Wall Straight with closed sides',
      // price: 'From R199',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/Cloth-Banner-Wall-Straight-with-closed-sides.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/WBC-3x1-Straight-with-Closed-Sides-Perspective-e1748431374193.png',
      ],
      sizes: [
        'WC36S: 3 cubes high x 6 cubes wide = 2220mm high x 4320mm system & 5030mm print',
        'WC35S: 3 cubes high x 5 cubes wide = 2220mm high x 3700mm system & 4410mm print',
        'WC34S: 3 cubes high x 4 cubes wide = 2220mm high x 2920mm system & 3630mm print',
        'WC33S: 3 cubes high x 3 cubes wide = 2220mm high x 2220mm system & 2930mm print',
        'WC32S: 3 cubes high x 2 cubes wide = 2220mm high x 1490mm system & 2200mm print',
        'WC31S: 3 cubes high x 1 cube wide = 2220mm high x 770mm system & 1480mm print'
      ],
    },
    {
      id: 18,
      name: 'Wall Banner Cloth Straight with end caps',
      description: 'Cloth Banner Wall Straight with end caps comprise of an aluminium round tubing construction, soft carry case, firm end panels with or without full color prints – fully collapsible and compact. Cloth Banner Wall Straight with end caps',
      // price: 'From R199',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2016/10/Cloth-Banner-Wall-Straight-with-end-caps.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2016/10/Wall-Cloth-5-1-e1748432682785.png',
      ],
      sizes: [
        'WC36E: 3 cubes high x 6 cubes wide = 2220mm high x 5760mm wide',
        'WC35E: 3 cubes high x 5 cubes wide = 2220mm high x 5140mm wide',
        'WC34E: 3 cubes high x 4 cubes wide = 2220mm high x 4360mm wide',
        'WC33E: 3 cubes high x 3 cubes wide = 2220mm high x 3660mm wide',
        'WC32E: 3 cubes high x 2 cubes wide = 2220mm high x 2930mm wide',
        'WC31E: 3 cubes high x 1 cube wide = 2220mm high x 2210mm wide'
      ],
    },
    {
      id: 19,
      name: 'Wall Banner Cloth Curve',
      description: 'Cloth Banner Wall Curve comprise of an aluminium round tubing construction, soft carry case, with or without full colour prints – fully collapsible and compact. Cloth Banner Wall Curve',
      // price: 'From R199',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2016/10/Cloth-Banner-Wall-Curve.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2016/10/Wall-Cloth-5-1-e1748432682785.png',
      ],
      sizes: [
        'WC36C: 3 cubes high x 6 cubes wide = 2220mm high x 3980mm wide',
        'WC35C: 3 cubes high x 5 cubes wide = 2220mm high x 3340mm wide',
        'WC34C: 3 cubes high x 4 cubes wide = 2220mm high x 2670mm wide',
        'WC33C: 3 cubes high x 3 cubes wide = 2220mm high x 1970mm wide',
        'WC32C: 3 cubes high x 2 cubes wide = 2220mm high x 1335mm wide'
      ],
    },
    {
      id: 20,
      name: 'Wall Banner Cloth Curve with closed sides',
      description: 'Cloth Banner Wall Curve with closed sides comprise of an aluminium round tubing construction. Also, with soft carry case. Most noteworthy, with or without full color print. The print wraps the sides of the system. Above all, the unit is fully collapsible and compact. Cloth Banner Wall Curve with closed sides',
      // price: 'From R199',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/Cloth-Banner-Wall-Curve-with-closed-sides.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2016/10/Wall-Cloth-5-1-e1748432682785.png',
      ],
      sizes: [
        'WC36CS: 3 cubes high x 6 cubes wide = 2220mm high x 3980mm system & 4610mm print.',
        'WC35CS: 3 cubes high x 5 cubes wide = 2220mm high x 3340mm system & 3970mm print.',
        'WC34CS: 3 cubes high x 4 cubes wide = 2220mm high x 2670mm system & 3300mm print.',
        'WC33CS: 3 cubes high x 3 cubes wide = 2220mm high x 1970mm system & 2600mm print.',
        'WC32CS: 3 cubes high x 2 cubes wide = 2220mm high x 1335mm system & 1965mm print.'
      ],
    },
    {
      id: 21,
      name: 'Wall Banner Cloth Curve with end caps',
      description: 'Cloth Banner Wall Curve with end caps comprise of an aluminium round tubing construction, soft carry case, firm end cap panels with or without full color prints – fully collapsible and compact. Also, non standard alternatives are available. Cloth Banner Wall Curve with end caps',
      // price: 'From R199',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2016/10/Cloth-Banner-Wall-Curve-with-end-caps.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2016/10/Wall-Cloth-5-1-e1748432682785.png',
      ],
      sizes: [
        'WC36CE: 3 cubes high x 6 cubes wide = 2220mm high x 5420mm wide',
        'WC35CE: 3 cubes high x 5 cubes wide = 2220mm high x 4780mm wide',
        'WC34CE: 3 cubes high x 4 cubes wide = 2220mm high x 4030mm wide',
        'WC33CE: 3 cubes high x 3 cubes wide = 2220mm high x 3410mm wide',
        'WC32CE: 3 cubes high x 2 cubes wide = 2220mm high x 2775mm wide'
      ],
    },
    {
      id: 22,
      name: 'Wall Banner Cloth 2200 x 2800',
      description: 'Wall Banner Cloth 2200 x 2800 comprise of a steel and aluminium construction, fully collapsible and compact, trolley carry bag, with or without full color double sided stretch print. Wall Banner Cloth 2200 x 2800 custom sizes are available on request although dependent on quantity.',
      // price: 'From R199',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/WBC-2822-Top-Perspective-e1646056967851.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/WBC-2822-Front-1-e1748434332986.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/WBC-2822-Side-1-e1748434385234.png'
      ],
      sizes: ['2200mm x 2800mm'],
    },
    {
      id: 23,
      name: 'Wall Banner Cloth 25 - 900 x 2100',
      description: 'Wall Banner Cloth 25 – 900 x 2100 comprise of a steel and aluminium construction, fully collapsible and compact, carry bag, with or without full color double sided stretch print. Wall Banner Cloth 25 – 900 x 2100 custom sizes are available on request although.',
      // price: 'From R199',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2021/06/8-WBC25-900x2100-I-e1628834716584.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2021/06/System-with-Print-Front-1-e1748434691257.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2021/06/System-with-Print-Perspective-1-e1748434790242.png'
      ],
      sizes: ['900mm x 2100mm'],
    },
  ],
  'Floor Stands & Free Stands': [
    {
      id: 24,
      name: 'A1 Floor Stand 1000',
      description: 'A1 Floor Stand 1000 is a collapsible A1 double sided 1000mm high floor stand, intended for indoor use but can be adapted for outdoor use at an additional fee, with or without full color print. A1 Floor Stand 1000 custom sizes are available on request although dependent on quantity.',
      // price: 'From R149',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/A1-Floor-Stand-1000.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/A1-Floor-Stand-1000-I-e1748244435169.jpg'
      ],
      sizes: ['1000mm high floor stand'],
    },
    {
      id: 25,
      name: 'A1 Floor Stand 1900',
      description: 'A1 Floor Stand 1900 is a collapsible A1 double sided 1900mm high floor stand, intended for indoor use but can be adapted for outdoor use at an additional fee, with or without full color print. A1 Floor Stand 1900 custom sizes are available on request although dependent on quantity.',
      // price: 'From R149',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/A1-Floor-Stand-1900.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/A1-Floor-Stand-1900-I-e1748244567572.jpg'
      ],
      sizes: ['1900mm high floor stand'],
    },
    {
      id: 26,
      name: 'A1 Free Stand',
      description: 'A1 Free Stand is double sided and 1900mm high, intended for indoor use but can be adapted for outdoor use at an additional fee, with or without full color print. A1 Free Stand custom sizes are available on request although dependent on quantity.',
      // price: 'From R149',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/A1-Free-Stand.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/A1-Free-Stand-I-e1748244809197.jpg'
      ],
      sizes: ['1900mm high'],
    },
    {
      id: 27,
      name: 'A1 Free Stand 2',
      description: 'A1 Free Stand 2 is double sided and 1900mm high with 2 x A1 Double Sided Magnetic Frames and square upright legs, intended for indoor use but can be adapted for outdoor use at an additional fee, with or without full color print. A1 Free Stand 2 custom sizes are available on request although dependent on quantity.',
      // price: 'From R179',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/A1-Free-Stand-2.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/A1-Free-Stand-2-I-e1748244931598.jpg'
      ],
      Sizes: ['1900mm high'],
    },
    {
      id: 28,
      name: 'A1 Free Stand 3',
      description: 'A1 Free Stand 3 is double sided and 1900mm high with A1 Double Sided Shutter Frame and oval aluminium upright legs, intended for indoor use but can be adapted for outdoor use at an additional fee, with or without full color print. A1 Free Stand 3 custom sizes are available on request although dependent on quantity.',
      // price: 'From R179',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/A1-Free-Stand-3.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/A1-Free-Stand-3-I-e1748245100408.jpg'
      ],
      Sizes: ['1900mm high'],
    },
    {
      id: 29,
      name: 'Fabric Stretch Frame Free Standing',
      description: 'Fabric Stretch Frame Free Standing is a make to order 45mm single sided or 42mm double sided aluminium frame with free standing bases to accommodate a cloth print. Frameless and slim appearance, collapsible and compact, with or without full colour print. Fabric Stretch Frame Free Standing',
      // price: 'From R179',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/Fabric-Stretch-Frame-Free-Standing.png'
      ],
      Sizes: [
        '45mm single sided',
        '42mm double sided'
      ],
    },
    {
      id: 30,
      name: 'Floor Stand Easel',
      description: 'Floor Stand Easel is steel constructed and epoxy coated in silver color. The system present an adjustable opening of 230mm to 1530mm to house a Shutter Frame, Picture Frame and or display panel – fully collapsible and compact. Floor Stand Easel',
      // price: 'From R179',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Floor-Stand-Easel.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Floor-Stand-Easel-I-e1748245511143.jpg'
      ],
      //Sizes: ['45mm single sided', '42mm double sided'],
    },
    {
      id: 31,
      name: 'Floor Stand Life Like',
      description: 'Floor Stand Life Like (594mm x 1675mm) is double sided 1900mm high floor stand, intended for indoor use however can be adapted for outdoor use at an additional fee, with or without full color print. Floor Stand Life Like custom sizes are available on request although dependent on quantity.',
      // price: 'From R179',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Floor-Stand-Life-Like.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Floor-Stand-Life-Like-I-e1748245639292.jpg'
      ],
      //Sizes: ['45mm single sided', '42mm double sided'],
    },
    {
      id: 32,
      name: 'Floor Stand Life Like 2',
      description: 'Floor Stand Life Like 2 (594mm x 1675mm) is a double sided 1900mm high floor stand with Double Sided Shutter Frame and square upright legs, intended for indoor use however can be adapted for outdoor use at an additional fee, with or without full color print. Custom sizes are available on request although dependent on quantity. Floor Stand Life Like 2',
      // price: 'From R179',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Floor-Stand-Life-Like-2.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Floor-Stand-Life-Like-2-I-e1748245756123.jpg'
      ],
      Sizes: ['594mm x 1675mm (1900mm high)'],
    },
    {
      id: 33,
      name: 'Floor Stand Life Like 3',
      description: 'Floor Stand Life Like 3 (594mm x 1675mm) is a double sided 1900mm high floor stand with Double Sided Shutter Frame and oval aluminium upright legs, intended for indoor use however can be adapted for outdoor use at an additional fee, with or without full color print. Floor Stand Life Like 3 custom sizes are available on request although dependent on quantity.',
      // price: 'From R179',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Floor-Stand-Life-Like-3.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Floor-Stand-Life-Like-3-I-e1748245875114.jpg'
      ],
      Sizes: ['594mm x 1675mm (1900mm high)'],
    },
    {
      id: 34,
      name: 'Floor Stand Life Like 4',
      description: 'Floor Stand Life Like 4 (650mm x 1900mm) is a double sided 1900mm high floor stand with Double Sided 42mm Fabric Stretch Frame intended for indoor use, with or without full color print. Floor Stand Life Like 4 custom sizes are available on request although dependent on quantity.',
      // price: 'From R179',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2015/08/Floor-Stand-Life-Like-4.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2015/08/photo-2-scaled-e1748246425385.jpg'
      ],
      Sizes: ['650mm x 1900mm'],
    },
    {
      id: 35,
      name: 'Floor Stand Life Like 4 LED',
      description: 'Floor Stand Life Like 4 LED (650mm x 1900mm) is a double sided 1900mm high floor stand with Double Sided 42mm Fabric Stretch Frame and LED internal edge lighting intended for indoor use, with or without full color print. Floor Stand Life Like 4 LED custom sizes are available on request although dependent on quantity.',
      // price: 'From R179',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2015/08/Floor-Stand-Life-Like-4-LED.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2015/08/Light-Box-Fabric-Stretch-Frame-open-file-1-e1748246825955.png'
      ],
      Sizes: ['650mm x 1900mm'],
    },
    {
      id: 36,
      name: 'Poster Stand Standard Base',
      description: 'Poster Stand Standard Base includes a removable steel constructed base in silver color and a 2000mm collapsible aluminium pole. A range of Shutter Frames and or Picture Frames ranging from A4 to A1 could be adapted to suit the system, with or without full color print, single or double sided. Poster Stand Standard Base custom size Shutter Frames and or Pictures are available on request to suit the system. Poster Stand Standard Base',
      // price: 'From R179',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Poster-Stand-Standard-Base.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Poster-Stand-Standard-Base-I-e1748247507686.jpg'
      ],
      //Sizes: ['650mm x 1900mm'],
    },
    {
      id: 37,
      name: 'Poster Stand Tripod Base',
      description: 'Poster Stand Tripod Base include three removable base legs constructed from steel in black color. The system include a 2000mm collapsible aluminium pole. A range of Shutter Frames and or Picture Frames ranging from A4 to A1 could be adapted to suit the system, with or without full color print, single or double sided. Poster Stand Tripod Base custom size Shutter Frames and or Picture Frames are available on request to suit the system.',
      // price: 'From R179',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Poster-Stand-Tripod-Base.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Poster-Stand-Tripod-Base-I-e1748247881552.jpg'
      ],
      //Sizes: ['650mm x 1900mm'],
    },
  ],
  'Brochure Stands': [
    {
      id: 38,
      name: 'A3 Podium Brochure Stand',
      description: 'Brochure Stand A3 Podium is steel constructed and epoxy coated in black color with a removable clear perspex overlay, with or without full color print. Brochure Stand A3 Podium',
      // price: 'From R89',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Brochure-Stand-A3-Podium-300x300.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Brochure-Stand-A3-Podium-Perspective-1-e1747921899585.png'
      ],
    },
    {
      id: 39,
      name: 'A4 Z-Up Brochure Stand',
      description: 'Brochure Stand A4 Z Up is steel constructed and epoxy coated in silver color. The system comprises of three double sided A4 tiers and is supplied with a carry bag – fully collapsible and compact. The Brochure Stand A4 Z Up can be customized to requirements but subject to quantity. Brochure Stand A4 Z Up',
      // price: 'From R89',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Brochure-Stand-A4-Z-Up.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Brochure-Stand-A4-Z-Up-3-1-1.jpg'
      ],
    },
    {
      id: 40,
      name: 'Econo Plus Mesh Brochure Stand',
      description: 'Brochure Stand Econo Plus Mesh include a durable mesh backing with top and bottom aluminium profiles, four double A4 tiers (2 across x 4 up), weighted bases, poles and carry bag – fully collapsible and compact. This offering can be customized to requirements but subject to quantity. Brochure Stand Econo Plus Mesh',
      // price: 'From R89',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Brochure-Stand-Econo-Plus-Mesh.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Econo-Plus-Mesh-2-1-e1747923104488.png'
      ],
    },
    {
      id: 41,
      name: 'Econo Brochure Stands Double Volume',
      description: 'Brochure Stand Econo Double Volume includes a durable fabric backing with top and bottom aluminium profiles, three double A4 tiers (2 across x 3 up), weighted base, pole and carry bag – fully collapsible and compact. Custom sizes are available on request although dependent on quantity. Brochure Stand Econo Double Volume can be customized to requirements but subject to quantity.',
      // price: 'From R89',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Brochure-Stand-Econo-Double-Volume.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Brochure-Stand-Econo-Double-Volume-3-1-e1747923362471.jpg'
      ],
    },
    {
      id: 42,
      name: 'Econo Brochure Stands Single Volume',
      description:
        'Brochure Stand Econo Single Volume includes a durable fabric backing with top and bottom aluminium profiles, three A4 tiers (3 up), weighted base, pole and carry bag – fully collapsible and compact. Custom sizes are available on request although dependent on quantity. Brochure Stand Econo Single Volume can be customized to requirements but subject to quantity.',
      // price: 'From R89',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Brochure-Stand-Econo-Single-Volume.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Brochure-Stand-Econo-Single-3-1-e1747923537599.png'
      ],
    },
    {
      id: 43,
      name: 'Hologram Brochure Stand',
      description:
        'Hologram Brochure Stand is a point of purchase display, signage that offers effective, eye catching appeal. Such item for example can be used for in store merchandising and in exhibits for trade shows etc. The Hologram Brochure Stand comprises of a holographic top display with four stainless steel tiers: 300mm wide x 370mm high. Overall dimensions are 316mm wide x 320mm deep x 2020mm high – with or without full color print. The Hologram Brochure Stand can be customized to suit requirements but subject to quantity.',
      // price: 'From R89',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Hologram-Brochure-Stand.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Hologram-I-e1747923889603.jpg'
      ],
    },
    {
      id: 44,
      name: 'Line Up Brochure Stand',
      description: 'Brochure Stand Line Up is steel constructed and epoxy coated in silver color. The system comprises of four tiers and is supplied with a carry bag – fully collapsible and compact. The Brochure Stand Line Up can be customized to suite requirements but subject to quantity.',
      // price: 'From R89',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Brochure-Stand-Line-Up.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Brochure-Stand-Line-Up-3-1-e1747924295164.png'
      ],
    },
    {
      id: 45,
      name: 'Smart Brochure Stand',
      description: 'Brochure Stand Smart include two separate molded bases, aluminium uprights with cable suspension, five A4 perspex pockets and a carry bag – fully collapsible and compact. The Brochure Stand Smart can be customized to suit requirements but subject to quantity.',
      // price: 'From R89',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Brochure-Stand-Smart.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Brochure-Stand-Smart-3-1-768x768.png'
      ],
    },
    {
      id: 46,
      name: 'Table Top Brochure Stand Smart',
      description: 'Table Top Brochure Stand Smart include two separate molded bases, aluminium uprights with cable suspension, five A5 perspex pockets – fully collapsible and compact. The Table Top Brochure Stand Smart can be customized to suit requirements but subject to quantity.',
      // price: 'From R89',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2016/10/Table-Top-Brochure-Stand-Smart.png',,
        'https://www.idealdisplays.co.za/wp-content/uploads/2016/10/Table-Top-Brochure-Stand-Smart-2-1-768x768.png'
      ],
    },
    {
      id: 47,
      name: 'Executive Brochure Stand',
      description: 'Brochure Stand Executive is steel constructed and epoxy coated in silver color. The system comprises of ten tiers and is supplied with carry bag – fully collapsible and compact. The Brochure Stand Executive can be customized to suit requirements but subject to quantity. ',
      // price: 'From R89',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2015/11/Brochure-Stand-Executive.png',,
        'https://www.idealdisplays.co.za/wp-content/uploads/2015/11/Brochure-Stand-Executive-3-1-768x768.png'
      ],
    },
  ],
  'Fabric Stretch Frame': [
    {
      id: 48,
      name: 'Fabric Stretch Frame 16mm',
      description: 'Fabric Stretch Frame 16mm is a make to order single sided aluminium frame intended for wall mounting to accommodate a cloth print to create a frameless appearance, collapsible and compact – with or without full color print. The Fabric Stretch Frame 16mm can be customized to suit requirements but subject to quantity.',
      // price: 'From R89',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Fabric-Stretch-Frame-16mm.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Fabric-Stretch-Frame-16mm-I-e1748241493568.jpg'
      ],
    },
    {
      id: 49,
      name: 'Fabric Stretch Frame 35mm',
      description: 'Fabric Stretch Frame 35mm is a make to order single sided aluminium frame intended for wall mounting to accommodate a cloth print to create an elegant hanging picture frame appearance, collapsible and compact – with or without full color print. Fabric Stretch Frame 35mm',
      // price: 'From R89',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2019/03/Fabric-Stretch-Frame-35mm.png'
      ],
    },
    {
      id: 50,
      name: 'Fabric Stretch Frame 42mm Double Sided',
      description: 'Fabric Stretch Frame 42mm Double Sided is a make to order double sided aluminium frame intended for ceiling mounting and or free standing to accommodate a cloth print to create a frameless appearance, collapsible and compact – with or without full color print. Fabric Stretch Frame 42mm Double Sided',
      // price: 'From R89',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Fabric-Stretch-Frame-42mm-Double-Sided.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/FSF42-I-e1748241976565.jpg'
      ],
    },
    {
      id: 51,
      name: 'Fabric Stretch Frame 45mm',
      description: 'Fabric Stretch Frame 45mm is a make to order single sided aluminium frame intended for wall mounting to accommodate a cloth print to create a frameless appearance, collapsible and compact – with or without full color print. Fabric Stretch Frame 45mm',
      // price: 'From R89',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Fabric-Stretch-Frame-45mm.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Fabric-Stretch-Frame-45mm-I-e1748242419775.jpg'
      ],
    },
    {
      id: 52,
      name: 'Fabric Stretch Frame 16mm Round Corner',
      description: 'Fabric Stretch Frame Round 16mm is a make to order single sided aluminium frame with rounded corners intended for wall mounting to accommodate a cloth print to create a frameless appearance – fully collapsible and compact, with or without full color print. Fabric Stretch Frame Round 16mm',
      // price: 'From R89',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/Fabric-Stretch-Frame-Round-16mm.png'
      ],
    },
    {
      id: 53,
      name: 'Fabric Stretch Frame 42mm Round Corner Double Sided',
      description: 'Fabric Stretch Frame Round 42mm Double Sided is a make to order double sided aluminium frame with rounded corners intended for ceiling mounting and or free standing to accommodate two cloth prints to create a frameless appearance – fully collapsible and compact, with or without full color print. Fabric Stretch Frame Round 42mm Double Sided',
      // price: 'From R89',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/Fabric-Stretch-Frame-Round-42mm-Double-Sided.png'
      ],
    },
    {
      id: 54,
      name: 'Fabric Stretch Frame 45mm Round Corner',
      description: 'Fabric Stretch Frame Round 45mm is a make to order single sided aluminium frame with rounded corners intended for wall mounting and or free standing to accommodate a cloth print to create a frameless appearance – fully collapsible and compact, with or without full color print. Fabric Stretch Frame Round 45mm',
      // price: 'From R89',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/Fabric-Stretch-Frame-Round-45mm.png'
      ],
    },
  ],
  'Point of Sale Tables & Counters': [
    {
      id: 56,
      name: 'Point Of Sale Table',
      description: 'Point Of Sale Table is an aluminium constructed system, comprising of three display / support panels namely a face panel (780mm X 1000mm poster size), two side panels (380mm X 1000mm), a top tray and inner shelf which is epoxy coated in black color. The system furthermore includes a carry bag and is supplied with or without full color prints – fully collapsible and compact. Point Of Sale Table custom sizes are available on request although dependent on quantity.',
      // price: 'From R89',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Point-of-Sale-Table-Front-Back-e1646055241249.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Point-of-Sale-Table-Perspective-Front-768x768.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Point-of-Sale-Table-Perspective-Back-1-768x768.png'
      ],
    },
    {
      id: 57,
      name: 'Point Of Sale Table 1',
      description: 'Point Of Sale Table 1 system top is a kidney shape 580mm x 1090mm and an overall height of 940mm, light weight and compact including carry bag. The system is easy to assemble and disassemble in minutes. Printed areas include the kidney shape top and wrap around panel which is digitally printed in full color with protective lamination.',
      // price: 'From R89',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2023/05/Vodacom-System-with-Print-Front-Back-I-1-e1645089806436.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2022/02/Carlsburg-Beer-System-with-Print-Front-768x768.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2022/02/Woman-Brew-System-with-Print-Front-e1748266413855.png'
      ],
    },
    {
      id: 58,
      name: 'Point Of Sale Table 2',
      description: 'Point Of Sale Table 2 system top is oval 300mm x 400mm and an overall height of 940mm, light weight and compact including carry bag. The system is easy to assemble and disassemble in minutes. Printed areas include the oval top and wrap around panel which is digitally printed in full color with protective lamination.',
      // price: 'From R89',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2023/05/POS2-System-Print-Side-by-Side-I-e1645090541816.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2022/02/POS2-Render-System-Only-e1748266789198.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2022/02/POS2-Render-System-with-Print-e1748266861632.png'
      ],
    },
    {
      id: 59,
      name: 'Point Of Sale Table 3',
      description: 'Point Of Sale Table 3 system top is a kidney shape 580mm x 1090mm and an overall height of 782mm, light weight and compact including carry bag. The system is easy to assemble and disassemble in minutes. Printed areas include wrap around print panel which is digitally printed in full color.',
      // price: 'From R89',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2024/02/POST-3-View-2-I-e1709040630329.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2024/02/POST-3-View-1-1-e1748267291265.jpg'
      ],
    },
    {
      id: 60,
      name: 'Point Of Sale Table 4',
      description: 'Point Of Sale Table 4 system top is a rectangular shape 410mm x 880mm and an overall height of 782mm, light weight and compact including carry bag. The system is easy to assemble and disassemble in minutes. Printed areas include wrap around print panel which is digitally printed in full color.',
      // price: 'From R89',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2024/02/POST-4-View-2-I-e1709041552371.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2024/02/DSCN4659-1-e1748267514319.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2024/02/POST-4-View-1-1-e1748267755478.jpg'
      ],
    },
    {
      id: 61,
      name: 'Point Of Sale Table 5',
      description: 'Point Of Sale Table 5 system is 1010mm wide x 335mm deep x 1047mm high and comprise of an aluminium round tubing construction, soft carry bag, with full color prints – fully collapsible and compact. Printed areas include wrap around print panel which is digitally printed in full color.',
      // price: 'From R89',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2024/02/Fabric-Table-Wrap-Front-Back-View-I-e1709041691790.jpg',
        'https://www.idealdisplays.co.za/wp-content/uploads/2024/02/Fabric-Wrap-Table-Front-View-1-e1748267990863.png'
      ],
    },
    {
      id: 62,
      name: 'Point Of Sale Table 6',
      description: 'Point Of Sale Table 6 system is a rectangular shape with counter 880mm wide x 410mm deep x 880mm high and an overall height of 2050mm with 350mm x 850mm header. The system is light weight and compact including carry bag. The system is easy to assemble and disassemble in minutes. Printed areas include wrap around print panel and header board which is digitally printed in full color..',
      // price: 'From R89',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2024/12/POST-6-2-I-e1733728102335.png'
      ],
    },
  ],
  'Light Boxes & Illuminated Displays': [
    {
      id: 63,
      name: 'Fabric Stretch Light Box',
      description: 'Fabric Stretch Light Box 45mm profile is a make to order aluminium frame intended for wall mounting to accommodate a dye sublimation cloth print to create a frameless appearance. The system includes LED edge lighting and power supply. Fabric Stretch Light Box',
      // price: 'From R299',
      image: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2015/03/Fabric-Stretch-Frame-Light-Box.png'
      ],
    },
    {
      id: 64,
      name: 'Light Box 2 Indoor A1 Portrait',
      description: 'Light Box 2 Indoor A1 Portrait as a standard system includes is a LED light box with curved face for indoor application, light weight construction from steel and aluminium, clip frame to install or remove print face – with or without full colour print. Custom sizes are available with or without full colour print.',
      // price: 'From R399',
      image: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2024/12/A1-Portrait-Light-Box-Render-2-I-e1733475283690.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2024/12/A1-Portrait-Light-Box-Render-3-1-e1748255153604.png'
      ],
      sizes: [
        'A0 - 1189mm x 841mm',
        'A1 - 841mm x 594mm',
        'A2 - 594mm x 420mm',
        'A3 - 420mm x 297mm',
        'A4 - 297mm x 210mm'
      ],
    },
    {
      id: 65,
      name: 'Light Box 2 Indoor A2 Landscape',
      description: 'Light Box 2 Indoor A2 Landscape as a standard system includes is a LED light box with curved face for indoor application, light weight construction from steel and aluminium, clip frame to install or remove print face – with or without full colour print. Custom sizes are available with or without full colour print.',
      // price: 'From R399',
      image: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2024/12/A2-Landscape-Light-Box-Render-3-I-e1733477575217.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2024/12/A2-Landscape-Light-Box-Render-2-1-e1748258631891.png'
      ],
      sizes: [
        'A0 - 1189mm x 841mm',
        'A1 - 841mm x 594mm',
        'A2 - 594mm x 420mm',
        'A3 - 420mm x 297mm',
        'A4 - 297mm x 210mm'
      ],
    },
  ],
  'Wall & Hanging Displays': [
  {
    id: 15,
    name: 'Econo Wall Banner 5 panel',
    description: 'Econo Wall Banner 5 Panel includes five Econo Rola banners which comprise a sturdy aluminium base, pole and top extrusion to hold a PVC banner print, all interconnected to form a single wall that can be manipulated to required shape or form. Econo Wall Banner custom sizes are available on request.',
    // price: 'From R199',
    images: [
      'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/Econo-Wall-Banner.png',
      'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/PSD-Mockup-Econo-Wall-Banner-1-e1748430904923.png',
    ],
    sizes: ['850mm x 2000mm'],
  },
  {
    id: 16,
    name: 'Wall Banner Cloth Straight',
    description: 'Cloth Banner Wall Straight comprise of an aluminium round tubing construction, soft carry case, with or without full color prints – fully collapsible and compact. This system as a standard is available in straight configuration although a curved and non-standard alternatives are available on request. Cloth Banner Wall Straight',
    // price: 'From R199',
    images: [
      'https://www.idealdisplays.co.za/wp-content/uploads/2023/05/WBC-3x4-Straight-Perspective-e1636641659933.png',
      'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/WBC-3x5-Straight-Perspective-e1748431127390.png',
    ],
    sizes: [
      'WC36: 3 cubes high x 6 cubes wide = 2220mm high x 4320mm wide',
      'WC35: 3 cubes high x 5 cubes wide = 2220mm high x 3700mm wide',
      'WC34: 3 cubes high x 4 cubes wide = 2220mm high x 2920mm wide',
      'WC33: 3 cubes high x 3 cubes wide = 2220mm high x 2220mm wide',
      'WC32: 3 cubes high x 2 cubes wide = 2220mm high x 1490mm wide',
      'WC31: 3 cubes high x 1 cube wide = 2220mm high x 770mm wide'
    ],
  },
  {
    id: 17,
    name: 'Wall Banner Cloth Straight with closed sides',
    description: 'Cloth Banner Wall Straight with closed sides comprise of an aluminium round tubing construction, soft carry case, with or without full color print that wraps the sides of the system – fully collapsible and compact. This system as a standard is available in straight configuration although a curved and non-standard alternatives are available on request. Cloth Banner Wall Straight with closed sides',
    // price: 'From R199',
    images: [
      'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/Cloth-Banner-Wall-Straight-with-closed-sides.png',
      'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/WBC-3x1-Straight-with-Closed-Sides-Perspective-e1748431374193.png',
    ],
    sizes: [
      'WC36S: 3 cubes high x 6 cubes wide = 2220mm high x 4320mm system & 5030mm print',
      'WC35S: 3 cubes high x 5 cubes wide = 2220mm high x 3700mm system & 4410mm print',
      'WC34S: 3 cubes high x 4 cubes wide = 2220mm high x 2920mm system & 3630mm print',
      'WC33S: 3 cubes high x 3 cubes wide = 2220mm high x 2220mm system & 2930mm print',
      'WC32S: 3 cubes high x 2 cubes wide = 2220mm high x 1490mm system & 2200mm print',
      'WC31S: 3 cubes high x 1 cube wide = 2220mm high x 770mm system & 1480mm print'
    ],
  },
  {
    id: 18,
    name: 'Wall Banner Cloth Straight with end caps',
    description: 'Cloth Banner Wall Straight with end caps comprise of an aluminium round tubing construction, soft carry case, firm end panels with or without full color prints – fully collapsible and compact. Cloth Banner Wall Straight with end caps',
    // price: 'From R199',
    images: [
      'https://www.idealdisplays.co.za/wp-content/uploads/2016/10/Cloth-Banner-Wall-Straight-with-end-caps.png',
      'https://www.idealdisplays.co.za/wp-content/uploads/2016/10/Wall-Cloth-5-1-e1748432682785.png',
    ],
    sizes: [
      'WC36E: 3 cubes high x 6 cubes wide = 2220mm high x 5760mm wide',
      'WC35E: 3 cubes high x 5 cubes wide = 2220mm high x 5140mm wide',
      'WC34E: 3 cubes high x 4 cubes wide = 2220mm high x 4360mm wide',
      'WC33E: 3 cubes high x 3 cubes wide = 2220mm high x 3660mm wide',
      'WC32E: 3 cubes high x 2 cubes wide = 2220mm high x 2930mm wide',
      'WC31E: 3 cubes high x 1 cube wide = 2220mm high x 2210mm wide'
    ],
  },
  {
    id: 19,
    name: 'Wall Banner Cloth Curve',
    description: 'Cloth Banner Wall Curve comprise of an aluminium round tubing construction, soft carry case, with or without full colour prints – fully collapsible and compact. Cloth Banner Wall Curve',
    // price: 'From R199',
    images: [
      'https://www.idealdisplays.co.za/wp-content/uploads/2016/10/Cloth-Banner-Wall-Curve.png',
      'https://www.idealdisplays.co.za/wp-content/uploads/2016/10/Wall-Cloth-5-1-e1748432682785.png',
    ],
    sizes: [
      'WC36C: 3 cubes high x 6 cubes wide = 2220mm high x 3980mm wide',
      'WC35C: 3 cubes high x 5 cubes wide = 2220mm high x 3340mm wide',
      'WC34C: 3 cubes high x 4 cubes wide = 2220mm high x 2670mm wide',
      'WC33C: 3 cubes high x 3 cubes wide = 2220mm high x 1970mm wide',
      'WC32C: 3 cubes high x 2 cubes wide = 2220mm high x 1335mm wide'
    ],
  },
  {
    id: 20,
    name: 'Wall Banner Cloth Curve with closed sides',
    description: 'Cloth Banner Wall Curve with closed sides comprise of an aluminium round tubing construction. Also, with soft carry case. Most noteworthy, with or without full color print. The print wraps the sides of the system. Above all, the unit is fully collapsible and compact. Cloth Banner Wall Curve with closed sides',
    // price: 'From R199',
    images: [
      'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/Cloth-Banner-Wall-Curve-with-closed-sides.png',
      'https://www.idealdisplays.co.za/wp-content/uploads/2016/10/Wall-Cloth-5-1-e1748432682785.png',
    ],
    sizes: [
      'WC36CS: 3 cubes high x 6 cubes wide = 2220mm high x 3980mm system & 4610mm print.',
      'WC35CS: 3 cubes high x 5 cubes wide = 2220mm high x 3340mm system & 3970mm print.',
      'WC34CS: 3 cubes high x 4 cubes wide = 2220mm high x 2670mm system & 3300mm print.',
      'WC33CS: 3 cubes high x 3 cubes wide = 2220mm high x 1970mm system & 2600mm print.',
      'WC32CS: 3 cubes high x 2 cubes wide = 2220mm high x 1335mm system & 1965mm print.'
    ],
  },
  {
    id: 21,
    name: 'Wall Banner Cloth Curve with end caps',
    description: 'Cloth Banner Wall Curve with end caps comprise of an aluminium round tubing construction, soft carry case, firm end cap panels with or without full color prints – fully collapsible and compact. Also, non standard alternatives are available. Cloth Banner Wall Curve with end caps',
    // price: 'From R199',
    images: [
      'https://www.idealdisplays.co.za/wp-content/uploads/2016/10/Cloth-Banner-Wall-Curve-with-end-caps.png',
      'https://www.idealdisplays.co.za/wp-content/uploads/2016/10/Wall-Cloth-5-1-e1748432682785.png',
    ],
    sizes: [
      'WC36CE: 3 cubes high x 6 cubes wide = 2220mm high x 5420mm wide',
      'WC35CE: 3 cubes high x 5 cubes wide = 2220mm high x 4780mm wide',
      'WC34CE: 3 cubes high x 4 cubes wide = 2220mm high x 4030mm wide',
      'WC33CE: 3 cubes high x 3 cubes wide = 2220mm high x 3410mm wide',
      'WC32CE: 3 cubes high x 2 cubes wide = 2220mm high x 2775mm wide'
    ],
  },
  {
    id: 22,
    name: 'Wall Banner Cloth 2200 x 2800',
    description: 'Wall Banner Cloth 2200 x 2800 comprise of a steel and aluminium construction, fully collapsible and compact, trolley carry bag, with or without full color double sided stretch print. Wall Banner Cloth 2200 x 2800 custom sizes are available on request although dependent on quantity.',
    // price: 'From R199',
    images: [
      'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/WBC-2822-Top-Perspective-e1646056967851.png',
      'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/WBC-2822-Front-1-e1748434332986.png',
      'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/WBC-2822-Side-1-e1748434385234.png'
    ],
    sizes: ['2200mm x 2800mm'],
  },
  {
    id: 23,
    name: 'Wall Banner Cloth 25 - 900 x 2100',
    description: 'Wall Banner Cloth 25 – 900 x 2100 comprise of a steel and aluminium construction, fully collapsible and compact, carry bag, with or without full color double sided stretch print. Wall Banner Cloth 25 – 900 x 2100 custom sizes are available on request although.',
    // price: 'From R199',
    images: [
      'https://www.idealdisplays.co.za/wp-content/uploads/2021/06/8-WBC25-900x2100-I-e1628834716584.png',
      'https://www.idealdisplays.co.za/wp-content/uploads/2021/06/System-with-Print-Front-1-e1748434691257.png',
      'https://www.idealdisplays.co.za/wp-content/uploads/2021/06/System-with-Print-Perspective-1-e1748434790242.png'
    ],
    sizes: ['900mm x 2100mm'],
  },
  {
    id: 189,
    name: 'Tube Graphic Wall',
    description: 'Tube Graphic Wall comprise of an aluminium round tubing construction which forms a 650mm diameter, magnetic interlocking bars, headers and kickers for print hooking and stability, soft carry case, with or without three (679mm x 2180mm) full color prints – fully collapsible and compact. Wall Accessories are available, see Wall Accessories. Tube Graphic Wall',
    // price: 'From R199',
    images: [
      'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Tube-Graphic-Wall.png',
      'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Walls-Tube-Graphic-Wall-1-e1748435264802.png'
    ],
    sizes: ['900mm x 2100mm'],
  },
],
  'Accessories & Equipment': [
    {
      id: 66,
      name: 'Bags',
      description: 'Bags for Rola’s are constructed from durable fabric material, we offer all standard Rola base bags as an additional accessory. Customs bags are available on request. Universal bag suitable for Single an Executive Rola bases. Bags standard sizes available include:',
      // price: 'From R89',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Bags.png'
      ],
      sizes: 'universal_Bag' [
        '850mm',
        '1000mm',
        '1200mm',
        '1500mm'
      ],
      sizes: 'econo_Bag' [
        '850mm',
        '1000mm'
      ],
    },
    {
      id: 67,
      name: 'Chrome Rola',
      description: 'Chrome Rola systems include a sturdy aluminium base, pole, top extrusion, carry bag, with or without full color print – fully collapsible and compact. Custom sizes are available on request. Chrome Rola standard sizes available include: (W x H):',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Chrome-Rola.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Chrome-Rola-2-I-e1748268209676.jpg'
      ],
      sizes: [
        '850mm x 2000mm or 2150mm',
        '1000mm x 2000mm or 2150mm'
      ]
    },
    {
      id: 68,
      name: 'Double Ideal Rola',
      description: 'Double Ideal Rola systems include a sturdy aluminium base, pole, top extrusions, carry bag, with or without two full color prints – fully collapsible and compact. Bases are available in black or silver finish. Custom sizes are available on request. Double Ideal Rola standard sizes available include: (W x H):',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Double-Rola.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Double-Rola-2-I-e1748268453685.jpg'
      ],
      sizes: [
        '850mm x 2000mm or 2150mm – Black or Silver',
        '1000mm x 2000mm or 2150mm – Black or Silver'
      ]
    },
    {
      id: 69,
      name: 'Econo RolaEcono Rola',
      description: 'Econo Rola systems include a sturdy aluminium base, pole, top extrusion, carry bag, with or without full color print – fully collapsible and compact. Econo Rola custom sizes are available on request. Standard sizes available include: (W x H):',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Econo-Rola.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Econo-Rola-2-I-e1748268574101.jpg'
      ],
      sizes: [
        '850mm x 2000mm or 2150mm',
        '1000mm x 2000mm or 2150mm'
      ]
    },
    {
      id: 70,
      name: 'Executive Rola',
      description: 'Executive Rola systems include a sturdy aluminium base, pole, top extrusion, carry bag, with or without full color print – fully collapsible and compact. Executive Rola custom sizes are available on request. Standard sizes available include: (W x H):',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Executive-Rola.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Exeucitve-Rola-PDF-Mockup-1-e1748268892587.png'
      ],
      sizes: [
        '850mm x 2000mm or 2150mm',
        '1000mm x 2000mm or 2150mm',
        '1200mm x 2000mm or 2150mm',
        '1500mm x 2000mm or 2150mm'
      ]
    },
    {
      id: 71,
      name: 'Poles',
      description: 'Poles for Rola’s are constructed from aluminium round tubing, swaged for interlocking one to another, and connected with elastic joiners for easy erecting and collapsing. Poles standard sizes available include:',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Poles.png'
      ],
      sizes: [
        '2000mm',
        '2150mm'
      ]
    },
    {
      id: 72,
      name: 'Rola Wrap',
      description: 'Rola Wrap is an additional option offered to brand a Single Rola or Double Rola base with full color printed vinyl. Rola Wrap',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Rola-Wrap.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Single-Rola-Wrap-2-I-e1748269637816.jpg'
      ],
    },
    {
      id: 73,
      name: 'Scroll Rola',
      description: 'Scroll Rola (850mm x 2000mm) includes a sturdy aluminium base encompassing an electric motor for continuous print rotation, poles, and top return roller body, carry bag, with or without print – fully collapsible and compact. Scroll Rola custom sizes are available on request although dependent on quantity. Note, this product is intended for promotional purposes and not for continuous use.',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Scroll-Rola.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Scroll-Rola-2-I-e1748269002653.jpg'
      ], 
    },
    {
      id: 74,
      name: 'Single Ideal Rola',
      description: 'Single Ideal Rola systems include a sturdy aluminium base, pole, top extrusion, carry bag, with or without full color print – fully collapsible and compact. Bases are available in black or silver finish. Single Ideal Rola custom sizes are available on request. Standard sizes available include: (W x H):',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Single-Rola-Side-Front-Current-View-e1646057200355.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Single-Rola-Base-with-Print-Side-1-e1748269303253.png'
      ], 
      sizes: [
        '850mm x 2000mm or 2150mm',
        '1000mm x 2000mm or 2150mm',
        '1200mm x 2000mm or 2150mm',
        '1500mm x 2000mm or 2150mm'
      ],
    },
    {
      id: 75,
      name: 'Slim Rola',
      description: 'Slim Rola systems include a sturdy aluminium base, pole, top extrusion, carry bag, with or without full color print – fully collapsible and compact. Slim Rola custom sizes are available on request. Standard sizes available include: (W x H):',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Slim-Rola.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Slim-Rola-2-I-e1748269114792.jpg'
      ], 
      sizes: [
        '850mm x 2000mm or 2150mm',
        '1000mm x 2000mm or 2150mm'
      ],
    },
    {
      id: 76,
      name: 'Slim Rola A Frame',
      description: 'Slim Rola A Frame is a make to order and comprise of two sturdy Slim Rola bases fixed apart by spacers, pole, top extrusions, carry bag, with or without full color print – fully collapsible and compact. Slim Rola A Frame options available from 750mm wide up to 3000mm high.',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/07/Slim-Rola-A-Frame.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/07/Slim-Rola-A-Frame-3-I-e1748269507342.jpg'
      ], 
    },
    {
      id: 77,
      name: 'Top Extrusion',
      description: 'Top Extrusion for Rola’s are offered for all standard Rola’s. Customs sizes are available on request. Top Extrusion standard sizes available include:',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Top-extrusion.png'
      ],
      sizes: [
        '850mm',
        '1000mm',
        '1200mm',
        '1500mm'
      ]
    },
  ],
  'Gazebos': [
    {
      id: 78,
      name: 'Gazebo 2856',
      description: 'Gazebo 2856 system include a sturdy aluminium tubular frame, carry bag, with or without full color cloth roof and overlay, short and long side panel/s print – fully collapsible and compact. Gazebo 2856 Standard available size include: 2800mm x 5600mm',
      // price: 'From R299',
      images: [

        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Gazebo-2856.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Gazebo-2856-1-e1747903888225.jpg',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/shutterstock_1048377925-1-e1747904074133.png'
      ],
      sizes: [
        '2800mm x 5600mm'
      ],
    },
    {
      id: 79,
      name: 'Gazebo Side Panels',
      description: 'Gazebo Side Panels comprise of a full color cloth print to fit all standard gazebo options. Gazebo Side Panels custom sizes available on request.',
      // price: 'From R399',
      images:[
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Gazebo-Side-Panels.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Gazebo-4-with-Side-Walls-Zip-Perspective-High-e1747913902818.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Gazebo-4-with-Side-Walls-Perspective-High-e1747913870189.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Gazebo-1500-with-Sides-Perspective-e1747913959966.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/shutterstock_1048377925-1-1-e1747914020891.png'
      ],
    },
    {
      id: 80,
      name: 'Gazebo 2',
      description: 'Gazebo 2 Premium system include a sturdy aluminium tubular frame, carry bag, with or without full color cloth roof and overlay, side panel/s print – fully collapsible and compact. Gazebo 2 Standard available size include: 3000mm x 3000mm',
      // price: 'From R399',
      images:[
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Gazebo-2-Roof-Perspective-e1646059378440.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Gazebo-2-Roof-Top-Perspective-1-e1747902369192.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Gazebo-2-Roof-Top-1-e1747902434773.png'
      ],
      size: '3000mm x 3000mm',
    },
    {
      id: 81,
      name: 'Gazebo 3',
      description: 'Gazebo 3 system include a sturdy aluminium tubular frame, carry bag, with or without full color cloth roof and overlay, side panel/s print – fully collapsible and compact. Gazebo 3 Standard available size include: 2800mm x 2800mm',
      // price: 'From R399',
      images:[
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Gazebo-3-Roof-Perspective-e1646059774814.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Gazebo-3-Roof-Front-1-e1747902748352.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Gazebo-3-Roof-Top-Perspective-1-e1747902812762.png'
      ],
      size: '2800mm x 2800mm',
    },
    {
      id: 82,
      name: 'Gazebo 4',
      description: 'Gazebo 4 system include a sturdy aluminium tubular frame, carry bag, with or without full color cloth roof and overlay, side panel/s print – fully collapsible and compact. Gazebo 4 Standard available size include: 3000mm x 3000mm',
      // price: 'From R399',
      images:[
        'https://www.idealdisplays.co.za/wp-content/uploads/2021/11/Gazebo-4-Steel-Mockup_O-Neils-Perspective-Low-e1636963482389.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Gazebo-4-Steel-Mockup_O-Neils-Perspective-High-1-e1747903329294.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Gazebo-4-Steel-Mockup_O-Neils-Front-1-e1747903389704.png'
      ],
      size: '3000mm x 3000mm',
    },
    {
      id: 83,
      name: 'Gazebo 5',
      description: 'Gazebo 5 system include a sturdy steel tubular frame, carry bag, with or without full color cloth roof and overlay, side panel/s print – fully collapsible and compact. Gazebo 5 Standard available size include: 3000mm x 3000mm',
      // price: 'From R399',
      images:[
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Gazebo-4-Steel-Mockup_O-Neils-Perspective-High-e1645701087322.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Gazebo-4-Steel-Mockup_O-Neils-Front-1-e1747903389704.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2021/11/Gazebo-4-Steel-Mockup_O-Neils-Perspective-Low-e1636963482389.png'
      ],
      size: '3000mm x 3000mm',
    },
    {
      id: 84,
      name: 'Gazebo 32',
      description: 'Gazebo 32 system include a sturdy aluminium tubular frame, carry bag, with or without full color cloth roof and overlay, side panel/s print – fully collapsible and compact. Gazebo 32 Standard available size include: 2000mm x 2000mm',
      // price: 'From R399',
      images:[
        'https://www.idealdisplays.co.za/wp-content/uploads/2021/11/Gazebo-32-Perspective-Low-e1636963305304.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/Gazebo-32-Front-1-e1747902965113.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/Gazebo-32-Perspective-High-1-e1747903027148.png'
      ],
      size: '2000mm x 2000mm',
    },
    {
      id: 85,
      name: 'Gazebo 315',
      description: 'Gazebo 315 system include a sturdy aluminium tubular frame, carry bag, with or without full color cloth roof and overlay, side panel/s print – fully collapsible and compact. Gazebo 315 Standard available size include: 1500mm x 1500mm',
      // price: 'From R399',
      images:[
        'https://www.idealdisplays.co.za/wp-content/uploads/2021/11/Gazebo-315-Perspective-Low-e1636963391347.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/Gazebo-315-Perspective-High-1-e1747903149569.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/Gazebo-315-Front-1-e1747903202660.png'
      ],
      size: '1500mm x 1500mm',
    },
    {
      id: 86,
      name: 'Gazebo Flag Mount Bracket',
      description: 'Gazebo Flag Mount Bracket is steel constructed and epoxy coated in silver color. The system enables Extreme Flags, Banner Flags and Telescopic Flags to be raised above gazebo roof line ensuring maximum visibility. The bracket is easily attached / removed from gazebo structure. Gazebo Flag Mount Bracket custom units available on request although dependent on quantity. Standard available sizes fit Gazebo 3, 2856, 4 and 5.',
      // price: 'From R399',
      images:[
        'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/Gazebo-Flag-Mount-Bracket.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/Gazebo-Flag-Mount-B-1-e1747909090367.png'
      ],
    },
  ],
  'Flags & Flying Banners': [
    {
      id: 87,
      name: 'Banner Flag',
      description: 'Banner Flag systems include an aluminium tubular pole, ground spike, carry bag, with or without full color cloth print – fully collapsible and compact. Single or Double Sided print options are available. Banner Flag accessories are available for indoor application, see Flag Accessories. Standard available sizes include: 3000mm x 650mm and 4000mm x 650mm',
      // price: 'From R89',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Banner-Flag-34m-I-e1628669078490.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Banner-Flag-I-e1747830568284.jpg'
      ],
      sizes: [
        '3000mm x 650mm',
        '4000mm x 650mm'
      ],
    },
    {
      id: 88,
      name: 'Cluster Flag Base',
      description: 'Cluster Flag Base is steel constructed and epoxy coated in silver color, intended for outdoor as well as indoor use to accommodate four flags. Cluster Flag Base custom sizes are available on request although dependent on quantity.',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Cluster-Flag-Base.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Cluster-Flag-Base-2-I-e1747836596363.jpg'
      ],
    },
    {
      id: 89,
      name: 'Cluster Flag Base 1500',
      description: 'Cluster Flag Base 1500 is steel constructed and epoxy coated in black color, intended for outdoor as well as indoor use to accommodate four 6000 x 650 flags. Cluster Flag Base 1500 custom sizes are available on request although dependent on quantity.',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/Cluster-Flag-Base-1500.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/Cluster-Flag-Base-1500-I-e1747836804757.jpg'
      ],
    },
    {
      id: 90,
      name: 'Cluster Flag Base 5 Pole',
      description: 'Cluster Flag Base 5 Pole is steel constructed and epoxy coated in silver color, intended for outdoor as well as indoor use to accommodate five flags. Cluster Flag Base 5 Pole custom sizes are available on request although dependent on quantity.',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/Cluster-Flag-Base-5-Pole.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/Cluster-Flag-Base-5-Pole-I-e1747836707785.jpg'
      ],
    },
    {
      id: 91,
      name: 'Collapsible Cluster Flag Base',
      description: 'Collapsible Cluster Flag Base is steel constructed and epoxy coated in silver color, intended for outdoor as well as indoor use to accommodate four flags – collapsible and compact. Collapsible Cluster Flag Base custom sizes are available on request although dependent on quantity.Collapsible Cluster Flag Base is steel constructed and epoxy coated in silver color, intended for outdoor as well as indoor use to accommodate four flags – collapsible and compact. Collapsible Cluster Flag Base custom sizes are available on request although dependent on quantity.',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Collapsible-Cluster-Flag-Base.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Collapsible-Cluster-Flag-Base-6-I-e1747836915303.jpg'
      ],
    },
    {
      id: 92,
      name: 'Cross Indoor Base',
      description: 'Cross Indoor Base is steel constructed and electro-plated, intended for indoor as well as outdoor use to accommodate one flag – collapsible and compact. Cross Indoor Base',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Cross-Indoor-Base.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Cross-Indoor-Base-3-I-e1747837041743.jpg'
      ],
    },
    {
      id: 93,
      name: 'Extreme 1 Flag',
      description: 'Extreme 1 Flag (3500mm x 1000mm) as a standard system includes a full color cloth print, aluminium tubular pole, ground spike, and carry bag – fully collapsible and compact. Extreme 1 Flag Single or Double sided print options available. Flag accessories are available for indoor application, see Flag Accessories.',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Extreme-1-Flag-System-with-Skin-I-e1627991540105.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Extreme-1-Flag.png'
      ],
    },
    {
      id: 94,
      name: 'Extreme 2 Flag',
      description: 'Extreme 2 Flag (3500mm x 1160mm) as a standard system includes a full color cloth print, aluminium tubular pole, ground spike, and carry bag – fully collapsible and compact. Extreme 2 Flag Single or Double sided print options available. Flag accessories are available for indoor application, see Flag Accessories.',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/Extreme-2-Flag-System-with-Skin-I-e1627992999362.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/Extreme-2-Flag-242x242.png'
      ],
    },
    {
      id: 95,
      name: 'Extreme 3 Flag',
      description: 'Extreme 3 Flag (3500mm x 1000mm) as a standard system includes a full color cloth print, aluminium tubular pole, ground spike, and carry bag – fully collapsible and compact. Extreme 3 Flag Single or Double sided print options available. Flag accessories are available for indoor application, see Flag Accessories.',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Extreme-3-3m-Flag-System-with-Skin-I-e1627993089838.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Extreme-3-Flag-242x242.png'
      ],
    },
    {
      id: 96,
      name: 'Extreme 4 Flag',
      description: 'Extreme 4 Flag (3500mm x 800mm) as a standard system includes a full color cloth print, aluminium tubular pole, ground spike, and carry bag – fully collapsible and compact. Extreme 4 Flag Single or Double sided print options available. Flag accessories are available for indoor application, see Flag Accessories.',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/Extreme-4-Flag-System-with-Skin-I-e1627993222285.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/Extreme-4-Flag-242x242.png'
      ],
    },
    {
      id: 97,
      name: 'Extreme 5 Flag',
      description: 'Extreme 5 Flag (3500mm x 1000mm) as a standard system includes a full color cloth print, aluminium tubular pole, ground spike, and carry bag – fully collapsible and compact. Extreme 5 Flag Single or Double sided print options available. Flag accessories are available for indoor application, see Flag Accessories.',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Extreme-5-Flag-System-with-Skin-I-e1627993295188.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Extreme-5-Flag-242x242.png'
      ],
    },
    {
      id: 98,
      name: 'Extreme 6 Single Sided',
      description: 'Extreme 6 Single Sided (2000mm x 850mm) as a standard system includes a full color cloth print, pole, stabilizing base, ground pegs and carry bag – fully collapsible and compact. Extreme 6 Single Sided',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Extreme-6-Single-Sided.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Extreme-6-SS-Back-i-242x242.jpg'
      ],
    },{
      id: 99,
      name: 'Extreme 6 Double Sided',
      description: 'Extreme 6 Double Sided (2000mm x 850mm) as a standard system includes two full color cloth prints, ground pegs and carry bag – fully collapsible and compact. Extreme 6 Double Sided',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Extreme-6-Double-Sided.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Extreme-6-DS-Popup-Top-Perspective-242x242.png'
      ],
    },
    {
      id: 100,
      name: 'Extreme 7 Single Sided',
      description: 'Extreme 7 Single Sided (990mm x 1500mm) as a standard system includes a full color cloth print, pole, stabilizing base, ground pegs and carry bag – fully collapsible and compact. Extreme 7 Single Sided',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Extreme-7-Single-Sided.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Extreme-7-2-I-e1747834019207.jpg'
      ],
    },
    {
      id: 101,
      name: 'Extreme 7 Double Sided',
      description: 'Extreme 7 Double Sided (990mm x 1500mm) as a standard system includes two full color cloth prints, ground pegs and carry bag – fully collapsible and compact. Extreme 7 Double Sided',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Extreme-7-Double-Sided.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Extreme-7-DS-I-e1747834154221.jpg'
      ],
    },
    {
      id: 102,
      name: 'Extreme 8 Flag',
      description: 'Extreme 8 Flag (3500mm x 1000mm) as a standard system includes a full color cloth print, aluminium tubular pole, ground spike, and carry bag – fully collapsible and compact. Extreme 8 Flag Single or Double sided print options available. Flag accessories are available for indoor application, see Flag Accessories.',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Extreme-8-Flag-System-with-Skin-I-e1627993357544.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Extreme-8-Flag.png'
      ],
    },
    {
      id: 103,
      name: 'Extreme 9 Flag',
      description: 'Extreme 9 Flag (3500mm x 1000mm) as a standard system includes a full color cloth print, aluminium tubular pole, ground spike, and carry bag – fully collapsible and compact. Single or Double sided print options available. Flag accessories are available for indoor application, see Flag Accessories. Extreme 9 Flag',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Extreme-9-Flag-System-with-Skin-I-e1627995684455.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Extreme-9-Flag.png'
      ],
    },
    {
      id: 104,
      name: 'Extreme 10 Flag',
      description: 'Extreme 10 Flag (3500mm x 300mm) as a standard system includes a full color cloth print, aluminium tubular pole, ground spike, and carry bag – fully collapsible and compact. Extreme 10 Flag Single or Double sided print options available. Flag accessories are available for indoor application, see Flag Accessories.',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Extreme-10-Flag-System-with-Skin-I-e1627995247100.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Extreme-10-Flag.png'
      ],
    },
    {
      id: 105,
      name: 'Extreme 11 Flag',
      description: 'Extreme 11 Flag (3500mm x 1215mm) as a standard system includes a full color cloth print, aluminium tubular pole, ground spike, and carry bag – fully collapsible and compact. Extreme 11 Flag Single or Double sided print options available. Flag accessories are available for indoor and outdoor application, see Flag Accessories.',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/08/Extreme-11-Flag-System-with-Skin-I-e1627995342355.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/08/Extreme-11-Flag.png'
      ],
    },
    {
      id: 106,
      name: 'Extreme 12 Flag',
      description: 'Extreme 12 Flag (3500mm x 1000mm) as a standard system includes a full color cloth print, aluminium tubular pole, ground spike, and carry bag – fully collapsible and compact. Extreme 12 Flag Single or Double sided print options available. Flag accessories are available for indoor and outdoor application, see Flag Accessories.',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/08/Extreme-12-Flag-System-with-Skin-I-e1627995415521.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/08/Extreme-12-Flag.png'
      ],
    },
    {
      id: 107,
      name: 'Extreme 122 Flag',
      description: 'Extreme 122 Flag – 2000mm Flag (2200mm x 1000mm) as a standard system includes a full color cloth print, aluminium tubular pole, ground spike, and carry bag – fully collapsible and compact. Extreme 122 Flag Single or Double sided print options available. Flag accessories are available for indoor and outdoor application, see Flag Accessories.',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/08/Extreme-12-2m-Mockup-I-e1627995472210.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/08/Extreme-122-Flag.png'
      ],
    },
    {
      id: 108,
      name: 'Extreme 132 Flag',
      description: 'Extreme 132 Flag (2000mm x 1040mm) as a standard system includes a full color cloth print, aluminium tubular and fiberglass pole, ground spike, and carry bag – fully collapsible and compact. Extreme 132 Flag Single or Double sided print options available. Flag accessories are available for indoor application, see Flag Accessories.',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2015/08/Extreme-13-2m-Flag-I-e1628669193152.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2015/08/Extreme-132-Flag.png'
      ],
    },
    {
      id: 109,
      name: 'Extreme 133 Flag',
      description: 'Extreme 133 Flag (3000mm x 1470mm) as a standard system includes a full color cloth print, aluminium tubular and fiberglass pole, ground spike, and carry bag – fully collapsible and compact. Extreme 133 Flag Single or Double sided print options available. Flag accessories are available for indoor application, see Flag Accessories.',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2015/08/Extreme-13-3m-Flag-I-e1628669266739.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2015/08/Extreme-133-Flag.png'
      ],
    },
    {
      id: 110,
      name: 'Extreme 134 Flag',
      description: 'Extreme 134 Flag (4000mm x 1555mm) as a standard system includes a full color cloth print, aluminium tubular and fiberglass pole, ground spike, and carry bag – fully collapsible and compact. Extreme 134 Flag Single or Double sided print options available. Flag accessories are available for indoor application, see Flag Accessories.',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2015/08/Extreme-13-4m-Flag-I-e1628669339582.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2015/08/Extreme-134-Flag-242x242.png'
      ],
    },
    {
      id: 111,
      name: 'Extreme 14 Flag',
      description: 'Extreme 14 Flag (2922mm x 1040mm) as a standard system includes a full color cloth print, aluminium tubular pole, ground spike, and carry bag – fully collapsible and compact. Extreme 14 Flag Single or Double sided print options available. Flag accessories are available for indoor application, see Flag Accessories.',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/Extreme-14-Flag-System-with-Skin-I-e1627995529260.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/Extreme-14-Flag.png'
      ],
    },
    {
      id: 112,
      name: 'Extreme 32 Flag',
      description: 'Extreme 32 Flag – 2000mm Flag (2000mm x 675mm) as a standard system includes a full color cloth print, aluminium tubular pole, ground spike, and carry bag – fully collapsible and compact. Extreme 32 Flag Single or Double sided print options available. Flag accessories are available for indoor application, see Flag Accessories.',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Extreme-3-2m-Flag-System-with-Skin-I-e1627993144657.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Extreme-32-Flag.png'
      ],
    },
    {
      id: 113,
      name: 'Extreme Spinner',
      description: 'Extreme Spinner is steel constructed and epoxy coated in black color, intended for outdoor as it is propelled by wind / air movement. Extreme Spinner system accommodates four flags.',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Extreme-Spinner.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Extreme-Flag-Spinner-Base-3-i-e1747837287230.jpg'
      ],
    },
    {
      id: 114,
      name: 'Flag Pole 6000mm',
      description: 'Flag Pole 6000mm is aluminium constructed in two parts to accommodate all flags with toggle and rope. Flag Pole 6000mm',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Flag-Pole-6000-I-e1645531808163.jpg',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Flag-Pole-6000-With-Toggle-Rope-Flag-White-e1747838393787.png'
      ],
    },
    {
      id: 115,
      name: 'Flag Spinner',
      description: 'Flag Spinner boast three variables including 2, 3 or 4 arm flag configurations as well as single or double sided cloth print panels for outdoor application. Flag Spinner systems accommodate the Extreme 3 flag which includes reinforced upright extremities. An optional solar panel including LED lighting may be added creating night-time emphasis on graphics and or product offering to maximize marketing strategy.',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2015/08/Flag-Spinner.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2015/08/Flag-Spinner-Base-2-Arm.jpg',
        'https://www.idealdisplays.co.za/wp-content/uploads/2015/08/Flag-Spinner-Base-3-Arm.jpg',
        'https://www.idealdisplays.co.za/wp-content/uploads/2015/08/Flag-Spinner-Base-4-Arm.jpg'
      ],
    },
    {
      id: 116,
      name: 'Flag Spinner Solar Lighting',
      description: 'Flag Spinner Solar Lighting boast three variables including 2, 3 or 4 arm flag configurations as well as single or double sided print panels for outdoor application. These systems accommodate the Extreme 3 flag which includes reinforced upright extremities. An optional solar panel including LED lighting may be added creating night-time emphasis on graphics and or product offering to maximize marketing strategy. Flag Spinner Solar Lighting',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2015/08/Flag-Spinner-Solar-Lighting-1.png'
      ],
    },
    {
      id: 117,
      name: 'Flags with toggle and rope',
      description: 'Flags with toggle and rope include standard country flags as well as custom sizes. Standard sizes include: 1200mm x 1800mm and 1200mm x 3000mm – Flags with toggle and rope',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2023/05/Flag-with-toggle-and-rope-1-I-e1628679747563.jpg',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Flag-Toggle-Rope-With-Ideal-6m-Pole-e1747838673403.png'
      ],
    },
    {
      id: 118,
      name: 'Flat Indoor Base',
      description: 'Flat Indoor Base is steel constructed and epoxy coated in silver color, intended for indoor use to accommodate one flag. Flat Indoor Base',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Flat-Indoor-Base.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Flat-Indoor-Base-3-i-e1747837161988.jpg'
      ],
    },
    {
      id: 119,
      name: 'Ground Spike',
      description: 'Ground Spike is steel constructed and electro-plated to suit all flags. See flag accessories – Ground Spike',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Ground-Spike.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Ground-Spike-i-e1747837455914.jpg'
      ],
    },
    {
      id: 120,
      name: 'Hand Held Flags',
      description: 'Hand Held Flags is make to order and supplied with full color cloth print and hand held stick, standard Hand Held Flags sizes include: 100mm x 150mm, 300mm x 400mm',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Hand-Held-Flag-1-I-1-e1747897457805.jpg',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Hand-Held-Flag-Checkered-e1747897542853.png'
      ],
    },
    {
      id: 121,
      name: 'Telescopic Flags',
      description: 'Telescopic Flags systems include an aluminium tubular pole, ground spike, carry bag, with or without full color cloth print – fully collapsible and compact. Telescopic Flags Single or Double Sided print options are available. Flag accessories are available for indoor application, see Flag Accessories. Standard available sizes include: 2000mm x 650mm and 3000mm x 650mm and 4000mm x 650mm and 5000mm x 650mm and 6000mm x 650mm',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Telescopic-SS-Flag-Full-Range-I-e1656487196990.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/System-With-Print-Branded-e1747836225460.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/System-With-Print-Branded-1-e1747836277737.png'
      ],
      sizes: [
        '2000mm x 650mm',
        '3000mm x 650mm',
        '4000mm x 650mm',
        '5000mm x 650mm',
        '6000mm x 650mm'
      ],
    },
    {
      id: 122,
      name: 'U Pop Up Banner',
      description: 'U Pop Up Banner as a standard system includes two full color cloth prints, ground pegs and carry bag – fully collapsible and compact. U Pop Up Banner',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/U-Pop-Up-Banner.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/U-Pop-Up-Banner-2-I-e1747836468887.jpg'
      ],
    },
    {
      id: 123,
      name: 'Wall Mount Bracket 45 Degree',
      description: 'Wall Mount Bracket 45 Degree is steel constructed and electro-plated to accommodate one flag at a 45 degree angle. Wall Mount Bracket 45 Degree',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Wall-Mount-Bracket-45-Degree.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Wall-Mount-Bracket-45-Degree-2-e1747837954332.jpg'
      ],
    },
  ],
  'Outdoor Banner Frames & Wall Systems': [
    {
      id: 124,
      name: 'Banner Hoist',
      description: 'Banner Hoist (Outdoor & Indoor) is ceiling or truss mounted that operates via remote control. Once installed, no rigging is required as the Banner Hoist lowers to load a display into position by means of a simple press of a button.',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Banner-Hoist.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Banner-Hoist-4-scaled-e1747823239102.jpg'
      ],
    },
    {
      id: 125,
      name: 'Banner Stand Outdoor',
      description: 'Banner Stand Outdoor is steel constructed to create a weighted base and epoxy coated in silver color, intended to accommodate one single print offering a double sided unit. Make to order ranging from 750mm wide and can be up to 3000mm high – collapsible and compact – with or without full color print – Banner Stand Outdoor.',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Banner-Stand-Outdoor-Combined-e1747823535317.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Banner-Stand-Outdoor.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Banner-Stand-Outdoor-Perspective-e1747823622806.png'
      ],
    },
    {
      id: 126,
      name: 'Banner Tension Mount',
      description: 'Banner Tension Mount is a spring loaded bracket that discharge wind pressure keeping banners in original condition. Banner Tension Mount eliminates bracket and possible light pole damage – collapsible and compact – with or without full color double sided print. Standard available sizes include: Small: up to 1.6sqm, Medium: up to 1.8sqm, Large: up to 2.15sqm, Extra Large: up to 2.8sqm',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Banner-Tension-Mount.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Banner-Tension-Mount-1-I-e1747824006516.jpg'
      ],
    },
    {
      id: 127,
      name: 'Banner Tension Mount 2',
      description: 'Banner Tension Mount 2 is a spring loaded bracket that discharge wind pressure keeping banners in original condition. Custom sizes are available on request although dependent on quantity. Fully collapsible and compact. An optional installation pole is available to raise and lower the banner without the need of hoisting equipment. Banner Tension Mount 2 standard available sizes include: 750mm wide x height required.Banner Tension Mount 2 is a spring loaded bracket that discharge wind pressure keeping banners in original condition. Custom sizes are available on request although dependent on quantity. Fully collapsible and compact. An optional installation pole is available to raise and lower the banner without the need of hoisting equipment. Banner Tension Mount 2 standard available sizes include: 750mm wide x height required.',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/Banner-Tension-Mount-2.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/Banner-Tension-Mount-2-I-e1747824214419.jpg'
      ],
    },
    {
      id: 128,
      name: 'Banner Tension Mount 2 Installation Pole',
      description: 'Banner Tension Mount 2 Installation Pole is an aluminium constructed adjustable telescopic pole to raise and lower a print panel without the need of hoisting equipment. Banner Tension Mount 2 Installation Pole optional to simplify banner installation on Banner Tension Mount 2 system.',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/Banner-Tension-Mount-2-Installation-Pole.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/Banner-Tension-Mount-2-Installation-Pole-I-e1747824346560.jpg'
      ],
    },
    {
      id: 129,
      name: 'Pole Banner MounPole Banner Moun',
      description: 'Pole Banner Mount is a spring loaded bracket that discharge wind pressure keeping banners in original condition. Pole Banner Mount eliminates bracket and possible light pole damage. The system is steel constructed and electro-plated and accommodates single and double sided PVC prints – collapsible and compact – with or without full color print. Standard size include: 1000mm wide x 1600mm high.Pole Banner Mount is a spring loaded bracket that discharge wind pressure keeping banners in original condition. Pole Banner Mount eliminates bracket and possible light pole damage. The system is steel constructed and electro-plated and accommodates single and double sided PVC prints – collapsible and compact – with or without full color print. Standard size include: 1000mm wide x 1600mm high.',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Pole-Banner-Mount.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Pole-Banner-Mount-1-I-e1747824523537.jpg'
      ],
    },
    {
      id: 130,
      name: 'Lamp Banner',
      description: 'Lamp Banner as a standard system includes an aluminium tubular pole and cross indoor base for outdoor use. Optional LED lighting available. Fully collapsible and compact with or without full color cloth print. Lamp Banner Flag accessories are available for indoor application, see Flag Accessories.',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2015/08/Lamp-Banner.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2015/08/Lamp-Banner-Perspective-View-1-e1747901139758.png'
      ],
    },
    {
      id: 131,
      name: 'Lamp Banner 1 with LED lighting',
      description: 'Lamp Banner 1 with LED lighting as a standard system includes an aluminium tubular pole and cross indoor base for outdoor use, LED internal lighting for night-time emphasis. Fully collapsible and compact. Lamp Banner 1 with LED lighting',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/Lamp-Banner-1-with-LED-lighting.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/Glow-Lamp-Banner-Golf-BG-1-e1747901437282.png'
      ],
    },
    {
      id: 132,
      name: 'Lamp Banner 2 Vane',
      description: 'Lamp Banner 2 Vane as a standard system includes an aluminium tubular pole and cross indoor base for outdoor use, and three double sided cloth print faces. Fully collapsible and compact. Lamp Banner 2 Vane',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/Lamp-Banner-2-Vane.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/Lamp-Banner-Vane-Colour-1-e1747901751992.png'
      ],
    },
    {
      id: 133,
      name: 'Lamp Banner 3 Heart',
      description: 'Lamp Banner 3 Heart as a standard system includes an aluminium tubular pole and cross indoor base for outdoor use. Optional LED lighting available. Fully collapsible and compact. Lamp Banner 3 Heart',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/Lamp-Banner-3-Heart.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/Perspective-Mockup-1-e1747902165629.png'
      ],
    },
    {
      id: 134,
      name: 'Wall Light',
      description: 'Wall Light is an optional accessory to light up and focus on specific areas – supplied with a halogen lamp to suit all wall types. Wall Light',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Wall-Light-1-Mounted-Grey-Background-3-I-e1733994578235.png'
      ],
    },
  ],
  'A Frames':[
  {
      id: 135,
      name: 'A Frames',
      description: 'A Frame system includes a sturdy aluminium tubular frame, carry bag, with or without full color two PVC prints (optional one or three PVC prints) – fully collapsible and compact. Frame tubes are elastic connected for ease of assembly / disassembly including stabilizing poles. A Frame custom sizes are available on request although dependent on quantity. Standard available sizes include: 2000mm x 1000mm and 3000mm x 1000mm',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/A-Frame.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/A-Frame-2-I-e1747821351366.jpg'
      ],
      sizes: [
        '2000mm x 1000mm',
        '3000mm x 1000mm'
      ],
    },
    {
      id: 136,
      name: 'A Frame HorizontalA Frame Horizontal',
      description: 'A Frame Horizontal system includes a sturdy aluminium tubular frame, carry bag, with or without full color two long & two triangular side cloth prints – fully collapsible and compact. Frame tubes are elastic connected for ease of assembly / disassembly including stabilizing poles. A Frame Horizontal custom sizes are available on request although dependent on quantity. Standard available sizes include: 2000mm x 1000mm and 3000mm x 1000mm',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/A-Frame-Horizontal.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/A-Frame-Horizontal-2-I-e1747822019676.jpg'
      ],
      sizes: [
        '2000mm x 1000mm',
        '3000mm x 1000mm'
      ],
    },
    {
      id: 137,
      name: 'A Frame Vertical',
      description: 'A Frame Vertical system includes sturdy aluminium tubular frame, carry bag, with or without full color three sided cloth print – fully collapsible and compact. Frame tubes are elastic connected for ease of assembly / disassembly including stabilizing poles. A Frame Vertical custom sizes are available on request although dependent on quantity. Standard available sizes include:2000mm x 1000mm and 3000mm x 1000mm',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/A-Frame-Vertical.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/A-Frame-Vertical-2-I-e1747822291165.jpg'
      ],
    },
  ],
  'BackPack': [
    {
      id: 138,
      name: 'BackPack',
      description: 'Backpack systems comprise of a Backpack structure which holds a cloth flag print in the shape of either a Banner Flag, Extreme 3 Flag, Extreme 12 Flag or Telescopic Flag. Backpack Single or Double Sided options available. Fully collapsible and compact.',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2015/08/Backpack.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2015/08/Backpack-Banner-Flag.jpg',
        'https://www.idealdisplays.co.za/wp-content/uploads/2015/08/Backpack-Extreme-12-Flag.jpg',
        'https://www.idealdisplays.co.za/wp-content/uploads/2015/08/Backpack-Telescopic-Flag.jpg'
      ],
      sizes: [
        'Banner Flag: 500 x 1500',
        'Extreme 3 Flag: 500 x 1500', 
        'Extreme 12 Flag: 500 x 1500', 
        'Telescopic Flag: 500 x 1500'
      ],
    },
  ],
  'Billboards': [
    {
      id: 139,
      name: 'Billboard Extrusion',
      description: 'Billboard Extrusion is priced per linear meter (1000mm) including cavity covers. It is a make to order aluminium frame which accommodates a printed PVC sheet. The Billboard Extrusion aluminium profile includes two cavities, one with a double lock for secure print fastening and a second for fastening the frame to a wall, secondary sign frame or firm truck body, intended for outdoor and indoor use – with or without full color print.',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Billboard-Extrusion.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Billboard-e1747825312884.jpg'
      ],
    },
    {
      id: 140,
      name: 'Billboard Large',
      description: 'Billboard Large is a make to order wall mount aluminium frame which accommodates a printed PVC sheet. The Billboard Large aluminium profile includes four cavities for secure print fastening by means of adjustable hook and elastic, adjustable wall mount brackets can be offset to accommodate wall cavities and or interferences, free standing units can be made, collapsible and compact – with or without full color print.',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Billboard-Large.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Billboard-Large-2-I-e1747826838290.jpg'
      ],
    },
    {
      id: 141,
      name: 'Billboard Clip Frame',
      description: 'Billboard Clip Frame is a make to order silver anodized aluminium body for wall mounting, with retaining springs to tension print, easy loading and unloading of print, outer cover to cover all fixing to create an elegant concealed finish, for indoor and outdoor use, complete with or without full color print. Billboard Clip Frame can be customized to suit requirements.',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Billboard-Clip-Frame.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Billboard-Clip-Frame-3-Small-e1747824858180.jpg',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Billboard-Clip-Frame-4-I-e1747824941628.jpg'
      ],
    },
  ],
  'Bunting': [
    {
      id: 142,
      name: 'Bunting',
      description: 'Bunting is made to order to size and artwork specifications printed on PVC or Textile, Single or Double Sided. Standard Bunting sizes include: 300mm x 200mm',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Bunting.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Bunting-3-e1747827223482.jpg',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Triangular-Bunting-I-e1747827304337.jpg'
      ],
    },
  ],
  'Car Options': [
    {
      id: 143,
      name: 'Car Flag',
      description: 'Car Flag is constructed from durable uv stable substrate to accommodate a 300mm x 400mm cloth print in full color – Car Flag.',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Car-Flag-I-e1747827862323.jpg',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Car-Flag-300mm-x-400mm-1.jpg'
      ],
    },
    {
      id: 144,
      name: 'Car Sun Shade Oval',
      description: 'Car Sun Shade Oval includes a single wire reinforced system and is supplied with full color cloth print and carry bag. Car Sun Shade Oval custom sizes are available on request but dependent on quantity. Standard sizes include: 650mm x 1200mm.',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Car-Sun-Shade-Oval.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Car-Sun-Shade-Oval-1-I-e1747828387802.jpg'
      ],
    },
    {
      id: 145,
      name: 'Car Sun Shade Two Circle Rectangular',
      description: 'Car Sun Shade Two Circle Rectangular includes two round wire reinforced rings and is supplied with full color cloth print and carry bag. Car Sun Shade Two Circle Rectangular custom sizes are available on request but dependent on quantity. Standard sizes include: 700mm x 1500mm.',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Car-Sun-Shade-Two-Circle-Rectangular.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Car-Sun-Shade-Two-Circle-Ractangular-2-I-e1747828941859.jpg'
      ],
    },
    {
      id: 146,
      name: 'Car Wind Sock',
      description: 'Car Wind Sock is constructed from durable uv stable substrate to accommodate a 235mm diameter by 500mm long conical full color cloth printed body – Car Wind Sock.',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Car-Wind-Sock.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Car-Wind-Sock-1-1-e1747828117703.jpg'
      ],
    },
  ],
  'Director Chair Options': [
    {
      id: 147,
      name: 'Director Chair',
      description: 'Director Chair is aluminium constructed which includes a durable textile seat, back rest and padded arm rests. The Director Chair system construction is produced from 25mm diameter tubular aluminium for added strength – supplied with single sided back rest print and a carry bag – fully collapsible and compact.',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2016/01/Directors-Chair-2-I-e1645093323165.jpg',
        'https://www.idealdisplays.co.za/wp-content/uploads/2016/01/Black-Front-Single-e1747829921707.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2016/01/Black-Perspective-Single-e1747830126810.png'
      ],
    },
    {
      id: 148,
      name: 'Director Chair High',
      description: 'Director Chair High is aluminium constructed which includes a durable textile seat, back rest and padded arm rests. The Director Chair High system construction is produced from 25mm diameter tubular aluminium for added strength – supplied with single sided back rest print and a carry bag – fully collapsible and compact.',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2023/05/Directors-Chair-High-Set-of-2-II-e1645094306327.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2022/02/Directors-Chair-High-Front-View-e1747830314404.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2022/02/Directors-Chair-High-Perspective-View-e1747830383967.png'
      ],
    },
  ],
  'Floor Stand Outdoor': [
    {
      id: 149,
      name: 'A1 Floor Stand 1000 Outdoor',
      description: 'A1 Floor Stand 1000 Outdoor is a collapsible A1 double sided 1000mm high floor stand with a face panel of 600mm x 900mm, intended for outdoor use – sold with or without prints. A1 Floor Stand 1000 Outdoor custom sizes are available on request but dependent on quantity.',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/A1-Floor-Stand-Outdoor.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/A1-Floor-Stand-1000-Outdoor-2-I-e1747897676744.jpg'
      ],
    },
    {
      id: 150,
      name: 'A1 Floor Stand 1000 Outdoor 1',
      description: 'A1 Floor Stand 1000 Outdoor 1 is a collapsible A1 double sided 1050mm high floor stand including aluminium tubular outer frame and chromadek face panels with or without double sided print. A1 Floor Stand 1000 Outdoor 1 custom sizes are available on request.',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2024/12/A1OS1-Perspective-Front-Side-I-e1733921581759.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2024/12/DSCN5359-Deep-Etched-1-e1747898691545.png'
      ],
    },
    {
      id: 151,
      name: 'A1 Floor Stand 1000 Outdoor 2',
      description: 'A1 Floor Stand 1000 Outdoor 2 is a collapsible A1 double sided 1050mm high floor stand including aluminium tubular outer frame and ABS face panels with or without double sided print. A1 Floor Stand 1000 Outdoor 2 custom sizes are available on request.',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2024/12/A1OS2-Perspective-Front-Side-I-e1733921889966.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2024/12/DSCN5361-Deep-Etched-1-e1747899114856.png'
      ],
    },
    {
      id: 152,
      name: 'A1 Floor Stand 1280 Outdoor 3',
      description: 'A1 Floor Stand 1280 Outdoor 3 is a collapsible A1 double sided 1280mm high floor stand including aluminium tubular outer frame and chromadek face panels with additional header panels 295mm x 590mm, with or without double sided print. A1 Floor Stand 1280 Outdoor 3 custom sizes are available on request.',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2024/12/A1OS3-Perspective-Front-Side-I-e1733921980536.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2024/12/DSCN5354-Deep-Etched-1-e1747899399239.png'
      ],
    },
    {
      id: 153,
      name: 'A1 Floor Stand 1280 Outdoor 4',
      description: 'A1 Floor Stand 1280 Outdoor 4 is a collapsible A1 double sided 1280mm high floor stand including aluminium tubular outer frame and ABS face panels with additional header panels 295mm x 590mm, with or without double sided print. A1 Floor Stand 1280 Outdoor 4 custom sizes are available on request.',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2024/12/A1OS4-Perspective-Front-Side-I-e1733922219265.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2024/12/DSCN5355-Deep-Etched-1-e1747899685981.png'
      ],
    },
    {
      id: 154,
      name: 'Wind Spinner',
      description: 'Wind Spinner is steel constructed and epoxy coated in black color, intended for outdoor use as it is propelled by wind. The system has an overall height of 1215mm with two display faces and apertures for floor fixing – with or without full color print. Wind Spinner custom sizes / colors are available on request but dependent on quantity.',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Wind-Spinner-Combined-I-e1627992874399.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Wind-Spinner-Front-View-e1747899855870.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Wind-Spinner-Top-Down-e1747899905933.png'
      ],
    },
    {
      id: 155,
      name: 'Wind Spinner 500 x 500 Wall Mount Bottom',
      description: 'Wind Spinner 500 x 500 Wall Mount Bottom is steel constructed and epoxy coated in black color, intended for outdoor use as it is propelled by wind. The system has an overall height of 640mm with two display faces and apertures for wall fixing – with or without full color print. Wind Spinner 500 x 500 Wall Mount Bottom custom sizes / colors are available on request.',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2022/02/Wind-Spinner-3D-Scene-e1645695244593.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2022/02/Wind-Spinner-Perspective-View-e1747900145478.png'
      ],
    },
    {
      id: 156,
      name: 'Wind Spinner 500 x 500 Wall Mount Top & Bottom',
      description: 'Wind Spinner 500 x 500 Wall Mount Top & Bottom is steel constructed and epoxy coated in black color, intended for outdoor use as it is propelled by wind. The system has an overall height of 1295mm with four display faces and apertures for wall fixing – with or without full color print. Wind Spinner 500 x 500 Wall Mount Top & Bottom custom sizes / colors are available on request.',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2022/02/Wind-Spinner-3D-Scene-1-e1645695477870.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2022/02/Wind-Spinner-3D-Wall-Mounted-I-1-e1747900267609.png'
      ],
    },
    {
      id: 157,
      name: 'Wind Sway A1',
      description: 'Wind Sway A1 is a double sided A1 face for outdoor use, steel and aluminium construction. The unit will swing back and forth to release wind pressure and settle to rest when there is no wind. Wind Sway A1 is compact and light weight with or without double sided print. Wind Sway A1 custom sizes are available on request.',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2024/12/WSW1-Perspective-Front-Side-I-e1733922578434.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2024/12/DSCN5347-Deep-Etched-1-e1747900776279.png'
      ],
    },
  ],
  'Star Tents': [
    {
      id: 158,
      name: 'Star Tent Single Pole',
      description: 'Star Tent Single Pole (12,000mm x 12,000mm) system includes a sturdy aluminium tubular upright support with an aluminium cap and ground spikes. Fully collapsible and compact, with or without full color print.. Star Tent Single Pole custom body colors are available on request although dependent on quantity. Standard sizes available include:',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2015/08/Star-Tent-Single.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2015/08/Star-Tent-Single-Pole-1.jpg'
      ],
    },
    {
      id: 159,
      name: 'Star Tent Double Pole',
      description: 'Star Tent Double Pole (12,000mm x 18,000mm) system includes two sturdy aluminium tubular upright supports with an aluminium caps and ground spikes. Fully collapsible and compact, with or without full color print.. Star Tent Double Pole custom body colors are available on request although dependent on quantity. Standard sizes available include:',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2015/08/Star-Tent-Double-Perspective-e1645694656711.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2015/08/Star-Tent-Double-Front-1-e1747917201438.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2015/08/Star-Tent-Double-Top-1-e1747917312635.png'
      ],
    },
  ],
  'Umbrella': [
    {
      id: 160,
      name: 'Umbrella Round',
      description: 'Umbrella Round system include a sturdy aluminium tubular frame, roof cover sleeve, concrete base, with or without full color cloth roof – collapsible and compact. Umbrella Round Standard available sizes include: 2000mm and 2500mm and 3000mm',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Umbrella-Round.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Umbrella-1-1-e1747917648873.png'
      ],
      sizes: [
        '2000mm',
        '2500mm',
        '3000mm'
      ],
    },
    {
      id: 161,
      name: 'Umbrella Square',
      description: 'Umbrella Square system include a sturdy aluminium tubular frame, roof cover sleeve, concrete base, with or without full color cloth roof – collapsible and compact. Umbrella Square Standard available sizes include: 2000mm and 2500mm and 3000mm',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Umbrella-Square.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Umbrella-2-1-e1747917899644.png'
      ],
      sizes: [
        '2000mm',
        '2500mm',
        '3000mm'
      ],
    },
  ],
  'Magnetic Decals': [
    {
      id: 162,
      name: 'Magnetic Decals',
      description: 'Magnetic Decals are printed on self adhesive vinyl with solvent based inks, liquid laminated and applied onto a flexible magnetic sheet for application on metal surfaces, eg. vehicle door or side panels – priced per square meter (1000mm x 1000mm) Magnetic Decals',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Magnetic-Decals.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Magnetic-Decal-Vehicle-1-1-e1747918530773.png'
      ],
    },
  ],
  'Selfie Frame': [
    {
      id: 163,
      name: 'Selfie Frame',
      description: 'Selfie Frame is a correx board with cut-out including digitally printed graphic on vinyl applied to create that special moment. Standard available sizes include: A0: 1189mm x 841mm, A1: 841mm x 594mm',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2022/02/Selfie-Board-with-Girl-e1645166177400.jpg',
        'https://www.idealdisplays.co.za/wp-content/uploads/2022/02/Selfie-Board-Isolated-1-e1747919978319.jpg'
      ],
      sizes: [
        'A0: 1189mm x 841mm',
        'A1: 841mm x 594mm'
      ],
    },
  ],
  'Windsock': [
    {
      id: 164,
      name: 'Windsock',
      description: 'Windsock as a standard system includes a steel reinforce frame with full color cloth print. Custom sizes are available on request. Windsock Standard available size includes: Dia. 380mm x dia. 200mm x 1800mm long.',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2021/06/Wind-Sock-Large-e1747920531757.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2021/06/3D-Wind-Sock-Illustration-Orange-1-e1747920332973.png'
      ],
    },
  ],
  'Flag Indoor Options': [
    {
      id: 165,
      name: 'Bunting',
      description:  'Bunting is made to order to size and artwork specifications printed on PVC or Textile, Single or Double Sided. Standard Bunting sizes include: 300mm x 200mm',
      // price: 'From R199',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Bunting.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Bunting-3-e1747827223482.jpg',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Triangular-Bunting-I-e1747827304337.jpg'
      ],
    },
    {
      id: 166,
      name: 'Desk Flag',
      description: 'Desk Flag 100mm x 150mm with Print is a plastic constructed system that accommodates a full color cloth print of 100mm x 150mm. Desk Flag',
      //pricce: '',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2023/05/Desk-Flag-100-x-150-1-I-e1628679457227.jpg',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Desk-Flag-100-x-150-I-e1748242702307.jpg'
      ],
    },
    {
      id: 167,
      name: 'Flag Pole Indoor 2500',
      description: 'Flag Pole Indoor 2500 Indoor is steel and aluminium constructed and epoxy coated in gold color to accommodate a standard 1200mm x 1800mm cloth flag with toggle and rope. Flag Pole Indoor 2500',
      //price: '',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Flag-Pole-2500-I-e1628679548400.jpg',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Flag-Pole-2500-With-Hanging-Open-Flag-e1748242932364.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Flag-Pole-2500-7-I-e1748243034662.jpg'
      ],
    },
  ],
  'Floating Display System': [
    {
      id: 168,
      name: 'Floating Display 1450 and 2700 and 2850 and 2950',
      description: 'Floating Display 1450 and 2700 and 2850 and 2950 systems include six double sided display discs, aluminium tubular rods, cables and mount – fully collapsible and compact. These system are easily erected for overhead mounting, propelled by air flow and are guaranteed to draw attention with its orbit like movement – with or without full color prints. Standard available sizes include: Floating Display 1450 and 2700 and 2850 and 2950',
      //price: '',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Floating-Display-1450-2700-2850-2950.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Floating-Display-2950-1-Flat-1-e1748243379292.png'
      ],
    },
    {
      id: 169,
      name: 'Floating Display 9000 and 14000',
      description: 'Floating Display 9000 and 14000 with Print systems include six double sided display discs, aluminium tubular rods, cables and mount – fully collapsible and compact. These system are easily erected for overhead mounting, propelled by air flow and are guaranteed to draw attention with its orbit like movement – with or without full color prints. Standard available sizes include: Floating Display 9000 and 14000',
      //price: '',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Floating-Display-9000-14000.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Floating-Display-9000-2-1-e1748243806199.png'
      ],
    },
  ],
  'Hanging Extrusions': [
    {
      id: 170,
      name: 'Hanging Extrusions',
      description: 'Hanging Extrusions (priced per meter) is a make to order system which includes a top and or top and bottom extrusion for hanging prints by means of cable suspension from a ceiling or wall – with or without full color print. Hanging Extrusions',
      //price: '',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Hanging-Extrusion.png'
      ],
    },
  ],
  'Ideal Applicator': [
    {
      id: 171,
      name: 'Ideal Applicator',
      description: 'Ideal Applicator assists with easy and fast application, especially with long texts, working width of 610mm – 1700mm, solid construction. It helps you to place PVC and or application tape simple on weeded vinyl. Application tape goes straight without wrinkles or air bubbles, specially when you mask a 5m length vinyl or more, single person application. Ideal Applicator',
      //price: '',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Ideal-Applicator.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Applicator-4-1-e1748253583627.png'
      ],
    },
  ],
'Ideal Media Roll Dispenser': [
  {
    id: 172,
    name: 'Media Roll Dispenser 1A',
    description: 'Media Roll Dispenser 1A is a steel and aluminium construction, epoxy coated in silver finish. The system offers compact media storage which dispense one roll at a time including complete mobility. The system is modular and is adjustable to suit media roll widths to a maximum height of 1950mm. Media Roll Dispenser 1A offer location points to accommodate six media rolls per system on a single tier',
    //price: '',
    images: [
      'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/Media-Roll-Dispenser-1A.png',
      'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/DSCN3185-1-e1748253903334.png'
    ],
  },
  {
    id: 173,
    name: 'Media Roll Dispenser 1B',
    description: 'Media Roll Dispenser 1B is a steel and aluminium construction, epoxy coated in silver finish. The system offers compact media storage which dispense one roll at a time including complete mobility. The system is modular and is offered in a two tier configuration that is adjustable to suit media roll widths to a maximum height of 900mm on both tiers. Media Roll Dispenser 1B offer location points to accommodate twelve media rolls on double tier.',
    //price: '',
    images: [
      'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/Media-Roll-Dispenser-1B.png',
      'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/DSCN3185-1-e1748253903334.png'
    ],
  },
  {
    id: 174,
    name: 'Media Roll Dispenser 2',
    description: 'Media Roll Dispenser 2 is a steel and aluminium construction, epoxy coated in silver finish. Above all, the system offers compact media storage which dispense one roll at a time including complete mobility. Noteworthy, the system is modular and is offered in a two trolley system option as standard. Even more, the system including two trolleys can accommodate any media width available on the market. Furthermore, the system may also be used as two separate storage units whereby narrows widths may be stored. Media Roll Dispenser 2',
    //price: '',
    images: [
      'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/Media-Roll-Dispenser-2.png',
      'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/20171025_154829-1-e1748254206969.png',
      'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/DSCN3195-1-e1748254274434.png'
    ],
  },
],
'Ideal Vinyl Weeding Machine & Take-up System': [
  {
    id: 175,
    name: 'Vinyl Weeding Machine',
    description: 'Vinyl Weeding Machine comprise of an aluminium and steel construction. The system allows the user to weed / remove unwanted vinyl and only leave the final product available on the release paper. Quick and effortless waste vinyl media separation, leaving the final product ready to be used. Vinyl Weeding Machine',
    //price: '',
    images: [
      'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/Vinyl-Weeding-Machine.png',
      'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/20171030_144913-1-e1748254538648.png'
    ],
    sizes: [
      '1000mm wide',
      '1450mm wide',
      '1750mm wide'
    ],
  },
  {
    id: 176,
    name: 'Vinyl Weeding Machine Take-up',
    description: 'Vinyl Weeding Machine Take-up comprise of an aluminium and steel construction. Noteworthy, the system is an optional addition to the Vinyl Weeding Machine. Also, the system allows the user to wind up the final weeded vinyl media onto a media core. Full roll to roll can be weeded within minutes. Above all, the system is compact and requires minimum space to operate.',
    //price: '',
    images: [
      'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/Vinyl-Weeding-Machine-Take-Up.png',
      'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/20171030_145248-1-e1748254706810.png'
    ],
    sizes: [
      '1000mm wide',
      '1450mm wide',
      '1750mm wide'
    ],
  },
],
'Picture Frames & Shutter Frame': [
  {
    id: 177,
    name: 'Picture Frame 50mm',
    description: 'Picture Frame 50mm comprise of a silver anodized aluminium body with magnetic strips, firm backing board, non reflective front overlay with border and magnetic strips to adhere to the aluminium body magnetic strips – with or without full color print. Standard frames are constructed for indoor application although can be converted for outdoor use at an additional fee. Custom sizes are available for indoor as well as outdoor application – with or without full color print. Standard available sizes include: A0, A1, A2, A3, A4. Picture Frame 50mm',
    //price: '',
    images: [
      'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Picture-Frame-50mm.png',
      'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Picture-Frame-50mm-I-e1748264971666.jpg'
    ],
  },
  {
    id: 178,
    name: 'Picture Frame 5mm',
    description: 'Picture Frame 5mm comprise of a silver anodized aluminium body with magnetic strips, firm backing board, non reflective front overlay with border and magnetic strips to adhere to the aluminium body magnetic strips – with or without full color print. Standard frames are constructed for indoor application however can be converted for outdoor use at an additional fee. Custom sizes are available for indoor as well as outdoor application – with or without full color print. Standard available sizes include: A0, A1, A2, A3, A4. Picture Frame 5mm',
    //price: '',
    images: [
      'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Picture-Frames-5mm.png',
      'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/5mm-Picture-Frame-I-e1748264688913.jpg'
    ],
  },
  {
    id: 179,
    name: 'Picture Frame 80mm',
    description: 'Picture Frame 80mm comprise of a silver anodized aluminium body with magnetic strips, firm backing board, non reflective front overlay with border and magnetic strips to adhere to the aluminium body magnetic strips – with or without full color print. Standard frames are constructed for indoor application although can be converted for outdoor use at an additional fee. Custom sizes are available for indoor as well as outdoor application – with or without full color print. Standard available sizes include: A0, A1, A2, A3, A4. Picture Frame 80mm',
    //price: '',
    images: [
      'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Picture-Frame-80mm.png',
      'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Picture-Frame-80mm-2-1-e1748265289547.png'
    ],
  },
  {
    id: 180,
    name: 'Shutter Frame 28mm',
    description: 'Shutter Frame 28mm comprise of a silver anodised aluminium body with spring loaded clip frame for ease of loading and unloading a print, firm backing and non reflective front overlay – with or without full color print. Standard frames are constructed for indoor application however can be converted for outdoor use at an additional fee. Shutter Frame 28mm custom sizes are available for indoor as well as outdoor application – with or without full colour print. Custom frame colors are available on request although dependent on quantity. Standard sizes available include: A0, A1, A2, A3, A4, A5.',
    //price: '',
    images: [
      'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Shutter-Frame-28mm.png'
    ],
  },
  {
    id: 181,
    name: 'Shutter Frame 32mm',
    description: 'Shutter Frame 32mm comprise of a silver anodised aluminium body with spring loaded clip frame for ease of loading and unloading a print, firm backing and non reflective front overlay – with or without full color print. Standard frames are constructed for indoor application however can be converted for outdoor use at an additional fee. Shutter Frame 32mm custom sizes are available for indoor as well as outdoor application – with or without full color print. Custom frame colors are available on request although dependent on quantity. Standard sizes available include: A0, A1, A2, A3, A4, A5.Shutter Frame 32mm comprise of a silver anodised aluminium body with spring loaded clip frame for ease of loading and unloading a print, firm backing and non reflective front overlay – with or without full color print. Standard frames are constructed for indoor application however can be converted for outdoor use at an additional fee. Shutter Frame 32mm custom sizes are available for indoor as well as outdoor application – with or without full color print. Custom frame colors are available on request although dependent on quantity. Standard sizes available include: A0, A1, A2, A3, A4, A5.',
    //price: '',
    images: [
      'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Shutter-Frame-32mm.png',
      'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/32mm-Profile-1-e1748270472317.jpg'
    ],
  },
  {
    id: 182,
    name: 'Shutter Frame 33mm',
    description: 'Shutter Frame 33mm comprise of a silver anodized aluminium body with spring loaded clip frame for ease of loading and unloading a print, firm backing and non reflective front overlay – with or without full color print. Standard frames are constructed for indoor application however can be converted for outdoor use at an additional fee. Shutter Frame 33mm custom sizes are available for indoor as well as outdoor application – with or without full color print. Custom frame colors are available on request although dependent on quantity. Standard sizes available include: A0, A1, A2, A3, A4, A5.',
    //price: '',
    images: [
      'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Shutter-Frame-33mm.png',
      'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Shutter-Frame-33mm-1-I-e1748269906442.jpg'
    ],
  },
  {
    id: 183,
    name: 'Shutter Frame 34mm',
    description: 'Shutter Frame 34mm comprise of a silver anodized aluminium body with spring loaded clip frame for ease of loading and unloading a print, firm backing and non reflective front overlay – with or without full color print. Standard frames are constructed for indoor application however can be converted for outdoor use at an additional fee. Shutter Frame 34mm custom sizes are available for indoor as well as outdoor application – with or without full color print. Custom frame colors are available on request although dependent on quantity. Standard sizes available include: A0, A1, A2, A3, A4, A5.',
    //price: '',
    images: [
      'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Shutter-Frame-34mm.png',
      'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Shutter-Frame-34mm-1-I-e1748428645480.jpg'
    ],
  },
  {
    id: 184,
    name: 'Shutter Frame Double Frame 55mm',
    description: 'Shutter Frame Double Frame 55mm comprise of a silver anodized aluminium body with spring loaded clip frame for ease of loading and unloading a print, firm backing and non reflective front overlay – with or without full color print. Standard frames are constructed for indoor application however can be converted for outdoor use at an additional fee. Custom sizes are available for indoor as well as outdoor application – with or without full color print. Shutter Frame Double Frame 55mm custom frame colors are available on request although dependent on quantity. Standard sizes available include: A0, A1, A2, A3, A4, A5.',
    //price: '',
    images: [
      'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Shutter-Frame-Double-Frame-55mm.png',
      'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Shutter-Frame-Double-Frame-55mm-1-I-e1748429101940.jpg'
    ],
  },
  {
    id: 185,
    name: 'Shutter Frame Double Sided 34mm',
    description: 'Shutter Frame Double Sided 34mm comprise of a silver anodized aluminium body with spring loaded clip frame for ease of loading and unloading a print, firm backing and non reflective front overlay – with or without full color print. Standard frames are constructed for indoor application however can be converted for outdoor use at an additional fee. Shutter Frame Double Sided 34mm custom sizes are available for indoor as well as outdoor application – with or without full color print. Custom frame colors are available on request although dependent on quantity. Standard sizes available include: A0, A1, A2, A3, A4, A5.',
    //price: '',
    images: [
      'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Shutter-Frame-Double-Sided-34mm.png',
      'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Shutter-Frame-Double-Sided-3-I-e1748428781311.jpg'
    ],
  },
],
'Table Cloth': [
  {
    id: 186,
    name: 'Table Cloth Fitted',
    description: 'Table Cloth Fitted is a make to order single sided rectangular print which is trimmed to size and hemmed vertically on all four corners in order to achieve a straight edge finish as the table cloth is draped over the trestle table – full color print with fully collapsible trestle table options also available. Table Cloth Fitted',
    //price: '',
    images: [
      'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/Table-Cloth-Fitted.png',
      'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/Fitted-Table-Cloth-PSD-Mockup-Golf-Tournament-1-e1748429906503.png'
    ],
    sizes: [
      '1800mm x 750mm',
      '800mm x 600mm'
    ],
  },
  {
    id: 187,
    name: 'Table Cloth Standard',
    description: 'Table Cloth Standard is a make to order rectangular print which is trimmed to size and hemmed all around to give the textile a neat finish – full color print with fully collapsible trestle table options also available. Table Cloth Standard',
    //price: '',
    images: [
      'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/Table-Cloth-Standard.png',
      'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/Table-Cloth-Throw-Round-Corners-Open-Layout-e1748429379251.jpg'
    ],
    sizes: [
      '1800mm x 750mm',
      '800mm x 600mm'
    ],
  },
  {
    id: 188,
    name: 'Table Cloth Stretch',
    description: 'Table Cloth Stretch is a make to order print which is trimmed to size and hemmed all around to give the textile a neat finish – full color print with fully collapsible trestle table options also available. Table Cloth Stretch',
    //price: '',
    images: [
      'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/Table-Cloth-Stretch.png',
      'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/Table-Cloth-Stretch-Fit_1048421302-1-e1748430665878.png'
    ],
    sizes: [
      '1800mm x 750mm',
      '800mm x 600mm'
    ],
  },
],
};

export function getPrintingProductBySlug(slug) {
  for (const list of Object.values(products)) {
    for (const p of list) {
      if (slugify(p.name) === slug) return p;
    }
  }
  return null;
}

export function getRelatedPrintingProducts(slug, limit = 3) {
  let related = [];
  for (const list of Object.values(products)) {
    const idx = list.findIndex((p) => slugify(p.name) === slug);
    if (idx !== -1) {
      related = list.filter((_, i) => i !== idx).slice(0, limit);
      break;
    }
  }
  return related;
}


