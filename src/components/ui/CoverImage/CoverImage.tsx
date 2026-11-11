import type { ImageAsset } from '../../../data/types'
import { cx } from '../../../utils/cx'
import styles from './CoverImage.module.css'

interface CoverImageProps {
  image: ImageAsset
  /** Above-the-fold image: load eagerly with high priority. */
  priority?: boolean
  className?: string
}

/** Fills its (positioned, sized) parent like `background-size: cover`. */
export function CoverImage({ image, priority = false, className }: CoverImageProps) {
  return (
    <img
      src={image.src}
      alt={image.alt}
      className={cx(styles.image, className)}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
      data-placeholder={image.placeholder || undefined}
    />
  )
}
