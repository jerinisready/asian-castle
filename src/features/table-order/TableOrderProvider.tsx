import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import type { TableItem } from '../../data/types'
import { TableOrderContext } from './TableOrderContext'

const TOAST_DURATION_MS = 2800

/** In-memory "table order" (the header bag). No persistence or checkout yet. */
export function TableOrderProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<TableItem[]>([])
  const [lastAdded, setLastAdded] = useState<TableItem | null>(null)
  const [toastVisible, setToastVisible] = useState(false)
  const hideTimer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(hideTimer.current), [])

  const addItem = useCallback((item: TableItem) => {
    setItems((current) => [...current, item])
    setLastAdded(item)
    setToastVisible(true)
    window.clearTimeout(hideTimer.current)
    hideTimer.current = window.setTimeout(() => setToastVisible(false), TOAST_DURATION_MS)
  }, [])

  const value = useMemo(
    () => ({ items, lastAdded, toastVisible, addItem }),
    [items, lastAdded, toastVisible, addItem],
  )

  return <TableOrderContext.Provider value={value}>{children}</TableOrderContext.Provider>
}
