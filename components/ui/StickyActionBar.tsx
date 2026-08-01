import type { ReactNode } from "react";
export function StickyActionBar({ children, label }: { children: ReactNode; label: string }) { return <aside className="ui-sticky-actions" aria-label={label}>{children}</aside>; }
