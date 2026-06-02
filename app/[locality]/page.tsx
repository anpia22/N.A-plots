import SearchResultsPage from "../search/page";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Params = Promise<{ locality: string }>;

// Map slug to city/locality names for metadata and proper display names
const slugToLocalityMap: Record<string, string> = {
  "hinjawadi": "Hinjawadi",
  "lonavala": "Lonavala",
  "pawna": "Pawna",
  "kanhe-phata": "Kanhe Phata",
  "chakan": "Chakan",
  "dhamane": "Dhamane",
  "ghotawade": "Ghotawade",
  "mulshi": "Mulshi",
  "paud": "Paud",
  "somatane-phata": "Somatane Phata",
  "somatane": "Somatane",
  "takve": "Takve",
  "talegaon": "Talegaon",
  "talegaon-midc": "Talegaon MIDC",
  "varale": "Varale",
  "wakad": "Wakad",
  "pune": "Pune",
  "kamshet": "Kamshet",
  "chakan-talegaon-midc": "Chakan / Talegaon MIDC",
  "khandala": "Khandala",
  "baner": "Baner",
  "maan": "Maan",
  "shirgaon": "Shirgaon",

};

// All recognised URL prefixes and the type they map to
const prefixToTypeMap: Record<string, string> = {
  "property-in-": "All",
  "plots-in-": "Plot",
  "villas-in-": "Villa",
  "bungalow-in-": "Bungalow",
  "residential-in-": "Residential",
  "commercial-in-": "Commercial",
};

const ALL_PREFIXES = Object.keys(prefixToTypeMap);

const getDisplayNameFromSlug = (slug: string): string => {
  const dec = decodeURIComponent(slug);
  if (slugToLocalityMap[dec]) return slugToLocalityMap[dec];
  const lowerDec = dec.toLowerCase();
  if (slugToLocalityMap[lowerDec]) return slugToLocalityMap[lowerDec];
  return dec
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

/** Returns { prefix, citySlug } or null if the param doesn't match any pattern. */
function parseLocalityParam(localityParam: string): { prefix: string; citySlug: string; type: string } | null {
  for (const prefix of ALL_PREFIXES) {
    if (localityParam.startsWith(prefix)) {
      return {
        prefix,
        citySlug: localityParam.slice(prefix.length),
        type: prefixToTypeMap[prefix],
      };
    }
  }
  return null;
}

export async function generateMetadata(props: { params: Params }): Promise<Metadata> {
  const params = await props.params;
  const parsed = parseLocalityParam(params.locality);

  if (!parsed) return {};

  const citySlugLower = parsed.citySlug.toLowerCase();
  if (citySlugLower === "pune") {
    if (parsed.type === "Plot") {
      return {
        title: "Verified Plots for Sale in Pune | Prime Investment Land",
        description: "Find the best plots for sale in Pune. Explore verified residential & commercial land in prime locations with modern amenities. Book a site visit today!",
        keywords: "plots for sale, na plots, rera registered plots, plots in pune, real estate projects in pune, residential plots, commercial plots, plots for sale in pune, plots near pune",
      };
    }
    if (parsed.type === "Villa") {
      return {
        title: "Villas in Pune | Luxury & Premium Villas for Sale in Pune",
        description: "Discover premium villas in Pune. Explore luxury villas for sale in top locations across Pune ideal for homebuyers and investors. Enquire now!",
        keywords: "villas in pune, villas for sale, luxury villas in pune, villas near pune, villas for sale in pune, 4 bhk villa in pune, 3 bhk villa in pune",
      };
    }
    if (parsed.type === "Bungalow") {
      return {
        title: "Bungalow for Sale in Pune | Find Your Dream Home in Pune",
        description: "Looking for a bungalow for sale in Pune? Explore premium bungalows across top localities in Pune. Find your dream home or investment property today.",
        keywords: "bungalow for sale in pune, premium bungalow, bungalows in pune, bungalows in hinjawadi, bungalows near baner",
      };
    }
    if (parsed.type === "Residential") {
      return {
        title: "Premium Residential Properties in Pune",
        description: "Discover premium residential properties in Pune. Explore secure, RERA-approved gated community plots to build your dream home. View top locations & pricing!",
        keywords: "residential properties, residential projects in pune, plots for sale, na plots, residential properties in pune",
      };
    }
    if (parsed.type === "Commercial") {
      return {
        title: "Best Commercial Properties in Pune | NA Plots & Spaces",
        description: "Looking for commercial properties in Pune? Explore premium commercial property in Pune for sale shops, offices, and NA plots at the best locations. Invest today!",
        keywords: "commercial properties in pune, commercial properties for sale, commercial projects in pune, commercial real estate, commercial property for sale near me, na plots, commercial properties",
      };
    }
  }

  const displayName = getDisplayNameFromSlug(parsed.citySlug);
  const typeLabel =
    parsed.type === "All" ? "Properties" :
      parsed.type === "Plot" ? "NA Plots" :
        parsed.type === "Villa" ? "Villas" :
          parsed.type === "Bungalow" ? "Bungalows" :
            parsed.type === "Residential" ? "Residential Properties" :
              parsed.type === "Commercial" ? "Commercial Properties" :
                "Properties";

  return {
    title: `${typeLabel} in ${displayName}`,
    description: `Explore premium ${typeLabel.toLowerCase()} for sale in ${displayName}, Pune. Find your dream home or investment today!`,
  };
}

export function generateStaticParams() {
  const localities = [
    "hinjawadi", "lonavala", "pawna", "kanhe-phata",
    "chakan", "dhamane", "ghotawade", "mulshi",
    "paud", "somatane-phata", "somatane", "takve", "talegaon", "talegaon-midc",
    "varale", "wakad", "pune", "kamshet", "chakan-talegaon-midc",
    "khandala", "baner", "maan", "shirgaon"
  ];

  const params: { locality: string }[] = [];
  for (const prefix of ALL_PREFIXES) {
    for (const loc of localities) {
      params.push({ locality: `${prefix}${loc}` });
    }
  }
  return params;
}

export default async function PropertyInLocalityPage(props: { params: Params }) {
  const params = await props.params;
  const rawLocality = params.locality;

  const parsed = parseLocalityParam(rawLocality);

  // Unknown pattern → 404
  if (!parsed) {
    notFound();
  }

  return (
    <SearchResultsPage
      localityOverride={parsed.citySlug}
      typeOverride={parsed.type === "All" ? undefined : parsed.type}
    />
  );
}
