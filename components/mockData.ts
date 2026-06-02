export interface Property {
  id: string | number;
  title: string;
  type: "Plot" | "Commercial" | "Villa" | "Bungalow" | "Residential";
  bhk: number; // 0 for plot/commercial
  price: number; // in Lakhs (e.g. 85 for 85 Lac, 250 for 2.5 Cr)
  priceFormatted: string; // e.g. "₹85 Lac", "₹2.5 Cr"
  area: string; // e.g. "985 sqft"
  locality: string;
  city: "Pune" | "Mumbai" | "Bangalore" | "Delhi NCR" | string;
  status: "Residential NA Plots" | "Residential Property" | "Townhouses" | "Villas" | "Commercial NA Plots" | "Commercial Property" | string;
  postedBy: "Rising Spaces";
  isProject: boolean; // True for builder project/society, false for individual owner properties
  projectName: string;
  builderName?: string;
  img: string; // Primary image
  images: string[]; // Carousel images
  imagemobile?: string;
  photosCount: number;
  description: string;
  bathrooms?: number;
  balconies?: number;
  facing?: "East" | "West" | "North" | "South" | "North-East" | "South-East";
  floor?: string;
  amenities: string[];
  postedDate: string; // "Just Now", "2 days ago", etc.
  externalLink?: string;
}

export const seedProperties: Property[] = [
  // === COMPLETED PROJECTS (READY TO MOVE) ===
  /*
  {
    id: "completed_24k_premium",
    title: "24K PREMIUM - Sanctioned Residential NA Plot in Maan",
    projectName: "24K PREMIUM",
    builderName: "Rising Spaces",
    type: "Plot",
    bhk: 0,
    price: 35,
    priceFormatted: "₹35 Lac*",
    area: "1,800 sqft",
    locality: "Maan",
    city: "Hinjawadi",
    status: "Ready to Move",
    postedBy: "Rising Spaces",
    isProject: true,
    img: "/Images/Projects/24K PREMIUM ASSETS.avif",
    images: [
      "/Images/Projects/24K PREMIUM ASSETS.avif",
      "/Images/Projects/24K REAL ASSETS.avif",
      "/Images/Projects/24K SOLITAIRE ASSETS.avif"
    ],
    photosCount: 3,
    description: "24K PREMIUM is an exclusive, fully completed gated community of premium residential NA plots in Maan, Pune. This development offers excellent connectivity, beautifully curated landscapes, wide internal concrete roads, underground electricity, and abundant water supply, making it the perfect choice for your dream villa or a secure land investment.",
    facing: "East",
    amenities: ["Gated Community", "Concrete Roads", "Underground Electricity", "Water Connection", "Street Lights", "CCTV Security", "24/7 Security", "Drainage System"],
    postedDate: "Completed Project"
  },
  {
    id: "completed_24k_real_assets",
    title: "24K REAL ASSETS - Premium Residential NA Plot in Maan",
    projectName: "24K REAL ASSETS",
    builderName: "Rising Spaces",
    type: "Plot",
    bhk: 0,
    price: 36,
    priceFormatted: "₹36 Lac*",
    area: "1,800 sqft",
    locality: "Maan",
    city: "Hinjawadi",
    status: "Ready to Move",
    postedBy: "Builder",
    isProject: true,
    img: "/Images/Projects/24K REAL ASSETS.avif",
    images: [
      "/Images/Projects/24K REAL ASSETS.avif",
      "/Images/Projects/24K PREMIUM ASSETS.avif",
      "/Images/Projects/24K SOLITAIRE ASSETS.avif"
    ],
    photosCount: 3,
    description: "24K REAL ASSETS is a highly sought-after, fully completed premium plotting development located in the rapid growth zone of Maan, Pune. Designed for luxury villa living, this gated community boasts world-class infrastructure including decorative entrance gates, continuous water connections, secure compound walls, and immediate NA allotment registry.",
    facing: "West",
    amenities: ["Gated Community", "Concrete Roads", "Underground Electricity", "Water Connection", "Street Lights", "CCTV Security", "24/7 Security", "Drainage System"],
    postedDate: "Completed Project"
  },
  {
    id: "completed_24k_solitaire_assets",
    title: "24K SOLITAIRE ASSETS - Premium Residential NA Plot in Marunji",
    projectName: "24K SOLITAIRE ASSETS",
    builderName: "Rising Spaces",
    type: "Plot",
    bhk: 0,
    price: 40,
    priceFormatted: "₹40 Lac*",
    area: "1,800 sqft",
    locality: "Marunji",
    city: "Hinjawadi",
    status: "Ready to Move",
    postedBy: "Builder",
    isProject: true,
    img: "/Images/Projects/24K SOLITAIRE ASSETS.avif",
    images: [
      "/Images/Projects/24K SOLITAIRE ASSETS.avif",
      "/Images/Projects/24K REAL ASSETS.avif",
      "/Images/Projects/24K PREMIUM ASSETS.avif"
    ],
    photosCount: 3,
    description: "24K SOLITAIRE ASSETS at Marunji, Pune is a prestigious completed plotting sanctuary nestled close to the Hinjawadi IT Hub. Offering sanctioned NA plots with crystal clear titles and premium specifications, it features elegant landscape gardens, a children's play area, robust electricity lines, and 24-hour security.",
    facing: "East",
    amenities: ["Gated Community", "Clubhouse", "Concrete Roads", "Underground Electricity", "Water Connection", "Street Lights", "CCTV Security", "24/7 Security"],
    postedDate: "Completed Project"
  },
  {
    id: "completed_bay_meadows",
    title: "BAY MEADOWS - Vogue Style Residential NA Plot in Phirangut",
    projectName: "BAY MEADOWS",
    builderName: "Rising Spaces",
    type: "Plot",
    bhk: 0,
    price: 30,
    priceFormatted: "₹30 Lac*",
    area: "1,800 sqft",
    locality: "Phirangut",
    city: "Paud",
    status: "Ready to Move",
    postedBy: "Builder",
    isProject: true,
    img: "/Images/Projects/BAY MEDOWS.avif",
    images: [
      "/Images/Projects/BAY MEDOWS.avif",
      "/Images/Projects/Joytown.avif",
      "/Images/Projects/CAMBRIDGE COUNTY.avif"
    ],
    photosCount: 3,
    description: "BAY MEADOWS in Phirangut, Pune is a stunningly completed scenic plotting community surrounded by lush greenery and nature views. Designed as a peaceful retreat that is still fully connected to the city, this project features fully developed NA plots with dedicated water points, manicured open spaces, tree plantations, and gated security.",
    facing: "North-East",
    amenities: ["Gated Community", "Beautiful Landscaping", "Concrete Roads", "Water Connection", "Street Lights", "CCTV Security", "Jogging Track"],
    postedDate: "Completed Project"
  },
  {
    id: "completed_cambridge_county",
    title: "CAMBRIDGE COUNTY - Premium Residential NA Plot near Hinjawadi",
    projectName: "CAMBRIDGE COUNTY",
    builderName: "Rising Spaces",
    type: "Plot",
    bhk: 0,
    price: 28,
    priceFormatted: "₹28 Lac*",
    area: "1,800 sqft",
    locality: "Rihe near Hinjawadi",
    city: "Hinjawadi",
    status: "Ready to Move",
    postedBy: "Builder",
    isProject: true,
    img: "/Images/Projects/CAMBRIDGE COUNTY.avif",
    images: [
      "/Images/Projects/CAMBRIDGE COUNTY.avif",
      "/Images/Projects/BAY MEDOWS.avif",
      "/Images/Projects/24K PREMIUM ASSETS.avif"
    ],
    photosCount: 3,
    description: "CAMBRIDGE COUNTY at Rihe, situated just a short drive from the Hinjawadi IT Park, is a signature completed NA plot development by Rising Spaces. Boasting breathtaking hilltop panoramas and pollution-free environments, the community provides perfectly planned plots with immediate possession, demarcated boundaries, concrete roads, and round-the-clock security.",
    facing: "East",
    amenities: ["Gated Community", "Demarcated Plots", "Concrete Roads", "Water Supply", "Street Lights", "CCTV Security"],
    postedDate: "Completed Project"
  },
  {
    id: "completed_joytown",
    title: "Joytown - Premium Residential NA Plot in Somatne Phata",
    projectName: "Joytown",
    builderName: "Rising Spaces",
    type: "Plot",
    bhk: 0,
    price: 34,
    priceFormatted: "₹34 Lac*",
    area: "1,800 sqft",
    locality: "Somatne Phata",
    city: "Somatane Phata",
    status: "Ready to Move",
    postedBy: "Builder",
    isProject: true,
    img: "/Images/Projects/Joytown.avif",
    images: [
      "/Images/Projects/Joytown.avif",
      "/Images/Projects/24K PREMIUM ASSETS.avif",
      "/Images/Projects/24K REAL ASSETS.avif"
    ],
    photosCount: 3,
    description: "Joytown at Somatne Phata, Pune is an exceptional completed residential plotting marvel by Rising Spaces. Located right off the Mumbai-Pune Expressway route, this gated project offers highly lucrative NA plots with instant registry options, underground utilities, a beautiful clubhouse, community spaces, and premium boundary walls.",
    facing: "South-East",
    amenities: ["Gated Community", "Clubhouse", "Underground Cabling", "Concrete Roads", "Water Connection", "Street Lights", "CCTV Security", "24/7 Security"],
    postedDate: "Completed Project"
  },
  {
    id: "completed_saffron_city",
    title: "SAFFRON CITY - Prime Commercial NA Plot near Hinjawadi",
    projectName: "SAFFRON CITY",
    builderName: "Rising Spaces",
    type: "Commercial",
    bhk: 0,
    price: 42,
    priceFormatted: "₹42 Lac*",
    area: "1,800 sqft",
    locality: "Rihe near Hinjawadi",
    city: "Hinjawadi",
    status: "Ready to Move",
    postedBy: "Builder",
    isProject: true,
    img: "/Images/Projects/SAFFRON CITY.avif",
    images: [
      "/Images/Projects/SAFFRON CITY.avif",
      "/Images/Projects/Streets of Europe.avif",
      "/Images/Projects/OwnEdge.avif"
    ],
    photosCount: 3,
    description: "SAFFRON CITY is a strategically completed, premium commercial NA plotting layout situated in Rihe near Hinjawadi. Designed to satisfy high-potential commercial ventures, offices, or retail outlets, it offers excellent frontage, extra-wide high-load concrete roads, commercial-grade electrical cabling, ready water lines, and supreme connectivity to major transport routes.",
    facing: "North",
    amenities: ["Commercial Zone", "Wide Roads", "High Visibility", "Underground Cabling", "Water Connection", "Street Lights", "CCTV Security"],
    postedDate: "Completed Project"
  },
  {
    id: "completed_sai_bliss",
    title: "SAI BLISS PHASE-1 & 2 - Premium Residential NA Plot in Shirgaon",
    projectName: "SAI BLISS PHASE-1 & 2",
    builderName: "Rising Spaces",
    type: "Plot",
    bhk: 0,
    price: 32,
    priceFormatted: "₹32 Lac*",
    area: "1,800 sqft",
    locality: "Shirgaon",
    city: "Kanhe Phata",
    status: "Ready to Move",
    postedBy: "Builder",
    isProject: true,
    img: "/Images/Projects/Mountville.avif",
    images: [
      "/Images/Projects/Mountville.avif",
      "/Images/Projects/beyond bliss lonavala.avif",
      "/Images/Projects/Aangan 18.avif"
    ],
    photosCount: 3,
    description: "SAI BLISS PHASE-1 & 2 is a fully completed, magnificent residential plotting development at Shirgaon, Pune. Situated in the holy town near the famous Prati Shirdi temple, this project features meticulously engineered NA plots in a tranquil environment, featuring a secure gated entrance, premium compound boundary walls, internal concrete pathways, and robust municipal water connections.",
    facing: "East",
    amenities: ["Gated Community", "Concrete Roads", "Municipal Water", "Electricity Lines", "Street Lights", "CCTV Security", "24/7 Security"],
    postedDate: "Completed Project"
  },
  {
    id: "completed_streets_of_europe",
    title: "Streets of Europe - Premium Commercial NA Plot near Wipro Circle",
    projectName: "Streets of Europe",
    builderName: "Rising Spaces",
    type: "Commercial",
    bhk: 0,
    price: 50,
    priceFormatted: "₹50 Lac*",
    area: "1,800 sqft",
    locality: "Near Wipro Circle Maan Road",
    city: "Hinjawadi",
    status: "Ready to Move",
    postedBy: "Builder",
    isProject: true,
    img: "/Images/Projects/Streets of Europe.avif",
    images: [
      "/Images/Projects/Streets of Europe.avif",
      "/Images/Projects/SAFFRON CITY.avif",
      "/Images/Projects/OwnEdge.avif"
    ],
    photosCount: 3,
    description: "Streets of Europe is an ultra-premium, fully completed commercial plotting masterpiece by Rising Spaces, located right on Maan Road near the bustling Wipro Circle in Hinjawadi, Pune. Replicating modern European high-street planning, it provides premium-grade commercial plots ideal for high-end retail, gourmet restaurants, corporate showrooms, or corporate workspaces, offering maximum footfall and visibility.",
    facing: "West",
    amenities: ["Commercial High Street", "Premium Concrete Roads", "High Visibility", "Water Connection", "Underground Cabling", "Grand Entrance", "24/7 Security"],
    postedDate: "Completed Project"
  },
  */

  // === ONGOING PROJECTS (UNDER CONSTRUCTION) ===
  {
    id: "ongoing_the_f_row",
    title: "The f Row - Vogue Villas & Sanctioned NA Plots in Paud",
    projectName: "The f Row",
    builderName: "Rising Spaces",
    type: "Plot",
    bhk: 0,
    price: 35,
    priceFormatted: "75 Lacs*",
    area: "1,800 sqft",
    locality: "Paud / Mulshi",
    city: "Paud",
    status: "Residential NA Plots",
    postedBy: "Rising Spaces",
    isProject: true,
    img: "/Images/Projects/frowinsta.jpeg",
    images: [
      "/Images/Projects/frowinsta.jpeg"
    ],
    imagemobile: "/Images/Projects/frow_banner.avif",
    photosCount: 2,
    description: "The f Row features premium fashion-inspired Vogue residential NA plots developed by Rising Spaces in Paud, Pune. It offers top-notch modern lifestyle amenities, eco-friendly planning, concrete roads, under-ground lines, and gated community features.",
    facing: "East",
    amenities: ["Gated Community", "Concrete Roads", "Underground Electricity", "Water Connection", "Street Lights", "CCTV Security"],
    postedDate: "Just Now",
    externalLink: "https://thefrow.in/"
  },
  {
    id: "ongoing_tathastu",
    title: "Codename Tathastu - Premium Commercial NA Plots in Ghotawade",
    projectName: "Codename Tathastu",
    builderName: "Rising Spaces",
    type: "Plot",
    bhk: 0,
    price: 45,
    priceFormatted: "₹83 Lacs*",
    area: "1,886 sqft",
    locality: "Ghotawade",
    city: "Hinjawadi",
    status: "Residential NA Plots",
    postedBy: "Rising Spaces",
    isProject: true,
    img: "/Images/Projects/tathastu.jpeg",
    images: [
      "/Images/Projects/tathastu.jpeg",
      "/Images/Projects/tathastu2.jpeg"
    ],
    imagemobile: "/Images/Projects/tatasthu_banner.avif",
    photosCount: 2,
    description: "Codename Tathastu offers high-demand, masterfully planned commercial NA plots in Ghotawade near Hinjawadi IT park. Gated plotting township spread across a massive landscape with premium specifications.",
    facing: "West",
    amenities: ["Commercial Zone", "Concrete Roads", "Underground Electricity", "Water Supply", "Street Lights", "CCTV Security"],
    postedDate: "2 days ago",
    externalLink: "https://codenametathastu.com/"
  },
  {
    id: "ongoing_pawna_villas",
    title: "The Pawna Villas - Waterfront Commercial NA Plots in Pawna",
    projectName: "The Pawna Villas",
    builderName: "Rising Spaces",
    type: "Plot",
    bhk: 2,
    price: 110,
    priceFormatted: "₹2.75 Cr*",
    area: "1,400 sqft",
    locality: "Pawna",
    city: "Pawna",
    status: "Residential NA Plots",
    postedBy: "Rising Spaces",
    isProject: true,
    img: "/Images/Projects/pawnalake.png",
    images: [
      "/Images/Projects/pawnalake.png",
      "/Images/Projects/pawna.png"
    ],
    imagemobile: "/Images/Projects/pawna villas banner.avif",
    photosCount: 2,
    description: "The Pawna Villas offers commercial NA land plots and spaces situated on the gorgeous waterfront of Pawna Lake near Lonavala, perfectly curated for luxury commercial developments, resorts, or lakeside retail.",
    facing: "North-East",
    amenities: ["Waterfront View", "Gated Security", "Concrete Roads", "Clubhouse", "24/7 Power Backup"],
    postedDate: "5 days ago",
    externalLink: "https://thepawnavillas.com/"
  },
  {
    id: "ongoing_ownedge",
    title: "Codename OWNEDGE - Premium Commercial NA Plots in Somatane",
    projectName: "Codename OWNEDGE",
    builderName: "Rising Spaces",
    type: "Commercial",
    bhk: 0,
    price: 25,
    priceFormatted: "60 Lacs*",
    area: "1,838 sqft",
    locality: "Somatane",
    city: "Somatane Phata",
    status: "Commercial Property",
    postedBy: "Rising Spaces",
    isProject: true,
    img: "/Images/Projects/ownedge.jpeg",
    images: [
      "/Images/Projects/ownedge.jpeg",
      "/Images/Projects/ownedge2.jpeg"
    ],
    imagemobile: "/Images/Projects/OwnEdge.avif",
    photosCount: 2,
    description: "Codename OWNEDGE is a high-visibility commercial plotting project located at Somatane Phata along the busy Expressway corridor, giving businesses the prime location edge they require.",
    facing: "South-East",
    amenities: ["Commercial Zone", "Wide Roads", "High Visibility", "Water Connection", "Underground Cabling"],
    postedDate: "1 week ago",
    externalLink: "https://www.risingspaces.in/own-edge"
  },
  {
    id: "ongoing_prakriti",
    title: "Codename Prakriti - Elite Commercial NA Plots in Kanhe Phata",
    projectName: "Codename Prakriti",
    builderName: "Rising Spaces",
    type: "Plot",
    bhk: 0,
    price: 20,
    priceFormatted: "₹19.50 Lacs*",
    area: "1,038 sqft",
    locality: "Kanhe Phata",
    city: "Kanhe Phata",
    status: "Residential NA Plots",
    postedBy: "Rising Spaces",
    isProject: true,
    img: "/Images/Projects/prakritiinsta.jpg",
    images: [
      "/Images/Projects/prakritiinsta.jpg"
    ],
    imagemobile: "/Images/Projects/Prakriti.avif",
    photosCount: 2,
    description: "Codename Prakriti features premium-grade commercial NA plotting solutions situated at Kanhe Phata along the highway, providing developers and companies excellent ROI potential.",
    facing: "East",
    amenities: ["Commercial Zone", "Concrete Roads", "High Visibility", "Water Supply", "Street Lights"],
    postedDate: "Yesterday",
    externalLink: "https://codenameprakriti.com/"
  },
  {
    id: "ongoing_pratham",
    title: "Codename Pratham - Compact Commercial NA Plots in Varale",
    projectName: "Codename Pratham",
    builderName: "Rising Spaces",
    type: "Residential",
    bhk: 0,
    price: 12,
    priceFormatted: "42 Lacs*",
    area: "435 sqft",
    locality: "Varale",
    city: "Talegaon",
    status: "Residential Property",
    postedBy: "Rising Spaces",
    isProject: true,
    img: "/Images/Projects/pratham.jpeg",
    images: [
      "/Images/Projects/pratham.jpeg"
    ],
    imagemobile: "/Images/Projects/Pratham.avif",
    photosCount: 2,
    description: "Codename Pratham provides smart-sized, high-yielding commercial NA plots located in the Varale industrial and logistics belt near Pune, perfect for office fronts and small business warehouses.",
    facing: "North",
    amenities: ["Commercial Zone", "Wide Access Roads", "Electricity Lines", "Water Supply", "Street Lights"],
    postedDate: "3 days ago",
    externalLink: "https://codenamepratham.in/"
  },
  {
    id: "ongoing_joy_estate",
    title: "Codename Joy Estate - Elite Residential NA Plots in Dhamane",
    projectName: "Codename Joy Estate",
    builderName: "Rising Spaces",
    type: "Plot",
    bhk: 0,
    price: 38,
    priceFormatted: "₹19 Lac*",
    area: "1,886 sqft",
    locality: "Dhamane",
    city: "Chakan / Talegaon MIDC",
    status: "Residential NA Plots",
    postedBy: "Rising Spaces",
    isProject: true,
    img: "/Images/Projects/joyestate.jpeg",
    images: [
      "/Images/Projects/joyestate.jpeg"
    ],
    imagemobile: "/Images/Projects/joy estate banner.avif",
    photosCount: 2,
    description: "Codename Joy Estate offers beautifully structured, premium residential NA plots in Dhamane, Pune. Nestled in tranquil landscapes, this gated retreat includes modular roads, recreation gardens, and underground cable connections.",
    facing: "East",
    amenities: ["Gated Community", "Recreational Garden", "Concrete Roads", "Underground Cabling", "Street Lights", "CCTV Security"],
    postedDate: "Just Now",
    externalLink: "https://codenamejoyestate.com/"
  },
  {
    id: "ongoing_crown_estate",
    title: "Crown Estate - Premium Commercial NA Plots in Khadkale",
    projectName: "Crown Estate",
    builderName: "Rising Spaces",
    type: "Plot",
    bhk: 0,
    price: 24,
    priceFormatted: "₹26 Lac*",
    area: "2000 sqft*",
    locality: "Khadkale",
    city: "Kamshet",
    status: "Residential NA Plots",
    postedBy: "Rising Spaces",
    isProject: true,
    img: "/Images/Projects/crownesate.jpeg",
    images: [
      "/Images/Projects/crownesate.jpeg"
    ],
    imagemobile: "/Images/Projects/crown esate.avif",
    photosCount: 2,
    description: "Crown Estate is a highly anticipated premium commercial plotting layout in Khadkale near Lonavala, featuring superior highway connectivity and massive corporate frontage.",
    facing: "West",
    amenities: ["Commercial Zone", "Gated Compound", "Wide Roads", "Electricity Supply", "CCTV Security"],
    postedDate: "4 days ago",
    externalLink: "https://crownestate.in/"
  },
  {
    id: "ongoing_mountville",
    title: "Mountville - Scenic Gated Residential NA Plots in Kanhe Phata",
    projectName: "Mountville",
    builderName: "Rising Spaces",
    type: "Plot",
    bhk: 0,
    price: 26,
    priceFormatted: "₹39 Lac*",
    area: "1,248 sqft",
    locality: "Kanhe Phata",
    city: "Kanhe Phata",
    status: "Residential NA Plots",
    postedBy: "Rising Spaces",
    isProject: true,
    img: "/Images/Projects/mountville.jpeg",
    images: [
      "/Images/Projects/mountville.jpeg"
    ],
    imagemobile: "/Images/Projects/Mountville.avif",
    photosCount: 2,
    description: "Mountville offers pristine valley-facing residential NA plots at Kanhe Phata, designed for scenic weekend villas and luxurious hill retreats under secure gated parameters.",
    facing: "East",
    amenities: ["Gated Community", "Valley Views", "Concrete Roads", "Water Connections", "Street Lights"],
    postedDate: "1 week ago",
    externalLink: "https://www.risingspaces.in/mountville"
  },
  {
    id: "ongoing_red_stone",
    title: "Red Stone - Prime Highway Commercial NA Plots in Takve",
    projectName: "Red Stone",
    builderName: "Rising Spaces",
    type: "Plot",
    bhk: 0,
    price: 40,
    priceFormatted: "₹1,499/sq.ft.",
    area: "1,800 sqft",
    locality: "Takve, Kanhe Phata",
    city: "Kanhe Phata",
    status: "Residential NA Plots",
    postedBy: "Rising Spaces",
    isProject: true,
    img: "/Images/Projects/redstoneinsta.jpg",
    images: [
      "/Images/Projects/redstoneinsta.jpg"
    ],
    imagemobile: "/Images/Projects/RedStone_Webbanner.avif",
    photosCount: 2,
    description: "Red Stone is a premium-designed commercial NA plotting landmark located in the fast-growing belt of Takve, Kanhe Phata, offering optimal land space for retail, showrooms, or depots.",
    facing: "South",
    amenities: ["Commercial Zone", "Highway Frontage", "Grand Entrance Gate", "Wide Concrete Roads", "Water Points"],
    postedDate: "2 weeks ago",
    externalLink: "https://www.risingspaces.in/red-stone"
  },
  {
    id: "ongoing_eco_town",
    title: "Eco Town - Sustainable Commercial NA Plots in Ghotawade",
    projectName: "Eco Town",
    builderName: "Rising Spaces",
    type: "Plot",
    bhk: 0,
    price: 39,
    priceFormatted: "56.34 Lacs*",
    area: "1,800 sqft",
    locality: "Ghotawade",
    city: "Ghotawade",
    status: "Residential NA Plots",
    postedBy: "Rising Spaces",
    isProject: true,
    img: "/Images/Projects/ecotown.jpg",
    images: [
      "/Images/Projects/ecotown.jpg"
    ],
    imagemobile: "/Images/Projects/eco town.avif",
    photosCount: 2,
    description: "Eco Town is a commercial plotting development with sustainable architecture in Ghotawade near Hinjawadi, incorporating eco-friendly infrastructure and modern commercial workspaces.",
    facing: "North-East",
    amenities: ["Eco-Friendly Gated", "Water Connection", "Underground Cabling", "Internal Asphalt Roads", "Street Lights"],
    postedDate: "3 days ago",
    externalLink: "https://www.risingspaces.in/eco-town"
  },

  // === UPCOMING PROJECTS (COMING SOON) ===
  {
    id: "upcoming_aangan_18",
    title: "Aangan 18 - Premium Residential NA Plots in Maan",
    projectName: "Aangan 18",
    builderName: "Rising Spaces",
    type: "Residential",
    bhk: 0,
    price: 29,
    priceFormatted: "₹1.89 Cr*",
    area: "1,800 sqft",
    locality: "Maan",
    city: "Hinjawadi",
    status: "Townhouses",
    postedBy: "Rising Spaces",
    isProject: true,
    img: "/Images/Projects/18angan.jpeg",
    images: [
      "/Images/Projects/18angan.jpeg"
    ],
    imagemobile: "/Images/Projects/Aangan 18.avif",
    photosCount: 2,
    description: "Aangan 18 is a highly-anticipated, upcoming premium residential plotting project in Maan, Pune. Spanning over pristine landscape near the Hinjawadi IT Hub, it features high-specification residential plotting developments under a secure gated network.",
    facing: "East",
    amenities: ["Gated Community", "Concrete Roads", "Underground Electricity", "Water Supply", "Street Lights", "CCTV Security"],
    postedDate: "Coming Soon",
    externalLink: "https://www.risingspaces.in/18-aangan"
  },
  {
    id: "upcoming_beyond_bliss",
    title: "Beyond Bliss Lonavala - Luxury 4 BHK Waterfront Villas",
    projectName: "Beyond Bliss Lonavala",
    builderName: "Rising Spaces",
    type: "Villa",
    bhk: 4,
    price: 250,
    priceFormatted: "Price on Request",
    area: "3,200 sqft",
    locality: "Lonavala",
    city: "Lonavala",
    status: "Villas",
    postedBy: "Rising Spaces",
    isProject: true,
    img: "/Images/Projects/beyondBliss.jpeg",
    images: [
      "/Images/Projects/beyondBliss.jpeg"
    ],
    imagemobile: "/Images/Projects/beyond bliss lonavala.avif",
    photosCount: 2,
    description: "Beyond Bliss Lonavala offers an ultra-exclusive upcoming luxury gated villa township nestled in the misty valleys of Lonavala. Beautifully constructed signature 4 BHK waterfront villas with private pools, sky gardens, and scenic terrace decks.",
    facing: "West",
    bathrooms: 4,
    balconies: 3,
    amenities: ["Private Pool", "Valley View", "Private Lawn", "Gated Security", "Clubhouse", "24/7 Power Backup"],
    postedDate: "Coming Soon",
    externalLink: "https://beyondblisslonavala.com/"
  }
];

// Helper functions for Local Storage interaction
export function getStoredProperties(): Property[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem("na_plots_properties");
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
  let defaultImg = "/Images/Projects/24K PREMIUM ASSETS.avif";
  let defaultImages = [defaultImg];

  if (property.type === "Plot") {
    defaultImg = "/Images/Projects/Aangan 18.avif";
    defaultImages = [defaultImg];
  } else if (property.type === "Villa" || property.type === "Bungalow") {
    defaultImg = "/Images/Projects/beyond bliss lonavala.avif";
    defaultImages = [
      defaultImg,
      "/Images/Projects/pawna villas banner.avif"
    ];
  } else if (property.type === "Commercial") {
    defaultImg = "/Images/Projects/SAFFRON CITY.avif";
    defaultImages = [
      defaultImg,
      "/Images/Projects/Streets of Europe.avif"
    ];
  } else {
    // Flat
    defaultImg = "/Images/Projects/24K PREMIUM ASSETS.avif";
    defaultImages = [
      defaultImg,
      "/Images/Projects/24K REAL ASSETS.avif"
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
  localStorage.setItem("na_plots_properties", JSON.stringify(stored));
  return newProperty;
}

export function getMergedProperties(): Property[] {
  const userProps = getStoredProperties();
  return [...userProps, ...seedProperties];
}
