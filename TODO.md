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
- [x] **Hero carousel slides 2–3** — Replaced PM Modi slides (`bamboo_modi.jpeg`, `banboo_modi2.jpeg`) with `bk2.png` (handicrafts market stall) and `bk3.png` (women weaving baskets); updated tag, heading, subtext, credit, and CTAs in `src/routes/index.tsx`.
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

- [x] **NIC Phase 1 handoff master plan (`new_plan.md`)** — Jul 4, 2026: Sections A–J for formal handoff doc; 152 inventory rows (P0: 44, P1: 36, P2: 58, P3: 14); nav IA changelog, homepage/OTG breakdown, Phase 2 backlog, Google Docs workflow.
- [x] **Google Doc handoff — §4.1 Header (user sample)** — Jul 5, 2026: User-authored §4.1 in [NBM_MIS_Issues](https://docs.google.com/document/d/1H4jZPdaH19JwI1mOOOlOcF65XDTSTL2WnJXqAjte9oM/edit): comparison table + Detailed Redirect Navigation Map + internal screenshot links. Agent style guide: `docs/handoff/DOC_CONTEXT.md`.
- [x] **§4.2 Homepage handoff** — Jul 5, 2026: Synced + styled in Google Doc (pages ~21–27). Matches §4.1 Header theme: navy comparison table, green hero, amber news, navy pillars/about, teal OTG tiles; plain language; crop placeholder for ticker/sidebar screenshots.
- [x] **§4.3 About NBM handoff (Template B re-sync)** — Jul 5, 2026: Agent 3 replaced §4.3 block (UTF-16 `14310`–`18410` → new end `16132`) from `docs/handoff/sections/03-about-nbm.md`. Backup: `NBM_MIS_Issues_backup_2026-07-05_about` (`1kXjtU_W3E7u3xa7itfjh9ERaIjtErPTEXmZ9-kHC-58`). Template B only — **no Old vs New table**; 5 block tables, 12 rows; Phase 2 footnote for state taglines. Styled like §4.1/§4.2: dark-green HEADING_2 title, navy indented block titles (HEADING_3, 36pt), accent table headers (navy/green/teal/amber/navy) with white bold text, Consolas monospace navy Opens column. §4.7 Gallery left intact.
- [x] **§4.7 Gallery + §4.9 RTI Google Doc repair** — Jul 5, 2026: After About re-sync, §4.7 was truncated (2 rows only). Backup `NBM_MIS_Issues_backup_2026-07-05_repair` (`1r3I1YyhB55_53jo4X6vlK6tMPuhllaitVyqyZFED7ls`). Replaced §4.7 at UTF-16 `16210`–`16773` from `07-gallery.md` (5 tables, 11 rows). Applied navy header + Courier New Opens styling to §4.7 and §4.9 (101 batchUpdate requests). RTI content already had CPIO=Sample + State Dashboard=Phase 2 labels.
- [x] **§4.4 Guidelines & Documents handoff** — Jul 5, 2026: 4-agent pipeline (Research → Draft → Sync+Style → Verify). Inserted at UTF-16 `16138`–`16210` (between §4.3 and §4.7) from `docs/handoff/sections/04-guidelines.md`. Backup `NBM_MIS_Issues_backup_2026-07-05_guidelines-and-documents` (`1CwalXrBTcGoAKpKIEsgMhl-IRpUXbw7SdcMVOalXeYM`). Template B: 6 block tables, 22 rows, #Image3; Release of Funds=Sample Phase 2 (NMSA feed unavailable); FAQ=static; styled green/navy/teal/amber/gold table headers + Consolas Opens. Repo: `04-guidelines-RESEARCH.md`, `04-guidelines.md`.
- [x] **§4.5 Knowledge Center handoff** — Jul 5, 2026: 4-agent pipeline (Research → Draft → Sync+Style → Verify). Inserted at UTF-16 `18796` (between §4.4 and §4.7) from `docs/handoff/sections/05-knowledge-center.md`. Backup `NBM_MIS_Issues_backup_2026-07-05_knowledge-center` (`1hjJrJV4d4u23ibI13kICmhIGfJ_Wpjxg78mLAoBUo84`). Template B: 6 block tables, 28 rows, #Image5; Research Papers=Sample Phase 2; Training/State Mission/Success Stories=Official nbm.da.gov.in PDFs; Institutes=×12 official URLs (prototype has 9 cards, `href="#"` placeholder); styled green/navy/teal/amber headers + Consolas Opens. Repo: `05-knowledge-center-RESEARCH.md`, `05-knowledge-center.md`.
- [x] **§4.6 Reports handoff** — Jul 5, 2026: Research → Draft → Sync+Style → Verify. Inserted at UTF-16 `23350` (between §4.5 and §4.7) from `docs/handoff/sections/06-reports.md`. Backup `NBM_MIS_Issues_backup_2026-07-05_reports` (`17OPJoIBiAaRc3Nrm2ISRxGtrr5EAKUw79nJMLT0yrAQ`). Template B: 4 block tables, 19 rows, #Image6; AAP=Official; sector downloads=Sample Phase 2. Repo: `06-reports-RESEARCH.md`, `06-reports.md`.
- [x] **§4.10 Dashboard + Login notes** — Jul 5, 2026: Inserted §4.10 at UTF-16 `31545`; static /dashboard deploy as-is, Phase 2 live MIS; Login hidden from Phase 1 header, /login Phase 2; §4.1 nav note + §6 rows updated. Repo: `10-dashboard.md`.

## Pending / Next steps

- [ ] Review and edit pages in `src/routes/`
- [ ] Customize content, images, and styling
- [ ] Configure Supabase (`.env`) if using backend features
- [ ] Test chatbot and other interactive features
- [ ] Add WhatsApp chatbot link in header top strip once number is confirmed

---

## NIC Phase 1 Handoff — Backend vs Frontend Audit (Jul 4, 2026)

**Verdict:** Prototype is **~90%+ frontend-only** and meets NIC “mostly frontend” Phase 1 criteria, with caveats below.

### Safe for Phase 1 (no new backend/DB)
- Homepage, About, Products, RTI, GIGW pages, Contact directories, site search, accessibility/i18n
- Gallery (local photos + hotlinked YouTube/`nbm.da.gov.in` videos)
- **Training Modules** — official PDF hotlinks to `nbm.da.gov.in/Documents/Training/` (Phase 1 exception)
- **Success Stories** — official PDF/video hotlinks
- Guidelines / Reports / Tenders **UI** with sample PDF downloads (already badged “Sample”)
- Dashboard + MIS directory **UI** (static `src/data/*.ts` + GeoJSON map) — launchable with disclaimers
- MIS Login stub (`/mis-login` — prototype alert only)
- Feedback form (client-only ref number)

### Needs decision before launch (not Phase 1 backend, but risky)
- [ ] **`/login` + `/state-dashboard`** — still wired to Supabase (Lovable prototype); stub, hide, or link to old MIS
- [ ] **Dashboard/MIS copy** — remove “live” / “real-time” language; add “illustrative data” banner on `/dashboard`, `/plantation`, `/agarbatti-stick`, `/accredited-nursery`
- [ ] **MIS KPI vs table rows** — banners cite national totals (e.g. 1,328 plantations) but tables show ~15 demo rows; align copy or reduce KPIs
- [ ] **News & tenders** — fabricated static content; keep mock, sync later, or link to old site
- [ ] **Visitor counter** — hardcoded `12,84,567`; remove or label “Demo”
- [ ] **Chatbot** — `/api/chat` + Gemini; keep disabled (current) unless API key + VAPT ready

### Defer to Phase 2 (new backend/DB/CMS required)
- Real PDF document library + upload CMS (Guidelines, Reports, Tenders, News attachments)
- Live MIS API integration (plantation, nursery, agarbatti, state KPIs, fund release)
- News/tenders CMS or sync from department systems
- Feedback persistence (email/pgportal/ticket DB)
- Real visitor analytics
- Production MIS auth (integrate with existing `nbm.da.gov.in` MIS)
- Supabase beneficiary workflow (removed from nav; migrations still in repo)

### Next deliverable
- [ ] Prepare formal NIC handoff document — **section-wise**. **Done in Google Doc:** §4.1–§4.15 + §4.12 GIGW (all styled). **Remaining:** any pending prep-only sections per `DOC_CONTEXT.md`.
- [x] **§4.12 GIGW Compliance — Research + Prepare + Google Doc sync + styling (Jul 6, 2026)** — Template B inserted before §4.13 MIS Directories (UTF-16 `39469`–`46684`); 7 block tables, 40 rows; styled green/navy/teal/amber headers, Consolas Opens, blue links, cream Phase 2 footnote; style ref `docs/handoff/gigw_style_requests.json`. Repo: `docs/handoff/sections/12-gigw-RESEARCH.md`, `12-gigw.md`.
- [x] **§4.8 Tenders / Vacancies — Research + Prepare + Google Doc sync (Jul 6, 2026)** — Template B inserted between §4.8 News and §4.9 RTI; 6 block tables, 14 rows, #Image7; styled green/navy/teal/amber headers, Consolas Opens, blue links. Backup: `NBM_MIS_Issues_backup_2026-07-06_tenders-vacancies`. Repo: `docs/handoff/sections/08-tenders-vacancies-RESEARCH.md`, `08-tenders-vacancies.md`.
  - **Due:** Sunday evening ~5 Jul (~36 hrs from 4 Jul)
  - **Strategy:** You build template + 1 worked example per section; colleague fills remaining sections
  - **Audience:** Higher technical officer — static/frontend changes first
  - **Launch target:** 14 Jul (approvals Mon–Tue 6–7 Jul, then NIC implementation)
- [x] **§4.8 News — Research + Prepare + Google Doc sync (Jul 6, 2026)** — Template B; 4 block tables, 13 rows, #Image7; inserted between §4.7 Gallery and §4.9 RTI; styled green/navy/teal/amber table headers, Consolas Opens, blue links. Backup: `NBM_MIS_Issues_backup_2026-07-06_news`. Repo: `docs/handoff/sections/08-news-RESEARCH.md`, `docs/handoff/sections/08-news.md`.
- [x] **§4.13 MIS Directories — Research + Prepare + Google Doc sync (Jul 6, 2026)** — Template B synced + styled in Google Doc after §4.11 Contact; 6 block tables, 18 rows, #Image10; green/navy/teal/amber headers, Consolas Opens, blue official links; sample KPIs/rows + Phase 2 footnote; backup `NBM_MIS_Issues_backup_2026-07-06_mis-directories-style`. Repo: `docs/handoff/sections/13-mis-directories-RESEARCH.md`, `docs/handoff/sections/13-mis-directories.md`.
- [x] **§4.14 Training Modules — Research + Prepare (Jul 6, 2026)** — Template B draft awaiting approval; 4 block tables, 19 rows, #Image5 preview + user hub/detail crops; 4 programmes, 16 official PDF hotlinks (all HTTP 200 verified); hub cards expand inline (no detail nav); detail via KC preview, mega-menu, breadcrumb; MIS dirs (/plantation, /agarbatti-stick, /accredited-nursery) confirmed in §4.13 — no update. Repo: `docs/handoff/sections/14-training-modules-RESEARCH.md`, `docs/handoff/sections/14-training-modules.md`. Sync after approval.
- [x] **§4.14 Training Modules — Google Doc sync + styling (Jul 6, 2026)** — Inserted after §4.13 MIS Directories at UTF-16 `43040` via `GOOGLEDOCS_UPDATE_DOCUMENT_SECTION_MARKDOWN`; styled with green/navy/teal/amber table headers, Consolas Opens column, blue route/URL links, indented block titles, cream Phase 2 footnote + crop placeholder. Backup: `NBM_MIS_Issues_backup_2026-07-06_training-modules` (`1xFecWXRKp4JsBTrfameCSz26CObUSgTqbNp5okTdGCw`). §4.1/§4.2/§4.13/§6 and legacy pp. 1–16 verified intact. `DOC_CONTEXT.md` progress row → Done.
- [x] **§4.15 Research Papers — Research + Prepare (Jul 6, 2026)** — Template B draft awaiting approval; 4 block tables, 12 rows, #Image5 preview + user full-page crop; all 10 publications + PDFs = Sample/Phase 2; KC preview cross-ref §4.5 only (no duplicate table); mega-menu ×6, site search ×10. Repo: `docs/handoff/sections/15-research-papers-RESEARCH.md`, `docs/handoff/sections/15-research-papers.md`. Sync after approval.
- [x] **§4.15 Research Papers — Google Doc sync + styling (Jul 6, 2026)** — Inserted after §4.14 Training Modules at UTF-16 `53852` via `GOOGLEDOCS_UPDATE_DOCUMENT_SECTION_MARKDOWN`; styled with green/navy/teal/amber table headers (4 blocks), Consolas navy Opens column, blue route links, Arial bold navy block titles, HEADING_2 green section title, Sample/Phase 2 amber content-source cells, italic muted-amber Phase 2 footnote + crop placeholder. Backup: `NBM_MIS_Issues_backup_2026-07-06_research-papers` (`1V9_EyzIA_WlUi7VvD6pnqFcMtosR7OqARIsWJgr35L4`). §4.1/§4.2/§4.13/§4.14/§6 and legacy pp. 1–16 verified intact. `DOC_CONTEXT.md` progress row → Done.
- [x] **§4.13 MIS Directories — Agent 2 verify (Jul 6, 2026)** — Compared `13-mis-directories.md` against research + codebase for all 3 routes; no gaps found — section left unchanged.

---

## UX4G / GIGW 3.0 Compliance — Implementation Plan

**Standard:** GIGW 3.0 (published 2024, issued by MeitY / NIC)
**Compliance Mark:** STQC CQW (Certificate of Quality Website)
**Accessibility Floor:** WCAG 2.1 Level AA (WCAG 2.2 applied in practice by STQC auditors)

### Phase 1 — CRITICAL (Audit fails without these) ✅ COMPLETED Jul 2, 2026

- [x] **UX4G Accessibility Widget** — Built `AccessibilityWidget.tsx` with all 11 UX4G controls: TTS (speech synthesis), bigger/smaller/reset text (delegates to existing textScale.ts), line height, highlight links, text spacing, dyslexia-friendly font (OpenDyslexic), hide images, large cursor, light/dark mode, invert colors, reset all. Persisted in `localStorage`. Panel slides from right. CSS in `src/styles/accessibility-widget.css`. Widget embedded in both desktop + mobile header strips.
- [x] **Carousel pause/stop control** — Pause button already existed. Enlarged touch target from `h-6 w-6` (24px) to `h-8 w-8` (32px), exceeding WCAG 2.5.8 minimum. Added `aria-live="polite"`. 
- [x] **Skip link visible on mobile** — Removed from `hidden sm:flex` desktop-only strip. Now placed as very first element in `<header>`, uses `.sr-only` with Tailwind focus reveal classes — visible on Tab on ALL devices.
- [x] **Keyboard navigation for mega-menus** — Added `onFocus`/`onBlur` to mega-menu `<li>` items (mirrors existing hover open/close). Added `aria-expanded={isMegaOpen}` and `aria-haspopup="true"` to nav Links with mega-menus.
- [x] **MIS Login CAPTCHA** — Replaced visual-only alphanumeric CAPTCHA with dynamically generated arithmetic challenge (`num1 + num2`). Proper label (`htmlFor`/`id`), `aria-describedby`, `aria-invalid`, live `role="alert"` error announcement. Refresh button included.
- [x] **Focus indicator hardening** — Global `:focus-visible` rule added to `styles.css`: `3px solid blue ring, 2px offset`. Applies to every interactive element site-wide.
- [x] **Nav aria-label** — Added `aria-label="Main navigation"` to `<nav>` in `SiteLayout.tsx`. Also added `role="list"` to `<ul>`.
- [x] **Header Screen Reader link** — Added `ScreenReaderPopover` component in `SiteLayout.tsx`: "Screen Reader Access" button in desktop utility strip opens a popover listing NVDA, JAWS, ORCA, VoiceOver, TalkBack with download links. Fully keyboard accessible (`<details>`-style with close-on-Escape + click-outside).
- [x] **Hindi lang attributes** — Added `lang="hi"` to all inline Hindi text spans in header (brandGovtHi, brandMinistryHi, schemeTitleHi).
- [x] **Form accessibility (login.tsx + mis-login.tsx)** — Explicit `id`/`htmlFor` on all labels, `autocomplete` attributes (`email`, `current-password`, `username`), `aria-required`, `aria-describedby` pointing to helper text.
- [x] **Global CSS utilities** — Added `sr-only` utility class, high-contrast, line-height, highlight-links, text-spacing, dyslexia, hide-images, large-cursor, invert-colors CSS in `styles.css` triggered by `data-*` attributes set by the widget.

### Phase 2 — NEW MANDATORY PAGES (Required by GIGW 3.0) ✅ COMPLETED Jul 2, 2026

- [x] **`/accessibility` — Accessibility Statement Page** — WCAG 2.1 AA conformance status, UX4G features listed, known limitations (sample PDFs, 3rd-party videos, Google Translate), reporting contact + enforcement procedure, free screen reader links sidebar, last reviewed date. Footer link wired.
- [x] **`/privacy-policy` — Privacy Policy Page** — DPDPA 2023-compliant workflow template. Amber "Content to be finalised by the Department" banner at top. Sections: data collected, cookies table (4 localStorage keys), data use, DPDPA 2023 alignment, external links, contact. Footer link wired.
- [x] **`/disclaimer` — Disclaimer / Terms of Use Page** — Ownership statement ("This website belongs to National Bamboo Mission…"), copyright reproduction policy, accuracy disclaimer (sample PDFs noted), hyperlinking policy (outbound + inbound), limitation of liability, jurisdiction. Footer link wired.
- [x] **`/sitemap` — Sitemap Page** — All 12 site sections with anchor jump-nav pills at top; 3-column grid of section cards each listing child pages with ChevronRight links; Related Government Portals strip at bottom. Footer link added (new).
- [x] **`/feedback` — Feedback Form Page** — Two-column layout (form + contact sidebar). Fields: Category dropdown, Name (optional), Email (optional), Star rating (1–5), Message (required ≥10 chars). Accessible math CAPTCHA (same pattern as MIS login). On submit: amber-50 success panel with auto-generated reference number (NBM-FB-XXXX). Response time notice, pgportal.gov.in link. Footer link added (new).
- [x] **Footer links wired** — All 5 mandatory links in footer bottom bar now use `<Link to="…">` (TanStack Router). Added Sitemap and Feedback as new links. Also wrapped in `<nav aria-label="Legal and mandatory links">`.
- [x] **Hindi font rule** — Added `:lang(hi), [lang="hi"] { font-family: "Noto Sans Devanagari", "Mangal", sans-serif; }` to `styles.css`. Font was already loaded in `__root.tsx`.

### Phase 3 — CONTENT & DATA REQUIREMENTS ✅ COMPLETED Jul 2, 2026

- [x] **Last Updated date in footer** — Footer bottom bar now shows "Last updated: July 2026" right-aligned in the copyright bar. Ownership statement displayed prominently above it.
- [x] **Ownership lineage in footer** — Footer bottom bar now has: "This website belongs to the National Bamboo Mission, Ministry of Agriculture and Farmers Welfare, Government of India." in full above the copyright line. i18n key `footer.ownershipStatement` added to en.json + hi.json.
- [x] **Download metadata — DocFormatBadge component** — Created `src/components/DocFormatBadge.tsx`: parses "PDF · 4.6 MB · 12 Mar 2025" description strings and renders coloured format chip (red=PDF, green=XLSX, blue=DOCX) + file size + date + amber "Sample" badge. Applied to Guidelines page, Reports page. Tenders/Vacancies inline `FormatSizeBadge` added to table. Research Papers already showed "Type: PDF / Size: x KB".
- [x] **`lang="hi"` audit** — All Hindi text in the app is delivered via i18n `t()` calls; no literal Devanagari characters in JSX. The 3 Hindi header elements (brandGovtHi, brandMinistryHi, schemeTitleHi) already carry `lang="hi"` from Phase 1. CSS `:lang(hi)` rule added in Phase 2. Audit complete — no additional tags needed.
- [x] **High Contrast mode** — Added `highContrast: boolean` to `A11yState` in `AccessibilityWidget.tsx`. New button "High Contrast" in Visual section. Sets `data-high-contrast` on `<html>`. Added full `[data-high-contrast]` CSS ruleset to `styles.css`: black background, yellow text (#ffff00), yellow borders, grayscale images, dimmed hero photo layers, maintained focus rings.
- [x] **National Portal link prominence** — Added `🇮🇳 india.gov.in` pill link to the desktop utility strip (left side, next to helpline). Styled as a subtle border pill (white/10 bg, white/90 text) that's distinctive but not jarring. `aria-label` includes "(opens in new tab)".

### Phase 4 — ADVANCED / POLISH ✅ COMPLETED Jul 2026 (see also "Phase 4 — Advanced / Polish" section below)

- [x] **Site-wide search** — `/search` page + header `SiteSearchBar`; client-side index over 6 data sources.
- [x] **Video captions/transcripts** — Gallery YouTube embeds use `cc_load_policy=1`; CC badge on thumbnails.
- [x] **Table structure audit** — `<caption>` + `scope` on HQ/State contacts, RTI, Tenders, Research Papers, Who's Who.
- [x] **Color contrast audit** — Footer legal links and last-updated text raised to ≥75% white opacity.
- [x] **Content archival policy** — Tenders/vacancies expired-row styling + Show Archived toggle (partial; not site-wide CMS).
- [x] **Help section** — `/help` page + footer link (6th mandatory link).
- [x] **Form autocomplete attributes** — Login and MIS login forms (`autocomplete`, `aria-required`, etc.) — pages hidden Phase 2.

### Phase 5 — INFRASTRUCTURE (Outside codebase)

- [ ] **gov.in / nic.in domain** — Currently hosted on `nbm-bamboo-portal.netlify.app`. GIGW mandates `.gov.in` or `.nic.in` domain. Needs NIC coordination.
- [ ] **HTTPS + security headers** — HTTPS is Netlify-default. Need to add security response headers (CSP, X-Content-Type-Options, X-Frame-Options, Referrer-Policy) via `netlify.toml` `[[headers]]` config.
- [ ] **PDF document library** — All current PDFs are placeholder sample PDFs. Real government PDFs must be tagged, have a text layer (not scanned images), proper reading order, alt text for images. GIGW 3.0 requires ALL downloadable files to be accessible.
- [ ] **VAPT security audit** — CERT-In empanelled Vulnerability Assessment and Penetration Testing required before STQC CQW certification.
- [ ] **STQC CQW certification** — Submit for official audit by STQC SAB SETL-1 empanelled lab after all above items are addressed.

- [x] **Interactive India Bamboo Dashboard** — `/dashboard` upgraded with:
  - `react-simple-maps` choropleth map (`IndiaBambooMap.tsx`) using `public/geo/india-states.geojson` (36 states/UTs)
  - Hover/click state infographics (`StateMetricCard.tsx`): plantations, area, nurseries, processing units, beneficiaries, funds
  - Centralized demo data in `src/data/bambooStateStats.ts` (26 NBM implementing states highlighted)
  - Recharts horizontal bar panels (`StateBarCharts.tsx`) for plantations, nurseries, beneficiaries + CSV export
  - Upgraded KPI cards, synced state table, map legend and attribution
- [x] **Dashboard map fix (GoI boundaries)** — Rebuilt `public/geo/india-states.geojson` from udit-001/india-maps-data (LGD/Census 2011, DataMeet-sourced): all 36 states/UTs including separate **Ladakh** and **Jammu & Kashmir**, **Delhi**, **Lakshadweep**, **Andaman & Nicobar**, merged **DNH & Daman & Diu**. Main map auto-fits mainland; island UTs use inset panels (GoI standard). Projection via `d3-geo` `fitExtent`.
- [x] **Header PMFBY-style redesign** — Brand row split: GoI emblem + ministry on left, NBM logo + scheme title on right. Removed Azadi Ka Amrit Mahotsav from header. Digital India logo moved to footer below Related Sites & Reach Us (`SiteLayout.tsx`).
- [x] **Bamboo Mitra chatbot FAB** — Replaced green pill button with PMFBY-style widget: yellow "How may I help you?" speech bubble + circular avatar. Custom `bamboo-mitra-icon.svg` (bamboo stalks in speech-bubble shape, green gradient) (`BambooChatbot.tsx`).
- [x] **Font theme A/B test** — Toggle bottom-left: **All Plus Jakarta** (header sans site-wide — same as GoI/ministry lines) vs **Serif titles** (Merriweather on headings). Backup: `src/styles/font-theme-legacy.backup.css`. Files: `font-theme.css`, `fontTheme.ts`, `FontThemeSwitcher.tsx`. Saved in `localStorage` key `nbm-font-theme`.

- [x] **Demo-ready homepage & global theme revamp (Jun 27, 2026)** — PMFBY-quality polish with distinctive NBM bamboo identity (not a clone):
  - **NBM palette** (`styles.css`): `--sage`, `--mint`, `--amber`, `--forest`; gradient gold/hero tokens; Tailwind color aliases
  - **Global utilities**: `.btn-gold`, `.btn-ghost-green`, `.btn-outline-primary`, `.glass-card`, `.card-hover`, `.section-sage/mint/forest`, `.bamboo-watermark-bg` (SVG stalk pattern), `.news-item-accent`, `.service-icon-circle`, `.section-heading-accent`, `.header-elevated`, `.chat-bubble-premium`
  - **Hero** (`index.tsx`): Gold + ghost-green CTA buttons
  - **Quick Services / Citizen Corner**: 6-card row with per-card accent colors, outline CTAs, hover lift; horizontal snap-scroll + pagination dots on mobile
  - **About + What's New**: Mint section tint, watermark bg, PMFBY-style news sidebar with accent bars
  - **Stats**: Animated count-up on scroll (`useCountUp` + `AnimatedStat`), glass cards, forest gradient section
  - **Mission Pillars**: Gradient top accents, enhanced icon circles
  - **Other Links**: Sage section with 6-icon grid (Tutorials, Circulars, Reports, Directory, Dashboard, Gallery)
  - **Header** (`SiteLayout.tsx`): Forest utility strip, amber helpline, nav hover shadows
  - **Footer**: Forest bg, visitor counter (demo), larger social icons, richer copyright bar
  - **Bamboo Mitra** (`BambooChatbot.tsx`): Premium gold gradient speech bubble, glow ring, gradient chat header
  - **Build verified**: `npm run build` passes with Node 22

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

- [x] **Bamboo Mitra chatbot — Google Gemini Flash** — Switched from Lovable gateway to **Google AI Studio** (`@ai-sdk/google`). Model default: `gemini-2.5-flash-lite` (free tier). Knowledge base in `src/data/nbmChatKnowledge.ts` (guidelines, cost norms, accreditation, agarbatti, institutes, portal routes). Set `GOOGLE_GENERATIVE_AI_API_KEY` in `.env` (see `.env.example`). Optional: `GEMINI_MODEL` override.
- [x] **Quick Services UI/UX Pro Max** — Rebuilt as a standalone module (`QuickServicesSection.tsx`) with a premium botanical theme. Features:
  - **Ambient Backdrop**: Soft mint-to-white gradient with a radial vignette and subtle geometric pattern.
  - **Botanical Ornaments**: Slow-drifting bamboo stalk and leaf line art in all four corners.
  - **Floating Particles**: CSS-animated bamboo leaves and stalks rising through the section for a dynamic, nature-forward feel.
  - **Interactive Cards**: PMFBY-style auto-rotating highlight (every 2s) with hover override. Cards feature glassmorphism, staggered entrance animations, gradient highlights, and a "shine" effect when active.
  - **Refined Palette**: Distinct NBM-specific colors for each service (Forest, Gold, Teal, Violet, Sage, Rose) on clean, tinted cards.
  - **Responsive Design**: Smooth snap-scroll carousel on mobile with custom animated dots.
- [x] **Resources / Other Links — Quick Services style** — Rebuilt `ResourcesSection.tsx` mirroring Citizen Corner cards: eyebrow badge, descriptions, CTA buttons, auto-rotate highlight, botanical backdrop, 6-col desktop grid + mobile snap-scroll. Data in `src/data/resourceLinks.ts`.
- [x] **Mission Pillars — Quick Services style** — Rebuilt `MissionPillarsSection.tsx` with same card pattern: eyebrow badge, CTA links, auto-rotate highlight, botanical backdrop, 4-col grid + mobile carousel. Data in `src/data/missionPillars.ts`.
- [x] **Text size controls (A- / A / A+)** — GIGW-style 5-step scaling via `html[data-text-scale]` (87.5%–125%), persisted in `localStorage`, inline head script prevents flash, `TextSizeControls` in header utility strip.
- [x] **Language selector (GIGW / PMFBY)** — `LanguageSelector` in header with 12 languages (English, Hindi + 10 scheduled languages). English/Hindi via `i18next` + JSON locale files; regional languages via Google Translate (standard GoI portal pattern). Persists in `localStorage`, sets `html[lang]`.
- [x] **Common sample PDF downloads** — `public/documents/nbm-sample-document.pdf` (NBM-branded template via `pdf-lib`). All download buttons on Tenders/Vacancies, Training Modules, Letters, Research Papers and Reports trigger `downloadSamplePdf()`.
- [x] **Dashboard map zoom & pan** — `IndiaBambooMap.tsx`: mouse-wheel zoom (1×–8×), drag-to-pan when zoomed, +/- / reset controls (top-right), hint label. Uses `d3-zoom` + `d3-selection`; state clicks preserved at default zoom; `vector-effect="non-scaling-stroke"` keeps borders readable when zoomed.
- [x] **Dashboard metric accent gradient** — KPI labels (e.g. Total Area Ha) use Mitra gold gradient (`--gradient-mitra-gold`) matching chatbot bubble, via `MetricAccent` component + `text-gradient-mitra` utility. Shared SVG gradient defs in `SiteLayout`.
- [x] **Chatbot click-outside to close** — `BambooChatbot.tsx`: `pointerdown` listener on document closes panel when click is outside the chat window.
- [x] **Chatbot close animation** — Panel plays a `chatPanelOut` exit animation (fade + slide-down + scale, ~260ms) before unmounting. `closing` state keeps it mounted during the animation; X button, click-outside, and link clicks all trigger the animated close.
- [x] **Top utility strip redesign** — Removed redundant "Government of India · Ministry…" text (already shown in brand row below). Helpline (Kisan Call Centre & Helpline, with phone pill icon) anchors the left; Skip to Main Content · Text Size · Language sit right, separated by thin dividers. Compact mobile variant shows helpline number + text size + language.
- [x] **Gallery world-class redesign** — Modular gallery system: `GalleryHero` (stats pills, bamboo pattern), sticky glass `GalleryFilterBar` with sliding pill indicator, bento masonry `GalleryCard` grid (hero/tall/wide spans, hover zoom + caption reveal), fullscreen `GalleryLightbox` (keyboard nav, thumbnails). Data in `galleryItems.ts`, styles in `gallery.css`.
- [x] **Compact inner-page hero** — `PageHero` padding reduced (~48px → ~22px vertical), smaller title/subtitle typography, bamboo pattern overlay, tri-colour stripe. `GalleryHero` and news detail banner aligned to same compact system.
- [x] **Footer world-class redesign** — Modular `src/components/footer/` (KPI cards, social, columns). Visitors & helpline in Mitra gold gradient (`text-gradient-mitra`). Glass KPI cards, gold-accent column headings, 2-col quick links, hover animations, bamboo pattern background, Digital India in bottom bar.
- [x] **Farmer CTA bridge section** — `FarmerCtaSection.tsx`: gradient bridge mint→forest between Resources and footer; glass card with gold accent bar, farmer image panel, mitra gold eyebrow pill, refined buttons. `farmer-cta.css`.
- [x] **Impact stats redesign (NBM by the Numbers)** — `ImpactStatsSection` + `ImpactStatCard`: glass cards, mitra gold values (`text-gradient-mitra`), custom `BambooStatIcons`, count-up animation, staggered entrance, shine sweep, gold top accent, indexed cards, ambient glow. `impact-stats.css`, `nbmStats.ts`.
- [x] **Impact stats page-hero background** — Replaced flat green gradient with shared `page-hero` bamboo photo canopy (tri-colour stripe, overlay, fade) matching inner-page headers; header uses `page-hero__eyebrow`, `page-hero__accent`, `page-hero__title`.
- [x] **Impact stats WINDS-style compact tiles** — PMFBY-inspired short cards: themed visual band + caption strip; per-metric gradients (area, states, nursery, funds); `IndiaMapThumbnail` choropleth from existing `public/geo/india-states.geojson` (LGD/Census boundaries) on map card linking to `/dashboard#map`.
- [x] **Impact stats contrast + India map card (PMFBY WINDS-style)** — Redesigned metric cards from translucent green-on-green to cream/white cards on deep forest background for readable contrast. Added 5th clickable “India Bamboo Map / State Analytics” card with India silhouette preview band + map icon; links to `/dashboard#map`. Dashboard map section gained `id="map"` + `scroll-mt-28` for hash scroll. Responsive grid: 2-col mobile (map card centered full-width), 3-col md, 5-col lg. Files: `ImpactStatCard.tsx`, `ImpactStatsSection.tsx`, `impact-stats.css`, `nbmStats.ts`, `BambooStatIcons.tsx`, `dashboard.tsx`. Build + browser verified.
- [x] **Fix homepage "This page didn't load" error** — During impact-stats refactor, `useReveal` in `index.tsx` was accidentally broken (`return` outside function). Restored full `useReveal` hook; build and homepage verified locally + production.
- [x] **Hide homepage sections + chatbot (temporary)** — Commented out `<QuickServicesSection>` and `<ResourcesSection>` (Other Links) in `index.tsx`, and `<BambooChatbot>` in `SiteLayout.tsx`. Wrapped in JSX comments so they can be re-enabled later.
- [x] **Remove Farmer CTA section from homepage** — Commented out `<FarmerCtaSection>` ("Are you a farmer, entrepreneur or artisan?") in `index.tsx`.
- [x] **Header NBM logo cleanup** — Removed the "Ministry of Agriculture & Farmers Welfare" subtitle line from the NBM brand block in `SiteLayout.tsx`; "National Bamboo Mission" title now vertically centered against the emblem logo.
- [x] **Header NBM brand aesthetics** — Upgraded the NBM lockup: bilingual Hindi sub-line (राष्ट्रीय बांस मिशन) with a saffron→green gradient accent dash, gradient saffron vertical divider, emblem drop-shadow + hover glow/scale. Government-standard, balances the GoI lockup.
- [x] **Header nav redesign v2 (fix overlap)** — Removed broken `flex-1 min-w-0` equal-column squeeze that caused label overlap. Nav uses natural-width items (`flex: 0 0 auto`), `justify-content: space-evenly`, fluid `clamp()` font, hidden horizontal scroll fallback. Active = white bold on green; hover = soft tint; mega-open = gold underline. Verified 0 overlaps at 1100–1440px in browser. New `site-nav.css`: fixed unreadable active state (Tailwind class conflict — `text-secondary-foreground` was overriding `text-primary-foreground`). Active = white bold on forest green; hover = light green tint (not full fill); mega-open = subtle tint + gold underline. `justify-content: space-between` + responsive 11.5–13px font so all 11 items fit one line (verified 1024px–1440px in browser). Consolidated 5 inconsistent yellow/orange shades into one token system in `styles.css`: `--accent-warm`, `--accent-warm-on-dark` (helpline on forest), `--accent-warm-text` (Hindi on light bg). Aliased `--saffron`, `--amber`, `--gold` to same family. Applied to helpline, hero eyebrows, CTA buttons (`btn-gold`), What's New ticker, logo ring, Hindi sub-title (plain text, no ribbon/dash). All hero slide tags now use `.hero-eyebrow` with single accent color. Reworked again per feedback ("looks ugly, Hindi too small, colors minimal"): emblem now framed in a white tile with a saffron→amber→green gradient ring + green-tint shadow + hover scale; English title in deep forest-green serif (larger/bolder); Hindi sub-line enlarged to ~15px deep-saffron semibold with gradient dash. Badge height math = prior `md:h-14` (56px) so row height (`py-3`) is unchanged.
- [x] **Remove beneficiary registration & login flow** — Deleted `beneficiary-dashboard.tsx`; rewrote `login.tsx` to keep only State Login (removed Beneficiary Login, Beneficiary Registration tabs, signed-in panel, registration form, document upload). Removed "Beneficiary Dashboard" and "Beneficiary Login" items from `navMegaMenus.ts`. Updated chatbot links/knowledge (`nbmChatLinks.ts`, `nbmChatKnowledge.ts`) to reference State Login instead of beneficiary registration. State Login & MIS Login (officials' flows) kept intact.
- [x] **Header brand–nav divider spacing** — Replaced harsh `border-top` on `.site-nav` (active green pill collided with line) with a dedicated `header-divider` + gradient hairline between logo row and nav, plus bottom padding on divider and soft nav background gradient for breathing room.
- [x] **FAQ section on Guidelines & Documents** — Added `guidelinesFaq.ts` (10 sample Q&As across mission, portal, schemes, support), `GuidelinesFaqSection.tsx` (accordion, category filters, search, sidebar nav, helpline card), integrated into `/guidelines` with Documents | FAQ sub-nav and CTA; mega menu + chatbot knowledge updated.
- [x] **Fix mega menu dropdowns not showing on hover** — Root cause: `overflow-x: auto` on `.site-nav` forced `overflow-y: auto`, clipping absolutely positioned panels. Fixed by moving desktop mega menus to `MegaMenuFloatingLayer` (fixed positioning outside nav overflow), `overflow: visible` on nav, horizontal scroll on inner `.site-nav-scroll` only, and updated click-outside handler to include floating panel ref.
- [x] **FAQ in Guidelines header mega menu** — Added FAQ as fourth Browse tab (with CircleHelp icon) in `GuidelinesMegaMenu`; right pane lists 10 questions by category with links to `/guidelines#faq-{id}`; mobile menu updated; deep-link opens matching accordion item on FAQ page.
- [x] **Head Quarter contacts — NBMC context & table cleanup** — Added GIGW-style NBMC intro banner (mission role, office locations, public dealing hours, official source links); renamed table header to NBMC Official Directory; removed redundant Division column from data and table; updated helpline/footer note.
- [x] **Success Stories page (`/success-stories`)** — Full page mirroring nbm.da.gov.in/Success-Stories: 11 official PDFs in 4 state/group cards, 3 embedded videos from official MP4 URLs, custom `success-stories.css`, hero + sticky section nav, video lightbox modal. Added to Knowledge Center mega menu, index preview, chatbot links/knowledge.
- [x] **Gallery Video section (`/gallery?tab=videos`)** — Photos | Videos toggle on `/gallery` mirroring nbm.da.gov.in/Video-Gallery: 11 official videos (YouTube + MP4 from nbm.da.gov.in), `galleryVideos.ts`, `GalleryVideoSection` with category filters + modal player, `GalleryModeBar` with URL-synced `?tab=` param, dark cinematic video cards in `gallery.css`. Chatbot links/knowledge updated.
- [x] **Gallery broken videos removed** — Removed two broken YouTube entries from `galleryVideos.ts`: "PM Modi hails National Bamboo Mission at investors' summit in Guwahati" and "PM: Changes in regulatory regime of bamboo will benefit farmers".
- [x] **Gallery & Success Stories hero alignment** — Migrated `/gallery` and `/success-stories` heroes to shared `PageHero` (bamboo photo, tri-colour stripe, gold accent, fade-to-white) matching Knowledge Center and other inner pages. Extended `PageHero` with optional `leading`, `aside`, and glass `page-hero__metric` tiles; Gallery keeps interactive Photos/Videos tab metrics on the right; Success Stories keeps PDF/Video/States stats below title with back link preserved. Removed legacy `gallery-hero` and `success-stories-hero` CSS.
- [x] **Footer government portal badges** — Added official India.gov.in, MyGov, Digital India, and Make in India logos in bottom-right footer bar via `FooterGovBadges.tsx`, each linked to the respective portal (replaced ECI badge with Make in India GoI logo).
- [x] **Who's Who page (`/contact/whos-who`)** — NBM-scoped directory in 3 sections (Administrative Oversight incl. Minister/MoS/Secretary + Likhi/Verma/Gehlot; Horticulture & NBM Division; NBMC operational). MDoNER-inspired leadership pyramid with official minister portraits (agriwelfare.gov.in), profile modal, bamboo-themed cards + comprehensive directory tables below.
- [x] **Who's Who leadership pyramid polish** — Fixed minister portrait overlapping header subtitle (tier padding + absolute portrait on card edge); replaced misaligned div connectors with centred SVG org-chart (25%/75% branches matching 2-col MoS grid); lowered MoS tier spacing; Bhagirath Choudhary portrait uses `object-fit: contain` + padding so turban is not cropped; added tri-colour stripe, bamboo grid pattern, leaf accents, gold/green glow orbs, refined card gradients/shadows.
- [x] **Who's Who leadership bamboo photo background** — `front_page.png` bamboo forest as cover background with dark-green gradient overlay; cream/gold typography on dark; white frosted leader cards + gold connector lines for contrast; all minister portraits use `object-fit: contain`.
- [x] **Who's Who directory hub + resources redesign** — Light unified directory panel (cream intro, white stat chips, inline search, gold-accent heading + jump pills) and aside link cards with left accent stripe; avoids heavy dark-green blocks after leadership section. Removed redundant directory subtitle line.
- [x] **Who's Who directory hero band (prototype)** — Replaced flat white intro with forest-canopy hero: bamboo photo overlay, tri-colour stripe, glass stat tiles, elevated search bar bridging hero → tables; pattern reusable for HQ/NBMC cards.
- [x] **RTI page official document links** — Fixed three top-strip buttons with authentic URLs: RTI Act PDF (rti.dopt.gov.in), DoPT suo motu Section 4 guidelines O.M. (documents.doptcirculars.nic.in, 15.04.2013), National RTI portal (rti.gov.in). Added descriptions on cards + supplementary links sidebar (RTI Rules 2019, rtionline.gov.in, DoPT circulars).
- [x] **RTI page hero redesign** — Removed clashing flat `bg-primary` strip; official RTI act links moved to a `rti-hero-bridge` band that overlaps the standard `PageHero` fade (fixes muddy bottom / white seam). Light gov-style document cards on cream background; modular `RtiActLinks` + `rti.css`.
- [x] **On the Ground bento gallery + remove NBM by the Numbers** — Removed `ImpactStatsSection` and orphaned `ImpactStatCard`, `BambooStatIcons`, `impact-stats.css`. Consolidated 4 metrics (from `nbmStats.ts`), India map card, 4 image story cards, and 3 filler cards into a single 12-tile bento in `OnTheGroundSection` (2s focus/hover cycle, all cards visible on responsive grid, sage→forest gradient bridge). Files: `OnTheGroundSection.tsx`, `onTheGround.ts`, `on-the-ground.css`, i18n en/hi, `index.tsx`, `styles.css`.
- [x] **Who's Who compact NBMC directory** — Commented out `WhosWhoLeadership` minister pyramid (restore later). Replaced 3-section / 19-official directory with single NBMC section: Horticulture Commissioner, Additional Commissioner, Section Officer, Senior Technical Assistant. Updated page copy + HQ cross-link.
- [x] **Contact: Who's Who hidden → HQ table** — Commented Who's Who tab in `ContactSubNav`, HQ "View full Who's Who" banner, and former 8-official `headquarterContacts` list; active HQ table now shows the 4 NBMC core team entries from `whosWho.ts`.
- [x] **RTI org chart simplified** — Bamboo Mission Cell hierarchy reduced to 4-level vertical chain matching NBMC team (HC → Additional Commissioner → SO → STA) in `rti.ts`.

## Phase 4 — Advanced / Polish (GIGW 3.0) — Completed July 2026

### What was done
- [x] **Site-wide search index** — `src/lib/searchIndex.ts`: flat `SearchResult[]` built at import time from 6 data sources (news, guidelines, reports, tenders/vacancies, state contacts, research papers). Scoring function weights title matches higher.
- [x] **`/search` page** — `src/routes/search.tsx`: reads `?q=` from URL, runs `searchSite()`, shows grouped results with category filter pills, empty state, and a result count live-region. Includes "Search site" form with `role="search"`, keyboard-accessible.
- [x] **Header inline search bar** — Added `SiteSearchBar` component to `SiteLayout.tsx`: icon button in desktop utility strip opens inline input; Enter navigates to `/search?q=…`; Escape closes. Full keyboard accessible.
- [x] **YouTube caption enforcement** — `GalleryVideoSection.tsx`: iFrame embed URL appended with `&cc_load_policy=1&cc_lang_pref=en` to force CC on. Added "CC" badge on YouTube video card thumbnails. Caption note in modal footer. Native `<video>` elements get a placeholder `<track kind="captions">` establishing the workflow.
- [x] **Table accessibility audit (6 tables)** — Added `<caption>` + `scope="col"` on all `<th>` across: HQ Contacts, State Contacts, Tenders/Vacancies (+ `scope="row"` on Sr.No.), Research Papers, RTI scheme table, RTI generic `table` case, Who's Who directory table.
- [x] **Colour contrast hardening** — Footer legal links raised from `text-white/55` → `text-white/75`; "Last Updated" text raised from `text-white/45` → `text-white/60`; bottom-bar base text raised from `text-white/65` → `text-white/75`. `--muted-foreground` already at `oklch(0.45)` (safe).
- [x] **Content archival badges** — `tenders-vacancies.tsx`: `parseDMY()` + `isExpired()` helpers; expired rows greyed out (`opacity-60`), title struck-through, red "Expired" pill badge; end-date cell turns red for expired items; default view hides expired items; "Show Archived (N)" / "Hide Archived" toggle button with `aria-pressed`; active count excludes archived.
- [x] **`/help` page** — `src/routes/help.tsx`: sidebar navigation (6 sections, numbered, keyboard-accessible), content pane with Prev/Next, Quick Links sidebar. Sections: Browser Requirements, Opening PDFs, Text Size Controls, Screen Reader Access, Accessibility Widget, Reporting Issues.
- [x] **Footer Help link + i18n** — Added "Help" to the mandatory links row in `SiteFooter.tsx`; added `footer.help` key to `en.json` ("Help") and `hi.json` ("सहायता"). Footer now has 6 mandatory links: Privacy · Disclaimer · Accessibility · Sitemap · Feedback · Help.

### How to verify (checklist)
1. **Search icon** — Green header strip → click "Search" → inline input appears → type "bamboo" → Enter → `/search?q=bamboo` loads with grouped results
2. **Search keyboard** — Tab to Search button → Enter → type → Enter to go to results → Escape closes bar
3. **Search results** — Category filter pills appear; clicking a category filters the list
4. **CC badge** — `/gallery?tab=videos` → any YouTube card shows a "CC" badge in bottom-left of thumbnail
5. **CC in player** — Open any YouTube video → CC is active in the embedded player
6. **Table captions** — DevTools → inspect any data table → `<caption>` is first child of `<table>`
7. **Table scope** — Inspect `<th>` → `scope="col"` attribute present
8. **Expired badge** — `/tenders-vacancies` → expired items show red "Expired" pill, title is struck-through, row is greyed out; "Show Archived (N)" toggle is visible
9. **Archived toggle** — Click "Show Archived" → expired items appear; click "Hide Archived" → they disappear
10. **Contrast** — Footer links and copyright text are visibly brighter (≥75% white opacity)
11. **Help page** — `/help` → 6 sections in sidebar, content pane updates on click, Prev/Next buttons work
12. **Footer 6 links** — Footer bottom bar: Privacy · Disclaimer · Accessibility · Sitemap · Feedback · Help

---

## "On the Ground" Section — Full UX/UI Audit & Redesign Plan
### Audit Date: July 3, 2026 | Last updated: July 3, 2026

**Phase A status: COMPLETE** (duplicate CTAs, wrong links, auto-rotate 4.5s, bamboo z-index/overflow follow-up, dashboard hash scroll targets)

---

### Critical Bug — Bamboo Decoration Overlapping Cards

**[BUG-1] Bamboo plant ornaments (qs-side-edge) overlap card content (z-index)** — ✅ FIXED (Phase A + follow-up)
- Moved `BambooVerticalSideEdges` inside `MissionPillarsSection` + `OnTheGroundSection`; bamboo at `z-index: 1`, content at `z-index: 10`.
- Side edges no longer use negative `left`/`right`; `overflow-x: clip` on wrapper + `html`/`body`/`SiteLayout`.

---

### Content & Logic Bugs

**[BUG-2] Duplicate CTA button labels across multiple cards** — ✅ FIXED (Phase A)

**[BUG-3] Near-duplicate cards going to the same destination** — ✅ PARTIALLY FIXED (Phase A)
- `stateMap` now uses `hash: "map"`; cultivation/markets/farmer destinations corrected.
- Remaining: `states` metric + `stateMap` still both dashboard-related; cultivation vs plantation theme overlap (see BUG-6, BUG-7).

**[BUG-4] Content-destination mismatches** — ✅ FIXED (Phase A)

**[BUG-5] Content redundancy — "cultivation" tile duplicates "nurseries" metric tile** — ✅ FIXED (Phase A desc rewrite)
- Cultivation description no longer copies nurseries copy.

**[BUG-6] "cultivation" and "plantation" are both about bamboo plantations** — OPEN (Phase B)
- "cultivation" label: "Cultivation" — "Block & farm-level plantations"
- "plantation" label: "Plantation Drive" — "Block-level bamboo plantations"
- These are nearly identical in theme and content. Both exist as separate tiles with the user having no clear reason to distinguish them.

**[BUG-7] Duplicate / near-identical images on plantation-themed tiles** — OPEN (Phase B) — *reported post–Phase A*
- **Cultivation** tile (`otg-tile--cultivation`, title: "Block & farm-level plantations") uses `bamboo-cultivation.jpg`.
- **Plantation Drive** tile (`otg-tile--plantation`, title: "Block-level bamboo plantations") uses `bamboo-plantation.jpg`.
- On screen both read as the same story (block/farm plantations) and the photos look effectively the same bamboo-field imagery — users perceive duplicate cards.
- Fix: assign distinct assets per tile (e.g. nursery block, hillside plantation, farmer in field from gallery), or merge into one plantation story tile and replace the other slot with a different NBM theme (training, processing, NE park, etc.).

---

### UX / Interaction Issues

**[UX-1] Auto-rotate interval too fast (2 seconds)** — ✅ FIXED (Phase A) — now 4500ms

**[UX-2] 12 simultaneous tiles is visually overwhelming for a homepage section** — OPEN (Phase B)

**[UX-3] No section-level "Explore All" anchor CTA** — OPEN (Phase B)

**[UX-4] CTA button style flips on hover/active (inconsistent feedback)** — OPEN (Phase C)

**[UX-5] Entire section feels oversized / "zoomed in"** — OPEN (Phase B) — *reported post–Phase A*
- All tiles (small metric cards and large featured/gallery tiles) feel magnified; section dominates the homepage vertically.
- Likely causes in `on-the-ground.css`:
  - Featured tile `min-height: 320px`; map `min-height: 200px`; gallery body `min-height: 140px`
  - Image tiles `height: 130px` (110px desktop) photo bands + hover `scale(1.05–1.06)`
  - Metric stat `font-size: 1.75–2rem`; generous padding on every tile type
  - `grid-auto-rows: minmax(118px, auto)` on 12-col bento — rows stack tall
- Fix: compact density pass — reduce min-heights ~15–25%, tighten padding/typography one step, cap image hover scale, consider 10–11 tiles or shorter row spans so section height matches Mission Pillars / About bands.

---

### Visual / Design Issues

**[VIS-1] Section title doesn't match section content**
- Title: "Bamboo Processing & Cultivation across India"
- But section contains: metrics (nurseries, funds, states, area), a map, artisan economy, market linkages, farmer livelihoods, northeast focus, processing — it's NOT just processing & cultivation.
- The title creates a false expectation and misrepresents the section's actual scope.

**[VIS-2] "Featured" tile uses blue/navy colour scheme — clashes with bamboo green theme**
- The "processing" featured tile overlay uses blue gradient (`oklch(0.18 0.08 250 / 0.88)`). The entire site is in green/amber/gold palette. The blue overlay looks like a completely different design system was applied.
- Fix: Change featured tile overlay to deep forest green consistent with the site palette.

**[VIS-3] Inconsistent visual language across tile types**
- Metric tiles: tinted background + gradient number text + icon
- Featured tile: full-bleed photo + blue gradient overlay + white text
- Image tiles: photo header + white content area below
- Gallery tiles: full-bleed photo + dark green gradient overlay + white text
- Map tile: dark navy gradient + SVG thumbnail
- Four completely different visual treatments in one grid creates a jarring patchwork effect, not a cohesive bento design.

**[VIS-4] Gallery tiles (northeast, plantation) and featured tile (processing) have identical structural treatment**
- All three use `position: absolute` full-bleed images with overlay gradients, yet they're classified differently (`gallery` vs `image` vs `featured`). They look almost identical but behave differently. The `gallery` tiles have much darker overlays, creating even less differentiation.

**[VIS-5] Metric tile values are too small at desktop**
- The bearing area and nurseries tiles are 2-column span (out of 12 cols = ~16.7% width each at desktop). At this width, the `2rem` stat value is extremely cramped.
- The funds tile is 3 columns wide but displays `₹1290 Cr` which is a longer string — it overflows at tablet sizes.

**[VIS-6] The India map thumbnail is obscured by a very heavy overlay**
- `otg-tile-map-overlay` uses `oklch(0.20 0.08 220 / 0.92)` at the bottom — nearly opaque. The map thumbnail is essentially invisible behind this overlay. If the map is there, it should be visible.

**[VIS-7] Missing visual rhythm — bottom 3 tiles (northeast, plantation, farmer) are all full-bleed dark tiles** — OPEN (Phase C)

**[VIS-8] Gallery tile text unreadable — Northeast Focus & Plantation Drive** — OPEN (Phase B) — *reported post–Phase A*
- Tiles: `northeast` (`otg-tile--gallery`), `plantation` (`otg-tile--gallery`).
- White/near-white label, title, desc sit on full-bleed photos with heavy green overlay (`oklch(0.18 0.08 150 / 0.82)` at bottom) but **active/highlight state** applies bright gradient `highlight` on the whole card — text colors switch to light-on-light or get lost against busy photo mid-tones.
- Section background also darkens toward footer — compound contrast failure.
- Fix: stronger bottom scrim (darker 0–40% band), text shadow or frosted caption strip, keep readable colors in both idle + active states; test WCAG 4.5:1 on title + CTA.

---

### Accessibility Issues

**[A11Y-1] Active auto-cycling meets WCAG 2.2.2 but barely**
- Hover pauses the auto-cycle. But keyboard users have no mechanism to pause cycling (no dedicated pause button). Tab navigation to a tile will hover-stop it only for sighted mouse users.

**[A11Y-2] Low contrast in active tile descriptions**
- Active tile description uses `oklch(0.98 0.01 110 / 0.82)` (near-white at 82% opacity) on tile gradient backgrounds. Some gradient stops are quite light themselves, potentially failing 4.5:1 contrast requirement.

---

### Phase Plan for Fixing

#### Phase A — Critical Bugs ✅ COMPLETE
1. [BUG-1] Bamboo z-index + overflow — done (in-section layering, no negative offsets)
2. [BUG-2] Unique CTA labels — done (`en.json` / `hi.json`)
3. [BUG-3] Partial — `stateMap` hash, link differentiation
4. [BUG-4] Destination fixes — done (`onTheGround.ts`)
5. [UX-1] Auto-rotate 4500ms — done

#### Phase B — Content + Readability + Density ✅ COMPLETED Jul 3, 2026
1. **[VIS-8] ✅** Gallery tile overlay darkened (`0.96` bottom stop), text-shadow added to `.otg-tile--gallery .otg-tile-body` in `on-the-ground.css`.
2. **[UX-5] ✅** Compact density pass — `grid-auto-rows` 118→96px, gap 1.125→0.875rem, featured min-height 320→256px, map 200→160px, image photo 130→100px / 110→84px, gallery body 140→110px, metric 130→108px, stat font 1.75→1.5rem / 2→1.75rem, tile-body padding reduced, icon 2.25→1.875rem, title 0.9375→0.8125rem, desc 0.6875→0.625rem, CTA padding 0.4/0.7→0.3/0.6rem, border-radius 1→0.875rem, section pt/pb reduced.
3. **[BUG-7] + [BUG-6] ✅** `cultivation` tile replaced by `valueAdded` in `onTheGround.ts` — uses `bamboo-agarbatti.jpg`, `ShoppingBag` icon, links to `/knowledge-center#value-added-products`. `cultivationImg` and `Sprout` imports removed.
4. **[VIS-2] ✅** Featured tile overlay changed from navy-blue (`hue 250`) to forest green (`hue 150`) in `on-the-ground.css`.
5. **[UX-3] ✅** Footer CTA added to `OnTheGroundSection.tsx` — "Explore Full Mission Data →" glassmorphism button linking to `/dashboard`.
6. **[VIS-1] ✅** Section title/subtitle updated in `en.json` + `hi.json` to "NBM at a Glance — Impact, Reach & Stories".
7. i18n `valueAdded` key added, `cultivation` key removed in both locale files.

---

## Accredited Nursery Comprehensive Page ✅ COMPLETED Jul 3, 2026

### What was built
- **`src/data/accreditedNurseries.ts`** — Typed data module: `AccreditedNursery` / `NurserySpecies` types, 15 sample records across 8 states (Tripura, MP, Maharashtra, Assam, UP, Chhattisgarh, Telangana, Karnataka), national summary (212 nurseries / 88 species / 26,077,557 propagules), `filterAccreditedNurseries()` and `getFilterOptions()` helpers.
- **`src/lib/exportAccreditedNurseries.ts`** — SheetJS-based Excel export; flattens species sub-table into one row per species with nursery metadata repeated; column widths set; dynamic import for code-splitting.
- **`src/components/accredited-nursery/`** — Six modular components:
  - `NurserySummaryStrip.tsx` — Three KPI cards (Nurseries / Species / Propagules) with icon + saffron value + green label
  - `NurseryFilters.tsx` — Cascading Year → State → District → Block selects; child dropdowns disabled until parent selected; resets on change
  - `NurseryToolbar.tsx` — Result count, search input, `ExportExcelButton`
  - `ExportExcelButton.tsx` — Pill button with emerald left stripe, FileSpreadsheet icon, loading spinner; exports filtered dataset
  - `NurseryTable.tsx` — Full-width table: source/type colour badges, "View Certificate" button, species nested inline
  - `SpeciesStockPanel.tsx` — Compact mini-table per nursery (species name / stock / as-on / total row)
  - `NurseryPagination.tsx` — Page buttons with ellipsis, prev/next; shows entry range
- **`src/styles/accredited-nursery.css`** — Custom CSS: KPI strip, filter panel, toolbar, export button, table chrome (sticky header, zebra rows, hover), species sub-table, badges, pagination, expand icon — all using existing design tokens (primary green, saffron).
- **`src/routes/accredited-nursery.tsx`** — Route at `/accredited-nursery`: `PageHero` + back link to `/dashboard#nurseries`, `SectionHero` with aside metrics, KPI strip, directory panel (filters → toolbar → table → pagination). Client-side filter/search/pagination state; cascading filter resets.
- **`src/components/dashboard/StateBarCharts.tsx`** — `HorizontalBarPanel` extended with optional `expandTo` / `expandLabel` props; nurseries card shows `Maximize2` icon linking to `/accredited-nursery`.
- **`src/styles.css`** — Added `@import "./styles/accredited-nursery.css"` globally.
- **`package.json`** — Added `xlsx@^0.18.5` dependency (installed with `--legacy-peer-deps`).

### Design decisions
- Government-friendly aesthetic: forest green primary headers, saffron/gold KPI numerals, subdued filter panel (4% green tint), no new brand colours — only existing CSS variables.
- Source/type badges are coloured pills (green tint = Seed, blue = Vegetative, teal = Both; amber = Farmer, indigo = Department, orange = Private).
- Species stock shown as an always-visible nested mini-table inline in the last column (faithful to official site); no JS accordion needed on desktop.
- Export button has an emerald left stripe, FileSpreadsheet icon, saffron border glow on hover; exports the full filtered set (not just the current page).

---

## Agarbatti Stick Comprehensive Page ✅ COMPLETED Jul 3, 2026

### What was built
- **`src/data/agarbattiStickUnits.ts`** — Typed MIS data: `AgarbattiStickUnit` type, 15 sample units across 10 states (Assam, Maharashtra GAP, MP, Gujarat, Tripura, UP, Karnataka, Odisha, Telangana, Mizoram), national summary (486 enterprises / 412 running / 1,240 MT capacity / 892 MT production), filter helpers and `topStatesByAgarbattiCapacity()` / `topUnitsByCapacity()`.
- **`src/lib/exportAgarbattiSticks.ts`** — SheetJS Excel export (one row per unit, filtered dataset).
- **`src/components/agarbatti-stick/`** — Six modular components: `AgarbattiSummaryStrip`, `AgarbattiFilters`, `AgarbattiToolbar`, `AgarbattiTable`, `AgarbattiPagination`, `ExportExcelButton`.
- **`src/components/dashboard/AgarbattiStickPreview.tsx`** — Dashboard preview row: 4 mini KPIs, top-7 states bar chart (saffron gradient), top-5 units list, expand icon → `/agarbatti-stick`.
- **`src/routes/agarbatti-stick.tsx`** — Full page at `/agarbatti-stick`: PageHero, SectionHero, KPI strip, cascading filters, searchable table with status/owner badges, production fill bars, NBM support pill, pagination, Excel export.
- **`src/styles/agarbatti-stick.css`** — Warm saffron-accented styles (`as-` prefix); filter panel with saffron tint; dashboard preview split layout.
- **`src/routes/dashboard.tsx`** — Inserted `<AgarbattiStickPreview />` between bar charts and state table; hash anchor `#agarbatti-stick`.
- **`src/styles.css`** — Added `@import "./styles/agarbatti-stick.css"`.

### Design decisions
- Saffron top stripe and warm KPI numerals differentiate agarbatti from nursery (green) while staying on-brand.
- Production column shows capacity vs actual with subtle gradient progress bar.
- Status badges: green = Running, grey = Closed, amber = Under Setup.
- Dashboard preview is half-and-half: chart + KPIs left, ranked unit list right.

---

## Bamboo Plantation Comprehensive Page ✅ COMPLETED Jul 3, 2026

### What was built
- **`src/data/bambooPlantations.ts`** — Extended with `ARPABOP0073` (Sourav Sarkar, Papum Pare/Borum) screenshot record; renumbered srNo; added `topStatesByPlantationArea()` and `topPlantationsByArea()` helpers. National summary: 1,328 plantations / 7,611.16 Ha / 100 species / 1,323,618 culms.
- **`src/lib/exportPlantations.ts`** — Already existed; wired via `ExportExcelButton` (species-flattened `.xlsx` export).
- **`src/components/bamboo-plantation/`** — Seven modular components: `PlantationSummaryStrip`, `PlantationFilters`, `PlantationToolbar`, `PlantationTable`, `PlantationSpeciesPanel`, `PlantationPagination`, `ExportExcelButton`.
- **`src/components/dashboard/BambooPlantationPreview.tsx`** — Dashboard preview row: 4 MIS KPIs, top-7 states by area chart (bark gradient), top-5 plantations list, expand → `/plantation`; `id="plantations"` hash anchor.
- **`src/routes/plantation.tsx`** — Full page at `/plantation`: PageHero, SectionHero, KPI strip, cascading filters, searchable table with person-in-charge block, irrigated/category badges, nested species culms table, pagination, Excel export.
- **`src/styles/bamboo-plantation.css`** — Earth/bark-accented styles (`bp-` prefix); warm KPI cards; preview split layout.
- **`src/components/dashboard/StateBarCharts.tsx`** — Expand icon on Bamboo Plantation bar chart → `/plantation`; `id` moved to preview row.
- **`src/routes/dashboard.tsx`** — Inserted `<BambooPlantationPreview />` between bar charts and agarbatti preview; KPI card id renamed to `kpi-plantations` to avoid hash conflict.
- **`src/styles.css`** — Added `@import "./styles/bamboo-plantation.css"`.

### Design decisions
- Bark/earth brown accent stripe distinguishes plantation from green nursery and saffron agarbatti.
- Person In-charge cell shows name + phone/email/address in muted sub-lines (faithful to official portal).
- Species column uses nested mini-table with Total Culms row (mirrors accredited nursery species panel).
- Two dashboard entry points: bar chart expand icon + full preview row (agarbatti pattern + nursery expand).

---

## Dashboard — Accredited Nurseries Preview Section ✅ COMPLETED Jul 3, 2026

### What changed
- **`src/components/dashboard/StateBarCharts.tsx`** — Removed redundant Bamboo Plantation and Accredited Nurseries small bar-chart cards; beneficiaries card now spans full width (unchanged content/export).
- **`src/components/dashboard/AccreditedNurseryPreview.tsx`** — New dedicated preview section (mirrors plantation/agarbatti pattern): MIS KPIs (212 nurseries / 88 species / 26M stock / states covered), state-wise nursery chart, top-5 nurseries by propagule stock, expand → `/accredited-nursery`; `id="nurseries"` hash anchor.
- **`src/data/accreditedNurseries.ts`** — Added `topNurseriesByStock()` helper.
- **`src/styles/accredited-nursery.css`** — Added `an-preview__*` dashboard preview layout styles (green accent).
- **`src/routes/dashboard.tsx`** — Wired `<AccreditedNurseryPreview />` between plantation and agarbatti preview rows.

### Dashboard layout order (bar charts row onward)
1. Beneficiaries by State (full width)
2. Bamboo Plantation preview (comprehensive)
3. Accredited Nurseries preview (new)
4. Agarbatti Stick preview
5. State-wise progress table

---

## "On the Ground" Homepage Section — Card & Link Overhaul ✅ COMPLETED Jul 3, 2026

### What changed
- **`nurseries` metric tile** → `/accredited-nursery` (was `/dashboard#nurseries`); icon updated to `Flower2`; accent updated to NBM green; label/title/cta updated to reflect dedicated registry page.
- **`valueAdded` image tile** (uses agarbatti photo) → `/agarbatti-stick` (was `/knowledge-center#value-added-products`); accent updated to saffron orange to match agarbatti theme; label/title/cta updated to "Agarbatti Production / Bamboo agarbatti stick units / View Agarbatti MIS".
- **`plantation` gallery tile** → `/plantation` (was `/guidelines` — broken/misleading); label/title/cta updated to "Plantation MIS / Bamboo plantation records / View Plantation MIS".
- **`northeast` gallery tile** — content repurposed from "Northeast Focus" to "Bamboo Gallery"; link stays `/gallery` but accent color changed from purple `oklch(0.48 0.18 280)` to teal `oklch(0.46 0.15 204)` (fixed purple-purple color collision with `markets` tile).
- **`markets` image tile** → `/knowledge-center#value-added-products` (was `/products` — duplicate with `processing`); label/cta updated to "Value Chain / Explore Value Chain".
- **`en.json`** updated for all 5 tile IDs above.

### Duplicate link audit after changes
| Tile | Destination |
|------|------------|
| stateMap | /dashboard#map |
| bearingArea | /dashboard#area |
| states | /dashboard#states |
| nurseries | **/accredited-nursery** ✅ new |
| funds | /reports |
| processing | /products |
| valueAdded | **/agarbatti-stick** ✅ new |
| artisan | /success-stories |
| markets | /knowledge-center#value-added-products (fixed dup) |
| northeast | /gallery |
| plantation | **/plantation** ✅ new |
| farmer | /dashboard#beneficiaries |

All 12 destinations are now **unique**.

---

## Reports → MIS Portal Navigation ✅ COMPLETED Jul 3, 2026

- **`src/data/reportPortals.ts`** — Portal link config for plantation, agarbatti, nursery sections (route, copy, stats, accent).
- **`src/components/reports/ReportPortalBanner.tsx`** — Reusable banner with left accent stripe, MIS eyebrow, description, stat line, CTA button.
- **`src/styles/reports.css`** — Sector-accented portal banner styles (bark / saffron / green).
- **`src/routes/reports.tsx`** — Renders `ReportPortalBanner` between section header and document list for the three sector cards.

---

## Training Modules Redesign ✅ COMPLETED Jul 3, 2026

### What was built
- **`src/data/trainingModules.ts`** — Official-aligned data: 4 partner programmes (BEDF Baihar, NID, NECBDC, ICFRI), 16 PDF URLs from `nbm.da.gov.in/Documents/Training/`, stats helper, banner image map.
- **`src/styles/training-modules.css`** — Page wash, partner cards, PDF rows, sidebar, info band, related links (mirrors success-stories aesthetic).
- **`src/components/training-modules/`** — Modular components:
  - `TrainingModulesPreview.tsx` — KC teaser with 4 programme names + stats + CTA
  - `TrainingModuleGroupCard.tsx` — Hub cards with banner, doc previews, link to detail
  - `TrainingModulePdfList.tsx` — Numbered accessible PDF rows
  - `TrainingModulesPage.tsx` — Full hub at `/training-module`
  - `TrainingModuleDetailPage.tsx` — Per-programme detail with sidebar + PDF list
- **`src/routes/training-module.tsx`** — Hub route
- **`src/routes/training-module.$groupId.tsx`** — Detail route with loader + 404
- **`src/routes/knowledge-center.index.tsx`** — Replaced 6 placeholder cards with `TrainingModulesPreview`
- **`src/data/knowledgeCenter.ts`** — Removed fake training module items
- **`src/components/KnowledgeCenterMegaMenu.tsx`** — Links to `/training-module` and per-group detail pages
- **`src/components/MegaMenuPrimitives.tsx`** — `MegaMenuItemLink` accepts optional `params`
- **`src/lib/searchIndex.ts`** — Training category + hub/groups/docs indexed
- **`src/routes/search.tsx`** — Training category icon/colour
- **`src/routes/sitemap.tsx`** — Training Modules → `/training-module`

### Design approach
- Two-level IA matching official site: hub (4 sections) → detail (PDF list per section)
- Anti-empty-page: hero metrics, 2×2 rich cards, skill-development info band, related links, detail sidebar with sibling navigation
- Government-friendly palette: primary green, saffron accents, cream page wash, white modular cards

### Fix Jul 3, 2026 — KC preview visual redesign
- Replaced bare two-column list/stats layout with modular **2×2 programme cards** (banner images, partner labels, PDF badges, teaser doc links).
- Added KPI strip, saffron/green gradient CTA bar, and dedicated `training-modules-kc-preview.css`.
- **Route fix:** `training-module.tsx` converted to layout with `<Outlet />`; hub moved to `training-module.index.tsx` so `/training-module/$groupId` detail pages render correctly (child was blocked before).
- **Hub cards:** "View all documents" expands inline list of all official PDFs; each row links directly to `nbm.da.gov.in/Documents/Training/*.pdf`. "Programme page" links to full detail view.

---

### Official website policies (2026-07-05)
- [x] **Legacy policy text** — Added `src/data/websitePolicies.ts` with official Copyright, Hyperlinking, Privacy and Terms of Use text from the previous nbm.da.gov.in portal (DA&FW / NIC wording preserved).
- [x] **`/website-policies` page** — Consolidated policies page with legacy GoI orange-banner section layout (`OfficialPolicySection` + `website-policies.css`).
- [x] **Privacy Policy updated** — `/privacy-policy` leads with official privacy text; portal-specific cookies/DPDPA sections kept as supplementary.
- [x] **Disclaimer updated** — `/disclaimer` now includes official Copyright, Hyperlinking and Terms of Use sections; ownership/contact retained.
- [x] **Cross-links** — Sitemap mandatory pages, accessibility sidebar, and policy sidebars link to `/website-policies`.

---

### Global bamboo page-transition loader (2026-07-03)
- [x] **`BambooPageLoader` component** — Created `src/components/BambooPageLoader.tsx`. Uses `useRouterState({ select: s => s.isLoading })` from TanStack Router to detect any in-flight navigation.
- [x] **Visual design** — Bamboo-green full-screen overlay (dark backdrop + blur), animated SVG bamboo grove (7 swaying stalks with node rings + leaves), animated falling leaf particles, animated "Loading…" bounce dots.
- [x] **Top progress bar** — Thin 3px gradient bar (green → pale-green → gold) running `bamboo-progress` keyframe animation across the viewport top.
- [x] **Minimum flash guard** — 350 ms debounce on hide so the loader never flickers on fast navigations.
- [x] **Mounted globally** — Added `<BambooPageLoader />` inside `RootComponent` in `src/routes/__root.tsx`, so it covers every page transition across the entire platform.

---

### Shared KPI metrics strip (2026-07-03)
- [x] **Unified `KpiMetricsStrip`** — Extracted dashboard KPI panel design into `src/components/kpi-metrics/KpiMetricsStrip.tsx` + `src/styles/kpi-metrics.css` (saffron→green top accent, gradient cards, icon badges, watermarks, delta pills).
- [x] **Replicated across MIS pages** — `PlantationSummaryStrip`, `NurserySummaryStrip`, `AgarbattiSummaryStrip`, and `DashboardKpiStrip` now all use the shared component with page-specific titles/meta and data.
- [x] **Removed legacy KPI CSS** — Deleted `bp-kpi-*`, `an-kpi-*`, `as-kpi-*` blocks from page stylesheets and removed `dashboard.css` (superseded by `kpi-metrics.css` imported globally in `styles.css`).

---

#### Phase C — Visual Polish
8. [VIS-2] Featured processing tile — forest green overlay (not blue)
9. [VIS-3] Unify tile types (metric vs story)
10. [VIS-6] Map overlay — show choropleth
11. [VIS-5] Metric stat sizing in narrow columns
12. [UX-4] Consistent CTA button style (no idle/active flip)
13. [A11Y-1] Keyboard pause for auto-cycle
14. [VIS-7] Bottom row visual rhythm

### Phase B — How to verify when done
1. **Gallery readability** — Northeast + Plantation tiles: label, title, description, and CTA readable at rest and while auto-highlight cycles.
2. **Section height** — On the Ground should feel similar in visual weight to Mission Pillars, not 2× taller.
3. **No duplicate plantation photos** — Cultivation vs Plantation (or merged tile) show clearly different imagery or only one plantation story card exists.
4. **Unique stories** — No two tiles with nearly identical titles + same-looking photo.
5. **Footer CTA** — Single clear next step at bottom of section.
