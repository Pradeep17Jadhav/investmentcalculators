# AI Agent Instructions (Next.js / MoneyReload)

This repository is a **Next.js 15 (App Router) + React 19 + TypeScript** app for MoneyReload investment & loan calculators, plus an MDX blog.

Use this document as the default operating contract for any AI agent making changes.

## Non-negotiables

- **Do not edit generated output**: never modify `.next/**`.
- **No secrets**: do not create/commit `.env*` files containing real secrets. Prefer `.env.example` if needed.
- **Stay consistent**: follow existing patterns in `app/**`, `components/**`, and `helpers/**`.
- **Type safety**: keep TypeScript `strict: true` intact.
- **Hooks correctness**: `react-hooks/exhaustive-deps` is enforced as **error**—do not disable it.
- **Minimal diffs**: change only what’s required to implement the request.

## Project layout

Use this high-level structure and keep new code consistent with it.

```text
app/
  page.tsx
  some-page/
    PageName.tsx
    PageName.module.css
    page.tsx
    [slug]/
      PageNameSlug.tsx
      PageNameSlug.module.css
      page.tsx

components/
  common/
    SomeCommonComponent.tsx
    SomeCommonComponent.module.css
  charts/
    SomeChart.tsx
  ads/
    SomeAdWidget.tsx
  blog/
    SomeBlogCard.tsx
  layout/
    SomeLayoutPart.tsx

content/
  blogs/
    some-post.mdx

helpers/
  someHelper.ts
```

## App page structure rules (required)

- All pages must live under `app/**` (do not use `pages/**`).
- For a route `/some-page`, the folder must be `app/some-page/`.
- Each route folder must contain **only**:
  - `PageName.tsx` (PascalCase component)
  - `PageName.module.css` (only if used by `PageName.tsx`)
  - `page.tsx`
- A slug segment folder is allowed when needed, e.g. `app/some-page/[slug]/...` following the same pattern.

## Reusable components rules (required)

- All reusable components must live under `components/**`.
- Do not place reusable UI in `app/**` (route folders should only contain the page structure files described above).
- Organize components into feature or category folders (for example `components/common`, `components/charts`, `components/ads`, `components/blog`, `components/layout`).
- Prefer imports using `@/components/...` for shared UI.

## Styling and types rules (required)

- Put **all CSS** for a component in its matching `*.module.css` file; do not use global styles for component-specific styling.
- Declare **all custom types** in a `types.ts` file within the relevant folder.
- When a type is reused across sub-folders, move it to the nearest shared `types.ts` in a higher-level folder and import it from there.
- Always use `type` aliases instead of `interface` for new type definitions.

## Formatting and imports (required)

- Use **tabs** for indentation.
- Use **double quotes** for strings.
- Always **auto-organize imports** (remove unused imports and keep import ordering consistent) before finishing a change.

## Local commands (use these)

- **Install**: `npm install`
- **Dev**: `npm run dev` (uses Turbopack)
- **Lint**: `npm run lint`
- **Build**: `npm run build`

If a change affects runtime behavior, prefer validating with **lint + build**.

## Code conventions (defaults)

- **Language**: TypeScript, React function components.
- **Imports**: use path alias `@/*` (maps to repo root).
- **Styling**: MUI v6 + CSS Modules (keep existing approach per feature/file).
- **Formatting**: Prettier is configured; MDX has `printWidth: 1000` via `.prettierrc`.

## Next.js specifics

- **App Router**: prefer Server Components by default; only add `"use client"` when necessary.
- **Metadata/SEO**: treat canonical URLs carefully. The app uses `PROD_URL` for canonical URLs / sitemap.
- **Output**: `next.config.ts` uses `output: "standalone"`—avoid changes that break standalone builds.

## Environment variables

- Expected local optional env var:
  - `PROD_URL=http://localhost:3000` (used for canonical URLs, metadata, sitemap generation, footer links)

When adding new env vars:

- Update `README.md` and provide safe defaults.
- Ensure code handles missing values gracefully (especially in dev).

## How to make changes (process)

1. **Read first**: identify existing patterns in nearby files and extend them.
2. **Implement**: keep components small and calculator logic testable/isolated when possible.
3. **Verify**: run `npm run lint` and `npm run build` if practical.
4. **Document**: update `README.md` only when behavior, env vars, or setup changes.

## What not to do

- Don’t introduce new dependencies unless required; prefer existing libraries already in `package.json`.
- Don’t disable ESLint rules to “make it pass”.
- Don’t restructure folders/URLs without an explicit request (SEO impact).

