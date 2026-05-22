"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { usePopup } from "@/hooks/usePopup";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RequirementForm from "@/components/RequirementForm";
import {
  getMergedProperties,
  Property
} from "@/components/mockData";
import {
  Search,
  MapPin,
  Home,
  DollarSign,
  ChevronDown,
  SlidersHorizontal,
  Heart,
  Share2,
  Image as ImageIcon,
  Check,
  X,
  Phone,
  Mail,
  User,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Info,
  Sparkles
} from "lucide-react";
function mapQueryTypeToFilterTypes(type: string): { filterTypes: string[], selectedType: string } {
  const t = type.toLowerCase();
  if (t === "villa" || t === "villas") {
    return { filterTypes: ["Villa"], selectedType: "Villa" };
  }
  if (t === "bungalow" || t === "bungalows") {
    return { filterTypes: ["Bungalow"], selectedType: "Bungalow" };
  }
  if (t === "house") {
    return { filterTypes: ["Villa", "Bungalow"], selectedType: "Villa" };
  }
  if (t === "plot" || t === "plots") {
    return { filterTypes: ["Plot"], selectedType: "Plot" };
  }
  if (t === "commercial") {
    return { filterTypes: ["Commercial"], selectedType: "Commercial" };
  }
  if (t === "residential" || t === "resendential") {
    return { filterTypes: ["Plot", "Villa", "Bungalow", "Resendential"], selectedType: "Resendential" };
  }
  return { filterTypes: ["Plot", "Villa", "Bungalow", "Resendential", "Commercial"], selectedType: "All" };
}

function SearchResultsContent({ localityOverride, typeOverride }: { localityOverride?: string; typeOverride?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showPopup } = usePopup();

  // Map slug to city/locality names
  const slugToLocalityMap: Record<string, string> = {
    "hinjawadi": "Hinjawadi",
    "lonavala": "Lonavala",
    "pawna": "Pawna",
    "kanhe-phata": "Kanhe Phata",
    "chakan": "Chakan",
    "dhamane": "Dhamane",
    "ghotawade": "Ghotawade",
    "mulshi": "Mulshi",
    "paud": "Paud",
    "somatane-phata": "Somatane Phata",
    "takve": "Takve",
    "talegaon": "Talegaon",
    "varale": "Varale",
    "wakad": "Wakad",
    "pune": "Pune",
    "kamshet": "Kamshet",
    "chakan-talegaon-midc": "Chakan / Talegaon MIDC",
  };

  const getDisplayNameFromSlug = (slug: string): string => {
    const dec = decodeURIComponent(slug);
    if (slugToLocalityMap[dec]) return slugToLocalityMap[dec];
    // Case-insensitive check of keys
    const lowerDec = dec.toLowerCase();
    if (slugToLocalityMap[lowerDec]) return slugToLocalityMap[lowerDec];
    // Fallback: replace hyphens with spaces and capitalize
    return dec
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // URL parameters
  const hasOverride = !!localityOverride;
  const overrideName = localityOverride ? getDisplayNameFromSlug(localityOverride) : "";

  // If it's a known city/locality option, set it as the initial city. Otherwise default to "Pune" or URL parameter.
  const initialCity = hasOverride
    ? (Object.values(slugToLocalityMap).includes(overrideName) ? overrideName : "Pune")
    : (searchParams.get("city") || "Pune");

  const initialType = typeOverride || searchParams.get("type") || "All";
  const initialBudget = searchParams.get("budget") || "All";

  // If it's NOT a known city option but has an override, use it as the search query. Otherwise default to URL parameter.
  const initialQuery = hasOverride
    ? (Object.values(slugToLocalityMap).includes(overrideName) ? "" : overrideName)
    : (searchParams.get("query") || "");

  // Component States
  const [properties, setProperties] = useState<Property[]>([]);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCity, setSelectedCity] = useState(initialCity);

  const mappedInitial = mapQueryTypeToFilterTypes(initialType);
  const [selectedType, setSelectedType] = useState(mappedInitial.selectedType);
  const [selectedBudget, setSelectedBudget] = useState(initialBudget);

  // Sidebar Filters
  const [filterTypes, setFilterTypes] = useState<string[]>(mappedInitial.filterTypes);
  const [filterBhk, setFilterBhk] = useState<string[]>(["Studio", "1", "2", "3", "4", "4+", "Office"]);
  const [maxBudget, setMaxBudget] = useState<number>(
    initialBudget !== "All" ? parseInt(initialBudget) : 1000 // In Lakhs
  );
  const [filterStatus, setFilterStatus] = useState<string>("All"); // "All", "Ready to Move", "Under Construction"
  const [filterPostedBy, setFilterPostedBy] = useState<string>("All"); // "All", "Owner", "Builder", "Agent"

  // Tabs & Sorting
  const [activeTab, setActiveTab] = useState<"All" | "Projects" | "Properties">("All"); // "Projects" is isProject=true, "Properties" is isProject=false
  const [sortBy, setSortBy] = useState<string>("relevance"); // "relevance", "low-to-high", "high-to-low", "recent"

  // Carousel image index tracker per property ID
  const [imageIndices, setImageIndices] = useState<Record<string, number>>({});

  // Shortlisted items
  const [shortlisted, setShortlisted] = useState<Record<string, boolean>>({});

  // Modals state
  const [contactProperty, setContactProperty] = useState<Property | null>(null);
  const [detailProperty, setDetailProperty] = useState<Property | null>(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isReqModalOpen, setIsReqModalOpen] = useState(false);

  // Lead form states
  const [leadName, setLeadName] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadMessage, setLeadMessage] = useState("");
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  // Load properties from state (seed + localStorage)
  useEffect(() => {
    setProperties(getMergedProperties());
  }, []);

  // Update filters if search parameters change in URL
  useEffect(() => {
    const city = searchParams.get("city");
    const type = searchParams.get("type");
    const budget = searchParams.get("budget");
    const query = searchParams.get("query");

    if (city) setSelectedCity(city);
    if (type) {
      const { filterTypes: mapped, selectedType: sel } = mapQueryTypeToFilterTypes(type);
      setSelectedType(sel);
      setFilterTypes(mapped);
    }
    if (budget) {
      setSelectedBudget(budget);
      setMaxBudget(budget !== "All" ? parseInt(budget) : 1000);
    }
    if (query) setSearchQuery(query);
  }, [searchParams]);

  // Map city display names to URL slugs
  const cityToSlugMap: Record<string, string> = {
    "Pune": "pune",
    "Chakan": "chakan",
    "Dhamane": "dhamane",
    "Ghotawade": "ghotawade",
    "Hinjawadi": "hinjawadi",
    "Kanhe Phata": "kanhe-phata",
    "Lonavala": "lonavala",
    "Mulshi": "Mulshi",
    "Paud": "paud",
    "Pawna": "pawna",
    "Somatane Phata": "somatane-phata",
    "Takve": "takve",
    "Talegaon": "talegaon",
    "Varale": "varale",
    "Wakad": "wakad",
    "Kamshet": "kamshet",
    "Chakan / Talegaon MIDC": "chakan-talegaon-midc",
  };

  // Map property type display values to URL prefixes
  const typeToSlugPrefixMap: Record<string, string> = {
    "All": "property",
    "Plot": "plots",
    "Villa": "villas",
    "Bungalow": "bungalow",
    "Resendential": "resendential",
    "Commercial": "commercial",
  };

  // Build city slug from selectedCity state (fallback to "pune")
  const getCurrentCitySlug = () => cityToSlugMap[selectedCity] || "pune";

  // Navigate to /{type-prefix}-in-{city-slug} when a city is selected
  const handleCityChange = (cityName: string) => {
    setSelectedCity(cityName);
    const citySlug = cityToSlugMap[cityName] || "pune";
    const typePrefix = typeToSlugPrefixMap[selectedType] || "property";
    router.push(`/${typePrefix}-in-${citySlug}`);
  };

  // Navigate to /{type-prefix}-in-{city-slug} when a type is selected
  const handleTypeRouteChange = (typeVal: string) => {
    handleQuickTypeChange(typeVal);
    const citySlug = getCurrentCitySlug();
    const typePrefix = typeToSlugPrefixMap[typeVal] || "property";
    router.push(`/${typePrefix}-in-${citySlug}`);
  };

  // Handle Search submit from upper bar
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Build query params
    const params = new URLSearchParams();
    params.set("city", selectedCity);
    params.set("type", selectedType);
    params.set("budget", selectedBudget);
    if (searchQuery) params.set("query", searchQuery);

    router.push(`/search?${params.toString()}`);
  };

  // Quick filters helper
  const handleQuickBudgetChange = (bVal: string) => {
    setSelectedBudget(bVal);
    if (bVal === "All") {
      setMaxBudget(1000);
    } else {
      setMaxBudget(parseInt(bVal));
    }
  };

  const handleQuickTypeChange = (tVal: string) => {
    const { filterTypes: mapped, selectedType: sel } = mapQueryTypeToFilterTypes(tVal);
    setSelectedType(sel);
    setFilterTypes(mapped);
  };

  // Toggle checklist filters
  const toggleFilterType = (type: string) => {
    setFilterTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const toggleFilterBhk = (bhkVal: string) => {
    setFilterBhk(prev =>
      prev.includes(bhkVal) ? prev.filter(b => b !== bhkVal) : [...prev, bhkVal]
    );
  };

  // Carousel handler
  const prevImage = (propId: string | number, maxImages: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setImageIndices(prev => {
      const current = prev[propId] || 0;
      const nextIndex = current === 0 ? maxImages - 1 : current - 1;
      return { ...prev, [propId]: nextIndex };
    });
  };

  const nextImage = (propId: string | number, maxImages: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setImageIndices(prev => {
      const current = prev[propId] || 0;
      const nextIndex = current === maxImages - 1 ? 0 : current + 1;
      return { ...prev, [propId]: nextIndex };
    });
  };

  // Shortlist handler
  const toggleShortlist = (propId: string | number, e: React.MouseEvent) => {
    e.stopPropagation();
    setShortlisted(prev => ({
      ...prev,
      [propId]: !prev[propId]
    }));
  };

  // Share handler
  const handleShare = (p: Property, e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.origin + `/search?query=${encodeURIComponent(p.projectName)}`);
      showPopup(`Listing link copied to clipboard: ${p.projectName} - ${p.locality}!`, "success", "Link Copied");
    } else {
      showPopup(`Sharing: ${p.title} at ${p.locality}`, "info");
    }
  };

  // Submit Contact Lead Form
  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadPhone || !leadEmail) {
      showPopup("Please fill in all required fields.", "warning", "Validation Error");
      return;
    }
    setLeadSubmitted(true);
    setTimeout(() => {
      // Clear lead capture state and close modal
      setLeadSubmitted(false);
      setLeadName("");
      setLeadPhone("");
      setLeadEmail("");
      setLeadMessage("");
      setContactProperty(null);
      showPopup("Thank you! The property advertiser will contact you shortly.", "success", "Request Sent");
    }, 1500);
  };

  // Filtering Logic
  const filteredProperties = properties.filter(p => {
    // 1. City Filter
    if (selectedCity && selectedCity.toLowerCase() !== "pune") {
      const matchCity = p.city.toLowerCase().includes(selectedCity.toLowerCase());
      const matchLocality = p.locality.toLowerCase().includes(selectedCity.toLowerCase());
      if (!matchCity && !matchLocality) {
        return false;
      }
    }

    // 2. Search Text Query (matches project name, locality, city, title, description)
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

      if (!matchQuery) return false;
    }

    // 3. Property Type Checklist Filter
    const matchesType = filterTypes.includes(p.type) ||
      (filterTypes.includes("Resendential") && ["Plot", "Villa", "Bungalow", "Resendential"].includes(p.type));
    if (!matchesType) {
      return false;
    }

    // 4. BHK / Config Filter
    if (p.type === "Commercial") {
      if (!filterBhk.includes("Office")) return false;
    } else if (p.type === "Villa" || p.type === "Bungalow" || p.type === "Resendential") {
      const matches =
        (p.bhk === 0 && filterBhk.includes("Studio")) ||
        (p.bhk === 1 && filterBhk.includes("1")) ||
        (p.bhk === 2 && filterBhk.includes("2")) ||
        (p.bhk === 3 && filterBhk.includes("3")) ||
        (p.bhk === 4 && filterBhk.includes("4")) ||
        (p.bhk >= 4 && filterBhk.includes("4+"));
      if (!matches) return false;
    }

    // 5. Budget Range Filter
    if (p.price > maxBudget) {
      return false;
    }

    // 6. Construction Status Filter
    if (filterStatus !== "All" && p.status !== filterStatus) {
      return false;
    }

    // 7. Posted By Filter
    if (filterPostedBy !== "All" && p.postedBy !== filterPostedBy) {
      return false;
    }

    // 8. Tab Filter (All, Projects, Properties)
    if (activeTab === "Projects" && !p.isProject) {
      return false;
    }
    if (activeTab === "Properties" && p.isProject) {
      return false;
    }

    return true;
  });

  // Sorting Logic
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    if (sortBy === "low-to-high") {
      return a.price - b.price;
    }
    if (sortBy === "high-to-low") {
      return b.price - a.price;
    }
    if (sortBy === "recent") {
      // Local storage properties start with 'u-', so we put them first
      const aIsUser = typeof a.id === "string" && a.id.startsWith("u-");
      const bIsUser = typeof b.id === "string" && b.id.startsWith("u-");
      if (aIsUser && !bIsUser) return -1;
      if (!aIsUser && bIsUser) return 1;
      return 0;
    }
    // relevance - default ordering (retains array seed sequence)
    return 0;
  });

  return (
    <div className="w-full bg-[#f8f9fa] min-h-screen overflow-x-hidden">
      <Navbar />

      {/* Dynamic Sub-header Search Bar */}
      <div className="w-full bg-white border-b border-gray-200 py-3 shadow-sm sticky top-20 z-40">
        <div className="max-w-[1200px] mx-auto px-4">
          <form onSubmit={handleSearchSubmit}>

            {/* Mobile Layout: 2 rows. Desktop: single row */}
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">

              {/* Row 1 on mobile: City + Filter button */}
              <div className="flex items-center gap-2 w-full md:w-auto md:shrink-0">

                {/* City Selector */}
                <div className="relative flex-1 md:flex-initial md:min-w-[140px]">
                  <select
                    value={selectedCity}
                    onChange={(e) => handleCityChange(e.target.value)}
                    className="w-full h-10 md:h-11 px-3 bg-gray-50 border border-gray-300 rounded-3xl text-sm text-[#333] font-semibold outline-none focus:border-primary cursor-pointer appearance-none pr-8"
                  >
                    <option value="Pune">Pune</option>
                    <option value="Chakan">Chakan</option>
                    <option value="Chakan / Talegaon MIDC">Chakan / Talegaon MIDC</option>
                    <option value="Dhamane">Dhamane</option>
                    <option value="Ghotawade">Ghotawade</option>
                    <option value="Hinjawadi">Hinjawadi</option>
                    <option value="Kamshet">Kamshet</option>
                    <option value="Kanhe Phata">Kanhe Phata</option>
                    <option value="Lonavala">Lonavala</option>
                    <option value="Mulshi">Mulshi</option>
                    <option value="Paud">Paud</option>
                    <option value="Pawna">Pawna</option>
                    <option value="Somatane Phata">Somatane Phata</option>
                    <option value="Takve">Takve</option>
                    <option value="Talegaon">Talegaon</option>
                    <option value="Varale">Varale</option>
                    <option value="Wakad">Wakad</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                </div>

                {/* Filter Toggle Button — only visible on mobile/tablet */}
                <button
                  type="button"
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="lg:hidden shrink-0 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 h-10 md:h-11 w-10 md:w-auto md:px-4 rounded-lg flex items-center justify-center gap-2 font-bold text-sm transition-all shadow-sm active:scale-95"
                  title="Show Filters"
                >
                  <SlidersHorizontal size={16} className="text-primary" />
                  <span className="hidden md:inline">Filters</span>
                </button>

              </div>

              {/* Row 2 on mobile: Search input (full width) */}
              <div className="flex-1 relative w-full">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary" />
                <input
                  type="text"
                  placeholder="Enter Locality, Project name or Keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10 md:h-11 pl-10 pr-4 bg-gray-50 border border-gray-300 rounded-3xl text-sm text-[#333] placeholder-gray-400 outline-none focus:border-primary focus:bg-white transition-all"
                />
              </div>

              {/* Quick Type Selection — desktop only */}
              <div className="relative min-w-[140px] hidden md:block">
                <select
                  value={selectedType}
                  onChange={(e) => handleTypeRouteChange(e.target.value)}
                  className="w-full h-11 px-3 bg-gray-50 border border-gray-300 rounded-3xl text-sm text-[#333] outline-none focus:border-primary cursor-pointer appearance-none pr-8"
                >
                  <option value="All">All Types</option>
                  <option value="Plot">Plot</option>
                  <option value="Villa">Villa</option>
                  <option value="Bungalow">Bungalow</option>
                  <option value="Resendential">Resendential</option>
                  <option value="Commercial">Commercial</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>

              {/* Quick Budget Selection — desktop only */}
              <div className="relative min-w-[140px] hidden md:block">
                <select
                  value={selectedBudget}
                  onChange={(e) => handleQuickBudgetChange(e.target.value)}
                  className="w-full h-11 px-3 bg-gray-50 border border-gray-300 rounded-3xl text-sm text-[#333] outline-none focus:border-primary cursor-pointer appearance-none pr-8"
                >
                  <option value="All">Max Budget</option>
                  <option value="30">₹30 Lac</option>
                  <option value="50">₹50 Lac</option>
                  <option value="90">₹90 Lac</option>
                  <option value="150">₹1.5 Cr</option>
                  <option value="300">₹3 Cr</option>
                  <option value="500">₹5 Cr</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>

              {/* Desktop Filter button */}
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(true)}
                className="hidden lg:flex shrink-0 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 h-11 px-4 rounded-lg items-center justify-center gap-2 font-bold text-sm transition-all shadow-sm active:scale-95"
                title="Show Filters"
              >
                <SlidersHorizontal size={16} className="text-primary" />
                Filters
              </button>

            </div>
          </form>
        </div>
      </div>

      {/* Main Results Layout */}
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        <div className="flex gap-6 items-start w-full min-w-0">

          {/* LEFT SIDEBAR: FILTERS */}
          <aside className="w-[280px] shrink-0 bg-white rounded-xl border border-gray-200 shadow-sm p-5 sticky top-40 hidden lg:block">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-5">
              <h3 className="font-bold text-[#333] text-sm flex items-center gap-2">
                <SlidersHorizontal size={16} className="text-primary" />
                Filters
              </h3>
              <button
                onClick={() => {
                  setFilterTypes(["Plot", "Villa", "Bungalow", "Resendential", "Commercial"]);
                  setFilterBhk(["Studio", "1", "2", "3", "4", "4+", "Office"]);
                  setMaxBudget(1000);
                  setFilterStatus("All");
                  setFilterPostedBy("All");
                  setSelectedBudget("All");
                  setSelectedType("All");
                  setSearchQuery("");
                }}
                className="text-xs text-gray-400 hover:text-primary font-semibold hover:underline"
              >
                Reset All
              </button>
            </div>

            {/* Filter Section: Property Type */}
            <div className="mb-6">
              <h4 className="font-bold text-[#333] text-xs uppercase tracking-wide mb-3">Property Type</h4>
              <div className="space-y-2">
                {["Plot", "Villa", "Bungalow", "Resendential", "Commercial"].map((t) => (
                  <label key={t} className="flex items-center gap-2.5 text-sm text-gray-600 hover:text-gray-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filterTypes.includes(t)}
                      onChange={() => toggleFilterType(t)}
                      className="w-4.5 h-4.5 accent-primary rounded border-gray-300 focus:ring-0 cursor-pointer"
                    />
                    <span>{t}s</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Filter Section: BHK / Config Type */}
            <div className="mb-6">
              <h4 className="font-bold text-[#333] text-xs uppercase tracking-wide mb-3">Configuration</h4>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { val: "Studio", label: "Studio" },
                  { val: "1", label: "1 BHK" },
                  { val: "2", label: "2 BHK" },
                  { val: "3", label: "3 BHK" },
                  { val: "4", label: "4 BHK" },
                  { val: "4+", label: "4+ BHK" },
                  { val: "Office", label: "Office" },
                ].map(({ val, label }) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => toggleFilterBhk(val)}
                    className={`h-9 rounded-3xl border text-xs font-semibold flex items-center justify-center transition-all ${filterBhk.includes(val)
                      ? "bg-primary/10 border-primary text-primary"
                      : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter Section: Budget Slider */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-[#333] text-xs uppercase tracking-wide">Max Budget</h4>
                <span className="text-xs font-bold text-primary">
                  {maxBudget >= 100 ? `₹${(maxBudget / 100).toFixed(2)} Cr` : `₹${maxBudget} Lac`}
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="1000"
                step="10"
                value={maxBudget}
                onChange={(e) => setMaxBudget(parseInt(e.target.value))}
                className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary mb-3"
              />
              <div className="flex justify-between text-[10px] text-gray-400 font-semibold">
                <span>₹10 Lac</span>
                <span>₹5 Cr</span>
                <span>₹10 Cr+</span>
              </div>
            </div>

            {/* Filter Section: Construction Status */}
            <div className="mb-6">
              <h4 className="font-bold text-[#333] text-xs uppercase tracking-wide mb-3">Construction Status</h4>
              <div className="space-y-2">
                {[
                  { label: "All Statuses", val: "All" },
                  { label: "Ready to Move", val: "Ready to Move" },
                  { label: "Under Construction", val: "Under Construction" }
                ].map((s) => (
                  <label key={s.val} className="flex items-center gap-2.5 text-sm text-gray-600 hover:text-gray-800 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      checked={filterStatus === s.val}
                      onChange={() => setFilterStatus(s.val)}
                      className="w-4 h-4 accent-primary cursor-pointer"
                    />
                    <span>{s.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Filter Section: Posted By */}
            <div className="mb-2">
              <h4 className="font-bold text-[#333] text-xs uppercase tracking-wide mb-3">Posted By</h4>
              <div className="space-y-2">
                {[
                  { label: "All Properties", val: "All" },
                  { label: "Direct Owner", val: "Owner" },
                  { label: "Builder / Society", val: "Builder" },
                  { label: "Real Estate Agent", val: "Agent" }
                ].map((p) => (
                  <label key={p.val} className="flex items-center gap-2.5 text-sm text-gray-600 hover:text-gray-800 cursor-pointer">
                    <input
                      type="radio"
                      name="postedBy"
                      checked={filterPostedBy === p.val}
                      onChange={() => setFilterPostedBy(p.val)}
                      className="w-4 h-4 accent-primary cursor-pointer"
                    />
                    <span>{p.label}</span>
                  </label>
                ))}
              </div>
            </div>

          </aside>

          {/* RIGHT SIDE: LISTINGS LIST */}
          <main className="flex-1 w-full min-w-0">

            {/* Top Bar: Tabs, Summary & Sorting */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 mb-6">

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-3 mb-3 w-full min-w-0">

                {/* Custom MagicBricks Category Tabs */}
                <div className="flex items-center gap-1 md:gap-2 bg-gray-50 p-1 rounded-3xl w-full md:w-fit overflow-x-auto scrollbar-hide">
                  {[
                    { id: "All", label: "All Results" },
                    { id: "Projects", label: "Projects / Societies" },
                    { id: "Properties", label: "Owner Properties" }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`px-4 py-2 text-[11px] md:text-xs font-bold rounded-3xl transition-all whitespace-nowrap shrink-0 text-center flex-1 md:flex-none ${activeTab === tab.id
                        ? "bg-white text-primary shadow-sm"
                        : "text-gray-500 hover:text-gray-800"
                        }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Sorting Select */}
                <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
                  <span className="text-xs text-gray-400 font-semibold whitespace-nowrap">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="h-9 px-3 bg-white border border-gray-200 rounded-3xl text-xs text-[#333] font-bold outline-none cursor-pointer focus:border-primary"
                  >
                    <option value="relevance">Popularity / Relevance</option>
                    <option value="low-to-high">Price: Low to High</option>
                    <option value="high-to-low">Price: High to Low</option>
                    <option value="recent">Recently Added / Listed</option>
                  </select>
                </div>

              </div>

              {/* Summary Text */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                <p className="text-xs sm:text-sm text-gray-500 m-0 leading-relaxed">
                  Showing <span className="font-bold text-gray-800">{sortedProperties.length}</span> properties and projects found in{" "}
                  <span className="font-bold text-primary">{selectedCity}</span>
                </p>

                <div
                  onClick={() => setIsReqModalOpen(true)}
                  className="text-[11px] sm:text-xs text-primary-orange hover:text-primary-orange-dark font-bold flex items-center gap-1 hover:underline cursor-pointer shrink-0 self-start sm:self-auto"
                >
                  <Sparkles size={13} className="shrink-0" />
                  <span className="whitespace-nowrap">Your dream home is waiting!</span>
                </div>
              </div>

            </div>

            {/* List of cards */}
            <div className="space-y-6">
              {sortedProperties.length > 0 ? (
                sortedProperties.map((p) => {
                  const currentImgIdx = imageIndices[p.id] || 0;
                  const isUserProperty = typeof p.id === "string" && p.id.startsWith("u-");

                  return (
                    <article
                      key={p.id}
                      onClick={() => {
                        if (p.externalLink) {
                          window.open(p.externalLink, "_blank", "noopener,noreferrer");
                        } else {
                          setDetailProperty(p);
                        }
                      }}
                      className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col md:flex-row hover:shadow-md transition-shadow cursor-pointer relative group"
                    >
                      {/* Left side: Premium Image Gallery / Slider */}
                      <div
                        className="w-full md:w-[320px] h-[220px] md:h-auto shrink-0 bg-gray-900 relative overflow-hidden"
                        onClick={(e) => e.stopPropagation()} // Stop propagation from card click
                      >
                        <img
                          src={p.images[currentImgIdx]}
                          alt={p.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />

                        {/* Shadow overlays */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                        {/* Image Controls */}
                        {p.images.length > 1 && (
                          <>
                            <button
                              onClick={(e) => prevImage(p.id, p.images.length, e)}
                              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors shadow-sm"
                            >
                              <ChevronLeft size={16} />
                            </button>
                            <button
                              onClick={(e) => nextImage(p.id, p.images.length, e)}
                              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors shadow-sm"
                            >
                              <ChevronRight size={16} />
                            </button>
                          </>
                        )}

                        {/* Badges on Image */}
                        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 pointer-events-none">
                          <span className="bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-3xl flex items-center gap-1">
                            <ImageIcon size={10} />
                            {p.photosCount} Photos
                          </span>
                          {p.isProject ? (
                            <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-3xl shadow-sm">
                              PROJECT
                            </span>
                          ) : (
                            <span className="bg-[#2563EB] text-white text-[10px] font-bold px-2 py-0.5 rounded-3xl shadow-sm">
                              PROPERTY
                            </span>
                          )}
                        </div>

                        {/* Verified/RERA Badge */}
                        <div className="absolute bottom-3 left-3 pointer-events-none">
                          {p.isProject ? (
                            <span className="bg-emerald-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-3xl tracking-wide uppercase flex items-center gap-1 shadow-sm">
                              <Check size={10} strokeWidth={3} /> RERA Approved
                            </span>
                          ) : (
                            <span className="bg-[#FFC107] text-[#333] text-[10px] font-extrabold px-2 py-0.5 rounded-3xl tracking-wide uppercase flex items-center gap-1 shadow-sm">
                              <Check size={10} strokeWidth={3} /> Verified
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Right side: Detailed Property Info */}
                      <div className="flex-1 p-5 flex flex-col justify-between">

                        {/* Upper Section: Titles & badging */}
                        <div>

                          {/* Owner/Builder Tag + Time */}
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[11px] font-bold text-gray-400 tracking-wide uppercase flex items-center gap-1">
                              Posted by {p.postedBy} • {p.postedDate}
                              {isUserProperty && (
                                <span className="bg-yellow-100 text-yellow-800 text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase ml-1.5 border border-yellow-300">
                                  Your Listing
                                </span>
                              )}
                            </span>

                            {/* Action Icons */}
                            {/* <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                              <button
                                onClick={(e) => toggleShortlist(p.id, e)}
                                className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${shortlisted[p.id]
                                  ? "bg-rose-50 border-rose-200 text-rose-500 scale-110"
                                  : "bg-white border-gray-200 text-gray-400 hover:text-rose-500 hover:bg-rose-50/50"
                                  }`}
                                title="Shortlist Property"
                              >
                                <Heart size={15} fill={shortlisted[p.id] ? "currentColor" : "none"} />
                              </button>
                              <button
                                onClick={(e) => handleShare(p, e)}
                                className="w-8 h-8 rounded-full border border-gray-200 bg-white text-gray-400 hover:text-gray-600 hover:bg-gray-50 flex items-center justify-center transition-all"
                                title="Share Listing"
                              >
                                <Share2 size={14} />
                              </button>
                            </div> */}
                          </div>

                          {/* Property Title */}
                          <h3 className="text-[#333] group-hover:text-primary text-base sm:text-lg font-bold leading-snug mb-1 transition-colors">
                            {p.bhk > 0 ? `${p.bhk} BHK ` : ""}{p.type} {p.type === "Plot" ? "for Sale in" : "for Sale in"} {p.projectName}
                          </h3>

                          {/* Locality */}
                          <p className="text-gray-500 text-sm flex items-center gap-1 mb-4">
                            <MapPin size={13} className="text-gray-400" />
                            {p.locality}, {p.city}
                          </p>

                          {/* Key Properties Grid */}
                          <div className="grid grid-cols-3 gap-2 py-3 border-y border-gray-100 mb-4 bg-gray-50/50 rounded-lg px-3">
                            <div>
                              <span className="text-[10px] text-gray-400 font-semibold block uppercase">Super Area</span>
                              <span className="text-xs font-bold text-gray-700">{p.area || "N/A"}</span>
                            </div>
                            <div>
                              <span className="text-[10px] text-gray-400 font-semibold block uppercase">Status</span>
                              <span className="text-xs font-bold text-gray-700">{p.status}</span>
                            </div>
                            <div>
                              <span className="text-[10px] text-gray-400 font-semibold block uppercase">Price/sqft</span>
                              <span className="text-xs font-bold text-gray-700">
                                {p.area ? `₹${Math.round((p.price * 100000) / parseInt(p.area.replace(/,/g, "")))}/sqft` : "₹3,200/sqft"}
                              </span>
                            </div>
                          </div>

                          {/* Description snippet */}
                          <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-4">
                            {p.description}
                          </p>

                        </div>

                        {/* Lower Section: Price and Contacts */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-2 border-t border-gray-100 mt-auto gap-3">

                          {/* Price Display */}
                          <div className="flex flex-col">
                            <span className="text-[#333] text-xl font-extrabold tracking-tight">
                              {p.priceFormatted}
                            </span>
                            <span className="text-[10px] text-gray-400 font-semibold">Government Charges Extra</span>
                          </div>

                          {/* CTA Actions */}
                          <div className="flex items-center gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={() => {
                                if (p.externalLink) {
                                  window.open(p.externalLink, "_blank", "noopener,noreferrer");
                                } else {
                                  setDetailProperty(p);
                                }
                              }}
                              className="h-9 px-3 sm:px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-3xl text-xs font-bold transition-all border border-gray-200 flex items-center justify-center whitespace-nowrap"
                            >
                              <Maximize2 size={12} className="mr-1" />
                              View Project
                            </button>
                            <button
                              onClick={() => setContactProperty(p)}
                              className="h-9 px-3 sm:px-5 bg-primary hover:bg-primary-dark text-white rounded-3xl text-xs font-bold transition-all flex items-center justify-center shadow-sm hover:shadow active:scale-95 whitespace-nowrap"
                            >
                              <Phone size={12} className="mr-1" />
                              Contact {p.postedBy === "Builder" ? "Builder" : "Owner"}
                            </button>
                          </div>

                        </div>

                      </div>
                    </article>
                  );
                })
              ) : (
                /* No Results State with Requirement Form */
                <div className="space-y-8 my-6">
                  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 text-center max-w-[650px] mx-auto">
                    <div className="w-16 h-16 bg-rose-50 text-primary rounded-full flex items-center justify-center mx-auto mb-4 border border-rose-100">
                      <Info size={30} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">No Matching Properties Found</h3>
                    <p className="text-gray-500 text-sm mb-6 leading-relaxed max-w-[500px] mx-auto">
                      We couldn't find any listings matching your search criteria in <span className="font-bold text-primary">{selectedCity}</span>. Try adjusting your filters or clearing search text.
                    </p>
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => {
                          setFilterTypes(["Plot", "Villa", "Bungalow", "Resendential", "Commercial"]);
                          setFilterBhk(["Studio", "1", "2", "3", "4", "4+", "Office"]);
                          setMaxBudget(1000);
                          setFilterStatus("All");
                          setFilterPostedBy("All");
                          setSelectedBudget("All");
                          setSelectedType("All");
                          setSearchQuery("");
                        }}
                        className="px-5 py-2.5 border border-gray-300 rounded-xl text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Clear All Filters
                      </button>
                    </div>
                  </div>

                  {/* Gorgeous Requirement Form Embedded Inline */}
                  <div className="max-w-[700px] mx-auto">
                    <RequirementForm
                      initialCity={selectedCity}
                      initialType={selectedType}
                      initialBudget={selectedBudget}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Bottom listing CTA banner */}
            <div className="bg-gradient-to-r from-[#0F3E66] to-rose-700 text-white rounded-xl p-6 shadow-md mt-10 flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-lg mb-1 flex flex-wrap items-center gap-2">
                  <Sparkles size={18} className="text-yellow-300 animate-pulse" />
                  Did you found your  <span className="text-yellow-300 font-bold">#SapnoKaAddress</span>?
                </h3>
                <p className="text-white/80 text-xs max-w-[650px] leading-relaxed">
                  Let us know your property requirements to find your Dream Address.
                </p>
              </div>
              <div
                onClick={() => setIsReqModalOpen(true)}
                className="cursor-pointer bg-white hover:bg-gray-100 text-primary px-6 py-3 rounded-full text-xs font-bold transition-all shadow-md shrink-0 flex items-center gap-1 uppercase tracking-wide hover:-translate-y-0.5"
              >
                Post Requirement <span className="bg-[#FFC107] text-[#333] text-[9px] font-black px-1.5 py-0.5 rounded-full ml-1 leading-none">FREE</span>
              </div>
            </div>

          </main>
        </div>
      </div>

      <Footer />

      {/* LEAD CAPTURE POPUP / MODAL */}
      {contactProperty && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setContactProperty(null)}>
          <div
            className="bg-white rounded-3xl w-full max-w-[480px] shadow-2xl overflow-hidden relative border border-gray-100 animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header branding */}
            <div className="bg-primary text-white p-5 relative">
              <button
                onClick={() => setContactProperty(null)}
                className="absolute right-4 top-4 text-white/80 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
              <span className="text-[10px] bg-white/20 uppercase tracking-widest px-2 py-0.5 rounded-full font-bold">
                LEAD INQUIRY FORM
              </span>
              <h3 className="font-extrabold text-lg mt-2 mb-1 leading-snug">
                Contact {contactProperty.postedBy === "Builder" ? "Builder" : "Owner"}
              </h3>
              <p className="text-white/80 text-xs leading-relaxed truncate">
                For: {contactProperty.bhk > 0 ? `${contactProperty.bhk} BHK ` : ""}{contactProperty.type} at {contactProperty.projectName}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleLeadSubmit} className="p-6">

              {leadSubmitted ? (
                /* Success Submited message inside the form container */
                <div className="py-8 text-center">
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-100 animate-bounce">
                    <Check size={32} strokeWidth={3} />
                  </div>
                  <h4 className="font-bold text-gray-800 text-lg mb-1">Inquiry Sent Successfully!</h4>
                  <p className="text-gray-500 text-xs">
                    Your interest has been logged. The advertiser is being notified.
                  </p>
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                        Your Full Name <span className="text-primary">*</span>
                      </label>
                      <div className="relative">
                        <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          required
                          placeholder="John Doe"
                          value={leadName}
                          onChange={(e) => setLeadName(e.target.value)}
                          className="w-full h-11 pl-10 pr-4 border border-gray-300 rounded-lg text-sm text-[#333] placeholder-gray-400 outline-none focus:border-primary"
                        />
                      </div>
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                        Your Phone Number <span className="text-primary">*</span>
                      </label>
                      <div className="relative">
                        <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="tel"
                          required
                          placeholder="+91 XXXXX XXXXX"
                          value={leadPhone}
                          onChange={(e) => setLeadPhone(e.target.value)}
                          className="w-full h-11 pl-10 pr-4 border border-gray-300 rounded-lg text-sm text-[#333] placeholder-gray-400 outline-none focus:border-primary"
                        />
                      </div>
                    </div>

                    {/* Email Address */}
                    <div>
                      <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                        Your Email <span className="text-primary">*</span>
                      </label>
                      <div className="relative">
                        <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="email"
                          required
                          placeholder="johndoe@email.com"
                          value={leadEmail}
                          onChange={(e) => setLeadEmail(e.target.value)}
                          className="w-full h-11 pl-10 pr-4 border border-gray-300 rounded-lg text-sm text-[#333] placeholder-gray-400 outline-none focus:border-primary"
                        />
                      </div>
                    </div>

                    {/* Custom Message */}
                    <div>
                      <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                        Inquiry Message
                      </label>
                      <textarea
                        rows={3}
                        placeholder={`Hi, I am interested in your ${contactProperty.bhk > 0 ? `${contactProperty.bhk} BHK ` : ""}${contactProperty.type} in ${contactProperty.projectName}. Please send me the brochure and details.`}
                        value={leadMessage}
                        onChange={(e) => setLeadMessage(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg text-sm text-[#333] placeholder-gray-400 outline-none focus:border-primary resize-none"
                      />
                    </div>
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    className="w-full h-12 bg-primary hover:bg-primary-dark text-white rounded-lg font-bold text-sm transition-all mt-6 shadow-sm hover:shadow flex items-center justify-center gap-2"
                  >
                    <Mail size={16} />
                    Send Inquiry Details
                  </button>

                  <p className="text-[10px] text-gray-400 text-center mt-3.5 leading-relaxed">
                    By submitting this, you agree to our <Link href="/terms-and-conditions" className="underline hover:text-primary font-semibold">Terms & Conditions</Link> & <Link href="/privacy-policy" className="underline hover:text-primary font-semibold">Privacy Policy</Link>. Your details will be sent directly to the advertiser.
                  </p>
                </>
              )}

            </form>
          </div>
        </div>
      )}

      {/* FULL PROPERTY SPECIFICATIONS / DETAILS MODAL */}
      {detailProperty && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto scrollbar-hide " onClick={() => setDetailProperty(null)}>
          <div
            className="bg-white rounded-2xl w-full max-w-[750px] shadow-2xl overflow-y-scroll scrollbar-hide h-[90vh] relative border border-gray-100 animate-in fade-in zoom-in-95 duration-200 my-8"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <style dangerouslySetInnerHTML={{
              __html: `
              ::-webkit-scrollbar {
                display: none !important;
                width: 0 !important;
                height: 0 !important;
              }
              * {
                scrollbar-width: none !important;
                -ms-overflow-style: none !important;
              }
            `}} />
            {/* Header Image Slider */}
            <div className="h-[280px] w-full bg-gray-900 relative">
              <img
                src={detailProperty.img}
                alt={detailProperty.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

              <button
                onClick={() => setDetailProperty(null)}
                className="absolute right-4 top-4 w-9 h-9 rounded-full bg-black/60 text-white/90 hover:text-white flex items-center justify-center hover:bg-black/80 transition-colors shadow-sm"
              >
                <X size={20} />
              </button>

              <div className="absolute bottom-5 left-5 text-white">
                <span className="text-[10px] bg-[#FFC107] text-[#333] font-black uppercase tracking-wider px-2 py-0.5 rounded mr-2">
                  {detailProperty.status}
                </span>
                <span className="text-[10px] bg-[#2563EB] text-white font-extrabold uppercase tracking-wider px-2 py-0.5 rounded">
                  {detailProperty.postedBy} Listed
                </span>
                <h3 className="font-extrabold text-2xl mt-2 mb-1">
                  {detailProperty.projectName}
                </h3>
                <p className="text-white/80 text-xs flex items-center gap-1 font-semibold">
                  <MapPin size={12} className="text-rose-500" />
                  {detailProperty.locality}, {detailProperty.city}
                </p>
              </div>
            </div>

            {/* Content Specifications */}
            <div className="p-6 max-h-[60vh] overflow-y-auto">

              {/* Top Title & pricing bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-gray-100 gap-4 mb-6">
                <div>
                  <h4 className="font-bold text-gray-800 text-lg">
                    {detailProperty.bhk > 0 ? `${detailProperty.bhk} BHK ` : ""}{detailProperty.type} for Sale
                  </h4>
                  <p className="text-gray-400 text-xs mt-0.5">Listed ID: {detailProperty.id} • Posted {detailProperty.postedDate}</p>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-2xl font-black text-primary block">
                    {detailProperty.priceFormatted}
                  </span>
                  <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wide">
                    {detailProperty.area || "2,200 sqft"} (Super Area)
                  </span>
                </div>
              </div>

              {/* Specifications Grid */}
              <div className="mb-6">
                <h5 className="font-bold text-gray-800 text-sm uppercase tracking-wide mb-3 border-l-3 border-primary pl-2">Key Highlights & Specs</h5>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <div>
                    <span className="text-[10px] text-gray-400 font-semibold block uppercase">Property Type</span>
                    <span className="text-sm font-bold text-gray-700">{detailProperty.type}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-semibold block uppercase">Construction Status</span>
                    <span className="text-sm font-bold text-gray-700">{detailProperty.status}</span>
                  </div>
                  {detailProperty.bhk > 0 && (
                    <>
                      <div>
                        <span className="text-[10px] text-gray-400 font-semibold block uppercase">Bedrooms</span>
                        <span className="text-sm font-bold text-gray-700">{detailProperty.bhk} BHK</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-gray-400 font-semibold block uppercase">Bathrooms</span>
                        <span className="text-sm font-bold text-gray-700">{detailProperty.bathrooms || 2} Baths</span>
                      </div>
                    </>
                  )}
                  {detailProperty.facing && (
                    <div>
                      <span className="text-[10px] text-gray-400 font-semibold block uppercase">Facing</span>
                      <span className="text-sm font-bold text-gray-700">{detailProperty.facing}</span>
                    </div>
                  )}
                  {detailProperty.floor && (
                    <div>
                      <span className="text-[10px] text-gray-400 font-semibold block uppercase">Floor Level</span>
                      <span className="text-sm font-bold text-gray-700 line-clamp-1">{detailProperty.floor}</span>
                    </div>
                  )}
                  {detailProperty.balconies !== undefined && (
                    <div>
                      <span className="text-[10px] text-gray-400 font-semibold block uppercase">Balconies</span>
                      <span className="text-sm font-bold text-gray-700">{detailProperty.balconies}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-[10px] text-gray-400 font-semibold block uppercase">Listed By</span>
                    <span className="text-sm font-bold text-gray-700">{detailProperty.postedBy}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h5 className="font-bold text-gray-800 text-sm uppercase tracking-wide mb-2.5 border-l-3 border-primary pl-2">Overview Description</h5>
                <p className="text-gray-500 text-sm leading-relaxed whitespace-pre-line">
                  {detailProperty.description}
                </p>
              </div>

              {/* Amenities */}
              <div>
                <h5 className="font-bold text-gray-800 text-sm uppercase tracking-wide mb-3 border-l-3 border-primary pl-2">Community & Plot Amenities</h5>
                <div className="flex flex-wrap gap-2">
                  {detailProperty.amenities.map((item, idx) => (
                    <span key={idx} className="bg-rose-50 text-primary border border-rose-100 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                      <Check size={12} className="stroke-[#0F3E66]" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Footer buttons */}
            <div className="bg-gray-50 p-5 border-t border-gray-100 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 font-bold block uppercase tracking-wide">Listed Price:</span>
                <span className="text-lg font-black text-gray-800">{detailProperty.priceFormatted}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setDetailProperty(null)}
                  className="px-5 py-2.5 border border-gray-300 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setContactProperty(detailProperty);
                    setDetailProperty(null);
                  }}
                  className="px-5 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-lg text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 active:scale-95"
                >
                  <Phone size={12} />
                  Contact Advertiser
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* MOBILE FILTERS DRAWER */}
      {isMobileFilterOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden flex justify-end animate-in fade-in duration-200"
          onClick={() => setIsMobileFilterOpen(false)}
        >
          <div
            className="w-full max-w-[340px] bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden relative animate-in slide-in-from-right duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h3 className="font-bold text-[#333] text-sm flex items-center gap-2">
                <SlidersHorizontal size={16} className="text-primary" />
                Filters
              </h3>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-800 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Scrollable Filters Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">

              {/* Filter Section: Property Type */}
              <div className="mb-6">
                <h4 className="font-bold text-[#333] text-xs uppercase tracking-wide mb-3">Property Type</h4>
                <div className="space-y-2">
                  {["Plot", "Villa", "Bungalow", "Resendential", "Commercial"].map((t) => (
                    <label key={t} className="flex items-center gap-2.5 text-sm text-gray-600 hover:text-gray-800 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filterTypes.includes(t)}
                        onChange={() => toggleFilterType(t)}
                        className="w-4.5 h-4.5 accent-primary rounded border-gray-300 focus:ring-0 cursor-pointer"
                      />
                      <span>{t}s</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Filter Section: Config Type */}
              <div className="mb-6">
                <h4 className="font-bold text-[#333] text-xs uppercase tracking-wide mb-3">Configuration</h4>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { val: "Studio", label: "Studio" },
                    { val: "1", label: "1 BHK" },
                    { val: "2", label: "2 BHK" },
                    { val: "3", label: "3 BHK" },
                    { val: "4", label: "4 BHK" },
                    { val: "4+", label: "4+ BHK" },
                    { val: "Office", label: "Office" },
                  ].map(({ val, label }) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => toggleFilterBhk(val)}
                      className={`h-9 rounded-lg border text-xs font-semibold flex items-center justify-center transition-all ${filterBhk.includes(val)
                        ? "bg-primary/10 border-primary text-primary"
                        : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                        }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filter Section: Budget Slider */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-[#333] text-xs uppercase tracking-wide">Max Budget</h4>
                  <span className="text-xs font-bold text-primary">
                    {maxBudget >= 100 ? `₹${(maxBudget / 100).toFixed(2)} Cr` : `₹${maxBudget} Lac`}
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="1000"
                  step="10"
                  value={maxBudget}
                  onChange={(e) => setMaxBudget(parseInt(e.target.value))}
                  className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary mb-3"
                />
                <div className="flex justify-between text-[10px] text-gray-400 font-semibold">
                  <span>₹10 Lac</span>
                  <span>₹5 Cr</span>
                  <span>₹10 Cr+</span>
                </div>
              </div>

              {/* Filter Section: Construction Status */}
              <div className="mb-6">
                <h4 className="font-bold text-[#333] text-xs uppercase tracking-wide mb-3">Construction Status</h4>
                <div className="space-y-2">
                  {[
                    { label: "All Statuses", val: "All" },
                    { label: "Ready to Move", val: "Ready to Move" },
                    { label: "Under Construction", val: "Under Construction" }
                  ].map((s) => (
                    <label key={s.val} className="flex items-center gap-2.5 text-sm text-gray-600 hover:text-gray-800 cursor-pointer">
                      <input
                        type="radio"
                        name="status-mobile"
                        checked={filterStatus === s.val}
                        onChange={() => setFilterStatus(s.val)}
                        className="w-4 h-4 accent-primary cursor-pointer"
                      />
                      <span>{s.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Filter Section: Posted By */}
              <div className="mb-2">
                <h4 className="font-bold text-[#333] text-xs uppercase tracking-wide mb-3">Posted By</h4>
                <div className="space-y-2">
                  {[
                    { label: "All Properties", val: "All" },
                    { label: "Direct Owner", val: "Owner" },
                    { label: "Builder / Society", val: "Builder" },
                    { label: "Real Estate Agent", val: "Agent" }
                  ].map((p) => (
                    <label key={p.val} className="flex items-center gap-2.5 text-sm text-gray-600 hover:text-gray-800 cursor-pointer">
                      <input
                        type="radio"
                        name="postedBy-mobile"
                        checked={filterPostedBy === p.val}
                        onChange={() => setFilterPostedBy(p.val)}
                        className="w-4 h-4 accent-primary cursor-pointer"
                      />
                      <span>{p.label}</span>
                    </label>
                  ))}
                </div>
              </div>

            </div>

            {/* Sticky Drawer Footer actions */}
            <div className="p-4 border-t border-gray-100 bg-gray-50 flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setFilterTypes(["Plot", "Villa", "Bungalow", "Resendential", "Commercial"]);
                  setFilterBhk(["Studio", "1", "2", "3", "4", "4+", "Office"]);
                  setMaxBudget(1000);
                  setFilterStatus("All");
                  setFilterPostedBy("All");
                  setSelectedBudget("All");
                  setSelectedType("All");
                  setSearchQuery("");
                }}
                className="flex-1 h-11 border border-gray-300 rounded-lg text-xs font-bold text-gray-700 bg-white hover:bg-gray-100 transition-all active:scale-95"
              >
                Reset All
              </button>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 h-11 bg-primary hover:bg-primary-dark text-white rounded-lg text-xs font-bold transition-all shadow-sm hover:shadow flex items-center justify-center active:scale-95"
              >
                Apply Filters
              </button>
            </div>

          </div>
        </div>
      )}

      {/* REQUIREMENT FORM MODAL */}
      {isReqModalOpen && (
        <RequirementForm
          isModal={true}
          onClose={() => setIsReqModalOpen(false)}
          initialCity={selectedCity}
          initialType={selectedType}
          initialBudget={selectedBudget}
        />
      )}

    </div>
  );
}

interface SearchResultsPageProps {
  localityOverride?: string;
  typeOverride?: string;
}

export default function SearchResultsPage({ localityOverride, typeOverride }: SearchResultsPageProps) {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50 flex-col gap-3">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <span className="text-sm font-semibold text-gray-500">Loading premium real-estate results...</span>
      </div>
    }>
      <SearchResultsContent localityOverride={localityOverride} typeOverride={typeOverride} />
    </Suspense>
  );
}
