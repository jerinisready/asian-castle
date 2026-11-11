import { useId, type FormEvent, type ReactNode } from 'react'
import type { ReservationContent } from '../../../data/types'
import { cx } from '../../../utils/cx'
import { Button } from '../../ui/Button/Button'
import { Eyebrow } from '../../ui/Eyebrow/Eyebrow'
import { Icon } from '../../ui/Icon/Icon'
import { Container } from '../../ui/Section/Container'
import { Section } from '../../ui/Section/Section'
import { SectionHeader } from '../../ui/SectionHeader/SectionHeader'
import styles from './Reservation.module.css'

interface ReservationProps {
  id: string
  formId: string
  content: ReservationContent
  /** Rendered inside the panel, below the form (e.g. the community block). */
  children?: ReactNode
}

/**
 * Table booking panel.
 * No backend yet: submitting shows the design's confirmation message and resets the form.
 */
export function Reservation({ id, formId, content, children }: ReservationProps) {
  const fieldId = useId()
  const { fields } = content

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    window.alert(content.successMessage)
    event.currentTarget.reset()
  }

  return (
    <Section id={id} tone="surface" aria-labelledby={`${id}-title`}>
      <Container width="narrow" className={styles.panel}>
        <SectionHeader
          align="center"
          className={styles.header}
          aside={
            <p className={cx('type-label-sm', styles.badge)}>
              <Icon name={content.badge.icon} size={18} />
              <span>{content.badge.label}</span>
            </p>
          }
        >
          <Eyebrow icon={content.eyebrow.icon}>{content.eyebrow.label}</Eyebrow>
          <h2 id={`${id}-title`} className={cx('type-headline-lg', styles.title)}>
            {content.title}
          </h2>
        </SectionHeader>

        <form id={formId} className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor={`${fieldId}-name`} className={cx('type-label-sm', styles.label)}>
              {fields.name.label}
            </label>
            <input
              id={`${fieldId}-name`}
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder={fields.name.placeholder}
              className={cx('type-body-sm', styles.control)}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor={`${fieldId}-contact`} className={cx('type-label-sm', styles.label)}>
              {fields.contact.label}
            </label>
            <input
              id={`${fieldId}-contact`}
              name="contact"
              type="tel"
              required
              autoComplete="tel"
              placeholder={fields.contact.placeholder}
              className={cx('type-body-sm', styles.control)}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor={`${fieldId}-party`} className={cx('type-label-sm', styles.label)}>
              {fields.partySize.label}
            </label>
            <select id={`${fieldId}-party`} name="partySize" className={cx('type-body-sm', styles.control)}>
              {fields.partySize.options.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>
          <div className={styles.field}>
            <label htmlFor={`${fieldId}-date`} className={cx('type-label-sm', styles.label)}>
              {fields.date.label}
            </label>
            <input
              id={`${fieldId}-date`}
              name="date"
              type="date"
              required
              className={cx('type-body-sm', styles.control)}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor={`${fieldId}-slot`} className={cx('type-label-sm', styles.label)}>
              {fields.timeSlot.label}
            </label>
            <select id={`${fieldId}-slot`} name="timeSlot" className={cx('type-body-sm', styles.control)}>
              {fields.timeSlot.options.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>
          <div className={styles.field}>
            <label htmlFor={`${fieldId}-preference`} className={cx('type-label-sm', styles.label)}>
              {fields.preference.label}
            </label>
            <select
              id={`${fieldId}-preference`}
              name="preference"
              className={cx('type-body-sm', styles.control)}
            >
              {fields.preference.options.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>

          <div className={styles.formFooter}>
            <p className={cx('type-label-sm', styles.note)}>
              <Icon name={content.note.icon} size={18} tone="accent" />
              <span>{content.note.label}</span>
            </p>
            <Button type="submit" size="xl">
              <span>{content.submit.label}</span>
              <Icon name={content.submit.icon} size={18} tone="accent" />
            </Button>
          </div>
        </form>

        {children}
      </Container>
    </Section>
  )
}
