import { EmptyState } from "@/components/feedback/EmptyState";

export default function GlobalNotFound() {
  return <main className="standalone-feedback"><EmptyState icon="404" title="A keresett oldal nem található" description="Lehet, hogy a hivatkozás megváltozott, vagy az oldal már nem érhető el." action={{ href: "/", label: "Vissza a Kezdőlapra" }}/></main>;
}
