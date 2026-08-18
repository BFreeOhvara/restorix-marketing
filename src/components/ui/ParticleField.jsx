import { useEffect, useRef } from 'react'

const DOT_COUNT = 42
const LINK_DISTANCE = 130
const SPEED = 0.12

// Prompt 467: Hero's ambient background — a slow constellation field, own
// accent tint (#3a63d6/#7c9eff), not Regenix's teal. Canvas rather than
// 40+ animated DOM/SVG nodes — cheaper to redraw as pixels every frame
// than to diff as a tree, same reasoning Prompt 450 gave for hand-rolling
// chart SVGs instead of pulling in a library. Paused via
// IntersectionObserver once the hero scrolls out of view, and skipped
// entirely under prefers-reduced-motion (draws one static frame instead)
// — both specifically because an unmanaged full-viewport rAF loop is
// exactly the kind of thing that tanks a Lighthouse perf score.
export default function ParticleField({ className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const parent = canvas?.parentElement
    if (!canvas || !parent) return

    const ctx = canvas.getContext('2d')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    let width = 0
    let height = 0
    let dots = []
    let rafId = null

    function resize() {
      const rect = parent.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function seed() {
      dots = Array.from({ length: DOT_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * SPEED,
        vy: (Math.random() - 0.5) * SPEED,
        r: Math.random() * 1.4 + 0.6,
      }))
    }

    function draw(animate) {
      ctx.clearRect(0, 0, width, height)
      if (animate) {
        for (const d of dots) {
          d.x += d.vx
          d.y += d.vy
          if (d.x < 0 || d.x > width) d.vx *= -1
          if (d.y < 0 || d.y > height) d.vy *= -1
        }
      }
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const a = dots[i]
          const b = dots[j]
          const dist = Math.hypot(a.x - b.x, a.y - b.y)
          if (dist < LINK_DISTANCE) {
            // rgba mirrors --accent (#3a63d6) — canvas fillStyle/strokeStyle
            // can't resolve CSS custom properties, so the value is hardcoded
            // here rather than read from the design token.
            ctx.strokeStyle = `rgba(58, 99, 214, ${0.18 * (1 - dist / LINK_DISTANCE)})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }
      // rgba mirrors --accent-bright (#7c9eff), same reason as above.
      ctx.fillStyle = 'rgba(124, 158, 255, 0.6)'
      for (const d of dots) {
        ctx.beginPath()
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    function loop() {
      draw(true)
      rafId = requestAnimationFrame(loop)
    }

    let seeded = false

    // ResizeObserver, not a window `resize` listener: on first mount the
    // parent's rect can legitimately still be 0-width (the grid layout
    // hasn't settled yet at the point this effect runs), and a
    // window-resize-only listener would leave the canvas permanently
    // zero-sized until the user actually resized the browser. ResizeObserver
    // fires once immediately on observe() with whatever the current size
    // is, then again the moment it changes — so it self-corrects.
    const sizeObserver = new ResizeObserver(() => {
      resize()
      if (!seeded && width > 0 && height > 0) {
        seed()
        seeded = true
      }
      draw(false)
    })
    sizeObserver.observe(parent)

    let intersectionObserver = null
    if (!reduceMotion) {
      intersectionObserver = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          if (rafId == null) rafId = requestAnimationFrame(loop)
        } else if (rafId != null) {
          cancelAnimationFrame(rafId)
          rafId = null
        }
      })
      intersectionObserver.observe(canvas)
    }

    return () => {
      sizeObserver.disconnect()
      if (rafId != null) cancelAnimationFrame(rafId)
      if (intersectionObserver) intersectionObserver.disconnect()
    }
  }, [])

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}
