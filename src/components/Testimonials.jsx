import { Quote } from 'lucide-react'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'
import { PrimaryButton } from './ui/Button'

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-shell px-6">
        <SectionHeading eyebrow="What Clients Say" title="Client stories, coming soon." />

        <Reveal delay={0.1} className="mt-12">
          <div className="grid items-center gap-8 rounded-card border border-dashed border-line bg-surface p-10 md:grid-cols-[auto_1fr_auto] md:gap-10">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-line bg-base text-fg-faint">
              <Quote size={22} strokeWidth={1.5} />
            </span>
            <p className="font-sans text-base text-fg-secondary">
              Restorix is a new system — we haven't onboarded our first clients yet. This space
              will carry real quotes from real center directors as those relationships launch,
              not placeholders.
            </p>
            <PrimaryButton className="shrink-0">Be one of our first clients</PrimaryButton>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
