import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from 'react'
import type { ReservationContent } from '../../../data/types'
import { cx } from '../../../utils/cx'
import { whatsappLink } from '../../../utils/links'
import { buildReservationMessage, readReservationForm, todayInTimeZone } from '../../../utils/reservation'
import { Button } from '../../ui/Button/Button'
import { ButtonLink } from '../../ui/Button/ButtonLink'
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
  /** Digits only, with country code. The request is sent to this WhatsApp number. */
  whatsappNumber: string
  /** Restaurant time zone; dates before today there cannot be chosen. */
  timeZone: string
  /** Rendered inside the panel, below the form (e.g. the community block). */
  children?: ReactNode
}

/**
 * Table booking panel. There is no booking backend: submitting opens WhatsApp with the
 * request prefilled, and the guest sends it. Nothing is stored or sent by the site.
 * The confirmation says so honestly; the table is confirmed by the restaurant's reply.
 */
export function Reservation({ id, formId, content, whatsappNumber, timeZone, children }: ReservationProps) {
  const fieldId = useId()
  const { fields } = content
  const [minDate] = useState(() => todayInTimeZone(timeZone))
  /** WhatsApp link for the last request, kept so the guest can reopen it. */
  const [requestHref, setRequestHref] = useState<string | null>(null)
  const confirmationRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (requestHref) confirmationRef.current?.focus()
  }, [requestHref])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const request = readReservationForm(event.currentTarget)
    const href = whatsappLink(whatsappNumber, buildReservationMessage(request, content.whatsappMessage))
    window.open(href, '_blank', 'noopener,noreferrer')
    setRequestHref(href)
  }

  // Any edit makes the prepared request stale; the guest submits again to refresh it.
  const handleChange = () => {
    if (requestHref) setRequestHref(null)
  }

  return (
    <Section id={id} tone="surface" aria-labelledby={`${id}-title`}>
      <Container width="narrow" className={styles.panel}>
        <SectionHeader
          align="center"
          className={styles.header}
          aside={
            <p className={cx('type-label-sm', styles.badge)}>
              <Icon name={content.badge.icon} size="md" />
              <span>{content.badge.label}</span>
            </p>
          }
        >
          <Eyebrow icon={content.eyebrow.icon}>{content.eyebrow.label}</Eyebrow>
          <h2 id={`${id}-title`} className={cx('type-headline-lg', styles.title)}>
            {content.title}
          </h2>
        </SectionHeader>

        <form id={formId} className={styles.form} onSubmit={handleSubmit} onChange={handleChange}>
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
              min={minDate}
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
              <Icon name={content.note.icon} size="md" tone="accent" />
              <span>{content.note.label}</span>
            </p>
            <Button type="submit" size="xl" className={styles.submit}>
              <span>{content.submit.label}</span>
              <Icon name={content.submit.icon} size="md" tone="accent" />
            </Button>
          </div>
        </form>

        {requestHref && (
          <div ref={confirmationRef} tabIndex={-1} role="status" className={styles.confirmation}>
            <Icon name={content.confirmation.icon} size="xl" tone="gold" />
            <div className={styles.confirmationText}>
              <p className={cx('type-label-md', styles.confirmationTitle)}>{content.confirmation.title}</p>
              <p className={cx('type-body-sm', styles.confirmationMessage)}>{content.confirmation.message}</p>
            </div>
            <ButtonLink href={requestHref} variant="ghost" external>
              <Icon name="open_in_new" size="sm" />
              <span>{content.confirmation.reopenLabel}</span>
            </ButtonLink>
          </div>
        )}

        {children}
      </Container>
    </Section>
  )
}
