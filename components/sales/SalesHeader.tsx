export function SalesHeader({ eyebrow, title, lead }: { eyebrow: string; title: string; lead: string }) {
  return <section className="sales-hero"><p>{eyebrow}</p><h1>{title}</h1><span>{lead}</span></section>;
}
