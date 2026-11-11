import type { SignatureContent, TableItem } from '../../../data/types'
import { cx } from '../../../utils/cx'
import { DumSteam } from '../../effects/DumSteam/DumSteam'
import { Button } from '../../ui/Button/Button'
import { CoverImage } from '../../ui/CoverImage/CoverImage'
import { Eyebrow } from '../../ui/Eyebrow/Eyebrow'
import { Icon } from '../../ui/Icon/Icon'
import { Container } from '../../ui/Section/Container'
import { Section } from '../../ui/Section/Section'
import styles from './SignaturePot.module.css'

interface SignaturePotProps {
  content: SignatureContent
  onAddItem: (item: TableItem) => void
}

/** The house biryani: steaming pot on one side, its story and specs on the other. */
export function SignaturePot({ content, onAddItem }: SignaturePotProps) {
  const { panel, title, specs, addAction, sidesAction } = content

  return (
    <Section tone="surface" className={styles.section} aria-labelledby="signature-title">
      <Container className={styles.grid}>
        <div className={styles.mediaColumn}>
          <figure className={styles.frame}>
            <CoverImage image={content.image} className={styles.image} />
            <div className={styles.steamLayer}>
              <DumSteam />
            </div>
            <figcaption className={styles.panel}>
              <span className={styles.panelMain}>
                <Icon name={panel.icon} size={22} tone="accent" />
                <span className={styles.panelText}>
                  <span className={cx('type-label-sm', styles.panelTitle)}>{panel.title}</span>
                  <span className={cx('type-body-sm', styles.panelSubtitle)}>{panel.subtitle}</span>
                </span>
              </span>
              <span className={cx('type-headline-sm', styles.price)}>{panel.price}</span>
            </figcaption>
          </figure>
        </div>

        <div className={styles.story}>
          <Eyebrow icon={content.eyebrow.icon} iconSize={18}>
            {content.eyebrow.label}
          </Eyebrow>
          <h2 id="signature-title" className={cx('type-headline-lg', styles.title)}>
            {title.lead}
            <br />
            <span className={styles.titleAccent}>{title.accent}</span>
          </h2>

          <ul className={styles.specs}>
            {specs.map((spec) => (
              <li key={spec.title} className={styles.spec}>
                <Icon name={spec.icon} size={22} tone="accent" className={styles.specIcon} />
                <span className={styles.specText}>
                  <span className={cx('type-label-md', styles.specTitle)}>{spec.title}</span>
                  <span className={cx('type-body-sm', styles.specDescription)}>{spec.description}</span>
                </span>
              </li>
            ))}
          </ul>

          <div className={styles.actions}>
            <Button size="lg" onClick={() => onAddItem(addAction.item)}>
              <Icon name={addAction.icon} size={18} tone="accent" />
              <span>{addAction.label}</span>
            </Button>
            <Button variant="secondary" onClick={() => window.alert(sidesAction.message)}>
              <Icon name={sidesAction.icon} size={18} />
              <span>{sidesAction.label}</span>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  )
}
