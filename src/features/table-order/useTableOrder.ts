import { useContext } from 'react'
import { TableOrderContext, type TableOrderState } from './TableOrderContext'

export function useTableOrder(): TableOrderState {
  const context = useContext(TableOrderContext)
  if (!context) throw new Error('useTableOrder must be used inside <TableOrderProvider>')
  return context
}
