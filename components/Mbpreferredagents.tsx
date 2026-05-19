"use client"

import { useState } from "react";
import { ChevronRight, ChevronDown, Medal } from "lucide-react";

const agents = [
    {
        id: 1,
        name: "Gautam",
        initials: "GA",
        photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&q=80",
        company: "N & G Enterprises And Visiion Real Estate",
        companyLogo: null,
        operatingSince: 1987,
        buyersServed: "6000+",
        forSale: 76,
        forRent: 22,
        operatesIn: ["Hinjawadi", "Marunji", "Bhukum", "Hinjewadi Rajiv Gandhi Nagar"],
        salePriceRange: "₹42.5 Lacs – 8.50 Cr",
        rentPriceRange: "₹18,000 – 70,000",
    },
    {
        id: 2,
        name: "Omkar Mule",
        initials: "OM",
        photo: null,
        company: "Kuber Realtors",
        companyLogo: null,
        operatingSince: 2019,
        buyersServed: "1500+",
        forSale: 48,
        forRent: 9,
        operatesIn: ["Wakad", "Pimple Saudagar", "Baner", "Aundh"],
        salePriceRange: "₹30 Lacs – 5 Cr",
        rentPriceRange: "₹12,000 – 50,000",
    },
    {
        id: 3,
        name: "Netra Dudhediya",
        initials: "ND",
        photo: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=80&q=80",
        company: "N & G Enterprises And Visiion Real Estate",
        companyLogo: null,
        operatingSince: 2016,
        buyersServed: "2500+",
        forSale: 90,
        forRent: 9,
        operatesIn: ["Kharadi", "Viman Nagar", "Hadapsar", "Kalyani Nagar"],
        salePriceRange: "₹45 Lacs – 9 Cr",
        rentPriceRange: "₹20,000 – 80,000",
    },
    {
        id: 4,
        name: "Rahul Sharma",
        initials: "RS",
        photo: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=80&q=80",
        company: "Prime Realty Solutions",
        companyLogo: null,
        operatingSince: 2010,
        buyersServed: "3500+",
        forSale: 64,
        forRent: 18,
        operatesIn: ["Pune Camp", "Koregaon Park", "Boat Club Road", "Sopan Baug"],
        salePriceRange: "₹60 Lacs – 12 Cr",
        rentPriceRange: "₹25,000 – 1,20,000",
    },
];

interface Agent {
    id: number;
    name: string;
    initials: string;
    photo: string | null;
    company: string;
    companyLogo: string | null;
    operatingSince: number;
    buyersServed: string;
    forSale: number;
    forRent: number;
    operatesIn: string[];
    salePriceRange: string;
    rentPriceRange: string;
}

function PreferredBadge() {
    return (
        <div className="flex flex-col items-center">
            <div className="bg-[#e8f7fd] rounded px-2 py-0.5 flex items-center gap-1 mb-0.5">
                <Medal size={12} className="text-amber-400" />
                <span className="text-amber-400 text-[7px] font-bold uppercase tracking-wide">Preferred</span>
            </div>
            <span className="text-[7px] text-amber-400 font-semibold">AGENT</span>
        </div>
    );
}

function AgentCard({ agent }: { agent: Agent }) {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            className={`relative border border-gray-200 rounded-xl overflow-hidden bg-white cursor-pointer transition-all duration-300 ${hovered ? "shadow-xl border-gray-300 -translate-y-1" : "shadow-sm"}`}
            style={{ height: 230 }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Sliding Container */}
            <div
                className="flex flex-col transition-transform duration-500 ease-in-out"
                style={{ transform: hovered ? "translateY(-230px)" : "translateY(0)" }}
            >
                {/* VIEW 1: INITIAL STATE */}
                <div className="h-[230px] flex flex-col">
                    {/* Top Header */}
                    <div className="bg-[#E0F7FA] px-4 pt-4 pb-3 flex items-center justify-between shrink-0">
                        <div className="flex items-center gap-3">
                            {agent.photo ? (
                                <img src={agent.photo} alt={agent.name} className="w-12 h-12 rounded-lg object-cover border-2 border-white shadow-sm" />
                            ) : (
                                <div className="w-12 h-12 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-lg font-bold text-gray-500 shadow-sm">
                                    {agent.initials}
                                </div>
                            )}
                            <div>
                                <p className="text-[#0099cc] text-[10px] font-bold uppercase tracking-wider mb-0.5">MB Preferred</p>
                                <p className="text-[#1a1a1a] font-bold text-[15px] leading-tight">{agent.name}</p>
                            </div>
                        </div>
                        <PreferredBadge />
                    </div>

                    {/* Body */}
                    <div className="px-4 py-3 flex-1 bg-white flex flex-col">
                        <div className="flex items-start gap-2 mb-3 h-[25px]">
                            <div className="w-8 h-8 bg-gray-50 rounded border border-gray-100 flex items-center justify-center shrink-0">
                                <span className="text-[10px] font-bold text-gray-400">{agent.initials}</span>
                            </div>
                            <div className="flex-1">
                                <p className="text-[#333] text-[11px] mx-auto font-bold leading-tight line-clamp-2 min-h-[32px]">
                                    {agent.company}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 h-[25px]">
                            <div>
                                <p className="text-[9px] text-gray-400 font-medium uppercase">Operating Since</p>
                                <p className="text-[11px] font-semibold text-[#333]">{agent.operatingSince}</p>
                            </div>
                            <div className="w-px h-6 bg-gray-100" />
                            <div>
                                <p className="text-[9px] text-gray-400 font-medium uppercase">Buyers Served</p>
                                <p className="text-[11px] font-semibold text-[#333]">{agent.buyersServed}</p>
                            </div>
                        </div>

                        {/* Stats Row - Fixed at bottom of the white area */}
                        <div className="flex gap-4 border-t border-gray-50 pt-3 mt-auto">
                            <div className="flex-1">
                                <p className="text-2xl font-bold text-[#1a1a1a] leading-none mb-1">{agent.forSale}</p>
                                <p className="text-[9px] text-gray-500 font-semibold uppercase tracking-tighter">Properties for Sale</p>
                            </div>
                            <div className="w-px h-8 bg-gray-100" />
                            <div className="flex-1">
                                <p className="text-2xl font-bold text-[#1a1a1a] leading-none mb-1">{agent.forRent}</p>
                                <p className="text-[9px] text-gray-500 font-semibold uppercase tracking-tighter">Properties for Rent</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* VIEW 2: HOVER STATE (Replica of Reference Image) */}
                <div className="h-[230px] flex flex-col bg-white">
                    <div className="px-5 py-5 flex-1 flex flex-col">
                        {/* Operates in Section */}
                        <div className="flex items-start justify-between gap-4 mb-4">
                            <p className="text-[12px] text-[#1a1a1a] leading-tight">
                                <span className="font-bold">Operates in:</span>{" "}
                                <span className="text-[#333] font-medium">
                                    {agent.operatesIn.join(", ").length > 70
                                        ? agent.operatesIn.join(", ").substring(0, 70) + "..."
                                        : agent.operatesIn.join(", ")}
                                </span>
                            </p>
                            <ChevronDown size={16} className="text-gray-400 shrink-0" />
                        </div>

                        {/* Price Ranges Section */}
                        <div className="space-y-2 mb-4 border-t border-gray-50 pt-4">
                            <p className="text-[13px] text-[#1a1a1a] font-bold">
                                Sale Price Range - <span className="font-extrabold text-[#333]">{agent.salePriceRange}</span>
                            </p>
                            <p className="text-[13px] text-[#1a1a1a] font-bold">
                                Rent Price Range - <span className="font-extrabold text-[#333]">{agent.rentPriceRange}</span>
                            </p>
                        </div>

                        {/* Action Buttons Section */}
                        <div className="mt-auto flex items-center justify-between pt-2">
                            <button className="text-primary text-[13px] font-bold hover:underline underline-offset-4 decoration-2 transition-all">
                                View Details
                            </button>
                            <button className="bg-primary hover:bg-primary-dark text-white text-[13px] font-bold px-5 py-2 rounded-full transition-colors shadow-lg shadow-red-50">
                                View Properties
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function MBPreferredAgents() {
    return (
        <section className="w-full bg-white py-10">
            <div className="max-w-[1200px] mx-auto px-4">
                {/* Heading */}
                <div className="flex items-center justify-between mb-1">
                    <h2 className="text-[#1a1a1a] text-xl font-semibold">MB Preferred Agents in Pune</h2>
                    <a href="#" className="text-primary text-sm font-semibold flex items-center gap-1 hover:underline">
                        See all <ChevronRight size={16} />
                    </a>
                </div>
                <div className="w-10 h-[3px] bg-primary mb-6" />

                {/* Cards grid */}
                <div className="relative">
                    <div className="flex md:grid md:grid-cols-4 overflow-x-auto md:overflow-visible gap-4 pb-4 md:pb-0 [&::-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:none]">
                        {agents.map((agent) => (
                            <div key={agent.id} className="w-[285px] shrink-0 md:w-auto md:shrink">
                                <AgentCard agent={agent} />
                            </div>
                        ))}
                    </div>

                    {/* Right arrow */}
                    <button className="absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-gray-300 bg-white shadow flex items-center justify-center hover:shadow-md z-10 hidden md:flex">
                        <ChevronRight size={20} className="text-[#333]" />
                    </button>
                </div>
            </div>
        </section>
    );
}