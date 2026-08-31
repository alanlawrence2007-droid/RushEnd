/* Vaqo / RushEnd intro: explicit first-paint logo stage, then a stable center split that reveals the live app. */
import { useEffect, useState } from "react";

type IntroPhase = "logo" | "reveal";
const logoSrc = "/manus-storage/vaqo-logo_1faf644c.png";

export default function VaqoIntroOverlay({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<IntroPhase>("logo");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealAfter = reduced ? 650 : 4300;
    const finishAfter = reduced ? 1100 : 6500;
    const revealTimer = window.setTimeout(() => setPhase("reveal"), revealAfter);
    const finishTimer = window.setTimeout(() => setVisible(false), finishAfter);
    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(finishTimer);
    };
  }, []);

  return <>
    {children}
    {visible && <div id="intro-overlay" className={phase === "reveal" ? "is-reveal" : ""} aria-hidden="true">
      <div className="intro-half" id="intro-left" />
      <div className="intro-half" id="intro-right" />
      <img id="intro-logo" src={logoSrc} alt="RushEnd" />
    </div>}
  </>;
}
