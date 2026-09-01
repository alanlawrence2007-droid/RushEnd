/* RushEnd / Signal Cartography: the supplied intro video is the only first-load layer over the live app. */
import { useRef, useState } from "react";

const introVideo = "/manus-storage/rushend-logo-intro_73324bfa.mp4";

export default function RushEndVideoIntro({ children }: { children: React.ReactNode }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showVideo, setShowVideo] = useState(true);
  const [fading, setFading] = useState(false);
  const closingRef = useRef(false);

  const closeVideo = () => {
    if (closingRef.current) return;
    closingRef.current = true;
    setFading(true);
    window.setTimeout(() => setShowVideo(false), 500);
  };

  const handleTimeUpdate = (event: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = event.currentTarget;
    if (video.duration && video.currentTime >= video.duration - 0.75) closeVideo();
  };

  const handleLoaded = () => {
    videoRef.current?.play().catch(() => {
      // Muted autoplay is supported in modern browsers; if blocked, reveal the app rather than trapping the user.
      closeVideo();
    });
  };

  return <>
    {children}
    {showVideo && <div className={`rushend-video-intro${fading ? " is-fading" : ""}`} role="dialog" aria-modal="true" aria-label="RushEnd introduction">
      <video ref={videoRef} className="rushend-video-intro__video" autoPlay muted playsInline preload="auto" onLoadedData={handleLoaded} onTimeUpdate={handleTimeUpdate} onEnded={closeVideo} onError={closeVideo}>
        <source src={introVideo} type="video/mp4" />
      </video>
      <button type="button" className="rushend-video-intro__skip" onClick={closeVideo}>Skip <span aria-hidden="true">→</span></button>
    </div>}
  </>;
}
