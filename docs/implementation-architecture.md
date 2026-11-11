# ASIAN CASTLE — Implementation Architecture (Audit)

**Type:** architectural audit only. No source files were changed.
**Baseline audited:** commit `8b629c8` "approved Stitch homepage as React components".
**Date:** 11 Nov 2026
**Baseline health:** `npm run build` passes (JS 87 KB gzip, CSS 7.5 KB gzip). `npm run lint` is clean.

---

## 0. Which experience is "approved"? (decide before Phase 1)

The repo contains two designs. They don't agree.

| Source | Status in repo | Direction |
|---|---|---|
| `stitch/DESIGN.md` + `stitch/code.html` → `src/` | Marked **client approved** (`tokens.css`, commit message). Fully implemented. | Dark "Heritage Hospitality Sanctuary": burgundy + brass on espresso, EB Garamond + DM Sans, single page with 9 sections |
| `docs/website-plan.md` | **Draft v2, awaiting approval.** Written before Stitch, and refers to a `src/App.tsx` prototype that no longer exists. | "Through the Gate": ivory/burgundy day-to-night, Cormorant Garamond, Gatekeeper nav, Castle Day dial, `/menu` page, mobile dock |

**This plan treats Stitch as the approved baseline.** Ideas from `website-plan.md` are listed only as *candidates* (Phase 5) because they would add tokens, fonts and sections that haven't been approved.

`CLAUDE.md` also conflicts with the code. It says "Next.js static export", "data/menu.js, lib/site.js", "leaf #0F2B21 / gold #C8A24A / rice #ECE4D2" and "Cormorant Garamond + Hanken Grotesk". None of these match the approved Stitch system. **Recommendation:** remove those lines from `CLAUDE.md` (needs your OK) so future sessions don't follow them.

---

## 1. What exists today

### 1.1 Pages and routes

- One page, one Vite entry (`index.html` → `src/main.tsx` → `App` → `TableOrderProvider` → `HomePage`). No router.
- Navigation uses hash anchors from `sectionIds` in `src/data/site.ts`: `arrival`, `integrity`, `heirloom-menu`, `direct-ring`, `reservations`, `reservation-form`.
- `SignaturePot`, `ChefSelections` and `ProximityHub` have **no anchor id**, so they can't be linked to. Their heading ids are hardcoded (`signature-title`, `chef-selections-title`, `proximity-title`).
- Client-side rendering only: `#root` is empty until JS runs.

### 1.2 Component tree

```
App
└─ TableOrderProvider                      features/table-order (context, in-memory)
   └─ HomePage                             section order + data wiring
      ├─ SiteHeader                        layout · fixed glass bar, nav ≥1280px only
      ├─ main
      │  ├─ Hero                 #arrival  HearthShader (WebGL), CoverImage, ButtonLink, Chip
      │  ├─ IntegrityCode        #integrity
      │  ├─ SignaturePot                   DumSteam (CSS/SVG), Button → addItem
      │  ├─ ChefSelections                 DishCard[feature] → addItem
      │  ├─ MenuRegistry         #heirloom-menu  local filter state, DishCard[registry]
      │  ├─ WhatsAppDispatch     #direct-ring    wa.me links, addItem
      │  ├─ ProximityHub                   range slider → utils/delivery.estimateDelivery
      │  └─ Reservation          #reservations   form (alert + reset) ─ children: CommunityConnect
      ├─ SiteFooter
      └─ TableOrderToast                   ui/Toast, role=status
```

UI primitives (`components/ui`): `Button`, `ButtonLink` (they share `buttonClassName`), `Chip`, `CoverImage`, `DishCard`, `Eyebrow`, `Icon`, `Section`, `Container`, `SectionHeader`, `Toast`.

Data flow is one-directional. All copy lives in `src/data/{site,home,dishes,images}.ts` and is typed by `src/data/types.ts`. Sections receive `content` props and callbacks (`onAddItem` / `onAddDish`). Separation of content from presentation is good.

### 1.3 CSS and design tokens

- `design-system/tokens.css` holds the Stitch Material-style roles (surface ladder, primary/secondary/tertiary), spacing, radii, shadows, blur and motion durations. One easing curve.
- `design-system/typography.css` holds 10 `type-*` utility classes. Only the display and headline-lg classes step down below 768px.
- `global.css` holds a Tailwind-preflight-style reset, focus ring, `.sr-only`, and a **global reduced-motion kill switch** (animations and transitions → 0.01ms).
- Each component has a CSS Module. Breakpoints are 640 / 768 / 1024 / 1280. They are hardcoded in media queries and documented in `tokens.css`.
- Small drift from `DESIGN.md`: the doc's brass is `#B69A68` and ivory `#F7F1E8`, but the tokens use the rendered `#e1c28d` / `#eae1dd`. The code follows the rendered Stitch output, which is correct. Just don't "fix" it to match the doc.

### 1.4 Fonts and icons

- Google Fonts `<link>`: DM Sans (variable) + EB Garamond (variable, with italics). Uses `display=swap` and preconnect.
- Material Symbols Outlined, subset by `icon_names=` and kept in sync by hand with `design-system/iconNames.ts`. Uses `display=block`, so icons are invisible until the font loads, and show as raw ligature text ("shopping_bag") if it fails.
- `lucide-react` is installed but **never imported**. Two icon systems would split the visual language.

### 1.5 Assets

| Location | Contents | Used? |
|---|---|---|
| `src/data/images.ts` | 12 images hotlinked from `lh3.googleusercontent.com/aida-public` (Stitch AI stand-ins, all `placeholder: true`): logo, dining room, 9 dishes, Instagram QR | **Yes. They can expire at any time.** |
| `public/menu/` | 103 dish photos (8.8 MB). Widths 236–1600 px, mixed ratios, filenames with spaces, `.JPG`/`.webp`/`.jpg` mix, a duplicate (`fish pollichathu.jpeg` + `.jpg`) | No |
| `public/cam-assets/logo.png` | 900×462 raster logo | No (the header uses the Stitch placeholder) |
| `public/cam-assets/LOGO.pdf` | 1.4 MB, possibly vector | No |
| `public/cam-assets/*.mp4` | Inauguration videos: 1024×576 / 68 s / 14 MB and 464×832 / 93 s / 10 MB, both with audio | No |
| `public/NEW MENU.xlsx` | Real menu (102 items, 18 categories, serving windows) | No |
| `public/favicon.svg`, `public/icons.svg`, `src/assets/{hero.png,react.svg,vite.svg}` | Vite template leftovers. **The favicon is the Vite logo.** | Favicon only |

### 1.6 Navigation and responsive behaviour

- The header nav is `display:none` below **1280px**, and the Reserve CTA is hidden below **640px**. **On phones and tablets there is no section navigation at all**, only the logo and a cart icon. (The Stitch source has the same gap: `hidden xl:flex`.)
- The active nav state changes only on click (`HomePage` keeps `useState`). It doesn't follow scrolling.
- Grids collapse cleanly: 1 → 2 → 3/4 columns at 768/1024/1280. The hero uses `min-height: 92vh` (the mobile URL bar makes it jump).
- `scroll-padding-top: var(--header-height)` handles anchor offsets. Smooth scroll is disabled under reduced motion.

### 1.7 Reservation and ordering

| Flow | Behaviour today | Problem |
|---|---|---|
| Reservation form | `preventDefault`, then `window.alert(successMessage)`, then `reset()` | **The data is thrown away, but the alert says "A WhatsApp confirmation token has been dispatched".** That misleads guests. Date has no `min`. |
| Table order (cart) | `TableOrderProvider` adds items to an in-memory array and shows a toast. The header shows a count. | The cart button has **no action**: no sheet, no quantities, no removal, no checkout, no persistence. |
| WhatsApp orders | `wa.me` links with prefilled messages (Hero, Dispatch offers, Footer) | Work, but the WhatsApp number is a **placeholder** (`site.ts`) |
| Sides info | `window.alert(sidesAction.message)` | Blocking native alert inside a luxury UI |
| Delivery estimate | Slider → `estimateDelivery()` (tiers, ETA, "freshness") | The formula and fees are design copy. The map tile is **empty** (no image or embed). `aria-live` on the `<dl>` announces every slider step. |
| Partner chips (Hero) | `<Chip interactive>`, rendered as `<button>` | **Dead buttons** (no `onClick`, no href) |
| Account avatar | `role="img"` "Account" | A non-functional affordance |

### 1.8 Animation

- **Motion (`motion@14`) is installed but not used.** Every current animation is CSS or WebGL:
  - `HearthShader`: a WebGL ambient field. It pauses off-screen (IntersectionObserver), draws one still frame under reduced motion, and cleans up on unmount. Good.
  - `DumSteam`: two SVG paths with infinite CSS keyframes (transform/opacity).
  - Hero: `pulse` live dot (infinite) and `bounce` rating card (infinite, 4 s).
- The global reduced-motion rule neutralises all CSS animation. The shader handles its own case.

### 1.9 Image and video loading

- `CoverImage`: `loading="lazy"` by default; `priority` → `eager` + `fetchPriority="high"` (hero only). `decoding="async"`. No `srcset`/`sizes`, no width/height (parents hold the aspect ratio, so CLS is fine).
- Header logo is eager, 40×40. The QR is lazy at 192×192.
- No video anywhere. No preload of the LCP image, and no preconnect to `lh3.googleusercontent.com`.

### 1.10 Tests

- `tests/home.spec.ts` exists, but there is **no `playwright.config.ts`** (no `webServer`, no base URL).
- The assertion `/Vite|ASIAN CASTLE/` is case-sensitive. The title is "Asian Castle Restaurant · Sharjah", so **the test fails** even with a server running.

---

## 2. Components to preserve (no changes)

These work, match the approved design, and have clean contracts. Extend them only through new optional props.

| Component / module | Why preserve |
|---|---|
| `design-system/tokens.css`, `typography.css`, `global.css` | The approved token set and the reduced-motion safety net |
| `ui/Button`, `ButtonLink`, `buttonClassName` | One style source for links and buttons |
| `ui/Section`, `Container`, `SectionHeader`, `Eyebrow` | Layout rhythm used by every section |
| `ui/Icon` + `iconNames.ts` | One place to swap the icon set |
| `ui/Toast` | Accessible (always mounted, `role=status`) |
| `ui/CoverImage` | Correct lazy/priority split. Extend later with optional `srcSet`/`sizes` |
| `effects/HearthShader` | Already pauses off-screen and respects reduced motion |
| `effects/DumSteam` | Cheap compositor-only animation |
| `sections/IntegrityCode`, `ChefSelections`, `CommunityConnect` | Static, data-driven, responsive |
| `layout/SiteFooter` | Data-driven (small fixes below come from data, not markup) |
| `features/table-order/*` | A sound context, provider and hook. Extend its state, keep the `addItem` signature |
| `data/types.ts` content model, `utils/*` | Every new feature should go through these |

## 3. Components that need enhancement (same design, fix behaviour)

| # | Component | Enhancement | Contract impact |
|---|---|---|---|
| E1 | `SiteHeader` | Mobile/tablet navigation below 1280px (see N1). Show the real logo. Cart button opens the Table Order sheet (N3). Remove or hide the fake avatar. | Adds optional `onOpenCart`. Existing props unchanged. |
| E2 | `HomePage` | Replace click-only `activeSection` with a scroll-spy hook (N2). Add the missing anchor ids for Signature, Chef, Proximity. | Internal only |
| E3 | `Reservation` | Replace `alert` + discard with **"build a WhatsApp message"** from the form fields. Fix the success copy so it doesn't claim a confirmation was sent. Add `min` = today on the date. Use inline success state, not `alert`. | Adds optional `whatsappNumber`. `children` slot kept. |
| E4 | `SignaturePot` | Replace `window.alert` with an inline disclosure (`<details>` or `aria-expanded` panel) for the sides list | None |
| E5 | `Hero` | Partner chips: either link to real listing URLs (data) or render as non-interactive. Bounce/pulse: limit to a few iterations or keep under the reduced-motion rule (design call). `min-height: 92svh` with a `vh` fallback. | Adds `href` to `partners.items` in data |
| E6 | `ProximityHub` | Give the map tile a real static map image or a click-to-load map. Move `aria-live` to a single summary line. Add the missing section id. | None |
| E7 | `MenuRegistry` | Read dishes from a real menu data file (Phase 4). Empty state for a filter with no results. Optional filter transition (N6). | `MenuRegistryContent` unchanged; data source changes |
| E8 | `DishCard`, `WhatsAppDispatch` add buttons | Brief "added" state on the button (icon swap to `check`) as well as the toast | None |
| E9 | `TableOrderProvider` | Quantities, remove, total, `localStorage` persistence (wrapped in try/catch) | Adds fields; `items`, `addItem`, `toastVisible`, `lastAdded` kept |
| E10 | `SiteFooter` data | Email as `mailto:`. Legal links point at real pages or are hidden until they exist. © year. | Data only |
| E11 | `index.html` | Real favicon from the logo, OG image, preconnect to the image host until images are self-hosted | — |
| E12 | Hardcoded strings in components | `"shopping_bag"`, `"person"`, `"Filter dishes by cuisine"`, `"Add … to your table order"` → move to `data/` when each file is next touched | Data only |

## 4. Components that need new interactions

All new work stays inside existing tokens. Anything that needs a new token is marked ⚑ and needs approval.

| # | New piece | Location | Interaction | Motion | Reduced motion |
|---|---|---|---|---|---|
| N1 | `MobileNav` (sheet) | `components/layout/MobileNav/` | Menu button in the header (<1280px) opens a native `<dialog>` listing `header.nav` + Reserve + WhatsApp. Esc and backdrop close it. Focus returns to the trigger. | Slide/fade 300 ms (`--duration-medium`) | Instant |
| N2 | `useActiveSection` hook | `src/hooks/` | IntersectionObserver with a centre-line rootMargin. Drives `aria-current` in the header and MobileNav. | — | — |
| N3 | `TableOrderSheet` | `features/table-order/` | Cart button → `<dialog>` with items, qty ±, remove, total, **"Send order on WhatsApp"** (prefilled message via `whatsappLink`). Live region announces changes. | Sheet enter 300 ms | Instant |
| N4 | `buildReservationMessage` util | `utils/` | Pure function: form data → WhatsApp text. Used by E3. Unit-testable. | — | — |
| N5 | `SkipLink` | `layout/` | "Skip to menu" as the first focusable element (`#heirloom-menu`) | — | — |
| N6 | `Reveal` wrapper (optional) | `components/motion/` | One-time section entrance: opacity + 16 px rise, using Motion `LazyMotion` + `m.div` + `whileInView` (`once: true`) | 500 ms (`--duration-slow`) | Rendered visible, no animation |
| N7 | Menu filter transition (optional) | `MenuRegistry` | `AnimatePresence` + `layout` on the grid when the category changes | 300 ms | Instant swap |
| N8 | `ClickToLoadMap` | `ui/` | Static preview → on click, loads the Google Maps iframe (no third-party load before consent) | — | — |

Rule for N6/N7: Motion is used **only** where it helps comprehension (entrances, list changes, sheets). No idle loops and no scroll hijacking. Every Motion component checks `useReducedMotion()` as well as the CSS rule.

## 5. Missing assets

| Asset | Needed for | Status |
|---|---|---|
| **Logo, vector (SVG)** | Header, footer crest, favicon, OG image | `logo.png` (900×462, not square) and `LOGO.pdf` exist. Check if the PDF contains vectors and extract the SVG. Need a square mark for the 40×40 header slot. |
| **Real photography** for 12 slots: dining room (hero, 4:5 arch), signature biryani (1:1), 9 dishes (4:3 cards) | Every image currently comes from the Google AI CDN | `public/menu/` has candidates, but sizes (236–1600 px), ratios and ownership are unverified. Need ≥1600 px originals at 4:5, 1:1, 4:3. |
| Instagram QR | CommunityConnect | Hotlinked placeholder. Generate a static SVG from the **confirmed** handle (no runtime library). |
| Map preview image | ProximityHub, N8 | Missing. The tile is empty. |
| OG / social image (1200×630) | `index.html` | Missing |
| Favicon set (SVG + 180 px apple-touch) | `index.html` | Currently the Vite logo |
| Self-hosted WOFF2 fonts | Performance | Currently on Google Fonts |
| Hero video (optional) | Hero | Inauguration footage is 68–93 s with audio, 10–14 MB. Would need a 6–8 s muted loop, ≤1.5 MB, with a poster. **The design has no video slot, so this needs approval.** |
| Verified business facts | Copy in `site.ts`, `home.ts`, `dishes.ts` | Phone/WhatsApp, Instagram, email, Maps link, ratings ("4.9 / 2,400+"), "100% Halal", "Zero MSG", valet, delivery tiers/ETAs, partner listing URLs, and dish names/prices (the xlsx prices differ from the design) |
| Legal pages | Footer links | `href="#"` |

## 6. Performance risks

| Risk | Severity | Detail | Mitigation |
|---|---|---|---|
| **39 MB `dist/`** | High | Everything in `public/` ships: 24 MB of unreferenced mp4s, the xlsx, a 1.4 MB PDF and 8.8 MB of unused photos | Move raw source assets to a non-public folder (e.g. `assets-source/`). Only optimised, referenced files go in `public/`. |
| Hotlinked placeholder images | High | Third-party CDN, can expire, no `srcset`, LCP image cross-origin without preconnect | Self-host optimised AVIF/WebP with `srcset`/`sizes`. Preload the hero image. |
| CSR-only render | Medium | Empty HTML until JS runs: slower LCP, weak SEO | Build-time prerender with `react-dom/server` (no new dependency) |
| Render-blocking Google Fonts + Material Symbols `display=block` | Medium | FOIT on icons; extra connection | Self-host WOFF2 subsets with preload. Icons `display=swap`, or consider inline SVG icons later. |
| Stacked `backdrop-filter` | Medium | Header, hero pill/cards, dish tags, toast, map pin, plus three 64 px blurred glow divs | Test scroll on low-end Android. Fall back to solid surfaces under `@supports not (backdrop-filter)` and on small screens if janky. |
| WebGL shader on mobile | Low–Med | Runs every frame while the hero is visible, at CSS-pixel size | Already pauses off-screen. Consider a static frame on `pointer: coarse` or when `saveData` is on. |
| Infinite CSS animations | Low | Bounce/pulse/steam (compositor-only) | Fine. Optionally pause them off-screen. |
| Adding Motion | Low | Full `motion` import ≈ 30+ KB gzip | Use `LazyMotion` + `domAnimation` + `m.*` only. Budget: home JS ≤ 120 KB gzip (currently 87 KB). |
| `92vh` hero | Low | Layout jump with the mobile URL bar | `svh` with a fallback |

## 7. Dependencies

| Need | Dependency | Status |
|---|---|---|
| Motion (N6, N7, sheets) | `motion` | **Already installed.** Use `motion/react` with `LazyMotion`. |
| Icons | Material Symbols (CDN) | In use. **`lucide-react` is unused. Recommend removing it** (needs your OK). |
| Dialogs, scroll-spy, persistence | Native `<dialog>`, IntersectionObserver, `localStorage` | No dependency |
| Prerender | `react-dom/server` | Already a transitive dependency |
| E2E tests | `@playwright/test` | Installed. Needs `playwright.config.ts` with `webServer`. |
| Image pipeline (AVIF/WebP srcsets) | `vite-imagetools` **or** a `sharp` script | ⚑ **Needs approval** (one dev dependency) |
| xlsx → `menu.ts` conversion | One-off script via `npx xlsx`/SheetJS, not saved to `package.json` | ⚑ Confirm approach |
| Video trimming | `ffmpeg` (system tool, not npm) | Only if video is approved |

No new **runtime** dependencies are required for any phase below.

---

## 8. Section-by-section implementation plan

Each phase is **one small PR** that keeps the site working. Existing props stay valid, and new props are optional. After each phase, run `npm run build`, `npm run lint` and Playwright at 375 / 390 / 768 / 1440.

### Phase 0 · Safety net (no visual change)
1. Add `playwright.config.ts` (`webServer: npm run dev`, baseURL). Fix the title regex.
2. Add smoke tests: each section renders, nav anchors resolve, no horizontal overflow at 4 widths, no console errors, reduced-motion run.
3. Move unused raw assets out of `public/` (videos, xlsx, PDF, unused photos) into a non-shipped folder.
4. Clean up `CLAUDE.md` conflicts (pending your OK).

**Exit:** green tests on the untouched UI. This is the regression baseline.

### Phase 1 · Shell: header, navigation, wayfinding
| Section | Work | Files |
|---|---|---|
| SiteHeader | E1: real logo, cart `onOpenCart`, remove avatar | `SiteHeader.tsx/.css`, `data/site.ts`, `data/images.ts` |
| MobileNav | N1 | new `layout/MobileNav/` |
| Scroll-spy | N2 + E2 (add missing ids) | new `hooks/useActiveSection.ts`, `HomePage.tsx`, `data/site.ts` |
| Skip link | N5 | new `layout/SkipLink/`, `HomePage.tsx` |

**Exit:** every section is reachable on a 375 px phone, the active state follows scrolling, and keyboard and focus order are correct.

### Phase 2 · Conversion flows (fix what misleads)
| Section | Work | Files |
|---|---|---|
| Reservation | E3 + N4: WhatsApp message, honest success state, date `min` | `Reservation.tsx/.css`, `utils/reservation.ts`, `data/home.ts` |
| Table order | E9 + N3: quantities, persistence, sheet, WhatsApp checkout | `features/table-order/*` |
| DishCard / Dispatch | E8: added-state feedback | `DishCard.*`, `WhatsAppDispatch.*` |
| SignaturePot | E4: sides disclosure replaces `alert` | `SignaturePot.*` |
| Hero | E5: partner chips link or go static | `Hero.tsx`, `data/home.ts`, `data/types.ts` |

**Exit:** no `window.alert` left. Every button does something. No copy claims an action that didn't happen.

### Phase 3 · Assets and performance (needs the assets in §5)
1. Self-host fonts (WOFF2, preload 2 files). Material Symbols `display=swap`.
2. Image pipeline (⚑ approval): `CoverImage` gets optional `srcSet`/`sizes`. `ImageAsset` gains optional `width`/`height`/`sources`.
3. Replace the hotlinked images slot by slot (`images.ts` only; components untouched).
4. Favicon, OG image, static QR SVG, map preview (E6, E11). Click-to-load map (N8).
5. Build-time prerender of `index.html`.
6. Backdrop-filter and shader fallbacks for low-end mobile (only if testing shows jank).

**Exit:** LCP < 2.5 s on mobile 4G, CLS < 0.1, home JS ≤ 120 KB gzip, `dist/` holds only referenced files.

### Phase 4 · Real menu data
1. Convert `NEW MENU.xlsx` → `src/data/menu.ts` (typed; serving window, category, price variants, veg flag).
2. Map it into the existing `MenuRegistryContent` / `ChefSelectionsContent` shapes, so `MenuRegistry` and `ChefSelections` keep their props.
3. E7: empty state. Optional N7 transition.
4. Reconcile names and prices with the client (the design prices differ from the xlsx).

**Exit:** no hardcoded design dishes. Menu content comes from one source.

### Phase 5 · Approved motion polish (optional)
- N6 `Reveal` on section headers and grids, one time only.
- Limit hero bounce/pulse to a few iterations if the client agrees.
- Candidates from `website-plan.md` (**each needs design approval and probably new tokens ⚑**): time-aware "Now serving" status, Castle Day dial, a `/menu` page that doubles as the QR table menu, Fresh Promise seal, Arabic RTL.

**Exit:** reduced-motion run is identical in content. No idle loops are added.

---

## 9. Guardrails for every phase

- Don't change any component's existing required props. New capability = new optional prop or a new component.
- Content goes in `src/data/*`, never in JSX.
- No new tokens, fonts or colours without approval. Use only `tokens.css` variables.
- No `window.alert`/`confirm`. Use `Toast`, an inline state or `<dialog>`.
- Motion: transform/opacity only, `LazyMotion`, and `useReducedMotion()` as well as the CSS rule.
- Test at 375 / 390 / 768 / 1440 before merging.
