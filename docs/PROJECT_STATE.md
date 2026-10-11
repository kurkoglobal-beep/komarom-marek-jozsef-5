# Komárom Marek József utca 5 — Current State

Date: 2026-08-11
Project ID: `019f8dca-9a2c-7c40-bae8-914bd928677c`

This document is a current-state snapshot, not a historical log. It separates repository-verified facts, approved direction, and information that still requires confirmation.

## Approved baseline: KOMÁROM P0 + P1 — v1.0

### APPROVED

- P0 Truth Cleanup is complete: truth check passed.
- P1 Visual Authenticity is complete: visual provenance and concept labeling passed.
- Desktop QA and mobile QA have explicit user approval.
- Lint, TypeScript, production build, i18n validation, and port isolation passed at baseline approval.
- The current visual system is a protected baseline, including the hero composition, color system, typography system, layout hierarchy, stable 2D Lakásválasztó/masterplan fallback, and concept/provenance labeling system.
- The protected visual component inventory is: Header, Hero, Quick Search, Home Experience, Selected Apartments, Early Choice, Development Phases, Location Experience, Gallery, Project Film, Contact, Footer, Lakásválasztó/masterplan fallback, unit cards, and the unit-detail visual hierarchy.
- Later work may replace provisional content and data with approved real content and data without changing the approved design. Visual changes to protected components require explicit user approval.

### OUTSIDE THIS BASELINE — CONTROLLED FUTURE PHASES

- Import of real apartment data.
- Final Hungarian and English content.
- Contact and lead backend.
- Legal pages.
- 3DS, BIM, and other 3D model processing.
- Geodetic point-cloud integration.
- 3D Lakásválasztó.
- Virtual view experience.
- Online reservation system.
- Production deployment.

### DWG / 3D STATUS

- Processing of the current DWG is closed and parked.
- A new 3D export is expected from the architect.
- Expected sources include 3DS, potentially additional 3D/BIM exports, and a geodetic point cloud.
- Until suitable source material arrives and a separate controlled task is approved, the current stable 2D Lakásválasztó fallback remains part of the protected baseline.

## 1. Project objective

### VERIFIED

- The repository contains a public real-estate marketing and sales application for the Komárom Marek József utca 5 project.
- The current product surface includes project presentation, gallery, apartment discovery, apartment details, favorites, masterplan, contact, development phases, location, and media experiences.

### APPROVED DIRECTION

- Continue as one coherent sales-oriented product, with stability and the sales experience taking precedence over visual or technical novelty.

### TO BE CONFIRMED

- The current commercial milestone, release target, and formal sprint designation.

## 2. Current development phase

### VERIFIED

- `docs/ARCHITECTURE.md` describes the earlier Sprint 1 landing-page layer, but the repository has advanced beyond that description and now contains marketing and sales route groups, shared models, PWA elements, and Supabase scaffolding.
- The working tree contains substantial pre-existing, uncommitted development work.

### APPROVED DIRECTION

- The immediate phase is desktop Adaptive UI refinement while preserving the approved mobile UX and current stable behavior.

### TO BE CONFIRMED

- The formal name and acceptance criteria of the current development phase.

## 3. Technology architecture

### VERIFIED

- One Next.js `16.2.6` App Router application using React `19.2.6` and TypeScript.
- One route system with marketing and sales route groups.
- Shared platform, sales, and experience models under `types/`.
- Repository-backed read-model and seed data under `lib/` and `supabase/`.
- Supabase configuration, seed material, and migration scaffolding exist.
- The architecture document states that the current public layer does not use a database, authentication, or an external API.
- Build paths exist for standard Next.js/Vercel and vinext/Sites compatibility.
- The fixed development port is `3000`.

### APPROVED DIRECTION

- Retain one Next.js application, one shared business-logic layer, one shared data model, and one route system across mobile and desktop.

### TO BE CONFIRMED

- The production data-source plan and the current operational maturity of Supabase integration.
- The long-term deployment target between the documented compatible build paths.

## 4. Route map

### VERIFIED

- `/` — marketing landing page
- `/projekt` — project presentation
- `/galeria` — gallery
- `/lakasok` — apartment finder/list
- `/lakasok/[unitId]` — apartment detail
- `/kedvencek` — favorites
- `/masterplan` — masterplan
- `/kapcsolat` — contact
- `/offline` — offline fallback

### APPROVED DIRECTION

- Mobile and desktop continue to share this route system.

### TO BE CONFIRMED

- Future protected admin routes and any additional public routes.

## 5. Data model and data sources

### VERIFIED

- Shared core entities include project, building, floor, unit type, and unit.
- Experience models include development phases, location points, move intent, unit media, room-media links, and progress-journal entries.
- Sales presentation data is adapted through shared sales types and repository seed/read-model data.
- Apartment filter intent is URL-based.
- Phase, location, and progress-journal data are project read-models; unit media is an Asset Library read-model adapter rather than a competing Asset entity.

### APPROVED DIRECTION

- New behavior must extend the shared models and canonical URL/state contracts instead of creating parallel business logic, state, or data models.

### TO BE CONFIRMED

- Approved production source of truth for apartments, availability, development phases, location facts, and progress information.

## 6. Mobile/Desktop Adaptive UI strategy

### VERIFIED

- The implementation includes safe-area handling, a mobile bottom navigation, minimum touch targets, mobile scroll-snap patterns, responsive layouts, and separate mobile/desktop media renditions.
- Desktop has a dedicated adaptive composition/polish layer.
- Existing CSS identifies the sub-760 px mobile rules as authoritative while allowing desktop-specific composition.

### APPROVED DIRECTION

- The project is mobile-first and uses Adaptive UI.
- The approved mobile UX is the protected reference.
- Desktop may receive separate layout, spacing, typographic proportions, media renditions, and visual composition.
- Desktop work must not cause mobile regression.

### TO BE CONFIRMED

- The approved device/browser QA matrix and exact breakpoint acceptance criteria.

## 7. Protected UX/UI decisions

### VERIFIED

- Apartment filtering uses URL state; phase and target-handover intent must extend that contract rather than introduce parallel client state.
- Missing phase metrics remain `null` and render localized neutral states.
- Unverified location time and distance data must not be shown as verified facts.
- A-2.01 media is exact only for `unit-a-201`; other units require a visible `concept` relationship disclaimer.
- The 2D masterplan is a replaceable presentation adapter for a future 3D viewer.
- Homepage anchors, unknown canonical query parameters, mobile safe areas, sticky actions, LCP, and horizontal overflow are documented regression-sensitive areas.
- The current working project-video behavior is a stable baseline.

### APPROVED DIRECTION

- Approved UX/UI elements may not be changed without explicit user instruction, except for a verified bug fix or regression removal using the smallest effective change.
- Do not change the current project video's file, autoplay, preload, poster, or mobile/desktop selection logic as part of unrelated work.

### TO BE CONFIRMED

- The complete business-approved UX/UI inventory beyond the decisions recorded above.

## 8. Localization

### VERIFIED

- HU, EN, DE, and SK locale files currently exist for both general UI messages and Marek 5 project content.
- User-visible component text and accessibility/status text are governed by the localization workflow in `AGENTS.md`.

### APPROVED DIRECTION

- The final public languages are Hungarian and English.
- Removal of German and Slovak is a separate, controlled development task.

### TO BE CONFIRMED

- Timing, migration steps, URL/SEO impact, and acceptance criteria for controlled DE/SK removal.

## 9. Asset management

### VERIFIED

- Source-quality assets live under `assets/`; optimized delivery renditions live under `public/assets/`.
- Assets use non-destructive `vNN` versioning and explicit versioned public paths.
- `assets/asset-library.json` is the machine-readable source of truth.
- Publication requires visual, branding, filename, rendition, compression, and metadata checks.
- Large source material is governed by documented GitHub and object-storage limits.

### APPROVED DIRECTION

- Original architectural renders and plans take precedence over AI-generated substitute assets.
- AI assets are limited to concepts, temporary placeholders, or cases where approved original material is not yet available.

### TO BE CONFIRMED

- Object-storage provider and workflow for large immutable source assets.
- Approval status of individual visual assets where the catalog does not provide an external approval reference.

## 10. Project video

### VERIFIED

- `KMJ5_OfficialProjectFilm` v01 is cataloged as `published` and is integrated into the development-area experience.
- Separate desktop and mobile H.264 renditions exist in the catalog.
- Poster v02 is documented as aligned with the first video frame.
- The component implements muted inline looping autoplay, deferred/warm-up loading behavior, and an autoplay fallback control.
- At the audit baseline, the mobile rendition and poster v02 were untracked working-tree files.

### APPROVED DIRECTION

- Treat the current working project video as a stable baseline.
- Do not change its file, autoplay, preload, poster, or mobile/desktop video logic without a separate task.
- A future higher-quality replacement is a separate development task.

### TO BE CONFIRMED

- Final source provenance, business approval, and publication/commit status of all active video renditions.

## 11. 3D / Sketchfab

### VERIFIED

- There is no live Sketchfab integration.
- There is no custom interactive 3D viewer.
- The current masterplan is a 2D presentation adapter.
- Static 3D architectural render assets exist.

### APPROVED DIRECTION

- Plan an interactive web integration of the Sketchfab/Agisoft development-area model after suitable source material and rights are available.
- Do not implement a 3D viewer in the current phase.

### TO BE CONFIRMED

- Delivery of the original Agisoft project or export.
- Availability of GLB, GLTF, OBJ, or FBX exports.
- Availability of planned-building 3D/BIM models.
- Web usage permission and licensing terms.
- Viewer technology, performance budget, fallback experience, and delivery schedule.

## 12. Known issues

### VERIFIED

- No canonical phase read-model currently exposes all required approved business data.
- Approval sources are missing for location travel-time and distance values.
- A-2.01 media is mapped across seeded units even though the Asset Library identifies it as A-2.01 material.
- Approved unit- and room-specific media relationships are incomplete.
- Dated construction photos and milestone sources are missing.
- Documented regression risks include anchor navigation, preservation of URL parameters, sticky mobile actions, safe-area collisions, LCP, and horizontal overflow.
- `docs/ARCHITECTURE.md` does not fully describe the present repository structure.
- The Git working tree contains pre-existing uncommitted changes and untracked assets.

### APPROVED DIRECTION

- Resolve verified desktop defects with minimal changes while protecting mobile behavior and current sales flows.

### TO BE CONFIRMED

- Severity, ownership, and acceptance criteria for each open issue.

## 13. Business data awaiting approval

### VERIFIED

The existing UX audit identifies these inputs as required before factual activation:

- approved phase names and statuses;
- planned handover dates;
- progress percentages;
- unit totals and available-unit counts by phase;
- approved location names, coordinates, distances/travel times, and verification sources;
- unit-specific asset-to-unit and room-to-media approvals;
- dated construction photos and milestone sources.

### APPROVED DIRECTION

- Do not publish unavailable or unverified values as facts. Preserve `null`, neutral localized states, and visible concept/verification disclosures where required.

### TO BE CONFIRMED

- The values, approval owners, approval references, and effective dates for all items above.

## 14. Current priorities

### VERIFIED

- The current implementation and UX audit identify desktop composition, responsive behavior, media performance, and regression safety as active technical areas.

### APPROVED DIRECTION

Current development order:

1. Perfect the desktop Adaptive UI.
2. Fix defective desktop sections.
3. Optimize the desktop container of “Miért éri meg most választani?”.
4. Optimize the desktop size/aspect treatment of the project video without changing video logic.
5. Improve the desktop layout of development phases.
6. Prepare final HU + EN localization.
7. Perform responsive QA.
8. Apply performance polish.
9. Add 3D/Sketchfab integration later.

All decisions also follow the governance priority order: stability, sales experience, UX, visual refinement, then technical novelty.

### TO BE CONFIRMED

- Per-item acceptance criteria and the user-approved scope for the next implementation cycle.

## 15. Validation state

### VERIFIED

- `package.json` provides build, typecheck, lint, i18n validation, Asset Library validation, and test scripts.
- Asset changes require TypeScript, ESLint, and production build checks under the documented asset workflow.
- This current-state documentation task requires only `git diff --check`; it does not validate application runtime behavior.

### APPROVED DIRECTION

- After significant development, run TypeScript, ESLint, production build, and `git diff --check`.
- Add responsive QA, i18n validation, Asset Library validation, console/runtime checks, and overflow checks according to the affected area.

### TO BE CONFIRMED

- Last known successful full validation commit and environment.
- Required browser/device matrix and performance thresholds.

## 16. Git snapshot

### VERIFIED

- Snapshot date: 2026-08-08.
- Repository root: `/Users/kurkogergely/.codex/visualizations/2026/07/23/019f8dca-9a2c-7c40-bae8-914bd928677c`.
- Branch: `main`, tracking `origin/main`.
- HEAD: `89231e8cf6a6e4e303ec36c7625c0bd3b51f8e6d`.
- Audit baseline before this documentation task: 16 modified files and 17 untracked files.
- Those pre-existing changes are user work and must not be cleaned, reverted, staged, overwritten, or committed without explicit instruction.
- This governance task adds changes only to `AGENTS.md` and `docs/PROJECT_STATE.md`.

### APPROVED DIRECTION

- Commit, push, merge, deployment, and production changes always require separate explicit user approval.

### TO BE CONFIRMED

- Intended commit grouping and publication timing after documentation review.

## 17. Questions to confirm

- What is the formal current sprint/release name and target date?
- What is the production source of truth for project, unit, availability, phase, location, and progress data?
- Which deployment target is authoritative for production?
- What is the complete approved/protected UX/UI inventory?
- What browser/device matrix and measurable responsive/performance thresholds apply?
- Who approves phase, location, media, construction-progress, and architectural asset data?
- When and under what migration plan should DE and SK be removed?
- When will Agisoft/3D/BIM source material and web usage rights become available?
- Which project-video files and renditions have final business and publication approval?
