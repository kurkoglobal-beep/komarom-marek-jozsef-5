"use client";

import { useEffect, useRef } from "react";
import type { Messages } from "@/lib/i18n";
import { developmentAreaFilm } from "@/config/marketing-media";

export function DevelopmentAreaFilm({ messages }: { messages: Messages }) {
  const copy = messages.experience.developmentFilm;
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const attemptPlayback = () => {
      if (video.paused) void video.play().catch(() => undefined);
    };
    const resumeWhenVisible = () => {
      if (document.visibilityState === "visible") attemptPlayback();
    };

    video.addEventListener("canplay", attemptPlayback);
    window.addEventListener("pageshow", attemptPlayback);
    document.addEventListener("visibilitychange", resumeWhenVisible);
    attemptPlayback();

    return () => {
      video.removeEventListener("canplay", attemptPlayback);
      window.removeEventListener("pageshow", attemptPlayback);
      document.removeEventListener("visibilitychange", resumeWhenVisible);
    };
  }, []);

  return (
    <section className="development-film" aria-labelledby="development-film-title">
      <div className="development-film__media">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          controls={false}
          disablePictureInPicture
          poster={developmentAreaFilm.poster}
          aria-label={copy.videoLabel}
        >
          {developmentAreaFilm.sources.map((source) => (
            <source key={source.src} src={source.src} media={source.media} type={source.type} />
          ))}
        </video>
        <div className="development-film__shade" aria-hidden="true" />
        <div className="development-film__copy">
          <p className="kicker light-text">{copy.kicker}</p>
          <h2 id="development-film-title">{copy.title}</h2>
          <p>{copy.description}</p>
          <small>{copy.disclaimer}</small>
        </div>
        <a className="development-film__cue" href="#development-area" aria-label={copy.continueLabel}>
          <span>{copy.continue}</span><b aria-hidden="true">↓</b>
        </a>
      </div>
    </section>
  );
}
