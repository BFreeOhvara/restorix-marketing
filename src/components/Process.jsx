import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

const STEPS = [
  {
    n: '01',
    title: 'Consult',
    lead: 'We map how inquiries actually reach you.',
    body: 'Before a single line of automation, we audit your real intake funnel — channels, call volume, response times, and exactly where inquiries drop. No templates, no assumptions.',
    tags: ['FUNNEL AUDIT', 'CALL REVIEW', 'DROP-OFF MAPPING'],
  },
  {
    n: '02',
    title: 'Architect',
    lead: 'We design the system around your center.',
    body: 'A clear blueprint: which agents, which scripts, which handoffs, and what writes back to your EHR/CRM and calendar. You see and approve the entire flow before anything ships.',
    tags: ['AGENT DESIGN', 'SCRIPT LOGIC', 'INTEGRATION PLAN'],
  },
  {
    n: '03',
    title: 'Install',
    lead: 'We build, integrate, and go live with you.',
    body: 'We configure the agents on your levels of care, insurance mix, and compliance needs, connect them to your stack, and launch — with you watching every conversation from day one.',
    tags: ['BUILD', 'INTEGRATE', 'SUPERVISED LAUNCH'],
  },
  {
    n: '04',
    title: 'Optimize',
    lead: 'We tune relentlessly for booked admissions.',
    body: 'Weekly review of real conversations and conversion data. We refine triage, timing, and tone until the numbers move — then keep them moving as you grow.',
    tags: ['CONVERSATION QA', 'CONVERSION TUNING', 'REPORTING'],
  },
]

export default function Process() {
  return (
    <section id="process" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-shell px-6">
        <SectionHeading
          eyebrow="How It Works"
          title="A four-step install, not a software handoff."
        />

        <div className="relative mt-16">
          <div className="absolute left-6 top-2 bottom-2 hidden w-px bg-line md:block" />
          <div className="space-y-10 md:space-y-16">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08}>
                <div className="grid gap-6 md:grid-cols-[3rem_1fr] md:gap-10">
                  <div className="relative hidden md:block">
                    <div className="sticky top-32 flex h-12 w-12 items-center justify-center rounded-full border border-accent/30 bg-base font-mono text-sm text-accent-deep">
                      {s.n}
                    </div>
                  </div>
                  <div className="rounded-card border border-line bg-surface p-8">
                    <span className="eyebrow md:hidden">{s.n}</span>
                    <h3 className="mt-2 font-display text-2xl font-medium text-fg-primary md:mt-0">
                      {s.title} — <span className="text-fg-secondary">{s.lead}</span>
                    </h3>
                    <p className="mt-4 max-w-2xl font-sans text-sm leading-relaxed text-fg-secondary md:text-base">
                      {s.body}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
                      {s.tags.map((t) => (
                        <span key={t} className="eyebrow !text-fg-faint">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
