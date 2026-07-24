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
