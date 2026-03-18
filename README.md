# MoneyReload – Investment & Loan Calculators

- **Live app**: `https://moneyreload.com`

Next.js (App Router) site containing financial calculators (SIP, FD/RD, lumpsum, loans/mortgage, income tax) plus an MDX-powered blog.

## Tech stack

- **Framework**: Next.js 15 (App Router), React 19, TypeScript
- **UI**: MUI v6, CSS modules
- **Charts**: Recharts
- **Content**: MDX blog posts in `content/blogs/*.mdx`
- **SEO**: `next-sitemap` (runs on `postbuild`)

## Local development

Install deps and start the dev server:

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Environment variables

Create `.env.local` (optional but recommended):

```bash
PROD_URL=http://localhost:3000
```

`PROD_URL` is used for canonical URLs, metadata, sitemap generation, and footer links.



## Where things live

- **Pages**: `app/**`
- **Reusable UI**: `components/**`
  - **Shared calculator shell**: `components/Common/CommonCalculator/*`
  - **Loan calculators & amortization**: `components/Common/LoanCalculator/*`
  - **Charts**: `components/Charts/*`
  - **Landing page sections**: `components/LandingPage/*`
  - **Blog UI**: `components/Blog/*`

## Remote runtime config

Calculator FAQs and some homepage content are fetched at runtime via `helpers/config.ts` from a JSON file hosted on GitHub.
