import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

const METRICS = [
  { label: 'Average first-response time', note: 'Target: under 60 seconds, day or night' },
  { label: 'Inquiry-to-admission lift', note: 'Measured within the first 90 days live' },
  { label: 'Missed calls re-engaged', note: 'Automatic text-back & callback' },
  { label: 'Hours reclaimed each week', note: 'Front-desk admin removed' },
]

export default function Outcomes() {
  return (
    <section id="outcomes" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-shell px-6">
        <SectionHeading
          eyebrow="Outcomes"
          title="The numbers a center director actually cares about."
          footnote="Reported as real client data — Restorix is early"
        />

        <Reveal delay={0.1}>
          <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-line bg-surface px-5 py-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-bright" />
            <span className="font-sans text-sm text-fg-secondary">
              Restorix is a new system — these are the metrics we track from day one with every
              client, not industry averages.
            </span>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {METRICS.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.06}>
              <div className="h-full rounded-card border border-line bg-surface p-7">
                <span className="font-display text-4xl font-medium text-fg-faint">—</span>
                <p className="mt-4 font-sans text-sm font-medium text-fg-primary">{m.label}</p>
                <p className="eyebrow mt-2 !text-fg-faint">{m.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
