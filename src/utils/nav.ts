import type { NavItem } from '../data/types'

/** Section ids a nav item stands for (its own id unless `sections` is set). */
export function navItemSections(item: NavItem): string[] {
  return item.sections ?? [item.id]
}

/** True when the section under the reading line belongs to this nav item. */
export function isNavItemActive(item: NavItem, activeSectionId: string): boolean {
  return navItemSections(item).includes(activeSectionId)
}

/** Every section the nav tracks, in nav order. */
export function navSectionIds(items: NavItem[]): string[] {
  return items.flatMap(navItemSections)
}
