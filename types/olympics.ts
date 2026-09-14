export type MedalType = "gold" | "silver" | "bronze";
export type Season = "summer" | "winter";
export type RecordKind = "individual" | "team";
export type DataCompleteness = "verified" | "partial" | "unavailable";

export type MedalRecord = {
  id: string; // normalized: IND-{year}-{sport}-{event}-{slug}-{medal}
  kind: RecordKind;
  medal: MedalType;
  year: number;
  season: Season;
  city: string;
  athleteIds?: string[];
  teamId?: string;
  sport: string;
  event: string;
  result?: string;
  achievement: string;
  historicalNote?: string;
  sourceUrls: string[];
  completeness: DataCompleteness;
};

export type Athlete = {
  id: string;
  slug: string;
  name: string;
  country: "India";
  sport: string;
  olympicAppearances: number;
  bio: string;
  imageUrl?: string;
  sourceUrls: string[];
};

export type Team = {
  id: string;
  slug: string;
  name: string;
  country: "India";
  sport: string;
  olympicAppearances: number;
  memberIds: string[];
  bio: string;
  imageUrl?: string;
  sourceUrls: string[];
};

export type OlympicEdition = {
  year: number;
  season: Season;
  city: string;
  country: string;
  startDate?: string;
  endDate?: string;
  indiaAthletes?: number;
  indiaMedals: { gold: number; silver: number; bronze: number };
  notableResults?: string;
  sourceUrls: string[];
};

export type Participation = {
  id: string;
  year: number;
  season: Season;
  city: string;
  athleteId?: string;
  teamId?: string;
  athleteName: string;
  sport: string;
  event: string;
  result?: string;
  summary: string;
  completeness: DataCompleteness;
  sourceUrls: string[];
};

export type VideoResult = {
  videoId: string;
  title: string;
  channel: string;
  thumbnailUrl: string;
  publishedAt?: string;
  description?: string;
};

export type Sport = {
  id: string;
  name: string;
  category: string;
};

export type FilterState = {
  medalType: MedalType | "all";
  year: number | "all";
  sport: string | "all";
  search: string;
};

export type MedalStats = {
  gold: number;
  silver: number;
  bronze: number;
  total: number;
};

export type MedalsByYear = {
  year: number;
  city: string;
  gold: number;
  silver: number;
  bronze: number;
  total: number;
};
