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
      'Picture Frames & Shutter Frames',
      'Point of Sale Tables & Counters',
      'Light Boxes & Illuminated Displays',
      'Wall & Hanging Displays',
      'Accessories & Equipment',
    ],
  },
  outdoor: {
    name: 'Outdoor',
    subCategories: [
      'Gazebos & Tents',
      'Flags & Flying Banners',
      'Pavement & Forecourt Signs',
      'Outdoor Banner Frames & Wall Systems',
      'Event & Queue Management Systems',
      'Outdoor Brochure & Literature Holders',
      'Illuminated & Solar Displays',
      'Accessories & Hardware',
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
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Banner-Stand-Indoor-Front-Back.png',
        'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/Banner-Plus.png'
      ],
      sizes: ['850 x 2000mm', '1000 x 2000mm'],
    },
    {
      id: 2,
      name: 'Roll-Up Banner',
      description: 'Professional roll-up banner display',
      // price: 'From R129',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/Banner-Plus.png'
      ],
    },
    {
      id: 3,
      name: 'Tension Banner',
      description: 'Modern tension banner system',
      // price: 'From R199',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/Banner-Plus.png'
      ],
    },
  ],
  'Floor Stands & Free Stands': [
    {
      id: 4,
      name: 'Floor Display Stand',
      description: 'Heavy-duty floor display stand',
      // price: 'From R149',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/Banner-Plus.png'
      ],
    },
    {
      id: 5,
      name: 'Free Standing Display',
      description: 'Versatile free standing display unit',
      // price: 'From R179',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/Banner-Plus.png'
      ],
    },
  ],
  'Gazebos & Tents': [
    {
      id: 6,
      name: 'Event Gazebo',
      description: 'Professional event gazebo 3x3m',
      // price: 'From R299',
      image:
        'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/Banner-Plus.png',
    },
    {
      id: 7,
      name: 'Trade Show Tent',
      description: 'Commercial grade trade show tent',
      // price: 'From R399',
      image:
        'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/Banner-Plus.png',
    },
  ],
  'Flags & Flying Banners': [
    {
      id: 8,
      name: 'Feather Flag',
      description: 'Eye-catching feather flag display',
      // price: 'From R89',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/Banner-Plus.png'
      ],
    },
    {
      id: 9,
      name: 'Flying Banner',
      description: 'High-visibility flying banner',
      // price: 'From R119',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/Banner-Plus.png'
      ],
    },
  ],
  'Brochure Stands': [
    {
      id: 10,
      name: 'A3 Podium Brochure Stand',
      description: 'Podium brochure stand',
      // price: 'From R89',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Brochure-Stand-A3-Podium-300x300.png'
      ],
    },
    {
      id: 11,
      name: 'A4 Z-Up Brochure Stand',
      description: 'Z-Up brochure stand',
      // price: 'From R89',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Brochure-Stand-A4-Z-Up.png'
      ],
    },
    {
      id: 12,
      name: 'Econo Plus Mesh Brochure Stand',
      description: 'Mesh brochure stand',
      // price: 'From R89',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Brochure-Stand-Econo-Plus-Mesh.png'
      ],
    },
    {
      id: 13,
      name: 'Econo Brochure Stands',
      description:
        'Econo Double Volume includes three double A4 tiers with weighted base.',
      // price: 'From R89',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Brochure-Stand-Econo-Double-Volume.png'
      ],
    },
    {
      id: 14,
      name: 'Hologram Brochure Stand',
      description:
        'Holographic top display with four stainless steel tiers.',
      // price: 'From R89',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2013/05/Hologram-Brochure-Stand.png'
      ],
    },
    {
      id: 15,
      name: 'Line Up Brochure Stand',
      description: 'Line up brochure stand',
      // price: 'From R89',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/Banner-Plus.png'
      ],
    },
    {
      id: 16,
      name: 'Smart Brochure Stand',
      description: 'Smart brochure stand',
      // price: 'From R89',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/Banner-Plus.png'
      ],
    },
    {
      id: 17,
      name: 'Table Top Brochure Stand Smart',
      description: 'Table top brochure stand',
      // price: 'From R89',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/Banner-Plus.png'
      ],
    },
  ],
  'Picture Frames & Shutter Frames': [
    {
      id: 18,
      name: 'Fabric Stretch Frame',
      description: 'Fabric stretch frame',
      // price: 'From R89',
      images: [
        'https://www.idealdisplays.co.za/wp-content/uploads/2019/05/Banner-Plus.png'
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


