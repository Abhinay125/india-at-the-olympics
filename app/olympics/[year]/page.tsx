"use client";

import { useState } from "react";
import Link from "next/link";
import { summerOlympics } from "@/data/olympics";
import { medals } from "@/data/medals";
import { athletes } from "@/data/athletes";
import { teams } from "@/data/teams";
import MedalCard from "@/components/medals/MedalCard";
import DetailModal from "@/components/modals/DetailModal";
import AthleteDetail from "@/components/modals/AthleteDetail";
import TeamDetail from "@/components/modals/TeamDetail";
import { MedalRecord } from "@/types/olympics";

export default function OlympicYearPage({
  params,
}: {
  params: { year: string };
}) {
  const year = parseInt(params.year);
  const [selectedRecord, setSelectedRecord] = useState<MedalRecord | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const edition = summerOlympics.find((o) => o.year === year);
  if (!edition) {
    return (
      <div className="container-wide py-12">
        <h1 className="text-3xl font-bold text-navy-800">Olympic Games Not Found</h1>
        <p className="text-navy-500">No data available for the {year} Olympic Games.</p>
      </div>
    );
  }

  // Get medals for this specific Olympic year
  const yearMedals = medals.filter((m) => m.year === year && m.season === "summer");

  // Get athletes who participated in this year (from medal records)
  const athleteIdsInYear = Array.from(
    new Set(yearMedals.flatMap((m) => m.athleteIds || []))
  );
  const athletesInYear = athletes.filter((a) => athleteIdsInYear.includes(a.id));

  // Get teams that won medals in this year
  const teamIdsInYear = Array.from(
    new Set(yearMedals.flatMap((m) => m.teamId ? [m.teamId] : []))
  );
  const teamsInYear = teams.filter((t) => teamIdsInYear.includes(t.id));

  const handleOpenModal = (record: MedalRecord) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedRecord(null);
    setIsModalOpen(false);
  };

  return (
    <div className="container-wide py-12">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <Link
            href="/"
            className="text-sm text-navy-500 hover:text-navy-700 transition-colors"
          >
            ← Back to Olympics overview
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-navy-800">
            {year} {edition.city} Olympics
          </h1>
        </div>

        <div className="bg-warm-50 rounded-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium text-navy-600">Games:</span>{" "}
              <span className="text-navy-700">
                {edition.startDate} – {edition.endDate}
              </span>
            </div>
            <div>
              <span className="font-medium text-navy-600">Host:</span>{" "}
              <span className="text-navy-700">
                {edition.city}, {edition.country}
              </span>
            </div>
            <div>
              <span className="font-medium text-navy-600">India Athletes:</span>{" "}
              <span className="text-navy-700">
                {edition.indiaAthletes || "Data not available"}
              </span>
            </div>
          </div>

          {edition.notableResults && (
            <div className="mt-4 p-4 bg-white rounded-lg border border-gray-100">
              <p className="text-navy-600">{edition.notableResults}</p>
            </div>
          )}
        </div>
      </div>

      {yearMedals.length > 0 ? (
        <>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-navy-800">
              India&apos;s Medals at the {year} Olympics
            </h2>
            <p className="text-navy-500">
              {yearMedals.length} medal{yearMedals.length !== 1 ? "s" : ""} won
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {yearMedals.map((medal) => (
              <MedalCard
                key={medal.id}
                record={medal}
                onClick={handleOpenModal}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-8">
          <h3 className="text-lg font-semibold text-navy-700">
            India did not win any medals at the {year} Olympics
          </h3>
          {edition.indiaAthletes && edition.indiaAthletes > 0 && (
            <p className="text-navy-500">
              {edition.indiaAthletes} Indian athlete{edition.indiaAthletes !== 1 ? "s" : ""} competed
            </p>
          )}
        </div>
      )}

      {/* Athletes section for editions without medal data */}
      {!yearMedals.length && edition.indiaAthletes && edition.indiaAthletes > 0 && (
        <>
          <div className="mb-8 mt-8">
            <h2 className="text-2xl font-bold text-navy-800">
              Indian Athletes at the {year} Olympics
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {athletesInYear.map((athlete) => (
              <div
                key={athlete.id}
                className="card p-5 hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-warm-100">
                      <span className="text-lg font-medium text-navy-600">
                        {athlete.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-navy-800 text-lg">
                      {athlete.name}
                    </h3>
                    <p className="text-sm text-navy-500">
                      {athlete.sport}
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-sm text-navy-500 line-clamp-2">
                  {athlete.bio}
                </p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Modal */}
      <DetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Olympic Medal Detail"
      >
        {selectedRecord ? (
          selectedRecord.kind === "team" ? (
            <TeamDetail record={selectedRecord} />
          ) : (
            <AthleteDetail record={selectedRecord} />
          )
        ) : (
          <div className="p-6 text-center">
            <p className="text-navy-500">Loading...</p>
          </div>
        )}
      </DetailModal>
    </div>
  );
}
