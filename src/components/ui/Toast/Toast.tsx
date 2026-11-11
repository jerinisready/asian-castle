import type { IconName } from '../../../design-system/iconNames'
import { cx } from '../../../utils/cx'
import { Icon } from '../Icon/Icon'
import styles from './Toast.module.css'

interface ToastProps {
  visible: boolean
  title: string
  message: string
  icon?: IconName
}

/** Bottom-right confirmation. Always mounted so screen readers hear updates. */
export function Toast({ visible, title, message, icon = 'check_circle' }: ToastProps) {
  return (
    <div role="status" aria-live="polite" className={cx(styles.toast, visible && styles.visible)}>
      <span className={styles.icon}>
        <Icon name={icon} size="xl" />
      </span>
      <span className={styles.text}>
        <span className={cx('type-label-md', styles.title)}>{title}</span>
        <span className={cx('type-body-sm', styles.message)}>{message}</span>
      </span>
    </div>
  )
}
