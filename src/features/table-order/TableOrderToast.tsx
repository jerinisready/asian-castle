import { Toast } from '../../components/ui/Toast/Toast'
import { tableOrderCopy } from '../../data/home'
import { formatPrice } from '../../utils/links'
import { useTableOrder } from './useTableOrder'

/** Confirms each item added to the table order. */
export function TableOrderToast() {
  const { lastAdded, toastVisible } = useTableOrder()
  const title = lastAdded ? `${lastAdded.name} (${formatPrice(lastAdded.price)})` : tableOrderCopy.fallbackTitle

  return <Toast visible={toastVisible} title={title} message={tableOrderCopy.toastMessage} icon="check_circle" />
}
