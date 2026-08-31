/* Vaqo / Signal Cartography: hero gives the verdict, then the city map takes over. */
import { useMemo, useRef, useState } from "react";
import { ArrowDownRight, ArrowRight, Search, Sparkles } from "lucide-react";
import { Link } from "wouter";
import MapSurface from "@/components/MapSurface";
import LocationDetail from "@/components/LocationDetail";
import { categories, crowdMeta, type QueueLocation } from "@/lib/queueData";
import { useQueue } from "@/contexts/QueueContext";
import { cn } from "@/lib/utils";

const HERO_FALLBACK = "/manus-storage/queueless-hero-queue_cf75bcde.jpg";
const HERO_VIDEO_URL = ""; // Drop the supplied queue clip here later; the generated still remains the graceful fallback.

export default function Home() {
  const { locations, selectedLocation, selectLocation } = useQueue();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const mapRef = useRef<HTMLDivElement>(null);
  const visibleLocations = useMemo(() => locations.filter((location) => {
    const matchesCategory = category === "All" || location.category === category;
    const matchesQuery = !query || `${location.name} ${location.category} ${location.neighborhood}`.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  }), [category, locations, query]);

  const scrollToMap = () => mapRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  return <div className="page-in">
    <section className="relative isolate min-h-[520px] overflow-hidden border-b border-white/[.08] lg:min-h-[560px]">
      <img src={HERO_FALLBACK} alt="People waiting in an outpatient hospital queue" className="absolute inset-0 -z-20 h-full w-full object-cover object-center opacity-85" />
      {HERO_VIDEO_URL && <video autoPlay muted loop playsInline poster={HERO_FALLBACK} className="absolute inset-0 -z-10 h-full w-full object-cover" aria-label="People waiting in a hospital queue"><source src={HERO_VIDEO_URL} type="video/mp4" /></video>}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(8,12,10,.94)_0%,rgba(8,12,10,.72)_40%,rgba(8,12,10,.4)_72%,rgba(8,12,10,.75)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,#0e1210_0%,transparent_35%,rgba(14,18,16,.28)_100%)]" />
      <div className="absolute right-[14%] top-[24%] -z-10 h-40 w-40 rounded-full bg-[#ff8a2b]/10 blur-3xl" />
      <div className="mx-auto flex min-h-[520px] max-w-[1280px] flex-col justify-end px-5 pb-14 pt-16 sm:px-10 lg:min-h-[560px] lg:flex-row lg:items-end lg:justify-between lg:gap-10 lg:px-12 lg:pb-16">
        <div className="max-w-[670px]">
          <div className="hero-reveal inline-flex items-center gap-2 rounded-full border border-[#ff8a2b]/25 bg-[#0e1210]/45 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[.16em] text-[#8bd5b5] backdrop-blur"><Sparkles size={12} /> A living city map · Bengaluru</div>
          <h1 className="hero-reveal hero-reveal-delay-1 mt-5 max-w-[660px] font-display text-[45px] font-semibold leading-[.98] tracking-[-.065em] text-[#f3f3e8] sm:text-[62px] lg:text-[72px]">Every queue in your city, <span className="text-[#6ccca7]">right now.</span></h1>
          <p className="hero-reveal hero-reveal-delay-2 mt-5 max-w-[430px] text-[16px] leading-6 text-[#c0cbc1]">Stop guessing. Know exactly when to leave.</p>
          <div className="hero-reveal hero-reveal-delay-3 mt-8 flex flex-wrap items-center gap-3"><button onClick={scrollToMap} className="group flex items-center gap-3 rounded-xl bg-[#f3f3e8] px-4 py-3 text-[13px] font-semibold text-[#0e1210] transition hover:bg-[#dbe8de] active:scale-[.97]">Explore the map <ArrowDownRight size={16} className="transition group-hover:translate-y-0.5 group-hover:translate-x-0.5" /></button><Link href="/plan" className="flex items-center gap-2 rounded-xl border border-white/[.18] bg-[#0e1210]/40 px-4 py-3 text-[13px] font-semibold text-[#e7eee7] backdrop-blur transition hover:border-white/[.35] hover:bg-white/[.08]">Plan my day <ArrowRight size={15} /></Link></div>
        </div>
        <div className="mt-10 grid max-w-[350px] grid-cols-2 gap-2 lg:mb-1 lg:mt-0 lg:min-w-[330px]">
          <div className="rounded-2xl border border-white/[.13] bg-[#0e1210]/55 p-4 backdrop-blur-xl"><p className="eyebrow">Reporting now</p><p className="metric mt-3 text-[32px] font-semibold text-[#f3f3e8]">7</p><p className="mt-1 text-[11px] text-[#9ba89d]">places across the city</p></div>
          <div className="rounded-2xl border border-white/[.13] bg-[#0e1210]/55 p-4 backdrop-blur-xl"><p className="eyebrow">Your call</p><p className="mt-3 text-[25px] font-semibold leading-7 text-[#6ccca7]">Go now<span className="text-[#dfe9df]">.</span></p><p className="mt-1 text-[11px] text-[#9ba89d]">CityCare OPD is quiet</p></div>
        </div>
      </div>
    </section>

    <section ref={mapRef} className="relative scroll-mt-[70px]">
      <div className="pointer-events-none absolute left-0 right-0 top-0 z-20 flex -translate-y-1/2 justify-center px-5"><div className="pointer-events-auto flex w-full max-w-[760px] flex-col gap-2 rounded-2xl border border-white/[.14] bg-[#111813]/95 p-2 shadow-2xl backdrop-blur-xl sm:flex-row sm:items-center"><div className="flex min-w-0 flex-1 items-center gap-3 rounded-xl bg-white/[.055] px-3.5 py-2.5"><Search size={17} className="shrink-0 text-[#74847a]" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search a hospital, bank, temple, or counter" aria-label="Search locations" className="min-w-0 flex-1 bg-transparent text-[13px] text-[#f3f3e8] outline-none placeholder:text-[#74847a]" /></div><div className="flex items-center gap-1 overflow-x-auto px-1 pb-0.5 sm:max-w-[400px]">{categories.slice(0, 5).map((item) => <button key={item} onClick={() => setCategory(item)} className={cn("whitespace-nowrap rounded-lg px-2.5 py-2 text-[11px] font-medium transition", item === category ? "bg-[#ff8a2b] text-[#07120e]" : "text-[#829187] hover:bg-white/[.06] hover:text-[#e8f0e8]")}>{item === "Government" ? "Govt" : item}</button>)}</div></div></div>
      <div className="relative flex min-h-[560px] flex-col lg:min-h-[calc(100vh-70px)]"><MapSurface locations={visibleLocations} selectedId={selectedLocation?.id} onSelect={(location) => selectLocation(location.id)} /><div className="pointer-events-none absolute bottom-5 left-5 z-20 max-w-[300px] rounded-xl border border-white/[.12] bg-[#0e1210]/85 px-4 py-3 backdrop-blur-xl"><p className="text-[12px] font-medium text-[#dbe6dc]">{selectedLocation ? "Tap another dot to compare." : "Tap a dot. We'll tell you if it's worth the trip."}</p><p className="mt-1 text-[10px] leading-4 text-[#7e8d82]">The map updates as people check in and check out.</p></div></div>
    </section>
    <section className="border-t border-white/[.08] bg-[#101611] px-5 py-14 sm:px-10 lg:px-12 lg:py-20"><div className="mx-auto max-w-[1280px]"><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="eyebrow">Read the signal</p><h2 className="mt-3 max-w-[550px] font-display text-[31px] font-semibold leading-[1.05] tracking-[-.055em]">Places no app tracks yet.</h2><p className="mt-3 max-w-[520px] text-[14px] leading-6 text-[#929f94]">Temples, stalls, small clinics — added by people who were just there.</p></div><Link href="/community" className="flex w-fit items-center gap-2 text-[12px] font-semibold text-[#65cba3] hover:text-[#9be3c4]">Add a place <ArrowRight size={15} /></Link></div><div className="mt-8 grid gap-3 md:grid-cols-3">{locations.slice(0, 3).map((location) => <div key={location.id} className="flex items-center justify-between rounded-2xl border border-white/[.08] bg-[#151d18] p-4 transition hover:border-white/[.18]"><div className="flex items-center gap-3"><span className="h-2.5 w-2.5 rounded-full" style={{ background: crowdMeta[location.crowd].color, boxShadow: `0 0 16px ${crowdMeta[location.crowd].color}99` }} /><div><p className="text-[13px] font-semibold text-[#dfe8df]">{location.name}</p><p className="mt-1 text-[11px] text-[#78877c]">{location.category} · {location.neighborhood.split(" · ")[0]}</p></div></div><div className="text-right"><p className="metric text-[17px] font-semibold" style={{ color: crowdMeta[location.crowd].color }}>{location.wait}m</p><p className="text-[10px] text-[#758379]">{crowdMeta[location.crowd].label}</p></div></div>)}</div></div></section>
    {selectedLocation && <LocationDetail location={selectedLocation} onClose={() => selectLocation(null)} />}
  </div>;
}
