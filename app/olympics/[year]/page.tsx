import { summerOlympics } from "@/data/olympics";
import { medals } from "@/data/medals";
import { athletes } from "@/data/athletes";
import { teams } from "@/data/teams";
import { MedalRecord } from "@/types/olympics";
import type { Metadata } from "next";
import OlympicYearClient from "./OlympicYearClient";

// Static params: derive from canonical dataset — single source of truth
export function generateStaticParams() {
  return summerOlympics.map((edition) => ({
    year: String(edition.year),
  }));
}

// SEO metadata per Olympic edition
export function generateMetadata({ params }: { params: { year: string } }): Metadata {
  const year = parseInt(params.year);
  const edition = summerOlympics.find((o) => o.year === year);

  if (!edition) {
    return { title: "Olympic Games Not Found" };
  }

  return {
    title: `${year} ${edition.city} Olympics — India's Results`,
    description: `India's performance at the ${year} ${edition.city} Summer Olympic Games. ${edition.notableResults || ""}`,
    openGraph: {
      title: `${year} ${edition.city} Olympics — India at the Olympics`,
      description: edition.notableResults || `India at the ${year} ${edition.city} Olympics.`,
      type: "website",
    },
  };
}

export default function OlympicYearPage({ params }: { params: { year: string } }) {
  const year = parseInt(params.year);
  const edition = summerOlympics.find((o) => o.year === year);

  if (!edition) {
    return (
      <div className="container-wide py-12">
        <h1 className="text-3xl font-bold text-navy-800">Olympic Games Not Found</h1>
        <p className="text-navy-500">No data available for the {year} Olympic Games.</p>
      </div>
    );
  }

  // Pre-compute data on the server side, pass as props
  const yearMedals = medals.filter((m) => m.year === year && m.season === "summer");

  const athleteIdsInYear = Array.from(
    new Set(yearMedals.flatMap((m) => m.athleteIds || []))
  );
  const athletesInYear = athletes.filter((a) => athleteIdsInYear.includes(a.id));

  const teamIdsInYear = Array.from(
    new Set(yearMedals.flatMap((m) => (m.teamId ? [m.teamId] : [])))
  );
  const teamsInYear = teams.filter((t) => teamIdsInYear.includes(t.id));

  return (
    <OlympicYearClient
      edition={edition}
      yearMedals={yearMedals}
      athletesInYear={athletesInYear}
      teamsInYear={teamsInYear}
      year={year}
    />
  );
}
