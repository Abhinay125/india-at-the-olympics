import { Play, ExternalLink, Search } from "lucide-react";

const featuredVideos = [
  {
    query: "Neeraj Chopra gold medal Tokyo 2020 Olympics javelin throw",
    title: "Neeraj Chopra's Historic Gold Medal Throw",
    description: "Watch Neeraj Chopra's winning throw of 87.58m at the 2020 Tokyo Olympics that won India its first-ever Olympic gold in athletics.",
  },
  {
    query: "Abhinav Bindra gold medal 2008 Beijing Olympics shooting",
    title: "Abhinav Bindra's First Individual Gold",
    description: "Abhinav Bindra's historic 10m Air Rifle gold medal at the 2008 Beijing Olympics — India's first individual Olympic gold.",
  },
  {
    query: "India hockey gold medal history Olympics compilation",
    title: "India's Hockey Dominance: 8 Olympic Gold Medals",
    description: "A look back at India's incredible field hockey legacy — from the Amsterdam 1928 triumph through to Moscow 1980.",
  },
  {
    query: "PV Sindhu badminton silver medal 2016 Rio Olympics final",
    title: "PV Sindhu's Silver Medal Run at Rio 2016",
    description: "PV Sindhu's journey to the badminton final at the 2016 Rio Olympics, becoming the first Indian to reach an Olympic badminton final.",
  },
];

export default function VideoSection() {
  return (
    <section className="container-wide py-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-navy-800">
          Olympic Moments
        </h2>
        <p className="text-navy-500 mt-3">
          Relive India&apos;s greatest Olympic achievements
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {featuredVideos.map((video, index) => (
          <div
            key={index}
            className="card p-5 hover:shadow-lg transition-all duration-200 group"
          >
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0 group-hover:bg-red-100 transition-colors">
                <Play className="w-5 h-5 text-red-500" />
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-navy-800 leading-tight group-hover:text-gold-600 transition-colors">
                  {video.title}
                </h3>
                <p className="text-sm text-navy-500 mt-1 line-clamp-2">
                  {video.description}
                </p>
                <a
                  href={`https://www.youtube.com/results?search_query=${encodeURIComponent(video.query)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-3 text-xs font-medium text-gold-600 hover:text-gold-700 transition-colors"
                >
                  <Search className="w-3 h-3" />
                  Watch on YouTube
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-sm text-navy-400">
          Videos are sourced from YouTube. Content is subject to availability.
        </p>
      </div>
    </section>
  );
}
