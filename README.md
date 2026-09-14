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
npm run build        # Production build
npm run start        # Start production server
```

## 🔧 YouTube Integration

The YouTube search feature uses a server-side API route to keep the API key secure:

1. **Client**: `YouTubeEmbed.tsx` calls `/api/youtube-search?q=...`
2. **Server**: `app/api/youtube-search/route.ts` queries YouTube Data API v3
3. **Cache**: In-memory cache with 1-hour TTL reduces API calls
4. **Fallback**: If no API key is configured, returns an empty array with a search link

### Cloudflare Worker Deployment

For production, deploy the YouTube search as a Cloudflare Worker:

```bash
cd worker
npx wrangler secret put YOUTUBE_API_KEY
npx wrangler deploy
```

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

### Cloudflare Pages

```bash
# Build for static export (output: 'export' in next.config.js)
npm run build

# Deploy to Cloudflare Pages
npx wrangler pages deploy out --project-name=india-at-the-olympics
```

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `YOUTUBE_API_KEY` | Optional | YouTube Data API v3 key |

## 📝 License

This project documents verified historical Olympic records. All data is sourced from official Olympic records and reputable sports archives.

---

**Built with pride for India's Olympic heritage.** 🇮🇳
