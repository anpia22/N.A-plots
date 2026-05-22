"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import RequirementForm from "./RequirementForm";

export default function Navbar() {
  const [isReqModalOpen, setIsReqModalOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-[1440px] mx-auto px-6 h-20 flex items-center justify-between">

          {/* Left Side: Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-95 transition-opacity no-underline">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-heading font-bold text-xl">NA</span>
            </div>
            <span className="font-heading font-bold text-xl text-[#0F172A]">NAPLOTS-PUNE</span>
          </Link>

          {/* Center: Navigation */}
          <div className="hidden lg:flex items-center gap-8 font-medium text-sm text-[#475569]">
            {/* <Link href="/search?type=Flat" className="hover:text-primary transition-colors no-underline">Buy</Link> */}

            <Link href="/plots-in-pune" className="hover:text-primary transition-colors no-underline">Plots</Link>
            <Link href="/villas-in-pune" className="hover:text-primary transition-colors no-underline">Villa</Link>
            <Link href="/bungalow-in-pune" className="hover:text-primary transition-colors no-underline">Bungalow</Link>
            <Link href="/resendential-in-pune" className="hover:text-primary transition-colors no-underline">Resendential</Link>
            <Link href="/commercial-in-pune" className="hover:text-primary transition-colors no-underline">Commercial</Link>
            {/* <Link href="/search?query=Premium&sort=relevance" className="hover:text-primary transition-colors no-underline">New Projects</Link> */}
          </div>

          {/* Right Side: Buttons */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsReqModalOpen(true)}
              className="bg-primary hover:bg-primary-dark text-white px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-[30px] sm:rounded-[34px] text-xs sm:text-sm font-semibold transition-all shadow-md hover:shadow-lg active:scale-95 no-underline flex items-center gap-1 cursor-pointer border-none outline-none"
            >
              <span className="hidden sm:inline">Post Requirement</span>
              <span className="inline sm:hidden">Post Req</span>
              <span className="bg-[#FFC107] text-[#333] text-[8px] sm:text-[9px] font-black px-1.5 py-0.5 rounded-full ml-1 uppercase leading-none">FREE</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Requirement Form Modal */}
      <AnimatePresence>
        {isReqModalOpen && (
          <RequirementForm
            isModal={true}
            onClose={() => setIsReqModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
