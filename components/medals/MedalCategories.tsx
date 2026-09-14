import Link from "next/link";
import { Trophy, Medal, Award, Users } from "lucide-react";
import { medals } from "@/data/medals";
import { calculateMedalStats } from "@/lib/utils";

export default function MedalCategories() {
  const stats = calculateMedalStats(medals);
  
  const categories = [
    {
      label: "Gold",
      count: stats.gold,
      icon: Trophy,
      href: "/medals/gold",
      color: "from-gold-400 to-gold-600",
      textColor: "text-gold-700",
      bgColor: "bg-gold-50",
      borderColor: "border-gold-200",
      hoverBg: "hover:bg-gold-100",
      description: "Historic gold medal victories",
    },
    {
      label: "Silver",
      count: stats.silver,
      icon: Medal,
      href: "/medals/silver",
      color: "from-silver-400 to-silver-600",
      textColor: "text-silver-600",
      bgColor: "bg-silver-50",
      borderColor: "border-silver-200",
      hoverBg: "hover:bg-silver-100",
      description: "Silver medal achievements",
    },
    {
      label: "Bronze",
      count: stats.bronze,
      icon: Award,
      href: "/medals/bronze",
      color: "from-bronze-400 to-bronze-600",
      textColor: "text-bronze-600",
      bgColor: "bg-bronze-50",
      borderColor: "border-bronze-200",
      hoverBg: "hover:bg-bronze-100",
      description: "Bronze medal performances",
    },
    {
      label: "Participations",
      count: null,
      icon: Users,
      href: "/participations",
      color: "from-navy-400 to-navy-600",
      textColor: "text-navy-600",
      bgColor: "bg-navy-50",
      borderColor: "border-navy-200",
      hoverBg: "hover:bg-navy-100",
      description: "India's Olympic journey",
    },
  ];

  return (
    <section className="container-wide py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-navy-800">
          India&apos;s Olympic Medal Archive
        </h2>
        <p className="text-navy-500 mt-3 max-w-2xl mx-auto">
          Explore every medal record across India&apos;s Olympic history
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.label}
            href={cat.href}
            className={`group ${cat.bgColor} border ${cat.borderColor} rounded-2xl p-6 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
          >
            <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${cat.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
              <cat.icon className="w-7 h-7" />
            </div>
            <div className={`text-3xl font-bold ${cat.textColor} mb-1`}>
              {cat.count !== null ? cat.count : "→"}
            </div>
            <div className="text-sm font-semibold text-navy-700 uppercase tracking-wider">
              {cat.label}
            </div>
            <div className="text-xs text-navy-400 mt-2">
              {cat.description}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
