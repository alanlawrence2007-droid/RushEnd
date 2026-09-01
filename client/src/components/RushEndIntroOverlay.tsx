/* RushEnd / Supplied intro video: the new RushEnd clip is the only first-load layer over the mounted landing page. */
import { useRef, useState } from "react";
import { assetPath } from "@/lib/sitePaths";

const introVideo = assetPath("assets/rushend-intro.mp4");

export default function RushEndIntroOverlay({ children }: { children: React.ReactNode }) {
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
    {visible && <div className={`rushend-video-intro${fading ? " is-fading" : ""}`} role="presentation">
      <video ref={videoRef} className="rushend-video-intro__video" autoPlay muted playsInline preload="auto" onLoadedData={startVideo} onEnded={closeIntro} onError={closeIntro}>
        <source src={introVideo} type="video/mp4" />
      </video>
    </div>}
  </>;
}
