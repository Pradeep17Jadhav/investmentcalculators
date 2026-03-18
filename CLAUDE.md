# Claude / AI Agent Project Guide

You are working in a **Next.js 15 (App Router) + React 19 + TypeScript** codebase for MoneyReload calculators and an MDX blog.

Follow the rules below when making changes.

## Safety & scope

- Never modify `.next/**` (generated build output).
- Never commit secrets. Do not add real tokens/keys anywhere.
- Keep diffs minimal and aligned with existing patterns.

## Key structure (generic)

Use this as the mental model for the app:

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

- All pages must be under `app/**` (do not use `pages/**`).
- For a route `/some-page`, the folder must be `app/some-page/`.
- Each route folder must contain **only**:
  - `PageName.tsx`
  - `PageName.module.css` (only if required by `PageName.tsx`)
  - `page.tsx`
- A slug segment folder is allowed when needed, e.g. `app/some-page/[slug]/...`.

## Reusable components rules (required)

- All reusable components must be under `components/**`.
- Do not put reusable components in `app/**` (route folders must follow the strict page structure rules).
- Organize components into feature/category folders like `components/common`, `components/charts`, `components/ads`, `components/blog`, `components/layout`.

## Styling and types rules (required)

- Write component-specific CSS only in the corresponding `*.module.css` files.
- Declare all custom types in a `types.ts` file within the relevant folder.
- If a type is reused in multiple places, move it to a shared `types.ts` at the closest common folder and import it.
- Prefer `type` aliases over `interface` for all new types.

## Formatting and imports (required)

- Use tabs for indentation.
- Use double quotes for strings.
- Auto-organize imports before completing changes.

## Commands

- `npm install`
- `npm run dev`
- `npm run lint`
- `npm run build`

Prefer running **lint** after code changes; run **build** for changes affecting routing, server/client boundaries, or production behavior.

## Conventions

- Use TypeScript with `strict: true`.
- Use the alias `@/*` for imports where appropriate.
- Prefer Server Components; add `"use client"` only when necessary.
- Keep MUI patterns consistent with surrounding code.

## Env vars

- `PROD_URL` is used for canonical URLs, metadata, sitemap generation, and footer links.
- In local dev, a common value is `http://localhost:3000`.

If you add new env vars, update `README.md` and ensure the app works with the variable unset.

## Output expectations

When you complete a task:

- Mention which files changed.
- Include the exact commands you ran (if any) and their outcome.
- If you didn’t run verification, say what should be run next (`npm run lint`, `npm run build`).

