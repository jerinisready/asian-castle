import type { DispatchContent, TableItem } from '../../../data/types'
import { cx } from '../../../utils/cx'
import { whatsappLink } from '../../../utils/links'
import { ButtonLink } from '../../ui/Button/ButtonLink'
import { Eyebrow } from '../../ui/Eyebrow/Eyebrow'
import { Icon } from '../../ui/Icon/Icon'
import { Container } from '../../ui/Section/Container'
import { Section } from '../../ui/Section/Section'
import { SectionHeader } from '../../ui/SectionHeader/SectionHeader'
import styles from './WhatsAppDispatch.module.css'

interface WhatsAppDispatchProps {
  id: string
  content: DispatchContent
  whatsappNumber: string
  onAddItem: (item: TableItem) => void
}

/** Order-direct offers, each opening a prefilled WhatsApp chat. */
export function WhatsAppDispatch({ id, content, whatsappNumber, onAddItem }: WhatsAppDispatchProps) {
  return (
    <Section id={id} tone="lowest" borders="both" aria-labelledby={`${id}-title`}>
      <Container className={styles.inner}>
        <SectionHeader
          gap="md"
          aside={
            <ButtonLink
              href={whatsappLink(whatsappNumber, content.cta.message)}
              variant="whatsapp"
              size="lg"
              external
              className={styles.cta}
            >
              <Icon name={content.cta.icon} size={20} />
              <span>{content.cta.label}</span>
            </ButtonLink>
          }
        >
          <Eyebrow icon={content.eyebrow.icon}>{content.eyebrow.label}</Eyebrow>
          <h2 id={`${id}-title`} className={cx('type-headline-lg', styles.title)}>
            {content.title}
          </h2>
          <p className={cx('type-body-md', styles.description)}>{content.description}</p>
        </SectionHeader>

        <div className={styles.grid}>
          {content.offers.map((offer) => (
            <article key={offer.id} className={styles.offer}>
              <div className={styles.offerBody}>
                <div className={styles.offerHead}>
                  <span className={cx('type-label-sm', styles.tag, styles[`tag-${offer.tag.tone}`])}>
                    {offer.tag.label}
                  </span>
                  <span className={cx('type-headline-sm', styles.price)}>{offer.price}</span>
                </div>
                <h3 className={cx('type-headline-sm', styles.offerTitle)}>{offer.title}</h3>
                <p className={cx('type-body-sm', styles.offerDescription)}>{offer.description}</p>
                <ul className={cx('type-body-sm', styles.perks)}>
                  {offer.perks.map((perk) => (
                    <li key={perk}>• {perk}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.offerActions}>
                <ButtonLink
                  href={whatsappLink(whatsappNumber, offer.action.message)}
                  external
                  className={styles.offerCta}
                >
                  <Icon name={offer.action.icon} size={18} tone="accent" />
                  <span>{offer.action.label}</span>
                </ButtonLink>
                {offer.addItem && (
                  <button
                    type="button"
                    className={styles.add}
                    aria-label={`Add ${offer.addItem.name} to your table order`}
                    onClick={() => offer.addItem && onAddItem(offer.addItem)}
                  >
                    <Icon name="add" size={20} />
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  )
}
