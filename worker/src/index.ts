/**
 * Cloudflare Worker — YouTube Data API v3 proxy
 *
 * Keeps the API key server-side. The Next.js client calls:
 *   GET /api/youtube-search?q=<query>&maxResults=<n>
 *
 * Deploy:
 *   cd worker
 *   npx wrangler secret put YOUTUBE_API_KEY
 *   npx wrangler deploy
 *
 * Then point your Next.js /api/youtube-search route at this worker URL,
 * or deploy this as a Pages Function alongside the static export.
 */

interface Env {
  YOUTUBE_API_KEY: string;
  // Optional: CACHE_TTL_SECONDS: string;
}

interface VideoResult {
  videoId: string;
  title: string;
  channel: string;
  thumbnailUrl: string;
  publishedAt?: string;
  description?: string;
}

interface SearchResponse {
  videos: VideoResult[];
}

// Simple in-memory cache (per-isolate, short-lived)
const cache = new Map<string, { data: SearchResponse; ts: number }>();
const DEFAULT_TTL = 3600_000; // 1 hour

function getCorsHeaders(origin: string | null): Record<string, string> {
  const allowed = [
    "https://india-at-the-olympics.com",
    "https://www.india-at-the-olympics.com",
    "http://localhost:3000",
  ];
  const allowOrigin = origin && allowed.includes(origin) ? origin : "*";
  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Cache-Control": "public, max-age=300",
  };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const origin = request.headers.get("Origin");

    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: getCorsHeaders(origin) });
    }

    // Only handle GET on /api/youtube-search or root /
    if (request.method !== "GET") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { ...getCorsHeaders(origin), "Content-Type": "application/json" },
      });
    }

    const q = url.searchParams.get("q");
    const maxResults = url.searchParams.get("maxResults") || "5";
    const corsHeaders = getCorsHeaders(origin);

    if (!q) {
      return new Response(JSON.stringify({ videos: [] }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const apiKey = env.YOUTUBE_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ videos: [], error: "No API key configured" }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Check cache
    const cacheKey = `${q.toLowerCase()}:${maxResults}`;
    const ttl = DEFAULT_TTL;
    const cached = cache.get(cacheKey);
    if (cached && Date.now() - cached.ts < ttl) {
      return new Response(JSON.stringify(cached.data), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Call YouTube Data API v3
    try {
      const ytUrl = new URL("https://www.googleapis.com/youtube/v3/search");
      ytUrl.searchParams.set("part", "snippet");
      ytUrl.searchParams.set("q", q);
      ytUrl.searchParams.set("type", "video");
      ytUrl.searchParams.set("maxResults", maxResults);
      ytUrl.searchParams.set("key", apiKey);

      const ytRes = await fetch(ytUrl.toString());

      if (!ytRes.ok) {
        return new Response(JSON.stringify({ videos: [] }), {
          status: 502,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const ytData = (await ytRes.json()) as {
        items?: Array<{
          id: { videoId: string };
          snippet: {
            title: string;
            channelTitle: string;
            thumbnails: { high?: { url: string }; default?: { url: string } };
            publishedAt?: string;
            description?: string;
          };
        }>;
      };

      const videos: VideoResult[] = (ytData.items || []).map((item) => ({
        videoId: item.id.videoId,
        title: item.snippet.title,
        channel: item.snippet.channelTitle,
        thumbnailUrl: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.default?.url || "",
        publishedAt: item.snippet.publishedAt,
        description: item.snippet.description,
      }));

      const response: SearchResponse = { videos };

      // Cache the response
      cache.set(cacheKey, { data: response, ts: Date.now() });

      // Evict oldest if cache is too large
      if (cache.size > 200) {
        const oldest = cache.keys().next().value;
        if (oldest) cache.delete(oldest);
      }

      return new Response(JSON.stringify(response), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    } catch (err) {
      return new Response(JSON.stringify({ videos: [] }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  },
};
