import { mediaQueries } from '../../../design-system/tokens'
import type { HeaderContent, LinkAction, NavItem } from '../../../data/types'
import { cx } from '../../../utils/cx'
import { isNavItemActive } from '../../../utils/nav'
import { ButtonLink } from '../../ui/Button/ButtonLink'
import { Icon } from '../../ui/Icon/Icon'
import { Sheet } from '../../ui/Sheet/Sheet'
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

/** Navigation sheet for screens below 1280px (where the capsule nav is hidden). */
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
  return (
    <Sheet
      id={id}
      open={open}
      onClose={onClose}
      title={content.title}
      closeLabel={content.closeLabel}
      closeIcon={content.closeIcon}
      closeWhen={mediaQueries.xl}
      footer={
        <>
          <ButtonLink href={reserve.href} size="lg" className={styles.action}>
            <Icon name={reserve.icon} size="md" tone="accent" />
            <span>{reserve.label}</span>
          </ButtonLink>
          <ButtonLink href={whatsappHref} variant="whatsapp" size="lg" external className={styles.action}>
            <Icon name={content.whatsapp.icon} size="md" />
            <span>{content.whatsapp.label}</span>
          </ButtonLink>
        </>
      }
    >
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
                >
                  <span className={styles.marker} aria-hidden="true" />
                  {item.label}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </Sheet>
  )
}
