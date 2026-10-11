# MAREK 5 review snapshot — 2026-10-11

Branch: `codex/marek5-local-review-20261011`
Base: `89231e8cf6a6e4e303ec36c7625c0bd3b51f8e6d`
Purpose: preserve the recovered local work for review; no main merge or production release.

## Scope and file audit

Preserves all 33 previously modified and 52 previously untracked project files. Adds this review record. No assets were overwritten or re-encoded during this review.

The original 85 files total approximately 69.4 MB. A filename and secret-pattern audit found no environment files, build artifacts, private keys, GitHub/AWS tokens, credential assignments or signed URLs among the candidates. This is a targeted scan, not a guarantee that arbitrary content can never contain a secret.

All new source images are below the 5 MB source threshold. Optimized delivery videos exceed the 1 MB target (approximately 1.43, 5.99 and 11.52 MB); they are retained unchanged to preserve the approved video experience. The 212.5 MB original MOV is not included. Its existing checksum manifest records that managed object storage is pending; this branch is not a backup of that original video.

## Review changes

- Homepage desktop and mobile menus directly expose Project, Gallery, Apartment selector and Contact using existing localized strings.
- The rendered HTML tests now target a running local Next.js production preview instead of the obsolete vinext `dist/server/index.js` output.
- Assertions preserve truth-cleanup behavior: unavailable data, concept labels, no A-2.01 floorplan rendered for other units, and disabled enquiry submission.
- Next.js streamed not-found responses are checked for their not-found content and `noindex`; a streamed missing unit may have HTTP 200 instead of 404.

## Validation

- Next.js production build: passed, 22 generated pages.
- TypeScript: passed.
- ESLint: no errors; three existing `no-img-element` warnings in the homepage gallery.
- i18n: passed, four locales, 290 UI keys, 29 required masterplan keys.
- Asset catalog: passed, 54 entries and 119 catalogued paths (catalogued does not mean Git-tracked).
- Rendered HTML tests: 6/6 passed against the production preview.
- `git diff --check`: passed.
- Browser checks at 1440x1000 and 390x844: homepage, project, gallery, masterplan, apartment list, A-2.01 detail, favorites and contact render without horizontal overflow.
- Mobile menu opened and all requested routes confirmed. Masterplan floor selection and unit links confirmed.
- Browser error log: no captured console errors during the production route checks.

Reproduce after starting the production preview on the project's free port 3000:

```sh
pnpm build
pnpm exec next start -H 0.0.0.0 -p 3000
# In a second terminal:
KMJ5_TEST_BASE_URL=http://localhost:3000 pnpm test
```

Do not start a second server if port 3000 is occupied.

## Remaining limitations

This is a review snapshot, not a production-readiness sign-off. Apartment data remains provisional, most units lack individual approved media, enquiry submission is disabled, legal pages and real 3D/online reservation remain unfinished. Full multilingual routing and final translated marketing content are not complete. The existing homepage quick-search options are broader than the current truth-cleaned apartment filters. Responsive checks are browser viewport checks, not physical-device certification. The original source video still needs managed storage. Production domain/SEO metadata needs confirmation before release.
