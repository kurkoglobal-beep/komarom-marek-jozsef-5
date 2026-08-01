import { FeedbackState } from "@/components/ui/FeedbackState";
export function EmptyState(props: Parameters<typeof FeedbackState>[0]) { return <FeedbackState {...props} kind="empty"/>; }
