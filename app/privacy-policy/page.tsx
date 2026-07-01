"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft, Shield, Calendar, ChevronRight } from "lucide-react";

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState("introduction");

  const sections = [
    { id: "introduction", label: "1. Introduction" },
    { id: "info-collect", label: "2. Information We Collect" },
    { id: "how-use", label: "3. How We Use Information" },
    { id: "sharing", label: "4. Sharing & Disclosure" },
    { id: "cookies", label: "5. Cookies & Tracking" },
    { id: "security", label: "6. Data Security" },
    { id: "your-rights", label: "7. Your Rights & Choices" },
    { id: "updates", label: "8. Changes to Policy" },
    { id: "contact", label: "9. Contact Us" },
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
    <div className="w-full bg-[#F8FAFC] min-h-screen font-body text-[#475569] z-10">
      <Navbar />

      {/* Breadcrumbs & Header Hero */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto px-6 py-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
          <Link href="/" className="hover:text-primary transition-colors no-underline">
            Home
          </Link>
          <ChevronRight size={12} />
          <span className="text-text-primary">Privacy Policy</span>
        </div>

        <div className="max-w-[1200px] mx-auto px-6 pb-12 pt-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 text-primary text-xs font-semibold mb-4 uppercase tracking-wider">
                <Shield size={14} />
                <span>Security & Trust</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-text-primary tracking-tight">
                Privacy Policy
              </h1>
              <p className="text-sm sm:text-base text-text-secondary mt-3 max-w-[650px] leading-relaxed">
                At NAPLOTSPUNE, we value your trust. This Privacy Policy details how we collect, store, process, and safeguard your personal information when you use our property marketplace.
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
                On This Page
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

            <section id="introduction" className="scroll-mt-28 space-y-4">
              <h2 className="text-xl sm:text-2xl font-semibold text-text-primary">
                1. Introduction
              </h2>
              <p className="text-sm sm:text-base leading-relaxed">
                Welcome to NAPLOTSPUNE (the &quot;Platform&quot;), operated by Realty Services Limited (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to protecting the privacy of our users, developers, property owners, and real estate agents.
              </p>
              <p className="text-sm sm:text-base leading-relaxed">
                This Privacy Policy explains how we collect, compile, hold, use, communicate, disclose, and secure your personal data when you visit our website, list property properties, inquire about land or flats in Pune, or interact with our digital tools. By accessing or using our services, you consent to the collection and use of information as described herein.
              </p>
            </section>

            <section id="info-collect" className="scroll-mt-28 space-y-4">
              <h2 className="text-xl sm:text-2xl font-semibold text-text-primary">
                2. Information We Collect
              </h2>
              <p className="text-sm sm:text-base leading-relaxed">
                We collect information to provide a streamlined, high-quality experience for searching and listing real estate. We collect two broad categories of information:
              </p>

              <div className="space-y-3 bg-[#F8FAFC] p-5 rounded-xl border border-gray-100">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-text-primary">
                  A. Personal Information You Provide:
                </h4>
                <ul className="list-disc pl-5 text-xs sm:text-sm space-y-2 leading-relaxed">
                  <li><strong>Account Data:</strong> Contact details such as your full name, email address, telephone/mobile number, and login credentials when you create an account or post a requirement.</li>
                  <li><strong>Listing Information:</strong> Property location, pricing, size, configurations, facing direction, super area, builder details, description, and photographs that you upload.</li>
                  <li><strong>Inquiry Details:</strong> Information submitted when contacting a property owner, agent, or builder (e.g., via query forms, callback requests, or scheduling a site visit).</li>
                </ul>
              </div>

              <div className="space-y-3 bg-[#F8FAFC] p-5 rounded-xl border border-gray-100">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-text-primary">
                  B. Automatically Collected Information:
                </h4>
                <ul className="list-disc pl-5 text-xs sm:text-sm space-y-2 leading-relaxed">
                  <li><strong>Usage Data:</strong> Pages visited on our site, links clicked, searched keywords, interaction times, and navigation flow.</li>
                  <li><strong>Device Information:</strong> IP address, device type, operating system version, browser type, and geolocation data (if enabled).</li>
                </ul>
              </div>
            </section>

            <section id="how-use" className="scroll-mt-28 space-y-4">
              <h2 className="text-xl sm:text-2xl font-semibold text-text-primary">
                3. How We Use Information
              </h2>
              <p className="text-sm sm:text-base leading-relaxed">
                We use the data we collect to operate our marketplace, personalize user experience, and ensure security. Specifically, information is used for:
              </p>
              <ul className="list-decimal pl-5 text-sm space-y-2 leading-relaxed">
                <li><strong>Service Delivery:</strong> Publishing your property listings, processing search filters, matching buyers with sellers, and sending inquiry notifications.</li>
                <li><strong>Communication:</strong> Responding to user feedback, providing technical assistance, confirming accounts, and delivering SMS/Email alerts regarding matches.</li>
                <li><strong>Platform Optimization:</strong> Analyzing usage statistics to redesign search features, improve performance, and test website navigation.</li>
                <li><strong>Verification & Security:</strong> Preventing fraudulent listings, identifying unauthorized accounts, and checking compliance with our listing guidelines.</li>
              </ul>
            </section>

            <section id="sharing" className="scroll-mt-28 space-y-4">
              <h2 className="text-xl sm:text-2xl font-semibold text-text-primary">
                4. Sharing & Disclosure
              </h2>
              <p className="text-sm sm:text-base leading-relaxed">
                We do not sell, rent, or trade your personal data to third parties for their marketing purposes. We share your information only under the following situations:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border border-gray-200/80 p-4 rounded-xl">
                  <h4 className="text-sm font-semibold text-text-primary mb-2">Connecting Buyers & Sellers</h4>
                  <p className="text-xs sm:text-sm leading-relaxed">
                    When you request info on a listing, your contact details (name, phone, query) are shared with the listing owner, agent, or builder so they can contact you.
                  </p>
                </div>
                <div className="border border-gray-200/80 p-4 rounded-xl">
                  <h4 className="text-sm font-semibold text-text-primary mb-2">Service Providers</h4>
                  <p className="text-xs sm:text-sm leading-relaxed">
                    We share data with trusted third-party providers who host our platform, send OTPs, manage database storage, or conduct analysis.
                  </p>
                </div>
                <div className="border border-gray-200/80 p-4 rounded-xl">
                  <h4 className="text-sm font-semibold text-text-primary mb-2">Legal Compliance</h4>
                  <p className="text-xs sm:text-sm leading-relaxed">
                    If required by law, court order, or government authority, we will disclose data to comply with legal processes or protect property rights.
                  </p>
                </div>
                <div className="border border-gray-200/80 p-4 rounded-xl">
                  <h4 className="text-sm font-semibold text-text-primary mb-2">Business Transfers</h4>
                  <p className="text-xs sm:text-sm leading-relaxed">
                    In the event of a merger, acquisition, restructuring, or sale of assets, user databases will be transferred to the successor entity.
                  </p>
                </div>
              </div>
            </section>

            <section id="cookies" className="scroll-mt-28 space-y-4">
              <h2 className="text-xl sm:text-2xl font-semibold text-text-primary">
                5. Cookies & Tracking
              </h2>
              <p className="text-sm sm:text-base leading-relaxed">
                We use cookies, web beacons, and pixels to deliver a smooth user experience. Cookies are small data files stored on your computer or mobile device.
              </p>
              <p className="text-sm sm:text-base leading-relaxed">
                We use cookies to keep you signed in, remember your search preferences, save your recent listings, and track aggregated visitor trends. You can disable cookies in your browser settings, though doing so may prevent certain parts of the Platform from functioning correctly.
              </p>
            </section>

            <section id="security" className="scroll-mt-28 space-y-4">
              <h2 className="text-xl sm:text-2xl font-semibold text-text-primary">
                6. Data Security
              </h2>
              <p className="text-sm sm:text-base leading-relaxed">
                The security of your information is a top priority. We employ industry-standard administrative, physical, and digital security measures to safeguard your personal data from unauthorized access, loss, modification, or exposure.
              </p>
              <p className="text-sm sm:text-base leading-relaxed">
                This includes SSL encryption for data transmission, secured database servers, and multi-factor authentication for admin accounts. However, please note that no internet transmission or electronic storage method is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section id="your-rights" className="scroll-mt-28 space-y-4">
              <h2 className="text-xl sm:text-2xl font-semibold text-text-primary">
                7. Your Rights & Choices
              </h2>
              <p className="text-sm sm:text-base leading-relaxed">
                You have control over how your information is collected and processed:
              </p>
              <ul className="list-disc pl-5 text-sm space-y-2 leading-relaxed">
                <li><strong>Access and Correction:</strong> You can review and update your profile details and property listings directly from your dashboard.</li>
                <li><strong>Opt-Out:</strong> You may unsubscribe from marketing newsletters, promotional offers, and property match notifications at any time.</li>
                <li><strong>Account Deletion:</strong> You can request the removal of your personal information and deletion of your account by contacting our support team.</li>
              </ul>
            </section>

            <section id="updates" className="scroll-mt-28 space-y-4">
              <h2 className="text-xl sm:text-2xl font-semibold text-text-primary">
                8. Changes to this Policy
              </h2>
              <p className="text-sm sm:text-base leading-relaxed">
                We reserve the right to modify this Privacy Policy at any time. Any changes will be posted on this page with an updated &quot;Last Updated&quot; date. We encourage you to review this policy periodically to stay informed about how we protect your personal information.
              </p>
            </section>

            <section id="contact" className="scroll-mt-28 space-y-4">
              <h2 className="text-xl sm:text-2xl font-semibold text-text-primary">
                9. Contact Us
              </h2>
              <p className="text-sm sm:text-base leading-relaxed">
                If you have questions, comments, or grievances regarding this Privacy Policy, please contact our Grievance Officer:
              </p>
              <div className="bg-[#F8FAFC] border border-gray-200/60 p-6 rounded-2xl space-y-2">
                <span className="font-semibold text-text-primary block text-sm sm:text-base">NAPLOTSPUNE </span>
                {/* <span className="text-xs sm:text-sm block">Realty Services Limited</span> */}
                <span className="text-xs sm:text-sm block">Pune</span>
                <a href="mailto:info@naplotspune.com" className="text-xs sm:text-sm block">Email: info@naplotspune.com</a>
                <a href="tel:+918805390707" className="text-xs sm:text-sm block">Phone: +91 8805390707</a>
              </div>
            </section>

          </main>

        </div>
      </div>

      <Footer />
    </div>
  );
}
