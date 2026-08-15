import { ArrowRight } from 'lucide-react'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'
import { PrimaryButton } from './ui/Button'

const SEGMENTS = [
  {
    n: '01',
    title: 'Substance use detox & residential rehab',
    body: 'Time-sensitive inquiries qualified and booked before a family calls the next center — with bed availability and insurance handled accurately on first contact.',
  },
  {
    n: '02',
    title: 'IOP / PHP outpatient programs',
    body: 'Ongoing enrollment deserves fast, consistent first responses. Capture the inquiry, screen the fit, get them scheduled for an assessment.',
  },
  {
    n: '03',
    title: 'Dual-diagnosis & co-occurring disorder centers',
    body: 'Complex clinical intake handled with the right questions in the right order, every time — no detail lost between shifts or hand-offs.',
  },
  {
    n: '04',
    title: 'Eating disorder treatment centers',
    body: 'A sensitive first conversation, every time, at any hour a family reaches out — routed to your team the moment more than triage is needed.',
  },
  {
    n: '05',
    title: 'Psychiatric & specialty mental health',
    body: 'Including ketamine and TMS programs — always-on booking that turns after-hours interest and missed calls into scheduled consults.',
  },
]

export default function WhoItsFor() {
  return (
    <section id="who" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-shell px-6">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            eyebrow="Who It's For"
            title="Built for serious behavioral health providers."
            body="Restorix is purpose-built for centers where the admissions journey is urgent, high-consideration, and easy to lose to a slow reply."
          />

          <div className="border-t border-line">
            {SEGMENTS.map((s, i) => (
              <Reveal key={s.n} direction="right" delay={i * 0.05}>
                <div className="grid grid-cols-[3.5rem_1fr] gap-6 border-b border-line py-7 md:grid-cols-[4.5rem_1fr]">
                  <span className="font-display text-3xl font-medium text-fg-faint md:text-4xl">{s.n}</span>
                  <div>
                    <h3 className="font-display text-lg font-medium text-fg-primary md:text-xl">{s.title}</h3>
                    <p className="mt-2 max-w-xl font-sans text-sm leading-relaxed text-fg-secondary">{s.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}

            <Reveal direction="right" delay={SEGMENTS.length * 0.05}>
              <div className="flex flex-col items-start gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
                <p className="font-display text-lg font-medium text-fg-primary">
                  Adjacent specialty? If your patients call before they commit, Restorix fits.
                </p>
                <PrimaryButton className="shrink-0">
                  Check your fit <ArrowRight size={15} />
                </PrimaryButton>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
