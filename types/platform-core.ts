export type EntityId = string;
export type IsoUtcDateTime = string;
export type CurrencyCode = string;

export type AvailabilityStatus =
  | "coming_soon"
  | "available"
  | "temporarily_reserved"
  | "reserved"
  | "sold"
  | "not_for_sale";

export interface Project {
  id: EntityId; name: string; slug: string; city: string; countryCode: string;
  description: string | null; status: "draft" | "active" | "paused" | "completed" | "archived";
  defaultCurrency: CurrencyCode; defaultLanguage: string; createdAt: IsoUtcDateTime; updatedAt: IsoUtcDateTime;
}

export interface Building {
  id: EntityId; projectId: EntityId; name: string; code: string; description: string | null;
  displayOrder: number; floorCount: number; unitCount: number; status: "planned" | "active" | "completed" | "inactive";
  createdAt: IsoUtcDateTime; updatedAt: IsoUtcDateTime;
}

export interface Floor {
  id: EntityId; buildingId: EntityId; level: number; name: string; displayOrder: number;
  createdAt: IsoUtcDateTime; updatedAt: IsoUtcDateTime;
}

export interface UnitType {
  id: EntityId; projectId: EntityId; name: string; code: string; roomCount: number;
  templateFloorPlanAssetId: EntityId | null; templateVirtualTourAssetId: EntityId | null;
  template3DAssetId: EntityId | null; createdAt: IsoUtcDateTime; updatedAt: IsoUtcDateTime;
}

export interface Unit {
  id: EntityId; floorId: EntityId; unitTypeId: EntityId; unitNumber: string; roomCount: number;
  interiorArea: string; terraceArea: string | null; gardenArea: string | null; orientations: string[];
  viewType: string | null; availabilityStatus: AvailabilityStatus; basePriceAmount: number | null;
  calculatedPriceAmount: number | null; currency: CurrencyCode; parkingIncluded: boolean;
  storageIncluded: boolean; floorPlanAssetId: EntityId | null; createdAt: IsoUtcDateTime; updatedAt: IsoUtcDateTime;
}
