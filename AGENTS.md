# KMJ5 asset workflow

Before adding or changing a visual asset:

1. Read `assets/README.md` and `docs/ASSET_MANAGEMENT.md`.
2. Never overwrite an existing version. Create the next `vNN` file.
3. Store source-quality files under `assets/<category>/`.
4. Store only optimized delivery files under `public/assets/<category>/`.
5. Add or update the entry in `assets/asset-library.json`.
6. Reference only versioned `/assets/...` public paths from application code.
7. Do not commit large new source renders when they exceed the GitHub threshold documented in `docs/ASSET_MANAGEMENT.md`; record their object-storage URI in the catalog instead.

