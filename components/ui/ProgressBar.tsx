import type { CSSProperties } from "react";
export function ProgressBar({ value, label }: { value: number | null; label: string }) {
  const safeValue = value === null ? 0 : Math.max(0, Math.min(100, value));
  return <div className="ui-progress" aria-label={label} role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={value ?? undefined} aria-valuetext={value === null ? label : `${safeValue}%`}><span style={{ "--ui-progress-value": `${safeValue}%` } as CSSProperties}/></div>;
}
