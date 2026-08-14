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
        <SectionHeading
          eyebrow="Who It's For"
          title="Built for serious behavioral health providers."
          body="Restorix is purpose-built for centers where the admissions journey is urgent, high-consideration, and easy to lose to a slow reply."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SEGMENTS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.06}>
              <div className="h-full rounded-card border border-line bg-surface p-7 transition-colors duration-300 hover:border-accent/40">
                <span className="eyebrow">{s.n}</span>
                <h3 className="mt-3 font-display text-lg font-medium leading-snug text-fg-primary">{s.title}</h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-fg-secondary">{s.body}</p>
              </div>
            </Reveal>
          ))}

          <Reveal delay={SEGMENTS.length * 0.06}>
            <div className="flex h-full flex-col justify-between rounded-card border border-dashed border-accent/40 bg-base p-7">
              <div>
                <span className="eyebrow">Adjacent specialty?</span>
                <p className="mt-3 font-display text-lg font-medium leading-snug text-fg-primary">
                  If your patients call before they commit, Restorix fits.
                </p>
              </div>
              <PrimaryButton className="mt-6 self-start">
                Check your fit <ArrowRight size={15} />
              </PrimaryButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
