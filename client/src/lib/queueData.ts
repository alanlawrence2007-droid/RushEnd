/* Vaqo / Signal Cartography: shared civic data types and realistic demo locations. */

export type CrowdLevel = "low" | "moderate" | "heavy";
export type LocationCategory = "Hospitals" | "Banks" | "Government" | "Temples" | "Canteens" | "Railway" | "Restaurants";

export type QueueLocation = {
  id: string;
  name: string;
  neighborhood: string;
  category: LocationCategory;
  crowd: CrowdLevel;
  wait: number;
  people: number;
  bestTime: string;
  position: { left: number; top: number };
  note: string;
  confidence: "live" | "estimated";
  trend: number[];
  accent: string;
  lastUpdated: string;
};

export const crowdMeta: Record<CrowdLevel, { label: string; color: string; className: string }> = {
  low: { label: "Quiet", color: "#1D9E75", className: "status-teal" },
  moderate: { label: "Moderate", color: "#BA7517", className: "status-amber" },
  heavy: { label: "Heavy", color: "#D85A30", className: "status-coral" },
};

export const categories: Array<"All" | LocationCategory> = ["All", "Hospitals", "Banks", "Government", "Temples", "Canteens", "Railway", "Restaurants"];

export const initialLocations: QueueLocation[] = [
  {
    id: "citycare-opd",
    name: "CityCare OPD",
    neighborhood: "Old Town · Hospital",
    category: "Hospitals",
    crowd: "low",
    wait: 12,
    people: 18,
    bestTime: "Now",
    position: { left: 35, top: 37 },
    note: "Lowest crowd of the day, right now.",
    confidence: "live",
    trend: [30, 38, 42, 58, 49, 39, 27, 21, 18, 26, 20, 18],
    accent: "teal",
    lastUpdated: "2 min ago",
  },
  {
    id: "union-bank",
    name: "Union Bank · Central",
    neighborhood: "Civic Square · Bank",
    category: "Banks",
    crowd: "moderate",
    wait: 24,
    people: 31,
    bestTime: "After 3:40 PM",
    position: { left: 57, top: 28 },
    note: "Drops to a 10-minute wait by 4:20 PM.",
    confidence: "estimated",
    trend: [24, 30, 28, 44, 62, 76, 71, 63, 55, 49, 35, 24],
    accent: "amber",
    lastUpdated: "5 min ago",
  },
  {
    id: "railway-counter-4",
    name: "Railway Counter 4",
    neighborhood: "North Terminal · Railway",
    category: "Railway",
    crowd: "heavy",
    wait: 39,
    people: 54,
    bestTime: "After 6:10 PM",
    position: { left: 76, top: 50 },
    note: "Peak hour. You will want a podcast.",
    confidence: "live",
    trend: [52, 48, 43, 50, 62, 76, 84, 86, 81, 74, 61, 50],
    accent: "coral",
    lastUpdated: "1 min ago",
  },
  {
    id: "shanti-temple",
    name: "Shanti Temple",
    neighborhood: "Gandhi Road · Temple",
    category: "Temples",
    crowd: "low",
    wait: 8,
    people: 11,
    bestTime: "Now",
    position: { left: 62, top: 69 },
    note: "A short queue and a cooler evening ahead.",
    confidence: "estimated",
    trend: [28, 26, 24, 19, 16, 20, 33, 42, 48, 32, 23, 18],
    accent: "teal",
    lastUpdated: "8 min ago",
  },
  {
    id: "civic-seva",
    name: "Civic Seva Kendra",
    neighborhood: "Market Ward · Government",
    category: "Government",
    crowd: "moderate",
    wait: 28,
    people: 39,
    bestTime: "Before 10:30 AM",
    position: { left: 25, top: 66 },
    note: "Steady today. Earlier is kinder.",
    confidence: "live",
    trend: [20, 26, 39, 52, 56, 51, 47, 43, 36, 34, 28, 20],
    accent: "amber",
    lastUpdated: "3 min ago",
  },
  {
    id: "noon-box",
    name: "Noon Box Canteen",
    neighborhood: "Tech Park · Canteen",
    category: "Canteens",
    crowd: "low",
    wait: 6,
    people: 9,
    bestTime: "Now",
    position: { left: 43, top: 75 },
    note: "Quick enough to keep your lunch break intact.",
    confidence: "live",
    trend: [10, 12, 18, 26, 38, 66, 82, 76, 42, 25, 14, 8],
    accent: "teal",
    lastUpdated: "2 min ago",
  },
  {
    id: "the-green-spoon",
    name: "The Green Spoon",
    neighborhood: "Riverfront · Restaurant",
    category: "Restaurants",
    crowd: "moderate",
    wait: 22,
    people: 26,
    bestTime: "After 2:00 PM",
    position: { left: 83, top: 76 },
    note: "Lunch rush is draining. Give it 18 minutes.",
    confidence: "estimated",
    trend: [18, 22, 29, 31, 46, 68, 75, 71, 57, 38, 27, 18],
    accent: "amber",
    lastUpdated: "11 min ago",
  },
];

export const userLocation = { left: 48, top: 47 };

export function getCrowdFromWait(wait: number): CrowdLevel {
  if (wait <= 15) return "low";
  if (wait <= 30) return "moderate";
  return "heavy";
}
