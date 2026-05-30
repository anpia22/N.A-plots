"use client"
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Star, ExternalLink, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const localities = [
    {
        id: 1,
        name: "Hinjawadi",
        priceRange: "₹2,200 – ₹3,000 per sqft",
        rating: 4.5,
        reviews: 32,
        propertiesForSale: 2,
        img: "/Images/Projects/tatasthu_banner.avif",
    },
    {
        id: 2,
        name: "Lonavala",
        priceRange: "₹4,000 – ₹7,500 per sqft",
        rating: 4.8,
        reviews: 15,
        propertiesForSale: 1,
        img: "/Images/Projects/beyond bliss lonavala.avif",
    },
    {
        id: 3,
        name: "Pawna",
        priceRange: "₹3,500 – ₹6,000 per sqft",
        rating: 4.7,
        reviews: 21,
        propertiesForSale: 1,
        img: "/Images/Projects/pawna villas banner.avif",
    },
    {
        id: 4,
        name: "Kanhe Phata",
        priceRange: "₹1,800 – ₹2,500 per sqft",
        rating: 4.2,
        reviews: 45,
        propertiesForSale: 3,
        img: "/Images/Projects/Prakriti.avif",
    },
];

interface StarRatingProps {
    rating: number;
}

function StarRating({ rating }: StarRatingProps) {
    return (
        <div className="flex items-center gap-1">
            <span className="text-[#1a1a1a] font-semibold text-sm">{rating}</span>
            <Star size={13} className="fill-[#FFC107] text-[#FFC107]" />
        </div>
    );
}

interface Locality {
    id: number;
    name: string;
    priceRange: string;
    rating: number;
    reviews: number;
    propertiesForSale: number;
    img: string;
}

interface LocalityCardProps {
    locality: Locality;
}

function LocalityCard({ locality }: LocalityCardProps) {
    const name = locality.name.trim();
    let slug = "";
    if (name === "Hinjawadi") {
        slug = "property-in-hinjawadi";
    } else if (name === "Lonavala") {
        slug = "property-in-Lonavala";
    } else {
        slug = `property-in-${name.toLowerCase().replace(/\s+/g, "-")}`;
    }

    return (
        <Link
            href={`/${slug}`}
            className="relative border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow cursor-pointer flex flex-col border-t-3 border-t-blue-400 h-full justify-between no-underline block"
        >
            {/* Top info */}
            <div className="px-5 pt-5 pb-3">
                <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-[#1a1a1a] font-semibold text-sm leading-snug">{locality.name}</h3>
                    <ExternalLink size={14} className="text-gray-400 shrink-0 mt-0.5" />
                </div>
                <p className="text-[#555] text-xs mb-3">{locality.priceRange}</p>

                <div className="flex items-center gap-2">
                    <StarRating rating={locality.rating} />
                    <span className="text-[#555] text-xs">{locality.reviews} Reviews</span>
                </div>
            </div>

            {/* Image + CTA */}
            <div className=" relative mx-4 mb-4 mt-5 rounded-xl  bg-[#e6f9fb] flex items-end gap-3 px-4 pt-3 pb-2 mt-1">
                <img
                    src={locality.img}
                    alt={locality.name}
                    className="absolute bottom-8 left-1 w-10 h-10 rounded-full object-cover shrink-0 "
                />
                <span
                    className="text-primary mt-4 font-semibold text-xs flex items-center gap-1 hover:underline"
                >
                    {locality.propertiesForSale.toLocaleString()} {locality.propertiesForSale === 1 ? "Property" : "Properties"} for Sale{" "}
                    <ArrowRight size={14} />
                </span>
            </div>
        </Link>
    );
}

export default function ExploreLocalities() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);

    const checkScroll = () => {
        if (containerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
            setShowLeftArrow(scrollLeft > 5);
            setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 5);
        }
    };

    const handleScroll = (direction: "left" | "right") => {
        if (containerRef.current) {
            const cardEl = containerRef.current.firstElementChild as HTMLElement;
            if (cardEl) {
                const cardWidth = cardEl.clientWidth;
                const style = window.getComputedStyle(containerRef.current);
                const gap = parseFloat(style.columnGap || style.gap) || 16;
                const scrollAmount = direction === "left" ? -(cardWidth + gap) : (cardWidth + gap);
                containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
            }
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener("resize", checkScroll);
        return () => {
            window.removeEventListener("resize", checkScroll);
        };
    }, []);

    return (
        <section className="w-full bg-white py-6 z-10">
            <div className="max-w-[1200px] mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-5 items-stretch">

                    {/* Left label card */}
                    <div className="w-full lg:w-[220px] lg:shrink-0 bg-[#e6f9fb] rounded-2xl flex flex-col justify-end px-6 py-6 md:py-8 min-h-[105px] lg:min-h-0">
                        <p
                            className="text-[#1a1a1a] text-3xl lg:text-4xl mb-1 leading-none"
                            style={{ fontFamily: "cursive" }}
                        >
                            Explore
                        </p>
                        <h2 className="text-[#1a1a1a] font-semibold text-md leading-snug mt-1">
                            Popular Localities<br />in Pune
                        </h2>
                        <div className="w-8 h-[3px] bg-primary mt-3" />
                    </div>

                    {/* Right: locality cards */}
                    <div className="relative flex-1 min-w-0">
                        {/* Scroll Container */}
                        <div
                            ref={containerRef}
                            onScroll={checkScroll}
                            className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide snap-x snap-mandatory scroll-smooth w-full"
                        >
                            {localities.map((loc) => (
                                <div
                                    key={loc.id}
                                    className="w-[280px] min-w-[280px] max-w-[280px] md:w-[calc((100%-32px)/3)] md:min-w-[calc((100%-32px)/3)] md:max-w-[calc((100%-32px)/3)] shrink-0 snap-start"
                                >
                                    <LocalityCard locality={loc} />
                                </div>
                            ))}
                        </div>

                        {/* Navigation Arrows */}
                        {showLeftArrow && (
                            <button
                                onClick={() => handleScroll('left')}
                                className="absolute left-[-20px] top-[calc(50%-8px)] w-10 h-10 rounded-full border border-gray-200 bg-white shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors z-10 hidden md:flex"
                                aria-label="Previous locality"
                            >
                                <ChevronLeft size={20} className="text-[#333]" />
                            </button>
                        )}

                        {showRightArrow && (
                            <button
                                onClick={() => handleScroll('right')}
                                className="absolute right-[-20px] top-[calc(50%-8px)] w-10 h-10 rounded-full border border-gray-200 bg-white shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors z-10 hidden md:flex"
                                aria-label="Next locality"
                            >
                                <ChevronRight size={20} className="text-[#333]" />
                            </button>
                        )}
                    </div>

                </div>
            </div>
        </section>
    );
}