import Reveal from './ui/Reveal'
import { PrimaryButton } from './ui/Button'

const TICKER = ['30-MINUTE STRATEGY CALL', 'WE MAP YOUR FUNNEL LIVE', 'NO OBLIGATION']

export default function FinalCTA() {
  return (
    <section id="cta" className="relative py-24 md:py-32">
      <div className="glow left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 opacity-25" />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <p className="eyebrow">Book a Strategy Call</p>
          <h2 className="mt-5 font-display text-3xl font-medium leading-tight tracking-tight text-fg-primary md:text-5xl">
            Stop paying to attract admissions you never book.
          </h2>
          <p className="mx-auto mt-5 max-w-xl font-sans text-base text-fg-secondary md:text-lg">
            In 30 minutes we'll map your current intake funnel, show you exactly where it leaks,
            and outline the Restorix system that closes it. If it's not a fit, we'll tell you.
          </p>
          <div className="mt-9">
            <PrimaryButton className="!px-8 !py-3.5 text-base">Book a Strategy Call</PrimaryButton>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {TICKER.map((t, i) => (
              <span key={t} className="flex items-center gap-3">
                <span className="eyebrow !text-fg-faint">{t}</span>
                {i < TICKER.length - 1 && <span className="h-1 w-1 rounded-full bg-fg-faint" />}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
