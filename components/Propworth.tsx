"use client"
import { CheckCircle } from "lucide-react";

export default function PropWorth() {
    return (
        <section className="w-full bg-white py-6">
            <div className="max-w-[1200px] mx-auto px-4">
                <div
                    className="relative rounded-2xl overflow-hidden"
                    style={{ minHeight: 220 }}
                >
                    {/* Background image */}
                    <img
                        src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=80"
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
                        <div className="w-full lg:w-[420px] lg:shrink-0">
                            <div className="bg-white/15 backdrop-blur-md rounded-2xl px-4 sm:px-6 py-5 sm:py-6 border border-white/20">
                                <div className="flex items-center gap-0 bg-white rounded-full overflow-hidden shadow-lg mb-3">
                                    <input
                                        type="text"
                                        placeholder="Enter Your Dream Location"
                                        className="flex-1 px-4 sm:px-5 py-3 sm:py-3.5 outline-none text-[#333] text-xs sm:text-sm placeholder-gray-400 bg-transparent min-w-0"
                                    />
                                    <button className="bg-primary hover:bg-primary-dark text-white font-semibold text-xs sm:text-sm m-1 px-4 sm:px-6 py-1 sm:py-2.5 rounded-full transition-colors whitespace-nowrap cursor-pointer">
                                        Search
                                    </button>
                                </div>
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