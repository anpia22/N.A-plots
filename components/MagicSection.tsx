"use client"
import React from 'react';
import { CheckCircle, ArrowRight, Phone } from "lucide-react";
import Image from 'next/image';

const bankPartners = [
    { name: "HDFC Limited", logo: "/Images/hdfc.svg", rate: "Starts at 8.5%", color: "#003399" },
    { name: "L&T Financial", logo: "/Images/lt.svg", rate: "Starts at 7.8%", color: "#e8a000" },
    { name: "SBI", logo: "/Images/sbi.svg", rate: "Starts at 7.25%", color: "#22408e", isSBI: true },
    { name: "Canara Bank", logo: "/Images/canara.svg", rate: "Starts at 7.15%", color: "#0057a8" },
    { name: "Bank of Baroda", logo: "/Images/bob.svg", rate: "Starts at 7.2%", color: "#f47920" },
];

interface Bank {
    name: string;
    logo: string;
    rate: string;
    color: string;
    isSBI?: boolean;
}

function BankCard({ bank }: { bank: Bank }) {
    return (
        <div className="border border-gray-100 rounded-lg px-3 py-2 min-w-[130px] flex flex-col items-center justify-between h-[65px] bg-white hover:shadow-sm transition-shadow cursor-pointer">
            <div className="flex-1 flex items-center justify-center w-full px-1">
                <img src={bank.logo} alt={bank.name} className="max-h-[22px] w-auto object-contain" />
            </div>
            <p className="text-[#0099cc] text-[10px] font-bold mt-1">{bank.rate}</p>
        </div>
    );
}

export default function MagicSections() {
    return (
        <section className="w-full bg-white py-8">
            <div className="max-w-[1200px] mx-auto px-4 space-y-6">

                {/* ── MagicDiary Banner ── */}
                <div className="relative rounded-2xl bg-[#e6f7fb] border border-[#c8eaf5] px-6 py-6 md:px-10 md:py-8 flex flex-col md:flex-row md:items-center justify-between gap-6 overflow-hidden group">
                    {/* Architecture outline sketch */}
                    <div className="absolute right-0 top-0 h-full w-[40%] opacity-[0.08] pointer-events-none group-hover:opacity-[0.12] transition-opacity hidden md:block">
                        <Image src='/Images/h4-vector.png' alt="RisingPlotte" fill className='object-contain' />
                    </div>

                    {/* Left content */}
                    <div className="z-10 flex flex-col items-start text-left">
                        <h2 className="text-[#1a1a1a] text-[18px] sm:text-[22px] font-medium leading-tight mb-4">
                            Plan hassle-free <span className="font-bold">Site Visits & Evaluate Projects</span> with <br className="hidden md:inline" />
                            <span className="font-bold text-xl sm:text-2xl">NAPlotPune</span>
                        </h2>
                        <div className="inline-flex items-center gap-2 bg-[#fef7e7] border border-[#f5e6c4] rounded-lg px-3 py-1.5 shadow-sm">
                            <span className="text-[#333] text-xs sm:text-sm">
                                Call us for <span className="font-bold">Site Visits</span>
                            </span>
                            <span className="text-lg sm:text-xl">🚕✨</span>
                        </div>
                    </div>

                    {/* CTA */}

                    <button className="z-10 bg-primary hover:bg-primary-dark text-white font-bold text-sm px-8 py-3 rounded-full transition-all shadow-lg hover:scale-105 max-w-[200px] cursor-pointer">
                        <Phone className='inline mr-2 h-5 w-5' /> Call Us Now
                    </button>
                </div>

                {/* Hide This Section - Will be updated later */}
                <div className='hidden'>
                    {/* ── MagicLoans Section ── */}
                    <div className="relative rounded-2xl border border-gray-100 bg-white overflow-hidden px-6 py-6 md:px-10 md:py-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 shadow-sm">
                        {/* Left content */}
                        <div className="flex-1 max-w-[650px] z-10">
                            {/* Brand */}
                            <div className="flex items-center gap-0.5 mb-4">
                                <span className="text-primary font-bold text-2xl italic" style={{ fontFamily: "serif" }}>NA</span>
                                <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center border border-red-200">
                                    <div className="w-3.5 h-3.5 rounded-full bg-primary flex items-center justify-center">
                                        <span className="text-white text-[8px] font-bold">₹</span>
                                    </div>
                                </div>
                                <span className="text-primary font-bold text-2xl italic ml-0.5" style={{ fontFamily: "serif" }}>loans</span>
                            </div>

                            {/* Heading */}
                            <h2 className="text-[#1a1a1a] font-bold text-xl sm:text-2xl mb-3">
                                Compare Home Loan Offers from 40+ Banks
                            </h2>

                            {/* Checkpoints */}
                            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-6">
                                <div className="flex items-center gap-1.5">
                                    <CheckCircle size={16} className="text-gray-300 shrink-0" />
                                    <span className="text-gray-600 text-sm">
                                        Rates starting from <span className="text-[#0099cc] font-bold text-[15px]">7.1%</span>
                                    </span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <CheckCircle size={16} className="text-gray-300 shrink-0" />
                                    <span className="text-gray-600 text-sm">
                                        <span className="text-[#0099cc] font-bold text-[15px]">0%*</span> Processing Fee
                                    </span>
                                </div>
                            </div>

                            {/* Banking partners label */}
                            <p className="text-[#c8a000] text-[10px] font-bold uppercase tracking-[0.1em] mb-4 opacity-80">
                                OUR BANKING PARTNERS
                            </p>

                            {/* Bank cards row */}
                            <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2 w-full [&::-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:none]">
                                {bankPartners.map((bank) => (
                                    <BankCard key={bank.name} bank={bank} />
                                ))}
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 w-full sm:w-auto">
                                <a
                                    href="#"
                                    className="text-primary font-bold text-[15px] flex items-center gap-1 hover:underline shrink-0"
                                >
                                    Explore Bank Offers <ArrowRight size={18} />
                                </a>
                                <button className="w-full sm:w-auto bg-primary hover:bg-primary-dark text-white font-bold text-sm px-10 py-3.5 rounded-full transition-all shadow-xl shadow-red-100 hover:scale-105 active:scale-95 text-center flex items-center justify-center">
                                    Check Your Eligibility
                                </button>
                            </div>
                        </div>

                        {/* Right: Hand + House Illustration */}
                        <div className="relative z-10 flex items-center justify-center w-full lg:w-[320px] h-[200px] lg:h-[250px] mt-6 lg:mt-0 overflow-hidden lg:overflow-visible">
                            {/* Peach soft blob background */}
                            <div className="absolute inset-0 bg-[#fff5eb] rounded-full blur-3xl opacity-60 scale-125 translate-x-10 translate-y-10" />

                            {/* Hand and House SVG */}
                            <div className="w-[280px] lg:w-[700px] h-auto relative transform lg:translate-x-6 lg:scale-110">
                                <Image src='/Images/Build-in-hand.png' alt="Build-in-hand" width={700} height={700} className='object-contain' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}