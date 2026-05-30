// components/PostPropertyBanner.tsx
// Requires Tailwind CSS v3+ and Dancing Script font loaded in your layout.
"use client"
import React from "react";
import Link from "next/link";
import { useState } from "react";
import RequirementForm from "./RequirementForm";
import { AnimatePresence } from "framer-motion";

export default function PostPropertyBanner() {
    const [isReqModalOpen, setIsReqModalOpen] = useState(false);
    return (
        <section className="w-[calc(100%-2rem)] md:w-full max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between bg-[#fff9e6] rounded-xl px-6 py-5 md:px-8 shadow-sm gap-4 z-10">

            {/* Left: Text */}
            <div className="flex flex-col gap-1 items-center sm:items-start text-center sm:text-left">
                <h2 className="flex items-center justify-center sm:justify-start flex-wrap gap-2 text-xl font-medium text-gray-900 m-0">
                    Want Our help in finding your{" "}
                    <span
                        className="text-2xl font-bold text-gray-900 leading-none"
                        style={{ fontFamily: "'Dancing Script', cursive" }}
                    >
                        dream plot!
                    </span>
                </h2>
                <p className="text-sm text-gray-500 m-0">
                    Get a call from our team for the plots matching your requirement
                </p>
            </div>

            {/* Right: CTA Button */}
            <div
                onClick={() => setIsReqModalOpen(true)}
                className="flex items-center bg-red-600 rounded-full overflow-hidden no-underline transition-all duration-200 hover:bg-primary-orange-dark hover:-translate-y-0.5 flex-shrink-0 cursor-pointer"
                aria-label="Post Property for Free"
            >
                <span className="pl-5 pr-3 py-2.5 text-sm font-bold tracking-wide text-white">
                    Post Requirement
                </span>
                <span className="bg-white text-gray-900 text-[0.6rem] font-extrabold tracking-widest rounded-full px-2.5 py-[5px] mr-2">
                    FREE
                </span>
            </div>
            <AnimatePresence>
                {isReqModalOpen && (
                    <RequirementForm
                        isModal={true}
                        onClose={() => setIsReqModalOpen(false)}
                    />
                )}
            </AnimatePresence>

        </section>
    );
}

/*
  ─── Setup ───────────────────────────────────────────────────────────────────

  1. Load Dancing Script font in app/layout.tsx (App Router)
     or pages/_document.tsx (Pages Router):

     <link
       href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap"
       rel="stylesheet"
     />

  2. Use the component anywhere:

     import PostPropertyBanner from "@/components/PostPropertyBanner";

     export default function Page() {
       return (
         <main className="p-6">
           <PostPropertyBanner />
         </main>
       );
     }

  ─────────────────────────────────────────────────────────────────────────────
*/