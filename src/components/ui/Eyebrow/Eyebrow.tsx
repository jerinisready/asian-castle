import type { ReactNode } from 'react'
import type { IconName } from '../../../design-system/iconNames'
import { cx } from '../../../utils/cx'
import { Icon } from '../Icon/Icon'
import styles from './Eyebrow.module.css'

interface EyebrowProps {
  icon: IconName
  iconSize?: number
  className?: string
  children: ReactNode
}

/** Brass uppercase label with an icon, set above section titles. */
export function Eyebrow({ icon, iconSize = 20, className, children }: EyebrowProps) {
  return (
    <p className={cx(styles.eyebrow, className)}>
      <Icon name={icon} size={iconSize} tone="accent" />
      <span className="type-label-eyebrow">{children}</span>
    </p>
  )
}
