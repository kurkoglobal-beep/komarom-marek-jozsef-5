# UX audit — phases, location and unit media

## Scope

This audit covers the homepage `development-area` and `location` sections plus the unit-detail media experience. It does not change core entities, Supabase, routes, booking, payment or 3D infrastructure.

## Findings

- The development-area hotspot UI has no canonical phase read-model and cannot express unavailable business data safely.
- The legacy location UI contains minute and isochrone values whose approval source is not recorded. They must not be presented as verified facts.
- `UnitPresentation` currently maps the A-2.01 floor plan, furnished axonometry and interiors to every seeded unit. The Asset Library only identifies these assets as A-2.01 material.
- The existing `/lakasok` filter state is URL-based. Phase and target-handover intent must extend this contract, not create parallel client state.

## Decisions

- Phase, location and progress-journal data are project read-models outside `PLATFORM_CORE_ENTITIES.md`.
- Unit media is an Asset Library read-model adapter, not a competing Asset entity.
- Missing phase metrics remain `null` and render localized neutral states.
- Location items remain unverified until an approval reference exists; no time or distance is displayed.
- A-2.01 media is `exact` only for `unit-a-201`. Other units receive a visible `concept` relationship disclaimer.
- The 2D masterplan remains a replaceable presentation adapter for a future 3D viewer.

## Regression risks

- Homepage anchor changes can break header navigation.
- Phase query parameters can be lost if ApartmentFinder does not preserve unknown canonical intent parameters.
- Sticky media actions can collide with the mobile bottom navigation and safe area.
- Shared A-2.01 media can be mistaken for unit-specific technical documentation without a persistent disclaimer.
- Large imagery can affect LCP if eager-loaded outside the Hero.
- Horizontal card tracks can introduce viewport overflow without contained scrolling.

## Data required before factual activation

- approved phase names and status;
- planned handover dates;
- progress percentages;
- unit totals and available-unit counts by phase;
- approved location names, coordinates, distance/travel time and verification source;
- unit-specific asset-to-unit and room-to-media approvals;
- dated construction photos and milestone sources.
