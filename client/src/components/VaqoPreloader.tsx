/* Vaqo / Signal Cartography: a black intro, logo fade, then a clean left/right center-split reveal. */
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function VaqoPreloader({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(true);
  const [stage, setStage] = useState<"black" | "logo" | "fade" | "reveal" | "done">("black");
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
    const logoTimer = window.setTimeout(() => setStage("logo"), reducedMotion ? 80 : 700);
    const fadeTimer = window.setTimeout(() => setStage("fade"), reducedMotion ? 260 : 2500);
    const revealTimer = window.setTimeout(() => setStage("reveal"), reducedMotion ? 500 : 3250);
    const finishTimer = window.setTimeout(() => setStage("done"), reducedMotion ? 900 : 5250);
    return () => {
      window.clearTimeout(logoTimer);
      window.clearTimeout(fadeTimer);
      window.clearTimeout(revealTimer);
      window.clearTimeout(finishTimer);
    };
  }, [reducedMotion, visible]);

  useEffect(() => {
    if (stage === "done") setVisible(false);
  }, [stage]);

  const skip = () => setStage("done");
  const showLogo = stage === "logo" || stage === "fade";
  const isFading = stage === "fade";
  const isRevealing = stage === "reveal";
  const panelDuration = reducedMotion ? 0 : 1.45;

  return <>
    {children}
    <AnimatePresence>
      {visible && <motion.div key="vaqo-preloader" initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reducedMotion ? 0 : .45, ease: [0.23, 1, 0.32, 1] }} className="fixed inset-0 z-[100] flex min-h-screen flex-col overflow-hidden text-white" role="status" aria-label="Loading Vaqo">
        <motion.div animate={{ opacity: isRevealing ? 0 : 1 }} transition={{ duration: reducedMotion ? 0 : panelDuration, ease: [0.77, 0, 0.175, 1] }} className="pointer-events-none absolute inset-0 z-10 bg-black" />
        <motion.div animate={{ opacity: showLogo ? (isFading ? 0 : 1) : 0 }} transition={{ duration: reducedMotion ? 0 : .8, ease: [0.23, 1, 0.32, 1] }} className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center"><img src="/manus-storage/vaqo-logo_1faf644c.png" alt="Vaqo" className="h-[min(62vw,520px)] w-[min(62vw,520px)] object-contain" /></motion.div>
        <button onClick={skip} className="absolute right-5 top-5 z-50 rounded-full border border-white/20 px-3 py-2 text-[10px] font-semibold uppercase tracking-[.16em] text-white/60 transition hover:border-white/45 hover:text-white sm:right-10 sm:top-8">Skip <span aria-hidden="true">→</span></button>
        <div className="pointer-events-none absolute inset-0 z-30 flex" aria-hidden="true"><motion.div initial={{ x: 0 }} animate={{ x: isRevealing ? "-102%" : 0 }} transition={{ duration: panelDuration, ease: [0.77, 0, 0.175, 1] }} className="h-full w-1/2 border-r border-[#ff9b18]/35 bg-black" /><motion.div initial={{ x: 0 }} animate={{ x: isRevealing ? "102%" : 0 }} transition={{ duration: panelDuration, ease: [0.77, 0, 0.175, 1] }} className="h-full w-1/2 border-l border-[#ff4b64]/35 bg-black" /></div>
      </motion.div>}
    </AnimatePresence>
  </>;
}
