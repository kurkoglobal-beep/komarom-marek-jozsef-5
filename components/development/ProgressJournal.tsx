import type { ProgressJournalEntry } from "@/types/experience";
import type { Messages } from "@/lib/i18n";
import { ImageCompareSlider } from "@/components/ui/ImageCompareSlider";

export interface ProgressJournalMedia { beforeSrc: string; afterSrc: string; beforeAlt: string; afterAlt: string }

export function ProgressJournal({ entries, comparison, messages }: { entries: ProgressJournalEntry[]; comparison?: ProgressJournalMedia; messages: Messages }) {
  const copy = messages.experience.journal;
  const published = entries.filter((entry) => entry.status === "published" && entry.date);
  if (!published.length) return <section className="progress-journal progress-journal--empty" aria-labelledby="progress-journal-title"><p>{copy.kicker}</p><h2 id="progress-journal-title">{copy.title}</h2><span>{copy.empty}</span></section>;
  return <section className="progress-journal" aria-labelledby="progress-journal-title"><header><p>{copy.kicker}</p><h2 id="progress-journal-title">{copy.title}</h2></header>{comparison ? <ImageCompareSlider before={comparison.beforeSrc} after={comparison.afterSrc} beforeAlt={comparison.beforeAlt} afterAlt={comparison.afterAlt} label={copy.compareLabel}/> : null}<ol>{published.map((entry) => <li key={entry.id}><time dateTime={entry.date!}>{entry.date}</time><span>{copy.entryPending}</span></li>)}</ol></section>;
}
