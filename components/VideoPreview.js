"use client";

import { useRef } from "react";

export function VideoPreview({ src, poster, href, label }) {
  const videoRef = useRef(null);

  function handleEnter() {
    videoRef.current?.play();
  }

  function handleLeave() {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="arts-v2__reel-card"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {src ? (
        <video
          ref={videoRef}
          className="arts-v2__reel-video"
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload="metadata"
        />
      ) : (
        <img className="arts-v2__reel-video" src={poster} alt="" />
      )}
      <span className="arts-v2__reel-overlay">
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden="true">
          <circle cx="28" cy="28" r="28" fill="rgba(0,0,0,0.5)" />
          <path d="M22 17l16 11-16 11V17z" fill="#fff" />
        </svg>
        <span>{label || "Watch on Facebook"}</span>
      </span>
    </a>
  );
}
