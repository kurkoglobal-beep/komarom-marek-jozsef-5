# KMJ5 asset workflow

Before adding or changing a visual asset:

1. Read `assets/README.md` and `docs/ASSET_MANAGEMENT.md`.
2. Never overwrite an existing version. Create the next `vNN` file.
3. Store source-quality files under `assets/<category>/`.
4. Store only optimized delivery files under `public/assets/<category>/`.
5. Add or update the entry in `assets/asset-library.json`.
6. Reference only versioned `/assets/...` public paths from application code.
7. Do not commit large new source renders when they exceed the GitHub threshold documented in `docs/ASSET_MANAGEMENT.md`; record their object-storage URI in the catalog instead.

# Localization workflow

1. Do not write new user-visible text directly in a component.
2. Read general UI copy from `i18n/messages/<locale>.json`.
3. Read Marek 5 marketing and project copy from `content/marek5/<locale>.json`.
4. Localize `alt`, `aria-label`, status, loading, empty and error text as well.
5. Never display a status enum value directly; map it to a `status.*` translation key.
6. Add or update the same keys for every supported locale in one change.
7. Keep fallback content explicitly marked; never silently omit a translation key.

# Komárom Project Development Constitution v1.0

## Project identity

- Project: Komárom Marek József utca 5
- Repository root: `/Users/kurkogergely/.codex/visualizations/2026/07/23/019f8dca-9a2c-7c40-bae8-914bd928677c`
- Project ID: `019f8dca-9a2c-7c40-bae8-914bd928677c`
- Fixed development port: `3000`

## Project isolation

- From this work session, only the Komárom project may be managed.
- Do not modify files belonging to another project.
- Do not start or stop another project's development server.
- Do not overwrite another project's port.
- If port `3000` is occupied, stop work and report the conflict. Do not terminate or reconfigure the occupying process without explicit user approval.

## Architecture

- Maintain one Next.js application, one shared business-logic layer, one shared data model, and one route system.
- Desktop and mobile are not separate websites.
- Desktop and mobile share data, business logic, routes, state, and data sources.
- The presentation layer may differ by device where the Adaptive UI requires it.

## Adaptive UI

- The project uses a mobile-first Adaptive UI system.
- The approved mobile UX is the protected reference.
- Desktop may have separately optimized layout, spacing, typographic proportions, media renditions, and visual composition.
- Desktop changes must not cause mobile regressions.

## Approved UX/UI protection

- Do not modify an approved UX/UI element without an explicit user instruction.
- The only exceptions are a verified bug fix or regression removal.
- Even for an exception, apply the smallest change that resolves the verified problem.

## Approved baseline

**APPROVED BASELINE: KOMÁROM P0 + P1 — v1.0**

- P0 Truth Cleanup and P1 Visual Authenticity are complete.
- The current desktop and mobile presentation has explicit user approval and is the protected visual baseline.
- Preserve the current hero composition, color system, typography system, layout hierarchy, 2D Lakásválasztó/masterplan fallback, and concept/provenance labeling system.
- Visual changes to the Header, Hero, Quick Search, Home Experience, Selected Apartments, Early Choice, Development Phases, Location Experience, Gallery, Project Film, Contact, Footer, Lakásválasztó/masterplan fallback, unit cards, or unit-detail visual hierarchy require explicit user approval.
- This is visual protection, not a code freeze. Approved real data and content may replace fallback or provisional data without changing the approved design system.

## Priority order

Use this order for every development decision:

1. Stability
2. Sales experience
3. UX
4. Visual refinement
5. Technical novelty

New functionality must not endanger behavior that is already stable and approved.

## Architectural assets

- Prefer original architectural renders and plan material over AI-generated substitutes.
- AI assets may be used for concepts, temporary placeholders, or visual content for which no approved original material exists yet.
- When a suitable original architectural asset is available, use it in preference to an AI asset.

## Git and deployment safety

- Never commit, push, merge, deploy, or modify production without separate, explicit user approval.
- Preserve all uncommitted user changes that existed before the current task.
- Do not revert, clean, overwrite, stage, or commit those changes without an explicit instruction.

## Validation

After a significant development cycle, run:

- TypeScript validation;
- ESLint;
- production build;
- `git diff --check`.

Depending on the affected area, also run:

- responsive QA;
- i18n validation;
- Asset Library validation;
- console/runtime checks;
- overflow checks.

## Reporting

At the end of every development cycle, report:

- modified files;
- changes performed;
- validation results;
- known regression risks;
- Git working-tree state;
- commit status;
- push status;
- deployment status.
