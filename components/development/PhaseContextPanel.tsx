import Link from "next/link";
import type { DevelopmentPhase } from "@/types/experience";
import type { Messages } from "@/lib/i18n";
import { ProgressBar } from "@/components/ui/ProgressBar";

export function PhaseContextPanel({ phase, messages }: { phase: DevelopmentPhase | null; messages: Messages }) {
  const copy = messages.experience.phases;
  if (!phase) return <aside className="phase-context"><small>{copy.overview}</small><h3>{copy.allTitle}</h3><p>{copy.allDescription}</p><Link className="button gold" href="/lakasok">{copy.allCta} →</Link></aside>;
  const status = copy.status[phase.status];
  return <aside className="phase-context" aria-live="polite"><small>{phase.code}. {copy.phase}</small><div className="phase-context__headline"><h3>{copy.phaseTitle.replace("{phase}", phase.code)}</h3><span>{status}</span></div><p>{copy.placeholderDescription}</p><dl><div><dt>{copy.handover}</dt><dd>{copy.dataPending}</dd></div><div><dt>{copy.unitCount}</dt><dd>{copy.dataPending}</dd></div><div><dt>{copy.availableCount}</dt><dd>{copy.dataPending}</dd></div></dl><div className="phase-context__progress"><span>{copy.progress}</span><b>{copy.dataPending}</b></div><ProgressBar value={phase.progressPercent} label={copy.dataPending}/><Link className="button gold" href={`/kapcsolat?interest=residential-interest&phaseId=${phase.id}`}>{copy.plannedCta} →</Link></aside>;
}
