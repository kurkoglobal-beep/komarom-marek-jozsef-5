import { EmptyState } from "@/components/feedback/EmptyState";

export default function UnitNotFound() {
  return <EmptyState icon="⌂" title="A lakás nem található" description="A lakás azonosítója érvénytelen, vagy az adatlap jelenleg nem elérhető." action={{ href: "/lakasok", label: "Lakások megtekintése" }}/>
}
