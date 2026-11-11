import { createContext } from 'react'
import type { TableItem } from '../../data/types'
import type { OrderLine } from '../../utils/order'

export interface TableOrderState {
  /** One line per distinct item, with quantities. */
  lines: OrderLine[]
  /** Total number of items (sum of quantities). */
  itemCount: number
  /** Estimated total in AED. */
  total: number
  lastAdded: TableItem | null
  /** True for a few seconds after an item is added. */
  toastVisible: boolean
  addItem: (item: TableItem) => void
  /** Sets a line's quantity; zero removes the line. */
  setQuantity: (key: string, quantity: number) => void
  removeItem: (key: string) => void
  clear: () => void
}

export const TableOrderContext = createContext<TableOrderState | null>(null)
