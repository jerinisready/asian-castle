import { cx } from '../../../utils/cx'
import styles from './SkipLink.module.css'

interface SkipLinkProps {
  href: string
  label: string
}

/** First focusable element. Hidden until it receives keyboard focus. */
export function SkipLink({ href, label }: SkipLinkProps) {
  return (
    <a href={href} className={cx('type-label-md', styles.skip)}>
      {label}
    </a>
  )
}
