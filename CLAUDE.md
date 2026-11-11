
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

