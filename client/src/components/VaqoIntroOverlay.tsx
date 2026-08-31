/* Vaqo / Supplied intro video: the new RushEnd clip is the only first-load layer over the mounted landing page. */
import { useRef, useState } from "react";

const introVideo = "/manus-storage/rushend-intro_a1bc0b8d.mp4";

export default function VaqoIntroOverlay({ children }: { children: React.ReactNode }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const closingRef = useRef(false);

  const closeIntro = () => {
    if (closingRef.current) return;
    closingRef.current = true;
    setFading(true);
    window.setTimeout(() => setVisible(false), 520);
  };

  const startVideo = () => {
    videoRef.current?.play().catch(closeIntro);
  };

  return <>
    {children}
    {visible && <div className={`vaqo-video-intro${fading ? " is-fading" : ""}`} role="presentation">
      <video ref={videoRef} className="vaqo-video-intro__video" autoPlay muted playsInline preload="auto" onLoadedData={startVideo} onEnded={closeIntro} onError={closeIntro}>
        <source src={introVideo} type="video/mp4" />
      </video>
    </div>}
  </>;
}
