import { cx } from '../../../utils/cx'
import styles from './DumSteam.module.css'

interface DumSteamProps {
  className?: string
}

/** Two blurred plumes rising from the biryani pot. Transform and opacity only. */
export function DumSteam({ className }: DumSteamProps) {
  return (
    <svg className={cx(styles.steam, className)} viewBox="0 0 400 400" fill="none" aria-hidden="true">
      <path
        className={styles.plumeBrass}
        d="M180 240 C170 190 220 160 200 110 C190 85 205 60 195 30"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path
        className={styles.plumeWhite}
        d="M220 250 C235 200 195 170 215 120 C225 95 210 65 225 35"
        strokeWidth="10"
        strokeLinecap="round"
      />
    </svg>
  )
}
