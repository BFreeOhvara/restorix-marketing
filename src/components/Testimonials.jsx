import { Quote } from 'lucide-react'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'
import { PrimaryButton } from './ui/Button'

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-shell px-6">
        <SectionHeading eyebrow="What Clients Say" title="Client stories, coming soon." align="center" />

        <Reveal delay={0.1} className="mt-14">
          <div className="mx-auto flex max-w-xl flex-col items-center rounded-card border border-dashed border-line bg-surface px-8 py-14 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-base text-fg-faint">
              <Quote size={20} strokeWidth={1.5} />
            </span>
            <p className="mt-6 font-sans text-base text-fg-secondary">
              Restorix is a new system — we haven't onboarded our first clients yet. This space
              will carry real quotes from real center directors as those relationships launch, not
              placeholders.
            </p>
            <PrimaryButton className="mt-8">Be one of our first clients</PrimaryButton>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
