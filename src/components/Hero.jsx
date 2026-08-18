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
        <span className="flex h-2 w-2 animate-pulse rounded-full bg-accent" />
      </div>
      <div className="mt-5 space-y-4">
        {TIMELINE.map((step, i) => (
          <motion.div
            key={step.label}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.7 + i * 0.18 }}
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
      <div className="glow h-[380px] w-[380px] -right-16 top-10" />
      <div className="glow h-[260px] w-[260px] left-[-8%] bottom-0 opacity-15" />
      <ParticleField className="pointer-events-none absolute inset-0" />

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
