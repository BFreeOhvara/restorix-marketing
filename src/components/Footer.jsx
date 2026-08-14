const YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="mx-auto flex max-w-shell flex-col items-center justify-between gap-4 px-6 text-sm text-fg-faint md:flex-row">
        <span className="font-display font-medium text-fg-secondary">Restorix</span>
        <span>© {YEAR} Restorix. AI infrastructure for behavioral health treatment centers.</span>
        <a href="mailto:hello@restorix.io" className="transition-colors hover:text-fg-primary">
          hello@restorix.io
        </a>
      </div>
    </footer>
  )
}
