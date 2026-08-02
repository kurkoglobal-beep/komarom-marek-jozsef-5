import type { AvailabilityStatus, EntityId } from "./platform-core";

export type PhaseStatus = "completed" | "selling" | "under_construction" | "preparation" | "planned";
export type HandoverRange = "short_term" | "six_to_twelve_months" | "later_phase" | "all";
export type LocationCategory = "transport" | "education" | "healthcare" | "shopping" | "sport" | "nature" | "regional";
export type UnitMediaType = "floorPlan2D" | "furnishedAxonometry" | "interior" | "panorama360" | "virtualTour" | "view" | "technicalDiagram";
export type MediaRelationship = "exact" | "concept";
export type UnitViewAngle = "top" | "frontLeft" | "frontRight" | "rearLeft" | "rearRight" | "detail";

export interface DevelopmentPhase {
  id: EntityId; code: string; status: PhaseStatus; plannedHandover: string | null; unitCount: number | null;
  availableUnitCount: number | null; progressPercent: number | null; hotspot: { x: number; y: number; width: number; height: number };
}
export interface LocationPoint { id: EntityId; category: LocationCategory; x: number; y: number; verified: boolean; travelMinutes: number | null; distanceMeters: number | null; }
export interface MoveIntent { id: HandoverRange; phaseId: EntityId | null; targetHandoverRange: HandoverRange; availabilityStatus: AvailabilityStatus | null; }
export interface UnitMedia { id: EntityId; unitId: EntityId; type: UnitMediaType; assetId: EntityId; src: string; roomId: EntityId | null; labelKey: string; sortOrder: number; isPrimary: boolean; isPublic: boolean; relationship: MediaRelationship; viewAngle?: UnitViewAngle | null; }
export interface RoomMediaLink { roomId: EntityId; unitMediaId: EntityId; }
export interface ProgressJournalEntry { id: EntityId; phaseId: EntityId; date: string | null; status: "draft" | "published"; assetIds: EntityId[]; compareAssetIds: [EntityId, EntityId] | null; }
