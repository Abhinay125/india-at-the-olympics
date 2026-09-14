import Link from "next/link";
import { Trophy } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy-800 text-white mt-20">
      <div className="container-wide py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gold-500">
                <Trophy className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-bold tracking-widest uppercase">
                India at the Olympics
              </span>
            </div>
            <p className="text-silver-300 text-sm leading-relaxed">
              A comprehensive historical archive of India&apos;s participation
              and achievements in the Summer and Winter Olympic Games from 1900
              to present.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold tracking-widest uppercase mb-4 text-silver-200">
              Archive
            </h3>
            <nav className="flex flex-col gap-2">
              {[
                { href: "/medals", label: "Medal Archive" },
                { href: "/medals/gold", label: "Gold Medals" },
                { href: "/medals/silver", label: "Silver Medals" },
                { href: "/medals/bronze", label: "Bronze Medals" },
                { href: "/participations", label: "Participations" },
                { href: "/athletes", label: "Athletes" },
                { href: "/winter-olympics", label: "Winter Olympics" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-silver-300 text-sm hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Sources & Disclaimer */}
          <div>
            <h3 className="text-sm font-bold tracking-widest uppercase mb-4 text-silver-200">
              About This Archive
            </h3>
            <div className="text-silver-300 text-sm space-y-3 leading-relaxed">
              <p>
                This is an independent historical archive project. It is not
                officially affiliated with the International Olympic Committee,
                the Indian Olympic Association, or any national Olympic body.
              </p>
              <p>
                Data is sourced from official Olympic records, Olympedia, and
                other verified historical references. Every effort has been made
                to ensure accuracy.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-navy-600">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-silver-400 text-xs">
              © {new Date().getFullYear()} India at the Olympics Archive. Data
              sourced from publicly available Olympic records.
            </p>
            <p className="text-silver-500 text-xs">
              Built with verified historical data. Not an official Olympic
              website.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
