import rawSeed from "@/data/units.json";
import type { AvailabilityStatus } from "@/types/platform-core";
import type { SalesSeed, UnitPresentation, UnitView } from "@/types/sales";

const seed = rawSeed as SalesSeed;
const statuses: AvailabilityStatus[] = ["coming_soon","available","temporarily_reserved","reserved","sold","not_for_sale"];

const presentation: UnitPresentation = {
  technologies: ["Tervezett Smart Home-előkészítés", "Javasolt hőszivattyús műszaki irány"],
  floorPlanSrc: "/assets/floorplans/KMJ5_A201_Floorplan_v01.webp",
  axonometricSrc: "/assets/apartments/type-a/KMJ5_A201_Axonometric_v01.webp",
  gallery: [
    "/assets/apartments/type-a/KMJ5_A201_Livingroom_v01.webp",
    "/assets/apartments/type-a/KMJ5_A201_Bedroom_v01.webp",
    "/assets/apartments/type-a/KMJ5_A201_Bathroom_v01.webp"
  ],
  brochureSrc: "/assets/documents/KMJ5_Residential_GroundFloorPlan_v01.pdf"
};

export function validateSalesSeed(): SalesSeed {
  const buildingIds = new Set(seed.buildings.map((item) => item.id));
  const floorIds = new Set(seed.floors.map((item) => item.id));
  const typeIds = new Set(seed.unitTypes.map((item) => item.id));
  for (const floor of seed.floors) if (!buildingIds.has(floor.buildingId)) throw new Error(`Unknown building: ${floor.buildingId}`);
  for (const unit of seed.units) {
    if (!floorIds.has(unit.floorId) || !typeIds.has(unit.unitTypeId)) throw new Error(`Invalid unit references: ${unit.id}`);
    if (!statuses.includes(unit.availabilityStatus)) throw new Error(`Invalid availabilityStatus: ${unit.id}`);
    for (const amount of [unit.basePriceAmount, unit.calculatedPriceAmount]) if (amount !== null && !Number.isInteger(amount)) throw new Error(`Money must be integer minor unit: ${unit.id}`);
  }
  return seed;
}

export function getSalesSeed() { return validateSalesSeed(); }
export function getUnitViews(): UnitView[] {
  validateSalesSeed();
  return seed.units.map((unit) => {
    const floor = seed.floors.find((item) => item.id === unit.floorId)!;
    return { ...unit, floor, building: seed.buildings.find((item) => item.id === floor.buildingId)!, unitType: seed.unitTypes.find((item) => item.id === unit.unitTypeId)!, presentation };
  });
}
export function getUnitView(id: string) { return getUnitViews().find((unit) => unit.id === id); }
export function formatArea(value: string | null) { return value ? `${Number(value).toLocaleString("hu-HU", { maximumFractionDigits: 2 })} m²` : "—"; }
export function getTotalArea(unit: UnitView) { return Number(unit.interiorArea) + Number(unit.terraceArea ?? 0) + Number(unit.gardenArea ?? 0); }
