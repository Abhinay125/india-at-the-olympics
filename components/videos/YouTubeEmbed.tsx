"use client";

import { useState, useEffect } from "react";
import { Play, ExternalLink, Loader2 } from "lucide-react";

interface YouTubeEmbedProps {
  searchQuery: string;
  videoId?: string;
}

export default function YouTubeEmbed({ searchQuery, videoId }: YouTubeEmbedProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [resolvedVideoId, setResolvedVideoId] = useState<string | null>(videoId || null);

  useEffect(() => {
    if (videoId) {
      setResolvedVideoId(videoId);
      setLoading(false);
      return;
    }

    // Try to fetch from our API endpoint
    const fetchVideo = async () => {
      try {
        const res = await fetch(
          `/api/youtube-search?q=${encodeURIComponent(searchQuery)}&maxResults=1`
        );
        if (!res.ok) throw new Error("API error");
        const data = await res.json();
        if (data.videos && data.videos.length > 0) {
          setResolvedVideoId(data.videos[0].videoId);
        } else {
          setError(true);
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [searchQuery, videoId]);

  const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`;

  if (loading) {
    return (
      <div className="bg-warm-100 rounded-xl p-6 flex flex-col items-center justify-center min-h-[200px]">
        <Loader2 className="w-6 h-6 text-navy-400 animate-spin mb-3" />
        <p className="text-sm text-navy-400">Loading video...</p>
      </div>
    );
  }

  if (error || !resolvedVideoId) {
    return (
      <div className="bg-warm-100 rounded-xl p-6 text-center">
        <Play className="w-10 h-10 text-navy-300 mx-auto mb-3" />
        <p className="text-sm text-navy-500 mb-3">
          No related video could be loaded right now.
        </p>
        <a
          href={youtubeSearchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-gold-600 hover:text-gold-700 transition-colors"
        >
          <Play className="w-4 h-4" />
          Search on YouTube
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    );
  }

  return (
    <div className="rounded-xl overflow-hidden">
      <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
        <iframe
          src={`https://www.youtube.com/embed/${resolvedVideoId}?rel=0&modestbranding=1`}
          title={searchQuery}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
          loading="lazy"
        />
      </div>
    </div>
  );
}