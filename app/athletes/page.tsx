import { athletes } from "@/data/athletes";
import { medals } from "@/data/medals";
import { getMedalEmoji } from "@/lib/utils";

export const metadata = {
  title: "Indian Olympic Athletes",
  description: "Complete directory of Indian athletes who have competed in the Olympics",
};

export default function AthletesPage() {
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedAthletes.map((athlete) => {
            const athleteMedals = medals.filter((m) =>
              m.athleteIds?.includes(athlete.id)
            );
            const hasMedals = athleteMedals.length > 0;
            const bestMedal = hasMedals
              ? athleteMedals.reduce((best, medal) => {
                  const medalValues: Record<string, number> = {
                    gold: 3,
                    silver: 2,
                    bronze: 1,
                  };
                  return medalValues[medal.medal] > medalValues[best.medal]
                    ? medal
                    : best;
                }, athleteMedals[0])
              : null;

            return (
              <div
                key={athlete.id}
                className={`card p-6 transition-all duration-200 ${
                  hasMedals ? "ring-1 ring-gold-200" : ""
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-warm-100">
                      <span className="text-lg font-medium text-navy-600">
                        {athlete.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </span>
                    </div>
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-navy-800 text-lg leading-tight">
                      {athlete.name}
                    </h3>
                    <p className="text-sm text-navy-500 mt-0.5">
                      {athlete.sport}
                    </p>

                    {hasMedals && bestMedal && (
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs font-medium uppercase tracking-wider">
                          {getMedalEmoji(bestMedal.medal)}{" "}
                          {bestMedal.medal.toUpperCase()}
                        </span>
                        <span className="text-xs text-navy-500 ml-2">
                          {bestMedal.year} {bestMedal.city}
                        </span>
                      </div>
                    )}

                    {!hasMedals && (
                      <div className="mt-2">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-navy-50 text-navy-200">
                          Participated: {athlete.olympicAppearances}&times;
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
                    <span className="text-navy-400">
                      Olympic Appearances:
                    </span>
                    <span className="font-medium text-navy-600">
                      {athlete.olympicAppearances}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
