import type { TableItem, TableOrderContent } from '../data/types'
import { formatPrice } from './links'

/** One row of the table order: an item and how many of it. */
export interface OrderLine {
  /** Item id, or its name when it has none. */
  key: string
  name: string
  /** Unit price in AED. */
  price: number
  quantity: number
}

/** Largest quantity of a single item the sheet allows. */
export const MAX_LINE_QUANTITY = 20

export function orderLineKey(item: TableItem): string {
  return item.id ?? item.name
}

export function orderItemCount(lines: OrderLine[]): number {
  return lines.reduce((sum, line) => sum + line.quantity, 0)
}

export function orderTotal(lines: OrderLine[]): number {
  return lines.reduce((sum, line) => sum + line.price * line.quantity, 0)
}

/** Adds one of `item`, merging into an existing line with the same key. */
export function addToOrder(lines: OrderLine[], item: TableItem): OrderLine[] {
  const key = orderLineKey(item)
  const existing = lines.find((line) => line.key === key)
  if (!existing) return [...lines, { key, name: item.name, price: item.price, quantity: 1 }]
  return lines.map((line) =>
    line.key === key ? { ...line, quantity: Math.min(line.quantity + 1, MAX_LINE_QUANTITY) } : line,
  )
}

/** Sets a line's quantity; zero or less removes it. */
export function setOrderQuantity(lines: OrderLine[], key: string, quantity: number): OrderLine[] {
  if (quantity <= 0) return lines.filter((line) => line.key !== key)
  const clamped = Math.min(Math.round(quantity), MAX_LINE_QUANTITY)
  return lines.map((line) => (line.key === key ? { ...line, quantity: clamped } : line))
}

/** Plain-text WhatsApp order: greeting, "2 × Dish — 52 AED" lines, total, closing. */
export function buildOrderMessage(lines: OrderLine[], template: TableOrderContent['whatsappMessage']): string {
  const rows = lines.map((line) => `${line.quantity} × ${line.name} — ${formatPrice(line.price * line.quantity)}`)
  return [
    template.greeting,
    '',
    ...rows,
    '',
    `${template.totalLabel}: ${formatPrice(orderTotal(lines))}`,
    template.closing,
  ].join('\n')
}

function isOrderLine(value: unknown): value is OrderLine {
  if (typeof value !== 'object' || value === null) return false
  const line = value as Record<string, unknown>
  return (
    typeof line.key === 'string' &&
    typeof line.name === 'string' &&
    typeof line.price === 'number' &&
    Number.isFinite(line.price) &&
    typeof line.quantity === 'number' &&
    Number.isInteger(line.quantity) &&
    line.quantity > 0 &&
    line.quantity <= MAX_LINE_QUANTITY
  )
}

/** Parses stored JSON, keeping only well-formed lines. */
export function parseStoredOrder(raw: string | null): OrderLine[] {
  if (!raw) return []
  try {
    const parsed: unknown = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.filter(isOrderLine) : []
  } catch {
    return []
  }
}
