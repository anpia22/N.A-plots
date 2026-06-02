'use client';

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";

// Custom high-fidelity inline SVGs to avoid old/incompatible lucide-react brand icon issues
const FacebookIcon = ({ size = 16 }: { size?: number }) => (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" stroke="none">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
);

const TwitterIcon = ({ size = 16 }: { size?: number }) => (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" stroke="none">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

const YoutubeIcon = ({ size = 16 }: { size?: number }) => (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" stroke="none">
        <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.53 3.545 12 3.545 12 3.545s-7.53 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.017 0 12 0 12s0 3.983.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.858.508 9.388.508 9.388.508s7.53 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.983 24 12 24 12s0-3.983-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
);

const InstagramIcon = ({ size = 16 }: { size?: number }) => (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
);

const LinkedinIcon = ({ size = 16 }: { size?: number }) => (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" stroke="none">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z" />
    </svg>
);


// ─── Data ─────────────────────────────────────────────────────────────────────

const footerColumns = [
    // {
    //     heading: "Company",
    //     links: [
    //         // "About Us",
    //         // "Careers",
    //         // "Contact Us",
    //         "Terms & Conditions",
    //         // "Feedback",
    //         "Privacy Policy",
    //         // "Cookie Policy",
    //         // "Sitemap",
    //     ],
    // },
    {
        heading: "Property Types",
        links: [
            "NA Plots",
            // "Commercial Plots",
            "Residential NA Plots",
            "Villas",
            "Bungalow Plots",
            "Weekend Homes",
        ],
    },
    {
        heading: "Properties in Pune",
        links: [
            "Property in Hinjawadi",
            "Property in Lonavala",
            "Property in Paud",
            "Property in Ghotawade",
            "Property in Somatane",
            "Property in Kanhe Phata",
            "Property in Pawna",
            "Property in Varale",
            "Property in Kamshet",
            "Property in Chakan",
            "Property in Talegaon MIDC",
        ],
    },
    {
        heading: "Top Projects",
        links: [
            "The f Row",
            "Codename Tathastu",
            "The Pawna Villas",
            "Codename OWNEDGE",
            "Codename Prakriti",
            "Codename Joy Estate",
            "Mountville",
            "Red Stone",
            "Eco Town",
            "Aangan 18",
            "Pratham",
            "Beyond Bliss",
            "Crown Estate",
        ],

    },
    {
        heading: "Locality Guides",
        links: [
            "Hinjawadi, Pune",
            "Lonavala, Pune",
            "Paud, Pune",
            "Ghotawade, Pune",
            "Somatane Phata, Pune",
            "Kanhe Phata, Pune",
            "Pawna, Pune",
            "Varale, Pune",
            "Kamshet, Pune",
            "Chakan, Pune",
            "Talegaon MIDC, Pune"
        ],
    }, {
        heading: "Villas",
        links: ["Villas in Pune", "Villas in Lonavala", "Villas in Khandala", "Villas in Hinjawadi", "Villas in Wakad", "Villas in Baner", "Villas in Pawna", "Villas in Paud"]
    },
];

const additionalSections = [

    {
        title: "Villa for Sale",
        links: ["Villa for Sale in Pune", "Villa for Sale in Lonavala", "Villa for Sale in Khandala", "Villa for Sale in Hinjawadi", "Villa for Sale in Wakad", "Villa for Sale in Baner", "Villa for Sale in Pawna", "Villa for Sale in Paud"]
    },
    {
        title: "Bungalows",
        links: ["Bungalows in Pune", "Bungalows in Lonavala", "Bungalows in Khandala", "Bungalows in Hinjawadi", "Bungalows in Wakad", "Bungalows in Baner", "Bungalows in Pawna"]
    },
    {
        title: "Bungalow for Sale",
        links: ["Bungalow for Sale in Pune", "Bungalow for Sale in Lonavala", "Bungalow for Sale in Khandala", "Bungalow for Sale in Hinjawadi", "Bungalow for Sale in Wakad", "Bungalow for Sale in Baner", "Bungalow for Sale in Pawna"]
    },
    {
        title: "Residential NA Plots",
        links: ["Residential NA Plots in Pune", "Residential NA Plots in Hinjawadi", "Residential NA Plots in Maan", "Residential NA Plots in Dhamane", "Residential NA Plots in Paud", "Residential NA Plots in Lonavala", "Residential NA Plots in Shirgaon"]
    },
    // {
    //     title: "Commercial Plots",
    //     links: ["Commercial Plots in Pune", "Commercial Plots in Hinjawadi", "Commercial Plots in Ghotawade", "Commercial Plots in Somatane", "Commercial Plots in Kanhe Phata", "Commercial Plots in Varale", "Commercial Plots in Takve", "Commercial Plots in Kamshet", "Commercial Plots in Chakan / Talegaon MIDC"]
    // },
    {
        title: "NA Plots",
        links: ["NA Plots in Pune", "NA Plots in Hinjawadi", "NA Plots in Maan", "NA Plots in Paud", "NA Plots in Somatane Phata", "NA Plots in Kanhe Phata", "NA Plots in Ghotawade", "NA Plots in Lonavala", "NA Plots in Kamshet", "NA Plots in Chakan ", "NA Plots in Talegaon MIDC"]
    },
    {
        title: "Properties",
        links: ["Property in Pune", "Property in Hinjawadi", "Property in Maan", "Property in Paud", "Property in Somatane Phata", "Property in Kanhe Phata", "Property in Ghotawade", "Property in Lonavala", "Property in Kamshet", "Property in Chakan ", "Property in Talegaon MIDC"]
    }
];

const appStores = [
    {
        label: "Get it on",
        store: "Google Play",
        icon: "▶",
        bg: "#000",
    },
    {
        label: "Download on the",
        store: "App Store",
        icon: "",
        bg: "#000",
    },
];

const socials = [
    { icon: <FacebookIcon size={16} />, label: "Facebook", color: "#1877F2" },
    { icon: <TwitterIcon size={16} />, label: "Twitter", color: "#1DA1F2" },
    { icon: <YoutubeIcon size={16} />, label: "YouTube", color: "#FF0000" },
    { icon: <InstagramIcon size={16} />, label: "Instagram", color: "#E4405F" },
    { icon: <LinkedinIcon size={16} />, label: "LinkedIn", color: "#0A66C2" },
];

// ─── Link Helper ──────────────────────────────────────────────────────────────
const getLinkHref = (heading: string, linkText: string) => {
    const slugify = (str: string) => str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    // 1. Static links in "Company"
    if (heading === "Company") {
        const text = linkText.trim().toLowerCase();
        if (text === "privacy policy") return "/privacy-policy";
        if (text === "terms & conditions" || text === "terms of use") return "/terms-and-conditions";
        return "#";
    }

    // 2. Property Types (e.g. "NA Plots", "Villas")
    if (heading === "Property Types") {
        const text = linkText.trim().toLowerCase();
        let prefix = "property";
        if (text.includes("villa")) prefix = "villas";
        else if (text.includes("bungalow")) prefix = "bungalow";
        else if (text.includes("residential")) prefix = "residential";
        else if (text.includes("commercial")) prefix = "commercial";
        else if (text.includes("plot")) prefix = "plots";
        return `/${prefix}-in-pune`;
    }

    // 3. Top Projects
    if (heading === "Top Projects") {
        const text = linkText.trim();
        if (text === "The f Row") return "https://thefrow.in/";
        if (text === "Codename Tathastu") return "https://codenametathastu.com/";
        if (text === "The Pawna Villas") return "https://thepawnavillas.com/";
        if (text === "Codename OWNEDGE") return "https://www.risingspaces.in/own-edge";
        if (text === "Codename Prakriti") return "https://codenameprakriti.com/";
        if (text === "Codename Joy Estate") return "https://codenamejoyestate.com/";
        if (text === "Mountville") return "https://www.risingspaces.in/mountville";
        if (text === "Red Stone") return "https://www.risingspaces.in/red-stone";
        if (text === "Eco Town") return "https://www.risingspaces.in/eco-town";
        if (text === "Aangan 18") return "https://www.risingspaces.in/18-aangan";
        return `/search?query=${encodeURIComponent(linkText)}`;
    }

    // 4. Properties in Pune / Locality Guides
    if (heading === "Properties in Pune" || heading === "Locality Guides") {
        let city = linkText.split(" in ")[1] || linkText.split(",")[0];
        if (!city) city = linkText;
        const citySlug = slugify(city);
        return `/property-in-${citySlug}`;
    }

    // 5. Additional Sections ("Villas in Pune", "Property in Hinjawadi", etc.)
    if (linkText.includes(" in ")) {
        const parts = linkText.split(" in ");
        if (parts.length === 2) {
            const typeStr = parts[0].toLowerCase();
            let prefix = "property";
            if (typeStr.includes("villa")) prefix = "villas";
            else if (typeStr.includes("bungalow")) prefix = "bungalow";
            else if (typeStr.includes("residential")) prefix = "residential";
            else if (typeStr.includes("commercial")) prefix = "commercial";
            else if (typeStr.includes("plot")) prefix = "plots";

            const citySlug = slugify(parts[1]);
            return `/${prefix}-in-${citySlug}`;
        }
    }

    return "#";
};

// ─── Crafted By Bar (Portal) ─────────────────────────────────────────────────
// Rendered directly on document.body to escape <main>'s white stacking context
// This is what makes the parallax reveal work correctly.

function CraftedByBar() {
    const barRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => {
            // Clean up body padding when unmounted
            document.body.style.paddingBottom = '';
        };
    }, []);

    useEffect(() => {
        if (!barRef.current) return;
        const updatePadding = () => {
            if (barRef.current) {
                document.body.style.paddingBottom = barRef.current.offsetHeight + 'px';
            }
        };
        updatePadding();
        const ro = new ResizeObserver(updatePadding);
        ro.observe(barRef.current);
        window.addEventListener('resize', updatePadding);
        return () => {
            ro.disconnect();
            window.removeEventListener('resize', updatePadding);
            document.body.style.paddingBottom = '';
        };
    }, [mounted]);

    if (!mounted) return null;

    return createPortal(
        <div
            ref={barRef}
            className="fixed bottom-0 left-0 right-0 z-[1] bg-[#0d0d0d] border-t border-neutral-800"
            style={{ boxShadow: '0 -8px 32px rgba(0,0,0,0.35)' }}
        >
            <div className="max-w-[1200px] mx-auto px-4 py-5 flex items-center justify-center gap-2.5">
                <p className="text-neutral-400 text-xs text-center flex items-center flex-wrap justify-center gap-2.5">
                    Carefully Crafted By
                    <Link
                        href="https://digitalizetheglobe.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-200 hover:text-white transition-colors duration-200 flex items-center gap-2 font-semibold"
                    >
                        <Image
                            src="Images/logo1.png"
                            alt="Digitalize The Globe Logo"
                            width={250}
                            height={30}
                            className="h-15 w-auto brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
                        />
                        Digitalize The Globe
                    </Link>
                </p>
            </div>
        </div>,
        document.body
    );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Footer() {
    return (
        <footer className="w-full bg-white z-10">
            {/* Main Footer Wrapper to prevent overlapping & establish solid background above the fixed footer */}
            <div className="w-full relative z-10 bg-white border-t border-gray-100 mt-10 ">

                {/* ── Post Property CTA Banner ── */}
                {/* <div className="bg-[#fff9f0] border-b border-[#f0e0cc]">
                    <div className="max-w-[1200px] mx-auto px-4 py-6 flex items-center justify-between gap-6">
                        <div className="flex items-center gap-5">
                            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                <svg viewBox="0 0 48 48" width="36" height="36" fill="none">
                                    <path d="M24 6L4 22h6v20h28V22h6L24 6z" fill="#0F3E66" opacity="0.15" stroke="#0F3E66" strokeWidth="2.5" strokeLinejoin="round" />
                                    <rect x="18" y="32" width="12" height="10" rx="2" fill="#0F3E66" opacity="0.5" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-[#1a1a1a] font-bold text-lg leading-tight">
                                    Post your Property for Free
                                </h3>
                                <p className="text-[#555] text-sm mt-0.5">
                                    List it on  and get genuine leads
                                </p>
                            </div>
                        </div>
                        <button className="shrink-0 bg-primary hover:bg-primary-dark text-white font-bold text-sm px-8 py-3 rounded-full transition-colors shadow-md">
                            Post Property FREE
                        </button>
                    </div>
                </div> */}

                {/* ── Main Footer Links ── */}
                <div className="max-w-[1200px] mx-auto px-4 py-10">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
                        {footerColumns.map((col) => (
                            <div key={col.heading}>
                                <h4 className="text-[#1a1a1a] font-bold text-sm uppercase tracking-wide mb-4">
                                    {col.heading}
                                </h4>
                                <ul className="flex flex-col gap-2">
                                    {col.links.map((link) => {
                                        const href = getLinkHref(col.heading, link);
                                        const isExternal = href.startsWith("http");
                                        return (
                                            <li key={link}>
                                                <Link
                                                    href={href}
                                                    target={isExternal ? "_blank" : undefined}
                                                    rel={isExternal ? "noopener noreferrer" : undefined}
                                                    className="text-[#555] text-xs hover:text-primary transition-colors leading-relaxed"
                                                >
                                                    {link}
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Additional Link Sections ── */}
                <div className="border-t border-gray-100">
                    <div className="max-w-[1200px] mx-auto px-4 py-10">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
                            {additionalSections.map((section, idx) => (
                                <div key={idx}>
                                    <h4 className="text-[#1a1a1a] font-bold text-sm uppercase tracking-wide mb-4">
                                        {section.title}
                                    </h4>
                                    <ul className="flex flex-col gap-2">
                                        {section.links.map((item) => {
                                            const href = getLinkHref(section.title, item);
                                            const isExternal = href.startsWith("http");
                                            return (
                                                <li key={item}>
                                                    <Link
                                                        href={href}
                                                        target={isExternal ? "_blank" : undefined}
                                                        rel={isExternal ? "noopener noreferrer" : undefined}
                                                        className="text-[#555] text-xs hover:text-primary transition-colors leading-relaxed"
                                                    >
                                                        {item}
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>



                {/* ── Awards / Trust Badges ── */}
                <div className="border-t border-gray-100">
                    <div className="max-w-[1200px] mx-auto px-4 py-5 grid grid-cols-2 md:flex flex-wrap items-center justify-center gap-8">
                        {[
                            "Best Plotted Development",
                            "Excellence in Real Estate",
                            "Most Trusted Developer",
                            "Premium Lifestyle Projects",
                        ].map((badge) => (
                            <div key={badge} className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-[#FFC107]/20 flex items-center justify-center">
                                    <span className="text-[#FFC107] text-base">★</span>
                                </div>
                                <span className="text-[#555] text-xs font-medium">{badge}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Copyright ── */}
                <div className="border-t border-gray-100 bg-[#f5f5f5] shadow-[0_-4px_20px_rgba(0,0,0,0.02)]">
                    <div className="max-w-[1200px] mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
                        <p className="text-[#888] text-xs text-center md:text-left">
                            © 2026 NA Plot Pune. All Rights Reserved.
                        </p>
                        <div className="flex items-center gap-4">
                            {["Privacy Policy", "Terms of Use"].map((item) => (
                                <Link key={item} href={getLinkHref("Company", item)} className="text-[#888] text-xs hover:text-primary transition-colors">
                                    {item}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

            </div>

            {/* ── Crafted By: rendered as a body-level portal for parallax reveal ── */}
            <CraftedByBar />

        </footer>
    );
}