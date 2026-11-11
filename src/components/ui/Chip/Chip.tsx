import type { ReactNode } from 'react'
import { cx } from '../../../utils/cx'
import styles from './Chip.module.css'

interface ChipProps {
  tone?: 'container' | 'highest'
  /** Renders a button with a hover state. */
  interactive?: boolean
  onClick?: () => void
  className?: string
  children: ReactNode
}

/** Small brass-text capsule, e.g. delivery partner names. */
export function Chip({ tone = 'container', interactive = false, onClick, className, children }: ChipProps) {
  const classes = cx('type-label-sm', styles.chip, styles[tone], interactive && styles.interactive, className)
  if (interactive) {
    return (
      <button type="button" className={classes} onClick={onClick}>
        {children}
      </button>
    )
  }
  return <span className={classes}>{children}</span>
}
