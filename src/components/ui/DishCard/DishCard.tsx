import type { Dish } from '../../../data/types'
import { cx } from '../../../utils/cx'
import { formatPrice } from '../../../utils/links'
import { AddButton } from '../AddButton/AddButton'
import { CoverImage } from '../CoverImage/CoverImage'
import { Icon } from '../Icon/Icon'
import styles from './DishCard.module.css'

interface DishCardProps {
  dish: Dish
  /**
   * feature  — chef's selections: brass hairline, price under the name.
   * registry — menu grid: price beside the name.
   */
  variant?: 'feature' | 'registry'
  onAdd: (dish: Dish) => void
}

export function DishCard({ dish, variant = 'registry', onAdd }: DishCardProps) {
  const price = <span className={cx('type-headline-sm', styles.price)}>{formatPrice(dish.price)}</span>

  return (
    <article className={cx(styles.card, styles[variant])}>
      <div className={styles.media}>
        <CoverImage image={dish.image} className={styles.image} />
        <span className={cx('type-label-sm', styles.tag)}>
          {dish.tag.icon && <Icon name={dish.tag.icon} size="xs" />}
          <span>{dish.tag.label}</span>
        </span>
        {dish.highlight && (
          <span className={cx('type-label-sm', styles.highlight, styles[`highlight-${dish.highlight.tone}`])}>
            {dish.highlight.label}
          </span>
        )}
      </div>

      <div className={styles.body}>
        <div className={styles.summary}>
          <div className={styles.titleRow}>
            <h3 className={cx('type-headline-sm', styles.name)}>{dish.name}</h3>
            {variant === 'registry' && price}
          </div>
          {variant === 'feature' && price}
          <p className={cx('type-body-sm', styles.description)}>{dish.description}</p>
        </div>

        <div className={styles.footer}>
          <span className={cx('type-label-sm', styles.note)}>{dish.note}</span>
          <AddButton
            className={styles.add}
            label={`Add ${dish.name} to your table order`}
            onAdd={() => onAdd(dish)}
          />
        </div>
      </div>
    </article>
  )
}
