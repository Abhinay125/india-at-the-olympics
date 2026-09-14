"use client";

import { useState, useMemo } from "react";
import MedalCard from "@/components/medals/MedalCard";
import DetailModal from "@/components/modals/DetailModal";
import AthleteDetail from "@/components/modals/AthleteDetail";
import TeamDetail from "@/components/modals/TeamDetail";
import { medals } from "@/data/medals";
import { athletes } from "@/data/athletes";
import { teams } from "@/data/teams";
import { sports } from "@/data/sports";
import { cn } from "@/lib/utils";
import { Search, BarChart3, Trophy, Medal, Award, Users } from "lucide-react";
import { MedalRecord } from "@/types/olympics";

export default function MedalsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "gold" | "silver" | "bronze">("all");
  const [filterYear, setFilterYear] = useState<number | "all">("all");
  const [filterSport, setFilterSport] = useState<string | "all">("all");
  const [selectedRecord, setSelectedRecord] = useState<MedalRecord | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filtered medals
  const filteredMedals = useMemo(() => {
    return medals.filter((medal) => {
      // Medal type filter
      if (filterType !== "all" && medal.medal !== filterType) return false;
      
      // Year filter
      if (filterYear !== "all" && medal.year !== filterYear) return false;
      
      // Sport filter
      if (filterSport !== "all" && medal.sport.toLowerCase() !== filterSport.toLowerCase()) return false;
      
      // Search filter
      if (searchTerm.trim() !== "") {
        const searchableText = [
          medal.sport,
          medal.event,
          medal.year.toString(),
          medal.medal,
          medal.kind,
          ...(medal.athleteIds || []),
          medal.teamId ? [medal.teamId] : [],
        ]
          .flat()
          .join(" ")
          .toLowerCase();
        
        const normalizedSearch = searchTerm.toLowerCase().replace(/[^\w\s]/g, "").trim();
        if (!searchableText.includes(normalizedSearch)) return false;
      }
      
      return true;
    });
  }, [searchTerm, filterType, filterYear, filterSport]);

  // Get athlete/team info for modal
  const getAthleteName = (athleteIds: string[] | undefined): string | null => {
    if (!athleteIds || athleteIds.length === 0) return null;
    const athlete = athletes.find((a) => a.id === athleteIds[0]);
    return athlete ? athlete.name : null;
  };

  const getTeamName = (teamId: string | undefined): string | null => {
    if (!teamId) return null;
    const team = teams.find((t) => t.id === teamId);
    return team ? team.name : null;
  };

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
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-navy-800">
          India&apos;s Olympic medal archive
        </h1>
        <p className="text-navy-500 mt-3">
          Every card is a button. Select a medal record to reveal the full
          Olympic details and achievement story.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-6 mb-8 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-navy-600 mb-2">
              Search athletes, events, sports, years
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-white text-navy-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-gold-400"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-navy-600 mb-2">
              Medal type
            </label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as "all" | "gold" | "silver" | "bronze")}
              className="select-filter w-full"
            >
              <option value="all">All medals</option>
              <option value="gold">Gold</option>
              <option value="silver">Silver</option>
              <option value="bronze">Bronze</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-navy-600 mb-2">
              Olympic year
            </label>
            <select
              value={filterYear === "all" ? "all" : filterYear.toString()}
              onChange={(e) => {
                const val = e.target.value;
                setFilterYear(val === "all" ? ("all" as const) : parseInt(val));
              }}
              className="select-filter w-full"
            >
              <option value="all">All years</option>
              {Array.from(new Set(medals.map((m) => m.year)))
                .sort((a, b) => a - b)
                .map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-navy-600 mb-2">
              Sport
            </label>
            <select
              value={filterSport === "all" ? "all" : filterSport}
              onChange={(e) => setFilterSport(e.target.value)}
              className="select-filter w-full"
            >
              <option value="all">All sports</option>
              {sports.map((sport) => (
                <option key={sport.id} value={sport.name}>
                  {sport.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm text-navy-500">
          <span>
            Showing {filteredMedals.length} medal{filteredMedals.length !== 1 ? "s" : ""}
          </span>
          <div className="flex gap-3">
            <button
              onClick={() => {
                setSearchTerm("");
                setFilterType("all");
                setFilterYear("all");
                setFilterSport("all");
              }}
              className="btn-secondary px-4 py-2 text-xs"
            >
              Reset filters
            </button>
          </div>
        </div>
      </div>

      {/* Medal Grid */}
      {filteredMedals.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-2xl bg-warm-100 flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="w-8 h-8 text-navy-300" />
          </div>
          <h3 className="text-lg font-semibold text-navy-700 mb-2">
            No medals found
          </h3>
          <p className="text-sm text-navy-400">
            Try adjusting your filters or search terms.
          </p>
        </div>
      ) : (
        <div className="grid gap-5">
          <div className="hidden md:block text-center text-sm text-navy-400">
            Grid layout: 1 column on mobile, 2 on tablet, 3-4 on desktop
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredMedals.map((medal) => (
              <MedalCard
                key={medal.id}
                record={medal}
                onClick={handleOpenModal}
              />
            ))}
          </div>
        </div>
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