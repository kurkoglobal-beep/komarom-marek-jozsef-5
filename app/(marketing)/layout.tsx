import { MarketingSubpageChrome } from "@/components/marketing/MarketingSubpageChrome";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return <div className="marketing-shell"><MarketingSubpageChrome>{children}</MarketingSubpageChrome></div>;
}
