import { Reveal, Icon } from './ui.jsx'
import preyImg from '../assets/products/the-prey.jpeg'

export default function Story() {
  return (
    <section id="story" className="relative overflow-hidden py-28 sm:py-36">
      <div className="shell grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
        {/* left — statement */}
        <div className="lg:col-span-8">
          <Reveal>
            <span className="eyebrow">
              <span className="h-1 w-1 rounded-full bg-moss" /> Our philosophy
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 max-w-3xl font-display text-[clamp(1.9rem,4.4vw,3.5rem)] font-light leading-[1.08] text-ink text-balance">
              We make play that earns a place in your home — built around{' '}
              <span className="it text-bark">feline instinct</span>, finished with the calm of
              good design.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-8 max-w-xl text-[15px] leading-relaxed text-bark/85">
              For design-conscious cat owners who see their pets as family, Felt &amp; Fern is the
              modern cat brand delivering minimalist, enrichment-focused play that looks as good on
              your floor as it feels under their paws. Every object is engineered around how cats
              actually move, crafted from sustainable materials, and made to be refilled and
              repaired rather than replaced.
            </p>
          </Reveal>

          <div className="mt-12 grid max-w-xl grid-cols-1 gap-px overflow-hidden rounded-[1.5rem] bg-bark/10 ring-1 ring-bark/10 sm:grid-cols-3">
            {[
              { icon: <Icon.Leaf />, k: 'Natural', v: 'Materials you can name' },
              { icon: <Icon.Recycle />, k: 'Circular', v: 'Refillable by design' },
              { icon: <Icon.Paw />, k: 'Tested', v: 'By cats, for cats' },
            ].map((c, i) => (
              <Reveal key={c.k} delay={0.1 + i * 0.08}>
                <div className="h-full bg-canvas px-6 py-7">
                  <div className="text-2xl text-moss">{c.icon}</div>
                  <div className="mt-4 text-[11px] uppercase tracking-[0.18em] text-bark/60">
                    {c.k}
                  </div>
                  <div className="mt-1 text-[13px] font-medium text-ink">{c.v}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* right — z-axis stacked imagery */}
        <div className="relative lg:col-span-4">
          <Reveal delay={0.15} className="relative">
            <div className="relative ml-auto w-[78%] rotate-[2.5deg] rounded-[1.8rem] bg-white/50 p-2 ring-1 ring-bark/10 soft-lift lg:w-full">
              <div className="overflow-hidden rounded-[1.4rem]">
                <img
                  src={preyImg}
                  alt="The Prey knitted mouse"
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
            </div>
            <div className="absolute -bottom-8 -left-2 w-[58%] -rotate-3 rounded-[1.4rem] bg-espresso p-5 text-cream soft-lift-lg lg:-left-10">
              <div className="font-display text-4xl font-light">01</div>
              <p className="mt-2 text-[12px] leading-snug text-cream/80">
                Designs distilled from a 25-concept gallery to a focused, four-piece debut.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
