/* Vaqo / RushEnd intro overlay: exact six-second black split choreography adapted from the supplied HTML. */
import { useEffect, useState } from "react";

const logoSrc = "/manus-storage/vaqo-logo_1faf644c.png";

export default function VaqoIntroOverlay({ children }: { children: React.ReactNode }) {
  const [running, setRunning] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setRunning(true));
    const finish = window.setTimeout(() => setVisible(false), 6000);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(finish);
    };
  }, []);

  return <>
    {children}
    {visible && <div id="intro-overlay" className={running ? "run" : ""} aria-hidden="true">
      <div className="intro-half" id="intro-left" />
      <div className="intro-half" id="intro-right" />
      <img id="intro-logo" className={running ? "run" : ""} src={logoSrc} alt="RushEnd" />
    </div>}
  </>;
}
