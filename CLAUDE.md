
# ASIAN CASTLE — Development Rules

## Project
Luxury restaurant landing page.
React + TypeScript + Vite.

## Brand
Luxury hotel dining aesthetic.
Dark charcoal, antique gold, warm ivory.
Elegant serif headings, clean sans-serif body.


Vite static build on GitHub Pages. Mobile first. Data: src/data/*.ts (site.ts, home.ts, dishes.ts, images.ts; types in types.ts).
Brand: obsidian #141110, warm charcoal #211C19, antique gold #C6A265 (use sparingly), champagne #E8CCA0, burgundy #641D2A, ivory #F1E8DF.
Fonts: Cormorant Garamond (headings, dish titles) + Manrope (interface, body) + Cinzel (heritage labels only).
Tokens: src/design-system/tokens.css (source of truth) and tokens.ts (JS mirror). Components use tokens, never raw values.
Rules: minimal diffs, no new dependencies without asking, test at 375/390/768/1440.


## Development rules
1. Follow approved Figma designs.
2. Never invent new design tokens without approval.
3. Build independent, reusable components.
4. Separate content from presentation.
5. Never hardcode menu content inside UI components.
6. Prefer CSS variables for design values.
7. Use Motion only where interaction benefits.
8. Respect reduced-motion preferences.
9. Mobile responsiveness is mandatory.
10. Avoid unnecessary dependencies.

## Change management
- Modify only requested components.
- Do not rewrite unrelated files.
- Preserve existing component contracts.
- Explain changed files briefly.
- Run relevant checks after modifications.

## Visual quality
No generic templates.
No excessive animations.
No placeholder gradients.
No inconsistent image ratios.
No arbitrary spacing values.


-----


# MASTER INSTRUCTION — ASIAN CASTLE

You are a Senior Principal UI/UX Designer, Creative Developer and Motion Design Engineer.

Project: Asian Castle — Kerala & Arabian Restaurant, Sharjah, UAE.

## Creative direction

The existing client-approved design is the source of truth.

Preserve:
- Dark obsidian and charcoal backgrounds.
- Antique gold and champagne accents.
- Burgundy CTA elements.
- Elegant editorial serif typography.
- Existing section structure and visual identity.
- Rounded imagery and premium architectural composition.

The experience should communicate:
1. Kerala's culinary heritage.
2. Arabian luxury and hospitality.
3. Craving through cinematic food presentation.
4. Intelligent, contextual interactions.
5. Premium dining and effortless reservations.

## Non-negotiable rules

- Do not redesign the existing website.
- Do not replace the approved colour palette.
- Do not introduce generic SaaS layouts.
- Do not turn every section into a card grid.
- Avoid unnecessary animations and visual noise.
- No fake restaurant claims, ratings, prices or operational statistics.
- Every interaction must have a meaningful purpose.
- Mobile performance is equally important as desktop.
- Respect accessibility and reduced-motion preferences.
- Reuse existing components and dependencies wherever practical.
- Inspect the existing repository before modifying anything.
- Do not break existing routes, ordering or reservation functionality.

## Technical expectations

Use the existing React + Vite architecture.

Prefer:
- CSS for simple transitions.
- GSAP for cinematic scroll storytelling.
- Canvas for lightweight particle effects.
- HTML video for cinematic footage.
- Three.js only when genuinely necessary.

Implement production-quality, responsive code rather than static mockups.

After each implementation:
1. Verify the affected section.
2. Check desktop and mobile.
3. Fix console errors.
4. Report modified files.
5. Report remaining dependencies and assets.

The objective is to make Asian Castle feel like an exceptionally luxurious dining destination, not a website demonstrating animation libraries.