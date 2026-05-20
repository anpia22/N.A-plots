"use client"

import { ChevronRight } from "lucide-react";

// ─── Shared: magicHomes badge ─────────────────────────────────────────────────

function MagicHomesBadge() {
    return (
        <span className="inline-flex items-center border border-[#D8232A] rounded px-1.5 py-0.5 ml-1.5 align-middle whitespace-nowrap shrink-0 select-none">
            <span className="text-[#D8232A] font-bold text-[10px] md:text-xs italic whitespace-nowrap" style={{ fontFamily: "Georgia, serif" }}>
                magic H
            </span>

            <svg viewBox="0 0 12 10" width="11" height="10" className="mx-0.5 shrink-0">
                <path d="M6 0L0 5h1.5v5h9V5H12z" fill="#D8232A" />
            </svg>
            <span className="text-[#D8232A] font-bold text-[10px] md:text-xs italic whitespace-nowrap" style={{ fontFamily: "Georgia, serif" }}>
                mes
            </span>
        </span>
    );
}

// ─── TOP PROJECTS ─────────────────────────────────────────────────────────────

const topProjects = [
    {
        id: 1,
        name: "Codename Prakriti",
        developer: "Rising Spaces",
        locality: "Kanhe Phata, Pune",
        bhk: "Commercial NA Plots",
        price: "Price on Request",
        marketedBy: "Rising Spaces",
        img: "/Images/Projects/Prakriti.avif",
        externalLink: "https://codenameprakriti.com/",
    },
    {
        id: 2,
        name: "Codename Pratham",
        developer: "Rising Spaces",
        locality: "Varale, Pune",
        bhk: "Commercial NA Plots",
        price: "Price on Request",
        marketedBy: "Rising Spaces",
        img: "/Images/Projects/Pratham.avif",
        externalLink: "https://codenamepratham.in/",
    },
    {
        id: 3,
        name: "Codename Joy Estate",
        developer: "Rising Spaces",
        locality: "Dhamane, Pune",
        bhk: "Residential NA Plots",
        price: "Price on Request",
        marketedBy: "Rising Spaces",
        img: "/Images/Projects/joy estate banner.avif",
        externalLink: "https://codenamejoyestate.com/",
    },
];

interface Project {
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

interface ProjectCardProps {
    project: Project;
}

function TopProjectCard({ project }: ProjectCardProps) {
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
            <div className="h-[190px] overflow-hidden">
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
    return (
        <section className="w-full bg-white py-8">
            <div className="max-w-[1200px] mx-auto px-4">
                {/* Heading row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-y-2 gap-x-4 mb-2">
                    <h2 className="text-[#1a1a1a] text-lg sm:text-xl font-bold flex items-center flex-wrap gap-1 md:gap-2">
                        <span className="whitespace-nowrap">Top Projects</span>
                        <MagicHomesBadge />
                    </h2>
                    <a href="/search?city=Pune&type=Plot" className="text-[#D8232A] text-xs sm:text-sm font-semibold flex items-center gap-1 hover:underline whitespace-nowrap">
                        See all Projects <ChevronRight size={14} />
                    </a>
                </div>
                <div className="w-10 h-[3px] bg-[#FFC107] mb-6" />

                {/* Desktop view (exactly unchanged) */}
                <div className="hidden md:grid grid-cols-3 gap-5">
                    {topProjects.map((p) => (
                        <TopProjectCard key={p.id} project={p} />
                    ))}
                </div>

                {/* Mobile view (swipeable card row) */}
                <div className="flex md:hidden overflow-x-auto gap-4 pb-4 scrollbar-hide snap-x snap-mandatory">
                    {topProjects.map((p) => (
                        <div key={p.id} className="w-[280px] min-w-[280px] max-w-[280px] shrink-0 snap-start">
                            <TopProjectCard project={p} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ─── NEW PROJECT GALLERY ──────────────────────────────────────────────────────

const newProjects = [
    {
        id: 1,
        name: "Crown Estate",
        developer: "Rising Spaces",
        locality: "Khadkale, Pune",
        bhk: "Commercial NA Plots",
        price: "Price on Request",
        marketedBy: "Rising Spaces",
        img: "/Images/Projects/crown esate.avif",
        externalLink: "https://crownestate.in/",
    },
    {
        id: 2,
        name: "Mountville",
        developer: "Rising Spaces",
        locality: "Kanhe Phata, Pune",
        bhk: "Residential NA Plots",
        price: "Price on Request",
        marketedBy: "Rising Spaces",
        img: "/Images/Projects/Mountville.avif",
        externalLink: "https://www.risingspaces.in/mountville",
    },
    {
        id: 3,
        name: "Red Stone",
        developer: "Rising Spaces",
        locality: "Takve, Kanhe Phata, Pune",
        bhk: "Commercial NA Plots",
        price: "Price on Request",
        marketedBy: "Rising Spaces",
        img: "/Images/Projects/RedStone_Webbanner.avif",
        externalLink: "https://www.risingspaces.in/red-stone",
    },
    {
        id: 4,
        name: "Eco Town",
        developer: "Rising Spaces",
        locality: "Ghotawade, Pune",
        bhk: "Commercial NA Plots",
        price: "Price on Request",
        marketedBy: "Rising Spaces",
        img: "/Images/Projects/eco town.avif",
        wide: true,
        externalLink: "https://www.risingspaces.in/eco-town",
    },
];

function NewProjectCard({ project }: ProjectCardProps) {
    const handleClick = () => {
        if (project.externalLink) {
            window.open(project.externalLink, "_blank", "noopener,noreferrer");
        }
    };

    return (
        <div
            onClick={handleClick}
            className="w-full group border border-gray-200 rounded-2xl overflow-hidden bg-white hover:shadow-lg transition-shadow cursor-pointer flex items-stretch"
        >
            {/* Left image */}
            <div className="w-[130px] shrink-0 overflow-hidden">
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
    return (
        <section className="w-full bg-white py-8">
            <div className="max-w-[1200px] mx-auto px-4">
                {/* Heading row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-y-2 gap-x-4 mb-2">
                    <h2 className="text-[#1a1a1a] text-lg sm:text-xl font-bold flex items-center flex-wrap gap-1 md:gap-2">
                        <span className="whitespace-nowrap">New Project Gallery</span>
                        <MagicHomesBadge />
                    </h2>
                    <a href="/search?city=Pune&type=Plot" className="text-[#D8232A] text-xs sm:text-sm font-semibold flex items-center gap-1 hover:underline whitespace-nowrap">
                        See all Projects <ChevronRight size={14} />
                    </a>
                </div>
                <div className="w-10 h-[3px] bg-[#00bcd4] mb-6" />

                {/* Desktop view (exactly unchanged) */}
                <div className="hidden md:block">
                    {/* Top row: 3 cards */}
                    <div className="grid grid-cols-3 gap-5 mb-5">
                        {newProjects.slice(0, 3).map((p) => (
                            <NewProjectCard key={p.id} project={p} />
                        ))}
                    </div>

                    {/* Bottom row: 1 wide card (col-span-1 in a 3-col) */}
                    <div className="grid grid-cols-3 gap-5">
                        <NewProjectCard project={newProjects[3]} />
                    </div>
                </div>

                {/* Mobile view (swipeable card row) */}
                <div className="flex md:hidden overflow-x-auto gap-4 pb-4 scrollbar-hide snap-x snap-mandatory">
                    {newProjects.map((p) => (
                        <div key={p.id} className="w-[290px] min-w-[290px] max-w-[290px] shrink-0 snap-start">
                            <NewProjectCard project={p} />
                        </div>
                    ))}
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