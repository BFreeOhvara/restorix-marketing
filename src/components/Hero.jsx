import { motion } from 'framer-motion'
import { PhoneIncoming, MessageSquareText, CalendarCheck } from 'lucide-react'
import { PrimaryButton, SecondaryButton } from './ui/Button'
import ParticleField from './ui/ParticleField'

const TICKER = ['24/7 INQUIRY CAPTURE', 'LEVEL-OF-CARE TRIAGE', 'AUTOMATIC BOOKING']

const TIMELINE = [
  { icon: PhoneIncoming, label: 'Inquiry received', time: '0:00' },
  { icon: MessageSquareText, label: 'Text-back sent', time: '0:04' },
  { icon: CalendarCheck, label: 'Consult booked', time: '2:17' },
]

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

// Prompt 467's dot-particle network (removed 472), Prompts 479-482's
// page-wide ambient-glow blobs, and Prompts 483-486's hero wave (an SVG
// path-stroke ripple, ultimately approved and shipped) all lived in this
// file's hero background across the session — Brayden rejected the wave
// too on further live review and asked for the dot network back (Prompt
// 490), confirmed deliberately: a connected-dot network isn't uniquely
// Regenix's, it's a generic tech-aesthetic pattern, so the concept itself
// was never the problem. See ParticleField.jsx (restored from its own
// git history, not rebuilt from scratch) for the current implementation
// and its own two upgrades (mouse-repulsion, correct hero-only scope).
// Full history of every superseded attempt is in git and
// [[Restorix Memories]], not repeated as dead code here.
// Prompt 496 — live review against Regenix side-by-side flagged the flat
// wash as wrong: Regenix's own background stays genuinely light/white
// everywhere, with only a soft, localized hue as an accent — not a
// wholesale color layer over the whole hero the way Prompt 490's flat
// `rgba` tint read. Replaced with a single soft radial glow, sized and
// positioned to stay well clear of the hero's actual edges/corners so
// they read at (or essentially at) the plain base background color —
// hand-verified via real pixel sampling at both the glow's center and a
// far corner before shipping (see commit message), not just picking an
// opacity that "should" fade out in theory. This is the one case this
// session where a radial-gradient's own falloff-from-center behavior is
// exactly the desired effect rather than the Prompt 480 mistake (that
// bug was a radial-gradient used for an effect meant to be visible
// everywhere; here the ask is specifically "soft and localized").
function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div
        className="absolute left-1/2 top-1/2 h-[120%] w-[65%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(58,99,214,0.4), rgba(58,99,214,0) 65%)',
          filter: 'blur(40px)',
        }}
      />
      <ParticleField className="absolute inset-0 h-full w-full" />
    </div>
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
    <section id="top" className="relative min-h-screen overflow-hidden pb-28 pt-28 md:pb-36 md:pt-36">
      <HeroBackground />
      <div className="glow h-[380px] w-[380px] -right-16 top-10" />
      <div className="glow h-[260px] w-[260px] left-[-8%] bottom-0 opacity-15" />
      {/* Prompt 493 — clean, intentional section boundary instead of a
          hard cutoff into Leak's own heading; same divider technique
          Process.jsx already uses (bg-line). Last in DOM within this
          relative container so it paints above HeroBackground/.glow,
          which sit at the same default stacking level. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-px bg-line" />

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
