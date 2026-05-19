"use client"
import { ArrowRight, Play, FileText } from "lucide-react";

// ─── Ad Banners Section ────────────────────────────────────────────────────────

export function AdBanners() {
    return (
        <section className="w-full bg-white py-6">
            <div className="max-w-[1200px] mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Left: Research Insights */}
                    <div className="bg-white rounded-2xl p-5 border border-gray-200 border-t-[#0F3E66] border-l-[#0F3E66] border-r-[#0F3E66] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-4">
                        <h3 className="text-[#1a1a1a] font-bold text-base md:text-lg">Research Insights</h3>

                        {/* Red banner container */}
                        <div className="relative rounded-xl overflow-hidden bg-primary h-[175px] flex items-center px-6 gap-4 shadow-inner">
                            {/* Left Side: House outline and couple */}
                            <div className="relative w-[130px] h-[165px] self-end shrink-0 overflow-hidden flex items-end">
                                <img
                                    src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=300&q=80"
                                    alt="couple"
                                    className="h-[145px] w-full object-cover object-top rounded-t-xl z-0"
                                />
                                {/* White House Outline SVG with Chimney on the Left */}
                                <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none" viewBox="0 0 130 165" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    {/* Chimney */}
                                    <path d="M30 46 V26 H42 V36" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                    {/* House body & roof */}
                                    <path d="M65 15 L10 65 H22 V155 H108 V65 H120 L65 15 Z" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                </svg>
                            </div>

                            {/* Right Side: Campaign and report typography */}
                            <div className="flex-1 flex flex-col items-end justify-center text-right text-white z-10 select-none">
                                <p className="text-xs font-bold uppercase tracking-wider mb-0.5 opacity-90">#SapnoKaAddress</p>
                                <div className="flex items-center gap-1 mb-2">
                                    <span className="text-[9px] text-white/80">A Special Report by</span>
                                    <div className="flex items-center bg-white/20 px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-wide">
                                        <span className="text-white">mb</span>
                                        <span className="text-white/80 ml-1">Research</span>
                                    </div>
                                </div>
                                <p className="font-extrabold text-lg sm:text-xl leading-tight uppercase tracking-tight">
                                    HOW MIGRATION<br />IMPACTS REAL ESTATE
                                </p>
                            </div>
                        </div>

                        {/* Footer row */}
                        <div className="flex items-center justify-between gap-4 mt-1">
                            <p className="text-[#333] text-sm leading-snug flex-1">
                                <span className="font-bold">India's Migration Story:</span> Drivers, Disruptions, and Real Estate Impact
                            </p>
                            <a
                                href="https://cdn.staticmb.com/magicservicestatic/images/pblb-report.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="shrink-0 bg-primary hover:bg-primary-dark text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full transition-all duration-300 shadow-sm hover:shadow active:scale-95 text-center"
                            >
                                Click Here
                            </a>
                        </div>
                    </div>

                    {/* Right: Contest Alert */}
                    <div className="bg-white rounded-2xl p-5 border border-gray-200 border-t-[#0F3E66] border-l-[#0F3E66] border-r-[#0F3E66] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-4">
                        <h3 className="text-[#1a1a1a] font-bold text-base md:text-lg">Contest Alert</h3>

                        {/* Clickable Beige Banner */}
                        <a
                            href="https://property.magicbricks.com/microsite/lp/patabadlolifebadlo/?inc=pblb_web_homepage_pblbwidget_contest"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative rounded-xl overflow-hidden bg-gradient-to-r from-[#F5ECE5] to-[#E5D7CC] h-[175px] flex items-center px-6 gap-4 shadow-inner group cursor-pointer"
                        >
                            {/* Left Side: Indian Couple Smiling */}
                            <div className="relative w-[130px] h-[165px] self-end shrink-0 overflow-hidden flex items-end">
                                <img
                                    src="https://images.unsplash.com/photo-1543269865-cbf427effbad?w=300&q=80"
                                    alt="happy couple with keys"
                                    className="h-[155px] w-full object-cover object-top rounded-t-xl group-hover:scale-105 transition-transform duration-500 z-0"
                                />
                            </div>

                            {/* Right/Center: Campaign content */}
                            <div className="flex-1 flex flex-col items-center justify-center text-center px-2 select-none">
                                <p className="text-[#333] text-sm sm:text-base font-normal leading-snug">
                                    Share your story and <span className="font-extrabold text-[#1a1a1a]">WIN</span><br />
                                    vouchers worth <span className="font-extrabold text-[#1a1a1a]">₹5000</span>
                                </p>
                                <p className="text-primary font-extrabold text-base sm:text-lg mt-1 tracking-tight">
                                    #SapnoKaAddress
                                </p>
                            </div>

                            {/* Absolute Bottom Right Click Here Button */}
                            <div className="absolute bottom-4 right-4 bg-primary group-hover:bg-primary-dark text-white text-xs font-bold px-5 py-2.5 rounded-full transition-all duration-300 shadow-sm group-hover:shadow group-hover:scale-105 active:scale-95">
                                Click Here
                            </div>
                        </a>
                    </div>

                </div>
            </div>
        </section>
    );
}

// ─── Real Estate Guide ────────────────────────────────────────────────────────

const localityVideos = [
    {
        id: 1,
        title: "Balewadi, Pune: Price of Houses, Apartments,...",
        thumb: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=200&q=80",
        tag: "LIVE NEAR YOUR WORKSPACE FOR RS 16K MONTHLY",
    },
    {
        id: 2,
        title: "Marunji, Pune: Price of Houses, Apartments,...",
        thumb: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=200&q=80",
        tag: "LIVE NEAR A COMMERCIAL HUB FOR AS LOW MONTHLY",
    },
];

const industryInsights = [
    {
        id: 1,
        text: "Occupancy Certificate (OC) - Meaning, Docume...",
        type: "video",
        link: "https://www.magicbricks.com/blog/what-is-an-occupancy-certificate-and-why-is-it-necessary/114591.html"
    },
    {
        id: 2,
        text: "Ready Reckoner Rate - What Does it Mean and ...",
        type: "article",
        link: "https://www.magicbricks.com/blog/ready-reckoner-rate/125603.html"
    },
    {
        id: 3,
        text: "15+ Vastu Tips for Residential Building",
        type: "article",
        link: "https://www.magicbricks.com/blog/vastu-for-residential-building/123556.html"
    },
    {
        id: 4,
        text: "Circle Rates in Pune - Area-wise categorisation",
        type: "article",
        link: "https://www.magicbricks.com/blog/ready-reckoner-rates-in-pune/126993.html"
    },
    {
        id: 5,
        text: "How To Check The Zone of Land In Maharashtra?",
        type: "article",
        link: "https://www.magicbricks.com/blog/how-to-check-the-zone-of-land-in-maharashtra/124319.html"
    },
];

const legalUpdates = [
    {
        id: 1,
        title: "Format of Will and How to Write a Will?",
        cta: "Watch video",
        type: "video",
        thumb: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=150&q=80",
        link: "https://www.magicbricks.com/blog/news-in-Pune/type-o/tag-Legal,See_More"
    },
    {
        id: 2,
        title: "What is Rent Agreement - Format, Key Terms, Importance and More",
        cta: "Read article",
        type: "article",
        thumb: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=150&q=80",
        link: "https://www.magicbricks.com/blog/rent-agreement-format/127259.html"
    },
];

export function RealEstateGuide() {
    return (
        <section className="w-full bg-white py-8">
            <div className="max-w-[1200px] mx-auto px-4">
                {/* Heading */}
                <h2 className="text-[#1a1a1a] text-xl font-bold mb-1 tracking-tight">Your Real Estate Guide</h2>
                <div className="w-10 h-[3px] bg-primary mb-8" />

                {/* Three-column grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Column 1: Locality Videos */}
                    <div className="bg-white rounded-2xl p-5 border border-gray-200 border-t-[#0F3E66] border-l-[#0F3E66] border-r-[#0F3E66] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between min-h-[380px]">
                        <div>
                            <h3 className="text-[#1a1a1a] font-bold text-base md:text-lg mb-4">Locality Videos</h3>

                            {/* Side-by-side Video Thumbnails */}
                            <div className="grid grid-cols-2 gap-3 mb-4">
                                {localityVideos.map((v) => (
                                    <div key={v.id} className="relative rounded-xl overflow-hidden cursor-pointer group shadow-sm">
                                        <img
                                            src={v.thumb}
                                            alt={v.title}
                                            className="w-full h-[100px] object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        {/* Play Button Overlay */}
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/25 transition-colors duration-300">
                                            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-md transform group-hover:scale-110 transition-transform duration-300">
                                                <Play size={12} fill="#0F3E66" className="text-primary ml-0.5" />
                                            </div>
                                        </div>
                                        {/* Bottom Label Overlay */}
                                        <div className="absolute bottom-0 left-0 right-0 bg-black/70 px-1.5 py-1 text-center select-none">
                                            <p className="text-white text-[8px] font-extrabold uppercase tracking-wide leading-tight">
                                                {v.tag}
                                            </p>
                                        </div>
                                        {/* MB TV Logo Badge */}
                                        <div className="absolute top-1.5 right-1.5 flex rounded overflow-hidden text-[7px] font-extrabold uppercase tracking-wide shadow-sm select-none">
                                            <span className="bg-primary text-white px-1.5 py-0.5">mb</span>
                                            <span className="bg-[#0A2540] text-white px-1 py-0.5">tv</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Caption Under the thumbnails */}
                            <div className="grid grid-cols-2 gap-3 mb-4">
                                {localityVideos.map((v) => (
                                    <p key={v.id} className="text-[#333] text-xs font-semibold leading-snug hover:text-primary transition-colors duration-200 cursor-pointer">
                                        {v.title}
                                    </p>
                                ))}
                            </div>
                        </div>

                        <div>
                            {/* Pagination Dots (9 dots, active is red) */}
                            <div className="flex items-center gap-1.5 mb-5 select-none">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                {[...Array(8)].map((_, i) => (
                                    <span key={i} className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                                ))}
                            </div>

                            {/* Footer Link */}
                            <a
                                href="https://www.magicbricks.com/blog/news-in-Pune/type-v2/tag-Locality,Video,Pune"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:text-[#0A2944] font-bold text-sm flex items-center gap-1 w-fit group transition-colors duration-200"
                            >
                                See all <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform duration-200" />
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Industry Insights */}
                    <div className="bg-white rounded-2xl p-5 border border-gray-200 border-t-[#0F3E66] border-l-[#0F3E66] border-r-[#0F3E66] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between min-h-[380px]">
                        <div>
                            <h3 className="text-[#1a1a1a] font-bold text-base md:text-lg mb-4">Industry Insights</h3>

                            {/* List of Insights */}
                            <div className="flex flex-col">
                                {industryInsights.map((item) => (
                                    <a
                                        key={item.id}
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 py-3 border-b border-gray-100 hover:text-primary group transition-colors duration-200 last:border-b-0 last:pb-0"
                                    >
                                        {item.type === "video" ? (
                                            /* Custom Red Circle Play Icon Outline */
                                            <div className="w-5 h-5 rounded-full border border-primary flex items-center justify-center shrink-0 group-hover:bg-primary/5 transition-colors">
                                                <Play size={8} fill="#0F3E66" className="text-primary ml-[0.5px]" />
                                            </div>
                                        ) : (
                                            /* Document Page Icon */
                                            <FileText size={18} className="text-gray-400 shrink-0 group-hover:text-primary transition-colors" />
                                        )}
                                        <span className="text-[#333] text-xs font-semibold leading-snug group-hover:text-primary transition-colors">
                                            {item.text}
                                        </span>
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div className="mt-6">
                            {/* Footer Link */}
                            <a
                                href="https://www.magicbricks.com/blog/news-in-Pune/type-ind-insight/tag-4d4250756e65/cat-Buy"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:text-[#0A2944] font-bold text-sm flex items-center gap-1 w-fit group transition-colors duration-200"
                            >
                                See all <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform duration-200" />
                            </a>
                        </div>
                    </div>

                    {/* Column 3: Legal Updates */}
                    <div className="bg-white rounded-2xl p-5 border border-gray-200 border-t-[#0F3E66] border-l-[#0F3E66] border-r-[#0F3E66] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between min-h-[380px]">
                        <div>
                            <h3 className="text-[#1a1a1a] font-bold text-base md:text-lg mb-4">Legal Updates</h3>

                            <div className="flex flex-col gap-4">
                                {legalUpdates.map((item) => (
                                    <div key={item.id} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-b-0 last:pb-0">
                                        {/* Thumbnail box */}
                                        <div className="relative shrink-0 w-[90px] h-[65px] rounded-lg overflow-hidden bg-gray-50 shadow-sm group cursor-pointer">
                                            <img
                                                src={item.thumb}
                                                alt={item.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                            {/* Play overlay for video item */}
                                            {item.type === "video" && (
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/25 transition-colors">
                                                    <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-md">
                                                        <Play size={10} fill="#0F3E66" className="text-primary ml-[0.5px]" />
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Content area */}
                                        <div className="flex-1">
                                            <h4 className="text-[#1a1a1a] font-bold text-xs leading-snug mb-1 cursor-pointer hover:text-primary transition-colors">
                                                {item.title}
                                            </h4>
                                            <a
                                                href={item.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-primary hover:text-[#0A2944] font-bold text-[11px] flex items-center gap-1 transition-colors mt-1"
                                            >
                                                {item.cta} <ArrowRight size={10} />
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center justify-between mt-6 select-none">
                            {/* Footer Link */}
                            <a
                                href="https://www.magicbricks.com/blog/news-in-Pune/type-o/tag-Legal,See_More"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:text-[#0A2944] font-bold text-sm flex items-center gap-1 w-fit group transition-colors duration-200"
                            >
                                See all <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform duration-200" />
                            </a>

                            {/* Explore Services Button */}
                            <a
                                href="https://www.magicbricks.com/propertyservices/legal-services?inc=propservices_homepage_topicon"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-primary hover:bg-primary-dark text-white text-xs font-bold px-4 py-2.5 rounded-full transition-all duration-300 shadow-sm hover:shadow active:scale-95"
                            >
                                Explore Services
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

// ─── Default export: both ─────────────────────────────────────────────────────
export default function AdAndGuide() {
    return (
        <div className="w-full bg-white">
            <AdBanners />
            <RealEstateGuide />
        </div>
    );
}