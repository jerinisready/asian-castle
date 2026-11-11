import type { ReactNode } from 'react'
import type { IconName } from '../../../design-system/iconNames'
import type { IconSize } from '../../../design-system/tokens'
import { cx } from '../../../utils/cx'
import { Icon } from '../Icon/Icon'
import styles from './Eyebrow.module.css'

interface EyebrowProps {
  icon: IconName
  iconSize?: IconSize | number
  className?: string
  children: ReactNode
}

/** Heritage label (Cinzel caps, antique gold) with an icon, set above section titles. */
export function Eyebrow({ icon, iconSize = 'lg', className, children }: EyebrowProps) {
  return (
    <p className={cx(styles.eyebrow, className)}>
      <Icon name={icon} size={iconSize} tone="gold" />
      <span className="type-label-eyebrow">{children}</span>
    </p>
  )
}
