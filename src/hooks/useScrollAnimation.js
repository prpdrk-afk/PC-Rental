import { useEffect, useRef, useState } from 'react'

/**
 * useScrollAnimation — custom hook that observes when an element enters the
 * viewport and returns an `inView` boolean. Use this to trigger CSS or
 * Framer Motion animations when a section scrolls into view.
 *
 * @param {Object} options  IntersectionObserver options
 * @param {number} options.threshold  0–1, default 0.15
 * @param {boolean} options.once      fire only once, default true
 * @returns {{ ref, inView }}
 */
export default function useScrollAnimation({ threshold = 0.15, once = true } = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.unobserve(el)
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, once])

  return { ref, inView }
}
