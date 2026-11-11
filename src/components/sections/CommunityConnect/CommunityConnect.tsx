import type { CommunityContent } from '../../../data/types'
import { cx } from '../../../utils/cx'
import { ButtonLink } from '../../ui/Button/ButtonLink'
import { Eyebrow } from '../../ui/Eyebrow/Eyebrow'
import { Icon } from '../../ui/Icon/Icon'
import styles from './CommunityConnect.module.css'

interface CommunityConnectProps {
  content: CommunityContent
  instagram: { handle: string; url: string }
}

/** Instagram invitation with QR code. */
export function CommunityConnect({ content, instagram }: CommunityConnectProps) {
  return (
    <div className={styles.community}>
      <div className={styles.story}>
        <Eyebrow icon={content.eyebrow.icon}>{content.eyebrow.label}</Eyebrow>
        <h3 className={cx('type-headline-lg', styles.title)}>
          {content.title}
          <br />
          <span className={styles.handle}>{instagram.handle}</span>
        </h3>
        <p className={cx('type-body-md', styles.description)}>{content.description}</p>
        <div className={styles.proofs}>
          {content.proofs.map((proof) => (
            <p
              key={proof.label}
              className={cx('type-label-sm', styles.proof, proof.emphasis ? styles.proofStrong : styles.proofMuted)}
            >
              <Icon name={proof.icon} size="md" />
              <span>{proof.label}</span>
            </p>
          ))}
        </div>
        <div className={styles.actionRow}>
          <ButtonLink href={instagram.url} variant="secondary" size="sm" external>
            <Icon name={content.action.icon} size="md" />
            <span>{content.action.label}</span>
          </ButtonLink>
        </div>
      </div>

      <figure className={styles.qrCard}>
        <div className={styles.qrFrame}>
          <img
            src={content.qr.image.src}
            alt={content.qr.image.alt}
            className={styles.qrImage}
            loading="lazy"
            decoding="async"
            width={192}
            height={192}
          />
        </div>
        <figcaption className={cx('type-label-sm', styles.qrCaption)}>{content.qr.caption}</figcaption>
      </figure>
    </div>
  )
}
