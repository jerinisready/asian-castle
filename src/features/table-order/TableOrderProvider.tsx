import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import type { TableItem } from '../../data/types'
import { addToOrder, orderItemCount, orderTotal, setOrderQuantity, type OrderLine } from '../../utils/order'
import { loadOrder, saveOrder } from './storage'
import { TableOrderContext } from './TableOrderContext'

const TOAST_DURATION_MS = 2800

/** The guest's table order (the header bag). Kept in this browser; sent only via WhatsApp. */
export function TableOrderProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<OrderLine[]>(loadOrder)
  const [lastAdded, setLastAdded] = useState<TableItem | null>(null)
  const [toastVisible, setToastVisible] = useState(false)
  const hideTimer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(hideTimer.current), [])

  useEffect(() => {
    saveOrder(lines)
  }, [lines])

  const addItem = useCallback((item: TableItem) => {
    setLines((current) => addToOrder(current, item))
    setLastAdded(item)
    setToastVisible(true)
    window.clearTimeout(hideTimer.current)
    hideTimer.current = window.setTimeout(() => setToastVisible(false), TOAST_DURATION_MS)
  }, [])

  const setQuantity = useCallback((key: string, quantity: number) => {
    setLines((current) => setOrderQuantity(current, key, quantity))
  }, [])

  const removeItem = useCallback((key: string) => {
    setLines((current) => setOrderQuantity(current, key, 0))
  }, [])

  const clear = useCallback(() => setLines([]), [])

  const value = useMemo(
    () => ({
      lines,
      itemCount: orderItemCount(lines),
      total: orderTotal(lines),
      lastAdded,
      toastVisible,
      addItem,
      setQuantity,
      removeItem,
      clear,
    }),
    [lines, lastAdded, toastVisible, addItem, setQuantity, removeItem, clear],
  )

  return <TableOrderContext.Provider value={value}>{children}</TableOrderContext.Provider>
}
