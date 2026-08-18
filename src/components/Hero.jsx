import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { PhoneIncoming, MessageSquareText, CalendarCheck } from 'lucide-react'
import { PrimaryButton, SecondaryButton } from './ui/Button'

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduced
}

const TICKER = ['24/7 INQUIRY CAPTURE', 'LEVEL-OF-CARE TRIAGE', 'AUTOMATIC BOOKING']

const TIMELINE = [
  { icon: PhoneIncoming, label: 'Inquiry received', time: '0:00' },
  { icon: MessageSquareText, label: 'Text-back sent', time: '0:04' },
  { icon: CalendarCheck, label: 'Consult booked', time: '2:17' },
]

// Prompt 472 — corrects Prompt 467's hero background: Brayden's actual ask
// was "more life via subtle animation," not a Regenix-style dot/particle
// network (which is what shipped and read as too close a copy). Removed
// the network entirely; the motion now lives on the Live Intake card
// itself, since that's the one piece of the hero that's actually about
// the product rather than a generic tech-background graphic.
// Prompt 478 — corrects Prompt 472's own execution: the rows looping
// forever wasn't the ask, a one-time entrance on load was ("maybe when
// it first loads up, they slide in"). Reverted to a plain initial/animate
// reveal, no repeat. The status dot's slow pulse stays — that wasn't the
// complaint, per the prompt's own explicit default.
//
// Prompt 484 — live review flagged that the card's glass/frosted-panel
// feel was gone. Checked git history first, per the prompt's own
// instruction, rather than guessing values — this card has used a fully
// opaque `bg-elevated` since it was introduced in Prompt 430; a genuine
// glassmorphism treatment never actually existed here in code before, so
// 484 built one from scratch (approximate values). Prompt 485 replaces
// those with the exact values from the now-approved reference file's own
// `.glass-card` rule, copied directly rather than re-derived: `rgba(255,
// 255,255,0.55)` fill, `blur(20px)`, `1px solid rgba(255,255,255,0.8)`
// border, `16px` radius, `0 20px 60px rgba(58,99,214,0.15)` shadow — set
// via inline `style` rather than Tailwind classes so the numbers match
// the approved file exactly, with no arbitrary-value/opacity-modifier
// compilation risk (the same class of bug 484 found and fixed on
// Nav.jsx's own glass background).

// Prompt 483 — replaced page-wide ambient-glow lava-lamp blobs with a
// hero-scoped layered-gradient wave. Prompt 485 replaced *this* in turn
// — Brayden didn't like the gradient-band result either, and this went
// through several live rounds against a standalone HTML mockup before
// landing on the version below. History of both superseded attempts is
// in git (up to commit 5cd74bd) and [[Restorix Memories]], not repeated
// as dead code here.
//
// Prompt 485 — ports `restorix-hero-wave-approved.html` (vault root)
// verbatim, not a reinterpretation: two overlapping SVG `<path>` STROKES
// (not filled shapes, not CSS gradients) inside a shared
// `feGaussianBlur(stdDeviation=32)` filter, each path's `d` animated via
// native SMIL `<animate>` between the same 4 keyframe strings on an 18s
// loop (`calcMode="spline"` for the ease) — this is what makes it read
// as one continuous shape gently rippling in place, not objects sliding
// around. Geometry deliberately runs from off-canvas at the left wall,
// roughly mid-height, up to off-canvas top-right — it never reaches the
// hero's bottom edge, which is what avoids a hard cutoff line at the
// section boundary on scroll (a real problem an earlier round hit and
// fixed live, before this file was approved). Colors/widths/opacities
// are copied exactly: `#7c9eff` width 230 opacity 0.7 (outer), `#3a63d6`
// width 100 opacity 0.6 (inner) — same accent-blue family as every prior
// attempt, just finally the right technique.
//
// `usePrefersReducedMotion` gates the `<animate>` children specifically
// because SMIL isn't controlled by the `prefers-reduced-motion` CSS
// media query the way CSS `@keyframes` are — each path also carries a
// static `d` (the animation's own first keyframe) so reduced-motion
// users still see the full shape, just not rippling.
//
// Prompt 486 — 485's port diverged from the approved reference on live
// review: no visible motion, plus a hard cutoff line partway down the
// hero. Two targeted fixes, design values untouched:
//   1. Added an explicit `keyTimes="0;0.33;0.67;1"` to both <animate>
//      elements. Per the SMIL spec, `calcMode="spline"` requires
//      `keyTimes` to define the interval boundaries `keySplines` eases
//      between — the reference file omits it (relying on an implicit
//      uniform default), which is a real spec gap that can make a
//      strict engine treat the whole animation as invalid and simply
//      not run it, rather than gracefully falling back. Making it
//      explicit removes that ambiguity without changing the timing
//      (0/0.33/0.67/1 is exactly the uniform default for 4 values).
//   2. Filter switched from the default `objectBoundingBox` units
//      (`x/y/width/height` as percentages of the filtered content's own
//      bounding box) to `filterUnits="userSpaceOnUse"` with a large,
//      explicit region in viewBox units. `objectBoundingBox` percentage
//      regions are a well-documented source of inconsistent cross-
//      browser handling for stroked-but-unfilled paths specifically —
//      implementations vary on whether the bounding box used for that
//      percentage math accounts for `stroke-width` (230 on the outer
//      path here) at all, and an under-sized region clips the Gaussian
//      blur's soft falloff at a hard edge instead of letting it fade —
//      which reads exactly as the "hard cutoff line" reported, and
//      would explain why the same numbers looked fine in the reference
//      file's own rendering context but not here. `userSpaceOnUse` with
//      generous, explicit bounds removes that ambiguity entirely.
//   (Also tried and reverted a third fix this pass: removing the
//   `h-full w-full` classes on the theory that `inset-0` alone should
//   be sufficient and more robust. Verified experimentally instead that
//   removing them causes the SVG — a replaced element with an intrinsic
//   aspect ratio from its own viewBox — to fall back to computing
//   height from that 12:7 ratio rather than stretching to the section's
//   real height, which is itself a container-height mismatch bug. Kept
//   `h-full w-full`, which measurably makes the SVG's rendered box
//   match the hero section's box exactly.)
// Both bugs were reported from a real browser and could not be directly
// re-observed in this project's own verification tooling this session —
// SMIL, like every other frame-tied animation type logged this session
// (CSS `@keyframes`, framer-motion, `requestAnimationFrame`), never
// visibly advances past its first frame in this pane, and a real
// screenshot tool was unavailable again. Verified by construction
// instead (see commit message) and flagged honestly rather than
// claimed confirmed — worth a direct look on the real live site.
function HeroWave() {
  const reduced = usePrefersReducedMotion()
  return (
    <svg
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      viewBox="0 0 1200 700"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <filter
          id="hero-wave-blur"
          filterUnits="userSpaceOnUse"
          x="-500"
          y="-400"
          width="2400"
          height="1600"
        >
          <feGaussianBlur stdDeviation="32" />
        </filter>
      </defs>
      <g filter="url(#hero-wave-blur)">
        <path
          fill="none"
          stroke="#7c9eff"
          strokeWidth="230"
          strokeLinecap="round"
          opacity="0.7"
          d="M -100 400 C 150 520, 230 340, 560 300 C 870 260, 900 60, 1250 -80"
        >
          {!reduced && (
            <animate
              attributeName="d"
              values="
                M -100 400 C 150 520, 230 340, 560 300 C 870 260, 900 60, 1250 -80;
                M -100 420 C 180 500, 260 360, 540 320 C 850 280, 930 40, 1250 -60;
                M -100 380 C 130 540, 210 320, 580 290 C 890 250, 880 80, 1250 -100;
                M -100 400 C 150 520, 230 340, 560 300 C 870 260, 900 60, 1250 -80"
              dur="18s"
              repeatCount="indefinite"
              calcMode="spline"
              keyTimes="0;0.33;0.67;1"
              keySplines="0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1"
            />
          )}
        </path>
        <path
          fill="none"
          stroke="#3a63d6"
          strokeWidth="100"
          strokeLinecap="round"
          opacity="0.6"
          d="M -100 420 C 170 530, 280 350, 570 310 C 860 270, 890 70, 1240 -70"
        >
          {!reduced && (
            <animate
              attributeName="d"
              values="
                M -100 420 C 170 530, 280 350, 570 310 C 860 270, 890 70, 1240 -70;
                M -100 440 C 200 510, 310 370, 550 330 C 840 290, 920 50, 1240 -50;
                M -100 400 C 150 550, 260 330, 590 300 C 880 260, 870 90, 1240 -90;
                M -100 420 C 170 530, 280 350, 570 310 C 860 270, 890 70, 1240 -70"
              dur="18s"
              repeatCount="indefinite"
              calcMode="spline"
              keyTimes="0;0.33;0.67;1"
              keySplines="0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1"
            />
          )}
        </path>
      </g>
    </svg>
  )
}

function LiveCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 0.68, 0.32, 0.99] }}
      className="relative w-full max-w-sm p-6"
      style={{
        background: 'rgba(255,255,255,0.55)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.8)',
        borderRadius: '16px',
        boxShadow: '0 20px 60px rgba(58,99,214,0.15)',
      }}
    >
      <div className="flex items-center justify-between">
        <span className="eyebrow">Live intake</span>
        <motion.span
          animate={{ opacity: [1, 0.35, 1] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
          className="flex h-2 w-2 rounded-full bg-accent"
        />
      </div>
      <div className="mt-5 space-y-4">
        {TIMELINE.map((step, i) => (
          <motion.div
            key={step.label}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.7 + i * 0.18, ease: [0.22, 0.68, 0.32, 0.99] }}
            className="flex items-center gap-3"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-base text-accent">
              <step.icon size={15} strokeWidth={1.75} />
            </span>
            <span className="flex-1 font-sans text-sm font-medium text-fg-primary">{step.label}</span>
            <span className="font-mono text-xs text-fg-faint">{step.time}</span>
          </motion.div>
        ))}
      </div>
      <div className="mt-5 rounded-full bg-base px-4 py-2 text-center font-mono text-[11px] uppercase tracking-widest text-accent-deep">
        No inquiry left waiting
      </div>
    </motion.div>
  )
}

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-20 pt-28 md:pt-36">
      <HeroWave />
      <div className="glow h-[380px] w-[380px] -right-16 top-10" />
      <div className="glow h-[260px] w-[260px] left-[-8%] bottom-0 opacity-15" />

      <div className="relative mx-auto grid max-w-shell items-center gap-14 px-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="eyebrow"
          >
            AI infrastructure for behavioral health treatment centers
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 0.68, 0.32, 0.99] }}
            className="mt-6 max-w-xl font-display text-[2.6rem] font-medium leading-[1.06] tracking-tight text-fg-primary md:text-[3.4rem]"
          >
            More admissions booked.
            <br />
            None of the manual intake work.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.22 }}
            className="mt-6 max-w-md font-sans text-lg text-fg-secondary"
          >
            Restorix installs AI systems that capture, qualify, and follow up with every
            inquiry — so your center books more of the admissions it's already earning,
            without adding front-desk staff.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.32 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <PrimaryButton>Book a Strategy Call</PrimaryButton>
            <SecondaryButton>See how the system works</SecondaryButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-10 flex flex-wrap items-center gap-2.5"
          >
            {TICKER.map((t) => (
              <span
                key={t}
                className="eyebrow rounded-full border border-line bg-surface px-3 py-1.5 !text-fg-secondary"
              >
                {t}
              </span>
            ))}
          </motion.div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <LiveCard />
        </div>
      </div>
    </section>
  )
}
