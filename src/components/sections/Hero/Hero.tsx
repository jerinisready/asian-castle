import type { HeroContent } from '../../../data/types'
import { cx } from '../../../utils/cx'
import { whatsappLink } from '../../../utils/links'
import { HearthShader } from '../../effects/HearthShader/HearthShader'
import { ButtonLink } from '../../ui/Button/ButtonLink'
import { Chip } from '../../ui/Chip/Chip'
import { CoverImage } from '../../ui/CoverImage/CoverImage'
import { Icon } from '../../ui/Icon/Icon'
import styles from './Hero.module.css'

interface HeroProps {
  id: string
  content: HeroContent
  whatsappNumber: string
}

/** Chapter 1 — Arrival. Narrative, key facts and actions beside the arched dining-room portal. */
export function Hero({ id, content, whatsappNumber }: HeroProps) {
  const { pill, headline, metrics, parking, partners, showcase, rating } = content

  return (
    <section id={id} className={styles.hero} aria-labelledby={`${id}-title`}>
      <HearthShader className={styles.shader} />
      <div className={styles.fade} aria-hidden="true" />
      <div className={styles.glowBurgundy} aria-hidden="true" />
      <div className={styles.glowBrass} aria-hidden="true" />

      <div className={styles.grid}>
        <div className={styles.story}>
          <p className={styles.pill}>
            <Icon name={pill.icon} size={18} tone="accent" />
            <span className={cx('type-label-eyebrow', styles.pillText)}>{pill.label}</span>
          </p>

          <div className={styles.headline}>
            <h1 id={`${id}-title`} className={cx('type-display-hero', styles.title)}>
              {headline.lead}
              <br />
              <span className={styles.titleAccent}>{headline.accent}</span>
            </h1>
            <div className={styles.rule} aria-hidden="true" />
          </div>

          <ul className={styles.metrics}>
            {metrics.map((metric) => (
              <li key={metric.label} className={styles.metric}>
                <span className={styles.metricIcon}>
                  <Icon name={metric.icon} size={20} tone="accent" />
                </span>
                <span className={styles.metricText}>
                  <span className={cx('type-headline-sm', styles.metricValue)}>{metric.value}</span>
                  <span className={cx('type-label-sm', styles.metricLabel)}>{metric.label}</span>
                </span>
              </li>
            ))}
            <li className={styles.parkingItem}>
              <a href={parking.href} target="_blank" rel="noopener noreferrer" className={styles.parking}>
                <span className={styles.parkingMain}>
                  <span className={cx(styles.metricIcon, styles.parkingIcon)}>
                    <Icon name={parking.icon} size={18} tone="accent" />
                  </span>
                  <span className={styles.metricText}>
                    <span className={cx('type-label-sm', styles.parkingTitle)}>{parking.title}</span>
                    <span className={cx('type-label-sm', styles.metricLabel)}>{parking.subtitle}</span>
                  </span>
                </span>
                <span className={cx('type-label-sm', styles.navigate)}>
                  <span>{parking.action.label}</span>
                  <Icon name={parking.action.icon} size={14} />
                </span>
              </a>
            </li>
          </ul>

          <div className={styles.actions}>
            <ButtonLink href={content.reserveAction.href} size="lg" className={styles.reserveButton}>
              <Icon name={content.reserveAction.icon} size={20} tone="accent" className={styles.reserveIcon} />
              <span>{content.reserveAction.label}</span>
              <Icon name="arrow_forward" size={18} />
            </ButtonLink>
            <ButtonLink href={content.menuAction.href} variant="secondary" className={styles.menuButton}>
              <Icon name={content.menuAction.icon} size={20} />
              <span>{content.menuAction.label}</span>
            </ButtonLink>
            <ButtonLink
              href={whatsappLink(whatsappNumber, content.whatsappAction.message)}
              variant="quiet"
              external
            >
              <Icon name={content.whatsappAction.icon} size={16} tone="accent" />
              <span>{content.whatsappAction.label}</span>
            </ButtonLink>
          </div>

          <div className={styles.partners}>
            <span className={cx('type-label-sm', styles.partnersLabel)}>{partners.label}</span>
            <div className={styles.partnerList}>
              {partners.items.map((partner) => (
                <Chip key={partner} tone="highest" interactive>
                  {partner}
                </Chip>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.showcase}>
          <figure className={styles.arch}>
            <CoverImage image={showcase.image} priority className={styles.archImage} />
            <div className={styles.archShade} aria-hidden="true" />
            <div className={styles.crest} aria-hidden="true">
              <span className={styles.crestBadge}>
                <Icon name={showcase.crestIcon} size={28} tone="accent" />
              </span>
            </div>
            <figcaption className={styles.status}>
              <span className={styles.statusMain}>
                <span className={styles.liveDot} aria-hidden="true" />
                <span className={styles.statusText}>
                  <span className={cx('type-label-sm', styles.statusTitle)}>{showcase.status.title}</span>
                  <span className={cx('type-body-sm', styles.statusSubtitle)}>{showcase.status.subtitle}</span>
                </span>
              </span>
              <span className={styles.statusTime}>
                <Icon name={showcase.status.icon} size={16} />
                <span className={cx('type-label-sm', styles.statusTimeText)}>{showcase.status.until}</span>
              </span>
            </figcaption>
          </figure>

          <div className={styles.rating}>
            <span className={styles.ratingIcon}>
              <Icon name={rating.icon} size={26} />
            </span>
            <span className={styles.ratingText}>
              <span className={styles.ratingValueRow}>
                <span className={cx('type-headline-sm', styles.ratingValue)}>{rating.value}</span>
                <Icon name={rating.valueIcon} size={16} />
              </span>
              <span className={cx('type-label-sm', styles.ratingLabel)}>{rating.label}</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
