/* RushEnd / Signal Cartography: the map surface is a living civic canvas, not a dashboard background. */
import { LocateFixed, Minus, Plus, RotateCcw } from "lucide-react";
import { crowdMeta, userLocation, type QueueLocation } from "@/lib/queueData";
import { cn } from "@/lib/utils";

export default function MapSurface({ locations, selectedId, areaLabel = "India", onSelect }: { locations: QueueLocation[]; selectedId?: string | null; areaLabel?: string; onSelect: (location: QueueLocation) => void }) {
  return <div className="map-texture relative min-h-[520px] flex-1 overflow-hidden border-y border-white/[.08] lg:min-h-[calc(100vh-70px)] lg:border-l">
    <div className="pointer-events-none absolute inset-0 opacity-70">
      <svg viewBox="0 0 1000 680" preserveAspectRatio="none" className="h-full w-full">
        <path d="M-30 550 C180 480 265 555 360 430 S520 210 710 290 S825 390 1030 120" className="map-road major" />
        <path d="M-10 160 C155 190 210 130 322 180 S470 330 580 335 S792 252 1012 360" className="map-road major" />
        <path d="M100 710 C160 562 210 540 312 470 S430 345 420 -20" className="map-road major" />
        <path d="M630 690 C624 560 570 510 622 420 S800 320 792 -20" className="map-road major" />
        <path d="M14 360 C190 325 310 360 482 405 S705 552 1000 505" className="map-road minor" />
        <path d="M180 20 C238 140 254 230 222 330 S312 486 512 514 S785 554 934 664" className="map-road minor" />
        <path d="M460 5 C470 130 540 220 538 318 S470 445 478 700" className="map-road minor" />
        <path d="M710 35 C684 152 720 224 828 288 S896 460 840 685" className="map-road minor" />
        <path d="M-10 270 C130 280 230 258 354 276 S536 230 660 140 S838 110 1010 170" className="map-road minor" />
        <path d="M-20 615 C112 594 164 620 270 596 S454 550 580 588 S818 650 1010 610" className="map-road minor" />
        <path d="M84 78 L330 64 L374 170 L265 238 L105 215 Z" className="map-water" />
        <path d="M734 438 C792 400 882 414 933 468 S930 598 856 616 L755 573 Z" className="map-water" />
        <g opacity=".55">
          {Array.from({ length: 20 }).map((_, index) => <path key={index} d={`M${index * 55 - 20} 0 V680`} className="map-grid-line" opacity={index % 2 ? .35 : .2} />)}
          {Array.from({ length: 13 }).map((_, index) => <path key={index} d={`M0 ${index * 58} H1000`} className="map-grid-line" opacity={index % 2 ? .35 : .2} />)}
        </g>
        <path d="M325 362 C380 295 446 300 518 355 S650 430 755 374" fill="none" stroke="#a43dff" strokeWidth="3" strokeLinecap="round" strokeDasharray="3 11" className="route-line" opacity=".7" />
        <path d="M155 510 C270 425 380 480 462 430 S680 280 878 402" fill="none" stroke="#ff5cc8" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 14" opacity=".45" />
      </svg>
    </div>
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_45%_44%,transparent_0%,rgba(14,18,16,.05)_48%,rgba(14,18,16,.68)_100%)]" />

    <div className="pointer-events-none absolute left-5 top-5 z-10 flex items-center gap-2 rounded-full border border-white/[.12] bg-[#0d090f]/80 px-3 py-2 text-[11px] text-[#a8b5aa] backdrop-blur"><span className="h-1.5 w-1.5 rounded-full bg-[#ff8a2b] shadow-[0_0_8px_rgba(255,138,43,.8)]" /> {locations.length} places reporting in {areaLabel} <span className="text-[#56635a]">·</span> <span className="metric">{Math.round(locations.reduce((total, location) => total + location.wait, 0) / Math.max(locations.length, 1))}</span> min avg wait</div>
    <div className="absolute right-5 top-5 z-10 flex flex-col overflow-hidden rounded-xl border border-white/[.12] bg-[#0d090f]/80 backdrop-blur">
      {[Plus, Minus, RotateCcw].map((Icon, index) => <button key={index} aria-label={index === 0 ? "Zoom in" : index === 1 ? "Zoom out" : "Reset map"} className="flex h-9 w-9 items-center justify-center border-b border-white/[.08] text-[#8d9c91] last:border-b-0 hover:bg-white/[.06] hover:text-[#f3f3e8]"><Icon size={15} /></button>)}
    </div>

    {locations.map((location, index) => {
      const meta = crowdMeta[location.crowd];
      const isSelected = location.id === selectedId;
      return <button key={location.id} onClick={() => onSelect(location)} className="group absolute z-10 -translate-x-1/2 -translate-y-1/2 text-left" style={{ left: `${location.position.left}%`, top: `${location.position.top}%` }} aria-label={`${location.name}, ${meta.label}, ${location.wait} minute wait`}>
        <span className={cn("signal-halo absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border", location.crowd === "low" ? "border-[#ff8a2b]/50" : location.crowd === "moderate" ? "border-[#ff9b18]/50" : "border-[#ff5d73]/50", index % 3 === 1 ? "slow" : index % 3 === 2 ? "fast" : "")} />
        <span className={cn("relative block h-3.5 w-3.5 rounded-full transition duration-200 group-hover:scale-125", isSelected && "ring-4 ring-white/20", location.crowd === "low" ? "dot-teal" : location.crowd === "moderate" ? "dot-amber" : "dot-coral")} />
        <span className={cn("pointer-events-none absolute left-5 top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-md border border-white/[.10] bg-[#0d090f]/90 px-2.5 py-1.5 text-[10px] text-[#d8e0d8] shadow-xl backdrop-blur transition group-hover:block sm:block", isSelected && "border-white/[.25] bg-[#20121d]")}>{location.name} <span style={{ color: meta.color }}>· {location.wait}m</span></span>
      </button>;
    })}

    <div className="absolute z-20 -translate-x-1/2 -translate-y-1/2" style={{ left: `${userLocation.left}%`, top: `${userLocation.top}%` }}>
      <span className="absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#a43dff]/50 bg-[#a43dff]/10" />
      <span className="relative flex h-4 w-4 items-center justify-center rounded-full border-2 border-[#d8ecff] bg-[#a43dff] shadow-[0_0_20px_rgba(164,61,255,.7)]"><span className="h-1 w-1 rounded-full bg-white" /></span>
      <span className="absolute left-6 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md bg-[#a43dff]/15 px-2 py-1 text-[10px] font-medium text-[#9cc6f5]">You are here</span>
    </div>

    <div className="pointer-events-none absolute bottom-5 left-5 right-5 z-10 flex items-end justify-between gap-4">
      <div className="hidden items-center gap-3 rounded-lg border border-white/[.09] bg-[#0d090f]/75 px-3 py-2 text-[10px] text-[#849187] backdrop-blur sm:flex"><span className="font-semibold uppercase tracking-[.14em] text-[#67766b]">Crowd</span><span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-[#ff8a2b]" /> Quiet</span><span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-[#ff9b18]" /> Moderate</span><span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-[#ff5d73]" /> Heavy</span></div>
      <div className="ml-auto flex items-center gap-2 rounded-lg border border-[#a43dff]/20 bg-[#0d090f]/80 px-3 py-2 text-[10px] text-[#ff5cc8] backdrop-blur"><LocateFixed size={12} /> Approx. location</div>
    </div>
  </div>;
}
