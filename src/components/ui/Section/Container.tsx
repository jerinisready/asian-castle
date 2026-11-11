import type { HTMLAttributes, ReactNode } from 'react'
import { cx } from '../../../utils/cx'
import styles from './Container.module.css'

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  width?: 'default' | 'narrow'
  children: ReactNode
}

/** Centres content at the site's max width. */
export function Container({ width = 'default', className, children, ...rest }: ContainerProps) {
  return (
    <div className={cx(styles.container, styles[width], className)} {...rest}>
      {children}
    </div>
  )
}
