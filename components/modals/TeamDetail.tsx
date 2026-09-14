import { MedalRecord } from "@/types/olympics";
import { teams } from "@/data/teams";
import { athletes } from "@/data/athletes";
import { getMedalEmoji, getMedalColor, getMedalBgColor } from "@/lib/utils";
import { ExternalLink, MapPin, Calendar, Trophy, Users } from "lucide-react";
import YouTubeEmbed from "@/components/videos/YouTubeEmbed";

interface TeamDetailProps {
  record: MedalRecord;
}

export default function TeamDetail({ record }: TeamDetailProps) {
  const team = record.teamId
    ? teams.find((t) => t.id === record.teamId)
    : null;

  const teamAthletes = record.athleteIds
    ? record.athleteIds
        .map((id) => athletes.find((a) => a.id === id))
        .filter(Boolean)
    : [];

  const searchQuery = team
    ? `${team.name} ${record.event} ${record.year} Olympics`
    : `India ${record.sport} ${record.event} ${record.year} Olympics`;

  return (
    <div className="p-6 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
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
              {team?.name || "Team Achievement"}
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
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                <span>Team Event</span>
              </div>
            </div>
          </div>

          {/* Event info */}
          <div className="bg-warm-100 rounded-xl p-5">
            <h3 className="text-sm font-bold text-navy-600 uppercase tracking-wider mb-2">
              Event
            </h3>
            <p className="text-lg font-semibold text-navy-800">{record.event}</p>
            {record.result && (
              <p className="text-navy-500 mt-1">Result: {record.result}</p>
            )}
          </div>

          {/* Achievement */}
          <div>
            <h3 className="text-sm font-bold text-navy-600 uppercase tracking-wider mb-3">
              Achievement Story
            </h3>
            <p className="text-navy-600 leading-relaxed">{record.achievement}</p>
          </div>

          {/* Team bio */}
          {team?.bio && (
            <div>
              <h3 className="text-sm font-bold text-navy-600 uppercase tracking-wider mb-3">
                About the Team
              </h3>
              <p className="text-navy-600 leading-relaxed text-sm">{team.bio}</p>
            </div>
          )}

          {/* Team members */}
          {teamAthletes.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-navy-600 uppercase tracking-wider mb-3">
                Notable Team Members
              </h3>
              <div className="flex flex-wrap gap-2">
                {teamAthletes.map((a) => a && (
                  <span
                    key={a.id}
                    className="inline-flex items-center px-3 py-1.5 rounded-lg bg-warm-100 text-sm font-medium text-navy-700"
                  >
                    {a.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Video */}
          <div>
            <h3 className="text-sm font-bold text-navy-600 uppercase tracking-wider mb-3">
              Related Video
            </h3>
            <YouTubeEmbed searchQuery={searchQuery} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
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
            <div className="text-navy-500 mt-1">
              {record.year} {record.city}
            </div>
          </div>

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
                <span className="text-navy-500">Type</span>
                <span className="font-medium text-navy-700 capitalize">{record.kind}</span>
              </div>
              {team && (
                <div className="flex justify-between">
                  <span className="text-navy-500">Olympic Appearances</span>
                  <span className="font-medium text-navy-700">{team.olympicAppearances}</span>
                </div>
              )}
            </div>
          </div>

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