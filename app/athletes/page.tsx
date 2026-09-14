import Link from "next/link";
import { athletes } from "@/data/athletes";
import { medals } from "@/data/medals";
import { getMedalEmoji, getMedalColor } from "@/lib/utils";

export default function AthletesPage() {
  // Sort athletes by name
  const sortedAthletes = [...athletes].sort((a, b) => 
    a.name.localeCompare(b.name)
  );

  return (
    <div className="container-wide py-12">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-navy-800">
          Indian Olympic Athletes
        </h1>
        <p className="text-navy-500 mt-3">
          Complete directory of Indian athletes who have competed in the Olympics
        </p>
      </div>

      {sortedAthletes.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold text-navy-700 mb-2">
            No athlete records found
          </h3>
        </div>
      ) : (
        <div className="grid gap-6">
          <div className="hidden md:block text-center text-sm text-navy-400">
            Grid layout: 1 column on mobile, 2 on tablet, 3 on desktop
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedAthletes.map((athlete) => {
              // Check if athlete has medals
              const athleteMedals = medals.filter(m => 
                m.athleteIds?.includes(athlete.id)
              );
              const hasMedals = athleteMedals.length > 0;
              const bestMedal = athleteMedals.reduce((best, medal) => {
                const medalValues: Record<string, number> = { gold: 3, silver: 2, bronze: 1 };
                return medalValues[medal.medal] > medalValues[best.medal] ? medal : best;
              }, athleteMedals[0]);
              
              return (
                <Link
                  key={athlete.id}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    // In a real app, this would open a modal or navigate to athlete detail
                    // For now, we'll just show an alert or we could implement client-side navigation
                    // Since we're using modals for medals, we could do the same for athletes
                    // But let's keep it simple and just show that it's clickable
                  }}
                  className="group"
                >
                  <div className={`card p-6 hover:shadow-lg transition-all duration-200 ${hasMedals ? "ring-1 ring-gold-200" : ""}`}>
                    <div className="flex items-start gap-4">
                      {/* Avatar with initials */}
                      <div className="flex-shrink-0 mt-0.5">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-warm-100">
                          <span className="text-lg font-medium text-navy-600">
                            {athlete.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                          </span>
                        </div>
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-navy-800 text-lg leading-tight group-hover:text-gold-600 transition-colors">
                          {athlete.name}
                        </h3>
                        <p className="text-sm text-navy-500 mt-0.5">
                          {athlete.sport}
                        </p>
                        
                        {hasMedals && (
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs font-medium uppercase tracking-wider">
                              {getMedalEmoji(bestMedal.medal)} {bestMedal.medal.toUpperCase()}
                            </span>
                            <span className="text-xs text-navy-500 ml-2">
                              {bestMedal.year} {bestMedal.city}
                            </span>
                          </div>
                        )}
                        
                        {!hasMedals && (
                          <div className="mt-2">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-navy-50 text-navy-200">
                              Participated: {athlete.olympicAppearances}×
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-sm text-navy-500 mt-4 line-clamp-3">
                      {athlete.bio}
                    </p>
                    
                    <div className="mt-4 pt-3 border-t border-gray-100">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-navy-400">Olympic Appearances:</span>
                        <span className="font-medium text-navy-600">{athlete.olympicAppearances}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs mt-1">
                        <span className="text-navy-400">First Appearance:</span>
                        <span className="font-medium text-navy-600">
                          {/* Would need to calculate from data */}
                          {athlete.olympicAppearances > 0 ? "Various" : "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}