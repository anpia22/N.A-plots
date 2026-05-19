"use client"

import { useState } from "react";
import Link from "next/link";
import { Image, ChevronRight } from "lucide-react";

const properties = [
    {
        id: 1,
        type: "The f Row - Vogue Villas & NA Plots",
        price: "₹35 Lac*",
        area: "1,500 - 3,500 sqft",
        locality: "Paud Mulshi, Pune",
        status: "New Launch",
        photos: 12,
        img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80",
    },
    {
        id: 2,
        type: "Codename Tathastu - Premium NA Plots",
        price: "₹45 Lac*",
        area: "1,200 - 2,500 sqft",
        locality: "Ghotawade, Near Hinjewadi, Pune",
        status: "Under Construction",
        photos: 8,
        img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&q=80",
    },
    {
        id: 3,
        type: "The Pawna Villas - Waterfront Luxury Villas",
        price: "Price on Request",
        area: "2,500 - 5,000 sqft",
        locality: "Pawna Lake, near Lonavala, Pune",
        status: "Gated Community",
        photos: 15,
        img: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=400&q=80",
    },
    {
        id: 4,
        type: "Codename OWNEDGE - Commercial NA Plots",
        price: "₹25 Lac*",
        area: "1,500 - 3,000 sqft",
        locality: "Somatane Phata, Pune",
        status: "Ongoing Project",
        photos: 6,
        img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80",
    },
];

export default function PopularOwnerProperties() {
    return (
        <section className="w-full bg-white py-10">
            <div className="max-w-[1200px] mx-auto px-4">

                {/* Heading Row */}
                <div className="flex items-center justify-between mb-1">
                    <h2 className="text-[#333] text-xl font-semibold">
                        Exclusive Projects
                    </h2>
                    <Link
                        href="/search"
                        className="text-primary text-sm font-semibold flex items-center gap-1 hover:underline no-underline"
                    >
                        See all Projects <ChevronRight size={16} />
                    </Link>
                </div>
                <div className="w-10 h-[3px] bg-[#FFC107] mb-6" />

                {/* Cards + Arrow */}
                <div className="relative">
                    <div className="flex md:grid md:grid-cols-4 overflow-x-auto md:overflow-visible gap-4 pb-4 md:pb-0 [&::-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:none]">
                        {properties.map((p) => (
                            <div
                                key={p.id}
                                className="w-[280px] shrink-0 md:w-auto md:shrink group rounded-xl border border-gray-200 overflow-hidden cursor-pointer hover:shadow-md transition-shadow bg-white flex flex-col"
                            >
                                {/* Image */}
                                <div className="relative h-[185px] bg-gray-100">
                                    <img
                                        src={p.img}
                                        alt={p.type}
                                        className="w-full h-full object-cover"
                                    />
                                    {/* Photo count badge */}
                                    <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded flex items-center gap-1">
                                        <Image size={11} />
                                        {p.photos}
                                    </div>
                                </div>

                                {/* Details */}
                                <div className="p-3 flex-1 flex flex-col">
                                    <p className="text-[#555] text-sm mb-1">{p.type}</p>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-[#333] font-bold text-base">{p.price}</span>
                                        {p.area && (
                                            <>
                                                <span className="text-gray-300">|</span>
                                                <span className="text-[#333] font-bold text-base">{p.area}</span>
                                            </>
                                        )}
                                    </div>
                                    <p className="text-[#555] text-xs leading-snug mb-2">{p.locality}</p>

                                    {/* Hover Action Container */}
                                    <div className="relative mt-auto h-7 overflow-hidden">
                                        <p className="text-[#555] text-xs transition-transform duration-300 group-hover:-translate-y-full">
                                            {p.status}
                                        </p>
                                        <button className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-primary text-white text-[10px] font-bold uppercase rounded-full flex items-center justify-center">
                                            View Detail
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Arrow */}
                    <button className="absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-gray-300 bg-white shadow flex items-center justify-center hover:shadow-md transition-shadow hidden md:flex">
                        <ChevronRight size={20} className="text-[#333]" />
                    </button>
                </div>

            </div>
        </section>
    );
}