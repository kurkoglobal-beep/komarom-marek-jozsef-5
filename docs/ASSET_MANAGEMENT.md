# KC-DOC-006 — Projekt Fotóarchívum és Digitális Asset Management

Version: 1.0  
Related sprint: 6.1  
Status: Active

## Purpose

The KMJ5 Asset Library provides one versioned system for development, marketing, sales, investor materials, and future project reuse.

## Directory model

Source-quality files live under `assets/`:

- `branding/`: logo, favicon, colors, fonts
- `hero/`: day, night, drone hero assets
- `renders/`: exterior, interior, aerial, street, night renders
- `smart-home/`
- `smart-park/`
- `masterplan/`
- `floorplans/`
- `apartments/type-a`, `type-b`, `type-c`
- `virtual-tour/`
- `icons/`
- `documents/`
- `marketing/`
- `social-media/`
- `investor/`
- `archive/`

Optimized web renditions mirror the relevant categories under `public/assets/`.

## Required metadata

Every catalog entry must include:

- name
- version
- creation date
- creator
- description
- intended use
- related sprint
- category
- source or storage location
- publication status

The machine-readable source of truth is `assets/asset-library.json`.

## Format rules

- Web delivery: WEBP. AVIF may be added as an additional rendition later.
- Print: PNG or TIFF.
- Editable source: PSD, AI, or Figma export/reference.
- Masterplans: SVG/PDF plus an interactive rendition when available.
- Virtual tours: original 360°/panorama media in object storage; only thumbnails and manifests belong in Git.

## GitHub and object storage

- GitHub target: optimized assets up to 1 MB each.
- Source files up to 5 MB may remain temporarily in Git while object storage is not connected.
- New or replacement source files above 5 MB must go to managed object storage.
- Record the immutable object-storage URI, checksum, and access classification in `asset-library.json`.
- Never commit credentials, signed URLs, temporary download URLs, or private storage keys.

## Quality gate

Before an asset becomes `published`, verify:

- consistent color treatment
- consistent lighting
- consistent perspective
- correct project branding
- no unrelated project names or logos
- correct filename and next sequential version
- web rendition dimensions and compression
- catalog metadata completeness

## Change workflow

1. Add the new source as the next `vNN`.
2. Generate the optimized web rendition without altering the source.
3. Add the metadata entry and mark the previous version `retired` only when appropriate.
4. Update application references to the explicit new version.
5. Run TypeScript, ESLint, and production build checks.
6. Commit source, rendition, catalog, and consuming code together.

