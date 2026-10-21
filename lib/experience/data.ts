import assetLibrary from "@/assets/asset-library.json";
import rawExperience from "@/data/development-experience.json";
import type { DevelopmentPhase, LocationPoint, MoveIntent, UnitMedia, RoomMediaLink } from "@/types/experience";
import type { UnitView } from "@/types/sales";

export const developmentPhases = rawExperience.phases as DevelopmentPhase[];
export const locationPoints = rawExperience.locations as LocationPoint[];
export const moveIntents = rawExperience.moveIntents as MoveIntent[];

const exactMediaUnitId = "unit-a-201";
export function getUnitMedia(unit: UnitView, { includeConcept = false }: { includeConcept?: boolean } = {}): { items: UnitMedia[]; roomLinks: RoomMediaLink[] } {
  if (unit.id !== exactMediaUnitId) {
    // Opt in only on requested sales surfaces; the approved homepage stays unchanged.
    const asset = includeConcept ? assetLibrary.assets.find((entry) =>
      entry.status === "published" && entry.conceptReuse?.unitTypeIds.includes(unit.unitType.id)
    ) : undefined;
    const rendition = asset?.renditions.find((entry) => entry.path.startsWith("public/assets/") && entry.format === "webp");
    if (!asset?.conceptReuse || !rendition) return { items: [], roomLinks: [] };
    return { items: [{
      id: `${unit.id}-concept`, unitId: unit.id, type: "interior", assetId: asset.id,
      src: rendition.path.replace(/^public/, ""), roomId: null,
      labelKey: asset.conceptReuse.labelKey, sortOrder: 0, isPrimary: true,
      isPublic: true, relationship: "concept", viewAngle: null,
    }], roomLinks: [] };
  }
  const relationship = "exact";
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
