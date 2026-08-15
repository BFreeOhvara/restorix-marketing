import clsx from 'clsx'
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

export default function System() {
  return (
    <section id="system" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-shell px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="The Restorix System"
            title="Not a chatbot. A connected revenue layer."
            body="Five capabilities, architected as one system around your center. Each part hands off to the next — capture to qualify, recover to book, book to nurture — so no inquiry falls through the gaps between tools."
          />
          <Reveal direction="left" delay={0.15}>
            <span className="hidden shrink-0 rounded-full border border-accent/30 bg-surface px-5 py-2 font-display text-sm font-medium tracking-tight text-accent-deep md:inline-block">
              Restorix<span className="text-accent">CORE</span>
            </span>
          </Reveal>
        </div>

        <div className="relative mt-16">
          <div className="absolute left-6 top-4 bottom-4 hidden w-px bg-line md:block" />
          <div className="space-y-8">
            {CAPABILITIES.map((c, i) => {
              const reversed = i % 2 === 1
              return (
                <Reveal key={c.n} direction={reversed ? 'right' : 'left'} delay={i * 0.05}>
                  <div className="grid gap-5 md:grid-cols-[3rem_1fr] md:gap-8">
                    <div className="relative hidden md:block">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full border border-accent/30 bg-elevated text-accent">
                        <c.icon size={18} strokeWidth={1.75} />
                      </span>
                    </div>
                    <div
                      className={clsx(
                        'rounded-card border border-line bg-surface p-7 md:max-w-2xl',
                        reversed && 'md:ml-auto'
                      )}
                    >
                      <div className="flex items-center gap-3 md:hidden">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-accent/30 bg-elevated text-accent">
                          <c.icon size={16} strokeWidth={1.75} />
                        </span>
                        <span className="eyebrow">{c.n}</span>
                      </div>
                      <span className="eyebrow hidden md:inline">{c.n}</span>
                      <h3 className="mt-2 font-display text-lg font-medium text-fg-primary md:mt-1">
                        {c.title}
                      </h3>
                      <p className="mt-2 font-sans text-sm leading-relaxed text-fg-secondary">{c.body}</p>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
