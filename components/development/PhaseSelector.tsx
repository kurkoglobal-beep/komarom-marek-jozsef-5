import type { DevelopmentPhase } from "@/types/experience";
export function PhaseSelector({ phases, activeId, allLabel, phaseLabel, onSelect }: { phases: DevelopmentPhase[]; activeId: string | null; allLabel: string; phaseLabel: string; onSelect: (id: string | null) => void }) {
  return <div className="phase-selector" role="group" aria-label={phaseLabel}><button type="button" className={activeId === null ? "active" : ""} aria-pressed={activeId === null} onClick={() => onSelect(null)}>{allLabel}</button>{phases.map((phase) => <button key={phase.id} type="button" className={activeId === phase.id ? "active" : ""} aria-pressed={activeId === phase.id} onClick={() => onSelect(phase.id)}>{phase.code}. {phaseLabel}</button>)}</div>;
}
