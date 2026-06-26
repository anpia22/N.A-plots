import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

export const metadata: Metadata = {
  title: "NA Plots in Pune | Buy Residential & Commercial NA Plots",
  description: "Explore verified NA plots in Pune for residential & commercial investment. RERA-approved layouts in Hinjawadi, Lonavala, Paud & more. Find your dream plot today!",
  keywords: "na plots in pune, residential projects, commercial projects, projects in pune, rera approved, na plots, villas in pune, bungalows in pune",
};
import PropertyCategories from "@/components/Propertycategories";
import PopularOwnerProperties from "@/components/Popularownerproperties";
import PreferredAgents from "@/components/Preferredagents";
import NAPlotsExplorer from "@/components/Naplotsexplorer";
import NAPlotsFeatures from "@/components/NAPlotsFeatures";
import Propworth from "@/components/Propworth";
import Explorelocalities from "@/components/Explorelocalities";
import Exclusiveandadvice from "@/components/Exclusiveandadvice";
import Adandguide from "@/components/Adandguide";
import Footer from "@/components/Footer";
import PostPropertyBanner from "@/components/Postpropertybanner";
import Projectsections from "@/components/Projectsections";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <Hero />
      <PropertyCategories />
      <PopularOwnerProperties />
      {/* <PreferredAgents /> */}
      <NAPlotsExplorer />
      <Projectsections />
      <NAPlotsFeatures />
      <Propworth />
      <Explorelocalities />
      <Exclusiveandadvice />
      <Adandguide />
      <div className="bg-white z-10"><PostPropertyBanner /></div>

      <Footer />
      {/* 
        Remaining sections to be implemented:
        - Trending Cities
        - Featured Listings
        - Property Categories
        - New Projects
        - Why Choose Us
        - Testimonials
        - Footer
      */}
      {/* <div className="max-w-[1440px] mx-auto px-6 py-16 w-full text-center text-gray-500">
        <p>Scroll down to see more sections (Coming soon...)</p>
      </div> */}
    </main>
  );
}
