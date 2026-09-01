import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { rushendApi, type Business, type Token } from "@/lib/rushendApi";
import { subscribeToQueue } from "@/lib/rushendRealtime";
import { getCrowdFromWait, type QueueLocation } from "@/lib/queueData";

type QueueContextValue = {
  locations: QueueLocation[];
  selectedLocation: QueueLocation | null;
  selectLocation: (id: string | null) => void;
  checkIn: (id: string) => Promise<string>;
  checkOut: (id: string) => Promise<void>;
  checkedIn: Set<string>;
  activeTokens: Record<string, Token>;
  lastPulse: string | null;
  loading: boolean;
  error: string | null;
  refresh: (area?: string) => Promise<void>;
};

const QueueContext = createContext<QueueContextValue | null>(null);

function categoryLabel(category: string): QueueLocation["category"] {
  const labels: Record<string, QueueLocation["category"]> = { hospital: "Hospitals", bank: "Banks", government: "Government", restaurant: "Restaurants", other: "Canteens" };
  return labels[category.toLowerCase()] ?? "Government";
}

async function toLiveLocation(business: Business, index: number): Promise<QueueLocation | null> {
  const queue = business.queues?.find((item) => item.is_active !== false) ?? business.queues?.[0];
  if (!queue) return null;
  const live = await rushendApi.liveQueue(queue.id);
  const wait = Math.max(0, live.avg_wait_mins ?? queue.avg_service_time_mins);
  const people = Math.max(0, live.waiting_count ?? 0);
  return {
    id: business.id,
    queueId: queue.id,
    name: business.name,
    neighborhood: `${business.area || business.address} · ${categoryLabel(business.category)}`,
    category: categoryLabel(business.category),
    crowd: getCrowdFromWait(wait),
    wait,
    people,
    bestTime: "Now",
    position: { left: 18 + ((index * 29) % 70), top: 22 + ((index * 37) % 60) },
    note: people === 0 ? "No one is waiting right now." : `${people} people currently waiting. Join remotely and watch your position live.`,
    confidence: "live",
    trend: [wait, wait],
    accent: getCrowdFromWait(wait) === "low" ? "teal" : getCrowdFromWait(wait) === "moderate" ? "amber" : "coral",
    lastUpdated: "just now",
  };
}

export function QueueProvider({ children }: { children: ReactNode }) {
  const [locations, setLocations] = useState<QueueLocation[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [checkedIn, setCheckedIn] = useState<Set<string>>(new Set());
  const [activeTokens, setActiveTokens] = useState<Record<string, Token>>({});
  const [lastPulse, setLastPulse] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = async (area?: string) => {
    setLoading(true); setError(null);
    try {
      const result = await rushendApi.businesses({ area, limit: 50 });
      const liveLocations = (await Promise.all(result.businesses.map(toLiveLocation))).filter(Boolean) as QueueLocation[];
      setLocations(liveLocations);
      setSelectedId((current) => current && liveLocations.some((item) => item.id === current) ? current : liveLocations[0]?.id ?? null);
      setLastPulse(new Date().toISOString());
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Unable to load live businesses"); setLocations([]); }
    finally { setLoading(false); }
  };

  useEffect(() => { void refresh(); }, []);
  useEffect(() => {
    const cleanups = locations.map((location) => location.queueId ? subscribeToQueue(location.queueId, () => { void refresh(); }) : () => undefined);
    return () => cleanups.forEach((cleanup) => cleanup());
  }, [locations.length]);

  const selectedLocation = useMemo(() => locations.find((location) => location.id === selectedId) ?? null, [locations, selectedId]);
  const value = useMemo<QueueContextValue>(() => ({
    locations, selectedLocation, selectLocation: setSelectedId, checkedIn, activeTokens, lastPulse, loading, error, refresh,
    checkIn: async (id) => {
      const location = locations.find((item) => item.id === id);
      if (!location?.queueId) throw new Error("This business has no active queue");
      const result = await rushendApi.joinQueue(location.queueId);
      setCheckedIn((current) => new Set(current).add(id));
      setActiveTokens((current) => ({ ...current, [id]: result.token }));
      setLastPulse(new Date().toISOString());
      return result.token.id;
    },
    checkOut: async (id) => {
      const token = activeTokens[id];
      if (token) await rushendApi.leaveToken(token.id);
      setCheckedIn((current) => { const next = new Set(current); next.delete(id); return next; });
      setActiveTokens((current) => { const next = { ...current }; delete next[id]; return next; });
      setLastPulse(new Date().toISOString());
    },
  }), [locations, selectedLocation, checkedIn, activeTokens, lastPulse, loading, error]);
  return <QueueContext.Provider value={value}>{children}</QueueContext.Provider>;
}

export function useQueue() {
  const value = useContext(QueueContext);
  if (!value) throw new Error("useQueue must be used inside QueueProvider");
  return value;
}
