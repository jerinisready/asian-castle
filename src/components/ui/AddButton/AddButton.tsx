import { useEffect, useRef, useState } from 'react'
import { feedback, type IconSize } from '../../../design-system/tokens'
import { Icon } from '../Icon/Icon'

interface AddButtonProps {
  /** Accessible name, e.g. "Add Kerala Beef Dry Fry to your table order". */
  label: string
  onAdd: () => void
  /** Visual style comes from the caller; `[data-added]` is set while the check shows. */
  className?: string
  iconSize?: IconSize
}

/**
 * Icon-only "+" that turns into a check for a moment after adding.
 * The table-order toast announces the addition to screen readers.
 */
export function AddButton({ label, onAdd, className, iconSize = 'lg' }: AddButtonProps) {
  const [added, setAdded] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const handleClick = () => {
    onAdd()
    setAdded(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setAdded(false), feedback.addedMs)
  }

  return (
    <button
      type="button"
      className={className}
      aria-label={label}
      data-added={added || undefined}
      onClick={handleClick}
    >
      <Icon name={added ? 'check' : 'add'} size={iconSize} />
    </button>
  )
}
