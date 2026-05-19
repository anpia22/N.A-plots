"use client"
import { Star, ExternalLink, ArrowRight, ChevronRight } from "lucide-react";

const localities = [
    {
        id: 1,
        name: "Kanhe Phata",
        priceRange: "₹1,800 – ₹2,500 per sqft",
        rating: 4.2,
        reviews: 45,
        propertiesForSale: 12,
        img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=120&q=80",
    },
    {
        id: 2,
        name: "Ghotawade, Hinjewadi",
        priceRange: "₹2,200 – ₹3,000 per sqft",
        rating: 4.5,
        reviews: 32,
        propertiesForSale: 8,
        img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=120&q=80",
    },
    {
        id: 3,
        name: "Paud Mulshi",
        priceRange: "₹1,500 – ₹3,500 per sqft",
        rating: 4.6,
        reviews: 28,
        propertiesForSale: 5,
        img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=120&q=80",
    },
    {
        id: 4,
        name: "Somatane Phata",
        priceRange: "₹2,500 – ₹4,500 per sqft",
        rating: 4.3,
        reviews: 18,
        propertiesForSale: 7,
        img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=120&q=80",
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
    return (
        <div className="relative border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow cursor-pointer flex flex-col border-t-3 border-t-blue-400" >
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
                <a
                    href="#"
                    className="text-primary mt-4 font-semibold text-xs flex items-center gap-1 hover:underline"
                >
                    {locality.propertiesForSale.toLocaleString()} Properties for Sale{" "}
                    <ArrowRight size={14} />
                </a>
            </div>
        </div>
    );
}

export default function ExploreLocalities() {
    return (
        <section className="w-full bg-white py-6">
            <div className="max-w-[1200px] mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-5 items-stretch">

                {/* Left label card */}
                <div className="w-full lg:w-[220px] lg:shrink-0 bg-[#e6f9fb] rounded-2xl flex flex-col justify-end px-6 py-6 md:py-8 min-h-[120px] lg:min-h-0">
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
                <div className="relative flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {localities.slice(0, 3).map((loc) => (
                            <LocalityCard key={loc.id} locality={loc} />
                        ))}
                    </div>

                    {/* Arrow */}
                    <button className="absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-gray-300 bg-white shadow flex items-center justify-center hover:shadow-md z-10 hidden md:flex">
                        <ChevronRight size={20} className="text-[#333]" />
                    </button>
                </div>

                </div>
            </div>
        </section>
    );
}