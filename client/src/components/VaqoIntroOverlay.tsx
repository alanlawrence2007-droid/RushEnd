/* Vaqo / Intro transition: supplied video, then a black screen opens from the center to reveal the landing page. */
import { useRef, useState } from "react";

type IntroState = "video" | "opening";
const introVideo = "/manus-storage/rushend-intro_a1bc0b8d.mp4";

export default function VaqoIntroOverlay({ children }: { children: React.ReactNode }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stage, setStage] = useState<IntroState>("video");
  const [visible, setVisible] = useState(true);
  const closingRef = useRef(false);

  const openScreen = () => {
    if (closingRef.current) return;
    closingRef.current = true;
    setStage("opening");
    window.setTimeout(() => setVisible(false), 1500);
  };

  const startVideo = () => {
    videoRef.current?.play().catch(openScreen);
  };

  return <>
    {children}
    {visible && <div className={`vaqo-video-intro${stage === "opening" ? " is-opening" : ""}`} role="presentation">
      {stage === "video" && <video ref={videoRef} className="vaqo-video-intro__video" autoPlay muted playsInline preload="auto" onLoadedData={startVideo} onEnded={openScreen} onError={openScreen}>
        <source src={introVideo} type="video/mp4" />
      </video>}
      {stage === "opening" && <div className="vaqo-video-intro__opening" aria-hidden="true"><div className="vaqo-video-intro__half vaqo-video-intro__half--left" /><div className="vaqo-video-intro__half vaqo-video-intro__half--right" /></div>}
    </div>}
  </>;
}
