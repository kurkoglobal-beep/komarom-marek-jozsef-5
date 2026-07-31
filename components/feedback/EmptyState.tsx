import Link from "next/link";

export function EmptyState({ icon = "◇", title, description, action }: { icon?: string; title: string; description?: string; action?: { href: string; label: string } }) {
  return <section className="platform-empty" role="status"><span aria-hidden="true">{icon}</span><h1>{title}</h1>{description && <p>{description}</p>}{action && <Link className="button dark" href={action.href}>{action.label}</Link>}</section>;
}
