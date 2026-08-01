export function Skeleton({ width = "100%", height = 20, label }: { width?: string | number; height?: string | number; label: string }) {
  return <span className="ui-skeleton" role="status" aria-label={label} style={{ width, height }} />;
}
