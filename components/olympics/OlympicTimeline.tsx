import Link from "next/link";
import { summerOlympics } from "@/data/olympics";
import { medals } from "@/data/medals";
import { cn } from "@/lib/utils";

export default function OlympicTimeline() {
  return (
    <section className="container-wide py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-navy-800">
          Olympic Timeline
        </h2>
        <p className="text-navy-500 mt-3">
          India&apos;s journey through the Summer Olympics
        </p>
      </div>
      
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gold-300 via-gray-200 to-gray-300 -translate-x-1/2 hidden md:block" />
        
        <div className="space-y-6">
          {summerOlympics.filter(o => o.indiaAthletes !== 0 || o.indiaMedals.gold + o.indiaMedals.silver + o.indiaMedals.bronze > 0).map((edition, index) => {
            const totalMedals = edition.indiaMedals.gold + edition.indiaMedals.silver + edition.indiaMedals.bronze;
            const hasMedals = totalMedals > 0;
            const isLeft = index % 2 === 0;
            
            return (
              <div key={edition.year} className="relative">
                <Link
                  href={`/olympics/${edition.year}`}
                  className={cn(
                    "block md:w-[45%] ml-12 md:ml-0",
                    isLeft ? "md:mr-auto md:pr-8 md:text-right" : "md:ml-auto md:pl-8"
                  )}
                >
                  <div className={cn(
                    "card p-5 transition-all duration-200 hover:shadow-md group",
                    hasMedals && "ring-1 ring-gold-200"
                  )}>
                    <div className="flex items-center gap-3 md:hidden mb-2">
                      <div className={cn(
                        "w-3 h-3 rounded-full flex-shrink-0",
                        hasMedals ? "bg-gold-500" : "bg-gray-300"
                      )} />
                      <span className="text-xs font-medium text-navy-400">
                        {edition.city}, {edition.country}
                      </span>
                    </div>
                    <div className="font-bold text-2xl text-navy-800 group-hover:text-gold-600 transition-colors">
                      {edition.year}
                    </div>
                    <div className="text-sm text-navy-500 mt-0.5 hidden md:block">
                      {edition.city}, {edition.country}
                    </div>
                    {hasMedals && (
                      <div className="flex items-center gap-2 mt-2">
                        {edition.indiaMedals.gold > 0 && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gold-50 text-gold-700 border border-gold-200">
                            🥇 {edition.indiaMedals.gold}
                          </span>
                        )}
                        {edition.indiaMedals.silver > 0 && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-silver-50 text-silver-700 border border-silver-200">
                            🥈 {edition.indiaMedals.silver}
                          </span>
                        )}
                        {edition.indiaMedals.bronze > 0 && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-bronze-50 text-bronze-700 border border-bronze-200">
                            🥉 {edition.indiaMedals.bronze}
                          </span>
                        )}
                      </div>
                    )}
                    {edition.notableResults && (
                      <p className="text-xs text-navy-400 mt-2 line-clamp-2">
                        {edition.notableResults}
                      </p>
                    )}
                  </div>
                </Link>
                
                {/* Timeline dot - visible on md+ */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-5 z-10">
                  <div className={cn(
                    "w-3.5 h-3.5 rounded-full border-2 border-white shadow-sm",
                    hasMedals ? "bg-gold-500" : "bg-gray-300"
                  )} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
