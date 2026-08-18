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
//
// Prompt 480 — sizes bumped ~15-20% on top of the opacity/blur/saturation
// fix in index.css: a larger blob has a larger near-full-intensity core
// relative to the fixed 68px blur radius, which further helps real
// visibility without pushing opacity any higher than Brayden's own
// suggested range.
//
// Prompt 481 — real "lava lamp" motion: static positioned shapes weren't
// enough, Brayden wants the blobs to actually travel across the viewport
// and visibly fuse into one shape when they pass near each other, then
// pull apart cleanly. Two changes from Prompt 480:
//   1. Drift keyframes now translate by vw/vh (a real fraction of the
//      viewport) instead of a small percentage of each blob's own box,
//      on independent offset cycles so the paths cross mid-cycle.
//   2. The classic SVG goo filter (feGaussianBlur -> high-contrast
//      feColorMatrix on the alpha channel) replaces the plain CSS blur.
//      This has to be applied to the *group* wrapping all three blobs,
//      not to each blob individually — the filter rasterizes whatever
//      it's applied to as one bitmap first, so only a shared parent
//      filter lets two overlapping blobs' alpha actually combine and
//      cross the matrix's contrast threshold together. Per-element
//      filters would just blur each blob in isolation and never merge.
//      The <filter> itself lives in an inline, zero-size SVG here
//      (not display:none — Safari drops filters referenced from a
//      display:none source) so `filter: url(#ambient-goo)` on the
//      blob-group div can find it.
export default function AmbientGlow() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <svg className="absolute h-0 w-0">
        <defs>
          <filter id="ambient-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="34" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 24 -10"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div className="ambient-goo-group h-full w-full">
        <div
          className="ambient-blob ambient-blob-a h-[34rem] w-[34rem] -left-32 top-[6%]"
          style={{ background: 'radial-gradient(circle, var(--accent-bright), rgba(0,0,0,0) 70%)' }}
        />
        <div
          className="ambient-blob ambient-blob-b h-[40rem] w-[40rem] -right-40 top-[40%]"
          style={{ background: 'radial-gradient(circle, var(--accent), rgba(0,0,0,0) 70%)' }}
        />
        <div
          className="ambient-blob ambient-blob-c h-[30rem] w-[30rem] left-[18%] -bottom-24"
          style={{ background: 'radial-gradient(circle, var(--accent-deep), rgba(0,0,0,0) 70%)' }}
        />
      </div>
    </div>
  )
}
