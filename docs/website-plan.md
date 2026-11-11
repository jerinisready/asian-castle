# ASIAN CASTLE — Website Plan

**Concept:** *Through the Gate* — Kerala heritage meets Arabian elegance
**Scope of this document:** Gate 1 (brand direction) + Gate 2 (structure) proposal for the homepage and the menu page.
**Status:** Draft v2 for approval · 7 Nov 2026 · adds the competitor read (§0b)

---

## 0. What we found before planning

| Input | Finding | Consequence for the plan |
|---|---|---|
| `public/NEW MENU.xlsx` | 102 items, 18 categories, **every item has its own serving window** (breakfast 7:30–11 AM, lunch from 12 PM, hot drinks from 3 PM, breads from 4 PM, charcoal grill and puttu specials from 6 PM, everything ends 11 PM). | The menu changes with the clock, so the website can too. This drives the main interaction, **The Castle Day** (§5, scene IV). |
| `public/menu/` (103 photos) | Sizes range from 236 px to 1600 px. Aspect ratios include 1:1, 2:3, 4:5 and 9:16, and the styles don't match. Many are 236 or 736 px wide, the typical Pinterest export sizes, so ownership is unclear. About 20 menu items have no photo, and about 30 photos match no current item. | Treat all photos as **placeholders** until ownership is confirmed. Plan a one-day shoot (§9). |
| Venue reference (arched facade) | It combines a Kerala sloped tile roof, a carved timber door frame like a *padippura* (gatehouse), cusped Arabian arches, brass lanterns and burgundy/saffron drapes. | The brand palette already lives in the building. The **cusped arch** becomes the site's one recurring shape. The facade's **four windows** map to the **four cuisines**. |
| Pinterest reference (Maison Savour) | Clear hero hierarchy, paired CTAs, a trust-marker row under the hero, an "EST." seal, eyebrow + ornament headings. Also gold-on-black, a card grid and testimonials. | Keep the hierarchy, the paired CTAs and the seal idea (it becomes the Fresh Promise seal). Drop the gold-on-black look, the card grid and the reviews (we have none and won't invent any). |
| Dishoom (experience reference) | Editorial storytelling, a warm host voice, the menu always one tap away, restraint. | Use its voice and wayfinding as reference, not its look. |
| `src/App.tsx` (prototype) | A working Arrival + Heritage spike with a gatekeeper glyph, all in one 175-line file. | Treat it as a throwaway prototype. Refactor into components after Gate 3. Issues are listed in §12. |
| Logo | **Not in the repo.** | Blocker for the Gatekeeper's final form, the ornament divider and the favicon. Client to supply a vector (SVG/AI). |

### Conflicting briefs, resolved (needs your OK)

| Topic | Sources say | Recommendation |
|---|---|---|
| Framework | Prompt: Next.js + Tailwind. Blueprint and repo: Vite + React + CSS Modules. A CLAUDE.md line: "Next.js static export on GitHub Pages". | **Vite + React + TS + CSS Modules.** It's already scaffolded, and Motion and Lucide are installed. Get static HTML through a build-time prerender (§10). No Tailwind. |
| Palette | Three different palettes (burgundy / obsidian-gold / leaf-green). | **Burgundy-led**, because it matches the logo and the venue, with the blueprint's neutrals as support (§2). |
| Body font | DM Sans / Inter / Hanken Grotesk | **DM Sans** (already in use) |
| Motion | Framer Motion + GSAP / Motion | **Motion only** (`motion/react`). No GSAP, no smooth-scroll library. |
| Data location | `data/menu.js`, `lib/site.js` vs `src/data/*.ts` | **`src/data/*.ts`** |
| CLAUDE.md | Contains a stray line (leaf #0F2B21, Hanken Grotesk, Next.js) that looks pasted from another project | Remove it so future sessions don't follow it. Its green is also close to the nearest competitor's brand green (§0b). |

---

## 0b. Competitor read: Raviz Taste of India

*Observed 7 Nov 2026 from raviztasteofindia.com and its menu PDF. We use this to position against them. Nothing of theirs is copied (see the guardrails at the end of this section).*

**Who they are:** "Taste of India by RAVIZ". Two Dubai branches: Al Qusais (Al Nahda St, at the Sharjah border, so the same catchment as Abu Shagara) and Al Mankhool. Like Asian Castle, they're Kerala-led and multi-cuisine: Kerala, North Indian, tandoori, Chinese, Arabic Al-Faham grills, plus a "tribal speciality" section. One branch says it's open 24 hours.

| Area | What they do | What it means for Asian Castle |
|---|---|---|
| Brand look | Deep green and ivory, calligraphic script headings, an elephant in the logo | Stay with burgundy, brass and the arch. No script lettering, no elephant or India-map motifs. |
| Positioning | "Authentic Indian cuisine", framed as North-to-South India | Be specific and local: Kerala roots, a Sharjah home, a restaurant day that runs from breakfast to midnight |
| Main menu format | A 78-page square PDF (~4 MB) is the homepage's menu button. Each category opens with a general-knowledge trivia page, then full-page dish photos, then a list. | The menu stays HTML: one tap, filterable, time-aware. Stories cover only our own dishes and are client-verified. No trivia filler. |
| Menu size | About 20 sections and roughly 250–300 items | A focused menu is the edge: ~75 rows after merging variants, quicker to choose from, and every row can have a photo |
| Menu detail | Every item has a description and a veg/non-veg marker. List prices carry no currency symbol. | Match this in function: a description and a veg/non-veg marker on every row, with AED stated once |
| Website menu | One long HTML page with no search, no filters and few photos | The Menu Hall (§6) already goes well beyond this |
| Conversion | Tap-to-call on every page. The copy promises online ordering and reservations, but we found no WhatsApp, no delivery links, no booking option and no map. | Make WhatsApp, partner links, the delivery checker and reserve-by-WhatsApp reachable from the first screen. Keep tap-to-call in the mobile dock. |
| Trust | Four generic testimonials, stat counters showing "0+", template placeholder text, and "Lorem ipsum" on the menu's last page | Real proof only: certificates, the team, the Fresh Promise. No counters or testimonials until they're real. Proofread every page. |
| Language & SEO | English only, generic page titles, Dubai addresses | Target Sharjah searches with descriptive titles. An Arabic version becomes a real edge (§13). |
| Hours | One branch is open 24 hours | Don't compete on hours. Compete on the right dish at the right hour (the Castle Day). |

**Price snapshot (AED):**

| Dish | Raviz | Asian Castle |
|---|---|---|
| Dum chicken biriyani | 15 | 15 |
| Dum beef biriyani | 18 | 18 |
| Fish curry meals | 10 | 12 |
| Chilli chicken | 26 | 15 |
| Al Faham / charcoal grill (half / full) | 20 / 38 | 25 / 40 |
| Mango shake | 15 | 12 |
| Passion fruit mojito | 15 | 12 |

Both restaurants sit in the same everyday price band, in a value-conscious area. So the luxury look must **invite, not intimidate**. Show prices openly where appetite peaks (the Castle Day, the signatures) and never hide them behind "View menu".

**Where we don't overlap. Lead with these.** These are absent from their menu: Kizhi biriyani, Pidiyum Kozhiyum, chiratta puttu, the paal kappa combos, mandi, sulaimani, and a proper breakfast service (they have no breakfast section). Dishes they also serve include beef coconut fry, kanthari dishes, fish mango curry and fish pollichathu. Keep these on the menu, but don't make them the face of the brand.

**Clean-room guardrails:**
- Never reuse their text, dish descriptions, photos, section names or trivia-intro format.
- Write Asian Castle descriptions from our own chef's words, without their menu open.
- Avoid their phrasing: "Taste of India", "authentic Indian cuisine", "rich tapestry", "North to South".
- Reverse-image-search every placeholder photo, to make sure none came from a competitor.

---

## 1. Creative concept — *Through the Gate*

A Kerala home is entered through its **padippura**, a tiled gatehouse where guests are welcomed. A Sharjah evening is lit by **lanterns under arches**. Asian Castle's own facade is both at once.

The website is a **visit**, not a brochure. You arrive at the gate, step inside, learn where the food comes from, see what the kitchen is cooking *right now*, meet the signature plates, and leave knowing how to come back or take the food home.

**Three organising devices**, used everywhere and nowhere else:

1. **The Arch:** one cusped-arch SVG path taken from the facade. It is used as the image mask, the hero reveal, the Gatekeeper's body and the section divider. One shape, so the site holds together.
2. **The Light:** lantern warmth that changes with the time of day (morning ivory → afternoon brass → night burgundy). It only shifts between existing tokens. No new colours.
3. **The Clock:** the restaurant is open 7 AM – 12 AM and its menu changes through the day. The site always knows what's being served now (in Sharjah time).

**Signature ideas, in priority order:**

| # | Idea | Why it earns its place |
|---|---|---|
| 1 | **The Little Gatekeeper:** a castle-emblem guide that walks the navbar and opens its gate when you enter a new act | Wayfinding with personality, and a memorable brand asset |
| 2 | **The Castle Day:** a dial from 7 AM to 12 AM showing what's served at any hour, opening on "now" | Menu-first, built on real menu data, a "room service" feel no template has |
| 3 | **The Gate reveal:** the camera pushes into the door and the interior opens through an arch | Turns "arrival" into a moment. Takes about one extra viewport, never forced. |
| 4 | **Four Windows:** the facade's four arched windows are the four cuisines | Cuisine discovery that comes from the real building, not a card grid |
| 5 | **My Table:** a shortlist that becomes a WhatsApp order or a "show your server" screen | Conversion without a backend |
| 6 | **Can we reach you?:** an interactive check of the delivery radius | The client asked for this specifically, and it routes visitors to own delivery or to partners |
| 7 | **Trilingual welcome:** *Swagatham · أهلاً وسهلاً · Welcome* | Kerala + Sharjah in one line. Needs native-speaker check. |

Each of these fills a gap the nearest competitor leaves open (§0b): an HTML menu instead of a PDF, time awareness, WhatsApp and delivery routes, and an identity specific to this place.

---

## 2. Design tokens (Gate 1)

### Colour

| Token | Hex | Role |
|---|---|---|
| `--c-burgundy` | `#49131D` | Brand primary, night scenes, primary buttons, accent text on ivory |
| `--c-ivory` | `#F7F1E8` | Day backgrounds, text on dark |
| `--c-brass` | `#B69A68` | Ornament, hairlines, active states, accent text **on dark only** |
| `--c-espresso` | `#24201E` | Body text, evening scenes |
| `--c-obsidian` | `#171715` | Deepest night background (Find Us, footer) |
| `--c-brown` | `#46382B` | Secondary text on ivory |
| `--c-beige` | `#C8BDAA` | Hairlines and dividers on ivory (decorative only) |

The last three come from the blueprint. They need your approval because the CLAUDE.md rule is "no new tokens without approval".

**Contrast (checked against WCAG):**

| Pair | Ratio | Use |
|---|---|---|
| Ivory on burgundy | 13.4 : 1 | Any text |
| Espresso on ivory | 14.4 : 1 | Body |
| Brown on ivory | 10.0 : 1 | Secondary text |
| Brass on burgundy | 5.6 : 1 | Text OK |
| **Brass on ivory** | **2.4 : 1** | **Never text.** Lines and ornament only. On ivory, accent text is burgundy. |

**Rule:** no gradients except photo scrims (a single-hue burgundy→transparent wash for legibility).

### Typography

| Role | Family | Notes |
|---|---|---|
| Display / headings | Cormorant Garamond 500, 500 italic | Italic for the emotional half of a headline ("…begins with a *warm welcome.*") |
| UI / body | DM Sans 400 / 500 | Prices use `font-variant-numeric: tabular-nums`. Check that the hosted DM Sans build has `tnum`. |
| Arabic (phase 2) | IBM Plex Sans Arabic | |
| Malayalam accents (optional) | Noto Serif Malayalam, subset | Only for signature dish names and *Swagatham* |

Self-host as WOFF2 with 2 preloads, replacing the current render-blocking Google Fonts `@import`.

**Fluid scale (mobile → desktop):**

| Token | Size | Line height |
|---|---|---|
| `--fs-display` | 44 → 104 px | 0.95 |
| `--fs-h1` | 36 → 72 | 1.0 |
| `--fs-h2` | 30 → 52 | 1.05 |
| `--fs-h3` | 22 → 28 | 1.15 |
| `--fs-lead` | 18 → 20 | 1.55 |
| `--fs-body` | 16 | 1.6 |
| `--fs-small` | 14 | 1.5 |
| `--fs-eyebrow` | 12, uppercase, tracking 0.18em | 1.2 |

Nothing below 12 px. The prototype currently uses 9–11 px.

### Space, layout, shape, motion

- **Spacing:** 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 160. Section padding is `clamp(64px, 10vw, 160px)`.
- **Container:** max 1240 px. Gutters are 20 (mobile) / 32 (tablet) / 56 (desktop).
- **Breakpoints:** base 375 · 600 · 768 · 1024 · 1440.
- **Radii:** 0 for photos (photos are either rectangular or arch-masked), 4 for inputs, 999 for capsules (nav, dock, chips).
- **Image ratios (only these):** 4:5 dish feature · 1:1 menu thumbnail · 3:2 room · 3:4 arch · full-bleed hero.
- **Motion durations:** 150 (press) · 240 (hover, state) · 400 (enter) · 700 (reveal).
- **Easing:** `--ease-out: cubic-bezier(.22,1,.36,1)`, `--ease-in-out: cubic-bezier(.65,0,.35,1)`.

---

## 3. Site map & navigation

**Pages (Vite multi-page build, no router dependency):**
- `/`: the journey (homepage)
- `/menu`: the **Menu Hall**. Full menu, deep-linkable (`/menu#charcoal-grill`, `/menu?cuisine=arabic`, `/menu?at=19:00`). It doubles as the **in-restaurant QR table menu**.
- Phase 2: `/ar/` (Arabic, RTL), `/kitchen` (chef team and certificates, once assets exist).

**The homepage in 5 acts / 9 scenes.** The nav tracks acts; the mobile dock shows scenes.

| Nav item | Act | Scenes |
|---|---|---|
| Home | Arrival | I · The Gate |
| Our Story | Heritage | II · Kerala to Sharjah · III · Four Windows |
| Menu | The Table | IV · The Castle Day · V · Castle Signatures |
| Experience | Hospitality | VI · The Fresh Promise · VII · The Dining Hall |
| Find Us | Invitation | VIII · Take the Castle Home · IX · The Gate Is Open |

**Menu-first guarantees.** The menu is reachable in zero scrolls from:
1. A **"Skip to the menu"** link, the first focusable element
2. The live status bar ("Now serving lunch")
3. The hero's secondary CTA
4. The nav CTA **View Menu** (always visible on desktop)
5. The centre button of the mobile dock

### Desktop navbar

```
┌──────────────────────────────────────────────────────────────────────────┐
│ ● Open now · Serving dinner until 11 PM · Free parking         (status) │
└──────────────────────────────────────────────────────────────────────────┘
   ╭────────────────────────────────────────────────────────────────────╮
   │ [LOGO]     Home   Our Story   Menu   Experience   Find Us   [View Menu →] │
   │                               ⌂  ← the Little Gatekeeper             │
   ╰────────────────────────────────────────────────────────────────────╯
```

- A capsule with a warm ivory glass surface: backdrop blur 20 px, 1 px burgundy hairline at 18 %, soft shadow.
- **Adaptive surface:** each section declares `data-nav-theme="dark|light"`. An IntersectionObserver at the nav's line switches between a clear-glass + ivory-text state (over photos) and an opaque-glass + burgundy-text state (over ivory). 240 ms.
- Fallbacks: if `backdrop-filter` is unsupported, or under `prefers-reduced-transparency`, use a solid ivory at 96 %.
- The status bar (the blueprint's "announcement bar") is a live **concierge line**, not a promo. It collapses into the nav after 80 px of scroll.

### Mobile (375 / 390)

- **Top:** logo + "Open now" pill + a chapters button.
- **Bottom dock** appears after the hero. It sits in the thumb zone.

```
╭───────────────────────────────────────────╮
│ ⌂◔ The Castle Day  │  [ MENU ]  │  ✆ Call │
╰───────────────────────────────────────────╯
  scene + progress ring   primary      call / WhatsApp
```

- Tapping the scene name opens a **chapter sheet** (all 9 scenes), with the Gatekeeper marking where you are.
- When My Table has items, the right slot becomes "3 on your table".

---

## 4. The Little Gatekeeper (spec)

**Form:** a 20 × 24 px line drawing (1.25 px stroke) taken from the logo's castle emblem: three crenellations, an arched body, two door leaves and a single lantern dot above the arch. Brass on dark, burgundy on ivory. It must read as an *emblem*, never a mascot: no face, no limbs. *The final drawing waits for the vector logo. The current glyph is a stand-in.*

| State | Trigger | Behaviour | Duration | Reduced motion |
|---|---|---|---|---|
| Rest | — | Still; gate closed | — | — |
| Travel | Active act changes | Slides under the new item (Motion `layoutId`, spring stiffness 380 / damping 32) and leans 4° in the direction of travel, then settles | ~360 ms | Cross-fades in place |
| Arrive | Travel ends | Door leaves open (`scaleX` from the hinges) and the lantern dot brightens. The gate stays open while you're in that act. | 280 ms | Doors shown open, no tween |
| Peek | Hover / focus on another nav item | Leans 3° toward it | 200 ms | None |
| Hop | Click / Enter on a nav item | Rises 2 px and returns, then travels | 150 ms | None |
| Mobile | Scene changes | Becomes a 14 px glyph inside a progress ring in the dock. The ring fills with scroll progress through the act. | — | Ring updates without tween |
| Cameo | Footer only | Gate shown open: "The gate is open until midnight." When the restaurant is closed, it's shown closed: "We open at 7 AM." | Once | Static |

**Active-section detection:** an IntersectionObserver with `rootMargin: "-45% 0px -50% 0px"` (a centre line). This replaces the prototype's scroll listener. Active links get `aria-current="location"`. The glyph is `aria-hidden`.

---

## 5. The homepage, scene by scene

Each scene lists its **purpose**, **layout**, **interaction** and **assets**. Every scene ends with a quiet "Next · *Scene name* ↓" link (editorial wayfinding).

### I · The Gate — *Arrival*
**Purpose:** create curiosity and say "hospitality" in the first second.

- **Layout:** full-bleed exterior at blue hour, with a burgundy scrim on the left third.
  - Above the headline: the eyebrow *A WORLD OF FLAVOUR. A PLACE TO BELONG.* and the trilingual welcome *Swagatham · أهلاً وسهلاً · Welcome*.
  - H1: "Every great meal begins with a *warm welcome.*" Then the supporting line.
  - CTAs: **Enter Asian Castle** (filled ivory) + **Explore the menu →** (text link).
  - Bottom rail: *Sharjah, UAE* · "Scroll to step inside" · *Kerala · South Indian · Arabic · Chinese*.
- **Now Serving ticket:** a small glass card in the bottom-right, computed from menu data in Asia/Dubai time. For example: "Now serving · **Dinner** — Charcoal grill, Beef chiratta puttu, Kallappam → See tonight's menu". Outside opening hours: "We open at 7 AM · Breakfast from 7:30 — Idiyappam, Dosa set, Chicken stew".
- **Scroll sequence** (section is 200 vh with a sticky stage; total extra scroll ≈ 1 viewport):
  - 0–40 %: camera push. The image scales 1 → 1.35 with transform-origin on the door, and the copy lifts and fades.
  - 40–85 %: an arch-shaped mask grows from door-size to full screen, revealing the **interior** photo. You've stepped through.
  - 85–100 %: the interior settles. The nav switches to its light state, and the Scene II headline rises from below.
- **Never forced:** both CTAs jump past the sequence. Under reduced motion there's no sticky stage, just a static hero followed by normal flow.
- **Mobile:** portrait crop centred on the door. Copy sits in the lower third with full-width stacked CTAs. Shorter sequence (+60 vh).
- **Assets:** an exterior at dusk (**LCP**: preloaded, AVIF/WebP srcset 640–2048) and an interior wide shot (lazy, preloaded after LCP).

> ⚠ If the facade photo supplied is not the actual Asian Castle building (it shows signs of being AI-generated), it can only be a mood reference. Presenting it as the venue would mislead guests.

### II · Kerala to Sharjah — *Heritage*
**Purpose:** in one screen, make visitors understand who Asian Castle is.

- **Layout (ivory):** an editorial spread.
  - Large two-line headline: "Our roots are in Kerala. *Our table welcomes the world.*" Supporting copy in a narrow column.
  - A large arch-masked dish photo (paal kappa & beef roast) with ±6 % parallax.
  - A logo-derived ornament divider.
- **Story markers on a thread:** a 1 px brass line draws downward as you scroll (scroll-linked `stroke-dashoffset`). The three markers reveal as the line reaches them:
  1. **Rooted in Kerala** → *Puttu · Kallappam · Pidiyum Kozhiyum*
  2. **Inspired by the world** → *Charcoal grill mandi · Chilli chicken*
  3. **Made with care** → links to the Fresh Promise

  Each dish name links to the menu. Heritage leads into food, not into a dead end.
- **Closing caption:** *Even our milkshake carries the journey in its name: "Kerala to Sharjah".* (The dish is real. Client to confirm the wording.)
- **Mobile:** headline → 4:5 arch photo → markers, with the thread on the left edge.

### III · Four Windows — *Cuisine discovery*
**Purpose:** the four cuisines at a glance, taken from the facade's four arched windows.

- **Desktop:** four tall arch windows in a row on espresso (Kerala · South Indian · Arabic Grill · Chinatown). Each shows one dish photo dimmed to about 70 %.
  - Hover / focus **lights the lantern**: brightness rises to 100 %, a warm inner glow appears, and three dish names fade in. 240 ms.
  - Click → `/menu?cuisine=…`.
- **Mobile:** a horizontal scroll-snap row of arches (80 % width each, so the next one peeks in). Tap to light, tap again to open.
- **Data:** a cuisine tag on each menu item. *Client to validate the mapping.*

### IV · The Castle Day — *What's cooking now* ★ signature interaction
**Purpose:** menu discovery by time of day, built from the spreadsheet's serving windows.

```
 7 AM ─────●──────────────────────────────────────── 12 AM
      Breakfast │ Lunch │ Chai time │ Dinner & grill
                          ▲ drag / arrow keys
 ┌───────────────────────────────────────────────┐
 │ 8:40 PM in Sharjah · DINNER & GRILL           │
 │ Honey chilli charcoal grill ....... 27 / 44  │
 │ Mandi rice with beef rib ............ 30     │  ← only dishes served at that time
 │ Beef chiratta puttu ................. 12     │
 │ → See the full dinner menu                    │
 └───────────────────────────────────────────────┘
```

- **Opens on "now"** in Asia/Dubai time, whatever the visitor's own timezone.
- The visitor can scrub with a **native `<input type="range">`** (30-min steps, `aria-valuetext="8:30 PM, Dinner and grill"`) or jump with period buttons (a tablist).
- **Periods, derived from the data:**

| Period | Hours |
|---|---|
| Breakfast | 7:30–11:00 |
| Lunch | 12:00–15:00 (biriyanis until 18:00) |
| Chai time | 15:00–18:00 (hot drinks from 3 PM, breads from 4 PM) |
| Dinner & grill | 18:00–23:00 |

  Each item's own time range decides whether it shows. Periods only name the scene.
- **Light:** the section background moves ivory → beige → espresso → burgundy across the day (400 ms crossfade between tokens). The dish list swaps with a 240 ms vertical roll.
- **Mobile:** period chips on top, 4 dishes with 1:1 thumbnails, and the scrubber pinned at the section's bottom edge (thumb zone).
- **Rendering:** the prerendered HTML shows a neutral state ("Breakfast to charcoal grill, 7 AM – 12 AM"). "Now" is applied after hydration, so there's no mismatch.

> ⚠ Data gaps to resolve: nothing is listed for **11 AM–12 PM** or **11 PM–12 AM**, and breakfast starts at 7:30 while the doors open at 7:00.

### V · Castle Signatures
**Purpose:** sell the plates the restaurant is proudest of, with menu-engineering intent.

- **Desktop:** **stacked plate moments**. Each signature is a full-viewport `position: sticky` panel, and the next slides over the last. This is native scrolling, not hijacking.
  - Each panel has a 4:5 arch photo, the name in display type, an optional Malayalam name, an origin tag, one client-approved line, the price, the serving window, **+ Add to my table** and **See in menu**.
  - Panels alternate sides. A counter reads "02 / 06".
- **Mobile:** a horizontal snap carousel instead (six full-height panels would be too long).
- **Candidates** (client chooses 5–6, ideally from sales data):
  - **First choice:** dishes the nearest competitor doesn't serve (§0b). Kizhi Biriyani · Pidiyum Kozhiyum · Paal Kappa & Beef Roast · Beef Chiratta Puttu · Mandi Rice with Charcoal Chicken · Pothu Vaariyellu (beef rib, needs a photo).
  - **Second choice,** because similar dishes are served nearby: Chicken Paal Kaanthari · Chemmeen Manga Curry · Honey Chilli Charcoal Grill.

### VI · The Fresh Promise — *Experience*
**Purpose:** give "Fresh Meat" a proper brand mark, as the client asked.

- **The Castle Fresh seal:** a circular stamp with the castle emblem at its centre and ring text reading *FRESH MEAT · NO PRESERVATIVES · NO ARTIFICIAL COLOURS ·*. It stamps in once (scale 1.12 → 1, 300 ms), then rotates slowly with scroll (scroll-linked, 0 → 60°; never autoplay). The same seal appears as a 16 px badge on meat dishes in the menu.
- **Three promises:** set in large serif on ivory, each with a hand-drawn-style underline that draws on reveal.
- **Certificates:** a row of document thumbnails → lightbox. *Placeholder until the client supplies photos.* Never name a certification the client hasn't provided.
- **Chef team:** arch portraits (3:4) with name and role only. *The client listed Vitty Thomas, Abey Philip and Aneesh John. Confirm whether these are the chefs.* No bios unless supplied.

> ⚠ These are the client's claims. Get **written confirmation** of each before launch, since they are public food-quality statements.

### VII · The Dining Hall
**Purpose:** "hotel experience": the room, the comfort, the practicalities.

- **Layout:** an asymmetric trio (one 3:2 landscape plus two 4:5 portraits) beside a **"Your visit" ledger**, a hotel-style info sheet with hairline rules:

| | |
|---|---|
| Hours | 7:00 AM – 12:00 AM, every day |
| Parking | Free for guests |
| Seating | Family hall *(confirm)* |
| Cuisines | Kerala · South Indian · Arabic · Chinese |
| Reservations | WhatsApp / call |

- **Interaction:** a gallery lightbox built on native `<dialog>` (arrow keys, swipe, Esc, focus return) and a 1.03 hover zoom on photos. "Reserve a table" opens a tiny form (guests, date, time) that **builds a WhatsApp message locally**. Nothing is stored or sent by us.

### VIII · Take the Castle Home
**Purpose:** delivery, two routes. This is the client's "make it interactive" request.

- **"Can our kitchen reach you?":** a stylised SVG map of Abu Shagara and its neighbours (no Google Maps embed) with radius rings.
  - The visitor picks their area from a combobox (Abu Shagara, Al Qasimia, Al Majaz, Al Nahda, Al Taawun…) or taps **Use my location**. The location is computed in the browser (haversine), never sent anywhere.
  - Then a dotted route draws from the castle to their area (800 ms) and the result appears:
    - Inside the radius → "Our own riders bring it to you" + WhatsApp / Call.
    - Outside → "Order through our partners", with partners highlighted.
- **Partners:** Keeta · Talabat · noon · Smiles. Each gets an official "Order on…" badge linking to **Asian Castle's own listing**, plus small App Store / Google Play links.
- **Notice:** "For the best taste and safety, enjoy delivered food within 2 hours, or as advised for specific items."

> ⚠ Needed: the delivery radius in km, delivery hours and fees, the actual partner listing URLs (we only have search pages), and verified neighbourhood coordinates.

### IX · The Gate Is Open — *Invitation*
**Purpose:** close the journey and convert.

- **Layout:** the exterior again, now at **night** with the lanterns lit. This bookends the dusk opening.
  - Headline: "The gate is open *until midnight.*" When closed, it reads "We open at *7 AM.*"
  - Address with a copy button ("Copied" toast) and "Get directions" (Google Maps place link).
  - Call · WhatsApp, the hours with live status, and free parking.
- **Map:** a click-to-load facade, so there's no third-party load or cookies until the visitor asks.
- **Questions guests ask:** a short FAQ covering parking, vegetarian options, delivery area, hours, family seating and reservations. Answers come only from client-confirmed facts, marked up as `FAQPage` schema.
- **Footer** (obsidian): logo, nav, socials, *ASIAN CASTLE Restaurant L.L.C* · © 2026, and the Gatekeeper cameo.

---

## 6. The Menu Hall (`/menu`) — the heart of "menu first"

**Header:**
- "The Menu"
- Live line: "Now serving dinner · 8:40 PM in Sharjah"
- Search
- Cuisine filter: Kerala · South Indian · Arabic · Chinese
- Diet filters: Vegetarian · Seafood · Spicy
- **Available now** toggle. Off by default. Unavailable items are dimmed with a tag like "from 6 PM" rather than hidden.

**Structure:** the 18 spreadsheet categories regrouped into 7 chapters for scanning.

| Chapter | Categories |
|---|---|
| Morning | Breakfast, Breakfast curries |
| To Begin | Soup, Salad, Starters |
| The Kerala Table | Lunch, Castle specials, Fish, Puttu specials, Breads, Signature combos |
| Arabic Grill | Charcoal grill & mandi |
| Chinatown | Chinatown |
| Sweet & Cool | Desserts, Shakes, Juices & mojitos, Lassi |
| Hot Cups | Sulaimani, chai, coffee |

**Scroll-based navigation:**
- **Desktop:** a sticky left index, like a hotel menu's contents page. The Gatekeeper glyph marks the active chapter.
- **Mobile:** a sticky chip bar that auto-scrolls to the active chip (an underline glides between them).
- Scrollspy runs on IntersectionObserver.

**Rows, not cards:**
- An editorial list: name (serif), one-line description, a **veg / non-veg marker on every row** (guests in the UAE expect it), other diet icons, and the price right-aligned in tabular numerals.
- "AED" is stated once in the header, not on every row. No dot leaders.
- **Never a PDF as the main menu.** A print stylesheet on `/menu` produces a clean printable version from the same data.
- **Desktop hover:** the dish photo follows the cursor inside an arch frame (120 ms lerp). Only when a photo exists.
- **Mobile tap:** the row expands inline with a 4:5 photo, the serving window and **+ Add to my table**.

**Menu-engineering rules** (these fill the empty `menu-engineering` skill):
- **Merge variants** to cut down decisions (102 rows → ~75):
  - "Charcoal grill: Half 25 · Full 40"
  - "Fried rice: Veg 12 · Egg 13 · Chicken 15"
- **Signatures go first** in each category. Show at most 7 items before "Show more".
- **"APS" becomes "Seasonal price, ask our team".**
- **Heritage names get an English helper:** "*Pidiyum Kozhiyum*: rice dumplings with Kerala chicken curry". All descriptions are chef-approved. None are invented.
- **Kasavana–Smith matrix** (Stars / Plowhorses / Puzzles / Dogs), once the client shares item sales and food cost. It decides the signatures, placement and badges.

**My Table (shortlist):**
- **"+ Add":** the button morphs to ✓ and a small chip flies into the dock counter (Motion `layoutId`, 400 ms). A polite live region announces it.
- **The sheet:** lists items, quantity and estimated total, with two actions:
  - **Send to Asian Castle on WhatsApp:** a prefilled order message, for delivery or takeaway inside the radius.
  - **Show to your server:** a full-screen, large-type list for the dining room or the QR table menu.
- **Storage:** kept in `localStorage` only. No accounts, no payments. This stays within phase-one scope.

---

## 7. Micro-interaction catalogue

| Interaction | Feedback | Time | Reduced motion |
|---|---|---|---|
| Nav Gatekeeper travel / gate open | Slide + lean, doors open | 360 / 280 ms | Fade, doors static |
| Nav surface adapts to background | Glass opacity + text colour | 240 ms | Instant |
| Primary button hover | Fill sweeps in from the left; arrow nudges 3 px | 200 ms | Colour only |
| Text link hover | Underline draws left → right | 200 ms | Underline shown |
| Press (all buttons) | Scale 0.97 | 150 ms | None |
| Section entrance | Opacity + 16 px rise, 80 ms stagger, once | 600 ms | Visible immediately |
| Headline reveal | Line-by-line mask rise (lines, never letters) | 700 ms | Visible |
| Image reveal (below the fold only) | Inset clip 100 → 0 + scale 1.08 → 1, once | 900 ms | Visible |
| Parallax | ±6 % translate (±3 % on mobile), scroll-linked | — | Off |
| Heritage thread | Line draws with scroll | — | Fully drawn |
| Four Windows | Lantern lights (brightness + inner glow) | 240 ms | Brightness only |
| Castle Day scrub | Snaps to half-hours; list rolls; background shifts | 240 / 400 ms | Instant swap |
| Add to my table | Morph + flight to dock + counter bump | 400 ms | Counter + live region |
| Menu hover preview | Arch frame scales in and follows the cursor | 180 ms | Static thumbnail |
| Fresh seal | Stamp once, then scroll-linked rotation | 300 ms | Static |
| Delivery check | Route draws; ring pulses once | 800 ms | Result only |
| Lightbox | Opens from its thumbnail (FLIP) | 300 ms | Fade |
| Copy address | "Copied" toast | 1.6 s | Same |

**Motion rules:**
- Animate transform and opacity only.
- Scroll-linked effects use Motion `useScroll`, which is hardware-accelerated where ScrollTimeline exists.
- Use `LazyMotion` + `m` components to keep the bundle small.
- No idle loops, no pulsing dots, no cursor followers outside the menu preview.
- No smooth-scroll hijacking.
- Everything is gated by `useReducedMotion()` **and** the CSS media query.

---

## 8. Visual guidance (how the site leads the eye)

1. **Chapter numerals:** every scene's eyebrow reads "IV — The Castle Day".
2. **The Gatekeeper** in the nav, and the **progress ring** in the mobile dock.
3. **The scroll cue** "Scroll to step inside". It disappears after the first scroll.
4. **"Next · Scene" links** at the end of each scene.
5. **The arch shape**, which always means "look here": photos, the menu preview, windows.
6. **Closed-hours states** that still guide: "We're closed now. Breakfast from 7:30 AM. Plan your order →".
7. **Light that follows the day**, so the page feels like the restaurant at that moment.

---

## 9. Photography & content plan

**Shoot brief (one day):**

| Shot | Detail |
|---|---|
| Exterior | At blue hour, lanterns lit, symmetrical (hero) + full night (Scene IX) |
| Interior | Wide shot + details: carved timber, lanterns, a set table |
| Dishes | 20–25 hero dishes on **one** surface family (dark timber / banana leaf / brass), with one light setup. Crops: 4:5, 1:1 and 3:2. At least 2400 px on the long edge. |
| Hands & action | Serving, the sulaimani pour, flames on the charcoal grill, puttu steaming |
| People | Team portraits on one backdrop |
| Documents | Certificates scanned flat |
| Video (optional) | 6–8 s hero loops (poster image = LCP) |

**Placeholders:**
- Every image entry in data has `status: "placeholder" | "final"`.
- In dev and staging builds, placeholders show a small "PLACEHOLDER" tag. Production fails the build if a placeholder remains on a launch-critical slot.

**Copy:**
- Voice: a warm host. Short sentences, no superlatives we can't prove.
- **Never invent** awards, reviews, years, chef bios or ingredients.
- **Clean room:** never reuse a competitor's wording, descriptions, section names or photos (§0b).
- Client claims (fresh meat, no preservatives, no artificial colours, free parking, delivery radius) need written sign-off.

---

## 10. Technical architecture

```
src/
├─ app/            Home.tsx · MenuPage.tsx · entries (main.tsx, menu.tsx)
├─ components/
│  ├─ layout/      Navbar · Gatekeeper · StatusBar · MobileDock · ChapterSheet · Footer
│  ├─ sections/    Gate · Heritage · FourWindows · CastleDay · Signatures
│  │               FreshPromise · DiningHall · TakeHome · Invitation
│  ├─ menu/        MenuIndex · MenuChapter · MenuRow · HoverPreview · MyTableSheet · Filters
│  └─ ui/          Button · SectionHeading · ArchImage · Reveal · Parallax · Seal
│                  Lightbox · StatusPill · Container
├─ data/           restaurant.ts · menu.ts · periods.ts · cuisines.ts · signatures.ts
│                  neighbourhoods.ts · partners.ts · images.ts
├─ design-system/  tokens.css · typography.css · global.css
├─ hooks/          useServiceClock (Dubai time, period, open/closed) · useActiveSection
│                  useMyTable · useNavTheme
└─ utils/          time.ts (parses "12:00 PM TO 11:00 PM") · geo.ts · whatsapp.ts
```

**Content.**
- `data/menu.ts` is the single source of truth: `id`, `name`, `localName?`, `category`, `cuisine`, `variants[{label, price}]`, `priceNote?`, `serves {from, to}`, `diet[]`, `spice?`, `signature?`, `freshMeat?`, `image?`.
- A one-off script converts the xlsx. After that, edit `menu.ts`.
- No component hardcodes menu content.

**Static HTML and SEO.**
- Vite multi-page (`index.html`, `menu/index.html`), prerendered at build with `react-dom/server` (no new dependency), then hydrated.
- JSON-LD `Restaurant` with: address, geo, `openingHours: Mo-Su 07:00-24:00`, `servesCuisine`, `hasMenu`.
- `Menu` / `MenuItem` schema generated from `menu.ts`.
- Per-page OG images.
- Titles and descriptions aimed at Sharjah searches ("Kerala restaurant Sharjah", Abu Shagara, Al Qasimia), where the nearest competitor has no branch.

**Images.**
- AVIF + WebP srcsets, explicit width/height, lazy below the fold.
- A build-time optimiser needs **one dev dependency (`sharp` or `vite-imagetools`). Your approval required.**

**Performance budget (mobile, mid-tier 4G):**

| Metric | Target |
|---|---|
| LCP | < 2.5 s |
| CLS | < 0.1 |
| INP | < 200 ms |
| Home JS | ≤ 120 KB gzipped |
| Hero image | ≤ 180 KB |
| Menu thumbnails | ≤ 25 KB each |
| Font files | ≤ 4 |
| Third-party scripts on load | 0 |
| Lighthouse (mobile) | ≥ 90 |

**Accessibility:**
- "Skip to the menu" link
- Landmarks, and `aria-current` in the nav
- 44 px minimum touch targets
- Brass 2 px focus rings
- Native `<dialog>` for sheets and the lightbox
- A native range input for the Castle Day
- Live regions for My Table
- Contrast per §2
- CSS logical properties from day one, so RTL Arabic is cheap later

---

## 11. Delivery plan & approval gates

| Phase | Work | Exit gate |
|---|---|---|
| **0 · Foundations** | Resolve the decisions in §13. Collect the logo and content. Convert the menu to `data/menu.ts`. Write `tokens.css`. Fill the empty project skills (menu-engineering, food-photo-direction, mobile-interaction-motion, restaurant-copywriting, local-seo-uae, bilingual-rtl). | **Gate 1:** concept, palette, type, image style |
| **1 · Wireframes** | Home + Menu at 375 / 768 / 1440. Motion storyboard for the Gate, Gatekeeper and Castle Day. | **Gate 2** |
| **2 · Hi-fi Figma** | Every scene + responsive variants. *Needs the Figma connector authorised.* | **Gate 3:** no production build before this |
| **3a · Shell** | Tokens, Navbar + Gatekeeper, StatusBar, MobileDock, Footer, Reveal / Parallax / ArchImage primitives | |
| **3b · Arrival + Heritage** | Refactor the prototype into Gate, Heritage, Four Windows | |
| **3c · Menu** | `/menu`, filters, scrollspy, hover preview, Castle Day, My Table | **Gate 4:** interactive prototype |
| **3d · Experience** | Signatures, Fresh Promise, Dining Hall, lightbox | |
| **3e · Invitation** | Take Home checker, partners, Find Us, reservation-by-WhatsApp | **Gate 5** |
| **4 · QA** | Playwright at 375 / 390 / 768 / 1440: overflow, nav, keyboard, reduced motion, console, link formats, visual snapshots. Lighthouse. | **Gate 6 / 7:** release |
| **5 · Later** | Arabic `/ar/`, kitchen & chef page, hero video, own ordering / reservation backend | |

---

## 12. Prototype issues to fix during the refactor

- Nav text at 9–11 px. The minimum is 12 px (eyebrow), and nav text should be 14 px.
- Active section is tracked with a scroll listener. Switch to IntersectionObserver.
- Nav anchors point at stand-ins: `#menu` is on a dish image, and `#visit` sits inside Heritage.
- The hero uses the fish pollichathu photo. It's labelled as temporary, which is good.
- Google Fonts are loaded through a render-blocking `@import`. Self-host instead.
- Everything lives in one `App.tsx`. Split it per §10.
- The Playwright test fails because there is no `webServer` in the config. Add `playwright.config.ts` that starts `vite` first.

---

## 13. Open decisions & content checklist

**Decisions (you):**
1. Approve the reconciled stack, palette and fonts (§0, §2), and remove the stray CLAUDE.md line.
2. Approve the three blueprint neutrals as tokens.
3. Allow one image-optimisation dev dependency?
4. Hosting target (GitHub Pages / Netlify / other) and domain.
5. Is My Table → WhatsApp order acceptable to the client in phase 1?
6. Bring the Arabic version forward to launch? The nearest competitor has none, so it's a cheap edge.

**Content (client):**
- [ ] Logo, vector (SVG / AI)
- [ ] Is the arched-facade photo the real building? Interior photos?
- [ ] Phone, WhatsApp, email, social handles, Google Maps place link
- [ ] Written confirmation: fresh meat, no preservatives, no artificial colours, free parking
- [ ] Own-delivery radius (km), hours, fee, minimum order
- [ ] Asian Castle's listing URLs on Keeta, Talabat, noon, Smiles
- [ ] Certificate photos. Chef team: names, roles, portraits (are Vitty Thomas, Abey Philip, Aneesh John the chefs?)
- [ ] Menu fixes:
  - Descriptions, veg / spice / allergen flags, cuisine tags
  - "APS" items
  - What's served 11 AM–12 PM and 11 PM–12 AM
  - Duplicate row numbers 58–64; "HOHABATH" vs "Mohabath"
  - Are the ~30 photos with no menu item discontinued dishes?
- [ ] 5–6 signature dishes (ideally backed by item sales data)
- [ ] Malayalam and Arabic spellings checked by native speakers
- [ ] Reverse-image check of every placeholder photo (none may come from a competitor, or from a stock site without a licence)
