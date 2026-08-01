"use client";
export interface SegmentOption<T extends string> { value: T; label: string; }
export function SegmentedControl<T extends string>({ label, value, options, onChange }: { label: string; value: T; options: SegmentOption<T>[]; onChange: (value: T) => void }) {
  return <div className="ui-segmented" role="group" aria-label={label}>{options.map((option) => <button key={option.value} type="button" className={value === option.value ? "active" : ""} aria-pressed={value === option.value} onClick={() => onChange(option.value)}>{option.label}</button>)}</div>;
}
