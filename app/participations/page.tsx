import Link from "next/link";
import { participations } from "@/data/participations";
import { athletes } from "@/data/athletes";
import { teams } from "@/data/teams";
import { cn } from "@/lib/utils";

export default function ParticipationsPage() {
  // Group participations by year
  const grouped = participations.reduce((acc, part) => {
    if (!acc[part.year]) {
      acc[part.year] = {
        year: part.year,
        city: part.city,
        participations: [],
      };
    }
    acc[part.year].participations.push(part);
    return acc;
  }, {} as Record<number, { year: number; city: string; participations: typeof participations }>);

  const years = Object.keys(grouped)
    .map(Number)
    .sort((a, b) => a - b);

  return (
    <div className="container-wide py-12">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-navy-800">
          Olympic Participations
        </h1>
        <p className="text-navy-500 mt-3">
          India&apos;s Olympic journey - every Summer Games appearance
        </p>
      </div>

      {years.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold text-navy-700 mb-2">
            No participation records found
          </h3>
        </div>
      ) : (
        <div className="space-y-8">
          {years.map((year) => {
            const yearData = grouped[year];
            const hasMedals = false; // This is participations only, so no medals by definition
            
            return (
              <div key={year} className="border-b pb-8 last:border-0 last:pb-0">
                <h2 className="text-2xl font-bold text-navy-800 flex items-center gap-3">
                  {year} {yearData.city}
                  {!hasMedals && (
                    <span className="text-xs bg-navy-100 text-navy-500 px-2 py-0.5 rounded-full">
                      No medals
                    </span>
                  )}
                </h2>
                
                <div className="mt-4 space-y-3">
                  {yearData.participations.map((part, index) => (
                    <div
                      key={part.id}
                      className="card p-5 hover:shadow-lg transition-all duration-200 group"
                    >
                      <div className="flex items-start gap-4">
                        {/* Participation indicator */}
                        <div className="flex-shrink-0 mt-0.5">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-navy-50 text-navy-500">
                            <span className="text-sm font-medium">•</span>
                          </div>
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="text-lg font-semibold text-navy-800">
                              Participation
                            </h3>
                            <span className="text-xs font-medium text-navy-500 uppercase">
                              Participation
                            </span>
                          </div>
                          
                          <p className="text-sm text-navy-500 mb-1">
                            {part.athleteName || "Team"}
                          </p>
                          
                          <div className="grid grid-cols-2 gap-2 text-sm text-navy-500">
                            <div>
                              <span className="font-medium">Sport:</span>
                              <span>{part.sport}</span>
                            </div>
                            <div>
                              <span className="font-medium">Event:</span>
                              <span className="line-clamp-1">{part.event}</span>
                            </div>
                            <div>
                              <span className="font-medium">Result:</span>
                              <span>{part.result || "Did not medal"}</span>
                            </div>
                            <div>
                              <span className="font-medium">Year:</span>
                              <span>{part.year}</span>
                            </div>
                          </div>
                          
                          {part.summary && (
                            <div className="mt-3">
                              <p className="text-sm text-navy-600 leading-relaxed">
                                {part.summary}
                              </p>
                            </div>
                          )}
                          
                          <div className="mt-2 text-xs text-navy-400 text-right">
                            View full details →
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}