import clsx from 'clsx'
import { motion } from 'framer-motion'

const RADIUS = 108
const NODE_R = 22

function nodePosition(i, count, cx, cy) {
  const angle = (Math.PI * 2 * i) / count - Math.PI / 2
  return { x: cx + RADIUS * Math.cos(angle), y: cy + RADIUS * Math.sin(angle) }
}

// Prompt 467 — Restorix's own take on Regenix's circular process diagram:
// a ring of nodes (one per Stack capability) with a progress arc that
// grows as System.jsx's scroll-spy advances `active`. This component only
// renders whatever index it's given — the scroll-tracking itself lives in
// System.jsx via IntersectionObserver. Own visual language, not a pixel
// copy: accent-tinted arc/nodes instead of Regenix's teal, numbered nodes
// instead of icon glyphs (SVG can't render lucide icons without a
// foreignObject, not worth the cross-browser risk for this).
export default function SystemDiagram({ items, active }) {
  const size = 280
  const cx = size / 2
  const cy = size / 2
  const count = items.length
  const progress = (active + 1) / count

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="h-auto w-full max-w-[280px]">
      <circle cx={cx} cy={cy} r={RADIUS} fill="none" strokeWidth={1.5} className="stroke-line" />
      <motion.circle
        cx={cx}
        cy={cy}
        r={RADIUS}
        fill="none"
        strokeWidth={2.5}
        strokeLinecap="round"
        className="stroke-accent"
        pathLength={1}
        strokeDasharray={1}
        initial={false}
        animate={{ strokeDashoffset: 1 - progress }}
        transform={`rotate(-90 ${cx} ${cy})`}
        transition={{ duration: 0.5, ease: [0.22, 0.68, 0.32, 0.99] }}
      />

      <circle cx={cx} cy={cy} r={44} strokeWidth={1} className="fill-elevated stroke-line" />
      <text x={cx} y={cy - 4} textAnchor="middle" className="fill-fg-primary font-display text-[13px] font-medium">
        Restorix
      </text>
      <text x={cx} y={cy + 12} textAnchor="middle" className="fill-accent font-mono text-[10px] uppercase tracking-widest">
        CORE
      </text>

      {items.map((item, i) => {
        const { x, y } = nodePosition(i, count, cx, cy)
        const isActive = i === active
        const isPast = i < active
        return (
          <g key={item.n} transform={`translate(${x} ${y})`}>
            <circle
              r={NODE_R}
              strokeWidth={1.5}
              className={clsx(
                'transition-colors duration-300',
                isActive
                  ? 'fill-accent stroke-accent'
                  : isPast
                    ? 'fill-accent-bright/25 stroke-accent-bright/50'
                    : 'fill-elevated stroke-line'
              )}
            />
            <text
              textAnchor="middle"
              dominantBaseline="central"
              className={clsx(
                'font-mono text-[11px] font-medium transition-colors duration-300',
                isActive ? 'fill-white' : 'fill-fg-secondary'
              )}
            >
              {item.n}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
