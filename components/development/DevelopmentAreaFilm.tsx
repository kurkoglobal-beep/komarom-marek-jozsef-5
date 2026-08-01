import type { Messages } from "@/lib/i18n";
import { developmentAreaFilm } from "@/config/marketing-media";

export function DevelopmentAreaFilm({ messages }: { messages: Messages }) {
  const copy = messages.experience.developmentFilm;

  return (
    <section className="development-film" aria-labelledby="development-film-title">
      <div className="development-film__media">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={developmentAreaFilm.poster}
          aria-label={copy.videoLabel}
        >
          <source src={developmentAreaFilm.src} type={developmentAreaFilm.type} />
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
