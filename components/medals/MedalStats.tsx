"use client";

import { Trophy, Medal, Award, Target } from "lucide-react";
import { medals } from "@/data/medals";
import { calculateMedalStats } from "@/lib/utils";

export default function MedalStats() {
  const stats = calculateMedalStats(medals);
  
  const items = [
    { label: "Gold", value: stats.gold, icon: Trophy, color: "text-gold-500", bg: "bg-gold-50", border: "border-gold-200" },
    { label: "Silver", value: stats.silver, icon: Medal, color: "text-silver-500", bg: "bg-silver-50", border: "border-silver-200" },
    { label: "Bronze", value: stats.bronze, icon: Award, color: "text-bronze-500", bg: "bg-bronze-50", border: "border-bronze-200" },
    { label: "Total", value: stats.total, icon: Target, color: "text-navy-600", bg: "bg-navy-50", border: "border-navy-200" },
  ];

  return (
    <section className="container-wide py-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {items.map((item) => (
          <div
            key={item.label}
            className={`${item.bg} border ${item.border} rounded-2xl p-6 text-center transition-all duration-200 hover:shadow-md`}
          >
            <item.icon className={`w-8 h-8 ${item.color} mx-auto mb-3`} />
            <div className={`text-4xl md:text-5xl font-bold ${item.color}`}>
              {item.value}
            </div>
            <div className="text-sm font-medium text-navy-500 mt-2 uppercase tracking-wider">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
