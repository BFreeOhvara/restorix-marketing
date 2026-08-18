import { motion } from 'framer-motion'
import { PhoneIncoming, MessageSquareText, CalendarCheck } from 'lucide-react'
import { PrimaryButton, SecondaryButton } from './ui/Button'

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

// Prompt 483 — replaces the page-wide ambient-glow lava-lamp blobs
// (Prompts 479-482, scrapped outright — Brayden saw it live and didn't
// want it) with a much calmer, hero-scoped waving gradient. Confirmed
// with Brayden directly before building: layered, animated CSS gradients
// (not a noise/shader flow sim) — three large, blurred, elongated
// radial-gradient bands in the site's own accent-blue family, each
// rotated at a different base angle and drifting slowly via
// translate/rotate/scale (deliberately not opacity — kept simple per
// the picked approach). The overlaps between bands are what create the
// shifting "waving" impression as they drift past each other, not any
// one band's own shape changing.
//
// Carries the Prompt 480 lesson forward directly: hand-computed the real
// peak-center alpha blend against --bg-base (#e5ecea, rgb 229/236/234)
// before shipping, not just confirmed the CSS parses. All three bands
// clear the ~34/255 threshold Prompt 480 established as the edge of
// perceptible on this background:
//   Band A (--accent-bright, opacity .34): rgb diff ≈45/255
//   Band B (--accent, opacity .26):        rgb diff ≈57/255
//   Band C (--accent-deep, opacity .22):   rgb diff ≈58/255
// Deliberately still well under the blob attempt's post-480-fix peak
// (~72/255) — "gentle and present, not invisible," per the prompt's own
// framing, not as bold as the scrapped version.
function HeroWave() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div
        className="hero-wave hero-wave-a h-[15rem] w-[62rem] -left-40 top-[8%]"
        style={{
          background: 'radial-gradient(ellipse, var(--accent-bright), rgba(0,0,0,0) 70%)',
          opacity: 0.34,
          transform: 'rotate(-6deg)',
        }}
      />
      <div
        className="hero-wave hero-wave-b h-[13rem] w-[54rem] -right-32 top-[32%]"
        style={{
          background: 'radial-gradient(ellipse, var(--accent), rgba(0,0,0,0) 70%)',
          opacity: 0.26,
          transform: 'rotate(5deg)',
        }}
      />
      <div
        className="hero-wave hero-wave-c h-[12rem] w-[48rem] left-[6%] bottom-[2%]"
        style={{
          background: 'radial-gradient(ellipse, var(--accent-deep), rgba(0,0,0,0) 70%)',
          opacity: 0.22,
          transform: 'rotate(3deg)',
        }}
      />
    </div>
  )
}

function LiveCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 0.68, 0.32, 0.99] }}
      className="relative w-full max-w-sm rounded-card border border-line bg-elevated p-6 shadow-[0_30px_60px_-25px_rgba(15,31,27,0.25)]"
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
