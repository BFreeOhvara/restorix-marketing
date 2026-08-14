import { useEffect, useState } from 'react'
import { PrimaryButton } from './ui/Button'

const LINKS = [
  { href: '#leak', label: 'The Leak' },
  { href: '#system', label: 'The System' },
  { href: '#process', label: 'Process' },
  { href: '#who', label: "Who It's For" },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-base/80 backdrop-blur-md border-b border-line' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-shell items-center justify-between px-6 py-5">
        <a href="#top" className="font-display text-lg font-semibold tracking-tight text-fg-primary">
          Restorix
        </a>
        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-sans text-sm text-fg-secondary transition-colors hover:text-fg-primary"
            >
              {l.label}
            </a>
          ))}
        </div>
        <PrimaryButton className="!px-5 !py-2.5 text-xs md:text-sm">Book a Strategy Call</PrimaryButton>
      </nav>
    </header>
  )
}
