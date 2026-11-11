import { parseStoredOrder, type OrderLine } from '../../utils/order'

/*
 * The order is kept in this browser only (no account, nothing sent to a server).
 * Storage can be unavailable (private mode, blocked site data), so every access is guarded.
 */
const STORAGE_KEY = 'asian-castle:table-order:v1'

export function loadOrder(): OrderLine[] {
  if (typeof window === 'undefined') return []
  try {
    return parseStoredOrder(window.localStorage.getItem(STORAGE_KEY))
  } catch {
    return []
  }
}

export function saveOrder(lines: OrderLine[]): void {
  if (typeof window === 'undefined') return
  try {
    if (lines.length === 0) window.localStorage.removeItem(STORAGE_KEY)
    else window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines))
  } catch {
    // Storage unavailable: the order still works for this visit.
  }
}
