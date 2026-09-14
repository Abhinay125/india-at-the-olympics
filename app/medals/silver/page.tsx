"use client";

import { useState } from "react";
import MedalCard from "@/components/medals/MedalCard";
import DetailModal from "@/components/modals/DetailModal";
import AthleteDetail from "@/components/modals/AthleteDetail";
import TeamDetail from "@/components/modals/TeamDetail";
import { medals } from "@/data/medals";
import { MedalRecord } from "@/types/olympics";
import { cn } from "@/lib/utils";

export default function SilverMedalsPage() {
  const [selectedRecord, setSelectedRecord] = useState<MedalRecord | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Pre-filter to silver medals only
  const silverMedals = medals.filter((m) => m.medal === "silver");

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
          India's Olympic Silver Medals
        </h1>
        <p className="text-navy-500 mt-3">
          Every silver medal won by India in Olympic history
        </p>
      </div>

      {silverMedals.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-sm text-navy-400">No silver medals found</p>
        </div>
      ) : (
        <div className="grid gap-5">
          <div className="hidden md:block text-center text-sm text-navy-400">
            Grid layout: 1 column on mobile, 2 on tablet, 3-4 on desktop
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {silverMedals.map((medal) => (
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
        title="Olympic Silver Medal Detail"
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