import type { CSSProperties } from 'react'
import type { IconName } from '../../../design-system/iconNames'
import { cx } from '../../../utils/cx'
import styles from './Icon.module.css'

export type IconTone = 'inherit' | 'accent' | 'muted' | 'strong'

interface IconProps {
  name: IconName
  /** Glyph size in px. */
  size?: number
  tone?: IconTone
  className?: string
  /** Accessible name. Omit for decorative icons (the default). */
  label?: string
}

/** Material Symbols glyph. Swap the implementation here to change icon sets site-wide. */
export function Icon({ name, size = 24, tone = 'inherit', className, label }: IconProps) {
  const style = { '--icon-size': `${size}px` } as CSSProperties
  return (
    <span
      className={cx('material-symbols-outlined', styles.icon, styles[tone], className)}
      style={style}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {name}
    </span>
  )
}
