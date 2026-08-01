import Link from "next/link";
import type { ReactNode } from "react";

export function AppHeader({ homeLabel, children }: { homeLabel: string; children?: ReactNode }) {
  return <header className="app-header">
    <Link href="/" className="app-header__brand" aria-label={homeLabel}><b aria-hidden="true">KF</b><span>KOMÁROM<small>FEJLESZTÉSI TERÜLET</small></span></Link>
    {children}
  </header>;
}
