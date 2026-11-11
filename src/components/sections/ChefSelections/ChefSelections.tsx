import type { ChefSelectionsContent, Dish } from '../../../data/types'
import { cx } from '../../../utils/cx'
import { DishCard } from '../../ui/DishCard/DishCard'
import { Eyebrow } from '../../ui/Eyebrow/Eyebrow'
import { Icon } from '../../ui/Icon/Icon'
import { Container } from '../../ui/Section/Container'
import { Section } from '../../ui/Section/Section'
import { SectionHeader } from '../../ui/SectionHeader/SectionHeader'
import styles from './ChefSelections.module.css'

interface ChefSelectionsProps {
  /** Anchor id for in-page navigation. */
  id?: string
  content: ChefSelectionsContent
  onAddDish: (dish: Dish) => void
}

export function ChefSelections({ id, content, onAddDish }: ChefSelectionsProps) {
  return (
    <Section id={id} tone="low" borders="top" aria-labelledby="chef-selections-title">
      <Container className={styles.inner}>
        <SectionHeader
          aside={
            <p className={cx('type-label-sm', styles.badge)}>
              <Icon name={content.badge.icon} size="md" />
              <span>{content.badge.label}</span>
            </p>
          }
        >
          <Eyebrow icon={content.eyebrow.icon}>{content.eyebrow.label}</Eyebrow>
          <h2 id="chef-selections-title" className={cx('type-headline-lg', styles.title)}>
            {content.title}
          </h2>
          <p className={cx('type-body-md', styles.description)}>{content.description}</p>
        </SectionHeader>

        <div className={styles.grid}>
          {content.dishes.map((dish) => (
            <DishCard key={dish.id} dish={dish} variant="feature" onAdd={onAddDish} />
          ))}
        </div>
      </Container>
    </Section>
  )
}
