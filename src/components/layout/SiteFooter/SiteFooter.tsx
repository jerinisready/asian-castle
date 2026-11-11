import type { FooterContent, SiteInfo } from '../../../data/types'
import { cx } from '../../../utils/cx'
import { telLink, whatsappLink } from '../../../utils/links'
import { Chip } from '../../ui/Chip/Chip'
import { Icon } from '../../ui/Icon/Icon'
import styles from './SiteFooter.module.css'

interface SiteFooterProps {
  site: SiteInfo
  content: FooterContent
}

export function SiteFooter({ site, content }: SiteFooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.columns}>
          <div className={styles.column}>
            <p className={styles.brandRow}>
              <Icon name={content.about.icon} size={26} tone="accent" />
              <span className={cx('type-headline-sm', styles.brandName)}>{site.name}</span>
            </p>
            <p className={cx('type-body-sm', styles.about)}>{content.about.description}</p>
            <p className={styles.aboutEyebrow}>
              <span className={cx('type-label-eyebrow', styles.accent)}>{content.about.eyebrow}</span>
            </p>
          </div>

          <div className={styles.column}>
            <h2 className={cx('type-label-eyebrow', styles.accent)}>{content.hours.heading}</h2>
            <address className={cx('type-body-sm', styles.address)}>
              {site.addressLines[0]}
              <br />
              {site.addressLines[1]}
            </address>
            <p className={styles.hours}>
              <Icon name={content.hours.icon} size={16} />
              <span className="type-body-sm">{site.hours}</span>
            </p>
          </div>

          <div className={styles.column}>
            <h2 className={cx('type-label-eyebrow', styles.accent)}>{content.contact.heading}</h2>
            <a className={cx('type-body-sm', styles.contactLink)} href={telLink(site.phone.dial)}>
              <Icon name={content.contact.phoneIcon} size={16} tone="accent" />
              <span>{site.phone.display}</span>
            </a>
            <a
              className={cx('type-body-sm', styles.contactLink)}
              href={whatsappLink(site.whatsappNumber)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name={content.contact.whatsappIcon} size={16} tone="accent" />
              <span>{content.contact.whatsappLabel}</span>
            </a>
            <span className={cx('type-label-sm', styles.email)}>
              {content.contact.emailLabel} {site.privateDiningEmail}
            </span>
          </div>

          <div className={styles.column}>
            <h2 className={cx('type-label-eyebrow', styles.accent)}>{content.partners.heading}</h2>
            <p className={cx('type-body-sm', styles.about)}>{content.partners.description}</p>
            <div className={styles.partnerList}>
              {content.partners.items.map((partner) => (
                <Chip key={partner}>{partner}</Chip>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <span className={cx('type-body-sm', styles.copyright)}>{content.copyright}</span>
          <nav aria-label="Legal" className={cx('type-label-sm', styles.legal)}>
            {content.legalLinks.map((link) => (
              <a key={link.label} href={link.href} className={styles.legalLink}>
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
