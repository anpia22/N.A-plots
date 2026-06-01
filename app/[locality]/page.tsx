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
  "takve": "Takve",
  "talegaon": "Talegaon",
  "varale": "Varale",
  "wakad": "Wakad",
  "pune": "Pune",
  "kamshet": "Kamshet",
  "chakan-talegaon-midc": "Chakan / Talegaon MIDC",
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
    "paud", "somatane-phata", "takve", "talegaon", "varale", "wakad", "pune", "kamshet", "chakan-talegaon-midc"
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
