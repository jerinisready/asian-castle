import { useId, useState } from 'react'
import type { ProximityContent } from '../../../data/types'
import { cx } from '../../../utils/cx'
import { estimateDelivery } from '../../../utils/delivery'
import { Chip } from '../../ui/Chip/Chip'
import { Eyebrow } from '../../ui/Eyebrow/Eyebrow'
import { Icon } from '../../ui/Icon/Icon'
import { Section } from '../../ui/Section/Section'
import styles from './ProximityHub.module.css'

interface ProximityHubProps {
  /** Anchor id for in-page navigation. */
  id?: string
  content: ProximityContent
  parkingMapUrl: string
}

/** Delivery estimate by distance, plus the restaurant's location and parking. */
export function ProximityHub({ id, content, parkingMapUrl }: ProximityHubProps) {
  const { distance, labels, location, parking } = content
  const [distanceKm, setDistanceKm] = useState(distance.initial)
  const estimate = estimateDelivery(distanceKm, content.tiers)
  const sliderId = useId()

  return (
    <Section id={id} tone="low" spacing="xl" className={styles.section} aria-labelledby="proximity-title">
      <div className={styles.card}>
        <div className={styles.story}>
          <Eyebrow icon={content.eyebrow.icon}>{content.eyebrow.label}</Eyebrow>
          <div>
            <h2 id="proximity-title" className={cx('type-headline-lg', styles.title)}>
              {content.title}
            </h2>
            <p className={cx('type-body-md', styles.description)}>{content.description}</p>
          </div>

          <div className={styles.calculator}>
            <div className={styles.calculatorHead}>
              <label htmlFor={sliderId} className={cx('type-label-md', styles.distanceLabel)}>
                {distance.label}
              </label>
              <output htmlFor={sliderId} className={cx('type-headline-sm', styles.distanceValue)}>
                {distanceKm.toFixed(1)} {labels.distanceUnit}
              </output>
            </div>
            <input
              id={sliderId}
              type="range"
              min={distance.min}
              max={distance.max}
              step={distance.step}
              value={distanceKm}
              onChange={(event) => setDistanceKm(Number(event.target.value))}
              className={styles.range}
            />
            <dl className={styles.metrics} aria-live="polite">
              <div className={styles.metric}>
                <dt className={cx('type-label-sm', styles.metricLabel)}>{labels.fee}</dt>
                <dd className={cx('type-headline-sm', styles.metricValue, estimate.free && styles.metricValueFree)}>
                  {estimate.fee}
                </dd>
              </div>
              <div className={styles.metric}>
                <dt className={cx('type-label-sm', styles.metricLabel)}>{labels.eta}</dt>
                <dd className={cx('type-headline-sm', styles.metricValue)}>
                  {estimate.etaMinutes} {labels.etaUnit}
                </dd>
              </div>
              <div className={styles.metric}>
                <dt className={cx('type-label-sm', styles.metricLabel)}>{labels.freshness}</dt>
                <dd className={styles.freshness}>
                  <Icon name={labels.freshnessIcon} size="sm" />
                  <span className="type-label-md">
                    {labels.freshnessState} ({estimate.freshness}%)
                  </span>
                </dd>
              </div>
            </dl>
          </div>

          <div className={styles.partners}>
            <span className={cx('type-label-sm', styles.partnersLabel)}>{content.partners.label}</span>
            <div className={styles.partnerList}>
              {content.partners.items.map((partner) => (
                <Chip key={partner}>{partner}</Chip>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.aside}>
          <div className={styles.map}>
            <div className={styles.mapOverlay}>
              <p className={styles.pin}>
                <Icon name={location.icon} size="2xl" tone="accent" />
                <span className={styles.pinText}>
                  <span className={cx('type-label-md', styles.pinTitle)}>{location.title}</span>
                  <span className={cx('type-body-sm', styles.pinSubtitle)}>{location.subtitle}</span>
                </span>
              </p>
            </div>
          </div>

          <div className={styles.parking}>
            <p className={styles.parkingMain}>
              <Icon name={parking.icon} size="lg" tone="accent" />
              <span className={styles.pinText}>
                <span className={cx('type-body-sm', styles.parkingTitle)}>{parking.title}</span>
                <span className={cx('type-label-sm', styles.pinSubtitle)}>{parking.subtitle}</span>
              </span>
            </p>
            <a
              href={parkingMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cx('type-label-sm', styles.parkingLink)}
            >
              <Icon name={parking.action.icon} size="sm" />
              <span>{parking.action.label}</span>
            </a>
          </div>
        </div>
      </div>
    </Section>
  )
}
