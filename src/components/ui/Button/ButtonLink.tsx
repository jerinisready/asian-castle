import type { AnchorHTMLAttributes } from 'react'
import { buttonClassName, type ButtonStyleProps } from './buttonClassName'

export type ButtonLinkProps = ButtonStyleProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className'> & {
    href: string
    /** Opens in a new tab with safe rel attributes. */
    external?: boolean
  }

/** A link styled as a pill button. */
export function ButtonLink({ variant, size, className, external, ...rest }: ButtonLinkProps) {
  const externalProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {}
  return <a className={buttonClassName({ variant, size, className })} {...externalProps} {...rest} />
}
