/* Vaqo / Signal Cartography: persistent rail/dock keeps the city map one tap away. */
import { Link, useLocation } from "wouter";
import { BarChart3, Compass, Home, MapPinned, Plus, Route, UsersRound, UserRound, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Map", icon: MapPinned },
  { href: "/plan", label: "Plan my day", icon: Route },
  { href: "/discover", label: "Discover", icon: Compass },
  { href: "/community", label: "Community", icon: UsersRound },
  { href: "/profile", label: "Profile", icon: UserRound },
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const isMap = location === "/";
  return (
    <div className="min-h-screen bg-[#0d090f] text-[#f3f3e8]">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[246px] flex-col border-r border-white/[.08] bg-[#120c12] lg:flex">
        <div className="flex items-center gap-3 px-7 py-7">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-[12px] bg-[#ff8a2b] p-1.5 shadow-[0_0_28px_rgba(255,138,43,.18)]">
            <img src="/manus-storage/vaqo-logo_1faf644c.png" alt="" className="h-full w-full object-contain" />
          </div>
          <div>
            <p className="font-display text-[17px] font-bold tracking-[-.04em]">Vaqo</p>
            <p className="mt-0.5 text-[10px] uppercase tracking-[.17em] text-[#7f9185]">Know before you go</p>
          </div>
        </div>
        <div className="mx-7 mb-7 h-px bg-white/[.08]" />
        <div className="px-4">
          <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[.18em] text-[#64746a]">Your city</p>
          <nav aria-label="Primary navigation" className="space-y-1">
            {navItems.map((item) => {
              const active = item.href === "/" ? isMap : location.startsWith(item.href);
              const Icon = item.icon;
              return <Link key={item.href} href={item.href} className={cn("nav-item group flex items-center gap-3 rounded-xl px-3 py-3 text-[13px] font-medium transition duration-200", active ? "bg-[#291329] text-[#f3f3e8]" : "text-[#89978d] hover:bg-white/[.04] hover:text-[#f3f3e8]")}>
                <Icon size={17} strokeWidth={active ? 2.25 : 1.7} className={cn(active ? "text-[#ffbd4a]" : "text-[#78897e]")} />
                <span className="nav-label">{item.label}</span>
                {item.href === "/" && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#ff8a2b] shadow-[0_0_9px_rgba(255,138,43,.8)]" />}
              </Link>;
            })}
          </nav>
        </div>
        <div className="mt-auto px-6 pb-7">
          <div className="relative overflow-hidden rounded-2xl border border-[#a43dff]/20 bg-[#13202c] p-4">
            <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-[#a43dff]/10 blur-2xl" />
            <div className="relative flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[.14em] text-[#ff5cc8]"><Zap size={13} /> Live signal</div>
            <p className="relative mt-3 text-[12px] leading-5 text-[#9cb4c7]">Counts refresh every few seconds. Tiny changes, useful decisions.</p>
            <div className="relative mt-4 flex items-center gap-2 text-[11px] text-[#c9d9e5]"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#a43dff]" /> Active across 7 places</div>
          </div>
        </div>
      </aside>

      <header className="fixed left-0 right-0 top-0 z-30 flex h-[70px] items-center justify-between border-b border-white/[.08] bg-[#0d090f]/85 px-5 backdrop-blur-xl lg:left-[246px] lg:px-8">
        <div className="flex items-center gap-3 lg:hidden">
          <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#ff8a2b] p-1.5"><img src="/manus-storage/vaqo-logo_1faf644c.png" alt="" className="h-full w-full object-contain" /></div>
          <span className="font-display text-[16px] font-bold tracking-[-.04em]">Vaqo</span>
        </div>
        <div className="hidden items-center gap-2 text-[12px] text-[#86958a] lg:flex"><Home size={14} /> <span className="text-[#cbd4ca]">Bengaluru</span> <span className="text-[#55635a]">/</span> <span>{isMap ? "Live map" : navItems.find((item) => location.startsWith(item.href))?.label ?? "Explore"}</span></div>
        <div className="ml-auto flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-full border border-[#ff8a2b]/20 bg-[#ff8a2b]/[.06] px-3 py-1.5 text-[11px] text-[#ffbd4a] sm:flex"><span className="h-1.5 w-1.5 rounded-full bg-[#ff8a2b] shadow-[0_0_8px_rgba(255,138,43,.8)]" /> Live data</div>
          <button aria-label="Your current location" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[.12] bg-white/[.04] text-[#a43dff] transition hover:border-[#a43dff]/50 hover:bg-[#a43dff]/10"><MapPinned size={16} /></button>
          <Link href="/community" className="hidden items-center gap-2 rounded-lg bg-[#f3f3e8] px-3.5 py-2 text-[12px] font-semibold text-[#0d090f] transition hover:bg-[#d7e6dc] sm:flex"><Plus size={14} strokeWidth={2.5} /> Add a place</Link>
          <button aria-label="Your profile" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[.12] bg-[#291329] text-[12px] font-semibold text-[#d7e1d9]">AR</button>
        </div>
      </header>

      <main className="min-h-screen pb-[78px] pt-[70px] lg:ml-[246px] lg:pb-0">{children}</main>

      <nav aria-label="Mobile navigation" className="fixed bottom-0 left-0 right-0 z-40 grid h-[76px] grid-cols-5 border-t border-white/[.08] bg-[#120c12]/95 px-2 pb-2 pt-2 backdrop-blur-xl lg:hidden">
        {navItems.map((item) => {
          const active = item.href === "/" ? isMap : location.startsWith(item.href);
          const Icon = item.icon;
          return <Link key={item.href} href={item.href} className={cn("nav-item flex flex-col items-center justify-center gap-1 rounded-xl text-[10px] font-medium", active ? "text-[#ffbd4a]" : "text-[#76847a]") }><Icon size={18} strokeWidth={active ? 2.2 : 1.7} /><span>{item.label === "Plan my day" ? "Plan" : item.label}</span></Link>;
        })}
      </nav>
    </div>
  );
}
