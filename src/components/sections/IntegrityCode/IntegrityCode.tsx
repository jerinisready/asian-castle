import { Fragment } from 'react'
import type { IntegrityContent } from '../../../data/types'
import { cx } from '../../../utils/cx'
import { Eyebrow } from '../../ui/Eyebrow/Eyebrow'
import { Icon } from '../../ui/Icon/Icon'
import { Container } from '../../ui/Section/Container'
import { Section } from '../../ui/Section/Section'
import { SectionHeader } from '../../ui/SectionHeader/SectionHeader'
import styles from './IntegrityCode.module.css'

interface IntegrityCodeProps {
  id: string
  content: IntegrityContent
}

/** Trust manifesto: six standards the kitchen commits to. */
export function IntegrityCode({ id, content }: IntegrityCodeProps) {
  return (
    <Section id={id} tone="low" spacing="xl" className={styles.section} aria-labelledby={`${id}-title`}>
      <Container className={styles.inner}>
        <SectionHeader
          aside={
            <p className={cx('type-label-sm', styles.tags)}>
              {content.tags.map((tag, index) => (
                <Fragment key={tag}>
                  {index > 0 && <span aria-hidden="true">•</span>}
                  <span>{tag}</span>
                </Fragment>
              ))}
            </p>
          }
        >
          <Eyebrow icon={content.eyebrow.icon}>{content.eyebrow.label}</Eyebrow>
          <h2 id={`${id}-title`} className={cx('type-headline-lg', styles.title)}>
            {content.title}
          </h2>
        </SectionHeader>

        <ul className={styles.grid}>
          {content.badges.map((badge) => (
            <li key={badge.title} className={styles.badge}>
              <span className={styles.badgeIcon}>
                <Icon name={badge.icon} size={22} />
              </span>
              <span className={cx('type-headline-sm', styles.badgeValue)}>{badge.value}</span>
              <span className={cx('type-label-sm', styles.badgeTitle)}>{badge.title}</span>
              <span className={cx('type-body-sm', styles.badgeDescription)}>{badge.description}</span>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
