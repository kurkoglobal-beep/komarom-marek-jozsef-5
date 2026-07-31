import { MobileBottomNav } from "@/components/sales/MobileBottomNav";
import { SalesAppHeader } from "@/components/sales/SalesAppHeader";

export default function SalesLayout({ children }: { children: React.ReactNode }) {
  return <div className="sales-shell">
    <SalesAppHeader />
    <main className="sales-app">{children}</main>
    <div className="sales-sticky-slot" aria-hidden="true" />
    <MobileBottomNav />
  </div>;
}
