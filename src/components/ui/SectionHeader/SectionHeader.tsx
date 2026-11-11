import type { ReactNode } from 'react'
import { cx } from '../../../utils/cx'
import styles from './SectionHeader.module.css'

interface SectionHeaderProps {
  /** Eyebrow, title and description. */
  children: ReactNode
  /** Content shown on the right from 768px up (badges, tags, a CTA). */
  aside?: ReactNode
  gap?: 'sm' | 'md'
  align?: 'end' | 'center'
  className?: string
}

/** Section intro row: text block on the left, optional aside on the right. */
export function SectionHeader({ children, aside, gap = 'sm', align = 'end', className }: SectionHeaderProps) {
  return (
    <div className={cx(styles.header, styles[`gap-${gap}`], styles[`align-${align}`], className)}>
      <div className={styles.intro}>{children}</div>
      {aside}
    </div>
  )
}
