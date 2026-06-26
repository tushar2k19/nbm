cd /home/tushar/Desktop/project/nbm
PATH="$HOME/.nvm/versions/node/v22.22.3/bin:/usr/bin:/bin" npm run dev


deploy:
------
export PATH="$HOME/.nvm/versions/node/v22.22.3/bin:$PATH"
cd /home/tushar/Desktop/project/nbm
npm run build
netlify deploy --prod --dir=dist --functions=.netlify/functions-internal --no-build

# NBM Bamboo Hub — Project TODO

## Completed

- [x] **Extract prototype zip** — Extracted `NBM Bamboo Hub.zip` into `/home/tushar/Desktop/project/nbm`
- [x] **Install dependencies** — Ran `npm install` with Node.js v22.22.3 (required by Vite 8 / TanStack Start)
- [x] **Start dev server** — Running at http://localhost:8080/
- [x] **Guidelines mega-menu** — Hover popup on "Guidelines & Documents" uses a side-tab sidebar pattern (Guidelines, Policies, Financials) instead of bulky grids. No metadata in popups.
- [x] **Knowledge Center nav** — Includes Institutes (migrated from header); sidebar hover pattern with Training Modules, Institutes, Value Added Products, Letters. `/institutes` redirects to `/knowledge-center#institutes`

## How to run locally

```bash
cd /home/tushar/Desktop/project/nbm
export PATH="$HOME/.nvm/versions/node/v22.22.3/bin:$PATH"   # Node 22+ required
npm run dev
```

Open: **http://localhost:8080/**

- [x] **Reports mega-menu** — Same sidebar hover pattern (Annual Action Plan, Bamboo Plantation, Agarbatti Stick, Accredited Nurseries); compact width, right-anchored under nav item
- [x] **Popup close-on-outside-click** — Replaced CSS hover with React state + `pointerdown` / `Escape` listeners; invisible bridge div prevents accidental closure between trigger and panel
- [x] **Hero carousel** — 4-slide auto-scrolling banner (5 s interval) with bamboo forest, PM bamboo_modi images, and processing plant slide. Features: Ken-Burns zoom on active slide, tri-colour top bar, saffron progress-bar dots, play/pause button, prev/next arrows, slide counter, content fade-in animation. CSS `@keyframes progress-bar` added to `styles.css`.
- [x] **Scrollable header** — Removed `sticky top-0` from `SiteHeader` so the full header (govt strip, logo, nav) scrolls away with page content like standard govt portals
- [x] **National Emblem** — Added official State Emblem of India (Ashoka Lion Capital, Satyameva Jayate) leftmost in header brand row; asset sourced from Government of India Act, 2005 via official gazette reproduction (`src/assets/national-emblem.svg`)
- [x] **Azadi logo placement** — Moved `azadi-logo.png` from left brand row to right side of header; national emblem and NBM emblem remain on the left (`SiteLayout.tsx`)
- [x] **Digital India logo** — Added `dig_ind.jpeg` on top-right of header alongside Azadi logo (`SiteLayout.tsx`)

- [x] **Homepage redesign (UI/UX Pro Max)** — Full visual overhaul of the homepage to match professional government portal standards (PMFBY-inspired):
  - **Scaling fix**: Hero carousel reduced from `h-[90vh]` to `h-[64vh]` so the first section fits within a 100% zoom browser window.
  - **Google Fonts**: Added *Plus Jakarta Sans* (body) and *Merriweather* (display headings) via `__root.tsx` preconnect + stylesheet links.
  - **Quick Services section**: Removed — links already available in header navigation (redundant with nav).
  - **Auto-scrolling News**: Replaced static news sidebar with a vertically auto-scrolling list (CSS `@keyframes newsScrollVertical`). Hover pauses the animation via React `onMouseEnter/Leave` toggling `animationPlayState`.
  - **Ticker hover-pause**: Added `.ticker-wrapper:hover .marquee { animation-play-state: paused }` CSS utility.
  - **Card hover lift** (`.card-lift`): 5 px translateY + enhanced box-shadow on hover across Quick Service, Pillar and On-the-Ground cards.
  - **Scroll reveal** (`useReveal` hook): IntersectionObserver-based fade-in-up animation for Quick Services, About, Stats, Pillars, On the Ground sections.
  - **Stats section**: Deep-green primary background with icon bubbles, white-on-dark treatment for strong visual contrast.
  - **Mission Pillars**: Per-card coloured top accent bar and icon circle backgrounds (4 distinct accent colours); subtle bamboo texture overlay.
  - **News tag colour classes**: `.news-tag-press / -news / -notif / -event` added to `styles.css`.
  - **Bamboo texture overlay** (`.bamboo-texture-bg`): Repeating grid line pattern added to Stats and Pillars backgrounds.
  - **Header top strip**: Helpline number (1800-180-1551) added with phone icon; A-/A/A+ text-size buttons; "Skip to Main Content" anchor linking to `#main-content`.
  - **Footer redesign**: Added social media row (Twitter, Facebook, YouTube, LinkedIn); helpline block with Mon–Fri hours; coloured icon accents (saffron) for contact items; Privacy Policy / Disclaimer / Accessibility links; INBAR and PMFBY added to Related Sites; copyright bar now full ministry attribution.

- [x] **Netlify deployment** — Live at https://nbm-bamboo-portal.netlify.app (Nitro `netlify` preset, `netlify.toml` with Node 22 + function config). Deploy with Node 22 build + `netlify deploy --prod --dir=dist --functions=.netlify/functions-internal --no-build` (plain `netlify deploy --prod` fails locally on Node 20.11).

- [x] **News & Press Releases — full workflow** — `/news` listing page and `/news/$newsId` detail pages:
  - Shared data in `src/data/news.ts` (12 items with metadata: ref no., issued by, ministry, location, excerpt, body, attachments)
  - Listing page: category filters, search, static card list (no auto-scroll), bamboo-themed design matching homepage
  - Detail page: breadcrumb, metadata sidebar, full body, attachment download, related updates
  - Homepage sidebar links each item to detail; "View All" routes to `/news`

- [x] **Tenders / Vacancies page** — `/tenders-vacancies` with Vacancies and Tenders tabs, searchable data table (Sr. No., Title, dates, download), bamboo-themed design; added to header navigation.

- [x] **Right to Information (RTI) page** — `/rti` with 8 accordion sections, CPIO tables, org chart, scheme table, agency list; bamboo-themed design with animations; added to header as "Right to Info".

- [x] **Contact dropdown & directory pages** — Contact nav hover menu with Head Quarter, State, RTI; HQ table from official NBM contacts; State table from nbm.da.gov.in/State-Contacts (28 entries); `/contact` index redirects to head-quarter (layout route, no parent redirect loop); sub-nav tabs across contact section.

- [x] **Fix contact redirect loop** — Removed `beforeLoad` redirect from parent `/contact` route (was re-running on child routes and causing `ERR_TOO_MANY_REDIRECTS`). Parent is now a layout with `<Outlet />`; redirect moved to `contact.index.tsx` for `/contact` only.

- [x] **Dashboard / Login / Contact mega-menus** — Fixed broken hover dropdowns (replaced CSS `group-hover` with React state); redesigned with Knowledge Center-style sidebar browse panels, descriptions, and CTA links; right-aligned for end-of-nav items.

- [x] **Research Papers — Knowledge Center** — New sidebar item in KC mega-menu; `/knowledge-center/research-papers` page with searchable table (10 bamboo-themed mock papers); preview table on main Knowledge Center page. Fixed parent layout (`<Outlet />`) so "View all research papers" navigates correctly.

## Pending / Next steps

- [ ] Review and edit pages in `src/routes/`
- [ ] Customize content, images, and styling
- [ ] Configure Supabase (`.env`) if using backend features
- [ ] Test chatbot and other interactive features
- [ ] Consider adding animated stat counters (count-up on scroll) to the Stats section
- [ ] Add WhatsApp chatbot link in header top strip once number is confirmed

- [x] **Interactive India Bamboo Dashboard** — `/dashboard` upgraded with:
  - `react-simple-maps` choropleth map (`IndiaBambooMap.tsx`) using `public/geo/india-states.geojson` (36 states/UTs)
  - Hover/click state infographics (`StateMetricCard.tsx`): plantations, area, nurseries, processing units, beneficiaries, funds
  - Centralized demo data in `src/data/bambooStateStats.ts` (23 NBM implementing states highlighted)
  - Recharts horizontal bar panels (`StateBarCharts.tsx`) for plantations, nurseries, beneficiaries + CSV export
  - Upgraded KPI cards, synced state table, map legend and attribution
- [x] **Dashboard map fix (GoI boundaries)** — Rebuilt `public/geo/india-states.geojson` from udit-001/india-maps-data (LGD/Census 2011, DataMeet-sourced): all 36 states/UTs including separate **Ladakh** and **Jammu & Kashmir**, **Delhi**, **Lakshadweep**, **Andaman & Nicobar**, merged **DNH & Daman & Diu**. Main map auto-fits mainland; island UTs use inset panels (GoI standard). Projection via `d3-geo` `fitExtent`.
- [x] **Header PMFBY-style redesign** — Brand row split: GoI emblem + ministry on left, NBM logo + scheme title on right. Removed Azadi Ka Amrit Mahotsav from header. Digital India logo moved to footer below Related Sites & Reach Us (`SiteLayout.tsx`).
- [x] **Bamboo Mitra chatbot FAB** — Replaced green pill button with PMFBY-style widget: yellow "How may I help you?" speech bubble + circular avatar. Custom `bamboo-mitra-icon.svg` (bamboo stalks in speech-bubble shape, green gradient) (`BambooChatbot.tsx`).
- [x] **Font theme A/B test** — Toggle bottom-left: **All Plus Jakarta** (header sans site-wide — same as GoI/ministry lines) vs **Serif titles** (Merriweather on headings). Backup: `src/styles/font-theme-legacy.backup.css`. Files: `font-theme.css`, `fontTheme.ts`, `FontThemeSwitcher.tsx`. Saved in `localStorage` key `nbm-font-theme`.

## Checkpoint (revert to this stage)

Git initialized **Jun 27, 2025**. Tagged snapshot: **`checkpoint-jun-27-2025`**

**View this snapshot (read-only):**
```bash
git checkout checkpoint-jun-27-2025
```

**Restore project files to this exact state (discards uncommitted changes):**
```bash
git checkout main
git reset --hard checkpoint-jun-27-2025
```

**Create a branch from this checkpoint (keeps current work on main):**
```bash
git checkout -b my-branch checkpoint-jun-27-2025
```

Note: `.env` and `NBM Bamboo Hub.zip` are not in git (secrets / large archive).
