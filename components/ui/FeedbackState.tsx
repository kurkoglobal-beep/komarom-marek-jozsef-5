import Link from "next/link";

type Props = { kind?: "empty" | "error"; icon?: string; title: string; description?: string; action?: { href: string; label: string } };
export function FeedbackState({ kind = "empty", icon = kind === "error" ? "!" : "◇", title, description, action }: Props) {
  return <section className={`ui-state ui-state--${kind}`} role={kind === "error" ? "alert" : "status"}>
    <span className="ui-state__icon" aria-hidden="true">{icon}</span><h2>{title}</h2>{description && <p>{description}</p>}
    {action && <Link className="button dark" href={action.href}>{action.label}</Link>}
  </section>;
}
