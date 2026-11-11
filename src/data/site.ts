import { images } from './images'
import type { FooterContent, HeaderContent, SiteInfo } from './types'

/*
 * Business details as shown in the approved design.
 * VERIFY BEFORE LAUNCH: phone/WhatsApp number, Instagram handle and email are
 * design placeholders, not confirmed by the client.
 */
export const site: SiteInfo = {
  name: 'Asian Castle',
  legalName: 'Asian Castle Restaurant L.L.C.',
  tagline: 'Kerala & Hearth • Bu Shaghara',
  logo: images.logo,
  addressLines: ['38th Street, Bu Shaghara', 'Sharjah, United Arab Emirates'],
  hours: '7:00 AM – Midnight Daily',
  closingTime: 'Till 00:00',
  phone: { display: '+971 6 555 8321', dial: '+97165558321' },
  whatsappNumber: '97165558321',
  instagram: { handle: '@asiancastlerestaurant', url: 'https://instagram.com/asiancastlerestaurant' },
  privateDiningEmail: 'private@asiancastle.ae',
  parkingMapUrl: 'https://maps.google.com/?q=Asian+Castle+Restaurant+Bu+Shaghara+Sharjah+Parking',
  timeZone: 'Asia/Dubai',
}

/** Section anchors. Section components use these ids; the nav links to them. */
export const sectionIds = {
  arrival: 'arrival',
  integrity: 'integrity',
  signature: 'signature-pot',
  chefSelections: 'chef-selections',
  menu: 'heirloom-menu',
  directRing: 'direct-ring',
  dispatchHub: 'dispatch-hub',
  reservations: 'reservations',
  reservationForm: 'reservation-form',
} as const

export const header: HeaderContent = {
  nav: [
    { id: sectionIds.arrival, label: 'Arrival', href: `#${sectionIds.arrival}` },
    { id: sectionIds.integrity, label: 'Integrity', href: `#${sectionIds.integrity}` },
    {
      id: sectionIds.menu,
      label: 'Heirloom Menu',
      href: `#${sectionIds.menu}`,
      sections: [sectionIds.signature, sectionIds.chefSelections, sectionIds.menu],
    },
    {
      id: sectionIds.directRing,
      label: 'Direct Ring',
      href: `#${sectionIds.directRing}`,
      sections: [sectionIds.directRing, sectionIds.dispatchHub],
    },
    { id: sectionIds.reservations, label: 'Sanctuary & Reservations', href: `#${sectionIds.reservations}` },
  ],
  reserve: { label: 'Reserve Table', icon: 'calendar_today', href: `#${sectionIds.reservations}` },
  cartLabel: 'Bespoke Banquet Cart',
  accountLabel: 'Account',
  skipLink: { label: 'Skip to the menu', href: `#${sectionIds.menu}` },
  mobileNav: {
    openLabel: 'Open navigation',
    closeLabel: 'Close navigation',
    openIcon: 'menu',
    closeIcon: 'close',
    title: 'Asian Castle',
    whatsapp: {
      icon: 'chat',
      label: 'WhatsApp Concierge',
      message: 'Salam Asian Castle I would like to reserve a table',
    },
  },
}

export const footer: FooterContent = {
  about: {
    icon: 'castle',
    description:
      'Authentic Kerala gastronomy converged with hearthside Arabian grandeur in the heart of Bu Shaghara, Sharjah.',
    eyebrow: 'P.O. Box Sharjah • UAE',
  },
  hours: { heading: 'Sanctuary & Hours', icon: 'schedule' },
  contact: {
    heading: 'Concierge & Kitchen Dispatch',
    phoneIcon: 'call',
    whatsappLabel: 'WhatsApp Concierge (Instant)',
    whatsappIcon: 'chat',
    emailLabel: 'Private Dining:',
  },
  partners: {
    heading: 'Bespoke Dispatch Partners',
    description: 'Direct-hearth curations delivered across Sharjah & Dubai via verified culinary partners.',
    items: ['Talabat Fine', 'Noon Food', 'Direct Dispatch'],
  },
  copyright: '© 2025 Asian Castle Restaurant L.L.C. Sharjah, UAE. All Rights Reserved.',
  legalLinks: [
    { label: 'Provenance & Dietary', href: '#' },
    { label: 'Sanctuary Protocol', href: '#' },
    { label: 'Privacy Policy', href: '#' },
  ],
}
