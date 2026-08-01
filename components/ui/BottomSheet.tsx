import type { ReactNode } from "react";
export function BottomSheet({ title, children }: { title: string; children: ReactNode }) {
  return <section className="ui-bottom-sheet" role="dialog" aria-modal="true" aria-labelledby="ui-bottom-sheet-title"><h2 id="ui-bottom-sheet-title">{title}</h2>{children}</section>;
}
