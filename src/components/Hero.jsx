import { motion } from 'framer-motion'
import { PrimaryButton, SecondaryButton } from './ui/Button'

const TICKER = ['24/7 INQUIRY CAPTURE', 'LEVEL-OF-CARE TRIAGE', 'AUTOMATIC BOOKING']

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-20 pt-28 md:pt-36">
      <div className="glow h-[420px] w-[420px] -right-24 -top-32" />
      <div className="glow h-[320px] w-[320px] left-[-10%] top-[30%] opacity-20" />

      <div className="relative mx-auto max-w-shell px-6">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="eyebrow"
        >
          AI infrastructure for behavioral health treatment centers
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-6 max-w-3xl font-display text-[2.75rem] font-medium leading-[1.05] tracking-tight text-fg-primary md:text-6xl"
        >
          More admissions booked.
          <br />
          None of the manual intake work.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 max-w-xl font-sans text-lg text-fg-secondary"
        >
          Restorix installs AI systems that capture, qualify, and follow up with every
          inquiry — so your center books more of the admissions it's already earning,
          without adding front-desk staff.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <PrimaryButton>Book a Strategy Call</PrimaryButton>
          <SecondaryButton>See how the system works</SecondaryButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 flex flex-wrap items-center gap-3 border-t border-line pt-6"
        >
          {TICKER.map((t, i) => (
            <span key={t} className="flex items-center gap-3">
              <span className="eyebrow !text-fg-faint">{t}</span>
              {i < TICKER.length - 1 && <span className="h-1 w-1 rounded-full bg-fg-faint" />}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
