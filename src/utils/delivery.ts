import type { DeliveryTier } from '../data/types'

export interface DeliveryEstimate {
  fee: string
  free: boolean
  etaMinutes: number
  /** "Hearth freshness" score shown in the approved design, 85–100. */
  freshness: number
}

/* Formula from the approved design's proximity calculator. */
const BASE_ETA_MINUTES = 14
const MINUTES_PER_KM = 2.8
const FRESHNESS_LOSS_PER_KM = 1.1
const MIN_FRESHNESS = 85

export function estimateDelivery(distanceKm: number, tiers: DeliveryTier[]): DeliveryEstimate {
  const tier = tiers.find((t) => distanceKm <= t.upToKm) ?? tiers[tiers.length - 1]
  return {
    fee: tier.fee,
    free: tier.free,
    etaMinutes: Math.round(BASE_ETA_MINUTES + distanceKm * MINUTES_PER_KM),
    freshness: Math.max(MIN_FRESHNESS, Math.round(100 - distanceKm * FRESHNESS_LOSS_PER_KM)),
  }
}
