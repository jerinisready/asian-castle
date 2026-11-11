import { images } from './images'
import { sectionIds, site } from './site'
import type {
  CommunityContent,
  DispatchContent,
  HeroContent,
  IntegrityContent,
  ProximityContent,
  ReservationContent,
  TableOrderContent,
  SignatureContent,
} from './types'

/*
 * Homepage copy, verbatim from the approved Stitch design (stitch/code.html).
 * VERIFY BEFORE LAUNCH: ratings, diner counts, timings, "100% Halal", "Zero MSG",
 * valet, delivery fees and ETAs are design copy, not confirmed facts.
 */

export const hero: HeroContent = {
  pill: { icon: 'castle', label: "Sharjah's Flagship Hearth • Bu Shaghara" },
  headline: { lead: 'Kerala Soul.', accent: 'Arabian Hearth.' },
  metrics: [
    { icon: 'local_fire_department', value: '12h', label: 'Dum Slow Hearth' },
    { icon: 'verified', value: '100%', label: 'Chilled Halal Meat' },
    { icon: 'timer', value: '18 min', label: 'Hot Table Dispatch' },
  ],
  parking: {
    icon: 'local_parking',
    title: 'Dedicated Sanctuary Parking & Valet',
    subtitle: 'Reserved bays on 38th Street',
    action: { icon: 'near_me', label: 'Navigate' },
    href: site.parkingMapUrl,
  },
  reserveAction: { icon: 'restaurant', label: 'Reserve Table & Majlis', href: `#${sectionIds.reservationForm}` },
  menuAction: { icon: 'menu_book', label: 'Explore Curated Menu', href: `#${sectionIds.menu}` },
  whatsappAction: {
    icon: 'chat',
    label: `WhatsApp Ring: ${site.phone.display}`,
    message: 'Salam Asian Castle I would like to reserve a table',
  },
  partners: { label: 'Order Direct / 1-Tap:', items: ['Talabat Fine', 'Keeta', 'Noon Food', 'Smiles UAE'] },
  showcase: {
    image: images.diningSanctuary,
    crestIcon: 'villa',
    status: {
      title: 'Kitchen Fire Active',
      subtitle: 'Bu Shaghara • Dine-In & Takeaway',
      icon: 'alarm',
      until: site.closingTime,
    },
  },
  rating: { icon: 'star', value: '4.9', valueIcon: 'grade', label: '2,400+ Verified Diners' },
}

export const integrity: IntegrityContent = {
  eyebrow: { icon: 'verified_user', label: 'Sanctuary Standards' },
  title: 'The Asian Castle Integrity Code',
  tags: ['NO ARTIFICIAL DYES', 'NO PRESERVATIVES', 'DAILY BUTCHERY DISPATCH'],
  badges: [
    { icon: 'eco', value: '0% Dyes', title: 'Pure Saffron & Turmeric', description: 'Alleppey gold extracts only' },
    { icon: 'health_and_safety', value: 'Zero MSG', title: '12h Bone Broth', description: 'Naturally umami-reduced stocks' },
    { icon: 'set_meal', value: '100% Halal', title: 'Chilled Fresh Meats', description: 'Never frozen; cut daily at dawn' },
    { icon: 'local_parking', value: 'Valet Free', title: 'Dedicated Bays', description: 'Hassle-free parking at Bu Shaghara' },
    { icon: 'hourglass_top', value: '2h Rule', title: 'Fresh Dum Mandate', description: 'Re-sealed pots discarded promptly' },
    { icon: 'schedule', value: '07:00-00:00', title: 'Breakfast to Midnight', description: 'Fresh Appams to late night Grills' },
  ],
}

export const signature: SignatureContent = {
  image: images.dumBiryani,
  panel: {
    icon: 'soup_kitchen',
    title: 'Kaima Jeerakasala Grain',
    subtitle: 'Pure Ghee • Hand-ground Malabar Garam Masala',
    price: '28 AED',
  },
  eyebrow: { icon: 'workspace_premium', label: 'Signature Heritage Pot' },
  title: { lead: 'Malabar Dum Biryani.', accent: 'Sealed with dough. Opened at your table.' },
  specs: [
    { icon: 'spa', title: 'Fragrant Kaima Grain', description: 'Sourced directly from Wayanad highlands' },
    { icon: 'outdoor_grill', title: 'Slow Smothered Coals', description: 'Gentle indirect heat locks natural moisture' },
    { icon: 'palette', title: 'Zero Red-40 / Orange Dyes', description: 'Pure Alleppey Turmeric & Caramelized Onions' },
    { icon: 'takeout_dining', title: 'Clay Uruli Packing', description: 'Arrives piping hot within Sharjah & Dubai borders' },
  ],
  addAction: {
    icon: 'add_shopping_cart',
    label: 'Add to Table Order (28 AED)',
    item: { name: 'Malabar Chicken Dum Biryani', price: 28 },
  },
  sidesAction: {
    icon: 'menu_book',
    label: 'Accompanying Sides Included',
    message:
      'Each Malabar Dum Biryani pot is served complete with:\n• Fresh cooling cucumber-onion raita\n• Tangy Malabar spiced date pickle\n• Crisp papadum curls\n• Roasted chicken gravy dip (Salna)',
  },
}

export const dispatch: DispatchContent = {
  eyebrow: { icon: 'chat', label: 'Fast Hearth Dispatch' },
  title: 'Order Directly on WhatsApp',
  description:
    'Bu Shaghara residents enjoy instant concierge kitchen dispatch with 0% platform markups and live kitchen queue confirmation.',
  cta: {
    icon: 'forum',
    label: `Ring Concierge (${site.phone.display})`,
    message: 'Salam Asian Castle I would like to order directly',
  },
  offers: [
    {
      id: 'dum-biryani-pot',
      tag: { label: '1-Tap Quick Pot', tone: 'secondary' },
      price: '28 AED',
      title: 'Malabar Dum Biryani Pot',
      description: 'Includes hot clay pot chicken dum biryani, cooling onion raita, pickle, and crunchy papadums.',
      perks: ['Piping hot table dispatch', 'Zero delivery surcharge in Bu Shaghara'],
      action: {
        icon: 'send',
        label: 'WhatsApp 1-Tap',
        message: 'Salam Asian Castle I would like to order the Malabar Dum Biryani Pot (28 AED)',
      },
      addItem: { name: 'Malabar Dum Biryani Pot', price: 28 },
    },
    {
      id: 'family-hearth-feast',
      tag: { label: 'Banquet Selection', tone: 'primary' },
      price: '115 AED',
      title: 'Family Hearth Feast',
      description: '1x Full Charcoal Mandi, 1x Kerala Beef Dry Fry, 4x Malabar Coin Porottas, Daqoos & Mint Chutney.',
      perks: ['Feeds 4-5 adults bountifully', 'Express insulated hot delivery bag'],
      action: {
        icon: 'send',
        label: 'WhatsApp 1-Tap',
        message: 'Salam Asian Castle I would like to order the Family Hearth Feast (115 AED)',
      },
      addItem: { name: 'Family Hearth Feast', price: 115 },
    },
    {
      id: 'custom-curations',
      tag: { label: 'Custom Majlis', tone: 'neutral' },
      price: 'Live Quote',
      title: 'Custom Hearth Curations',
      description:
        'Bespoke dinner gatherings, party platters, and whole spiced lamb or seafood curations on request.',
      perks: ['Direct line to Head Chef', 'Customized spice and dietary requirements'],
      action: {
        icon: 'chat',
        label: 'Chat with Concierge',
        message: 'Salam Asian Castle I would like to discuss a Custom Hearth Curation',
      },
    },
  ],
}

export const proximity: ProximityContent = {
  eyebrow: { icon: 'near_me', label: 'Live Kitchen Proximity' },
  title: 'Bu Shaghara Fast Dispatch Hub',
  description:
    'Direct from our hearth ovens to your residence. Check your estimated arrival time and delivery courtesy tier.',
  distance: { label: 'Your Distance from Bu Shaghara:', min: 0.5, max: 15, step: 0.5, initial: 1.8 },
  labels: {
    fee: 'Dispatch Fee',
    eta: 'Estimated ETA',
    etaUnit: 'Mins',
    freshness: 'Hearth Freshness',
    freshnessState: 'Piping Hot',
    freshnessIcon: 'local_fire_department',
    distanceUnit: 'km',
  },
  tiers: [
    { upToKm: 2.5, fee: '0 AED (FREE)', free: true },
    { upToKm: 6, fee: '5 AED', free: false },
    { upToKm: Number.POSITIVE_INFINITY, fee: '10 AED', free: false },
  ],
  partners: { label: 'Verified Hand-off:', items: ['Talabat', 'Keeta', 'Noon Food', 'Smiles'] },
  location: { icon: 'location_on', title: 'Asian Castle Sanctuary', subtitle: '38th Street, Bu Shaghara' },
  parking: {
    icon: 'local_parking',
    title: 'Free Valet & Dedicated Bays',
    subtitle: 'Stationed at main porch entry',
    action: { icon: 'directions_car', label: 'Open Parking Location on Google Maps' },
  },
}

export const reservation: ReservationContent = {
  eyebrow: { icon: 'event_seat', label: 'Sanctuary Table Booking' },
  title: 'Reserve Your Hearth Experience',
  badge: { icon: 'verified', label: 'Instant WhatsApp Confirmation' },
  fields: {
    name: { label: 'Guest Name / Title', placeholder: 'Sheikh / Mr / Mrs...' },
    contact: { label: 'Contact (UAE Mobile)', placeholder: '+971 50 ...' },
    partySize: {
      label: 'Party Size',
      options: [
        'Intimate Table (1-2 Guests)',
        'Family Seating (3-5 Guests)',
        'Private Family Majlis (6-12 Guests)',
        'Banquet Hall (15+ Guests)',
      ],
    },
    date: { label: 'Dining Date' },
    timeSlot: {
      label: 'Dining Time Slot',
      options: [
        'Breakfast (07:30 AM - 11:00 AM)',
        'Lunch Dum Service (12:30 PM - 03:30 PM)',
        'Evening Hearth (06:00 PM - 08:30 PM)',
        'Late Night Dinner (09:00 PM - 11:30 PM)',
      ],
    },
    preference: {
      label: 'Special Preference',
      options: ['Main Dining Archway', 'Curtained Private Majlis', 'High Chair for Toddler', 'Quiet Corner Table'],
    },
  },
  note: { icon: 'lock', label: 'Zero pre-payment required. Confirmation dispatched via WhatsApp.' },
  submit: { icon: 'send', label: 'Request Table on WhatsApp' },
  confirmation: {
    icon: 'chat',
    title: 'Your request is ready in WhatsApp',
    message:
      'Press send in WhatsApp to share it with our team. Your table is confirmed once we reply. Nothing has been booked yet.',
    reopenLabel: 'Open WhatsApp again',
  },
  whatsappMessage: {
    greeting: 'Salam Asian Castle, I would like to reserve a table.',
    labels: {
      name: 'Name',
      contact: 'Mobile',
      partySize: 'Party size',
      date: 'Date',
      timeSlot: 'Time',
      preference: 'Preference',
    },
    closing: 'Please confirm availability. Thank you.',
  },
}

export const tableOrderCopy: TableOrderContent = {
  fallbackTitle: 'Item Added',
  toastMessage: 'Added to your table selection',
  sheet: {
    title: 'Your Table Order',
    closeLabel: 'Close table order',
    empty: {
      icon: 'restaurant_menu',
      title: 'Your table is empty',
      message: 'Add dishes from the menu and they will gather here.',
      action: { icon: 'menu_book', label: 'Explore the Menu', href: `#${sectionIds.menu}` },
    },
    quantityLabel: 'Quantity',
    decreaseLabel: 'One fewer',
    increaseLabel: 'One more',
    removeLabel: 'Remove',
    totalLabel: 'Estimated total',
    note: 'Prices in AED. Your order is sent as a WhatsApp message; we confirm by reply.',
    send: { icon: 'send', label: 'Send Order on WhatsApp' },
    clearLabel: 'Clear order',
    sentNotice: {
      icon: 'chat',
      title: 'Your order is ready in WhatsApp',
      message: 'Press send in WhatsApp to share it with our team. Nothing is ordered until we reply.',
    },
  },
  whatsappMessage: {
    greeting: 'Salam Asian Castle, I would like to order:',
    totalLabel: 'Estimated total',
    closing: 'Please confirm availability and timing. Thank you.',
  },
}

export const community: CommunityContent = {
  eyebrow: { icon: 'photo_camera', label: 'Sharjah Dining Community' },
  title: 'Connect with Our Hearth:',
  description:
    'Scan with your phone camera to watch daily morning dum unsealing reels, executive chef masterclasses, and verified diner stories in Bu Shaghara.',
  proofs: [
    { icon: 'verified', label: 'Official Verified Channel', emphasis: true },
    { icon: 'grade', label: '4.9 Star Community', emphasis: false },
  ],
  action: { icon: 'open_in_new', label: `Visit ${site.instagram.handle}` },
  qr: { image: images.instagramQr, caption: 'Scan to Follow on Instagram' },
}
