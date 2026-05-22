"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { TopProjectCard, Project } from "@/components/Projectsections";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const topProjectsList: Project[] = [
    {
        id: 1,
        name: "The f Row",
        developer: "Rising Spaces",
        locality: "Paud, Pune",
        bhk: "Residential NA Plots",
        price: "Price on Request",
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
    {
        id: 5,
        name: "Aangan 18",
        developer: "Rising Spaces",
        locality: "Maan, Hinjawadi",
        bhk: "Residential NA Plots",
        price: "₹1.89 Cr",
        marketedBy: "Rising Spaces",
        img: "/Images/Projects/Aangan 18.avif",
        externalLink: "https://www.risingspaces.in/18-aangan",
    },
    {
        id: 6,
        name: "Beyond Bliss Lonavala",
        developer: "Rising Spaces",
        locality: "Lonavala",
        bhk: "Luxury 4 BHK Villas",
        price: "Price on Request",
        marketedBy: "Rising Spaces",
        img: "/Images/Projects/beyond bliss lonavala.avif",
        externalLink: "https://beyondblisslonavala.com/",
    }
];

export default function TopProjectsPage() {
    return (
        <div className="w-full bg-[#f8f9fa] min-h-screen flex flex-col">
            <Navbar />
            
            {/* Breadcrumb / Header area */}
            <div className="bg-white border-b border-gray-200 py-6">
                <div className="max-w-[1200px] mx-auto px-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                        <Link href="/" className="hover:text-primary">Home</Link>
                        <ChevronRight size={14} />
                        <span className="text-[#1a1a1a] font-semibold">Top Projects</span>
                    </div>
                    <h1 className="text-[#1a1a1a] text-2xl md:text-3xl font-bold flex items-center gap-2">
                        Top Projects in Pune
                    </h1>
                    <div className="w-10 h-[3px] bg-[#FFC107] mt-3" />
                </div>
            </div>

            {/* Grid layout */}
            <div className="flex-1 max-w-[1200px] mx-auto px-4 py-8 w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {topProjectsList.map((project) => (
                        <TopProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
}
