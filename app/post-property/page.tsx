"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePopup } from "@/hooks/usePopup";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Footer from "@/components/Footer";
import { saveProperty } from "@/components/mockData";
import { 
  Building, 
  MapPin, 
  DollarSign, 
  Sparkles, 
  ArrowLeft, 
  Check, 
  Home, 
  LandPlot, 
  Briefcase, 
  Grid,
  Info,
  ShieldCheck,
  ChevronRight
} from "lucide-react";

// Pre-defined premium stock images for visual selection
const stockImages = [
  {
    id: "img-flat",
    label: "Modern High-Rise Apartment",
    type: "Flat",
    url: "/Images/Projects/24K PREMIUM ASSETS.avif"
  },
  {
    id: "img-plot",
    label: "Lush Gated Land / Plot",
    type: "Plot",
    url: "/Images/Projects/Aangan 18.avif"
  },
  {
    id: "img-commercial",
    label: "Modern Commercial Office Tower",
    type: "Commercial",
    url: "/Images/Projects/SAFFRON CITY.avif"
  },
  {
    id: "img-house",
    label: "Architectural Luxury Villa / House",
    type: "House",
    url: "/Images/Projects/beyond bliss lonavala.avif"
  }
];

export default function PostPropertyPage() {
  const router = useRouter();
  const { showPopup } = usePopup();

  // Form Fields State
  const [propertyType, setPropertyType] = useState<"Flat" | "Plot" | "House" | "Commercial">("Flat");
  const [title, setTitle] = useState("");
  const [projectName, setProjectName] = useState("");
  const [builderName, setBuilderName] = useState("");
  const [city, setCity] = useState<"Pune" | "Mumbai" | "Bangalore" | "Delhi NCR">("Pune");
  const [locality, setLocality] = useState("");
  const [price, setPrice] = useState(""); // numerical price in Lakhs
  const [area, setArea] = useState(""); // e.g. "1200"
  const [bhk, setBhk] = useState("2");
  const [bathrooms, setBathrooms] = useState("2");
  const [balconies, setBalconies] = useState("1");
  const [status, setStatus] = useState<"Ready to Move" | "Under Construction">("Ready to Move");
  const [postedBy, setPostedBy] = useState<"Owner" | "Builder" | "Agent">("Owner");
  const [facing, setFacing] = useState<"East" | "West" | "North" | "South" | "North-East" | "South-East">("East");
  const [floor, setFloor] = useState("4th out of 12 floors");
  const [description, setDescription] = useState("");
  
  // Amenities state
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([
    "24/7 Security", "Power Backup", "Clubhouse"
  ]);

  // Selected Stock Image
  const [selectedImgUrl, setSelectedImgUrl] = useState(stockImages[0].url);
  const [customImgUrl, setCustomImgUrl] = useState("");

  const allAmenities = [
    "Swimming Pool",
    "Clubhouse",
    "24/7 Security",
    "Gym",
    "Power Backup",
    "Jogging Track",
    "Kids Play Area",
    "Modular Kitchen",
    "Lift",
    "Reserved Parking",
    "CCTV Security",
    "Water Storage",
    "Private Lawn",
    "Gated Community"
  ];

  // Toggle amenity selection
  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) ? prev.filter(item => item !== amenity) : [...prev, amenity]
    );
  };

  // Form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !projectName || !locality || !price || !area) {
      showPopup("Please fill in all the required fields.", "warning", "Validation Error");
      return;
    }

    // Convert price to formatted string, e.g. "₹85 Lac" or "₹1.2 Cr"
    const priceNum = parseFloat(price);
    let priceFormatted = "";
    if (priceNum >= 100) {
      priceFormatted = `₹${(priceNum / 100).toFixed(2)} Cr`;
    } else {
      priceFormatted = `₹${priceNum} Lac`;
    }

    // Determine final image
    const finalImg = customImgUrl.trim() !== "" ? customImgUrl : selectedImgUrl;

    const propertyData = {
      title,
      projectName,
      builderName: postedBy === "Builder" ? builderName || "Premium Developer" : undefined,
      type: propertyType,
      bhk: propertyType === "Flat" || propertyType === "House" ? parseInt(bhk) : 0,
      price: priceNum,
      priceFormatted,
      area: `${area} sqft`,
      locality,
      city,
      status,
      postedBy,
      isProject: postedBy === "Builder",
      img: finalImg,
      description: description || `Premium ${propertyType} located in ${locality}, ${city}. Modern design with premium fixtures, spacious layout, excellent ventilation, and convenient access to local markets, transit hubs, and schools.`,
      bathrooms: propertyType === "Flat" || propertyType === "House" ? parseInt(bathrooms) : undefined,
      balconies: propertyType === "Flat" || propertyType === "House" ? parseInt(balconies) : undefined,
      facing,
      floor: propertyType === "Flat" || propertyType === "Commercial" ? floor : undefined,
      amenities: selectedAmenities
    };

    const saved = saveProperty(propertyData);
    
    if (saved) {
      showPopup("Success! Your property has been listed on MagicHomes. Redirecting to search results...", "success", "Property Listed", () => {
        router.push(`/search?city=${city}&type=${propertyType}&sort=recent`);
      });
    } else {
      showPopup("Failed to save property listing. Please try again.", "error", "Error");
    }
  };

  // Auto-set matching stock image based on property type selected
  const handleTypeChange = (type: "Flat" | "Plot" | "House" | "Commercial") => {
    setPropertyType(type);
    const matched = stockImages.find(img => img.type === type);
    if (matched) {
      setSelectedImgUrl(matched.url);
    }
  };

  return (
    <div className="w-full bg-[#f8f9fa] min-h-screen">
      <Navbar />

      {/* Hero Header */}
      <div className="bg-primary text-white py-12 shadow-sm">
        <div className="max-w-[800px] mx-auto px-4">
          <Link
            href="/search"
            className="inline-flex items-center gap-1.5 text-white/80 hover:text-white text-xs font-semibold uppercase tracking-wider mb-4 hover:underline"
          >
            <ArrowLeft size={14} />
            Back to Listings
          </Link>
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <span className="text-xs bg-white/20 text-yellow-300 font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                100% Free Listing
              </span>
              <h1 className="text-3xl font-extrabold mt-3 tracking-tight">
                Post your Property on MagicHomes
              </h1>
              <p className="text-white/85 text-sm mt-2 max-w-[550px] leading-relaxed">
                Connect with lakhs of verified prospective buyers or tenants without paying any brokerage. Fill out the details below to publish your property instantly!
              </p>
            </div>
            <div className="hidden md:flex items-center gap-2.5 bg-black/15 p-4 rounded-xl border border-white/10 shrink-0">
              <ShieldCheck size={28} className="text-yellow-400" />
              <div>
                <span className="text-xs font-black block">VERIFIED LEADS</span>
                <span className="text-[10px] text-white/70 block">Get direct phone & emails</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-[800px] mx-auto px-4 py-10">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Card 1: Property Type & Transaction */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-[#333] text-base font-extrabold flex items-center gap-2 mb-5 pb-3 border-b border-gray-100">
              <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-black">1</span>
              Property Basics
            </h2>

            {/* Property Type Selection */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">
                Select Property Type <span className="text-primary">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: "Flat", label: "Apartment", icon: Home },
                  { id: "Plot", label: "Plot / Land", icon: LandPlot },
                  { id: "House", label: "Villa / House", icon: Building },
                  { id: "Commercial", label: "Commercial", icon: Briefcase }
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = propertyType === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleTypeChange(item.id as any)}
                      className={`h-20 rounded-xl border p-3 flex flex-col items-center justify-center gap-1.5 transition-all font-semibold ${
                        isSelected 
                          ? "bg-primary/5 border-primary text-primary scale-102 shadow-sm" 
                          : "bg-white border-gray-200 text-gray-500 hover:border-gray-300"
                      }`}
                    >
                      <Icon size={20} />
                      <span className="text-xs">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Title / Header of Listing */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                  Listing Title <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 3 BHK Semi-Furnished Flat with Sunset Balcony"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full h-11 px-4 border border-gray-300 rounded-lg text-sm text-[#333] placeholder-gray-400 outline-none focus:border-primary transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Project/Society Name */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                    Society or Project Name <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Godrej Infinity / Standalone Building"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="w-full h-11 px-4 border border-gray-300 rounded-lg text-sm text-[#333] placeholder-gray-400 outline-none focus:border-primary"
                  />
                </div>

                {/* Posted By */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                    You Are The <span className="text-primary">*</span>
                  </label>
                  <select
                    value={postedBy}
                    onChange={(e) => setPostedBy(e.target.value as any)}
                    className="w-full h-11 px-3 border border-gray-300 rounded-lg text-sm text-[#333] outline-none focus:border-primary cursor-pointer bg-white"
                  >
                    <option value="Owner">Property Owner</option>
                    <option value="Builder">Builder / Developer</option>
                    <option value="Agent">Real Estate Agent</option>
                  </select>
                </div>
              </div>

              {postedBy === "Builder" && (
                <div className="animate-in slide-in-from-top-1 duration-200">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                    Builder Company Name <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kolte Patil Developments"
                    value={builderName}
                    onChange={(e) => setBuilderName(e.target.value)}
                    className="w-full h-11 px-4 border border-gray-300 rounded-lg text-sm text-[#333] outline-none focus:border-primary"
                  />
                </div>
              )}
            </div>

          </div>

          {/* Card 2: Location Details */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-[#333] text-base font-extrabold flex items-center gap-2 mb-5 pb-3 border-b border-gray-100">
              <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-black">2</span>
              Location Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* City Selection */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                  City <span className="text-primary">*</span>
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value as any)}
                  className="w-full h-11 px-3 border border-gray-300 rounded-lg text-sm text-[#333] outline-none focus:border-primary cursor-pointer bg-white"
                >
                  <option value="Pune">Pune</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Delhi NCR">Delhi NCR</option>
                </select>
              </div>

              {/* Locality */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                  Locality / Neighborhood <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Keshav Nagar / Worli Sea Face"
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                  className="w-full h-11 px-4 border border-gray-300 rounded-lg text-sm text-[#333] placeholder-gray-400 outline-none focus:border-primary"
                />
              </div>
            </div>

          </div>

          {/* Card 3: Specifications & Dimensions */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-[#333] text-base font-extrabold flex items-center gap-2 mb-5 pb-3 border-b border-gray-100">
              <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-black">3</span>
              Size & Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {/* Super Area in sqft */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                  Super Area (sqft) <span className="text-primary">*</span>
                </label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 1250"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="w-full h-11 px-4 border border-gray-300 rounded-lg text-sm text-[#333] placeholder-gray-400 outline-none focus:border-primary"
                />
              </div>

              {/* Construction Status */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                  Construction Status <span className="text-primary">*</span>
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="w-full h-11 px-3 border border-gray-300 rounded-lg text-sm text-[#333] outline-none focus:border-primary cursor-pointer bg-white"
                >
                  <option value="Ready to Move">Ready to Move</option>
                  <option value="Under Construction">Under Construction</option>
                </select>
              </div>
            </div>

            {/* Conditional BHK, Baths, Balconies (Flats & Houses only) */}
            {(propertyType === "Flat" || propertyType === "House") && (
              <div className="grid grid-cols-3 gap-4 mb-4 animate-in fade-in duration-200">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                    Bedrooms <span className="text-primary">*</span>
                  </label>
                  <select
                    value={bhk}
                    onChange={(e) => setBhk(e.target.value)}
                    className="w-full h-11 px-3 border border-gray-300 rounded-lg text-sm text-[#333] outline-none focus:border-primary bg-white"
                  >
                    <option value="1">1 BHK</option>
                    <option value="2">2 BHK</option>
                    <option value="3">3 BHK</option>
                    <option value="4">4+ BHK</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                    Bathrooms
                  </label>
                  <select
                    value={bathrooms}
                    onChange={(e) => setBathrooms(e.target.value)}
                    className="w-full h-11 px-3 border border-gray-300 rounded-lg text-sm text-[#333] outline-none focus:border-primary bg-white"
                  >
                    <option value="1">1 Bath</option>
                    <option value="2">2 Baths</option>
                    <option value="3">3 Baths</option>
                    <option value="4">4+ Baths</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                    Balconies
                  </label>
                  <select
                    value={balconies}
                    onChange={(e) => setBalconies(e.target.value)}
                    className="w-full h-11 px-3 border border-gray-300 rounded-lg text-sm text-[#333] outline-none focus:border-primary bg-white"
                  >
                    <option value="0">0 Balconies</option>
                    <option value="1">1 Balcony</option>
                    <option value="2">2 Balconies</option>
                    <option value="3">3+ Balconies</option>
                  </select>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Facing Direction */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                  Facing Direction
                </label>
                <select
                  value={facing}
                  onChange={(e) => setFacing(e.target.value as any)}
                  className="w-full h-11 px-3 border border-gray-300 rounded-lg text-sm text-[#333] outline-none focus:border-primary cursor-pointer bg-white"
                >
                  <option value="East">East-Facing</option>
                  <option value="West">West-Facing</option>
                  <option value="North">North-Facing</option>
                  <option value="South">South-Facing</option>
                  <option value="North-East">North-East Facing</option>
                  <option value="South-East">South-East Facing</option>
                </select>
              </div>

              {/* Floor Level (Flat and Commercial only) */}
              {(propertyType === "Flat" || propertyType === "Commercial") && (
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                    Floor Level
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 5th out of 12 floors"
                    value={floor}
                    onChange={(e) => setFloor(e.target.value)}
                    className="w-full h-11 px-4 border border-gray-300 rounded-lg text-sm text-[#333] outline-none focus:border-primary"
                  />
                </div>
              )}
            </div>

          </div>

          {/* Card 4: Pricing & Image Selection */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-[#333] text-base font-extrabold flex items-center gap-2 mb-5 pb-3 border-b border-gray-100">
              <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-black">4</span>
              Pricing & Visuals
            </h2>

            {/* Price input */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                Expected Price (In Lakhs) <span className="text-primary">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-700">₹</span>
                <input
                  type="number"
                  required
                  placeholder="e.g. 85 for 85 Lac, 250 for 2.5 Crore"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full h-11 pl-8 pr-20 border border-gray-300 rounded-lg text-sm text-[#333] font-bold outline-none focus:border-primary"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400 uppercase">
                  Lakhs Rupees
                </span>
              </div>
              <p className="text-[10px] text-gray-400 mt-1 font-semibold">
                Tip: 1 Crore is entered as 100 Lakhs, 2.5 Crore as 250 Lakhs.
              </p>
            </div>

            {/* Stock Image Selection (Clickable) */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">
                Select a Gorgeous Listing Photo <span className="text-primary">*</span>
              </label>
              <div className="grid grid-cols-2 gap-4">
                {stockImages.map((img) => {
                  const isSelected = selectedImgUrl === img.url && customImgUrl.trim() === "";
                  return (
                    <div
                      key={img.id}
                      onClick={() => {
                        setSelectedImgUrl(img.url);
                        setCustomImgUrl("");
                      }}
                      className={`rounded-xl overflow-hidden border cursor-pointer transition-all ${
                        isSelected 
                          ? "ring-3 ring-[#0F3E66] border-transparent scale-102 shadow" 
                          : "border-gray-200 opacity-60 hover:opacity-100"
                      }`}
                    >
                      <div className="h-28 w-full bg-gray-100 relative">
                        <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                        {isSelected && (
                          <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center text-white text-xs shadow">
                            <Check size={12} strokeWidth={3} />
                          </div>
                        )}
                      </div>
                      <div className="p-2 text-center bg-gray-50">
                        <span className="text-[10px] font-bold text-gray-700 block truncate">{img.label}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Custom Image URL */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                Or Enter A Custom Photo URL
              </label>
              <input
                type="url"
                placeholder="https://images.unsplash.com/photo-... (optional)"
                value={customImgUrl}
                onChange={(e) => setCustomImgUrl(e.target.value)}
                className="w-full h-11 px-4 border border-gray-300 rounded-lg text-sm text-[#333] outline-none focus:border-primary"
              />
            </div>

          </div>

          {/* Card 5: Amenities & Description */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-[#333] text-base font-extrabold flex items-center gap-2 mb-5 pb-3 border-b border-gray-100">
              <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-black">5</span>
              Description & Amenities
            </h2>

            {/* Amenities Checklist */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">
                Select Available Amenities
              </label>
              <div className="flex flex-wrap gap-2">
                {allAmenities.map((amenity) => {
                  const isSelected = selectedAmenities.includes(amenity);
                  return (
                    <button
                      key={amenity}
                      type="button"
                      onClick={() => toggleAmenity(amenity)}
                      className={`h-9 px-3.5 rounded-full border text-xs font-bold transition-all flex items-center gap-1.5 ${
                        isSelected
                          ? "bg-primary text-white border-transparent shadow-sm"
                          : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      {isSelected ? <Check size={12} strokeWidth={3} /> : null}
                      {amenity}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Detailed Description */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                Detailed Property Description
              </label>
              <textarea
                rows={5}
                placeholder="Give a compelling description about property highlights, location advantages, connectivity, furnishings, neighborhood, etc..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg text-sm text-[#333] placeholder-gray-400 outline-none focus:border-primary resize-none"
              />
            </div>

          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3.5 border border-gray-300 rounded-lg text-xs font-extrabold text-gray-700 bg-white hover:bg-gray-50 transition-colors uppercase tracking-wide"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-4 bg-primary hover:bg-primary-dark text-white rounded-lg text-xs font-black transition-all shadow-md hover:shadow-lg active:scale-99 flex items-center justify-center gap-2 uppercase tracking-widest"
            >
              <Sparkles size={16} />
              Publish Listing Free
            </button>
          </div>

        </form>
      </div>

      <Footer />
    </div>
  );
}
