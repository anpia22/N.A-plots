import SearchResultsPage from "../search/page";
import { Metadata } from "next";

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

export async function generateMetadata(props: { params: Params }): Promise<Metadata> {
  const params = await props.params;
  const displayName = getDisplayNameFromSlug(params.locality);

  return {
    title: `Properties in ${displayName} | Real Estate & NA Plots`,
    description: `Explore premium properties, villas, commercial spaces, and NA plots for sale in ${displayName}, Pune. Find your dream home or investment plot today!`,
  };
}

export function generateStaticParams() {
  const localities = [
    "hinjawadi",
    "lonavala",
    "pawna",
    "kanhe-phata",
    "chakan",
    "dhamane",
    "ghotawade",
    "mulshi",
    "paud",
    "somatane-phata",
    "takve",
    "talegaon",
    "varale",
    "wakad",
    "pune",
    "kamshet",
    "chakan-talegaon-midc"
  ];
  return localities.map((locality) => ({
    locality,
  }));
}

export default async function PropertyInLocalityPage(props: { params: Params }) {
  const params = await props.params;
  return <SearchResultsPage localityOverride={params.locality} />;
}
