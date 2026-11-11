import { useRef, useState } from 'react'
import { Button } from '../../components/ui/Button/Button'
import { ButtonLink } from '../../components/ui/Button/ButtonLink'
import { Icon } from '../../components/ui/Icon/Icon'
import { Sheet } from '../../components/ui/Sheet/Sheet'
import type { TableOrderContent } from '../../data/types'
import { cx } from '../../utils/cx'
import { formatPrice, whatsappLink } from '../../utils/links'
import { MAX_LINE_QUANTITY, buildOrderMessage } from '../../utils/order'
import styles from './TableOrderSheet.module.css'
import { useTableOrder } from './useTableOrder'

interface TableOrderSheetProps {
  /** Referenced by the cart button's aria-controls. */
  id: string
  open: boolean
  onClose: () => void
  content: TableOrderContent
  /** Digits only, with country code. */
  whatsappNumber: string
}

/**
 * The guest's order: quantities, remove, estimated total, and a WhatsApp handoff.
 * Nothing is sent by the site; the guest sends the prefilled message themselves.
 */
export function TableOrderSheet({ id, open, onClose, content, whatsappNumber }: TableOrderSheetProps) {
  const { lines, total, setQuantity, removeItem, clear } = useTableOrder()
  const copy = content.sheet
  const message = buildOrderMessage(lines, content.whatsappMessage)
  /** The message last opened in WhatsApp; the notice shows only while the order still matches it. */
  const [sentMessage, setSentMessage] = useState<string | null>(null)
  const isEmpty = lines.length === 0
  const bodyRef = useRef<HTMLDivElement>(null)

  /**
   * Removing a line deletes the button that had focus. After the update renders, move focus
   * to the same position in the list (or the last line), or to the empty-state action.
   */
  const keepFocusAfterRemoving = (index: number) => {
    requestAnimationFrame(() => {
      const body = bodyRef.current
      if (!body) return
      const removeButtons = body.querySelectorAll<HTMLButtonElement>('[data-remove]')
      const target =
        removeButtons[Math.min(index, removeButtons.length - 1)] ??
        body.querySelector<HTMLElement>('[data-empty-action]')
      target?.focus()
    })
  }

  const decrease = (key: string, quantity: number, index: number) => {
    setQuantity(key, quantity - 1)
    if (quantity - 1 <= 0) keepFocusAfterRemoving(index)
  }

  const remove = (key: string, index: number) => {
    removeItem(key)
    keepFocusAfterRemoving(index)
  }

  const clearAll = () => {
    clear()
    keepFocusAfterRemoving(0)
  }

  const footer = isEmpty ? undefined : (
    <>
      <p className={styles.totalRow}>
        <span className={cx('type-label-md', styles.totalLabel)}>{copy.totalLabel}</span>
        <span className={cx('type-headline-sm', 'type-numeric', styles.totalValue)} aria-live="polite">
          {formatPrice(total)}
        </span>
      </p>
      <p className={cx('type-body-sm', styles.note)}>{copy.note}</p>

      {sentMessage === message && (
        <div role="status" className={styles.sent}>
          <Icon name={copy.sentNotice.icon} size="lg" tone="gold" />
          <span className={styles.sentText}>
            <span className={cx('type-label-md', styles.sentTitle)}>{copy.sentNotice.title}</span>
            <span className={cx('type-body-sm', styles.sentMessage)}>{copy.sentNotice.message}</span>
          </span>
        </div>
      )}

      <ButtonLink
        href={whatsappLink(whatsappNumber, message)}
        variant="whatsapp"
        size="lg"
        external
        className={styles.wide}
        onClick={() => setSentMessage(message)}
      >
        <Icon name={copy.send.icon} size="md" />
        <span>{copy.send.label}</span>
      </ButtonLink>
      <Button variant="quiet" className={styles.wide} onClick={clearAll}>
        <Icon name="delete" size="sm" />
        <span>{copy.clearLabel}</span>
      </Button>
    </>
  )

  return (
    <Sheet id={id} open={open} onClose={onClose} title={copy.title} closeLabel={copy.closeLabel} footer={footer}>
      <div ref={bodyRef}>
        {isEmpty ? (
          <div className={styles.empty}>
            <span className={styles.emptyIcon}>
              <Icon name={copy.empty.icon} size="3xl" tone="gold" />
            </span>
            <p className={cx('type-headline-sm', styles.emptyTitle)}>{copy.empty.title}</p>
            <p className={cx('type-body-md', styles.emptyMessage)}>{copy.empty.message}</p>
            <ButtonLink
              href={copy.empty.action.href}
              variant="secondary"

              data-empty-action
            >
              <Icon name={copy.empty.action.icon} size="md" />
              <span>{copy.empty.action.label}</span>
            </ButtonLink>
          </div>
        ) : (
          <ul className={styles.lines}>
            {lines.map((line, index) => (
              <li key={line.key} className={styles.line}>
                <div className={styles.lineHead}>
                  <span className={styles.lineText}>
                    <span className={cx('type-headline-sm', styles.lineName)}>{line.name}</span>
                    <span className={cx('type-body-sm', 'type-numeric', styles.unitPrice)}>
                      {formatPrice(line.price)}
                    </span>
                  </span>
                  <span className={cx('type-label-md', 'type-numeric', styles.lineTotal)}>
                    {formatPrice(line.price * line.quantity)}
                  </span>
                </div>

                <div className={styles.lineControls}>
                  <div className={styles.stepper} role="group" aria-label={`${copy.quantityLabel}, ${line.name}`}>
                    <button
                      type="button"
                      className={styles.stepButton}
                      aria-label={`${copy.decreaseLabel}: ${line.name}`}
                      onClick={() => decrease(line.key, line.quantity, index)}
                    >
                      <Icon name="remove" size="md" />
                    </button>
                    <span className={cx('type-label-md', 'type-numeric', styles.quantity)} aria-live="polite">
                      {line.quantity}
                    </span>
                    <button
                      type="button"
                      className={styles.stepButton}
                      aria-label={`${copy.increaseLabel}: ${line.name}`}
                      disabled={line.quantity >= MAX_LINE_QUANTITY}
                      onClick={() => setQuantity(line.key, line.quantity + 1)}
                    >
                      <Icon name="add" size="md" />
                    </button>
                  </div>
                  <button
                    type="button"
                    className={cx('type-label-sm', styles.remove)}
                    aria-label={`${copy.removeLabel}: ${line.name}`}
                    data-remove
                    onClick={() => remove(line.key, index)}
                  >
                    <Icon name="delete" size="sm" />
                    <span aria-hidden="true">{copy.removeLabel}</span>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Sheet>
  )
}
