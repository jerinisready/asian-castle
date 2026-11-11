import { useEffect, useId, useRef, type MouseEvent } from 'react'
import { mediaQueries } from '../../../design-system/tokens'
import type { HeaderContent, LinkAction, NavItem } from '../../../data/types'
import { cx } from '../../../utils/cx'
import { isNavItemActive } from '../../../utils/nav'
import { ButtonLink } from '../../ui/Button/ButtonLink'
import { Icon } from '../../ui/Icon/Icon'
import styles from './MobileNav.module.css'

interface MobileNavProps {
  /** Referenced by the toggle's aria-controls. */
  id: string
  open: boolean
  onClose: () => void
  items: NavItem[]
  /** Section currently under the reading line. */
  activeSectionId: string
  content: HeaderContent['mobileNav']
  reserve: LinkAction
  whatsappHref: string
}

/**
 * Navigation sheet for screens below 1280px (where the capsule nav is hidden).
 * Native modal <dialog>: focus is trapped, Esc closes, focus returns to the toggle.
 */
export function MobileNav({
  id,
  open,
  onClose,
  items,
  activeSectionId,
  content,
  reserve,
  whatsappHref,
}: MobileNavProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId = useId()

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  // The capsule nav takes over from 1280px; close the sheet if the window grows past it.
  useEffect(() => {
    if (!open) return
    const query = window.matchMedia(mediaQueries.xl)
    const handleChange = () => {
      if (query.matches) dialogRef.current?.close()
    }
    query.addEventListener('change', handleChange)
    return () => query.removeEventListener('change', handleChange)
  }, [open])

  const close = () => dialogRef.current?.close()

  // A click on the dialog element itself is a click on the backdrop.
  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) close()
  }

  return (
    <dialog
      ref={dialogRef}
      id={id}
      className={styles.sheet}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={handleBackdropClick}
    >
      <div className={styles.panel}>
        <div className={styles.top}>
          <p id={titleId} className={cx('type-headline-sm', styles.title)}>
            {content.title}
          </p>
          <button type="button" className={styles.close} aria-label={content.closeLabel} onClick={close}>
            <Icon name={content.closeIcon} size="xl" tone="accent" />
          </button>
        </div>

        <nav aria-label="Primary">
          <ul className={styles.list}>
            {items.map((item) => {
              const active = isNavItemActive(item, activeSectionId)
              return (
                <li key={item.id}>
                  <a
                    href={item.href}
                    aria-current={active ? 'location' : undefined}
                    className={cx('type-headline-md', styles.link, active && styles.linkActive)}
                    onClick={close}
                  >
                    <span className={styles.marker} aria-hidden="true" />
                    {item.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className={styles.actions}>
          <ButtonLink href={reserve.href} size="lg" className={styles.action} onClick={close}>
            <Icon name={reserve.icon} size="md" tone="accent" />
            <span>{reserve.label}</span>
          </ButtonLink>
          <ButtonLink href={whatsappHref} variant="whatsapp" size="lg" external className={styles.action}>
            <Icon name={content.whatsapp.icon} size="md" />
            <span>{content.whatsapp.label}</span>
          </ButtonLink>
        </div>
      </div>
    </dialog>
  )
}
