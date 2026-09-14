import { MedalRecord, MedalStats, MedalsByYear, Season } from "@/types/olympics";

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function calculateMedalStats(medals: MedalRecord[]): MedalStats {
  const gold = medals.filter((m) => m.medal === "gold").length;
  const silver = medals.filter((m) => m.medal === "silver").length;
  const bronze = medals.filter((m) => m.medal === "bronze").length;
  return { gold, silver, bronze, total: gold + silver + bronze };
}

export function aggregateMedalsByYear(
  medals: MedalRecord[],
  season: Season = "summer"
): MedalsByYear[] {
  const filtered = season ? medals.filter((m) => m.season === season) : medals;
  const yearMap = new Map<number, { city: string; gold: number; silver: number; bronze: number }>();
  
  for (const medal of filtered) {
    const existing = yearMap.get(medal.year);
    if (existing) {
      existing[medal.medal] += 1;
    } else {
      yearMap.set(medal.year, {
        city: medal.city,
        gold: medal.medal === "gold" ? 1 : 0,
        silver: medal.medal === "silver" ? 1 : 0,
        bronze: medal.medal === "bronze" ? 1 : 0,
      });
    }
  }

  return Array.from(yearMap.entries())
    .map(([year, data]) => ({
      year,
      city: data.city,
      gold: data.gold,
      silver: data.silver,
      bronze: data.bronze,
      total: data.gold + data.silver + data.bronze,
    }))
    .sort((a, b) => a.year - b.year);
}

export function formatMedalType(medal: string): string {
  return medal.charAt(0).toUpperCase() + medal.slice(1);
}

export function getMedalEmoji(medal: string): string {
  switch (medal) {
    case "gold": return "🥇";
    case "silver": return "🥈";
    case "bronze": return "🥉";
    default: return "";
  }
}

export function getMedalColor(medal: string): string {
  switch (medal) {
    case "gold": return "text-gold-600";
    case "silver": return "text-silver-600";
    case "bronze": return "text-bronze-600";
    default: return "text-navy-600";
  }
}

export function getMedalBgColor(medal: string): string {
  switch (medal) {
    case "gold": return "bg-gold-50 border-gold-200";
    case "silver": return "bg-silver-50 border-silver-200";
    case "bronze": return "bg-bronze-50 border-bronze-200";
    default: return "bg-white border-gray-200";
  }
}

export function normalizeSearchText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function searchMatch(query: string, text: string): boolean {
  const normalizedQuery = normalizeSearchText(query);
  const normalizedText = normalizeSearchText(text);
  
  if (!normalizedQuery) return true;
  if (normalizedText.includes(normalizedQuery)) return true;
  
  // Simple fuzzy: check if all query words appear in text
  const queryWords = normalizedQuery.split(" ");
  return queryWords.every((word) => normalizedText.includes(word));
}

export function deduplicateMedals(medals: MedalRecord[]): MedalRecord[] {
  const seen = new Set<string>();
  return medals.filter((medal) => {
    if (seen.has(medal.id)) return false;
    seen.add(medal.id);
    return true;
  });
}
