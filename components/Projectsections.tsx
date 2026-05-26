"use client"

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// ─── Shared: NAPlots badge ─────────────────────────────────────────────────

function NAPlotsBadge() {
    return (
        <span className="inline-flex items-center border border-[#D8232A] rounded px-1.5 py-0.5 ml-1.5 align-middle whitespace-nowrap shrink-0 select-none gap-1">
            <span className="text-[#D8232A] font-bold text-[10px] md:text-xs italic whitespace-nowrap" style={{ fontFamily: "Georgia, serif" }}>
                NA
            </span>
            <span className="inline-flex items-center text-[#D8232A] font-bold text-[10px] md:text-xs italic whitespace-nowrap" style={{ fontFamily: "Georgia, serif" }}>
                Pl
                <span className="inline-flex items-center justify-center mx-[0.5px] transform -translate-y-[0.5px]">
                    <svg viewBox="0 0 12 10" width="9" height="8" className="shrink-0">
                        <path d="M6 0L0 5h1.5v5h9V5H12z" fill="#D8232A" />
                    </svg>
                </span>
                ts
            </span>
        </span>
    );
}

// ─── TOP PROJECTS ─────────────────────────────────────────────────────────────

const topProjects = [
    {
        id: 1,
        name: "The f Row",
        developer: "Rising Spaces",
        locality: "Paud, Pune",
        bhk: "Residential NA Plots",
        price: "75 Lacs*",
        marketedBy: "Rising Spaces",
        img: "/Images/Projects/frow_banner.avif",
        externalLink: "https://thefrow.in/",
    },
    {
        id: 2,
        name: "Codename Tathastu",
        developer: "Rising Spaces",
        locality: "Ghotawade, Pune",
        bhk: "Commercial Properties",
        price: "₹75 Lacs ",
        marketedBy: "Rising Spaces",
        img: "/Images/Projects/tatasthu_banner.avif",
        externalLink: "https://codenametathastu.com/",
    },
    {
        id: 3,
        name: "Mountville",
        developer: "Rising Spaces",
        locality: "Kanhe Phata, Pune",
        bhk: "Residential NA Plots",
        price: "39 Lacs",
        marketedBy: "Rising Spaces",
        img: "/Images/Projects/Mountville.avif",
        externalLink: "https://www.risingspaces.in/mountville",
    },
    {
        id: 4,
        name: "Crown Estate",
        developer: "Rising Spaces",
        locality: "Khadkale, Pune",
        bhk: "Commercial Properties",
        price: "26 Lacs",
        marketedBy: "Rising Spaces",
        img: "/Images/Projects/crown esate.avif",
        externalLink: "https://crownestate.in/",
    },
];

export interface Project {
    id: number;
    name: string;
    developer: string;
    locality: string;
    bhk: string;
    price: string;
    marketedBy: string;
    img: string;
    wide?: boolean;
    externalLink?: string;
}

export interface ProjectCardProps {
    project: Project;
}

export function TopProjectCard({ project }: ProjectCardProps) {
    const handleClick = () => {
        if (project.externalLink) {
            window.open(project.externalLink, "_blank", "noopener,noreferrer");
        }
    };

    return (
        <div
            onClick={handleClick}
            className="w-full group border border-gray-200 rounded-2xl overflow-hidden bg-white hover:shadow-lg transition-shadow cursor-pointer flex flex-col h-full"
        >
            {/* Image */}
            <div className="h-full md:h-[210px] overflow-hidden">
                <img
                    src={project.img}
                    alt={project.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
            </div>

            {/* Details */}
            <div className="px-4 pt-4 pb-5 flex-1 flex flex-col gap-0.5">
                <h3 className="text-[#1a1a1a] font-bold text-base leading-tight">{project.name}</h3>
                <p className="text-[#555] text-xs">{project.developer}</p>
                <p className="text-[#555] text-xs mb-2">{project.locality}</p>

                <p className="text-[#333] text-sm">{project.bhk}</p>
                <p className="text-[#1a1a1a] text-sm mb-2">
                    <span className="font-bold">{project.price}</span>{" "}
                    <span className="text-[#555] font-normal">onwards</span>
                </p>

                {/* Hover Action Container */}
                <div className="relative mt-auto h-7 overflow-hidden">
                    <p className="text-[#555] text-xs transition-transform duration-300 group-hover:-translate-y-full">
                        Get Pricing Details
                    </p>
                    <button className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-primary text-white text-[10px] font-bold uppercase rounded-full flex items-center justify-center cursor-pointer">
                        View Detail
                    </button>
                </div>
            </div>
        </div>
    );
}

export function TopProjects() {
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
                const gap = parseFloat(style.columnGap || style.gap) || 20;
                const scrollAmount = direction === "left" ? -(cardWidth + gap) : (cardWidth + gap);
                containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
            }
        }
    };

    useEffect(() => {
        // Run initial check
        checkScroll();
        window.addEventListener("resize", checkScroll);
        return () => {
            window.removeEventListener("resize", checkScroll);
        };
    }, []);

    return (
        <section className="w-full bg-white py-8">
            <div className="max-w-[1200px] mx-auto px-4">
                {/* Heading row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-y-2 gap-x-4 mb-2">
                    <h2 className="text-[#1a1a1a] text-lg sm:text-xl font-bold flex items-center flex-wrap gap-1 md:gap-2">
                        <span className="whitespace-nowrap">Top Projects</span>
                        <NAPlotsBadge />
                    </h2>
                    <a href="/top-projects" className="text-[#D8232A] text-xs sm:text-sm font-semibold flex items-center gap-1 hover:underline whitespace-nowrap">
                        See all Projects <ChevronRight size={14} />
                    </a>
                </div>
                <div className="w-10 h-[3px] bg-[#FFC107] mb-6" />

                {/* Carousel Container */}
                <div className="relative group/carousel">
                    {/* Scroll Container */}
                    <div
                        ref={containerRef}
                        onScroll={checkScroll}
                        className="flex overflow-x-auto gap-4 md:gap-5 pb-4 scrollbar-hide snap-x snap-mandatory scroll-smooth w-full"
                    >
                        {topProjects.map((p) => (
                            <div
                                key={p.id}
                                className="w-[280px] min-w-[280px] max-w-[280px] md:w-[calc((100%-40px)/3)] md:min-w-[calc((100%-40px)/3)] md:max-w-[calc((100%-40px)/3)] shrink-0 snap-start"
                            >
                                <TopProjectCard project={p} />
                            </div>
                        ))}
                    </div>

                    {/* Navigation Arrows (Desktop) */}
                    {showLeftArrow && (
                        <button
                            onClick={() => handleScroll('left')}
                            className="absolute left-[-20px] top-[95px] w-10 h-10 rounded-full border border-gray-200 bg-white shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors z-10 hidden md:flex"
                            aria-label="Previous project"
                        >
                            <ChevronLeft size={20} className="text-[#333]" />
                        </button>
                    )}

                    {showRightArrow && (
                        <button
                            onClick={() => handleScroll('right')}
                            className="absolute right-[-20px] top-[95px] w-10 h-10 rounded-full border border-gray-200 bg-white shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors z-10 hidden md:flex"
                            aria-label="Next project"
                        >
                            <ChevronRight size={20} className="text-[#333]" />
                        </button>
                    )}

                    {/* Navigation Arrows (Mobile) */}
                    {showLeftArrow && (
                        <button
                            onClick={() => handleScroll('left')}
                            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors shadow-sm z-10 md:hidden"
                            aria-label="Previous project mobile"
                        >
                            <ChevronLeft size={16} />
                        </button>
                    )}
                    {showRightArrow && (
                        <button
                            onClick={() => handleScroll('right')}
                            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors shadow-sm z-10 md:hidden"
                            aria-label="Next project mobile"
                        >
                            <ChevronRight size={16} />
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
}

// ─── NEW PROJECT GALLERY ──────────────────────────────────────────────────────

const newProjects = [
    {
        id: 1,
        name: "Codename Joy Estate",
        developer: "Rising Spaces",
        locality: "Dhamane, Pune",
        bhk: "Residential NA Plots",
        price: "19 Lacs*",
        marketedBy: "Rising Spaces",
        // img: "/Images/Projects/joy estate banner.avif",
        img: "/images/projects/joyestate.jpeg",
        externalLink: "https://codenamejoyestate.com/",
    },
    {
        id: 2,
        name: "Red Stone",
        developer: "Rising Spaces",
        locality: "Takve, Kanhe Phata, Pune",
        bhk: "Commercial NA",
        price: "1,499/sq.ft.",
        marketedBy: "Rising Spaces",
        // img: "/Images/Projects/RedStone_Webbanner.avif",
        img: "/images/projects/redstoneinsta.jpg",
        externalLink: "https://www.risingspaces.in/red-stone",
    },
    {
        id: 3,
        name: "Eco Town",
        developer: "Rising Spaces",
        locality: "Ghotawade, Pune",
        bhk: "Commercial NA",
        price: "56.34 Lacs*",
        marketedBy: "Rising Spaces",
        img: "/Images/Projects/ecotown.jpg",
        externalLink: "https://www.risingspaces.in/eco-town",
    },
    {
        id: 4,
        name: "Codename Pratham",
        developer: "Rising Spaces",
        locality: "Varale, Pune",
        bhk: "Residential NA",
        price: "42 Lacs*",
        marketedBy: "Rising Spaces",
        // img: "/Images/Projects/Pratham.avif",
        img: "/Images/Projects/pratham.jpeg",
        externalLink: "https://codenamepratham.in/",
    },
    {
        id: 5,
        name: "Codename Prakriti",
        developer: "Rising Spaces",
        locality: "Kanhe Phata, Pune",
        bhk: "Commercial NA",
        price: "19.50 Lacs*",
        marketedBy: "Rising Spaces",
        // img: "/Images/Projects/Prakriti.avif",
        img: "/Images/Projects/prakritiinsta.jpg",
        externalLink: "https://codenameprakriti.com/",
    },
    {
        id: 6,
        name: "Codename OWNEDGE",
        developer: "Rising Spaces",
        locality: "Somatane, Pune",
        bhk: "Commercial NA",
        price: "₹60 Lacs*",
        marketedBy: "Rising Spaces",
        // img: "/Images/Projects/OwnEdge.avif",
        img: "/images/projects/ownedge.jpeg",
        externalLink: "https://www.risingspaces.in/own-edge",
    },
];

export function NewProjectCard({ project }: ProjectCardProps) {

    const handleClick = () => {
        if (project.externalLink) {
            window.open(project.externalLink, "_blank", "noopener,noreferrer");
        }
    };

    return (
        <div
            onClick={handleClick}
            className="w-full group border border-gray-200 rounded-2xl overflow-hidden bg-white hover:shadow-lg transition-shadow cursor-pointer grid grid-cols-2 items-stretch"
        >
            {/* Left image */}
            <div className="w-full shrink-0 overflow-hidden">
                <img
                    src={project.img}
                    alt={project.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    style={{ minHeight: 130 }}
                />
            </div>

            {/* Right details */}
            <div className="px-4 py-4 flex flex-col gap-0.5 justify-center flex-1">
                <h3 className="text-[#1a1a1a] font-bold text-sm leading-tight">{project.name}</h3>
                <p className="text-[#555] text-xs">{project.developer}</p>
                <p className="text-[#555] text-xs mb-1">{project.locality}</p>

                <p className="text-[#333] text-xs">{project.bhk}</p>
                <p className="text-[#1a1a1a] text-xs mb-2">
                    <span className="font-bold">{project.price}</span>{" "}
                    <span className="text-[#555]">onwards</span>
                </p>

                {/* Hover Action Container */}
                <div className="relative mt-auto h-7 overflow-hidden">
                    <p className="text-[#555] text-[11px] transition-transform duration-300 group-hover:-translate-y-full">
                        Get Pricing Details
                    </p>
                    <button className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-primary text-white text-[10px] font-bold uppercase rounded-full flex items-center justify-center cursor-pointer">
                        View Detail
                    </button>
                </div>
            </div>
        </div>
    );
}

export function NewProjectGallery() {
    const containerRef = useRef<HTMLDivElement>(null);

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

    return (
        <section className="w-full bg-white py-8">
            <div className="max-w-[1200px] mx-auto px-4">
                {/* Heading row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-y-2 gap-x-4 mb-2">
                    <h2 className="text-[#1a1a1a] text-lg sm:text-xl font-bold flex items-center flex-wrap gap-1 md:gap-2">
                        <span className="whitespace-nowrap">Top Investment Destinations</span>
                        <NAPlotsBadge />
                    </h2>
                    <a href="/top-investment-destinations" className="text-[#D8232A] text-xs sm:text-sm font-semibold flex items-center gap-1 hover:underline whitespace-nowrap">
                        See all Projects <ChevronRight size={14} />
                    </a>
                </div>
                <div className="w-10 h-[3px] bg-[#00bcd4] mb-6" />

                {/* Desktop view */}
                <div className="hidden md:grid grid-cols-3 gap-5">
                    {newProjects.map((p) => (
                        <NewProjectCard key={p.id} project={p} />
                    ))}
                </div>

                {/* Mobile view (swipeable card row) */}
                <div className="md:hidden block">
                    <div ref={containerRef} className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide snap-x snap-mandatory scroll-smooth">
                        {newProjects.map((p) => (
                            <div key={p.id} className="w-[355px] min-w-[355px] max-w-[355px] shrink-0 snap-start">
                                <NewProjectCard project={p} />
                            </div>
                        ))}
                    </div>

                    {/* Add arroes button to scroll */}
                    <div className="flex items-center justify-center w-full space-x-4 mt-2">
                        <button
                            onClick={() => handleScroll('left')}
                            className="w-10 h-10 rounded-full bg-red-500 hover:bg-gray-300 text-white flex items-center justify-center transition-colors shadow-sm"
                            aria-label="Previous project"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            onClick={() => handleScroll('right')}
                            className="w-10 h-10 rounded-full bg-red-500 hover:bg-gray-300 text-white flex items-center justify-center transition-colors shadow-sm"
                            aria-label="Next project"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ─── Default export ───────────────────────────────────────────────────────────
export default function ProjectSections() {
    return (
        <>
            <TopProjects />
            <NewProjectGallery />
        </>
    );
}