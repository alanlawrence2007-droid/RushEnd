/* RushEnd / Signal Cartography: a location opens as a verdict-led drawer, not a passive data card. */
import { ArrowUpRight, Check, Clock3, LogIn, LogOut, MessageSquareWarning, Radio, Users } from "lucide-react";
import { Link } from "wouter";
import { crowdMeta, type QueueLocation } from "@/lib/queueData";
import { useQueue } from "@/contexts/QueueContext";
import { Button } from "@/components/ui/button";

function MiniChart({ points, color }: { points: number[]; color: string }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = Math.max(1, max - min);
  const coords = points.map((point, index) => `${(index / (points.length - 1)) * 100},${100 - ((point - min) / range) * 72 - 14}`).join(" ");
  return <div className="relative h-[132px] overflow-hidden rounded-xl border border-white/[.08] bg-[#120c12] px-2 pb-5 pt-2">
    <div className="absolute inset-x-2 top-1/2 border-t border-dashed border-white/[.07]" />
    <div className="absolute inset-x-2 bottom-[27px] border-t border-dashed border-white/[.07]" />
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full"><defs><linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor={color} stopOpacity=".34" /><stop offset="1" stopColor={color} stopOpacity="0" /></linearGradient></defs><polygon points={`0,100 ${coords} 100,100`} fill="url(#chartFill)" /><polyline points={coords} fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
    <div className="absolute bottom-1 left-2 right-2 flex justify-between text-[9px] text-[#657268]"><span>6 AM</span><span>10 AM</span><span>2 PM</span><span>6 PM</span><span>10 PM</span></div>
  </div>;
}

function QueuePeople({ count, level }: { count: number; level: QueueLocation["crowd"] }) {
  const visible = Math.min(count, 18);
  return <div className="flex min-h-[48px] flex-wrap items-center gap-2 rounded-xl border border-white/[.08] bg-[#120c12] px-3 py-3">
    {Array.from({ length: visible }).map((_, index) => <span key={index} className={`queue-dot ${index % 4 === 1 ? "delay-1" : index % 4 === 2 ? "delay-2" : index % 4 === 3 ? "delay-3" : ""} flex h-5 w-5 items-center justify-center rounded-full border border-[#0d090f] text-[8px] font-bold ${level === "low" ? "bg-[#ff8a2b] text-[#160b05]" : level === "moderate" ? "bg-[#ff9b18] text-[#180e04]" : "bg-[#ff5d73] text-[#180b07]"}`}><Users size={10} strokeWidth={2.4} /></span>)}
    {count > visible && <span className="text-[11px] text-[#89978d]">+{count - visible} more</span>}
  </div>;
}

export default function LocationDetail({ location, onClose }: { location: QueueLocation; onClose: () => void }) {
  const { checkIn, checkOut, checkedIn } = useQueue();
  const meta = crowdMeta[location.crowd];
  const isCheckedIn = checkedIn.has(location.id);
  const isGoNow = location.crowd === "low";
  return <>
    <div className="scrim-in fixed inset-0 z-40 bg-black/55 lg:hidden" onClick={onClose} aria-hidden="true" />
    <aside className="panel-in fixed bottom-0 right-0 z-50 flex max-h-[88vh] w-full flex-col overflow-y-auto border-t border-white/[.12] bg-[#121914] shadow-[-24px_0_80px_rgba(0,0,0,.36)] sm:max-w-[480px] lg:bottom-0 lg:top-[70px] lg:max-h-none lg:w-[430px] lg:border-l lg:border-t-0" aria-label={`${location.name} details`}>
      <div className="sticky top-0 z-10 flex items-start justify-between border-b border-white/[.08] bg-[#121914]/95 px-6 pb-4 pt-5 backdrop-blur-xl">
        <div><div className="flex items-center gap-2"><span className="eyebrow">{location.category}</span><span className="h-1 w-1 rounded-full bg-[#536158]" /><span className="text-[10px] text-[#7b897f]">{location.neighborhood}</span></div><h2 className="mt-2 font-display text-[20px] font-semibold tracking-[-.04em] text-[#f3f3e8]">{location.name}</h2></div>
        <button onClick={onClose} aria-label="Close location details" className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[.10] text-[#8f9d92] hover:bg-white/[.06] hover:text-[#f3f3e8]">×</button>
      </div>
      <div className="space-y-6 px-6 py-6">
        <div className="rounded-2xl border border-white/[.09] bg-[#18211b] p-5">
          <div className="flex items-center gap-2"><span className={`h-2 w-2 rounded-full ${location.crowd === "low" ? "bg-[#ff8a2b] shadow-[0_0_9px_rgba(255,138,43,.9)]" : location.crowd === "moderate" ? "bg-[#ff9b18] shadow-[0_0_9px_rgba(255,155,24,.7)]" : "bg-[#ff5d73] shadow-[0_0_9px_rgba(255,93,115,.7)]"}`} /><span className={`text-[11px] font-semibold uppercase tracking-[.13em] ${meta.className}`}>{meta.label} crowd</span></div>
          <h3 className="mt-4 font-display text-[33px] font-semibold leading-[1.02] tracking-[-.055em] text-[#f3f3e8]">{isGoNow ? "Go now" : "Wait — here's why"}</h3>
          <p className="mt-3 max-w-[290px] text-[13px] leading-5 text-[#a7b3a8]">{location.note}</p>
          <div className="mt-5 flex items-center gap-2 text-[10px] text-[#8d9b90]"><Radio size={13} className={location.confidence === "live" ? "text-[#ff8a2b]" : "text-[#ff9b18]"} /> {location.confidence === "live" ? `Live — updated ${location.lastUpdated}` : "Estimated from past patterns"}</div>
        </div>

        <div className="grid grid-cols-3 divide-x divide-white/[.09] rounded-xl border border-white/[.08] bg-[#120c12] py-4">
          <div className="px-3"><p className="eyebrow">In line right now</p><p className="metric mt-2 text-[24px] font-semibold text-[#f3f3e8]">{location.people}</p><p className="mt-0.5 text-[10px] text-[#77867b]">people</p></div>
          <div className="px-3"><p className="eyebrow">Estimated wait</p><p className="metric mt-2 text-[24px] font-semibold" style={{ color: meta.color }}>{location.wait}<span className="ml-0.5 text-[13px] font-medium">m</span></p><p className="mt-0.5 text-[10px] text-[#77867b]">from now</p></div>
          <div className="px-3"><p className="eyebrow">Best time today</p><p className="mt-2 text-[13px] font-semibold leading-4 text-[#dce5dd]">{location.bestTime}</p><p className="mt-1 flex items-center gap-1 text-[10px] text-[#77867b]"><Clock3 size={10} /> forecast</p></div>
        </div>

        <div><div className="mb-3 flex items-center justify-between"><div><p className="eyebrow">Live queue shape</p><p className="mt-1 text-[12px] text-[#89978d]">Each dot is someone in line.</p></div><span className="metric text-[12px] text-[#89978d]">{location.people} total</span></div><QueuePeople count={location.people} level={location.crowd} /></div>

        <div><div className="mb-3 flex items-center justify-between"><p className="eyebrow">Today's pattern</p><span className="flex items-center gap-1 text-[10px] text-[#7d8c81]"><ArrowUpRight size={12} /> typical Tuesday</span></div><MiniChart points={location.trend} color={meta.color} /><Link href={`/location/${location.id}`} className="mt-2 flex items-center justify-between rounded-lg px-1 py-2 text-[11px] font-semibold text-[#8dcfb0] hover:text-[#c0efd4]"><span>See how this place behaves over time</span><ArrowUpRight size={13} /></Link></div>

        <div className="space-y-2">
          {!isCheckedIn ? <Button onClick={() => checkIn(location.id)} className="h-11 w-full justify-center gap-2 rounded-xl bg-[#a43dff] text-[13px] font-semibold text-[#06101b] shadow-[0_8px_25px_rgba(164,61,255,.18)] hover:bg-[#65a6ee]"><LogIn size={16} /> I'm here — check in</Button> : <Button onClick={() => checkOut(location.id)} className="h-11 w-full justify-center gap-2 rounded-xl bg-[#ff8a2b] text-[13px] font-semibold text-[#160b05] shadow-[0_8px_25px_rgba(255,138,43,.18)] hover:bg-[#ffbd4a]"><Check size={16} /> Checked in · Just finished? Check out</Button>}
          <button className="flex w-full items-center justify-center gap-2 py-2 text-[11px] text-[#7d8b81] hover:text-[#d1ddd2]"><MessageSquareWarning size={13} /> This looks wrong</button>
        </div>
        <div className="flex items-center gap-2 border-t border-white/[.08] pt-4 text-[10px] leading-4 text-[#66756b]"><LogOut size={13} /> Checking in helps your city make a better call next time.</div>
      </div>
    </aside>
  </>;
}
