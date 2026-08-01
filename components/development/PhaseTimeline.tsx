import type { DevelopmentPhase } from "@/types/experience";
import type { Messages } from "@/lib/i18n";
import { ProgressBar } from "@/components/ui/ProgressBar";
export function PhaseTimeline({ phases, activeId, messages, onSelect }: { phases: DevelopmentPhase[]; activeId: string | null; messages: Messages; onSelect: (id: string) => void }) {
  const copy = messages.experience.phases;
  return <div className="phase-timeline" aria-label={copy.timelineLabel}>{phases.map((phase) => <button type="button" key={phase.id} className={activeId === phase.id ? "active" : ""} aria-pressed={activeId === phase.id} onClick={() => onSelect(phase.id)}><span><small>{phase.code}. {copy.phase}</small><b>{copy.status[phase.status]}</b></span><h3>{copy.phaseTitle.replace("{phase}", phase.code)}</h3><p>{copy.detailsSoon}</p><ProgressBar value={phase.progressPercent} label={copy.dataPending}/><em>{copy.details} →</em></button>)}</div>;
}
