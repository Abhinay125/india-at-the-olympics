import { MedalRecord, Athlete } from "@/types/olympics";
import { getMedalEmoji, getMedalColor, getMedalBgColor } from "@/lib/utils";
import { athletes } from "@/data/athletes";
import { ExternalLink, MapPin, Calendar, Trophy } from "lucide-react";
import YouTubeEmbed from "@/components/videos/YouTubeEmbed";

interface AthleteDetailProps {
  record: MedalRecord;
}

export default function AthleteDetail({ record }: AthleteDetailProps) {
  // Get athlete info
  const athleteId = record.athleteIds?.[0];
  const athlete = athleteId
    ? athletes.find((a) => a.id === athleteId)
    : null;

  const searchQuery = athlete
    ? `${athlete.name} ${record.event} ${record.year} Olympics`
    : `${record.sport} ${record.event} ${record.year} Olympics`;

  return (
    <div className="p-6 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="md:col-span-2 space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider ${getMedalBgColor(
                  record.medal
                )} ${getMedalColor(record.medal)} border`}
              >
                {getMedalEmoji(record.medal)} {record.medal}
              </span>
              <span className="text-sm text-navy-400">{record.year}</span>
            </div>

            <h2
              className="text-3xl md:text-4xl font-bold text-navy-800"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {athlete?.name || "Team Achievement"}
            </h2>

            <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-navy-500">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                <span>
                  {record.city} {record.year}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Trophy className="w-4 h-4" />
                <span>{record.sport}</span>
              </div>
              {athlete && (
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {athlete.olympicAppearances} Olympic appearance
                    {athlete.olympicAppearances !== 1 ? "s" : ""}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Event info */}
          <div className="bg-warm-100 rounded-xl p-5">
            <h3 className="text-sm font-bold text-navy-600 uppercase tracking-wider mb-2">
              Event
            </h3>
            <p className="text-lg font-semibold text-navy-800">
              {record.event}
            </p>
            {record.result && (
              <p className="text-navy-500 mt-1">Result: {record.result}</p>
            )}
          </div>

          {/* Achievement story */}
          <div>
            <h3 className="text-sm font-bold text-navy-600 uppercase tracking-wider mb-3">
              Achievement Story
            </h3>
            <p className="text-navy-600 leading-relaxed">{record.achievement}</p>
          </div>

          {/* Historical note */}
          {record.historicalNote && (
            <div className="bg-gold-50 border border-gold-200 rounded-xl p-5">
              <h3 className="text-sm font-bold text-gold-700 uppercase tracking-wider mb-2">
                📜 Historical Note
              </h3>
              <p className="text-sm text-gold-800 leading-relaxed">
                {record.historicalNote}
              </p>
            </div>
          )}

          {/* Biographical info */}
          {athlete?.bio && (
            <div>
              <h3 className="text-sm font-bold text-navy-600 uppercase tracking-wider mb-3">
                About {athlete.name}
              </h3>
              <p className="text-navy-600 leading-relaxed text-sm">
                {athlete.bio}
              </p>
            </div>
          )}

          {/* Video section */}
          <div>
            <h3 className="text-sm font-bold text-navy-600 uppercase tracking-wider mb-3">
              Related Video
            </h3>
            <YouTubeEmbed searchQuery={searchQuery} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Medal badge */}
          <div
            className={`${getMedalBgColor(
              record.medal
            )} border rounded-2xl p-6 text-center`}
          >
            <div className="text-5xl mb-2">{getMedalEmoji(record.medal)}</div>
            <div
              className={`text-2xl font-bold uppercase tracking-wider ${getMedalColor(
                record.medal
              )}`}
            >
              {record.medal}
            </div>
            <div className="text-navy-500 mt-1">{record.year} {record.city}</div>
          </div>

          {/* Quick facts */}
          <div className="card p-5">
            <h3 className="text-sm font-bold text-navy-600 uppercase tracking-wider mb-3">
              Quick Facts
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-navy-500">Sport</span>
                <span className="font-medium text-navy-700">{record.sport}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-navy-500">Event</span>
                <span className="font-medium text-navy-700 text-right max-w-[200px]">{record.event}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-navy-500">Type</span>
                <span className="font-medium text-navy-700 capitalize">{record.kind}</span>
              </div>
              {athlete && (
                <div className="flex justify-between">
                  <span className="text-navy-500">Olympic Appearances</span>
                  <span className="font-medium text-navy-700">{athlete.olympicAppearances}</span>
                </div>
              )}
            </div>
          </div>

          {/* Sources */}
          {record.sourceUrls.length > 0 && (
            <div className="card p-5">
              <h3 className="text-sm font-bold text-navy-600 uppercase tracking-wider mb-3">
                Sources
              </h3>
              <div className="space-y-2">
                {record.sourceUrls.map((url, i) => (
                  <a
                    key={i}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-gold-600 hover:text-gold-700 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span className="truncate">{new URL(url).hostname}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}