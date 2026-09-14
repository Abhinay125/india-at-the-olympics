import { Trophy } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-navy-800 via-navy-700 to-navy-600 text-white">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }} />
      </div>
      
      <div className="relative container-wide py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
            <Trophy className="w-4 h-4 text-gold-400" />
            <span className="text-sm font-medium text-gold-200 tracking-wide">Olympic Historical Archive</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            <span className="block text-gold-300">INDIA</span>
            <span className="block text-white">AT THE</span>
            <span className="block text-gold-400">OLYMPICS</span>
          </h1>
          
          <p className="text-lg md:text-xl text-silver-200 max-w-2xl mx-auto leading-relaxed mt-8">
            India&apos;s journey through Olympic history
          </p>
          
          <div className="flex items-center justify-center gap-6 mt-10">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gold-400">1900</div>
              <div className="text-xs text-silver-300 mt-1 tracking-wide uppercase">First Participation</div>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white">35+</div>
              <div className="text-xs text-silver-300 mt-1 tracking-wide uppercase">Total Medals</div>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gold-400">2024</div>
              <div className="text-xs text-silver-300 mt-1 tracking-wide uppercase">Latest Games</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-warm-50 to-transparent" />
    </section>
  );
}
