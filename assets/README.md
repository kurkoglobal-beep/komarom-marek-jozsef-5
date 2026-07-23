# KMJ5 Asset Library

This directory contains source-quality, versioned project assets. It is the canonical archive for assets that are small enough for GitHub.

## Naming

Use:

`KMJ5_<Category>_<Descriptor>_vNN.<ext>`

Examples:

- `KMJ5_Hero_Day_v01.webp`
- `KMJ5_Exterior_Night_v03.png`
- `KMJ5_Masterplan_v01.svg`
- `KMJ5_TypeA_Livingroom_v02.webp`

Never use ambiguous names such as `final`, `new`, `latest`, or `kep1`.

## Versioning

- Start at `v01`.
- Never overwrite or rename a published version.
- Any visual or content change creates the next version.
- Keep retired versions in their category until moved to `archive/`.
- Update `asset-library.json` whenever a version is added, retired, or published.

## Source and delivery layers

- `assets/`: canonical source/archive layer.
- `public/assets/`: optimized web delivery layer.
- Object storage: large source renders and production files above the GitHub threshold.

The application must reference only versioned paths under `/assets/...`, which map to `public/assets/`.

