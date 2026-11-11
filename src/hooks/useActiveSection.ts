import { useEffect, useState } from 'react'

/**
 * A thin band just above the middle of the viewport. A section becomes current
 * when it crosses this line, which matches where the eye rests while reading.
 */
const READING_LINE = '-45% 0px -50% 0px'

/**
 * Returns the id of the section currently under the reading line.
 * `ids` must be a stable array (define it outside the component).
 * Keeps the last value when no section is under the line (e.g. over the footer).
 */
export function useActiveSection(ids: readonly string[], initial: string = ids[0] ?? ''): string {
  const [active, setActive] = useState(initial)

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const sections = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null)
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: READING_LINE },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [ids])

  return active
}
