import rawExperience from "@/data/development-experience.json";
import type { DevelopmentPhase, LocationPoint, MoveIntent, UnitMedia, RoomMediaLink } from "@/types/experience";
import type { UnitView } from "@/types/sales";

export const developmentPhases = rawExperience.phases as DevelopmentPhase[];
export const locationPoints = rawExperience.locations as LocationPoint[];
export const moveIntents = rawExperience.moveIntents as MoveIntent[];

const exactMediaUnitId = "unit-a-201";
export function getUnitMedia(unit: UnitView): { items: UnitMedia[]; roomLinks: RoomMediaLink[] } {
  const relationship = unit.id === exactMediaUnitId ? "exact" : "concept";
  const sources = [
    ["floor-plan", "floorPlan2D", "asset-floorplan-a201", unit.presentation.floorPlanSrc, null, "floorPlan"],
    ["axonometry", "furnishedAxonometry", "asset-axonometric-a201", unit.presentation.axonometricSrc, null, "furnished"],
    ["livingroom", "interior", "asset-livingroom-a201", unit.presentation.gallery[0], "room-living", "livingRoom"],
    ["bedroom", "interior", "asset-bedroom-a201", unit.presentation.gallery[1], "room-bedroom", "bedroom"],
    ["bathroom", "interior", "asset-bathroom-a201", unit.presentation.gallery[2], "room-bathroom", "bathroom"]
  ] as const;
  const items: UnitMedia[] = sources.map(([suffix,type,assetId,src,roomId,labelKey], index) => ({ id:`${unit.id}-${suffix}`, unitId:unit.id, type, assetId, src, roomId, labelKey, sortOrder:index, isPrimary:index===0, isPublic:true, relationship, viewAngle:type === "furnishedAxonometry" ? "top" : null }));
  return { items, roomLinks: items.filter((item) => item.roomId).map((item) => ({ roomId:item.roomId!, unitMediaId:item.id })) };
}
