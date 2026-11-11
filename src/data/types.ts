import type { IconName } from '../design-system/iconNames'

/* Content model. Components render these shapes; copy lives in src/data. */

export interface ImageAsset {
  src: string
  alt: string
  /** True while the image is a stand-in that must be replaced with real photography. */
  placeholder?: boolean
}

export interface IconLabel {
  icon: IconName
  label: string
}

export interface LinkAction extends IconLabel {
  href: string
}

/** A label that becomes a link once a confirmed URL is set; without `href` it renders as plain text. */
export interface OptionalLink {
  label: string
  href?: string
}

/** Opens WhatsApp with `message` prefilled. */
export interface WhatsAppAction extends IconLabel {
  message: string
}

export interface TableItem {
  /** Stable id; items with the same id share one order line. Falls back to `name`. */
  id?: string
  name: string
  price: number
}

/** Copy for the table order: toast, sheet and WhatsApp message. */
export interface TableOrderContent {
  fallbackTitle: string
  toastMessage: string
  sheet: {
    title: string
    closeLabel: string
    empty: { icon: IconName; title: string; message: string; action: LinkAction }
    quantityLabel: string
    decreaseLabel: string
    increaseLabel: string
    removeLabel: string
    totalLabel: string
    note: string
    send: IconLabel
    clearLabel: string
    sentNotice: { icon: IconName; title: string; message: string }
  }
  whatsappMessage: { greeting: string; totalLabel: string; closing: string }
}

export interface NavItem {
  id: string
  label: string
  href: string
  /** Section ids that mark this item as current while scrolling. Defaults to [id]. */
  sections?: string[]
}

/* ── Site ─────────────────────────────────────────── */

export interface SiteInfo {
  name: string
  legalName: string
  tagline: string
  logo: ImageAsset
  addressLines: [string, string]
  hours: string
  closingTime: string
  phone: { display: string; dial: string }
  whatsappNumber: string
  instagram: { handle: string; url: string }
  privateDiningEmail: string
  parkingMapUrl: string
  /** IANA time zone of the restaurant; booking dates are checked against it. */
  timeZone: string
}

export interface HeaderContent {
  nav: NavItem[]
  reserve: LinkAction
  cartLabel: string
  /** First focusable element on the page. */
  skipLink: { label: string; href: string }
  /** Navigation sheet shown below 1280px. */
  mobileNav: {
    openLabel: string
    closeLabel: string
    openIcon: IconName
    closeIcon: IconName
    title: string
    whatsapp: WhatsAppAction
  }
}

/* ── Hero ─────────────────────────────────────────── */

export interface Metric {
  icon: IconName
  value: string
  label: string
}

export interface HeroContent {
  pill: IconLabel
  headline: { lead: string; accent: string }
  metrics: Metric[]
  parking: { icon: IconName; title: string; subtitle: string; action: IconLabel; href: string }
  reserveAction: LinkAction
  menuAction: LinkAction
  whatsappAction: WhatsAppAction
  /** Delivery platforms. Each chip links to Asian Castle's listing once its URL is confirmed. */
  partners: { label: string; items: OptionalLink[] }
  showcase: {
    image: ImageAsset
    crestIcon: IconName
    status: { title: string; subtitle: string; icon: IconName; until: string }
  }
  rating: { icon: IconName; value: string; valueIcon: IconName; label: string }
}

/* ── Integrity ────────────────────────────────────── */

export interface IntegrityBadge {
  icon: IconName
  value: string
  title: string
  description: string
}

export interface IntegrityContent {
  eyebrow: IconLabel
  title: string
  tags: string[]
  badges: IntegrityBadge[]
}

/* ── Signature pot ────────────────────────────────── */

export interface SignatureSpec {
  icon: IconName
  title: string
  description: string
}

export interface SignatureContent {
  image: ImageAsset
  panel: { icon: IconName; title: string; subtitle: string; price: string }
  eyebrow: IconLabel
  title: { lead: string; accent: string }
  specs: SignatureSpec[]
  addAction: IconLabel & { item: TableItem }
  /** Toggles an inline list of what comes with the pot. */
  sidesAction: IconLabel & { intro: string; items: string[] }
}

/* ── Dishes ───────────────────────────────────────── */

export type MenuCategoryId = 'kerala' | 'arabian' | 'tandoor' | 'chinese'

export interface Dish {
  id: string
  name: string
  price: number
  description: string
  image: ImageAsset
  category: MenuCategoryId
  /** Small label on the image, top left. */
  tag: { label: string; icon?: IconName }
  /** Optional highlight on the image, top right. */
  highlight?: { label: string; tone: 'primary' | 'secondary' }
  /** Line beside the add button. */
  note: string
}

export interface ChefSelectionsContent {
  eyebrow: IconLabel
  title: string
  description: string
  badge: IconLabel
  dishes: Dish[]
}

export interface MenuRegistryContent {
  eyebrow: IconLabel
  title: string
  categories: Array<{ id: MenuCategoryId | 'all'; label: string }>
  dishes: Dish[]
}

/* ── Direct dispatch ──────────────────────────────── */

export interface DispatchOffer {
  id: string
  tag: { label: string; tone: 'secondary' | 'primary' | 'neutral' }
  price: string
  title: string
  description: string
  perks: string[]
  action: WhatsAppAction
  addItem?: TableItem
}

export interface DispatchContent {
  eyebrow: IconLabel
  title: string
  description: string
  cta: WhatsAppAction
  offers: DispatchOffer[]
}

export interface DeliveryTier {
  /** Upper bound in km, inclusive. */
  upToKm: number
  fee: string
  free: boolean
}

export interface ProximityContent {
  eyebrow: IconLabel
  title: string
  description: string
  distance: { label: string; min: number; max: number; step: number; initial: number }
  labels: {
    fee: string
    eta: string
    etaUnit: string
    freshness: string
    freshnessState: string
    freshnessIcon: IconName
    distanceUnit: string
  }
  tiers: DeliveryTier[]
  partners: { label: string; items: string[] }
  location: { icon: IconName; title: string; subtitle: string }
  parking: { icon: IconName; title: string; subtitle: string; action: IconLabel }
}

/* ── Reservation ──────────────────────────────────── */

export interface ReservationContent {
  eyebrow: IconLabel
  title: string
  badge: IconLabel
  fields: {
    name: { label: string; placeholder: string }
    contact: { label: string; placeholder: string }
    partySize: { label: string; options: string[] }
    date: { label: string }
    timeSlot: { label: string; options: string[] }
    preference: { label: string; options: string[] }
  }
  note: IconLabel
  submit: IconLabel
  /**
   * Shown after submit. The request opens in WhatsApp; the table is only confirmed
   * when the restaurant replies, so this copy must not claim a confirmed booking.
   */
  confirmation: { icon: IconName; title: string; message: string; reopenLabel: string }
  /** Prefilled WhatsApp message built from the form. */
  whatsappMessage: ReservationMessageTemplate
}

/** Labels for each line of the WhatsApp booking request. */
export interface ReservationMessageTemplate {
  greeting: string
  labels: {
    name: string
    contact: string
    partySize: string
    date: string
    timeSlot: string
    preference: string
  }
  closing: string
}

export interface CommunityContent {
  eyebrow: IconLabel
  title: string
  description: string
  proofs: Array<IconLabel & { emphasis: boolean }>
  action: IconLabel
  qr: { image: ImageAsset; caption: string }
}

/* ── Footer ───────────────────────────────────────── */

export interface FooterContent {
  about: { icon: IconName; description: string; eyebrow: string }
  hours: { heading: string; icon: IconName }
  contact: { heading: string; phoneIcon: IconName; whatsappLabel: string; whatsappIcon: IconName; emailLabel: string }
  partners: { heading: string; description: string; items: string[] }
  copyright: string
  /** Links without `href` are hidden until the page exists. */
  legalLinks: OptionalLink[]
}
