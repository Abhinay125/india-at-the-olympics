import { athletes } from "@/data/athletes";
import { medals } from "@/data/medals";
import { Trophy } from "lucide-react";
import Link from "next/link";

export default function FeaturedAthletes() {
  // Get featured athletes - those with medals
  const featured = athletes.filter((a) =>
    medals.some((m) => m.athleteIds?.includes(a.id))
  ).slice(0, 6);

  return (
    <section className="bg-warm-100/50 py-16">
      <div className="container-wide">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-800">
              Featured Athletes
            </h2>
            <p className="text-navy-500 mt-3">
              India&apos;s Olympic champions and their stories
            </p>
          </div>
          <Link
            href="/athletes"
            className="hidden md:inline-flex btn-secondary text-sm"
          >
            View all athletes →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((athlete) => {
            const athleteMedal = medals.find(
              (m) => m.athleteIds?.includes(athlete.id)
            );
            return (
              <div
                key={athlete.id}
                className="card p-6 hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-start gap-4">
                  {/* Avatar placeholder */}
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold-100 to-gold-200 flex items-center justify-center flex-shrink-0">
                    <span className="text-lg font-bold text-gold-700">
                      {athlete.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-navy-800 text-lg leading-tight">
                      {athlete.name}
                    </h3>
                    <p className="text-sm text-navy-500 mt-0.5">
                      {athlete.sport}
                    </p>
                    {athleteMedal && (
                      <div className="flex items-center gap-2 mt-2">
                        <Trophy className="w-3.5 h-3.5 text-gold-500" />
                        <span className="text-xs font-semibold text-gold-600 uppercase tracking-wide">
                          {athleteMedal.medal} — {athleteMedal.year} {athleteMedal.city}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-sm text-navy-500 mt-4 line-clamp-3 leading-relaxed">
                  {athlete.bio.slice(0, 150)}...
                </p>
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 text-center md:hidden">
          <Link href="/athletes" className="btn-secondary text-sm">
            View all athletes →
          </Link>
        </div>
      </div>
    </section>
  );
}
