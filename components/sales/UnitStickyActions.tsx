"use client";
import { useState } from "react";
import Link from "next/link";
import type { Messages } from "@/lib/i18n";
import { StickyActionBar } from "@/components/ui/StickyActionBar";
import { Toast } from "@/components/ui/Toast";
import { FavoriteButton } from "./FavoriteButton";

export function UnitStickyActions({ unitId, inquiryHref, messages }: { unitId: string; inquiryHref: string; messages: Messages }) {
  const [notice, setNotice] = useState(""); const copy = messages.experience.media;
  async function share() { const url = window.location.href; if (navigator.share) await navigator.share({ title: document.title, url }); else { await navigator.clipboard.writeText(url); setNotice(copy.linkCopied); window.setTimeout(() => setNotice(""), 2200); } }
  return <><StickyActionBar label={copy.actionsLabel}><Link className="button dark" href={inquiryHref}>{messages.sales.inquiry}</Link><FavoriteButton unitId={unitId} compact/><button type="button" className="unit-share-action" onClick={share}>{copy.share}</button></StickyActionBar>{notice ? <Toast message={notice}/> : null}</>;
}
