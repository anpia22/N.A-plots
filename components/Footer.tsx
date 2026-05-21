'use client';

import Link from "next/link";

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
    {
        heading: "Company",
        links: [
            "About ",
            "Careers",
            "Contact Us",
            "Advertise with Us",
            "Terms & Conditions",
            "Request Info",
            "Feedback",
            "Privacy Policy",
            "Cookie Policy",
            "Sitemap",
        ],
    },
    {
        heading: "Our Products",
        links: [
            "Post Property for Free",
            " Prime",
            "Home Loans",
            "PropWorth",
            "MagicDiary",
            "MagicHomes",
            "magicLoans",
            "MB Research",
            "Home Interior Services",
            "Movers & Packers",
        ],
    },
    {
        heading: "Properties in India",
        links: [
            "Property in Mumbai",
            "Property in Delhi",
            "Property in Bangalore",
            "Property in Pune",
            "Property in Hyderabad",
            "Property in Chennai",
            "Property in Kolkata",
            "Property in Ahmedabad",
            "Property in Noida",
            "Property in Thane",
        ],
    },
    {
        heading: "Top Projects",
        links: [
            "Lodha Palava City",
            "Prestige Estates",
            "Godrej Properties",
            "Brigade Group",
            "Sobha Limited",
            "DLF Homes",
            "Shapoorji Pallonji",
            "Hiranandani",
            "Puravankara",
            "Mahindra Lifespaces",
        ],
    },
    {
        heading: "Locality Guides",
        links: [
            "Bandra West, Mumbai",
            "Whitefield, Bangalore",
            "Koregaon Park, Pune",
            "Gachibowli, Hyderabad",
            "Sector 62, Noida",
            "Salt Lake, Kolkata",
            "Anna Nagar, Chennai",
            "Prahlad Nagar, Ahmedabad",
            "Dwarka, Delhi",
            "Wakad, Pune",
        ],
    },
];

const propertyTypes = [
    "Flats in Mumbai",
    "Flats in Delhi",
    "Flats in Bangalore",
    "Flats in Hyderabad",
    "Flats in Pune",
    "Villas in Chennai",
    "Villas in Bangalore",
    "Plots in Hyderabad",
    "PG in Delhi",
    "PG in Bangalore",
    "Commercial in Mumbai",
    "Commercial in Delhi",
];

const stateLinks = [
    "Maharashtra", "Karnataka", "Telangana", "Tamil Nadu",
    "Delhi NCR", "West Bengal", "Gujarat", "Rajasthan",
    "Uttar Pradesh", "Kerala", "Punjab", "Haryana",
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
const getLinkHref = (linkText: string) => {
    const text = linkText.trim().toLowerCase();
    if (text === "privacy policy") return "/privacy-policy";
    if (text === "terms & conditions" || text === "terms of use") return "/terms-and-conditions";
    return "#";
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function Footer() {
    return (
        <footer className="w-full bg-white border-t border-gray-100 mt-10">

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
                                {col.links.map((link) => (
                                    <li key={link}>
                                        <Link
                                            href={getLinkHref(link)}
                                            className="text-[#555] text-xs hover:text-primary transition-colors leading-relaxed"
                                        >
                                            {link}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Property Types ── */}
            <div className="border-t border-gray-100">
                <div className="max-w-[1200px] mx-auto px-4 py-6">
                    <h4 className="text-[#1a1a1a] font-bold text-sm uppercase tracking-wide mb-4">
                        Property Types
                    </h4>
                    <div className="flex flex-wrap gap-x-5 gap-y-2">
                        {propertyTypes.map((item) => (
                            <a
                                key={item}
                                href="#"
                                className="text-[#555] text-xs hover:text-primary transition-colors"
                            >
                                {item}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── States ── */}
            <div className="border-t border-gray-100">
                <div className="max-w-[1200px] mx-auto px-4 py-6">
                    <h4 className="text-[#1a1a1a] font-bold text-sm uppercase tracking-wide mb-4">
                        Real Estate in India – By State
                    </h4>
                    <div className="flex flex-wrap gap-x-5 gap-y-2">
                        {stateLinks.map((state) => (
                            <a
                                key={state}
                                href="#"
                                className="text-[#555] text-xs hover:text-primary transition-colors"
                            >
                                {state}
                            </a>
                        ))}
                    </div>
                </div>
            </div>



            {/* ── Awards / Trust Badges ── */}
            <div className="border-t border-gray-100">
                <div className="max-w-[1200px] mx-auto px-4 py-5 grid grid-cols-2 md:flex flex-wrap items-center justify-center gap-8">
                    {[
                        "Best Real Estate Portal",
                        "Times Business Award",
                        "FICCI Award Winner",
                        "Deloitte Tech Fast 50",
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
            <div className="border-t border-gray-100 bg-[#f5f5f5]">
                <div className="max-w-[1200px] mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
                    <p className="text-[#888] text-xs text-center md:text-left">
                        © 2025  Realty Services Limited | CIN: U45200UP2019PLC117837
                    </p>
                    <div className="flex items-center gap-4">
                        {["Privacy Policy", "Terms of Use", "Grievance Redressal"].map((item) => (
                            <Link key={item} href={getLinkHref(item)} className="text-[#888] text-xs hover:text-primary transition-colors">
                                {item}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

        </footer>
    );
}