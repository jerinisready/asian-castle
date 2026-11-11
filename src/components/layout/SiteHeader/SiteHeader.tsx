import { useCallback, useId, useState } from 'react'
import type { HeaderContent, SiteInfo } from '../../../data/types'
import { cx } from '../../../utils/cx'
import { whatsappLink } from '../../../utils/links'
import { isNavItemActive } from '../../../utils/nav'
import { ButtonLink } from '../../ui/Button/ButtonLink'
import { Icon } from '../../ui/Icon/Icon'
import { MobileNav } from '../MobileNav/MobileNav'
import styles from './SiteHeader.module.css'

interface SiteHeaderProps {
  site: SiteInfo
  content: HeaderContent
  /** id of the section currently in view; nav items covering it are marked current. */
  activeId: string
  onNavigate?: (id: string) => void
  cartCount: number
  homeHref: string
}

/**
 * Fixed glass header: brand, capsule nav (from 1280px), reserve CTA, table-order bag,
 * and a navigation sheet toggle below 1280px.
 */
export function SiteHeader({ site, content, activeId, onNavigate, cartCount, homeHref }: SiteHeaderProps) {
  const [navOpen, setNavOpen] = useState(false)
  const navSheetId = useId()
  const closeNav = useCallback(() => setNavOpen(false), [])

  const cartLabel =
    cartCount > 0 ? `${content.cartLabel}, ${cartCount} ${cartCount === 1 ? 'item' : 'items'}` : content.cartLabel

  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        <a href={homeHref} className={styles.brand}>
          <img className={styles.logo} src={site.logo.src} alt={site.logo.alt} width={40} height={40} />
          <span className={styles.brandText}>
            <span className={cx('type-headline-sm', styles.brandName)}>{site.name}</span>
            <span className={cx('type-label-sm', styles.brandTagline)}>{site.tagline}</span>
          </span>
        </a>

        <nav aria-label="Primary" className={styles.nav}>
          {content.nav.map((item) => {
            const active = isNavItemActive(item, activeId)
            return (
              <a
                key={item.id}
                href={item.href}
                aria-current={active ? 'location' : undefined}
                className={cx('type-label-md', styles.navLink, active && styles.navLinkActive)}
                onClick={() => onNavigate?.(item.id)}
              >
                {item.label}
              </a>
            )
          })}
        </nav>

        <div className={styles.actions}>
          <ButtonLink href={content.reserve.href} size="sm" className={styles.reserve}>
            <span>{content.reserve.label}</span>
            <Icon name={content.reserve.icon} size="sm" tone="accent" />
          </ButtonLink>
          <button type="button" className={styles.cart} aria-label={cartLabel}>
            <Icon name="shopping_bag" size="xl" tone="accent" />
            {cartCount > 0 && <span className={cx('type-label-sm', styles.cartCount)}>{cartCount}</span>}
          </button>
          <span className={styles.avatar} role="img" aria-label={content.accountLabel}>
            <Icon name="person" size="md" />
          </span>
          <button
            type="button"
            className={styles.menuToggle}
            aria-label={content.mobileNav.openLabel}
            aria-haspopup="dialog"
            aria-expanded={navOpen}
            aria-controls={navSheetId}
            onClick={() => setNavOpen(true)}
          >
            <Icon name={content.mobileNav.openIcon} size="xl" tone="accent" />
          </button>
        </div>
      </div>

      <MobileNav
        id={navSheetId}
        open={navOpen}
        onClose={closeNav}
        items={content.nav}
        activeSectionId={activeId}
        content={content.mobileNav}
        reserve={content.reserve}
        whatsappHref={whatsappLink(site.whatsappNumber, content.mobileNav.whatsapp.message)}
      />
    </header>
  )
}
