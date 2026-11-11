import type { ButtonHTMLAttributes } from 'react'
import { buttonClassName, type ButtonStyleProps } from './buttonClassName'

export type ButtonProps = ButtonStyleProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'>

/** Pill button for actions. Icons go in `children`. For navigation use <ButtonLink>. */
export function Button({ variant, size, className, type = 'button', ...rest }: ButtonProps) {
  return <button type={type} className={buttonClassName({ variant, size, className })} {...rest} />
}
