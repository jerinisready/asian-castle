import { cx } from '../../../utils/cx'
import styles from './Button.module.css'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'quiet' | 'whatsapp'
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl'

export interface ButtonStyleProps {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
}

/** Shared by <Button> and <ButtonLink> so both look identical. */
export function buttonClassName({ variant = 'primary', size = 'md', className }: ButtonStyleProps): string {
  return cx(
    styles.button,
    styles[variant],
    styles[size],
    variant === 'quiet' ? 'type-label-sm' : 'type-label-md',
    className,
  )
}
