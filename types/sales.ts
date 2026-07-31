import type { Building, Floor, Project, Unit, UnitType } from "./platform-core";

export interface SalesSeed {
  project: Project;
  buildings: Building[];
  floors: Floor[];
  unitTypes: UnitType[];
  units: Unit[];
}

export interface UnitPresentation {
  technologies: string[];
  floorPlanSrc: string;
  axonometricSrc: string;
  gallery: string[];
  brochureSrc: string;
}

export interface UnitView extends Unit {
  building: Building;
  floor: Floor;
  unitType: UnitType;
  presentation: UnitPresentation;
}
