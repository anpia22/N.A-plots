import { Folder, FileText, MessageSquare } from "lucide-react";
import Link from "next/link";

const features = [
    {
        id: 1,
        icon: <Folder size={36} className="text-[#00b0d4]" />,
        label: "Directory for All NA Plots",
        bg: "bg-[#e0f9f9]",
        href: "/search?type=Plot",
    },
    {
        id: 2,
        icon: <FileText size={36} className="text-[#e05a5a]" />,
        label: "All Reports from RERA",
        bg: "bg-[#fce8e8]",
        href: "/search?status=Under Construction",
    },
    {
        id: 3,
        icon: <MessageSquare size={36} className="text-[#e8a020]" />,
        label: "Expert Reviews & Advice",
        bg: "bg-[#fef6df]",
        href: "/search",
    },
];

export default function NAPlotsExplorer() {
    return (
        <section className="w-full bg-[#f0fafc] py-12">
            <div className="max-w-[1200px] mx-auto px-4 text-center">

                {/* New Launch badge */}
                <div className="inline-flex items-center gap-1 bg-[#f5c518] text-[#1a1a1a] text-xs font-bold px-3 py-1 rounded-full mb-5 tracking-wide">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a] inline-block" />
                    New Launch
                </div>

                {/* Logo / Brand */}
                <div className="flex items-center justify-center gap-2 mb-2 flex-nowrap whitespace-nowrap">
                    <span className="text-primary font-bold text-3xl sm:text-4xl tracking-tight" style={{ fontFamily: "Georgia, serif" }}>
                        NA
                    </span>
                    <span className="inline-flex items-center text-primary font-bold text-3xl sm:text-4xl tracking-tight" style={{ fontFamily: "Georgia, serif" }}>
                        Pl
                        <span className="inline-flex items-center justify-center mx-[2px] transform -translate-y-[1px]">
                            <svg
                                viewBox="0 0 16 12"
                                className="w-[22px] h-[17px] sm:w-[32px] sm:h-[26px]"
                                fill="currentColor"
                            >
                                <path d="M8 0L0 6h2v6h4V8h4v4h4V6h2z" />
                            </svg>
                        </span>
                        ts
                    </span>
                </div>

                {/* Subheading */}
                <p className="text-[#1a1a1a] font-bold text-xl mb-8">
                    Encyclopedia For All New Projects
                </p>

                {/* Feature cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8 w-full">
                    {features.map((f) => (
                        <Link
                            key={f.id}
                            href={f.href}
                            className={`${f.bg} rounded-2xl px-6 py-5 flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow no-underline block`}
                        >
                            <div className="shrink-0">{f.icon}</div>
                            <p className="text-[#1a1a1a] font-semibold text-sm text-left leading-snug">
                                {f.label}
                            </p>
                        </Link>
                    ))}
                </div>

                {/* CTA */}
                <Link href="/search" className="inline-block no-underline">
                    <button className="bg-primary hover:bg-primary-dark text-white font-bold text-sm px-10 py-3 rounded-full transition-colors cursor-pointer">
                        View All New projects
                    </button>
                </Link>
            </div>
        </section>
    );
}
