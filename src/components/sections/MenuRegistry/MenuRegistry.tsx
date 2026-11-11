import { useState } from 'react'
import type { Dish, MenuCategoryId, MenuRegistryContent } from '../../../data/types'
import { cx } from '../../../utils/cx'
import { DishCard } from '../../ui/DishCard/DishCard'
import { Eyebrow } from '../../ui/Eyebrow/Eyebrow'
import { Container } from '../../ui/Section/Container'
import { Section } from '../../ui/Section/Section'
import { SectionHeader } from '../../ui/SectionHeader/SectionHeader'
import styles from './MenuRegistry.module.css'

type CategoryFilter = MenuCategoryId | 'all'

interface MenuRegistryProps {
  id: string
  content: MenuRegistryContent
  onAddDish: (dish: Dish) => void
}

/** Filterable dish grid. */
export function MenuRegistry({ id, content, onAddDish }: MenuRegistryProps) {
  const [category, setCategory] = useState<CategoryFilter>('all')
  const dishes = category === 'all' ? content.dishes : content.dishes.filter((dish) => dish.category === category)

  return (
    <Section id={id} tone="lowest" aria-labelledby={`${id}-title`}>
      <Container className={styles.inner}>
        <SectionHeader
          gap="md"
          aside={
            <div className={styles.tabs} role="group" aria-label="Filter dishes by cuisine">
              {content.categories.map((option) => {
                const selected = option.id === category
                return (
                  <button
                    key={option.id}
                    type="button"
                    aria-pressed={selected}
                    className={cx('type-label-md', styles.tab, selected && styles.tabActive)}
                    onClick={() => setCategory(option.id)}
                  >
                    {option.label}
                  </button>
                )
              })}
            </div>
          }
        >
          <Eyebrow icon={content.eyebrow.icon} iconSize={18}>
            {content.eyebrow.label}
          </Eyebrow>
          <h2 id={`${id}-title`} className={cx('type-headline-lg', styles.title)}>
            {content.title}
          </h2>
        </SectionHeader>

        <div className={styles.grid}>
          {dishes.map((dish) => (
            <DishCard key={dish.id} dish={dish} variant="registry" onAdd={onAddDish} />
          ))}
        </div>
      </Container>
    </Section>
  )
}
