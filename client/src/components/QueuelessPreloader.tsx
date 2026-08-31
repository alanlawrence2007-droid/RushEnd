/* Queueless / Signal Cartography: the preloader is a short city-signal handoff, not a decorative gate. */
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, MapPinned } from "lucide-react";
import { useEffect, useState } from "react";

const seenKey = "queueless-preloader-seen";

export default function QueuelessPreloader({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(() => {
    try { return window.sessionStorage.getItem(seenKey) !== "1"; } catch { return true; }
  });
  const [leaving, setLeaving] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const timer = window.setTimeout(() => setLeaving(true), reducedMotion ? 200 : 1950);
    return () => window.clearTimeout(timer);
  }, [reducedMotion, visible]);

  const finish = () => {
    try { window.sessionStorage.setItem(seenKey, "1"); } catch { /* session storage is optional */ }
    setVisible(false);
  };

  return <>
    {children}
    <AnimatePresence>
      {visible && <motion.div key="queueless-preloader" initial={{ opacity: 1 }} animate={{ opacity: leaving ? 0 : 1 }} transition={{ duration: reducedMotion ? 0 : .34, ease: [0.23, 1, 0.32, 1] }} onAnimationComplete={() => leaving && finish()} className="fixed inset-0 z-[100] flex min-h-screen flex-col overflow-hidden bg-[#0e1210] text-[#f3f3e8]" role="status" aria-label="Loading Queueless">
        <div className="absolute inset-0 opacity-60" aria-hidden="true"><div className="absolute left-[-10%] top-[8%] h-[75vw] w-[75vw] rounded-full border border-[#1d9e75]/10" /><div className="absolute left-[5%] top-[15%] h-[62vw] w-[62vw] rounded-full border border-[#b6cbbd]/[.06]" /><div className="absolute right-[-10%] bottom-[-30%] h-[78vw] w-[78vw] rounded-full border border-[#378add]/[.08]" /></div>
        <header className="relative z-10 flex items-center justify-between px-5 py-6 sm:px-10 sm:py-8"><div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-[#1d9e75] p-1.5"><img src="/manus-storage/queueless-logo-mark_11995d16.png" alt="" className="h-full w-full object-contain" /></div><div><p className="font-display text-[16px] font-bold tracking-[-.04em]">Queueless</p><p className="mt-0.5 text-[9px] uppercase tracking-[.18em] text-[#718078]">Know before you go</p></div></div><button onClick={finish} className="group flex items-center gap-2 rounded-full border border-white/[.12] px-3 py-2 text-[10px] font-semibold uppercase tracking-[.13em] text-[#98a79b] transition hover:border-white/[.28] hover:text-[#f3f3e8]">Skip <ArrowRight size={12} className="transition group-hover:translate-x-0.5" /></button></header>
        <div className="relative z-10 flex flex-1 items-center px-5 pb-16 sm:px-10 lg:px-20"><div className="w-full max-w-[760px]"><div className="mb-6 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[.2em] text-[#6ccca7]"><span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#1d9e75]/35"><MapPinned size={13} /></span><span>Live city signal</span><span className="h-px w-14 bg-[#1d9e75]/35" /><span className="text-[#66756b]">Bengaluru · 07 places</span></div><div className="relative overflow-hidden"><motion.div initial={{ y: "0%" }} animate={{ y: leaving ? "-105%" : "0%" }} transition={{ delay: reducedMotion ? 0 : .95, duration: reducedMotion ? 0 : .56, ease: [0.77, 0, 0.175, 1] }} className="absolute inset-0 z-20 bg-[#0e1210]" /><h1 className="font-display text-[48px] font-semibold leading-[.98] tracking-[-.07em] text-[#f3f3e8] sm:text-[76px]">Every queue in your city,<br /><span className="text-[#6ccca7]">right now.</span></h1></div><p className="mt-6 max-w-[400px] text-[15px] leading-6 text-[#9eaca0]">Stop guessing. Know exactly when to leave.</p><div className="mt-10 flex items-end gap-1.5" aria-hidden="true">{["#1d9e75", "#1d9e75", "#ba7517", "#ba7517", "#d85a30", "#d85a30", "#1d9e75", "#378add"].map((color, index) => <motion.span key={index} initial={{ height: 8, opacity: .2 }} animate={{ height: [12, 30 + (index % 3) * 12, 12], opacity: [.35, 1, .35] }} transition={{ duration: reducedMotion ? 0 : 1.1, delay: reducedMotion ? 0 : index * .07, repeat: reducedMotion ? 0 : Infinity, ease: "easeInOut" }} style={{ background: color }} className="w-2 rounded-full sm:w-2.5" />)}<span className="ml-3 text-[10px] uppercase tracking-[.16em] text-[#6f7d72]">reading the city</span></div></div></div>
        <footer className="relative z-10 flex items-center justify-between border-t border-white/[.08] px-5 py-5 text-[10px] text-[#6f7c70] sm:px-10"><span>One view. Every kind of wait.</span><span className="flex items-center gap-2"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#1d9e75]" /> Signal online</span></footer>
      </motion.div>}
    </AnimatePresence>
  </>;
}
