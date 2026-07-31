import { notFound } from "next/navigation";
import { SalesHeader } from "@/components/sales/SalesHeader";
import { UnitDetail } from "@/components/sales/UnitDetail";
import { getUnitView, getUnitViews } from "@/lib/sales/data";
export function generateStaticParams(){return getUnitViews().map(unit=>({unitId:unit.id}))}
export default async function UnitPage({params}:{params:Promise<{unitId:string}>}){const {unitId}=await params;const unit=getUnitView(unitId);if(!unit)notFound();return <><SalesHeader eyebrow="Lakáskereső" title={unit.unitNumber} lead={`${unit.building.name} · ${unit.floor.name} · ${unit.roomCount} szoba`}/><UnitDetail unit={unit}/></>}
