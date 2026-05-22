const fs = require('fs');

// Read mockData.ts
const content = fs.readFileSync('components/mockData.ts', 'utf8');

// A quick and dirty regex parser to find seedProperties array
// Let's extract the seedProperties array from the file content.
// Since seedProperties is a large array, we can just compile or evaluate the file after removing TS types, or write a parser.
// But even simpler: we can just copy the active property objects from mockData.ts and test them.

const ongoing_tathastu = {
  id: "ongoing_tathastu",
  title: "Codename Tathastu - Premium Commercial NA Plots in Ghotawade",
  projectName: "Codename Tathastu",
  builderName: "Rising Spaces",
  type: "Commercial",
  bhk: 0,
  price: 45,
  priceFormatted: "₹75 Lac*",
  area: "1,886 sqft",
  locality: "Ghotawade",
  city: "Hinjawadi",
  status: "Under Construction",
  postedBy: "Builder",
  isProject: true,
  img: "/Images/Projects/tatasthu_banner.avif",
  images: [
    "/Images/Projects/tatasthu_banner.avif",
    "/Images/Projects/eco town.avif"
  ],
  photosCount: 2,
  description: "Codename Tathastu offers high-demand, masterfully planned commercial NA plots in Ghotawade near Hinjawadi IT park. Gated plotting township spread across a massive landscape with premium specifications.",
  facing: "West",
  amenities: ["Commercial Zone", "Concrete Roads", "Underground Electricity", "Water Supply", "Street Lights", "CCTV Security"],
  postedDate: "2 days ago",
  externalLink: "https://codenametathastu.com/"
};

const upcoming_aangan_18 = {
  id: "upcoming_aangan_18",
  title: "Aangan 18 - Premium Residential NA Plots in Maan",
  projectName: "Aangan 18",
  builderName: "Rising Spaces",
  type: "Plot",
  bhk: 0,
  price: 29,
  priceFormatted: "₹1.89 Cr*",
  area: "1,800 sqft",
  locality: "Maan",
  city: "Hinjawadi",
  status: "Under Construction",
  postedBy: "Builder",
  isProject: true,
  img: "/Images/Projects/Aangan 18.avif",
  images: [
    "/Images/Projects/Aangan 18.avif",
    "/Images/Projects/24K PREMIUM ASSETS.avif"
  ],
  photosCount: 2,
  description: "Aangan 18 is a highly-anticipated, upcoming premium residential plotting project in Maan, Pune. Spanning over pristine landscape near the Hinjawadi IT Hub, it features high-specification residential plotting developments under a secure gated network.",
  facing: "East",
  amenities: ["Gated Community", "Concrete Roads", "Underground Electricity", "Water Supply", "Street Lights", "CCTV Security"],
  postedDate: "Coming Soon",
  externalLink: "https://www.risingspaces.in/18-aangan"
};

const properties = [ongoing_tathastu, upcoming_aangan_18];

// Initial states as defined in page.tsx for Hinjawadi
const selectedCity = "Hinjawadi";
const searchQuery = "";
const filterTypes = ["Plot", "Villa", "Bungalow", "Resendential", "Commercial"];
const filterBhk = ["Studio", "1", "2", "3", "4", "4+", "Office"];
const maxBudget = 1000;
const filterStatus = "All";
const filterPostedBy = "All";
const activeTab = "All";

const filtered = properties.filter(p => {
  // 1. City Filter
  if (selectedCity && selectedCity.toLowerCase() !== "pune") {
    const matchCity = p.city.toLowerCase().includes(selectedCity.toLowerCase());
    const matchLocality = p.locality.toLowerCase().includes(selectedCity.toLowerCase());
    if (!matchCity && matchLocality) {
      console.log(`City filter passed for ${p.id} via locality match`);
    } else if (matchCity) {
      console.log(`City filter passed for ${p.id} via city match`);
    } else {
      console.log(`City filter failed for ${p.id}. p.city: ${p.city}, p.locality: ${p.locality}`);
      return false;
    }
  }

  // 2. Search Text Query
  if (searchQuery) {
    const terms = searchQuery.toLowerCase().split(/[\s,]+/).filter(Boolean);
    const matchQuery = terms.every(term =>
      p.title.toLowerCase().includes(term) ||
      p.locality.toLowerCase().includes(term) ||
      p.city.toLowerCase().includes(term) ||
      p.projectName.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term) ||
      (p.builderName && p.builderName.toLowerCase().includes(term))
    );
    if (!matchQuery) {
      console.log(`Search query failed for ${p.id}`);
      return false;
    }
  }

  // 3. Property Type Checklist Filter
  const matchesType = filterTypes.includes(p.type) ||
    (filterTypes.includes("Resendential") && ["Plot", "Villa", "Bungalow", "Resendential"].includes(p.type));
  if (!matchesType) {
    console.log(`Type filter failed for ${p.id}. p.type: ${p.type}`);
    return false;
  }

  // 4. BHK / Config Filter
  if (p.type === "Commercial") {
    if (!filterBhk.includes("Office")) {
      console.log(`BHK filter failed for commercial ${p.id}`);
      return false;
    }
  } else if (p.type === "Villa" || p.type === "Bungalow" || p.type === "Resendential") {
    const matches =
      (p.bhk === 0 && filterBhk.includes("Studio")) ||
      (p.bhk === 1 && filterBhk.includes("1")) ||
      (p.bhk === 2 && filterBhk.includes("2")) ||
      (p.bhk === 3 && filterBhk.includes("3")) ||
      (p.bhk === 4 && filterBhk.includes("4")) ||
      (p.bhk >= 4 && filterBhk.includes("4+"));
    if (!matches) {
      console.log(`BHK filter failed for villa/bungalow/res ${p.id}`);
      return false;
    }
  }

  // 5. Budget Range Filter
  if (p.price > maxBudget) {
    console.log(`Budget filter failed for ${p.id}. price: ${p.price}`);
    return false;
  }

  // 6. Construction Status Filter
  if (filterStatus !== "All" && p.status !== filterStatus) {
    console.log(`Status filter failed for ${p.id}`);
    return false;
  }

  // 7. Posted By Filter
  if (filterPostedBy !== "All" && p.postedBy !== filterPostedBy) {
    console.log(`PostedBy filter failed for ${p.id}`);
    return false;
  }

  // 8. Tab Filter
  if (activeTab === "Projects" && !p.isProject) {
    console.log(`Tab filter failed for project ${p.id}`);
    return false;
  }
  if (activeTab === "Properties" && p.isProject) {
    console.log(`Tab filter failed for property ${p.id}`);
    return false;
  }

  return true;
});

console.log('Filtered results count:', filtered.length);
console.log('Filtered results:', filtered.map(f => f.id));
