/* Vaqo / Signal Cartography: deterministic black intro, supplied logo fade, then a clean center-split reveal. */
import { useEffect, useState } from "react";

type Stage = "black" | "logo" | "fade" | "reveal";

export default function VaqoPreloader({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(true);
  const [stage, setStage] = useState<Stage>("black");
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
    const logoTimer = window.setTimeout(() => setStage("logo"), reducedMotion ? 80 : 900);
    const fadeTimer = window.setTimeout(() => setStage("fade"), reducedMotion ? 280 : 5200);
    const revealTimer = window.setTimeout(() => setStage("reveal"), reducedMotion ? 500 : 6200);
    const finishTimer = window.setTimeout(() => setVisible(false), reducedMotion ? 1000 : 8200);
    return () => {
      window.clearTimeout(logoTimer);
      window.clearTimeout(fadeTimer);
      window.clearTimeout(revealTimer);
      window.clearTimeout(finishTimer);
    };
  }, [reducedMotion, visible]);

  const skip = () => setVisible(false);

  return <>
    {children}
    {visible && <div className="vaqo-preloader" data-stage={stage} role="status" aria-label="Loading Vaqo">
      <div className="vaqo-preloader__base" aria-hidden="true" />
      <div className="vaqo-preloader__logo" aria-hidden="true"><img src="/manus-storage/vaqo-logo_1faf644c.png" alt="Vaqo" /></div>
      <div className="vaqo-preloader__split" aria-hidden="true"><div className="vaqo-preloader__panel vaqo-preloader__panel--left" /><div className="vaqo-preloader__panel vaqo-preloader__panel--right" /></div>
      <button onClick={skip} className="vaqo-preloader__skip">Skip <span aria-hidden="true">→</span></button>
    </div>}
  </>;
}
