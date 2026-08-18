import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import { PhoneIncoming, MessageSquareText, Stethoscope, ClipboardCheck, HeartHandshake } from 'lucide-react'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'
import SystemDiagram from './ui/SystemDiagram'

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

// Prompt 467: scroll-linked active-step tracking for the new circular
// diagram — whichever capability block is nearest the viewport's vertical
// center becomes "active." rootMargin shrinks the observed band to 45%
// from each edge, so the swap happens as a block crosses mid-screen
// rather than the instant it merely enters view. Works both scroll
// directions by construction — re-entering the band from either side
// fires `isIntersecting: true` and updates `active`, with no special-case
// needed for scrolling up vs. down.
function useActiveCapability(count) {
  const itemRefs = useRef([])
  const [active, setActive] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const idx = itemRefs.current.indexOf(entry.target)
          if (idx !== -1) setActive(idx)
        }
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    )
    itemRefs.current.slice(0, count).forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [count])

  return { itemRefs, active }
}

export default function System() {
  const { itemRefs, active } = useActiveCapability(CAPABILITIES.length)

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

        <div className="mt-16 grid gap-10 lg:grid-cols-[280px_1fr] lg:gap-16">
          <div className="hidden lg:block">
            <div className="sticky top-32 flex justify-center">
              <SystemDiagram items={CAPABILITIES} active={active} />
            </div>
          </div>

          <div className="space-y-8">
            {CAPABILITIES.map((c, i) => (
              <div key={c.n} ref={(el) => (itemRefs.current[i] = el)}>
                <Reveal direction="up" delay={i * 0.05}>
                  <div
                    className={clsx(
                      'rounded-card border p-7 transition-colors duration-300 lg:max-w-2xl',
                      active === i ? 'border-accent/40 bg-elevated' : 'border-line bg-surface'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={clsx(
                          'flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors duration-300',
                          active === i ? 'border-accent bg-accent text-white' : 'border-accent/30 bg-elevated text-accent'
                        )}
                      >
                        <c.icon size={17} strokeWidth={1.75} />
                      </span>
                      <span className="eyebrow">{c.n}</span>
                    </div>
                    <h3 className="mt-3 font-display text-lg font-medium text-fg-primary">{c.title}</h3>
                    <p className="mt-2 font-sans text-sm leading-relaxed text-fg-secondary">{c.body}</p>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
