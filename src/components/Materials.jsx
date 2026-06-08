import { Reveal, Icon } from './ui.jsx'
import burrowImg from '../assets/products/the-burrow.jpeg'
import blissImg from '../assets/products/the-bliss.jpeg'

export default function Materials() {
  return (
    <section id="materials" className="relative py-28 sm:py-36">
      <div className="shell">
        <div className="max-w-2xl pb-14">
          <Reveal>
            <span className="eyebrow">
              <span className="h-1 w-1 rounded-full bg-moss" /> Materials &amp; impact
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 font-display text-[clamp(2rem,4.6vw,3.4rem)] font-light leading-[1.03] text-ink text-balance">
              Made of things you can <span className="it text-bark">name</span> — and trust.
            </h2>
          </Reveal>
        </div>

        {/* bento */}
        <div className="grid auto-rows-[minmax(0,1fr)] grid-cols-1 gap-5 md:grid-cols-6">
          {/* big statement */}
          <Reveal className="md:col-span-4 md:row-span-2">
            <div className="flex h-full flex-col justify-between rounded-[2rem] bg-espresso p-2 ring-1 ring-espresso soft-lift-lg">
              <div className="flex h-full flex-col justify-between rounded-[1.6rem] bg-[radial-gradient(circle_at_20%_0%,#3a2d20,#241a12)] px-8 py-9 text-cream">
                <div className="flex items-center gap-3 text-clay">
                  <Icon.Leaf className="text-2xl" />
                  <span className="text-[11px] uppercase tracking-[0.18em]">Circular by design</span>
                </div>
                <div>
                  <p className="mt-10 max-w-lg font-display text-[clamp(1.5rem,2.6vw,2.4rem)] font-light leading-[1.12]">
                    Refillable catnip. Replaceable sisal. A tunnel that folds, not breaks. We build
                    objects to be <span className="it text-clay">kept</span>, not discarded.
                  </p>
                  <div className="mt-9 grid grid-cols-3 gap-6">
                    {[
                      ['85%+', 'less waste via refills'],
                      ['100%', 'plastic-free packaging'],
                      ['0', 'virgin plastic in play'],
                    ].map(([v, k]) => (
                      <div key={k}>
                        <div className="font-display text-3xl font-light text-cream">{v}</div>
                        <div className="mt-1 text-[11px] leading-snug text-cream/55">{k}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* image card */}
          <Reveal delay={0.06} className="md:col-span-2">
            <div className="group h-full overflow-hidden rounded-[2rem] bg-white/45 p-2 ring-1 ring-bark/10 soft-lift">
              <div className="relative h-full min-h-[180px] overflow-hidden rounded-[1.6rem]">
                <img src={burrowImg} alt="Stonewashed linen tunnel" className="img-zoom absolute inset-0 h-full w-full object-cover" />
                <div className="absolute bottom-3 left-3 rounded-full bg-cream/85 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-bark backdrop-blur-md">
                  Stonewashed linen
                </div>
              </div>
            </div>
          </Reveal>

          {/* material chips card */}
          <Reveal delay={0.1} className="md:col-span-2">
            <div className="flex h-full flex-col justify-between rounded-[2rem] bg-canvas p-8 ring-1 ring-bark/10 soft-lift">
              <Icon.Recycle className="text-2xl text-moss" />
              <ul className="mt-6 flex flex-wrap gap-2">
                {['Organic cotton', 'FSC birch', 'Natural sisal', 'Recycled felt', 'Jute', 'Kraft paper'].map(
                  (m) => (
                    <li key={m} className="rounded-full bg-warm px-3 py-1.5 text-[11px] uppercase tracking-[0.1em] text-bark/75">
                      {m}
                    </li>
                  ),
                )}
              </ul>
            </div>
          </Reveal>

          {/* market stat */}
          <Reveal delay={0.06} className="md:col-span-2">
            <div className="flex h-full flex-col justify-between rounded-[2rem] bg-sage/30 p-8 ring-1 ring-moss/20 soft-lift">
              <span className="text-[11px] uppercase tracking-[0.16em] text-moss">The opportunity</span>
              <div>
                <div className="font-display text-5xl font-light text-bark">$4.5B</div>
                <p className="mt-2 text-[12px] leading-snug text-bark/70">
                  cat-toy market by 2035 · 6.2% CAGR. We&apos;re building for the design-led 25–30%.
                </p>
              </div>
            </div>
          </Reveal>

          {/* image card 2 */}
          <Reveal delay={0.1} className="md:col-span-2">
            <div className="group h-full overflow-hidden rounded-[2rem] bg-white/45 p-2 ring-1 ring-bark/10 soft-lift">
              <div className="relative h-full min-h-[160px] overflow-hidden rounded-[1.6rem]">
                <img src={blissImg} alt="Kraft catnip pouch" className="img-zoom absolute inset-0 h-full w-full object-cover" />
                <div className="absolute bottom-3 left-3 rounded-full bg-cream/85 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-bark backdrop-blur-md">
                  Plastic-free
                </div>
              </div>
            </div>
          </Reveal>

          {/* guarantee */}
          <Reveal delay={0.14} className="md:col-span-2">
            <div className="flex h-full flex-col justify-between rounded-[2rem] bg-ink p-8 text-cream soft-lift">
              <Icon.Shield className="text-2xl text-sage" />
              <div>
                <div className="font-display text-2xl font-light">30-day, cat-approved</div>
                <p className="mt-2 text-[12px] leading-snug text-cream/60">
                  If your cat shrugs, we refund. Safety-tested to ASTM F963 &amp; EN 71.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
