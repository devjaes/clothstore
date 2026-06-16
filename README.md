# Ambivalence — Storefront (2023)

> Two-app e-commerce platform (storefront + admin) for an Ecuadorian clothing brand. This repo is the customer-facing storefront.

## Overview

Mobile-first storefront with product catalog, filtering by category and size, cart, and checkout handoff. The storefront is a thin Next.js client — catalog, inventory, and checkout endpoints live in the [admin app](https://github.com/devjaes/cloth_store_admin), which this app reads from via `NEXT_PUBLIC_API_URL`. Checkout redirects the customer to WhatsApp to complete the order with the brand directly.

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 13.4 (App Router) |
| Language | TypeScript 5 |
| Styles | Tailwind CSS 3 + `@headlessui/react` |
| State (cart) | Zustand (persisted) |
| UI | `lucide-react`, `framer-motion`, `react-hot-toast` |
| Data fetching | `fetch` + `query-string` against the admin API |
| Checkout | WhatsApp handoff (no payment processor in this repo) |

Persistence (Prisma/Postgres) and auth (admin-only) live in the paired admin repo, not here.

## Repo scope

- **Storefront:** this repo
- **Admin / API / DB:** [devjaes/cloth_store_admin](https://github.com/devjaes/cloth_store_admin)

## Local setup

```bash
git clone https://github.com/devjaes/clothstore.git
cd clothstore
npm install

# .env.local
# NEXT_PUBLIC_API_URL=<base URL of a running cloth_store_admin instance>/api/<storeId>

npm run dev
```

The storefront cannot run standalone — it needs the admin app reachable at `NEXT_PUBLIC_API_URL` to serve `/products`, `/categories`, `/sizes`, and `/checkout`.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm start` | Run production build |
| `npm run lint` | Next.js ESLint |

## Status

Earlier project (2023). The brand has since closed; the production deployment is no longer maintained. Kept public for the career timeline.

## Portfolio

[Project entry on devjaes.dev →](https://devjaes.dev/work/ambivalence)
