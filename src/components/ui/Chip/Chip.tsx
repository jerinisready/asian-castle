import type { ReactNode } from 'react'
import { cx } from '../../../utils/cx'
import styles from './Chip.module.css'

interface ChipProps {
  tone?: 'container' | 'highest'
  /** Renders a button with a hover state. Pass `onClick`; without it, prefer a plain chip. */
  interactive?: boolean
  onClick?: () => void
  /** Renders an external link (new tab) with a hover state. */
  href?: string
  className?: string
  children: ReactNode
}

/** Small brass-text capsule, e.g. delivery partner names. */
export function Chip({ tone = 'container', interactive = false, onClick, href, className, children }: ChipProps) {
  const classes = cx('type-label-sm', styles.chip, styles[tone], (interactive || href) && styles.interactive, className)
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    )
  }
  if (interactive) {
    return (
      <button type="button" className={classes} onClick={onClick}>
        {children}
      </button>
    )
  }
  return <span className={classes}>{children}</span>
}
