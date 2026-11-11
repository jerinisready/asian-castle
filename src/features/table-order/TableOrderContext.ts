import { createContext } from 'react'
import type { TableItem } from '../../data/types'

export interface TableOrderState {
  items: TableItem[]
  lastAdded: TableItem | null
  /** True for a few seconds after an item is added. */
  toastVisible: boolean
  addItem: (item: TableItem) => void
}

export const TableOrderContext = createContext<TableOrderState | null>(null)
