import type { CSSProperties } from 'react'
import type { IconName } from '../../../design-system/iconNames'
import { iconSizes, type IconSize } from '../../../design-system/tokens'
import { cx } from '../../../utils/cx'
import styles from './Icon.module.css'

export type IconTone = 'inherit' | 'accent' | 'gold' | 'muted' | 'strong'

interface IconProps {
  name: IconName
  /** Size token (xs 14 · sm 16 · md 18 · lg 20 · xl 22 · 2xl 24 · 3xl 28) or px. Prefer tokens. */
  size?: IconSize | number
  tone?: IconTone
  className?: string
  /** Accessible name. Omit for decorative icons (the default). */
  label?: string
}

/** Material Symbols glyph. Swap the implementation here to change icon sets site-wide. */
export function Icon({ name, size = '2xl', tone = 'inherit', className, label }: IconProps) {
  const px = typeof size === 'number' ? size : iconSizes[size]
  const style = { '--icon-size': `${px}px` } as CSSProperties
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
