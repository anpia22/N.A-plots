export interface Property {
  id: string | number;
  title: string;
  type: "Flat" | "Plot" | "House" | "Commercial";
  bhk: number; // 0 for plot/commercial
  price: number; // in Lakhs (e.g. 85 for 85 Lac, 250 for 2.5 Cr)
  priceFormatted: string; // e.g. "₹85 Lac", "₹2.5 Cr"
  area: string; // e.g. "985 sqft"
  locality: string;
  city: "Pune" | "Mumbai" | "Bangalore" | "Delhi NCR";
  status: "Ready to Move" | "Under Construction";
  postedBy: "Owner" | "Builder" | "Agent";
  isProject: boolean; // True for builder project/society, false for individual owner properties
  projectName: string;
  builderName?: string;
  img: string; // Primary image
  images: string[]; // Carousel images
  photosCount: number;
  description: string;
  bathrooms?: number;
  balconies?: number;
  facing?: "East" | "West" | "North" | "South" | "North-East" | "South-East";
  floor?: string;
  amenities: string[];
  postedDate: string; // "Just Now", "2 days ago", etc.
}

export const seedProperties: Property[] = [
  // 1. Projects (Societies) in Pune
  {
    id: "p1",
    title: "2 & 3 BHK Premium Residences in Keshav Nagar",
    projectName: "Godrej Infinity",
    builderName: "Godrej Properties",
    type: "Flat",
    bhk: 2,
    price: 85,
    priceFormatted: "₹85 Lac",
    area: "985 sqft",
    locality: "Keshav Nagar Mundhwa",
    city: "Pune",
    status: "Ready to Move",
    postedBy: "Builder",
    isProject: true,
    img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
      "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=600&q=80"
    ],
    photosCount: 12,
    description: "Godrej Infinity is a 43-acre residential property in Keshav Nagar, Pune. The project is designed with extensive greenery, an expansive clubhouse, swimming pool, state-of-the-art security systems, and multiple sports facilities.",
    bathrooms: 2,
    balconies: 2,
    facing: "East",
    floor: "8th out of 22 floors",
    amenities: ["Swimming Pool", "Clubhouse", "24/7 Security", "Gym", "Power Backup", "Jogging Track", "Kids Play Area"],
    postedDate: "2 days ago"
  },
  {
    id: "p2",
    title: "Luxury 3 & 4 BHK Smart Homes in Kharadi",
    projectName: "Gera World of Joy",
    builderName: "Gera Developments",
    type: "Flat",
    bhk: 3,
    price: 165,
    priceFormatted: "₹1.65 Cr",
    area: "1450 sqft",
    locality: "Kharadi Bypass Road",
    city: "Pune",
    status: "Under Construction",
    postedBy: "Builder",
    isProject: true,
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80"
    ],
    photosCount: 18,
    description: "Welcome to child-centric smart living at Gera World of Joy. Located in the bustling IT hub of Kharadi, it offers premium lifestyle apartments with home automation, standard sports academies, and high-end security parameters.",
    bathrooms: 3,
    balconies: 3,
    facing: "North-East",
    floor: "14th out of 25 floors",
    amenities: ["Smart Home Controls", "Clubhouse", "Swimming Pool", "Tennis Court", "Cricket Pitch", "Gym", "Concierge"],
    postedDate: "5 days ago"
  },
  // 2. Individual Owner Properties in Pune (from Popular Owner Properties)
  {
    id: "o1",
    title: "Spacious 2 BHK Flat with Modular Kitchen",
    projectName: "Standalone Society",
    type: "Flat",
    bhk: 2,
    price: 80,
    priceFormatted: "₹80 Lac",
    area: "982 sqft",
    locality: "Katraj Ambegaon BK Road",
    city: "Pune",
    status: "Ready to Move",
    postedBy: "Owner",
    isProject: false,
    img: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=600&q=80",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&q=80"
    ],
    photosCount: 8,
    description: "Well-maintained 2 BHK flat available for immediate sale. Features a spacious living room, modular kitchen, cross ventilation, excellent natural light, and matches vaastu principles. Extremely close to schools and highway.",
    bathrooms: 2,
    balconies: 1,
    facing: "East",
    floor: "3rd out of 7 floors",
    amenities: ["Modular Kitchen", "Lift", "Power Backup", "Reserved Parking", "CCTV Security"],
    postedDate: "Yesterday"
  },
  {
    id: "o2",
    title: "Affordable 1 BHK Flat in Prime Locality",
    projectName: "Kothari Residency",
    type: "Flat",
    bhk: 1,
    price: 15,
    priceFormatted: "₹15 Lac",
    area: "450 sqft",
    locality: "Mitha Nagar, Bibvewadi",
    city: "Pune",
    status: "Ready to Move",
    postedBy: "Owner",
    isProject: false,
    img: "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=600&q=80"
    ],
    photosCount: 4,
    description: "Compact and budget-friendly 1 BHK apartment. Ideal for a small family or as a rental investment. Centrally located in Bibvewadi with continuous municipal water supply and all essential conveniences nearby.",
    bathrooms: 1,
    balconies: 0,
    facing: "West",
    floor: "Ground floor",
    amenities: ["Water Storage", "Security", "Intercom"],
    postedDate: "3 days ago"
  },
  // 3. Projects and Properties in Mumbai
  {
    id: "m1",
    title: "Ultra Luxury 3 & 4 BHK Apartments in Worli",
    projectName: "Lodha Park",
    builderName: "Lodha Group",
    type: "Flat",
    bhk: 3,
    price: 650,
    priceFormatted: "₹6.5 Cr",
    area: "1650 sqft",
    locality: "Worli, South Mumbai",
    city: "Mumbai",
    status: "Ready to Move",
    postedBy: "Builder",
    isProject: true,
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80"
    ],
    photosCount: 22,
    description: "Lodha Park is an architectural marvel built around a private 7-acre park. Offers state-of-the-art living with a luxury spa, massive swimming pool, business centers, high-speed elevators, and panoramic sea views.",
    bathrooms: 3,
    balconies: 2,
    facing: "West",
    floor: "32nd out of 60 floors",
    amenities: ["7-Acre Park", "Swimming Pool", "Luxury Spa", "Gym", "Valet Parking", "24/7 Concierge", "Helipad Access"],
    postedDate: "1 week ago"
  },
  {
    id: "m2",
    title: "High-Rise 2 BHK Flat with Sea View",
    projectName: "Runwal Elegante",
    type: "Flat",
    bhk: 2,
    price: 280,
    priceFormatted: "₹2.8 Cr",
    area: "1150 sqft",
    locality: "Lokhandwala, Andheri West",
    city: "Mumbai",
    status: "Ready to Move",
    postedBy: "Agent",
    isProject: false,
    img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80"
    ],
    photosCount: 9,
    description: "Live the high life in this stunning 2 BHK apartment in Runwal Elegante, Lokhandwala. Fully furnished, stylish interiors, premium light fixtures, electronic gadgets, and gorgeous sunset views over the Arabian Sea.",
    bathrooms: 2,
    balconies: 1,
    facing: "West",
    floor: "24th out of 38 floors",
    amenities: ["Fully Furnished", "Clubhouse", "Gym", "Reserved Parking", "CCTV Security", "Rooftop Garden"],
    postedDate: "4 days ago"
  },
  // 4. Rising Spaces Plots and Villas in Pune
  {
    id: "plot_frow",
    title: "The f Row - Vogue Villas & Sanctioned NA Plots",
    projectName: "The f Row",
    builderName: "Rising Spaces",
    type: "Plot",
    bhk: 0,
    price: 35,
    priceFormatted: "₹35 Lac*",
    area: "1,500 - 3,500 sqft",
    locality: "Paud Mulshi",
    city: "Pune",
    status: "Under Construction",
    postedBy: "Builder",
    isProject: true,
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&q=80"
    ],
    photosCount: 12,
    description: "The f Row is a premium gated community featuring fashion-inspired Vogue Villas and sanctioned NA plots in Paud-Mulshi, Pune, developed in collaboration with FashionTV.",
    amenities: ["Gated Community", "Clubhouse", "Swimming Pool", "Gym", "Water Connection", "24/7 Security"],
    postedDate: "Just Now"
  },
  {
    id: "plot_tathastu",
    title: "Codename Tathastu - Premium Residential NA Plots",
    projectName: "Codename Tathastu",
    builderName: "Rising Spaces",
    type: "Plot",
    bhk: 0,
    price: 45,
    priceFormatted: "₹45 Lac*",
    area: "1,200 - 2,500 sqft",
    locality: "Ghotawade, Near Hinjewadi",
    city: "Pune",
    status: "Under Construction",
    postedBy: "Builder",
    isProject: true,
    img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80"
    ],
    photosCount: 8,
    description: "Codename Tathastu offers premium residential NA plots in Ghotawade, situated close to the Hinjewadi IT hub. A gated community spanning 6 acres with state-of-the-art facilities.",
    amenities: ["Gated Community", "Concrete Roads", "Underground Electricity", "Water Supply", "Street Lights", "CCTV Security"],
    postedDate: "2 days ago"
  },
  {
    id: "villa_pawna",
    title: "The Pawna Villas - Waterfront Luxury Villas",
    projectName: "The Pawna Villas",
    builderName: "Rising Spaces",
    type: "House",
    bhk: 5,
    price: 350,
    priceFormatted: "Price on Request",
    area: "2,500 - 5,000 sqft",
    locality: "Pawna Lake, Near Lonavala",
    city: "Pune",
    status: "Ready to Move",
    postedBy: "Builder",
    isProject: true,
    img: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80"
    ],
    photosCount: 15,
    description: "The Pawna Villas offer ultra-luxury waterfront 5-BHK villas at Pawna Lake near Lonavala, designed as premium weekend retreats with panoramic lake views.",
    amenities: ["Private Pool", "Waterfront View", "Private Lawn", "Gated Security", "Clubhouse", "24/7 Power Backup"],
    postedDate: "5 days ago"
  },
  {
    id: "plot_ownedge",
    title: "Codename OWNEDGE - Premium Commercial NA Plots",
    projectName: "Codename OWNEDGE",
    builderName: "Rising Spaces",
    type: "Commercial",
    bhk: 0,
    price: 25,
    priceFormatted: "₹25 Lac*",
    area: "1,500 - 3,000 sqft",
    locality: "Somatane Phata",
    city: "Pune",
    status: "Under Construction",
    postedBy: "Builder",
    isProject: true,
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80"
    ],
    photosCount: 6,
    description: "Codename OWNEDGE is a strategically located commercial NA plotting project at Somatane Phata, Pune, offering high-potential business and commercial land investments.",
    amenities: ["Commercial Zone", "Wide Roads", "High Visibility", "Water Connection", "Underground Cabling"],
    postedDate: "1 week ago"
  },
  // 5. Commercial properties
  {
    id: "comm1",
    title: "Grade-A Office Space in High-End Commercial Tower",
    projectName: "EON Free Zone",
    builderName: "Panchshil Realty",
    type: "Commercial",
    bhk: 0,
    price: 320,
    priceFormatted: "₹3.2 Cr",
    area: "2200 sqft",
    locality: "Kharadi IT Park",
    city: "Pune",
    status: "Ready to Move",
    postedBy: "Agent",
    isProject: true,
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80"
    ],
    photosCount: 10,
    description: "Premium fully-furnished commercial office space located in EON IT Park, Kharadi. Equipped with 25 workstations, 2 conference rooms, executive cabins, modern pantry, and centralized air conditioning.",
    facing: "South-East",
    floor: "6th out of 10 floors",
    amenities: ["Central AC", "24/7 Power Backup", "High-Speed Lifts", "Visitor Parking", "Fire Safety Systems", "Cafeteria"],
    postedDate: "6 days ago"
  },
  // 6. Delhi NCR Luxury Houses
  {
    id: "d1",
    title: "Premium 4 BHK Independent House/Villa",
    projectName: "DLF Phase 2 Villas",
    builderName: "DLF",
    type: "House",
    bhk: 4,
    price: 490,
    priceFormatted: "₹4.9 Cr",
    area: "3200 sqft",
    locality: "DLF Phase 2, Sector 25",
    city: "Delhi NCR",
    status: "Ready to Move",
    postedBy: "Agent",
    isProject: true,
    img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80"
    ],
    photosCount: 15,
    description: "A gorgeous 4 BHK luxurious villa featuring ultra-modern sanitary ware, private lawn, Italian marble floors, glass elevator, modular island kitchen, and continuous water/power back up. Located in one of Delhi NCR's safest gated zones.",
    bathrooms: 4,
    balconies: 3,
    facing: "East",
    floor: "G+2 Floors",
    amenities: ["Private Lawn", "Italian Marble", "Elevator", "Gated Security", "Servant Room", "Power Backup", "Gym"],
    postedDate: "2 days ago"
  }
];

// Helper functions for Local Storage interaction
export function getStoredProperties(): Property[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem("magic_homes_properties");
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch (e) {
    console.error("Error parsing stored properties", e);
    return [];
  }
}

export function saveProperty(property: Omit<Property, "id" | "postedDate" | "photosCount" | "img" | "images"> & { img?: string }) {
  if (typeof window === "undefined") return null;
  const stored = getStoredProperties();
  
  // Set default images based on property type if none provided
  let defaultImg = "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80";
  let defaultImages = [defaultImg];
  
  if (property.type === "Plot") {
    defaultImg = "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80";
    defaultImages = [defaultImg];
  } else if (property.type === "House") {
    defaultImg = "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80";
    defaultImages = [
      defaultImg,
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&q=80"
    ];
  } else if (property.type === "Commercial") {
    defaultImg = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80";
    defaultImages = [
      defaultImg,
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80"
    ];
  } else {
    // Flat
    defaultImg = "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80";
    defaultImages = [
      defaultImg,
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80"
    ];
  }

  const newProperty: Property = {
    ...property,
    id: `u-${Date.now()}`,
    postedDate: "Just Now",
    photosCount: defaultImages.length,
    img: property.img || defaultImg,
    images: [property.img || defaultImg, ...defaultImages.slice(1)]
  };

  stored.unshift(newProperty);
  localStorage.setItem("magic_homes_properties", JSON.stringify(stored));
  return newProperty;
}

export function getMergedProperties(): Property[] {
  const userProps = getStoredProperties();
  return [...userProps, ...seedProperties];
}
