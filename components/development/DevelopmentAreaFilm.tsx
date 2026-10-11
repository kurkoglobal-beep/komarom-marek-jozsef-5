"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Messages } from "@/lib/i18n";
import { developmentAreaFilm } from "@/config/marketing-media";

export function DevelopmentAreaFilm({ messages }: { messages: Messages }) {
  const copy = messages.experience.developmentFilm;
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return;
    }

    const connection = (navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }).connection;
    const constrainedConnection = connection?.saveData
      || connection?.effectiveType === "slow-2g"
      || connection?.effectiveType === "2g";
    let warmupTimer: ReturnType<typeof setTimeout> | undefined;

    if (!constrainedConnection) {
      warmupTimer = setTimeout(() => setShouldLoad(true), 1800);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin: "2400px 0px" },
    );

    observer.observe(section);
    return () => {
      observer.disconnect();
      if (warmupTimer) clearTimeout(warmupTimer);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    let mounted = true;
    const attemptPlayback = () => {
      if (!video.currentSrc || !video.paused) return;
      void video.play()
        .then(() => {
          if (mounted) setAutoplayBlocked(false);
        })
        .catch(() => {
          if (mounted) setAutoplayBlocked(true);
        });
    };
    const resumeWhenVisible = () => {
      if (document.visibilityState === "visible") attemptPlayback();
    };
    video.addEventListener("loadeddata", attemptPlayback);
    video.addEventListener("canplay", attemptPlayback);
    video.addEventListener("playing", attemptPlayback);
    window.addEventListener("pageshow", attemptPlayback);
    document.addEventListener("visibilitychange", resumeWhenVisible);
    attemptPlayback();

    return () => {
      mounted = false;
      video.removeEventListener("loadeddata", attemptPlayback);
      video.removeEventListener("canplay", attemptPlayback);
      video.removeEventListener("playing", attemptPlayback);
      window.removeEventListener("pageshow", attemptPlayback);
      document.removeEventListener("visibilitychange", resumeWhenVisible);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="development-film-title"
      className="development-film"
      aria-label={copy.videoLabel}
    >
      <div className="development-film__layout">
        <aside className="development-film__visual">
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
              data-load-state={shouldLoad ? "ready" : "deferred"}
            >
              {shouldLoad ? developmentAreaFilm.sources.map((source) => (
                <source key={source.src} src={source.src} media={source.media} type={source.type} />
              )) : null}
            </video>
            {autoplayBlocked ? (
              <button
                className="development-film__play-fallback"
                type="button"
                aria-label={copy.playLabel}
                onClick={() => {
                  const video = videoRef.current;
                  if (!video) return;
                  video.muted = true;
                  void video.play().then(() => setAutoplayBlocked(false)).catch(() => undefined);
                }}
              >
                <span aria-hidden="true">▶</span>
              </button>
            ) : null}
            <div className="development-film__shade" aria-hidden="true" />
            <span className="visual-status visual-status--overlay">{messages.visualLabels.projectVision}</span>
          </div>
        </aside>

        <div className="development-film__track">
          <header className="development-film__heading">
            <p className="kicker light-text">{copy.kicker}</p>
            <h2>{copy.title}</h2>
            <p>{copy.description}</p>
          </header>

          <article className="development-film__card">
            <span>01</span><h3>{copy.cards.concept.title}</h3><p>{copy.cards.concept.description}</p>
          </article>

          <article className="development-film__card">
            <span>02</span><h3>{copy.cards.specs.title}</h3>
            <dl>{copy.cards.specs.items.map((item) => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl>
          </article>

          <article className="development-film__card">
            <span>03</span><h3>{copy.cards.schedule.title}</h3><p>{copy.cards.schedule.description}</p>
            <ul>{copy.cards.schedule.items.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>

          <article className="development-film__card development-film__card--cta">
            <span>04</span><h3>{copy.cards.contact.title}</h3><p>{copy.cards.contact.description}</p>
            <Link className="button dark" href="/kapcsolat?interest=residential-interest&sourceUrl=%2F%23development-film-title">{copy.cards.contact.cta}<b aria-hidden="true">→</b></Link>
          </article>
        </div>
      </div>
    </section>
  );
}
