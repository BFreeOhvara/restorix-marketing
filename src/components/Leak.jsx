import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

const STAGES = [
  {
    n: '01',
    title: 'The Missed Call',
    body: "Admissions inquiries hit voicemail during assessments, after hours, and over weekends. Most callers don't wait — they call the next center.",
    stat: '60–75%',
    caption: 'of admission inquiries arrive by phone',
  },
  {
    n: '02',
    title: 'The Slow Follow-Up',
    body: 'By the time someone hears back, they may already be in crisis with another facility. Manual callback queues simply can\'t keep pace with intent.',
    stat: '9–21×',
    caption: 'more likely to convert when contacted within 5 minutes',
  },
  {
    n: '03',
    title: 'The Cold Lead',
    body: 'Without structured, level-of-care-aware follow-up, a real inquiry goes quiet within days. The need was real — the system to recapture it wasn\'t there.',
    stat: '<20%',
    caption: 'average conversion rate from inbound call to admission',
  },
  {
    n: '04',
    title: 'The Buried Front Desk',
    body: 'Verifying insurance, screening level of care, and manual re-scheduling eat hours that should go to the people already in your care.',
    stat: '18.5%',
    caption: 'click-to-call conversion, vs. 2.8% for form fills',
  },
]

export default function Leak() {
  return (
    <section id="leak" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-shell px-6">
        <SectionHeading
          eyebrow="The Leak"
          title="Most centers lose the admissions they've already won."
          body="You spend real money and staff hours to make the phone ring. Then the funnel leaks at every stage between “interested” and “admitted.” It's rarely a marketing problem — it's an infrastructure problem."
          footnote="Based on published behavioral-health intake benchmarks"
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {STAGES.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08}>
              <div className="group h-full rounded-card border border-line bg-surface p-8 transition-colors duration-300 hover:border-accent/40">
                <span className="eyebrow">{s.n}</span>
                <h3 className="mt-3 font-display text-xl font-medium text-fg-primary">{s.title}</h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-fg-secondary">{s.body}</p>
                <div className="mt-8 flex items-baseline gap-3 border-t border-line pt-6">
                  <span className="font-display text-4xl font-medium text-accent">{s.stat}</span>
                </div>
                <p className="eyebrow mt-2 !text-fg-faint">{s.caption}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
