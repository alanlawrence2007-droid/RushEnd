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


export type IndiaDistrict = { id: string; name: string };
export type IndiaState = { id: string; name: string; kind: "State" | "Union Territory"; districts: IndiaDistrict[] };

const districts = (names: string[]): IndiaDistrict[] => names.map((name) => ({ id: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"), name }));

export const indiaStates: IndiaState[] = [
  { id: "andhra-pradesh", name: "Andhra Pradesh", kind: "State", districts: districts(["Visakhapatnam", "Vijayawada", "Tirupati"]) },
  { id: "arunachal-pradesh", name: "Arunachal Pradesh", kind: "State", districts: districts(["Itanagar", "Tawang", "Pasighat"]) },
  { id: "assam", name: "Assam", kind: "State", districts: districts(["Guwahati", "Dibrugarh", "Jorhat"]) },
  { id: "bihar", name: "Bihar", kind: "State", districts: districts(["Patna", "Gaya", "Muzaffarpur"]) },
  { id: "chhattisgarh", name: "Chhattisgarh", kind: "State", districts: districts(["Raipur", "Bilaspur", "Durg"]) },
  { id: "goa", name: "Goa", kind: "State", districts: districts(["North Goa", "South Goa"]) },
  { id: "gujarat", name: "Gujarat", kind: "State", districts: districts(["Ahmedabad", "Surat", "Vadodara"]) },
  { id: "haryana", name: "Haryana", kind: "State", districts: districts(["Gurugram", "Faridabad", "Panipat"]) },
  { id: "himachal-pradesh", name: "Himachal Pradesh", kind: "State", districts: districts(["Shimla", "Kangra", "Kullu"]) },
  { id: "jharkhand", name: "Jharkhand", kind: "State", districts: districts(["Ranchi", "East Singhbhum", "Dhanbad"]) },
  { id: "karnataka", name: "Karnataka", kind: "State", districts: districts(["Bengaluru Urban", "Mysuru", "Dakshina Kannada"]) },
  { id: "kerala", name: "Kerala", kind: "State", districts: districts(["Ernakulam", "Thiruvananthapuram", "Kozhikode"]) },
  { id: "madhya-pradesh", name: "Madhya Pradesh", kind: "State", districts: districts(["Bhopal", "Indore", "Gwalior"]) },
  { id: "maharashtra", name: "Maharashtra", kind: "State", districts: districts(["Mumbai Suburban", "Pune", "Nagpur"]) },
  { id: "manipur", name: "Manipur", kind: "State", districts: districts(["Imphal East", "Imphal West", "Churachandpur"]) },
  { id: "meghalaya", name: "Meghalaya", kind: "State", districts: districts(["East Khasi Hills", "Ri Bhoi", "West Garo Hills"]) },
  { id: "mizoram", name: "Mizoram", kind: "State", districts: districts(["Aizawl", "Lunglei", "Champhai"]) },
  { id: "nagaland", name: "Nagaland", kind: "State", districts: districts(["Kohima", "Dimapur", "Mokokchung"]) },
  { id: "odisha", name: "Odisha", kind: "State", districts: districts(["Khordha", "Cuttack", "Ganjam"]) },
  { id: "punjab", name: "Punjab", kind: "State", districts: districts(["Ludhiana", "Amritsar", "Jalandhar"]) },
  { id: "rajasthan", name: "Rajasthan", kind: "State", districts: districts(["Jaipur", "Jodhpur", "Udaipur"]) },
  { id: "sikkim", name: "Sikkim", kind: "State", districts: districts(["Gangtok", "Namchi", "Mangan"]) },
  { id: "tamil-nadu", name: "Tamil Nadu", kind: "State", districts: districts(["Chennai", "Coimbatore", "Madurai"]) },
  { id: "telangana", name: "Telangana", kind: "State", districts: districts(["Hyderabad", "Rangareddy", "Warangal"]) },
  { id: "tripura", name: "Tripura", kind: "State", districts: districts(["West Tripura", "Gomati", "North Tripura"]) },
  { id: "uttar-pradesh", name: "Uttar Pradesh", kind: "State", districts: districts(["Lucknow", "Kanpur Nagar", "Varanasi"]) },
  { id: "uttarakhand", name: "Uttarakhand", kind: "State", districts: districts(["Dehradun", "Haridwar", "Nainital"]) },
  { id: "west-bengal", name: "West Bengal", kind: "State", districts: districts(["Kolkata", "North 24 Parganas", "Darjeeling"]) },
  { id: "andaman-and-nicobar-islands", name: "Andaman and Nicobar Islands", kind: "Union Territory", districts: districts(["South Andaman", "North and Middle Andaman", "Nicobar"]) },
  { id: "chandigarh", name: "Chandigarh", kind: "Union Territory", districts: districts(["Chandigarh"]) },
  { id: "dadra-and-nagar-haveli-and-daman-and-diu", name: "Dadra and Nagar Haveli and Daman and Diu", kind: "Union Territory", districts: districts(["Dadra and Nagar Haveli", "Daman", "Diu"]) },
  { id: "delhi", name: "Delhi", kind: "Union Territory", districts: districts(["Central Delhi", "South Delhi", "New Delhi"]) },
  { id: "jammu-and-kashmir", name: "Jammu and Kashmir", kind: "Union Territory", districts: districts(["Jammu", "Srinagar", "Anantnag"]) },
  { id: "ladakh", name: "Ladakh", kind: "Union Territory", districts: districts(["Leh", "Kargil"]) },
  { id: "lakshadweep", name: "Lakshadweep", kind: "Union Territory", districts: districts(["Kavaratti", "Agatti", "Andrott"]) },
  { id: "puducherry", name: "Puducherry", kind: "Union Territory", districts: districts(["Puducherry", "Karaikal", "Mahe"]) },
];

export function getIndiaState(stateId: string) {
  return indiaStates.find((state) => state.id === stateId);
}

export function getAreaLabel(stateId: string, districtId: string) {
  if (stateId === "india") return "India";
  const state = getIndiaState(stateId);
  const district = state?.districts.find((item) => item.id === districtId);
  return district && state ? `${district.name}, ${state.name}` : state?.name ?? "India";
}

function scopeSeed(stateId: string, districtId: string) {
  return `${stateId}:${districtId}`.split("").reduce((total, character) => total + character.charCodeAt(0), 0);
}

export function getLocationsForArea(locations: QueueLocation[], stateId: string, districtId: string) {
  const state = getIndiaState(stateId);
  const district = state?.districts.find((item) => item.id === districtId);
  const areaName = district?.name ?? state?.name ?? "India";
  const seed = scopeSeed(stateId, districtId);
  return locations.map((location, index) => {
    const leftOffset = ((seed + index * 17) % 15) - 7;
    const topOffset = ((seed + index * 11) % 13) - 6;
    const areaNeighborhood = stateId === "india" ? `National signal · ${location.category}` : `${areaName} · ${location.category}`;
    const areaNamePrefix = stateId === "india" ? "" : `${areaName} `;
    return {
      ...location,
      name: stateId === "india" ? location.name : `${areaNamePrefix}${location.name}`,
      neighborhood: areaNeighborhood,
      position: {
        left: Math.max(10, Math.min(90, location.position.left + leftOffset)),
        top: Math.max(13, Math.min(84, location.position.top + topOffset)),
      },
    };
  });
}
