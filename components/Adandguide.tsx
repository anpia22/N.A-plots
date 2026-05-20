"use client"
import React, { useState, useMemo } from "react";
import {
  ArrowRight,
  Play,
  FileText,
  ChevronRight,
  Calendar,
  Clock,
  BookOpen,
  ShieldCheck,
  Search,
  CheckCircle2
} from "lucide-react";

// ─── TYPES & DATA ────────────────────────────────────────────────────────────

interface Blog {
  id: string;
  title: string;
  category: "Legal & Land" | "Investment" | "Market Trends" | "Architecture";
  date: string;
  readTime: string;
  img: string;
  short: string;
  fullContent: string;
}

const blogsData: Blog[] = [
  {
    id: "blog_712_guide",
    title: "How to Read a 7/12 Extract (Satbara Utara) in Maharashtra",
    category: "Legal & Land",
    date: "May 15, 2026",
    readTime: "5 min read",
    img: "/Images/AdAndBlog/Gemini_Generated_Image_aewh0kaewh0kaewh.png",
    short: "Verify land ownership records, check active bank mortgages, and understand occupant classes on Maharashtra land documents.",
    fullContent: `### What is a 7/12 Extract?
The 7/12 extract (Satbara Utara) is maintained by the Maharashtra revenue department. It combines Form VII (ownership, occupant class, tenant info) and Form XII (crop details, irrigation, land usage).

### Why is it Critical for Plot Buyers?
Before purchasing any NA plot, the 7/12 extract is your first defense against fraud — it is legal proof of ownership and reveals disputes or loans on the land.

### Key Sections to Verify

**1. Occupant Class (Bhogvautadar Varg)**
- **Class 1 (Varg-1):** Unrestricted land — the owner can sell, lease, or mortgage without government permission. Always buy Class 1 plots.
- **Class 2 (Varg-2):** Restricted land, usually allocated to freedom fighters or scheduled castes/tribes. Requires District Collector sanction and a premium to sell.

**2. Other Rights Column (Itar Adhikar)**
- Lists active liabilities — bank mortgages (Bojha), private loans, court litigations, or government easements.
- If a bank holds a mortgage, "Bojha" with the bank name and amount will appear. The seller must provide a No Objection Certificate (NOC) and mortgage clearance deed.

**3. Mutation Entries (Ferfar)**
- Records how the property changed hands over time (inheritance, sale deed, partition).
- Verify that the seller's name matches the latest mutation entry.

### Verification Checklist
- Check the online Mahabhulekh portal for digitally signed records.
- Cross-reference survey/gut numbers with the layout plan.
- Obtain a 30-year search report from a professional land lawyer.

> At NAPLOTPUNE, all our gated plot developments come with legally verified, clear Class-1 title 7/12 extracts — ensuring complete documentation transparency and peace of mind.`
  },
  {
    id: "blog_collector_na",
    title: "Collector NA vs. Gram Panchayat Plots: The Crucial Difference",
    category: "Investment",
    date: "May 12, 2026",
    readTime: "6 min read",
    img: "/Images/AdAndBlog/Gemini_Generated_Image_lwxf5tlwxf5tlwxf.png",
    short: "Avoid cheap unapproved agricultural subdivisions. Understand bank loan approvals and regional municipal building permissions.",
    fullContent: `### The Buzzword: 'NA Plots'
In Maharashtra, all land is agricultural by default unless converted to Non-Agricultural (NA) use. Many developers advertise cheap "NA plots" without official sanctions. The two main approval types are Collector NA and Gram Panchayat NA.

### Collector NA (Gold Standard)
The conversion is rigorous and goes through multiple government departments:
- **Town Planning Approval:** Ensures roads, open spaces, and layouts match PMRDA development guidelines.
- **Collector Final Sanction:** Issued under Section 44 of the Maharashtra Land Revenue Code.
- **Bank Loan Eligibility:** All major banks (HDFC, SBI, ICICI) easily approve home loans for Collector NA plots.
- **Legal Security:** The layout is permanent and cannot be claimed as illegal by municipal corporations.

### Gram Panchayat NA (High Risk)
Gram Panchayats do NOT have legal power to convert agricultural land to NA land.
- **Legal Issues:** Layouts often lack proper open spaces, wide roads, or drainage — frequently unauthorized "Gunthewari" subdivisions.
- **No Bank Loans:** Reputable banks refuse to sanction loans for Gram Panchayat plots.
- **Demolition Risk:** If merged into a Municipal Corporation (PMC/PCMC), unauthorized layouts face heavy penalties or demolition.

### Quick Comparison

| Feature | Collector NA | Gram Panchayat |
|---|---|---|
| Bank Loan | Yes, 70-80% | No, or high-interest only |
| Infrastructure | Regulated, wide roads, drainage | Unregulated, narrow roads |
| Appreciation | High, secure resale | Low, highly risky |

> NAPLOTPUNE exclusively features Collector NA / PMRDA Sanctioned plots. Projects like 24K Premium and The f Row offer fully-approved layouts with bank loan options from leading financial institutions.`
  },
  {
    id: "blog_hinjewadi_hotspot",
    title: "Why Maan and Marunji are the Top Plot Hotspots Near Hinjewadi",
    category: "Market Trends",
    date: "May 08, 2026",
    readTime: "4 min read",
    img: "/Images/AdAndBlog/Gemini_Generated_Image_liow76liow76liow.png",
    short: "With the Hinjewadi-Shivajinagar Metro Line and Ring Road, Hinjewadi's adjoining areas are experiencing huge land appreciation.",
    fullContent: `### Hinjewadi's Expansion Beyond Tech Parks
Hinjewadi employs over 400,000 tech professionals. As commercial development saturates Phase 1, 2, and 3, residential demand is spilling into Maan and Marunji.

### Key Growth Drivers

**1. Infrastructure & Connectivity**
- **Pune Metro Line 3:** The 23-km elevated metro connecting Hinjewadi to Shivajinagar is nearing completion, with stations near Maan dramatically reducing commute times.
- **PMRDA Ring Road:** The 128-km Ring Road will pass through these sectors, offering direct Mumbai-Pune Expressway access.

**2. Walk-To-Work Culture**
- Maan and Marunji are just 5–10 minutes from Wipro, Infosys, Cognizant, and TCS campuses — ideal for techies tired of traffic.

**3. High ROI Potential**
- Ready apartments in Hinjewadi cost ₹7,500+ per sqft, while NA plots in Maan-Marunji are available at ₹30–40 Lacs for 1,800 sqft.
- Land prices in Maan have grown 18–22% annually over the last 5 years, outpacing apartment appreciation.

### Gated Plotting vs. Standalone Land
Standalone village land carries security and encroachment risks. Gated communities provide concrete roads, water supply, electricity, security, and clubhouse amenities.

> NAPLOTPUNE's flagship projects — 24K Premium and 24K Real Assets in Maan, and 24K Solitaire Assets in Marunji — represent premier gated investments at the doorstep of Hinjewadi IT Hub.`
  },
  {
    id: "blog_vogue_living",
    title: "The Concept of Vogue Villa Living: Design Your Own Sanctuary",
    category: "Architecture",
    date: "May 03, 2026",
    readTime: "5 min read",
    img: "/Images/AdAndBlog/Gemini_Generated_Image_pwr3dxpwr3dxpwr3.png",
    short: "Ditch the cookie-cutter apartments. Learn how gated NA plots give you the freedom to build customized double-height luxury villas.",
    fullContent: `### Apartment Living vs. Bespoke Villa Living
Standard 2-3 BHK apartments can feel restrictive — shared walls, limited natural light, high maintenance, and cookie-cutter layouts. Vogue Villa Living is the counter-trend: purchase a sanctioned NA plot inside a gated community and build a fully customized architectural masterpiece.

### The Freedom of Bespoke Design
- **Architectural Expression:** Build a double-height glass facade, minimalist villa, or traditional exposed-brick home.
- **Private Amenities:** Integrate a private pool, terrace garden, sunset deck, or outdoor barbecue lounge.
- **Generous Spaces:** Plan high ceilings, home offices, theatre rooms, or a personal gym.

### Building Guidelines for NA Plots

**1. Floor Space Index (FSI)**
Most PMRDA layouts allow FSI between 1.0 and 1.5 — you can construct total floor area up to 1.5× your plot size.

**2. Setback Margins**
Standard open margins required on all four sides for ventilation and road access.

**3. Height Limitations**
Residential villas are permitted up to G+2 or G+3 floors (approx. 12 meters).

### Gated Infrastructure Advantage
Building on isolated plots means arranging water, electricity, and security yourself. Gated developments provide underground electric cables, municipal water, security guards, and landscape parks — all ready-made.

> At The f Row in Paud, a fashion-inspired Vogue villa plotting community, we offer ready-to-construct plots with premium amenities. Our partners assist from design to delivery.`
  }
];

const videoGuides = [
  {
    id: "vid_1",
    title: "Guide: 5 Things to Check Before Buying Plots in Pune",
    duration: "3:42",
    thumb: "/Images/Projects/tatasthu_banner.avif",
    tag: "PLOT BUYER GUIDE",
    link: "#"
  },
  {
    id: "vid_2",
    title: "NAPLOTPUNE: Standard Gated Infrastructure Walkthrough",
    duration: "4:15",
    thumb: "/Images/AdAndBlog/Gemini_Generated_Image_51d5wr51d5wr51d5.png",
    tag: "INFRASTRUCTURE TOUR",
    link: "#"
  }
];

// ─── 1. AD BANNERS SECTION ───────────────────────────────────────────────────

export function AdBanners() {
  return (
    <section className="w-full bg-[#FCFDFE] py-8">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Left Banner: Beyond Bliss Lonavala */}
          <div className="relative rounded-2xl overflow-hidden bg-slate-900 h-[220px] flex items-center group shadow-md border border-slate-800 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <img
                src="/Images/Projects/beyond bliss lonavala.avif"
                alt="Beyond Bliss Lonavala"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-55"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 p-6 flex flex-col justify-between h-full w-[70%] select-none">
              <div>
                <span className="bg-primary text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full w-fit">
                  Waterfront Living
                </span>
                <h3 className="text-white text-xl font-bold mt-2 leading-tight">
                  Beyond Bliss Lonavala
                </h3>
                <p className="text-gray-300 text-xs mt-2 font-medium line-clamp-2">
                  Luxury 4 BHK villas & premium waterfront plots nestled in the misty valleys of Lonavala.
                </p>
              </div>

              <div className="mt-4">
                <a
                  href="https://beyondblisslonavala.com/"
                  // onClick={(e) => {
                  //   e.preventDefault();
                  //   const el = document.getElementById("book-visit");
                  //   if (el) el.scrollIntoView({ behavior: "smooth" });
                  //   else alert("Please contact us to schedule a private preview of Beyond Bliss Lonavala.");
                  // }}
                  className="bg-white hover:bg-gray-100 text-slate-900 text-xs font-bold px-4 py-2.5 rounded-full inline-flex items-center gap-1.5 transition-all duration-300 transform active:scale-95 shadow-lg"
                >
                  Schedule Preview <ArrowRight size={12} />
                </a>
              </div>
            </div>

            {/* Badge overlay */}
            <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md">
              Coming Soon
            </div>
          </div>

          {/* Right Banner: The f Row Paud */}
          <div className="relative rounded-2xl overflow-hidden bg-amber-950 h-[220px] flex items-center group shadow-md border border-amber-900/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <img
                src="/Images/Projects/frow_banner.avif"
                alt="The f Row"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-55"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-amber-950 via-amber-900/90 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 p-6 flex flex-col justify-between h-full w-[70%] select-none">
              <div>
                <span className="bg-yellow-500 text-amber-950 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full w-fit">
                  Vogue Villas
                </span>
                <h3 className="text-white text-xl font-bold mt-2 leading-tight">
                  The f Row — Vogue Living
                </h3>
                <p className="text-gray-300 text-xs mt-2 font-medium line-clamp-2">
                  Fashion-inspired gated plotting community & designer villas in Paud, Pune. Ready infrastructure.
                </p>
              </div>

              <div className="mt-4">
                <a
                  href="https://thefrow.in/"
                  // onClick={(e) => {
                  //   e.preventDefault();
                  //   alert("Welcome to The f Row! Gated NA plot bookings are now open. Our team will contact you shortly.");
                  // }}
                  className="bg-yellow-500 hover:bg-yellow-400 text-amber-950 text-xs font-bold px-4 py-2.5 rounded-full inline-flex items-center gap-1.5 transition-all duration-300 transform active:scale-95 shadow-lg"
                >
                  Explore Gated Plots <ArrowRight size={12} />
                </a>
              </div>
            </div>

            {/* Price Badge */}
            <div className="absolute top-4 right-4 bg-yellow-500/20 backdrop-blur-md border border-yellow-500/30 text-yellow-300 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md">
              From ₹35 Lac*
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ─── 2. REAL ESTATE & PLOT KNOWLEDGE HUB ─────────────────────────────────────

export function RealEstateGuide() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  // Interactive Checklist State
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({
    rera: false,
    satbara: false,
    na: false,
    demarcation: false,
    zone: false,
    layout: false
  });

  const checklistItems = [
    { id: "rera", label: "MahaRERA Registration", desc: "Ensure layout is certified on maharera.maharashtra.gov.in" },
    { id: "satbara", label: "7/12 Extract (Class-1 Title)", desc: "Check Bhogvautadar Varg-1 for no-consent resale permission" },
    { id: "na", label: "Collector NA Approval", desc: "Must be sanctioned under Section 44 of Land Revenue Code" },
    { id: "demarcation", label: "Demarcation & Boundary Maps", desc: "Land boundaries precisely measured and physically marked" },
    { id: "zone", label: "Residential Zone Clearance", desc: "Verify zoning certificate to ensure house building permission" },
    { id: "layout", label: "Town Planning Layout Sanction", desc: "Layout approved by PMRDA or regional town planning body" }
  ];

  const handleCheck = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const progressCount = Object.values(checkedItems).filter(Boolean).length;
  const progressPercent = Math.round((progressCount / checklistItems.length) * 100);

  // Filter Blogs based on category and search query
  const filteredBlogs = useMemo(() => {
    return blogsData.filter(blog => {
      const matchesCategory = selectedCategory === "All" || blog.category === selectedCategory;
      const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.short.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section className="w-full bg-white py-12 border-t border-gray-100">
      <div className="max-w-[1200px] mx-auto px-4">

        {/* Hub Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <h2 className="text-[#0F172A] text-2xl md:text-3xl font-extrabold tracking-tight">
              NAPLOTPUNE Knowledge Hub
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Your comprehensive guide to premium NA plot investments, land verification, and villa construction.
            </p>
          </div>
          <div className="w-20 h-1 bg-primary mt-3 md:mt-0 rounded" />
        </div>

        {/* Layout Grid: Blogs (Left) + Interactive Checklist/Videos (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT 2/3 COLUMN: Interactive Blogs */}
          <div className="lg:col-span-2 space-y-6">

            {/* Filter Bar & Search */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-gray-50 p-3 rounded-2xl border border-gray-100">
              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide py-1">
                {["All", "Legal & Land", "Investment", "Market Trends", "Architecture"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 select-none ${selectedCategory === cat
                      ? "bg-primary text-white shadow-sm"
                      : "bg-white text-slate-600 hover:bg-gray-100 hover:text-slate-900 border border-gray-200/60"
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="relative min-w-[200px]">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-1.5 bg-white border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all text-slate-800"
                />
              </div>
            </div>

            {/* Blogs List */}
            {filteredBlogs.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filteredBlogs.map((blog) => (
                  <article
                    key={blog.id}
                    className="flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group h-full"
                  >
                    {/* Cover Photo */}
                    <div className="relative h-[160px] overflow-hidden bg-gray-100">
                      <img
                        src={blog.img}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-slate-800 text-[10px] font-bold px-2.5 py-1 rounded-md shadow-sm border border-white/40">
                        {blog.category}
                      </span>
                    </div>

                    {/* Blog Card Content */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Meta Row */}
                        <div className="flex items-center gap-3 text-gray-400 text-[11px] font-medium mb-2.5">
                          <span className="flex items-center gap-1">
                            <Calendar size={11} /> {blog.date}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-gray-300" />
                          <span className="flex items-center gap-1">
                            <Clock size={11} /> {blog.readTime}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-slate-900 font-bold text-sm sm:text-base leading-snug group-hover:text-primary transition-colors cursor-pointer line-clamp-2">
                          {blog.title}
                        </h3>

                        {/* Short Description */}
                        <p className="text-gray-500 text-xs leading-relaxed mt-2 line-clamp-3">
                          {blog.short}
                        </p>
                      </div>

                      {/* Read CTA */}
                      <button
                        onClick={() => setSelectedBlog(blog)}
                        className="text-primary hover:text-primary-dark font-bold text-xs flex items-center gap-1 w-fit group/btn mt-5 transition-colors cursor-pointer"
                      >
                        Read Full Article
                        <ChevronRight size={13} className="transform group-hover/btn:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
                <FileText className="mx-auto text-gray-300 mb-3" size={32} />
                <p className="text-slate-600 font-semibold text-sm">No articles found</p>
                <p className="text-gray-400 text-xs mt-1">Try resetting your filters or search terms.</p>
              </div>
            )}
          </div>

          {/* RIGHT 1/3 COLUMN: Legal Checklist & Video Tutorials */}
          <div className="space-y-6">

            {/* INTERACTIVE LEGAL CHECKLIST WIDGET */}
            <div className="bg-[#1e293b] rounded-2xl p-5 text-white border border-slate-800 shadow-lg relative overflow-hidden">
              {/* Background accent */}
              <div className="absolute -right-16 -top-16 w-36 h-36 rounded-full bg-white/5 pointer-events-none" />

              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="text-emerald-400 shrink-0" size={20} />
                <h3 className="font-extrabold text-sm sm:text-base tracking-tight">NA Plot Legal Safety</h3>
              </div>
              <p className="text-slate-300 text-xs mb-4">
                Verify these 6 critical pillars before purchasing. Track your plot's compliance:
              </p>

              {/* Progress Bar */}
              <div className="mb-5 bg-slate-900/60 p-3 rounded-xl border border-slate-700/40">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-300 mb-1.5">
                  <span>Verification Progress</span>
                  <span className={`${progressPercent === 100 ? "text-emerald-400 font-extrabold animate-bounce" : "text-emerald-300"}`}>
                    {progressPercent}% Checked
                  </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden shadow-inner">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                {progressPercent === 100 && (
                  <p className="text-[10px] text-emerald-400 font-bold mt-2 text-center bg-emerald-500/10 py-1 rounded border border-emerald-500/20">
                    🎉 Your Plot is Legally Sound &amp; Safe!
                  </p>
                )}
              </div>

              {/* Checklist Items */}
              <div className="space-y-2.5">
                {checklistItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleCheck(item.id)}
                    className="flex items-start gap-2.5 p-2 bg-slate-900/20 hover:bg-slate-900/50 border border-slate-800/40 hover:border-slate-800 rounded-xl cursor-pointer transition-all duration-200 select-none group"
                  >
                    <div className="mt-0.5 shrink-0">
                      <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${checkedItems[item.id]
                        ? "bg-emerald-500 border-emerald-500 text-slate-900"
                        : "border-slate-600 group-hover:border-slate-400 text-transparent"
                        }`}>
                        <svg className="w-3 h-3 fill-none stroke-current" strokeWidth="3" viewBox="0 0 24 24">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h4 className={`text-[11px] font-bold transition-colors leading-tight ${checkedItems[item.id] ? "text-emerald-400 line-through opacity-70" : "text-slate-100"
                        }`}>
                        {item.label}
                      </h4>
                      <p className="text-[9px] text-slate-400 leading-normal mt-0.5 line-clamp-1">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* VIDEO GUIDES & WALKTHROUGHS */}
            {/* <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300">
              <h3 className="text-slate-900 font-bold text-sm sm:text-base mb-4 flex items-center gap-2">
                <span className="w-1.5 h-3.5 bg-primary rounded-sm" />
                Plot Video Library
              </h3>

              <div className="space-y-4">
                {videoGuides.map((vid) => (
                  <div key={vid.id} className="flex gap-3 group/vid border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                    
                    <div className="relative shrink-0 w-[95px] h-[65px] rounded-lg overflow-hidden bg-gray-100 shadow-sm cursor-pointer">
                      <img
                        src={vid.thumb}
                        alt={vid.title}
                        className="w-full h-full object-cover group-hover/vid:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/15 group-hover/vid:bg-black/30 transition-colors flex items-center justify-center">
                        <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-md transform group-hover/vid:scale-110 transition-all duration-300">
                          <Play size={8} fill="#D8232A" className="text-primary ml-[0.5px]" />
                        </div>
                      </div>
                      <span className="absolute bottom-1 right-1 bg-black/75 text-white text-[8px] font-bold px-1 rounded">
                        {vid.duration}
                      </span>
                    </div>

                
                    <div className="flex-1 flex flex-col justify-center">
                      <span className="text-[8px] font-extrabold text-primary uppercase tracking-wider mb-0.5">
                        {vid.tag}
                      </span>
                      <h4
                        onClick={() => alert(`Launching Video Tutorial: "${vid.title}". Premium high-definition walkthrough and full commentary loaded.`)}
                        className="text-slate-800 font-bold text-[11px] leading-snug cursor-pointer hover:text-primary transition-colors line-clamp-2"
                      >
                        {vid.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div> */}

          </div>

        </div>

      </div>

      {/* ─── 3. FULL BLOG DETAIL MODAL (PORTAL) ───────────────────────────────── */}
      {selectedBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm px-4 py-6 transition-all duration-300 overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[85vh] overflow-y-auto relative shadow-2xl animate-in zoom-in-95 duration-200 border border-slate-100 flex flex-col">

            {/* Header bar with Close Button */}
            <div className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex items-center justify-between z-20">
              <div className="flex items-center gap-2">
                <span className="bg-primary/10 text-primary text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md">
                  {selectedBlog.category}
                </span>
                <span className="text-gray-400 text-xs font-semibold flex items-center gap-1">
                  <Clock size={12} /> {selectedBlog.readTime}
                </span>
              </div>
              <button
                onClick={() => setSelectedBlog(null)}
                className="text-gray-400 hover:text-gray-800 transition-colors bg-gray-100 hover:bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer font-bold text-xs"
              >
                ✕
              </button>
            </div>

            {/* Cover image in modal */}
            <div className="relative h-[240px] shrink-0 bg-gray-100">
              <img
                src={selectedBlog.img}
                alt={selectedBlog.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h1 className="text-white font-extrabold text-lg sm:text-2xl leading-tight drop-shadow-md">
                  {selectedBlog.title}
                </h1>
              </div>
            </div>

            {/* Article Content */}
            <div className="p-6 md:p-8 flex-1 overflow-y-auto">
              {/* Publisher Card */}
              <div className="flex items-center gap-3 border-b border-gray-100 pb-5 mb-6">
                <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold text-xs border border-slate-800 select-none">
                  NP
                </div>
                <div>
                  <h4 className="text-slate-800 font-bold text-xs sm:text-sm">NAPLOTPUNE Editorial</h4>
                  <p className="text-gray-400 text-[10px] sm:text-xs">Expert Land Investment Advisory • Published {selectedBlog.date}</p>
                </div>
              </div>

              {/* Markdown Styled Body */}
              <div className="prose prose-slate max-w-none text-slate-700 text-xs sm:text-sm leading-relaxed">
                {(() => {
                  const lines = selectedBlog.fullContent.split("\n");
                  const elements: React.ReactNode[] = [];
                  let idx = 0;

                  // Helper: render inline bold/italic markdown as JSX
                  const renderInline = (text: string): React.ReactNode[] => {
                    const parts: React.ReactNode[] = [];
                    const regex = /\*\*(.+?)\*\*|\*(.+?)\*/g;
                    let lastIndex = 0;
                    let match: RegExpExecArray | null;
                    let k = 0;
                    while ((match = regex.exec(text)) !== null) {
                      if (match.index > lastIndex) {
                        parts.push(text.slice(lastIndex, match.index));
                      }
                      if (match[1]) {
                        parts.push(<strong key={k++} className="font-bold text-slate-900">{match[1]}</strong>);
                      } else if (match[2]) {
                        parts.push(<em key={k++} className="italic">{match[2]}</em>);
                      }
                      lastIndex = regex.lastIndex;
                    }
                    if (lastIndex < text.length) {
                      parts.push(text.slice(lastIndex));
                    }
                    return parts;
                  };

                  while (idx < lines.length) {
                    const line = lines[idx].trim();

                    // Skip empty lines
                    if (!line) { idx++; continue; }

                    // ### Headings
                    if (line.startsWith("###")) {
                      elements.push(
                        <h3 key={`h-${idx}`} className="text-slate-900 font-extrabold text-sm sm:text-base tracking-tight mt-7 mb-2 border-l-4 border-primary pl-3">
                          {line.replace(/^###\s*/, "")}
                        </h3>
                      );
                      idx++;
                      continue;
                    }

                    // > Blockquotes
                    if (line.startsWith(">")) {
                      const quoteLines: string[] = [];
                      while (idx < lines.length && lines[idx].trim().startsWith(">")) {
                        quoteLines.push(lines[idx].trim().replace(/^>\s*/, ""));
                        idx++;
                      }
                      elements.push(
                        <div key={`bq-${idx}`} className="bg-primary/5 border-l-4 border-primary p-4 rounded-r-xl my-5">
                          <p className="text-slate-700 font-medium text-xs sm:text-sm italic leading-relaxed">
                            {renderInline(quoteLines.join(" "))}
                          </p>
                        </div>
                      );
                      continue;
                    }

                    // | Tables |
                    if (line.startsWith("|")) {
                      const tableLines: string[] = [];
                      while (idx < lines.length && lines[idx].trim().startsWith("|")) {
                        tableLines.push(lines[idx].trim());
                        idx++;
                      }
                      // Filter out separator rows (|---|---|)
                      const dataRows = tableLines.filter(r => !/^\|[\s\-|]+\|$/.test(r));
                      if (dataRows.length > 0) {
                        const headerCells = dataRows[0].split("|").filter(c => c.trim());
                        const bodyRows = dataRows.slice(1);
                        elements.push(
                          <div key={`tbl-${idx}`} className="my-5 overflow-x-auto rounded-xl border border-gray-200">
                            <table className="w-full text-xs sm:text-sm">
                              <thead>
                                <tr className="bg-slate-50 border-b border-gray-200">
                                  {headerCells.map((cell, ci) => (
                                    <th key={ci} className="px-4 py-2.5 text-left font-bold text-slate-800 text-xs">
                                      {renderInline(cell.trim())}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {bodyRows.map((row, ri) => {
                                  const cells = row.split("|").filter(c => c.trim());
                                  return (
                                    <tr key={ri} className={`border-b border-gray-100 ${ri % 2 === 1 ? "bg-gray-50/50" : ""}`}>
                                      {cells.map((cell, ci) => (
                                        <td key={ci} className="px-4 py-2.5 text-slate-600 font-medium text-xs">
                                          {renderInline(cell.trim())}
                                        </td>
                                      ))}
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        );
                      }
                      continue;
                    }

                    // - Bullet lists (collect consecutive lines)
                    if (line.startsWith("- ")) {
                      const listItems: string[] = [];
                      while (idx < lines.length && lines[idx].trim().startsWith("- ")) {
                        listItems.push(lines[idx].trim().replace(/^-\s*/, ""));
                        idx++;
                      }
                      elements.push(
                        <ul key={`ul-${idx}`} className="space-y-2 my-3 pl-1">
                          {listItems.map((item, li) => (
                            <li key={li} className="flex items-start gap-2.5 text-slate-700 font-medium">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-[6px] shrink-0" />
                              <span>{renderInline(item)}</span>
                            </li>
                          ))}
                        </ul>
                      );
                      continue;
                    }

                    // **Bold sub-heading** (standalone bold line used as section label)
                    if (/^\*\*[\d]+\./.test(line) || (/^\*\*[^*]+\*\*$/.test(line) && !line.startsWith("###"))) {
                      const text = line.replace(/^\*\*/, "").replace(/\*\*$/, "");
                      elements.push(
                        <h4 key={`bh-${idx}`} className="text-slate-800 font-bold text-xs sm:text-sm mt-5 mb-1">
                          {text}
                        </h4>
                      );
                      idx++;
                      continue;
                    }

                    // Regular paragraph
                    elements.push(
                      <p key={`p-${idx}`} className="text-slate-600 font-medium leading-relaxed my-2">
                        {renderInline(line)}
                      </p>
                    );
                    idx++;
                  }

                  return elements;
                })()}
              </div>

              {/* Interactive Footer Offer */}
              <div className="mt-8 bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-5 border border-slate-800 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-sm sm:text-base">Interested in site verification?</h4>
                  <p className="text-slate-300 text-xs mt-0.5">Book a free guided tour to Maan, Paud, or Lonavala plots today.</p>
                </div>
                <button
                  onClick={() => {
                    setSelectedBlog(null);
                    const el = document.getElementById("book-visit");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                    else alert("Please request a call back or schedule a visit. Our team will contact you instantly.");
                  }}
                  className="bg-primary hover:bg-primary-dark text-white text-xs font-bold px-4 py-2.5 rounded-full transition-all shrink-0 active:scale-95 cursor-pointer shadow-lg shadow-primary/20"
                >
                  Book Free Site Visit
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </section>
  );
}

// ─── DEFAULT EXPORT: COMBINED VIEW ───────────────────────────────────────────

export default function AdAndGuide() {
  return (
    <div className="w-full bg-[#FCFDFE]">
      <AdBanners />
      <RealEstateGuide />
    </div>
  );
}