import type { HeaderContent, SiteInfo } from '../../../data/types'
import { cx } from '../../../utils/cx'
import { ButtonLink } from '../../ui/Button/ButtonLink'
import { Icon } from '../../ui/Icon/Icon'
import styles from './SiteHeader.module.css'

interface SiteHeaderProps {
  site: SiteInfo
  content: HeaderContent
  /** id of the section the nav marks as current. */
  activeId: string
  onNavigate?: (id: string) => void
  cartCount: number
  homeHref: string
}

/** Fixed glass header: brand, capsule nav (from 1280px), reserve CTA and table-order bag. */
export function SiteHeader({ site, content, activeId, onNavigate, cartCount, homeHref }: SiteHeaderProps) {
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
            const active = item.id === activeId
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
            <Icon name={content.reserve.icon} size={16} tone="accent" />
          </ButtonLink>
          <button type="button" className={styles.cart} aria-label={cartLabel}>
            <Icon name="shopping_bag" size={22} tone="accent" />
            {cartCount > 0 && <span className={cx('type-label-sm', styles.cartCount)}>{cartCount}</span>}
          </button>
          <span className={styles.avatar} role="img" aria-label={content.accountLabel}>
            <Icon name="person" size={18} />
          </span>
        </div>
      </div>
    </header>
  )
}
