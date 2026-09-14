import { NextRequest, NextResponse } from "next/server";

interface YouTubeSearchResponse {
  videos: Array<{
    videoId: string;
    title: string;
    channel: string;
    thumbnailUrl: string;
    publishedAt?: string;
    description?: string;
  }>;
}

// Simple in-memory cache to avoid duplicate requests
const searchCache = new Map<string, { data: YouTubeSearchResponse; timestamp: number }>();
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const q = searchParams.get("q");
  const maxResults = searchParams.get("maxResults") || "5";

  if (!q) {
    return NextResponse.json({ videos: [] }, { status: 400 });
  }

  // Check cache first
  const cacheKey = `${q.toLowerCase()}-${maxResults}`;
  const cached = searchCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return NextResponse.json(cached.data);
  }

  // Check for YouTube API key
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    // No API key configured — return empty array so the client shows a fallback search link
    const response: YouTubeSearchResponse = { videos: [] };
    searchCache.set(cacheKey, { data: response, timestamp: Date.now() });
    return NextResponse.json(response);
  }

  try {
    const youtubeUrl = new URL("https://www.googleapis.com/youtube/v3/search");
    youtubeUrl.searchParams.set("part", "snippet");
    youtubeUrl.searchParams.set("q", q);
    youtubeUrl.searchParams.set("type", "video");
    youtubeUrl.searchParams.set("maxResults", maxResults);
    youtubeUrl.searchParams.set("key", apiKey);

    const ytRes = await fetch(youtubeUrl.toString());

    if (!ytRes.ok) {
      return NextResponse.json({ videos: [] }, { status: 502 });
    }

    const ytData = await ytRes.json();

    const videos = (ytData.items || []).map(
      (item: { id: { videoId: string }; snippet: { title: string; channelTitle: string; thumbnails: { high: { url: string } }; publishedAt?: string; description?: string } }) => ({
        videoId: item.id.videoId,
        title: item.snippet.title,
        channel: item.snippet.channelTitle,
        thumbnailUrl: item.snippet.thumbnails?.high?.url || "",
        publishedAt: item.snippet.publishedAt,
        description: item.snippet.description,
      })
    );

    const response: YouTubeSearchResponse = { videos };

    // Cache the response
    searchCache.set(cacheKey, { data: response, timestamp: Date.now() });

    // Limit cache size
    if (searchCache.size > 100) {
      const oldestKey = searchCache.keys().next().value;
      if (oldestKey) searchCache.delete(oldestKey);
    }

    return NextResponse.json(response);
  } catch {
    return NextResponse.json({ videos: [] }, { status: 500 });
  }
}
