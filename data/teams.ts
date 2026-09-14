import { Team } from "@/types/olympics";

export const teams: Team[] = [
  {
    id: "TEAM-india-mens-hockey",
    slug: "india-mens-hockey",
    name: "India Men's National Field Hockey Team",
    country: "India",
    sport: "Hockey",
    olympicAppearances: 20,
    memberIds: [],
    bio: "The India men's national field hockey team is one of the most successful teams in Olympic hockey history. India has won a total of 8 Olympic gold medals in field hockey (1928, 1932, 1936, 1948, 1952, 1956, 1964, 1980), making it the most successful nation in Olympic hockey history. The team has also won 1 silver medal (1960) and 3 bronze medals (1968, 1972, 2020). India dominated Olympic hockey from 1928 to 1956, winning six consecutive gold medals.",
    imageUrl: undefined,
    sourceUrls: [
      "https://olympics.com/en/teams/india/field-hockey/men",
      "https://en.wikipedia.org/wiki/India_men%27s_national_field_hockey_team",
    ],
  },
  {
    id: "TEAM-india-womens-hockey",
    slug: "india-womens-hockey",
    name: "India Women's National Field Hockey Team",
    country: "India",
    sport: "Hockey",
    olympicAppearances: 4,
    memberIds: [],
    bio: "The India women's national field hockey team has represented India at the Olympics in 1980, 2016, 2020, and 2024. Their best result was reaching the fourth-place finish at the 2020 Tokyo Olympics, narrowly missing a bronze medal. The team has grown significantly in stature and competitiveness over the decades.",
    imageUrl: undefined,
    sourceUrls: [
      "https://olympics.com/en/teams/india/field-hockey/women",
    ],
  },
];
