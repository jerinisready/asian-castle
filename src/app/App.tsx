import { TableOrderProvider } from '../features/table-order/TableOrderProvider'
import { HomePage } from './HomePage'

export function App() {
  return (
    <TableOrderProvider>
      <HomePage />
    </TableOrderProvider>
  )
}
