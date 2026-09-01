/* RushEnd / Signal Cartography: live counts are the interface's only source of motion. */
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { getCrowdFromWait, initialLocations, type QueueLocation } from "@/lib/queueData";

type QueueContextValue = {
  locations: QueueLocation[];
  selectedLocation: QueueLocation | null;
  selectLocation: (id: string | null) => void;
  checkIn: (id: string) => void;
  checkOut: (id: string) => void;
  checkedIn: Set<string>;
  lastPulse: string | null;
};

const QueueContext = createContext<QueueContextValue | null>(null);

export function QueueProvider({ children }: { children: ReactNode }) {
  const [locations, setLocations] = useState(initialLocations);
  const [selectedId, setSelectedId] = useState<string | null>("citycare-opd");
  const [checkedIn, setCheckedIn] = useState<Set<string>>(new Set());
  const [lastPulse, setLastPulse] = useState<string | null>(null);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setLocations((current) => current.map((location, index) => {
        const drift = index % 3 === 0 ? -1 : index % 2 === 0 ? 1 : 0;
        const nextPeople = Math.max(4, location.people + drift + (Math.random() > 0.68 ? (Math.random() > 0.5 ? 1 : -1) : 0));
        const nextWait = Math.max(4, Math.round(location.wait + (nextPeople - location.people) * 0.7));
        return {
          ...location,
          people: nextPeople,
          wait: nextWait,
          crowd: getCrowdFromWait(nextWait),
          lastUpdated: "just now",
        };
      }));
      setLastPulse(new Date().toISOString());
    }, 4800);
    return () => window.clearInterval(timer);
  }, []);

  const selectedLocation = useMemo(() => locations.find((location) => location.id === selectedId) ?? null, [locations, selectedId]);

  const value = useMemo<QueueContextValue>(() => ({
    locations,
    selectedLocation,
    selectLocation: setSelectedId,
    checkedIn,
    lastPulse,
    checkIn: (id) => {
      setCheckedIn((current) => new Set(current).add(id));
      setLocations((current) => current.map((location) => location.id === id ? { ...location, people: location.people + 1, wait: location.wait + 1, lastUpdated: "just now" } : location));
    },
    checkOut: (id) => {
      setCheckedIn((current) => {
        const next = new Set(current);
        next.delete(id);
        return next;
      });
      setLocations((current) => current.map((location) => location.id === id ? { ...location, people: Math.max(0, location.people - 1), wait: Math.max(3, location.wait - 1), lastUpdated: "just now" } : location));
    },
  }), [checkedIn, lastPulse, locations, selectedLocation]);

  return <QueueContext.Provider value={value}>{children}</QueueContext.Provider>;
}

export function useQueue() {
  const value = useContext(QueueContext);
  if (!value) throw new Error("useQueue must be used inside QueueProvider");
  return value;
}
