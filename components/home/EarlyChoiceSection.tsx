"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Messages } from "@/lib/i18n";
import { earlyChoiceMedia } from "@/config/marketing-media";

const icons = [
  <path key="selection" d="M5 19h14M7 16V8l5-3 5 3v8M10 16v-5h4v5"/>,
  <path key="custom" d="M7 4v16M17 4v16M4 8h6M14 15h6M7 8a2 2 0 1 0 0 .1M17 15a2 2 0 1 0 0 .1"/>,
  <path key="payment" d="M4 18h16M6 18v-7h4v7m4 0V6h4v12M5 7l4-3 4 2 6-3"/>,
  <path key="safe" d="M12 3l7 3v5c0 4.5-2.8 7.8-7 10-4.2-2.2-7-5.5-7-10V6l7-3Zm-3 9 2 2 4-5"/>,
  <path key="value" d="M12 3c3.5 4 6 6.5 6 10a6 6 0 0 1-12 0c0-3.5 2.5-6 6-10Zm0 16v-8m0 3 3-3m-3 5-3-3"/>,
];

function BenefitIcon({ index }: { index: number }) {
  return <span className="early-choice__icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round">{icons[index]}</svg></span>;
}

export function EarlyChoiceSection({ messages }: { messages: Messages }) {
  const copy = messages.earlyChoice;
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const section = ref.current;
    if (!section || !window.IntersectionObserver || window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setVisible(true); return; }
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } }, { rootMargin: "0px 0px -12%" });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return <section ref={ref} id="early-choice" className={`early-choice ${visible ? "is-visible" : ""}`} aria-labelledby="early-choice-title">
    <picture className="early-choice__media early-choice__media--desktop"><Image src={earlyChoiceMedia.desktop} alt="" fill sizes="100vw" loading="lazy"/></picture>
    <div className="early-choice__shade" aria-hidden="true"/>
    <div className="early-choice__content">
      <header><h2 id="early-choice-title">{copy.title}<br/>{copy.questionBefore}<em>{copy.questionHighlight}</em>{copy.questionAfter}</h2><p>{copy.description}</p></header>
      <picture className="early-choice__media early-choice__media--mobile"><Image src={earlyChoiceMedia.mobile} alt="" fill sizes="100vw" loading="lazy"/></picture>
      <div className="early-choice__benefits">{copy.benefits.map((benefit, index) => <article key={benefit.title} tabIndex={0}><BenefitIcon index={index}/><h3>{benefit.title}</h3><p>{benefit.description}</p></article>)}</div>
      <Link className="button gold early-choice__cta" href="/kapcsolat?interest=residential-interest&sourceUrl=%2F%23early-choice">{copy.cta}<span aria-hidden="true">→</span></Link>
    </div>
  </section>;
}
