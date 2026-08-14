import { motion } from 'framer-motion'
import { PhoneIncoming, MessageSquareText, Stethoscope, ClipboardCheck, HeartHandshake } from 'lucide-react'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

const CAPABILITIES = [
  {
    n: '01',
    icon: PhoneIncoming,
    title: 'Lead capture & qualification',
    body: 'Every inquiry — web, form, or phone — answered and scored in seconds, then routed by urgency so the calls that need a human first reach one first.',
  },
  {
    n: '02',
    icon: MessageSquareText,
    title: 'Missed-call recovery',
    body: 'An unanswered call instantly triggers a text-back and callback sequence, so the inquiry your marketing paid for never reaches a competitor.',
  },
  {
    n: '03',
    icon: Stethoscope,
    title: 'Level-of-care & insurance triage',
    body: 'A voice agent that asks the right clinical and coverage questions, on brand, around the clock — and routes each caller to the right level of care.',
  },
  {
    n: '04',
    icon: ClipboardCheck,
    title: 'Structured intake & booking',
    body: 'Intake collected conversationally and written straight to your calendar and systems — no double entry, no details lost between shifts.',
  },
  {
    n: '05',
    icon: HeartHandshake,
    title: 'Follow-up & nurture',
    body: 'Persistent, clinically appropriate sequences that keep undecided families supported until they\'re ready — never pushy, always human when it matters.',
  },
]

function CoreEmblem() {
  return (
    <div className="relative mx-auto flex h-56 w-56 items-center justify-center md:h-64 md:w-64">
      <div className="glow h-full w-full opacity-40" />
      <motion.div
        className="absolute inset-0 rounded-full border border-dashed border-accent/30"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      />
      <div className="absolute inset-6 rounded-full border border-line bg-surface" />
      <div className="relative flex flex-col items-center">
        <span className="font-display text-lg font-semibold tracking-tight text-fg-primary">Restorix</span>
        <span className="eyebrow mt-0.5">core</span>
      </div>
      {CAPABILITIES.map((c, i) => {
        const angle = (i / CAPABILITIES.length) * 2 * Math.PI - Math.PI / 2
        const r = 44
        const x = 50 + r * Math.cos(angle)
        const y = 50 + r * Math.sin(angle)
        return (
          <span
            key={c.n}
            className="eyebrow absolute flex h-7 w-7 items-center justify-center rounded-full border border-accent/40 bg-base !text-accent-deep"
            style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
          >
            {c.n}
          </span>
        )
      })}
    </div>
  )
}

export default function System() {
  return (
    <section id="system" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-shell px-6">
        <SectionHeading
          eyebrow="The Restorix System"
          title="Not a chatbot. A connected revenue layer."
          body="Five capabilities, architected as one system around your center. Each part hands off to the next — capture to qualify, recover to book, book to nurture — so no inquiry falls through the gaps between tools."
        />

        <Reveal className="mt-16" delay={0.1}>
          <CoreEmblem />
        </Reveal>

        <div className="mt-16 grid gap-px overflow-hidden rounded-card border border-line bg-line md:grid-cols-2">
          {CAPABILITIES.map((c, i) => (
            <Reveal key={c.n} delay={i * 0.06}>
              <div className="flex h-full gap-5 bg-surface p-8">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-base text-accent">
                  <c.icon size={18} strokeWidth={1.75} />
                </div>
                <div>
                  <span className="eyebrow">{c.n}</span>
                  <h3 className="mt-1 font-display text-lg font-medium text-fg-primary">{c.title}</h3>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-fg-secondary">{c.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
