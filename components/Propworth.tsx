"use client"
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getMergedProperties } from "@/components/mockData";

export default function PropWorth() {
    const [dreamLocation, setDreamLocation] = useState("");
    const [uniqueLocations, setUniqueLocations] = useState<string[]>([]);
    const [filteredLocations, setFilteredLocations] = useState<string[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);

    const router = useRouter();
    const containerRef = useRef<HTMLDivElement>(null);

    // Close dropdown on click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Load locations dynamically from properties seed & user storage
    useEffect(() => {
        const props = getMergedProperties();
        const locSet = new Set<string>();
        props.forEach(p => {
            if (p.locality && p.city) {
                locSet.add(`${p.locality}, ${p.city}`);
            } else if (p.city) {
                locSet.add(p.city);
            }
        });
        setUniqueLocations(Array.from(locSet));
    }, []);

    // Filter locations based on input value
    useEffect(() => {
        if (!dreamLocation.trim()) {
            // Default popular suggestions when focused but empty
            const popular = ["Hinjewadi, Pune", "Maan, Hinjewadi", "Lonavala", "Paud", "Ghotawade"];
            setFilteredLocations(popular);
        } else {
            const query = dreamLocation.toLowerCase();
            const filtered = uniqueLocations.filter(loc =>
                loc.toLowerCase().includes(query)
            );
            setFilteredLocations(filtered.slice(0, 5));
        }
    }, [dreamLocation, uniqueLocations]);

    const handleSearch = () => {
        if (dreamLocation.trim()) {
            router.push(`/search?query=${encodeURIComponent(dreamLocation.trim())}`);
        } else {
            router.push("/search");
        }
        setShowDropdown(false);
    };

    const handleSelectSuggestion = (loc: string) => {
        setDreamLocation(loc);
        setShowDropdown(false);
        router.push(`/search?query=${encodeURIComponent(loc.trim())}`);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <section className="w-full bg-white py-6">
            <div className="max-w-[1200px] mx-auto px-4">
                <div
                    className="relative rounded-2xl overflow-hidden"
                    style={{ minHeight: 220 }}
                >
                    {/* Background image */}
                    <img
                        src="/Images/Projects/RedStone_Webbanner.avif"
                        alt="city"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-black/65" />

                    {/* Content */}
                    <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 px-6 py-6 lg:px-10 lg:py-10">
                        {/* Left */}
                        <div className="flex-1">
                            {/* Brand */}
                            <div className="flex items-center gap-2 mb-4">
                                {/* <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center shrink-0">
                                    <span className="text-white font-bold text-base">₹</span>
                                </div> */}
                                <span className="text-white font-bold text-2xl tracking-tight">Get Your <span className="text-primary" style={{ fontFamily: "'Dancing Script', cursive" }}>#SapnoKaAddress</span></span>
                            </div>

                            {/* Heading */}
                            <h2 className="text-white font-bold text-xl sm:text-2xl leading-snug mb-4">
                                Tell us Your <span className="text-red-600" style={{ fontFamily: "'Dancing Script', cursive" }}> Next </span> <br className="hidden sm:inline" /> Dream Home Location
                            </h2>

                            {/* Bullets */}
                            <div className="flex flex-col gap-2">
                                {[
                                    "98% faster to finding perfect home",
                                    "100% verified listings",
                                ].map((point) => (
                                    <div key={point} className="flex items-center gap-2">
                                        <CheckCircle size={16} className="text-gray-300 shrink-0" />
                                        <span className="text-gray-200 text-xs sm:text-sm">{point}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right: Search */}
                        <div className="w-full lg:w-[420px] lg:shrink-0" ref={containerRef}>
                            <div className="bg-white/15 backdrop-blur-md rounded-2xl px-4 sm:px-6 py-5 sm:py-6 border border-white/20 relative">
                                <div className="flex items-center gap-0 bg-white rounded-full overflow-hidden shadow-lg mb-3 relative">
                                    <input
                                        type="text"
                                        placeholder="Enter Your Dream Location"
                                        value={dreamLocation}
                                        onChange={(e) => {
                                            setDreamLocation(e.target.value);
                                            setShowDropdown(true);
                                        }}
                                        onFocus={() => setShowDropdown(true)}
                                        onKeyDown={handleKeyDown}
                                        className="flex-1 px-4 sm:px-5 py-3 sm:py-3.5 outline-none text-[#333] text-xs sm:text-sm placeholder-gray-400 bg-transparent min-w-0 overflow-y-scroll"
                                    />
                                    <button
                                        onClick={handleSearch}
                                        className="bg-primary hover:bg-primary-dark text-white font-semibold text-xs sm:text-sm m-1 px-4 sm:px-6 py-1 sm:py-2.5 rounded-full transition-colors whitespace-nowrap cursor-pointer"
                                    >
                                        Search
                                    </button>
                                </div>

                                {/* Autocomplete Suggestion Dropdown */}
                                <AnimatePresence>
                                    {showDropdown && filteredLocations.length > 0 && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="absolute left-4 right-4 sm:left-6 sm:right-6 top-[76px] bg-white border border-gray-200 rounded-xl shadow-xl z-50 p-2 max-h-56 overflow-y-scroll h-28 scrollbar-hide"
                                        >
                                            <div className="px-3 py-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 mb-1">
                                                {dreamLocation.trim() ? "Matching Locations" : "Popular Locations"}
                                            </div>
                                            {filteredLocations.map((loc) => (
                                                <button
                                                    key={loc}
                                                    type="button"
                                                    onClick={() => handleSelectSuggestion(loc)}
                                                    className="w-full text-left px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-rose-50 hover:text-primary rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
                                                >
                                                    <MapPin size={12} className="text-primary shrink-0" />
                                                    <span>{loc}</span>
                                                </button>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <p className="text-center text-gray-200 text-[11px] sm:text-xs">
                                    We have properties for every dream budget
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
}