import { Folder, FileText, MessageSquare } from "lucide-react";

const features = [
    {
        id: 1,
        icon: <Folder size={36} className="text-[#00b0d4]" />,
        label: "Directory for All NA Plots",
        bg: "bg-[#e0f9f9]",
    },
    {
        id: 2,
        icon: <FileText size={36} className="text-[#e05a5a]" />,
        label: "All Reports from RERA",
        bg: "bg-[#fce8e8]",
    },
    {
        id: 3,
        icon: <MessageSquare size={36} className="text-[#e8a020]" />,
        label: "Expert Reviews & Advice",
        bg: "bg-[#fef6df]",
    },
];

export default function MagicHomes() {
    return (
        <section className="w-full bg-[#f0fafc] py-12">
            <div className="max-w-[1200px] mx-auto px-4 text-center">

                {/* New Launch badge */}
                <div className="inline-flex items-center gap-1 bg-[#f5c518] text-[#1a1a1a] text-xs font-bold px-3 py-1 rounded-full mb-5 tracking-wide">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a] inline-block" />
                    New Launch
                </div>

                {/* Logo / Brand */}
                <div className="flex items-center justify-center gap-1 mb-2 flex-nowrap whitespace-nowrap">
                    <span className="text-primary font-bold text-3xl sm:text-4xl tracking-tight" style={{ fontFamily: "Georgia, serif" }}>
                        NA
                    </span>
                    {/* Home icon replacing 'o' */}
                    <span className="relative inline-flex items-center">
                        <span
                            className="text-primary font-bold text-3xl sm:text-4xl tracking-tight"
                            style={{ fontFamily: "Georgia, serif" }}
                        >H</span>
                        <span
                            className="absolute bottom-[14px] left-0 right-0 flex justify-center"
                            style={{ fontSize: 10 }}
                        >
                            <svg viewBox="0 0 16 12" width="16" height="12" fill="#D8232A">
                                <path d="M8 0L0 6h2v6h4V8h4v4h4V6h2z" />
                            </svg>
                        </span>
                    </span>
                    <span className="text-primary font-bold text-3xl sm:text-4xl tracking-tight" style={{ fontFamily: "Georgia, serif" }}>
                        omes
                    </span>
                </div>

                {/* Subheading */}
                <p className="text-[#1a1a1a] font-bold text-xl mb-8">
                    Encyclopedia For All New Projects
                </p>

                {/* Feature cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8 w-full">
                    {features.map((f) => (
                        <div
                            key={f.id}
                            className={`${f.bg} rounded-2xl px-6 py-5 flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow`}
                        >
                            <div className="shrink-0">{f.icon}</div>
                            <p className="text-[#1a1a1a] font-semibold text-sm text-left leading-snug">
                                {f.label}
                            </p>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <button className="bg-primary hover:bg-primary-dark text-white font-bold text-sm px-10 py-3 rounded-full transition-colors">
                    View All New projects
                </button>
            </div>
        </section>
    );
}