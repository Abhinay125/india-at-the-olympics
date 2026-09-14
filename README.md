# 🇮🇳 India at the Olympics

A premium, editorial-style website documenting India's complete Olympic history — from Norman Pritchard at the 1900 Paris Games to the 2024 Paris Olympics. Every medal, every athlete, every story.

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS |
| Charts | Recharts |
| Icons | Lucide React |
| Deployment | Cloudflare Pages + Worker |

## 📁 Project Structure

```
├── app/
│   ├── api/youtube-search/route.ts   # Server-side YouTube API proxy
│   ├── athletes/page.tsx              # Athlete directory
│   ├── medals/
│   │   ├── page.tsx                   # Full medal archive with search & filters
│   │   ├── gold/page.tsx              # Pre-filtered gold medals
│   │   ├── silver/page.tsx            # Pre-filtered silver medals
│   │   └── bronze/page.tsx            # Pre-filtered bronze medals
│   ├── olympics/[year]/page.tsx       # Individual Olympic edition detail
│   ├── participations/page.tsx        # Non-medal participation records
│   ├── winter-olympics/page.tsx       # Winter Olympics section
│   ├── layout.tsx                     # Root layout with metadata
│   ├── globals.css                    # Custom theme (gold/silver/bronze/navy/warm)
│   └── page.tsx                       # Homepage
├── components/
│   ├── hero/
│   │   ├── HeroSection.tsx            # Dark navy gradient hero
│   │   └── IntroSection.tsx           # Editorial intro paragraph
│   ├── medals/
│   │   ├── MedalStats.tsx             # Gold/Silver/Bronze/Total stat cards
│   │   ├── MedalCategories.tsx        # 4-card navigation to medal pages
│   │   └── MedalCard.tsx              # Clickable medal record card
│   ├── charts/
│   │   └── MedalChart.tsx             # Recharts stacked bar chart
│   ├── athletes/
│   │   └── FeaturedAthletes.tsx       # Featured medalist grid
│   ├── olympics/
│   │   ├── OlympicTimeline.tsx        # Alternating timeline
│   │   └── WinterSection.tsx          # Homepage winter preview card
│   ├── videos/
│   │   ├── VideoSection.tsx           # Iconic moments grid
│   │   └── YouTubeEmbed.tsx           # Client-side YouTube search player
│   ├── modals/
│   │   ├── DetailModal.tsx            # Wrapper modal (components/modals/)
│   │   ├── AthleteDetail.tsx          # Individual medal detail view
│   │   └── TeamDetail.tsx             # Team medal detail view
│   └── layout/
│       ├── Header.tsx                 # Sticky nav with mobile hamburger
│       └── Footer.tsx                 # 3-column footer
├── data/
│   ├── medals.ts                      # 35 verified medal records
│   ├── olympics.ts                    # 27 Summer Olympic editions
│   ├── athletes.ts                    # 24 athlete profiles
│   ├── teams.ts                       # 2 team records (hockey)
│   ├── participations.ts              # 24 non-medal participation records
│   ├── sports.ts                      # 20 sport entries
│   └── winterOlympics.ts              # 11 Winter editions + 2 winter athletes
├── worker/                            # Cloudflare Worker for YouTube API proxy
├── lib/
│   └── utils.ts                       # 13 utility functions
└── types/
    └── olympics.ts                    # 14 strict TypeScript types
```

## 🎯 Data Architecture

### Single Source of Truth: `data/medals.ts`

All medal statistics, charts, and archive pages derive from this single file. Medal counts:

- 🥇 **10 Gold** (1900–2008)
- 🥈 **10 Silver** (1900–2020)  
- 🥉 **22 Bronze** (1952–2024)
- **42 Total** verified medal records

### Normalized IDs

Every medal record uses a unique ID format:
```
IND-{year}-{sport}-{event}-{slug}-{medal}
```
Example: `IND-2008-shooting-mens-10m-air-rifle-abhinav-bindra-gold`

### Data Completeness Flags

Each record includes a `source` URL for verification and a `historicalNote` field for nuanced records (e.g., the 1900 Norman Pritchard records, where India's representation is historically ambiguous).

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd india-at-the-olympics

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your YouTube Data API v3 key
```

### Development

```bash
npm run dev
# Open http://localhost:3000
```

### Build

```bash
npm run type-check   # TypeScript validation
npm run build        # Production build (static export to out/)
npm run start        # Start production server
```

## 🔧 YouTube Integration

The YouTube search feature uses a server-side API route to keep the API key secure:

1. **Client**: `YouTubeEmbed.tsx` calls `/api/youtube-search?q=...`
2. **Server**: `app/api/youtube-search/route.ts` queries YouTube Data API v3
3. **Cache**: In-memory cache with 1-hour TTL reduces API calls
4. **Fallback**: If no API key is configured, returns an empty array with a search link

### YouTube Worker Deployment (worker/)

For production, the YouTube search API is deployed as a separate Cloudflare Worker. This keeps the API key secure and avoids exposing it in the static frontend.

**Setup:**

```bash
cd worker

# Set the YouTube API key as a Worker secret
npx wrangler secret put YOUTUBE_API_KEY
# Paste your YouTube Data API v3 key when prompted

# Deploy the Worker
npx wrangler deploy
```

**Worker Details:**
- The Worker is defined in `worker/src/index.ts`
- It proxies YouTube Data API v3 search requests
- The API key is stored as an encrypted Worker secret (never in code)
- After deployment, update the frontend to use the Worker URL instead of the local API route
- The Worker URL will be something like `https://youtube-search.<your-subdomain>.workers.dev`

## 🎨 Design System

### Color Palette

| Token | Usage |
|-------|-------|
| `gold-400/500/600` | Gold medals, active states |
| `silver-400/500/600` | Silver medals |
| `bronze-400/500/600` | Bronze medals |
| `navy-50..800` | Text, backgrounds, UI |
| `warm-50..200` | Card backgrounds, accents |

### Typography

- **Display**: Playfair Display (headings, hero)
- **Body**: Inter (paragraphs, UI)

### Accessibility

- Modal focus trap with ESC and click-outside close
- `body.modal-open` scroll lock
- `prefers-reduced-motion` respected globally
- Semantic HTML with ARIA labels
- Keyboard-navigable throughout

## 📊 Features

| Feature | Description |
|---------|------------|
| **Medal Archive** | Searchable, filterable grid of all 42 medals |
| **Detail Modals** | Click any medal card for full story |
| **Medal Chart** | Stacked bar chart of medals by year |
| **Timeline** | Alternating timeline of all Olympic editions |
| **Athlete Directory** | 24 athletes with bios and medal badges |
| **Winter Olympics** | Separate section for Winter Games |
| **YouTube Search** | Server-side API for iconic moment videos |
| **Responsive** | Mobile → Tablet → Desktop layouts |

## 🌐 Deployment

### Cloudflare Pages Deployment

> ⚠️ **Important:** This project uses Next.js 14 with `output: "export"` for **static HTML export**. You must configure Cloudflare Pages to use the **"Next.js (Static HTML Export)"** framework preset — **NOT** the standard "Next.js" preset. The standard "Next.js" preset triggers OpenNext (`npx opennextjs-cloudflare build`), which is not needed for static export sites and will cause build failures.

#### How It Works

The project builds to the `out/` directory as static HTML. Cloudflare Pages simply serves these files — no server-side rendering or edge functions are needed for the main site.

#### Creating a New Cloudflare Pages Project

1. Go to the [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **Create**
2. Select **Pages** → **Create a project** → **Connect to Git** (or **Direct Upload**)
3. Connect your GitHub/GitLab repository
4. In the **Build settings**, configure:

| Setting | Value |
|---------|-------|
| **Framework preset** | `Next.js (Static HTML Export)` |
| **Build command** | `npx next build` |
| **Build output directory** | `out` |
| **Node.js version** | `18` |

5. Click **Save and Deploy**

#### Changing Settings on an Existing Cloudflare Pages Project

If your project was previously configured with the wrong settings (e.g., standard "Next.js" which triggers OpenNext):

1. Go to **Workers & Pages** → Select your project (e.g., `india-at-the-olympics`)
2. Click **Settings** tab
3. Navigate to **Build & deployment**
4. Under **Build configuration**, update:

| Setting | Change To |
|---------|-----------|
| **Framework preset** | `Next.js (Static HTML Export)` (was: `Next.js`) |
| **Build command** | `npx next build` |
| **Build output directory** | `out` |
| **Node.js version** | `18` |

5. Click **Save**
6. Go to **Deployments** tab → click **Retry deployment** on the latest deployment, or push a new commit to trigger a fresh build

#### Environment Variables

In Cloudflare Pages project settings → **Environment variables**, add:

| Variable | Required | Description |
|----------|----------|-------------|
| `YOUTUBE_API_KEY` | Optional | YouTube Data API v3 key |

> **Note:** The static frontend doesn't directly use `YOUTUBE_API_KEY` in Cloudflare Pages (it's not a serverless environment). For the YouTube search feature, deploy the [YouTube Worker](#youtube-worker-deployment-worker) separately and update the frontend to use the Worker URL.

#### Deploy via CLI (Alternative)

You can also deploy directly from the command line using Wrangler:

```bash
# Build the static export
npm run build

# Deploy to Cloudflare Pages
npx wrangler pages deploy out --project-name=india-at-the-olympics
```

This bypasses the Cloudflare dashboard settings and deploys the `out/` directory directly.

#### Troubleshooting

| Issue | Cause | Fix |
|-------|-------|-----|
| Build fails with OpenNext errors | Framework preset is set to "Next.js" instead of "Next.js (Static HTML Export)" | Change preset in Settings → Build & deployment |
| `out/` directory not found | Build command or output directory is wrong | Set build command to `npx next build` and output to `out` |
| Build uses wrong Node.js version | Node version not set to 18 | Set Node.js version to `18` in build settings |
| Pages show 404 | Output directory doesn't match build output | Ensure output directory is `out` and build completed successfully |

### Wrangler CLI Deployment (Alternative)

```bash
# Build for static export (output: 'export' in next.config.js)
npm run build

# Deploy to Cloudflare Pages
npx wrangler pages deploy out --project-name=india-at-the-olympics
```

## 📝 License

This project documents verified historical Olympic records. All data is sourced from official Olympic records and reputable sports archives.

---

**Built with pride for India's Olympic heritage.** 🇮🇳
