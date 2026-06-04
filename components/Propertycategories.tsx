"use client"
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function PropertyCategories() {
    const ads = [
        {
            id: 1,
            title: "Vogue Living at Mulshi",
            highlight: "The f ROW",
            subtitle: "Luxury Gated Community",
            reward: "Sanctioned Residential NA Plots",
            buttonText: "Explore Now",
            image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80",
            bgColor: "#F0FDF4",
            accentColor: "#15803D",
            externalLink: "https://thefrow.in/"
        },
        {
            id: 2,
            title: "Prime Commercial Plots",
            highlight: "Codename Tathastu",
            subtitle: "Near Hinjawadi IT Hub",
            reward: "High ROI NA Plot Investments",
            buttonText: "Enquire Now",
            image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&q=80",
            bgColor: "#EFF6FF",
            accentColor: "#1D4ED8",
            externalLink: "https://codenametathastu.com/"
        },
        {
            id: 3,
            title: "Scenic Lakeside Homes",
            highlight: "The Pawna Villas",
            subtitle: "Premium Weekend Retreat",
            reward: "Breathtaking Pawna Lake Views",
            buttonText: "Book Visit",
            image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=400&q=80",
            bgColor: "#FFF5F5",
            accentColor: "#E11D48",
            externalLink: "https://thepawnavillas.com/"
        }
    ];

    const [currentAdIndex, setCurrentAdIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentAdIndex((prev) => (prev + 1) % ads.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    const cards = [
        {
            id: 1,
            // count: "25+",
            label: "Residential NA Plots",
            explore: true,
            bg: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&q=80",
            href: "/search?type=Plot",
        },
        {
            id: 2,
            // count: "5+",
            label: "Commercial Properties",
            explore: true,
            bg: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80",
            href: "/search?type=Commercial",
        },
        {
            id: 3,
            isAd: true,
        },
        {
            id: 4,
            // count: "11+",
            label: "Ongoing Projects",
            explore: true,
            bg: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=400&q=80",
            href: "/search?status=Under Construction",
        },
    ];

    const handleAdClick = () => {
        const ad = ads[currentAdIndex];
        if (ad.externalLink) {
            window.open(ad.externalLink, "_blank", "noopener,noreferrer");
        }
    };

    return (
        <section className="w-full bg-white pt-4 pb-10 z-10">
            <div className="max-w-[1200px] mx-auto px-4">
                {/* Heading */}
                <h2 className="text-[#333] text-xl font-semibold mb-1">
                    We've got properties for everyone
                </h2>
                <div className="w-10 h-[3px] bg-primary mb-6" />

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {cards.map((card) =>
                        card.isAd ? (
                            /* Ad Card */
                            <div
                                key={card.id}
                                onClick={handleAdClick}
                                className="relative rounded-xl overflow-hidden cursor-pointer h-[200px] isolate"
                            >
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentAdIndex}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.5 }}
                                        className="absolute inset-0 flex flex-col items-center justify-between p-5 rounded-xl overflow-hidden"
                                        style={{ backgroundColor: ads[currentAdIndex].bgColor }}
                                    >
                                        {/* Background Image with Color Overlay */}
                                        <div className="absolute inset-0 overflow-hidden rounded-xl">
                                            <img
                                                src={ads[currentAdIndex].image}
                                                alt="ad-image"
                                                className="absolute inset-0 w-full h-full object-cover opacity-25"
                                            />
                                        </div>

                                        <div className="relative z-10 text-center">
                                            <p className="text-[#333] text-xs font-normal leading-snug">
                                                {ads[currentAdIndex].title}
                                            </p>
                                            <p className="font-bold text-base leading-snug" style={{ color: ads[currentAdIndex].accentColor }}>
                                                {ads[currentAdIndex].highlight}
                                            </p>
                                            <p className="text-[#333] text-xs font-semibold mt-0.5 leading-snug">
                                                {ads[currentAdIndex].subtitle}
                                            </p>
                                            <p className="text-[#555] text-xs font-normal mt-0.5">
                                                {ads[currentAdIndex].reward}
                                            </p>
                                        </div>

                                        <button
                                            className="relative z-10 text-white text-xs font-bold px-6 py-2 rounded-full transition-colors cursor-pointer"
                                            style={{ backgroundColor: ads[currentAdIndex].accentColor }}
                                        >
                                            {ads[currentAdIndex].buttonText}
                                        </button>
                                    </motion.div>
                                </AnimatePresence>

                                {/* Indicators */}
                                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-20">
                                    {ads.map((_, index) => (
                                        <div
                                            key={index}
                                            className={`h-1 rounded-full transition-all duration-300 ${index === currentAdIndex ? 'w-4 bg-white/80' : 'w-1 bg-white/40'}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        ) : (
                            /* Property Card */
                            <Link
                                href={card.href || "#"}
                                key={card.id}
                                className="relative rounded-xl overflow-hidden cursor-pointer h-[200px] group block no-underline"
                            >
                                <img
                                    src={card.bg}
                                    alt={card.label}
                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                {/* Dark gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                                {/* Text */}
                                <div className="absolute bottom-0 left-0 p-4 text-white">
                                    {/* {card.count && (
                                        <p className="text-2xl font-bold leading-tight">{card.count}</p>
                                    )} */}
                                    <p className="text-base font-semibold mb-3">{card.label}</p>
                                    {card.explore && (
                                        <p className="text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                                            Explore <span>→</span>
                                        </p>
                                    )}
                                </div>
                            </Link>
                        )
                    )}
                </div>
            </div>
        </section>
    );
}