# Ambivalence - Storefront (2023)

> Two-app e-commerce platform (storefront + admin) for an Ecuadorian clothing brand. This repo is the customer-facing storefront.

## Overview

Mobile-first storefront with product catalog, filtering by category and size, cart, and checkout. Pairs with the admin app for catalog, inventory, and order management.

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 13 (App Router) |
| Language | TypeScript |
| Styles | Tailwind CSS + `@headlessui/react` |
| State (cart) | Zustand (persisted) |
| UI | `lucide-react`, `framer-motion`, `react-hot-toast` |
| Backend pair | [devjaes/cloth_store_admin](https://github.com/devjaes/cloth_store_admin) (Prisma + Postgres + Clerk) |

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

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm start` | Run production build |
| `npm run lint` | Next.js ESLint |

## Status

Earlier project (2023) for an Ecuadorian clothing brand. Kept public as part of the career timeline.

## Portfolio

[Project entry on devjaes.dev](https://devjaes.dev/work/ambivalence)
