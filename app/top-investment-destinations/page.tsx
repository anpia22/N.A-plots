"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { NewProjectCard, Project } from "@/components/Projectsections";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const investmentProjectsList: Project[] = [
    {
        id: 1,
        name: "Codename Joy Estate",
        developer: "Rising Spaces",
        locality: "Dhamane, Pune",
        bhk: "Residential NA Plots",
        price: "19 Lacs",
        marketedBy: "Rising Spaces",
        img: "/Images/Projects/joyestate.jpeg",
        externalLink: "https://codenamejoyestate.com/",
    },
    {
        id: 2,
        name: "Red Stone",
        developer: "Rising Spaces",
        locality: "Takve, Kanhe Phata, Pune",
        bhk: "Residental NA Plots",
        price: "1,499/sq.ft.",
        marketedBy: "Rising Spaces",
        img: "/Images/Projects/redstoneinsta.jpg",
        externalLink: "https://www.risingspaces.in/red-stone",
    },
    {
        id: 3,
        name: "Eco Town",
        developer: "Rising Spaces",
        locality: "Ghotawade, Pune",
        bhk: "Residential NA Plots",
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
        bhk: "Residential Property",
        price: "42 Lacs*",
        marketedBy: "Rising Spaces",
        img: "/Images/Projects/pratham.jpeg",
        externalLink: "https://codenamepratham.in/",
    },
    {
        id: 5,
        name: "Codename Prakriti",
        developer: "Rising Spaces",
        locality: "Kanhe Phata, Pune",
        bhk: "Residential NA Plots",
        price: "19.50 Lacs*",
        marketedBy: "Rising Spaces",
        img: "/Images/Projects/prakritiinsta.jpg",
        externalLink: "https://codenameprakriti.com/",
    },
    {
        id: 6,
        name: "Codename OWNEDGE",
        developer: "Rising Spaces",
        locality: "Somatane, Pune",
        bhk: "Commercial Property",
        price: "60 Lacs*",
        marketedBy: "Rising Spaces",
        img: "/Images/Projects/ownedge.jpeg",
        externalLink: "https://www.risingspaces.in/own-edge",
    },
    {
        id: 7,
        name: "The Pawna Villas",
        developer: "Rising Spaces",
        locality: "Pawna",
        bhk: "Residential NA Plots",
        price: "₹2.75 Cr",
        marketedBy: "Rising Spaces",
        img: "/Images/Projects/pawna.png",
        externalLink: "https://thepawnavillas.com/",
    },
    // {
    //     id: 8,
    //     name: "Streets of Europe",
    //     developer: "Rising Spaces",
    //     locality: "Near Wipro Circle Maan Road",
    //     bhk: "Commercial NA Plot",
    //     price: "₹50 Lac",
    //     marketedBy: "Rising Spaces",
    //     img: "/Images/Projects/Streets of Europe.avif",
    //     externalLink: "#",
    // }
];

export default function TopInvestmentDestinationsPage() {
    return (
        <div className="w-full bg-[#f8f9fa] min-h-screen flex flex-col z-10">
            <Navbar />

            {/* Breadcrumb / Header area */}
            <div className="bg-white border-b border-gray-200 py-6">
                <div className="max-w-[1200px] mx-auto px-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                        <Link href="/" className="hover:text-primary">Home</Link>
                        <ChevronRight size={14} />
                        <span className="text-[#1a1a1a] font-semibold">Top Investment Destinations</span>
                    </div>
                    <h1 className="text-[#1a1a1a] text-2xl md:text-3xl font-bold flex items-center gap-2">
                        Top Investment Destinations in Pune
                    </h1>
                    <div className="w-10 h-[3px] bg-[#00bcd4] mt-3" />
                </div>
            </div>

            {/* Grid layout */}
            <div className="flex-1 max-w-[1200px] mx-auto px-4 py-8 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {investmentProjectsList.map((project) => (
                        <NewProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
}
