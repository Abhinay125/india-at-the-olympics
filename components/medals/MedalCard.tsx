import Link from "next/link";
import { MedalRecord } from "@/types/olympics";
import { getMedalEmoji, getMedalColor, getMedalBgColor } from "@/lib/utils";

interface MedalCardProps {
  record: MedalRecord;
  onClick?: (record: MedalRecord) => void;
}

export default function MedalCard({ record, onClick }: MedalCardProps) {
  return (
    <div
      onClick={() => onClick?.(record)}
      className="medal-card cursor-pointer hover:shadow-md transition-shadow duration-200 border border-gray-100 rounded-lg bg-white p-4"
    >
      <div className="flex items-start gap-4">
        {/* Medal indicator */}
        <div className="flex-shrink-0 mt-0.5">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getMedalBgColor(
            record.medal
          )} ${getMedalColor(record.medal)}`}>
            <span className="text-2xl">{getMedalEmoji(record.medal)}</span>
          </div>
        </div>
        <div className="min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-navy-800">
              {record.kind === "team" ? "Team Event" : "Individual"}
            </h3>
            <span className={`text-xs font-medium uppercase tracking-wider px-2 py-0.5 rounded ${getMedalBgColor(
              record.medal
            )} ${getMedalColor(record.medal)}`}>
              {record.medal.toUpperCase()}
            </span>
          </div>
          <div className="flex items-center gap-4 mb-2 text-sm text-navy-500">
            <span>{record.year}</span>
            <span className="w-px h-4 bg-gray-200" />
            <span>{record.city}</span>
          </div>
          {record.kind === "individual" && record.athleteIds && (
            <p className="text-sm text-navy-500 truncate max-w-[200px]">
              {/* In a real implementation, we would map athleteIds to names */}
              {record.athleteIds.map((id, index) => (
                <span key={id}>Athlete {id}{index < (record.athleteIds?.length ?? 0) - 1 ? ", " : ""}</span>
              ))}
            </p>
          )}
          {record.kind === "team" && (
            <p className="text-sm text-navy-500">
              Team Event
            </p>
          )}
          <p className="text-sm text-navy-600 mb-2">
            {record.sport} • {record.event}
          </p>
          <div className="mt-2 text-xs text-navy-400">
            View full details →
          </div>
        </div>
      </div>
    </div>
  );
}