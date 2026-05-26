"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft, FileText, Calendar, ChevronRight } from "lucide-react";

export default function TermsAndConditionsPage() {
  const [activeSection, setActiveSection] = useState("acceptance");

  const sections = [
    { id: "acceptance", label: "1. Acceptance of Terms" },
    { id: "eligibility", label: "2. Eligibility & Registration" },
    { id: "listings", label: "3. Property Listings Guide" },
    { id: "conduct", label: "4. User Conduct" },
    { id: "intellectual", label: "5. Intellectual Property" },
    { id: "disclaimers", label: "6. Disclaimers & Brokerage" },
    { id: "liability", label: "7. Limitation of Liability" },
    { id: "governing-law", label: "8. Governing Law & Dispute" },
    { id: "contact", label: "9. Contact Information" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );

    sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((sec) => {
        const el = document.getElementById(sec.id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 100; // offset for sticky navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveSection(id);
    }
  };

  return (
    <div className="w-full bg-[#F8FAFC] min-h-screen font-body text-[#475569]">
      <Navbar />

      {/* Breadcrumbs & Header Hero */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto px-6 py-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
          <Link href="/" className="hover:text-primary transition-colors no-underline">
            Home
          </Link>
          <ChevronRight size={12} />
          <span className="text-text-primary">Terms & Conditions</span>
        </div>

        <div className="max-w-[1200px] mx-auto px-6 pb-12 pt-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 text-primary text-xs font-semibold mb-4 uppercase tracking-wider">
                <FileText size={14} />
                <span>Platform Rules</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-text-primary tracking-tight">
                Terms & Conditions
              </h1>
              <p className="text-sm sm:text-base text-text-secondary mt-3 max-w-[650px] leading-relaxed">
                Please read these terms and conditions carefully before using our platform. These rules establish your rights and responsibilities when listing or searching properties on NAPLOTSPUNE.
              </p>
            </div>
            <div className="flex items-center gap-3 bg-[#EEF2F7] px-5 py-4 rounded-2xl border border-gray-200/50 shrink-0 self-start md:self-auto">
              <Calendar className="text-primary" size={20} />
              <div>
                <span className="text-[10px] uppercase font-bold text-text-muted block">Last Updated</span>
                <span className="text-xs sm:text-sm font-bold text-text-primary">May 21, 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area with Sticky Navigation */}
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">

          {/* Left Side: Table of Contents (Sticky) */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-28 bg-white rounded-2xl border border-gray-200/80 p-6 shadow-sm">
              <h3 className="text-xs font-semibold uppercase text-text-primary tracking-wider mb-4 pb-2 border-b border-gray-100">
                Terms Sections
              </h3>
              <nav className="flex flex-col gap-1">
                {sections.map((sec) => {
                  const isActive = activeSection === sec.id;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => scrollToSection(sec.id)}
                      className={`text-left text-xs font-semibold py-2 px-3 rounded-lg transition-all duration-200 cursor-pointer border-none outline-none ${isActive
                        ? "bg-primary/5 text-primary font-bold shadow-sm translate-x-1"
                        : "text-text-secondary hover:text-text-primary hover:bg-gray-50"
                        }`}
                    >
                      {sec.label}
                    </button>
                  );
                })}
              </nav>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <Link
                  href="/"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-dark hover:underline no-underline"
                >
                  <ArrowLeft size={14} />
                  Back to Homepage
                </Link>
              </div>
            </div>
          </aside>

          {/* Right Side: Document Content */}
          <main className="col-span-1 lg:col-span-3 bg-white rounded-2xl border border-gray-200/80 p-6 sm:p-10 shadow-sm space-y-10">

            <section id="acceptance" className="scroll-mt-28 space-y-4">
              <h2 className="text-xl sm:text-2xl font-semibold text-text-primary">
                1. Acceptance of Terms
              </h2>
              <p className="text-sm sm:text-base leading-relaxed">
                By accessing, browsing, or using the NAPLOTSPUNE website, applications, or subdomains (collectively, the &quot;Service&quot;), you acknowledge that you have read, understood, and agree to be bound by these Terms &amp; Conditions and our Privacy Policy.
              </p>
              <p className="text-sm sm:text-base leading-relaxed">
                If you do not agree to these Terms, you must immediately cease all access to the Service. We reserve the right to modify these Terms at any time, and your continued use of the Platform after changes are published constitutes acceptance of the new Terms.
              </p>
            </section>

            <section id="eligibility" className="scroll-mt-28 space-y-4">
              <h2 className="text-xl sm:text-2xl font-semibold text-text-primary">
                2. Eligibility & Account Registration
              </h2>
              <p className="text-sm sm:text-base leading-relaxed">
                You must be at least 18 years of age and legally competent to enter into binding contracts under the Indian Contract Act, 1872, to use our Services.
              </p>
              <p className="text-sm sm:text-base leading-relaxed">
                To access features like posting a property listing, requirements, or contacting list owners, you may need to provide accurate personal details (name, phone number, email address). You represent that all registration information is complete, accurate, and current, and that you will update it immediately if any details change.
              </p>
            </section>

            <section id="listings" className="scroll-mt-28 space-y-4">
              <h2 className="text-xl sm:text-2xl font-semibold text-text-primary">
                3. Property Listings Guidelines
              </h2>
              <p className="text-sm sm:text-base leading-relaxed">
                If you list a property (Plot, Villa, Bungalow, Residential, Commercial) on the Platform, you must adhere to the following rules:
              </p>
              <ul className="list-disc pl-5 text-sm space-y-2 leading-relaxed">
                <li><strong>Ownership and Rights:</strong> You must own the listed property or possess explicit written authorization from the owner/builder to publish the listing.</li>
                <li><strong>Accuracy:</strong> All descriptions, dimensions (super area), prices, photos, and amenities must be truthful and accurate. Misrepresenting a property is strictly prohibited.</li>
                <li><strong>No Spam or Duplicates:</strong> You may not post multiple listings for the same property. Duplicate listings will be flagged and removed.</li>
                <li><strong>Compliance with Law:</strong> Real estate listings must comply with local regulations, including the Real Estate (Regulation and Development) Act, 2016 (RERA) rules, where applicable.</li>
              </ul>
            </section>

            <section id="conduct" className="scroll-mt-28 space-y-4">
              <h2 className="text-xl sm:text-2xl font-semibold text-text-primary">
                4. User Conduct & Obligations
              </h2>
              <p className="text-sm sm:text-base leading-relaxed">
                You agree not to use the Service to:
              </p>
              <ul className="list-disc pl-5 text-sm space-y-2 leading-relaxed">
                <li>Harass, abuse, threaten, or impersonate other users, builders, or agents.</li>
                <li>Upload viruses, malware, or any code designed to disrupt the platform&apos;s security or systems.</li>
                <li>Scrape, extract, or mine property data, telephone numbers, or email addresses from the site using automated scripts or scrapers.</li>
                <li>Distribute false, misleading, or deceptive advertisements or make unsubstantiated claims.</li>
              </ul>
            </section>

            <section id="intellectual" className="scroll-mt-28 space-y-4">
              <h2 className="text-xl sm:text-2xl font-semibold text-text-primary">
                5. Intellectual Property
              </h2>
              <p className="text-sm sm:text-base leading-relaxed">
                All content on the Service, including logos, designs, typography, illustrations, icons, layout systems, codes, database configurations, and graphic elements, is the intellectual property of Realty Services Limited or its content suppliers and is protected by Indian and international copyright and trademark laws.
              </p>
              <p className="text-sm sm:text-base leading-relaxed">
                By uploading photos, descriptions, and property details to the Platform, you grant us a non-exclusive, royalty-free, worldwide, perpetual, and transferable license to display, modify, distribute, and reproduce that content to facilitate search listings.
              </p>
            </section>

            <section id="disclaimers" className="scroll-mt-28 space-y-4">
              <h2 className="text-xl sm:text-2xl font-semibold text-text-primary">
                6. Disclaimers & Brokerage Policy
              </h2>
              <p className="text-sm sm:text-base leading-relaxed">
                NAPLOTSPUNE operates as an online advertising and property information exchange marketplace. Please note:
              </p>
              <div className="bg-[#fff9f0] border border-[#f0e0cc] p-6 rounded-2xl space-y-3">
                <span className="text-xs font-semibold uppercase text-amber-800 tracking-wider block">Important Brokerage & Verification Disclaimer</span>
                <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
                  <strong>We do not charge brokerage commissions.</strong> Listing property is completely free, and transactions are negotiated directly between the parties.
                </p>
                <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
                  <strong>No Verification Warranty:</strong> Although we implement filters to catch spam, we do not verify the legal title, ownership status, boundary measurements, RERA approvals, or physical condition of listed properties. Users are strictly advised to perform independent legal search, property inspection, and due diligence before making advance payments or signing purchase agreements.
                </p>
              </div>
            </section>

            <section id="liability" className="scroll-mt-28 space-y-4">
              <h2 className="text-xl sm:text-2xl font-semibold text-text-primary">
                7. Limitation of Liability
              </h2>
              <p className="text-sm sm:text-base leading-relaxed">
                In no event shall Realty Services Limited, its directors, officers, employees, or developers be liable for any direct, indirect, incidental, consequential, special, or exemplary damages, including but not limited to loss of profits, goodwill, data, or financial losses resulting from:
              </p>
              <ul className="list-disc pl-5 text-sm space-y-2 leading-relaxed">
                <li>Your access to, use of, or inability to access or use the Service.</li>
                <li>The accuracy, availability, or suitability of any property details listed on the Platform.</li>
                <li>Interactions, transactions, or disputes arising between buyers, sellers, tenants, builders, or agents.</li>
                <li>Any unauthorized access to our secure servers or interception of personal communication.</li>
              </ul>
            </section>

            <section id="governing-law" className="scroll-mt-28 space-y-4">
              <h2 className="text-xl sm:text-2xl font-semibold text-text-primary">
                8. Governing Law & Jurisdiction
              </h2>
              <p className="text-sm sm:text-base leading-relaxed">
                These Terms and Conditions shall be governed by, interpreted, and construed in accordance with the laws of India.
              </p>
              <p className="text-sm sm:text-base leading-relaxed">
                Any legal actions, suits, or proceedings arising out of or related to these Terms, the Platform, or listings shall be subject to the exclusive jurisdiction of the competent courts located in <strong>Pune, Maharashtra, India</strong>.
              </p>
            </section>

            <section id="contact" className="scroll-mt-28 space-y-4">
              <h2 className="text-xl sm:text-2xl font-semibold text-text-primary">
                9. Contact Information
              </h2>
              <p className="text-sm sm:text-base leading-relaxed">
                If you have any questions, clarifications, or reports of listing violations regarding these Terms &amp; Conditions, please reach out to us:
              </p>
              <div className="bg-[#F8FAFC] border border-gray-200/60 p-6 rounded-2xl space-y-2">
                <span className="font-semibold text-text-primary block text-sm sm:text-base">NAPLOTSPUNE </span>
                {/* <span className="text-xs sm:text-sm block">Realty Services Limited</span> */}
                <span className="text-xs sm:text-sm block">Pune</span>
                <span className="text-xs sm:text-sm block">Email: <a href="mailto:privacy@naplotspune.com" className="text-primary hover:underline font-bold">privacy@naplotspune.com</a></span>
                <span className="text-xs sm:text-sm block">Phone: +91 0000000000</span>
              </div>
            </section>

          </main>

        </div>
      </div>

      <Footer />
    </div>
  );
}
