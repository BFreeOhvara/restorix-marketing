import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MessageCircle, X } from 'lucide-react'
import { PrimaryButton } from './ui/Button'

// Prompt 467: visual-only placeholder, confirmed with Brayden directly
// rather than guessed — Restorix has no live chat tool or AI agent wired
// up yet, so opening it surfaces the same real "Book a Strategy Call"
// mailto: CTA every other button on the site already uses, instead of
// pretending to be a working chat. Same no-fabricated-capability rule
// this project already applies to Testimonials/Commissions.jsx.
export default function ChatWidget() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.22, 0.68, 0.32, 0.99] }}
            className="w-[19rem] rounded-card border border-line bg-elevated p-6 shadow-[0_30px_60px_-25px_rgba(15,31,27,0.35)]"
          >
            <p className="eyebrow">Chat with Restorix</p>
            <p className="mt-3 font-sans text-sm leading-relaxed text-fg-secondary">
              We're not staffed for live chat yet. Book a 30-minute strategy call instead —
              a real person will map your intake funnel with you.
            </p>
            <PrimaryButton className="mt-5 w-full !py-2.5 text-sm">
              Book a Strategy Call
            </PrimaryButton>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close chat' : 'Open chat'}
        aria-expanded={open}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-[0_20px_40px_-15px_rgba(36,70,158,0.6)] transition-transform duration-300 hover:scale-105 hover:bg-accent-deep"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </div>
  )
}
