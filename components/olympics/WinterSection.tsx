import Link from "next/link";
import { Snowflake } from "lucide-react";

export default function WinterSection() {
  return (
    <section className="bg-gradient-to-b from-navy-50 to-warm-50 py-16">
      <div className="container-wide">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-blue-50 border border-blue-100">
            <Snowflake className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium text-blue-600">
              Winter Olympics
            </span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-navy-800">
            India at the Winter Olympics
          </h2>
          <p className="text-navy-500 mt-4 leading-relaxed">
            India has participated in multiple Winter Olympic Games, with athletes
            competing in luge, alpine skiing, and cross-country skiing. While medals
            have remained elusive, the determination of winter sport athletes
            represents an important chapter in India&apos;s Olympic story.
          </p>
          
          <Link
            href="/winter-olympics"
            className="inline-flex items-center gap-2 mt-8 btn-primary"
          >
            <Snowflake className="w-4 h-4" />
            Explore Winter Olympics →
          </Link>
        </div>
      </div>
    </section>
  );
}