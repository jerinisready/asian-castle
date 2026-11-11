import { SiteFooter } from '../components/layout/SiteFooter/SiteFooter'
import { SiteHeader } from '../components/layout/SiteHeader/SiteHeader'
import { SkipLink } from '../components/layout/SkipLink/SkipLink'
import { ChefSelections } from '../components/sections/ChefSelections/ChefSelections'
import { CommunityConnect } from '../components/sections/CommunityConnect/CommunityConnect'
import { Hero } from '../components/sections/Hero/Hero'
import { IntegrityCode } from '../components/sections/IntegrityCode/IntegrityCode'
import { MenuRegistry } from '../components/sections/MenuRegistry/MenuRegistry'
import { ProximityHub } from '../components/sections/ProximityHub/ProximityHub'
import { Reservation } from '../components/sections/Reservation/Reservation'
import { SignaturePot } from '../components/sections/SignaturePot/SignaturePot'
import { WhatsAppDispatch } from '../components/sections/WhatsAppDispatch/WhatsAppDispatch'
import { chefSelections, menuRegistry } from '../data/dishes'
import { community, dispatch, hero, integrity, proximity, reservation, signature } from '../data/home'
import { footer, header, sectionIds, site } from '../data/site'
import type { Dish } from '../data/types'
import { TableOrderToast } from '../features/table-order/TableOrderToast'
import { useTableOrder } from '../features/table-order/useTableOrder'
import { useActiveSection } from '../hooks/useActiveSection'
import { navSectionIds } from '../utils/nav'

/** Sections the nav tracks while scrolling (stable, so the observer is created once). */
const TRACKED_SECTIONS = navSectionIds(header.nav)

/** Composes the homepage from content + sections. Section order lives here. */
export function HomePage() {
  const { items, addItem } = useTableOrder()
  const activeSection = useActiveSection(TRACKED_SECTIONS, sectionIds.arrival)

  const addDish = (dish: Dish) => addItem({ name: dish.name, price: dish.price })

  return (
    <>
      <SkipLink href={header.skipLink.href} label={header.skipLink.label} />
      <SiteHeader
        site={site}
        content={header}
        activeId={activeSection}
        cartCount={items.length}
        homeHref={`#${sectionIds.arrival}`}
      />

      <main>
        <Hero id={sectionIds.arrival} content={hero} whatsappNumber={site.whatsappNumber} />
        <IntegrityCode id={sectionIds.integrity} content={integrity} />
        <SignaturePot id={sectionIds.signature} content={signature} onAddItem={addItem} />
        <ChefSelections id={sectionIds.chefSelections} content={chefSelections} onAddDish={addDish} />
        <MenuRegistry id={sectionIds.menu} content={menuRegistry} onAddDish={addDish} />
        <WhatsAppDispatch
          id={sectionIds.directRing}
          content={dispatch}
          whatsappNumber={site.whatsappNumber}
          onAddItem={addItem}
        />
        <ProximityHub id={sectionIds.dispatchHub} content={proximity} parkingMapUrl={site.parkingMapUrl} />
        <Reservation
          id={sectionIds.reservations}
          formId={sectionIds.reservationForm}
          content={reservation}
          whatsappNumber={site.whatsappNumber}
          timeZone={site.timeZone}
        >
          <CommunityConnect content={community} instagram={site.instagram} />
        </Reservation>
      </main>

      <SiteFooter site={site} content={footer} />
      <TableOrderToast />
    </>
  )
}
