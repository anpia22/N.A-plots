"use client"
import { ReactNode, useState, useMemo } from "react";
import { Image, ChevronRight, ArrowRight, Calculator, Home, Ruler, TrendingUp, Calendar } from "lucide-react";

// ─── Exclusive Owner Properties ───────────────────────────────────────────────

const properties = [
    {
        id: 1,
        type: "2 BHK Flat",
        price: "₹1.20 Cr",
        locality: "Wakad, Pune",
        status: "Ready to Move",
        photos: 7,
        img: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=400&q=80",
    },
    {
        id: 2,
        type: "3 BHK Flat",
        price: "₹95 Lac",
        locality: "Porwal Road, Pune",
        status: "Ready to Move",
        photos: 11,
        img: "https://images.unsplash.com/photo-1560185008-a33f5c7de1a7?w=400&q=80",
    },
    {
        id: 3,
        type: "3 BHK Flat",
        price: "₹1 Cr",
        locality: "Hadapsar, Pune",
        status: "Ready to Move",
        photos: 15,
        img: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&q=80",
    },
    {
        id: 4,
        type: "3 BHK Flat",
        price: "₹1.20 Cr",
        locality: "Wakad, Pune",
        status: "Ready to Move",
        photos: 51,
        img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80",
    },
];

interface Property {
    id: number;
    type: string;
    price: string;
    locality: string;
    status: string;
    photos: number;
    img: string;
}

interface PropertyCardProps {
    property: Property;
}

function PropertyCard({ property }: PropertyCardProps) {
    return (
        <div className="group border border-gray-200 rounded-2xl overflow-hidden bg-white hover:shadow-md transition-shadow cursor-pointer flex flex-col h-full">
            {/* Image */}
            <div className="relative h-[185px] bg-gray-100">
                <img
                    src={property.img}
                    alt={property.type}
                    className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded flex items-center gap-1">
                    <Image size={11} />
                    {property.photos}
                </div>
            </div>

            {/* Details */}
            <div className="px-4 py-4 flex-1 flex flex-col">
                <p className="text-[#555] text-sm mb-0.5">{property.type}</p>
                <p className="text-[#1a1a1a] font-bold text-lg mb-1">{property.price}</p>
                <p className="text-[#555] text-sm mb-2">{property.locality}</p>
                {/* Hover Action Container */}
                <div className="relative mt-auto h-7 overflow-hidden">
                    <p className="text-[#555] text-xs transition-transform duration-300 group-hover:-translate-y-full">
                        {property.status}
                    </p>
                    <button className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-primary text-white text-[10px] font-bold uppercase rounded-full flex items-center justify-center">
                        View Detail
                    </button>
                </div>
            </div>
        </div>
    );
}

export function PremiumProperties() {
    return (
        <section className="w-full bg-white py-8">
            <div className="max-w-[1200px] mx-auto px-4">
                {/* Heading */}
                <div className="flex items-center justify-between mb-1">
                    <h2 className="text-[#1a1a1a] text-xl font-semibold">
                        Premium Properties in Pune
                    </h2>
                    <a
                        href="#"
                        className="text-primary text-sm font-semibold flex items-center gap-1 hover:underline"
                    >
                        Explore all Properties <ChevronRight size={15} />
                    </a>
                </div>
                <div className="w-10 h-[3px] bg-[#FFC107] mb-6" />

                {/* Cards + Arrow */}
                <div className="relative">
                    <div className="flex md:grid md:grid-cols-4 overflow-x-auto md:overflow-visible gap-4 pb-4 md:pb-0 [&::-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:none]">
                        {properties.map((p) => (
                            <div key={p.id} className="w-[280px] shrink-0 md:w-auto md:shrink">
                                <PropertyCard property={p} />
                            </div>
                        ))}
                    </div>

                    {/* Right arrow */}
                    <button className="absolute -right-5 top-[90px] w-10 h-10 rounded-full border border-gray-300 bg-white shadow flex items-center justify-center hover:shadow-md z-10 hidden md:flex">
                        <ChevronRight size={20} className="text-[#333]" />
                    </button>
                </div>
            </div>
        </section>
    );
}

// ─── Advice & Tools ───────────────────────────────────────────────────────────

interface Tool {
    id: number;
    icon: ReactNode;
    title: string;
    desc: string;
    linkText: string;
    href: string;
}

const tools: Tool[] = [
    {
        id: 1,
        icon: <Calculator size={32} strokeWidth={1.5} className="text-[#555]" />,
        title: "Plot EMI Calculator",
        desc: "Estimate your monthly installments for NA plot purchases.",
        linkText: "Calculate Now",
        href: "#emi-calculator",
    },
    {
        id: 2,
        icon: <Calendar size={32} strokeWidth={1.5} className="text-[#555]" />,
        title: "Book a Site Visit",
        desc: "Schedule a free guided site visit to our premium projects.",
        linkText: "Schedule Visit",
        href: "#book-visit",
    },
    {
        id: 3,
        icon: (
            <div className="flex items-end gap-0.5">
                <Home size={28} strokeWidth={1.5} className="text-[#555]" />
                <Ruler size={22} strokeWidth={1.5} className="text-[#555] mb-0.5" />
            </div>
        ),
        title: "Construction Services",
        desc: "Build your dream villa with our end-to-end contracting services.",
        linkText: "View Portfolio",
        href: "#construction",
    },
    {
        id: 4,
        icon: (
            <div className="relative">
                <TrendingUp size={28} strokeWidth={1.5} className="text-primary absolute -top-1 -right-1" />
                <div className="flex items-end gap-0.5 pt-3">
                    {[16, 22, 14, 26, 18].map((h, i) => (
                        <div key={i} className="w-2.5 bg-[#555] rounded-sm" style={{ height: h }} />
                    ))}
                </div>
            </div>
        ),
        title: "Investment Advisory",
        desc: "Get expert advice on Pune's fastest-growing land corridors.",
        linkText: "Talk to an Expert",
        href: "#advisory",
    },
];

interface ToolCardProps {
    tool: Tool;
    onClick: () => void;
}

function ToolCard({ tool, onClick }: ToolCardProps) {
    return (
        <div
            onClick={onClick}
            className="border border-gray-200 rounded-2xl px-5 py-6 bg-white hover:shadow-md transition-shadow cursor-pointer flex flex-col h-full gap-4"
        >
            {/* Icon */}
            <div className="h-10 flex items-end">{tool.icon}</div>

            {/* Text */}
            <div className="flex-1 flex flex-col">
                <h3 className="text-[#1a1a1a] font-bold text-base mb-2">{tool.title}</h3>
                <p className="text-[#666] text-sm leading-snug mb-4 flex-1">{tool.desc}</p>
                <button
                    className="text-primary font-semibold text-sm flex items-center gap-1 hover:underline text-left mt-auto"
                >
                    {tool.linkText} <ArrowRight size={14} />
                </button>
            </div>
        </div>
    );
}

function EMICalculator() {
    const [loanAmount, setLoanAmount] = useState<number>(1000000);
    const [interestRate, setInterestRate] = useState<number>(8.5);
    const [tenureYears, setTenureYears] = useState<number>(5);

    const { emi, totalInterest, totalAmount } = useMemo(() => {
        const principal = loanAmount;
        const rate = interestRate;
        const tenureMonths = tenureYears * 12;
        const r = rate / (12 * 100);

        if (principal <= 0 || rate <= 0 || tenureMonths <= 0) {
            return { emi: 0, totalInterest: 0, totalAmount: 0 };
        }

        const emiValue = (principal * r * Math.pow(1 + r, tenureMonths)) / (Math.pow(1 + r, tenureMonths) - 1);
        const interest = emiValue * tenureMonths - principal;
        const total = principal + interest;

        return {
            emi: emiValue,
            totalInterest: interest,
            totalAmount: total,
        };
    }, [loanAmount, interestRate, tenureYears]);

    const formatCurrency = (val: number) => "₹" + Math.round(val).toLocaleString("en-IN");

    const principalPercentage = totalAmount > 0 ? (loanAmount / totalAmount) * 100 : 100;

    const donutStyle = {
        background: `conic-gradient(#FFC107 0% ${principalPercentage}%, #D8232A ${principalPercentage}% 100%)`,
        borderRadius: "50%",
    };

    return (
        <div className="w-full">
            <div className="flex items-center gap-3 mb-6">
                {/* <div className="bg-red-50 p-2 rounded-full text-primary">
                    <Calculator size={24} />
                </div> */}
                <h3 className="text-2xl font-semibold text-[#1a1a1a]">Plot EMI Calculator</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Sliders */}
                <div className="flex flex-col gap-6">
                    {/* Loan Amount */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="font-semibold text-[#1a1a1a]">Loan Amount</label>
                            <div className="flex items-center border border-gray-300 rounded px-3 py-1 bg-white">
                                <span className="text-gray-500 mr-1 font-bold">₹</span>
                                <input
                                    type="number"
                                    className="w-24 outline-none text-right font-medium"
                                    value={loanAmount}
                                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                                />
                            </div>
                        </div>
                        <input
                            type="range"
                            min={100000}
                            max={10000000}
                            step={50000}
                            value={loanAmount}
                            onChange={(e) => setLoanAmount(Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>1L</span>
                            <span>1Cr</span>
                        </div>
                    </div>

                    {/* Interest Rate */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="font-semibold text-[#1a1a1a]">Rate of Interest (p.a)</label>
                            <div className="flex items-center border border-gray-300 rounded px-3 py-1 bg-white">
                                <span className="text-gray-500 mr-1 font-bold">%</span>
                                <input
                                    type="number"
                                    className="w-16 outline-none text-right font-medium"
                                    value={interestRate}
                                    onChange={(e) => setInterestRate(Number(e.target.value))}
                                />
                            </div>
                        </div>
                        <input
                            type="range"
                            min={1}
                            max={30}
                            step={0.1}
                            value={interestRate}
                            onChange={(e) => setInterestRate(Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>1%</span>
                            <span>30%</span>
                        </div>
                    </div>

                    {/* Tenure */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="font-semibold text-[#1a1a1a]">Loan Tenure</label>
                            <div className="flex items-center border border-gray-300 rounded px-3 py-1 bg-white">
                                <span className="text-gray-500 mr-1 font-bold">Yr</span>
                                <input
                                    type="number"
                                    className="w-16 outline-none text-right font-medium"
                                    value={tenureYears}
                                    onChange={(e) => setTenureYears(Number(e.target.value))}
                                />
                            </div>
                        </div>
                        <input
                            type="range"
                            min={1}
                            max={30}
                            step={1}
                            value={tenureYears}
                            onChange={(e) => setTenureYears(Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>1 Yr</span>
                            <span>30 Yr</span>
                        </div>
                    </div>
                </div>

                {/* Chart & Summary */}
                <div className="flex flex-col items-center justify-center p-6 bg-red-50/50 rounded-2xl border border-red-100">
                    <div className="relative w-48 h-48 mb-6 shadow-sm rounded-full">
                        <div className="absolute inset-0" style={donutStyle}></div>
                        <div className="absolute inset-[12px] bg-white rounded-full flex flex-col items-center justify-center shadow-inner">
                            <span className="text-gray-500 text-[10px] uppercase font-bold tracking-wider mb-0.5">Monthly EMI</span>
                            <span className="text-2xl font-bold text-primary">{formatCurrency(emi)}</span>
                        </div>
                    </div>
                    <div className="flex gap-6 text-sm font-medium">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#FFC107]"></div>
                            <span className="text-[#1a1a1a]">Principal</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-primary"></div>
                            <span className="text-[#1a1a1a]">Interest</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Detailed Summary Boxes */}
            <div className="bg-[#1f0060] p-6 rounded-2xl">
                <h4 className="font-bold text-white mb-4">Detailed Calculation</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white/10 p-4 rounded-xl border border-white/20 flex flex-col gap-1">
                        <span className="text-white/80 text-xs font-medium">Monthly EMI</span>
                        <span className="text-xl font-bold text-white">{formatCurrency(emi)}</span>
                    </div>
                    <div className="bg-white/10 p-4 rounded-xl border border-white/20 flex flex-col gap-1">
                        <span className="text-white/80 text-xs font-medium">Principal Amount</span>
                        <span className="text-xl font-bold text-white">{formatCurrency(loanAmount)}</span>
                    </div>
                    <div className="bg-white/10 p-4 rounded-xl border border-white/20 flex flex-col gap-1">
                        <span className="text-white/80 text-xs font-medium">Total Interest</span>
                        <span className="text-xl font-bold text-white">{formatCurrency(totalInterest)}</span>
                    </div>
                    <div className="bg-white/10 p-4 rounded-xl border border-white/20 flex flex-col gap-1">
                        <span className="text-white/80 text-xs font-medium">Total Amount</span>
                        <span className="text-xl font-bold text-[#FFC107]">{formatCurrency(totalAmount)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function AdviceTools() {
    const [selectedTool, setSelectedTool] = useState<Tool | null>(null);

    return (
        <section className="w-full bg-white py-8">
            <div className="max-w-[1200px] mx-auto px-4">
                {/* Heading */}
                <h2 className="text-[#1a1a1a] text-xl font-semibold mb-1">Advice &amp; Tools</h2>
                <div className="w-10 h-[3px] bg-[#00bcd4] mb-6" />

                {/* Cards + Arrow */}
                <div className="relative">
                    <div className="flex md:grid md:grid-cols-4 overflow-x-auto md:overflow-visible gap-4 pb-4 md:pb-0 [&::-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:none]">
                        {tools.map((tool) => (
                            <div key={tool.id} className="w-[280px] shrink-0 md:w-auto md:shrink">
                                <ToolCard tool={tool} onClick={() => setSelectedTool(tool)} />
                            </div>
                        ))}
                    </div>

                    {/* Right arrow */}
                    <button className="absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-gray-300 bg-white shadow flex items-center justify-center hover:shadow-md z-10 hidden md:flex">
                        <ChevronRight size={20} className="text-[#333]" />
                    </button>
                </div>
            </div>

            {/* Functional Modal */}
            {selectedTool && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 transition-all">
                    <div className={`bg-white rounded-2xl w-full ${selectedTool.id === 1 ? 'max-w-4xl' : 'max-w-md'} max-h-[90vh] overflow-y-auto p-6 relative shadow-2xl animate-in zoom-in-95 duration-200`}>
                        <button
                            onClick={() => setSelectedTool(null)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors z-10 bg-gray-100 hover:bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer"
                        >
                            ✕
                        </button>

                        {selectedTool.id === 1 ? (
                            <EMICalculator />
                        ) : (
                            <>
                                <div className="flex items-center gap-4 mb-2">
                                    <div className="bg-red-50 p-3 rounded-full text-primary">
                                        {selectedTool.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-[#1a1a1a]">{selectedTool.title}</h3>
                                </div>

                                <p className="text-[#555] text-sm mb-6 ml-[68px] -mt-3">{selectedTool.desc}</p>

                                <form
                                    className="flex flex-col gap-4"
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        alert('Success! Our team has received your request and will contact you shortly.');
                                        setSelectedTool(null);
                                    }}
                                >
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-600 mb-1">Full Name</label>
                                        <input
                                            type="text"
                                            placeholder="Enter your name"
                                            required
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-600 mb-1">Email</label>
                                        <input
                                            type="email"
                                            placeholder="Enter your email"
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-600 mb-1">Phone Number</label>
                                        <input
                                            type="tel"
                                            placeholder="+91"
                                            required
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                                        />
                                    </div>

                                    {selectedTool.id === 2 && (
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-600 mb-1">Project Name</label>
                                            <select
                                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm bg-white cursor-pointer"
                                                required
                                                defaultValue=""
                                            >
                                                <option value="" disabled>Select a project</option>
                                                <option value="Codename Prakriti">Codename Prakriti</option>
                                                <option value="Codename Pratham">Codename Pratham</option>
                                                <option value="Codename Joy Estate">Codename Joy Estate</option>
                                                <option value="Crown Estate">Crown Estate</option>
                                                <option value="Mountville">Mountville</option>
                                                <option value="Red Stone">Red Stone</option>
                                                <option value="Eco Town">Eco Town</option>
                                            </select>
                                        </div>
                                    )}
                                    {selectedTool.id === 3 && (
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-600 mb-1">Plot Location / Area</label>
                                            <input
                                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                                                placeholder="Where is your plot located?"
                                            />
                                        </div>
                                    )}
                                    {selectedTool.id === 4 && (
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-600 mb-1">Investment Budget</label>
                                            <input
                                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                                                placeholder="e.g. 50 Lacs - 1 Cr"
                                            />
                                        </div>
                                    )}

                                    <div className="flex items-center gap-2">
                                        {/* consern box */}
                                        <input type="checkbox" id="consern" required className="accent-primary w-4 h-4 cursor-pointer" />
                                        <label htmlFor="consern" className="text-xs font-semibold text-gray-600 mt-0.5">I allow NA Plot to contact me regarding my query.</label>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-primary text-white font-bold rounded-lg py-3 mt-2 hover:bg-red-700 transition-colors shadow-lg shadow-red-500/30"
                                    >
                                        {selectedTool.linkText}
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
}

// ─── Default export: both together ────────────────────────────────────────────
export default function ExclusiveAndAdvice() {
    return (
        <>
            <PremiumProperties />
            <AdviceTools />
        </>
    );
}