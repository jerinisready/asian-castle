import type { ReservationMessageTemplate } from '../data/types'

/** One booking request, as entered in the reservation form. */
export interface ReservationRequest {
  name: string
  contact: string
  partySize: string
  /** ISO date from <input type="date">, e.g. "2026-11-20". */
  date: string
  timeSlot: string
  preference: string
}

const FIELDS = ['name', 'contact', 'partySize', 'date', 'timeSlot', 'preference'] as const

/** Reads the form's named controls into a request (trimmed strings). */
export function readReservationForm(form: HTMLFormElement): ReservationRequest {
  const data = new FormData(form)
  const value = (key: (typeof FIELDS)[number]) => String(data.get(key) ?? '').trim()
  return {
    name: value('name'),
    contact: value('contact'),
    partySize: value('partySize'),
    date: value('date'),
    timeSlot: value('timeSlot'),
    preference: value('preference'),
  }
}

/** "2026-11-20" → "Fri, 20 Nov 2026". Read as a calendar date, so no time-zone shift. */
export function formatReservationDate(isoDate: string, locale = 'en-GB'): string {
  const [year, month, day] = isoDate.split('-').map(Number)
  if (!year || !month || !day) return isoDate
  return new Intl.DateTimeFormat(locale, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(year, month - 1, day)))
}

/** Today's date in the restaurant's time zone, as "YYYY-MM-DD" (for the date input's `min`). */
export function todayInTimeZone(timeZone: string, now: Date = new Date()): string {
  // en-CA formats dates as YYYY-MM-DD.
  return new Intl.DateTimeFormat('en-CA', { timeZone, year: 'numeric', month: '2-digit', day: '2-digit' }).format(now)
}

/** Plain-text WhatsApp message: greeting, one "Label: value" line per field, closing. */
export function buildReservationMessage(request: ReservationRequest, template: ReservationMessageTemplate): string {
  const lines = FIELDS.map((field) => {
    const value = field === 'date' ? formatReservationDate(request.date) : request[field]
    return `${template.labels[field]}: ${value}`
  })
  return [template.greeting, '', ...lines, '', template.closing].join('\n')
}
