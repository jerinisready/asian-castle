/** wa.me deep link with a prefilled message. `number` is digits only, with country code. */
export function whatsappLink(number: string, message?: string): string {
  const base = `https://wa.me/${number}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

export function telLink(number: string): string {
  return `tel:${number}`
}

export function formatPrice(amount: number, currency = 'AED'): string {
  return `${amount} ${currency}`
}
