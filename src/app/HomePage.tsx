import { useState } from 'react'
import { SiteFooter } from '../components/layout/SiteFooter/SiteFooter'
import { SiteHeader } from '../components/layout/SiteHeader/SiteHeader'
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

/** Composes the homepage from content + sections. Section order lives here. */
export function HomePage() {
  const { items, addItem } = useTableOrder()
  // Updated on nav click for now; a scroll-driven tracker can replace this later.
  const [activeSection, setActiveSection] = useState<string>(sectionIds.arrival)

  const addDish = (dish: Dish) => addItem({ name: dish.name, price: dish.price })

  return (
    <>
      <SiteHeader
        site={site}
        content={header}
        activeId={activeSection}
        onNavigate={setActiveSection}
        cartCount={items.length}
        homeHref={`#${sectionIds.arrival}`}
      />

      <main>
        <Hero id={sectionIds.arrival} content={hero} whatsappNumber={site.whatsappNumber} />
        <IntegrityCode id={sectionIds.integrity} content={integrity} />
        <SignaturePot content={signature} onAddItem={addItem} />
        <ChefSelections content={chefSelections} onAddDish={addDish} />
        <MenuRegistry id={sectionIds.menu} content={menuRegistry} onAddDish={addDish} />
        <WhatsAppDispatch
          id={sectionIds.directRing}
          content={dispatch}
          whatsappNumber={site.whatsappNumber}
          onAddItem={addItem}
        />
        <ProximityHub content={proximity} parkingMapUrl={site.parkingMapUrl} />
        <Reservation id={sectionIds.reservations} formId={sectionIds.reservationForm} content={reservation}>
          <CommunityConnect content={community} instagram={site.instagram} />
        </Reservation>
      </main>

      <SiteFooter site={site} content={footer} />
      <TableOrderToast />
    </>
  )
}
