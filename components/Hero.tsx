"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Home, DollarSign, ChevronDown, Check } from "lucide-react";

const tabs = ["Buy", "Plot", "Residential", "Commercial"];

export default function Hero() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Buy");

  // Search State
  const [searchCity, setSearchCity] = useState("Pune");
  const [searchType, setSearchType] = useState("Flat");
  const [searchBudget, setSearchBudget] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Dropdown UI state
  const [cityOpen, setCityOpen] = useState(false);
  const [typeOpen, setTypeOpen] = useState(false);
  const [budgetOpen, setBudgetOpen] = useState(false);

  // Dropdown Refs for click-outside close
  const cityRef = useRef<HTMLDivElement>(null);
  const typeRef = useRef<HTMLDivElement>(null);
  const budgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (cityRef.current && !cityRef.current.contains(event.target as Node)) setCityOpen(false);
      if (typeRef.current && !typeRef.current.contains(event.target as Node)) setTypeOpen(false);
      if (budgetRef.current && !budgetRef.current.contains(event.target as Node)) setBudgetOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();
    params.set("city", searchCity);
    params.set("type", searchType);
    params.set("budget", searchBudget);
    if (searchQuery.trim() !== "") {
      params.set("query", searchQuery);
    }
    router.push(`/search?${params.toString()}`);
  };

  const ads = [
    {
      id: 1,
      title: (
        <>
          Share your story and <span className="font-bold">WIN</span>
          <br />
          vouchers worth <span className="font-bold">₹5000</span>
        </>
      ),
      subtext: "#SapnoKaAddress",
      bgColor: "bg-[#F5E6D3]",
      accentColor: "from-[#c8a882] to-[#e8c9a0]"
    },
    {
      id: 2,
      title: (
        <>
          Exclusive <span className="font-bold">PLOTS</span> starting
          <br />
          at <span className="font-bold">₹25 Lac*</span> in Pune
        </>
      ),
      subtext: "#InvestmentGoals",
      bgColor: "bg-[#E3F2FD]",
      accentColor: "from-[#90CAF9] to-[#BBDEFB]"
    },
    {
      id: 3,
      title: (
        <>
          Premium <span className="font-bold">COMMERCIAL</span>
          <br />
          spaces for your <span className="font-bold">BUSINESS</span>
        </>
      ),
      subtext: "#BusinessGrowth",
      bgColor: "bg-[#F1F8E9]",
      accentColor: "from-[#C5E1A5] to-[#DCEDC8]"
    }
  ];

  const [currentAd, setCurrentAd] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % ads.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full bg-white py-10 lg:py-16">
      <div className="max-w-[1200px] mx-auto px-4">

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-[#333333] text-2xl sm:text-3xl lg:text-4xl font-normal mb-0">
            Jahan Har Khwaab Ko Milta Hai{" "}
            <span className="font-bold text-primary">#SapnoKaAddress</span>{" "}

          </h1>
        </div>

        {/* Main layout: Search left, Ad right */}
        <div className="flex gap-6 items-start justify-center flex-col lg:flex-row">

          {/* Left: Search Panel */}
          <div className="w-full lg:flex-1 lg:max-w-[780px]">

            {/* Tabs */}
            <div className="flex items-center gap-2 border-b border-gray-200 mb-6 overflow-x-auto [&::-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:none] pb-1">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    // Match type to selected tab for convenience
                    if (tab === "Plot") setSearchType("Plot");
                    if (tab === "Residential") setSearchType("Residential");
                    else if (tab === "Commercial") setSearchType("Commercial");
                    else setSearchType("Flat");
                  }}
                  className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors relative ${activeTab === tab
                    ? "text-primary font-semibold"
                    : "text-[#555555] hover:text-primary"
                    }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary" />
                  )}
                </button>
              ))}
            </div>

            {/* Search Bar Wrapper */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center bg-white rounded-2xl sm:rounded-full border border-gray-300 shadow-sm overflow-visible h-auto sm:h-[56px] relative p-1.5 sm:p-0 gap-2 sm:gap-0">

              {/* Row 1: Location and Search */}
              <div className="flex flex-row flex-1 border-b sm:border-b-0 border-gray-200">
                {/* City / Locality Selector */}
                <div
                  ref={cityRef}
                  className="flex items-center gap-2 px-3 sm:px-4 border-r border-gray-200 h-[52px] sm:h-full cursor-pointer relative hover:bg-gray-50 transition-colors rounded-tl-2xl sm:rounded-l-full w-[40%] sm:w-auto sm:min-w-[180px] shrink-0"
                  onClick={() => setCityOpen(!cityOpen)}
                >
                  <MapPin size={16} className="text-primary shrink-0" />
                  <div className="flex flex-col justify-center flex-1">
                    <span className="text-[10px] text-gray-400 font-bold block uppercase leading-none mb-0.5">Location</span>
                    <span className="text-primary font-bold text-sm leading-tight flex items-center gap-1">
                      {searchCity}
                      <ChevronDown size={12} className="text-gray-500" />
                    </span>
                  </div>

                  {/* City Dropdown Menu */}
                  <AnimatePresence>
                    {cityOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute left-0 right-0 top-[105%] bg-white border border-gray-200 rounded-xl shadow-xl z-50 p-2 overflow-y-auto max-h-44 w-[150px] sm:w-[200px] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {[
                          "Pune",
                          "Chakan",
                          "Dhamane",
                          "Ghotawade",
                          "Hinjewadi",
                          "kanhe Phata",
                          "Lonvala",
                          "Malshi",
                          "Paud",
                          "Pawna",
                          "Somatnane Phata",
                          "Takwe",
                          "Tale gaav",
                          "Varale",
                          "Wakad"
                        ].map((c) => (<button
                          key={c}
                          type="button"
                          onClick={() => {
                            setSearchCity(c);
                            setCityOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 text-xs font-bold rounded-lg flex items-center justify-between transition-colors ${searchCity === c
                            ? "bg-rose-50 text-primary"
                            : "text-gray-600 hover:bg-gray-50"
                            }`}
                        >
                          {c}
                          {searchCity === c && <Check size={12} strokeWidth={3} />}
                        </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Keyword text search field */}
                <div className="w-[60%] sm:w-auto flex-1 flex items-center gap-2 px-3 sm:px-4 h-[52px] sm:h-full sm:border-r border-gray-200 rounded-tr-2xl sm:rounded-none">
                  <Search size={16} className="text-primary shrink-0 opacity-70" />
                  <div className="flex flex-col justify-center flex-1">
                    <span className="text-[10px] text-gray-400 font-bold block uppercase leading-none mb-0.5">Search</span>
                    <input
                      type="text"
                      placeholder="Locality, Project..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="outline-none border-none text-sm text-[#333] font-bold placeholder-gray-400 bg-transparent w-full h-[20px] leading-tight"
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Type and Budget */}
              <div className="flex flex-row flex-1 sm:flex-initial">
                {/* Property Type Dropdown */}
                <div
                  ref={typeRef}
                  className="flex items-center gap-2 px-3 sm:px-4 border-r border-gray-200 h-[52px] sm:h-full cursor-pointer relative hover:bg-gray-50 transition-colors rounded-bl-2xl sm:rounded-none flex-1 sm:flex-initial sm:min-w-[130px]"
                  onClick={() => setTypeOpen(!typeOpen)}
                >
                  <Home size={16} className="text-primary shrink-0" />
                  <div className="flex flex-col justify-center flex-1">
                    <span className="text-[10px] text-gray-400 font-bold block uppercase leading-none mb-0.5">Type</span>
                    <span className="text-sm font-bold text-gray-700 leading-tight flex items-center gap-1">
                      {searchType}s
                      <ChevronDown size={12} className="text-gray-500" />
                    </span>
                  </div>

                  {/* Property Type Dropdown */}
                  <AnimatePresence>
                    {typeOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute left-0 right-0 top-[105%] bg-white border border-gray-200 rounded-xl shadow-xl z-50 p-2 overflow-hidden w-[140px]"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {["Flat", "Plot", "House", "Commercial"].map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => {
                              setSearchType(t);
                              setTypeOpen(false);
                            }}
                            className={`w-full text-left px-3 py-2 text-xs font-bold rounded-lg flex items-center justify-between transition-colors ${searchType === t
                              ? "bg-rose-50 text-primary"
                              : "text-gray-600 hover:bg-gray-50"
                              }`}
                          >
                            {t}s
                            {searchType === t && <Check size={12} strokeWidth={3} />}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Budget Dropdown */}
                <div
                  ref={budgetRef}
                  className="flex items-center gap-2 px-3 sm:px-4 sm:border-r border-gray-200 h-[52px] sm:h-full cursor-pointer relative hover:bg-gray-50 transition-colors rounded-br-2xl sm:rounded-none flex-1 sm:flex-initial sm:min-w-[130px]"
                  onClick={() => setBudgetOpen(!budgetOpen)}
                >
                  <span className="text-primary font-bold text-sm shrink-0">₹</span>
                  <div className="flex flex-col justify-center flex-1">
                    <span className="text-[10px] text-gray-400 font-bold block uppercase leading-none mb-0.5">Budget</span>
                    <span className="text-sm font-bold text-gray-700 leading-tight flex items-center gap-1">
                      {searchBudget === "All" ? "Max" : `Under ₹${searchBudget}L`}
                      <ChevronDown size={12} className="text-gray-500" />
                    </span>
                  </div>

                  {/* Budget Dropdown Menu */}
                  <AnimatePresence>
                    {budgetOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute left-0 right-0 top-[105%] bg-white border border-gray-200 rounded-xl shadow-xl z-50 p-2 overflow-hidden w-[140px]"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {[
                          { val: "All", label: "Max Budget" },
                          { val: "30", label: "Under ₹30 Lac" },
                          { val: "50", label: "Under ₹50 Lac" },
                          { val: "90", label: "Under ₹90 Lac" },
                          { val: "150", label: "Under ₹1.5 Cr" },
                          { val: "300", label: "Under ₹3 Cr" },
                          { val: "500", label: "Under ₹5 Cr" }
                        ].map((item) => (
                          <button
                            key={item.val}
                            type="button"
                            onClick={() => {
                              setSearchBudget(item.val);
                              setBudgetOpen(false);
                            }}
                            className={`w-full text-left px-3 py-2 text-xs font-bold rounded-lg flex items-center justify-between transition-colors ${searchBudget === item.val
                              ? "bg-rose-50 text-primary"
                              : "text-gray-600 hover:bg-gray-50"
                              }`}
                          >
                            {item.label}
                            {searchBudget === item.val && <Check size={12} strokeWidth={3} />}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Search Button */}
              <button
                onClick={handleSearch}
                className="bg-primary hover:bg-primary-dark text-white h-[52px] sm:h-full px-8 flex items-center justify-center gap-2 font-bold text-sm transition-all shrink-0 rounded-xl sm:rounded-r-full active:scale-98 cursor-pointer mt-0 shadow-sm w-full sm:w-auto"
              >
                <Search size={16} />
                Search
              </button>
            </div>

          </div>

          {/* Right: Ad Banner */}
          <div className="w-full sm:w-[260px] shrink-0 rounded-xl overflow-hidden border border-gray-200 shadow-sm cursor-pointer group relative mx-auto lg:mx-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentAd}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className={`${ads[currentAd].bgColor} p-4 relative min-h-[140px] flex flex-col justify-between h-full`}
              >
                {/* Ad Content */}
                <div>
                  <p className="text-[#333] text-sm font-normal leading-snug">
                    {ads[currentAd].title}
                  </p>
                  <p className="text-primary font-bold text-sm mt-1">{ads[currentAd].subtext}</p>
                </div>

                {/* Person image placeholder */}
                <div className="absolute right-0 bottom-0 h-full flex items-end pointer-events-none">
                  <div className={`w-[90px] h-[120px] bg-gradient-to-t ${ads[currentAd].accentColor} rounded-tl-full opacity-60`} />
                </div>

                {/* Click Here Button */}
                <button className="bg-primary hover:bg-primary-dark text-white text-xs font-bold px-4 py-2 rounded-full w-fit transition-colors z-10 relative mt-2">
                  Click Here
                </button>

                {/* Dots */}
                <div className="flex gap-1 mt-3 z-10 relative">
                  {ads.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentAd(index);
                      }}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${currentAd === index ? "bg-primary w-4" : "bg-gray-300"
                        }`}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}