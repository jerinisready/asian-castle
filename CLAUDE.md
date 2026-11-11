
# ASIAN CASTLE — Development Rules

## Project
Luxury restaurant landing page.
React + TypeScript + Vite.

## Brand
Luxury hotel dining aesthetic.
Dark charcoal, antique gold, warm ivory.
Elegant serif headings, clean sans-serif body.


Next.js static export on GitHub Pages. Mobile first. Data: data/menu.js, lib/site.js.
Brand: leaf #0F2B21, gold #C8A24A, rice #ECE4D2. Fonts: Cormorant Garamond + Hanken Grotesk.
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

