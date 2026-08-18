// Prompt 479 — Restorix's own page-wide ambient background motion.
// Brayden explicitly asked for an original idea, not a spec to follow:
// this extends the site's existing static `.glow` radial-blur blobs
// (already used in Hero/FinalCTA since Prompt 427/429) into slow,
// continuous, very subtle drift — Restorix's own accent palette
// (`--accent`/`--accent-bright`/`--accent-deep`), not Regenix's dots.
//
// `position: fixed` covering the viewport (not a tall absolutely-
// positioned element sized to document height) — this is what makes it
// run "the full length of the page": it's present at every scroll
// position rather than needing to track document height. Sits as the
// very first child of the app root (see App.jsx), painting behind every
// section — most sections here have no opaque full-width background of
// their own, so the glow shows through everywhere except inside
// individual cards/panels that do set one.
export default function AmbientGlow() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div
        className="ambient-blob ambient-blob-a h-[30rem] w-[30rem] -left-32 top-[6%]"
        style={{ background: 'radial-gradient(circle, var(--accent-bright), rgba(0,0,0,0) 70%)' }}
      />
      <div
        className="ambient-blob ambient-blob-b h-[35rem] w-[35rem] -right-40 top-[40%]"
        style={{ background: 'radial-gradient(circle, var(--accent), rgba(0,0,0,0) 70%)' }}
      />
      <div
        className="ambient-blob ambient-blob-c h-[26rem] w-[26rem] left-[18%] -bottom-24"
        style={{ background: 'radial-gradient(circle, var(--accent-deep), rgba(0,0,0,0) 70%)' }}
      />
    </div>
  )
}
