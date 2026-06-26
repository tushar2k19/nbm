## Goal

Replace the agarbatti sticks image and other reused/placeholder images across the site with real, natural-looking photos of Indian bamboo (plantations, processing, agarbatti sticks, artisans, products).

## Approach

Use real web photos sourced via Firecrawl image search from open sources (Wikimedia Commons, PIB India, gov.in, Unsplash). All photos must depict Indian bamboo / Indian context. Download, save into `src/assets/`, and update imports.

## Image inventory to fix

Currently `src/routes/products.tsx` and `src/routes/gallery.tsx` reuse the same 3 images (`bamboo-products.jpg`, `bamboo-furniture.jpg`, `bamboo-grove.jpg`) for distinct categories — including agarbatti sticks shown as a generic bamboo grove photo.

New real photos to add:
1. `bamboo-agarbatti.jpg` — round bamboo incense sticks / agarbatti stick bundles
2. `bamboo-charcoal.jpg` — bamboo charcoal / briquettes
3. `bamboo-handicrafts.jpg` — Indian artisan handicrafts (baskets, decor)
4. `bamboo-construction.jpg` — bamboo flooring / scaffolding / structural
5. `bamboo-fashion.jpg` — bamboo fabric / lifestyle products
6. `bamboo-northeast.jpg` — real NE India bamboo plantation
7. `bamboo-artisan.jpg` — Indian artisan working with bamboo

Replace existing reused-but-generic shots:
- `bamboo-cultivation.jpg` → real Indian bamboo cultivation field photo
- `bamboo-processing.jpg` → real Indian bamboo processing unit photo
- `bamboo-products.jpg` → real Indian bamboo product display

## Files to change

- `src/routes/products.tsx` — map each of the 6 categories to its own dedicated image (agarbatti → `bamboo-agarbatti.jpg`, charcoal → `bamboo-charcoal.jpg`, etc.)
- `src/routes/gallery.tsx` — swap reused images for the new distinct ones; remove duplicates
- `src/routes/index.tsx` — point hero/processing/cultivation to refreshed real photos
- `src/assets/` — add new `.jpg` files downloaded from open sources

## Technical notes

- Use Firecrawl search (already-available `websearch--web_search` with category filter, or `code--fetch_website`) to locate Wikimedia/PIB images. Verify each image URL is direct and licensable.
- Download via `curl` in build mode, save under `src/assets/`, import normally (Vite handles bundling). Skip `lovable-assets` CDN upload to keep the change simple.
- No changes to `SiteLayout`, routing, or business logic.
