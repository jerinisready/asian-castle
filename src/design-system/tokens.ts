/*
 * TypeScript mirror of the tokens that JavaScript needs (media queries, Motion, icon sizes).
 * Source of truth is tokens.css; keep the two in sync.
 */

/** Min-width breakpoints in px. mobile < sm · tablet ≥ md · desktop ≥ lg · wide ≥ xl. */
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const

export type Breakpoint = keyof typeof breakpoints

/** `(min-width: …px)` strings for matchMedia / useMediaQuery. */
export const mediaQueries = {
  sm: `(min-width: ${breakpoints.sm}px)`,
  md: `(min-width: ${breakpoints.md}px)`,
  lg: `(min-width: ${breakpoints.lg}px)`,
  xl: `(min-width: ${breakpoints.xl}px)`,
  reducedMotion: '(prefers-reduced-motion: reduce)',
  coarsePointer: '(pointer: coarse)',
} as const

/** Durations in seconds (Motion's unit). Mirrors --duration-*. */
export const durations = {
  fast: 0.15,
  medium: 0.3,
  slow: 0.5,
  slower: 0.7,
} as const

/** Cubic-bezier control points for Motion. Mirrors --ease-*. */
export const easings = {
  standard: [0.4, 0, 0.2, 1],
  out: [0.22, 1, 0.36, 1],
  inOut: [0.65, 0, 0.35, 1],
} as const

/** Interaction values. Mirrors --hover-zoom / --press-scale. */
export const interaction = {
  hoverZoom: 1.05,
  pressScale: 0.97,
} as const

/** Icon sizes in px. Mirrors --icon-*. */
export const iconSizes = {
  xs: 14,
  sm: 16,
  md: 18,
  lg: 20,
  xl: 22,
  '2xl': 24,
  '3xl': 28,
} as const

export type IconSize = keyof typeof iconSizes
