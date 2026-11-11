import { useEffect, useId, useRef, type MouseEvent, type ReactNode } from 'react'
import type { IconName } from '../../../design-system/iconNames'
import { cx } from '../../../utils/cx'
import { Icon } from '../Icon/Icon'
import styles from './Sheet.module.css'

interface SheetProps {
  /** Referenced by the opener's aria-controls. */
  id?: string
  open: boolean
  /** Called whenever the sheet closes (close button, Esc, backdrop, or `open` set to false). */
  onClose: () => void
  title: ReactNode
  closeLabel: string
  closeIcon?: IconName
  /** Media query that, once it matches, closes the sheet (e.g. when the desktop nav takes over). */
  closeWhen?: string
  /** Pinned below the scrolling body (totals, primary actions). */
  footer?: ReactNode
  children: ReactNode
}

/**
 * Right-hand side sheet on a native modal <dialog>: focus is trapped, Esc closes,
 * focus returns to the element that opened it, and in-page (#) links inside it close it.
 */
export function Sheet({ id, open, onClose, title, closeLabel, closeIcon = 'close', closeWhen, footer, children }: SheetProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId = useId()

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  useEffect(() => {
    if (!open || !closeWhen) return
    const query = window.matchMedia(closeWhen)
    const handleChange = () => {
      if (query.matches) dialogRef.current?.close()
    }
    query.addEventListener('change', handleChange)
    return () => query.removeEventListener('change', handleChange)
  }, [open, closeWhen])

  const close = () => dialogRef.current?.close()

  const handleClick = (event: MouseEvent<HTMLDialogElement>) => {
    // A click on the dialog element itself is a click on the backdrop.
    if (event.target === event.currentTarget) {
      close()
      return
    }
    // In-page links: close now, before the browser follows the link. While the dialog is
    // modal the page behind it cannot scroll to the target.
    if (event.target instanceof Element && event.target.closest('a[href^="#"]')) close()
  }

  return (
    <dialog
      ref={dialogRef}
      id={id}
      className={styles.sheet}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={handleClick}
    >
      <div className={styles.panel}>
        <div className={styles.top}>
          <h2 id={titleId} className={cx('type-headline-sm', styles.title)}>
            {title}
          </h2>
          <button type="button" className={styles.close} aria-label={closeLabel} onClick={close}>
            <Icon name={closeIcon} size="xl" tone="accent" />
          </button>
        </div>
        <div className={styles.body}>{children}</div>
        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </dialog>
  )
}
