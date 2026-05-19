"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "framer-motion"

interface Props {
  end: number
  suffix: string
  label: string
}

export default function MetricCounter({ end, suffix, label }: Props) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    const duration = 1500
    const startTime = performance.now()

    function tick(now: number) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * end))
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [isInView, end])

  return (
    <div ref={ref} className="text-center">
      <div
        className="font-serif font-bold text-accent"
        style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
      >
        {count}{suffix}
      </div>
      <div className="text-muted text-xs uppercase tracking-[0.08em] mt-2 font-sans leading-snug">
        {label}
      </div>
    </div>
  )
}
