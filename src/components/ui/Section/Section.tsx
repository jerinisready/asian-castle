import type { HTMLAttributes, ReactNode } from 'react'
import { cx } from '../../../utils/cx'
import styles from './Section.module.css'

export type SectionTone = 'surface' | 'low' | 'lowest'
export type SectionSpacing = 'xl' | '2xl'

interface SectionProps extends HTMLAttributes<HTMLElement> {
  tone?: SectionTone
  spacing?: SectionSpacing
  /** Hairline dividers between sections. */
  borders?: 'top' | 'both'
  children: ReactNode
}

/** Full-bleed page band: background tone, vertical rhythm and side gutters. */
export function Section({ tone = 'surface', spacing = '2xl', borders, className, children, ...rest }: SectionProps) {
  return (
    <section
      className={cx(
        styles.section,
        styles[tone],
        styles[`spacing-${spacing}`],
        borders && styles[`borders-${borders}`],
        className,
      )}
      {...rest}
    >
      {children}
    </section>
  )
}
