import { Reveal, Icon } from './ui.jsx'
import { sets, formatPrice } from '../data/products.js'
import { useCartActions } from '../lib/cart.jsx'

export default function Sets() {
  const { add } = useCartActions()

  return (
    <section id="sets" className="relative bg-canvas py-28 sm:py-36">
      <div className="shell">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="eyebrow justify-center">
              <span className="h-1 w-1 rounded-full bg-moss" /> Curated sets
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 font-display text-[clamp(2rem,4.6vw,3.4rem)] font-light leading-[1.04] text-ink text-balance">
              Give the whole <span className="it text-bark">experience</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-md text-[14px] leading-relaxed text-bark/75">
              Three considered bundles — gift-ready and priced to be the obvious choice.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-3">
          {sets.map((s, i) => {
            const featured = s.featured
            return (
              <Reveal key={s.id} delay={i * 0.08}>
                <div
                  className={`relative flex h-full flex-col rounded-[2rem] p-2 ring-1 transition-all duration-700 ease-silk ${
                    featured
                      ? 'bg-espresso ring-espresso soft-lift-lg md:-translate-y-4'
                      : 'bg-white/50 ring-bark/10 soft-lift'
                  }`}
                >
                  <div
                    className={`flex h-full flex-col rounded-[1.6rem] px-7 py-8 ${
                      featured ? 'text-cream' : 'bg-canvas text-ink'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] ${
                          featured
                            ? 'bg-cream/15 text-cream'
                            : 'bg-warm text-bark'
                        }`}
                      >
                        {s.tier}
                      </span>
                      {featured && (
                        <span className="flex items-center gap-1 text-[10px] uppercase tracking-[0.14em] text-clay">
                          <Icon.Star className="text-[12px]" /> Most loved
                        </span>
                      )}
                    </div>

                    <h3
                      className={`mt-6 font-display text-3xl font-light leading-tight ${
                        featured ? 'text-cream' : 'text-ink'
                      }`}
                    >
                      {s.name}
                    </h3>
                    <div className="mt-3 flex items-end gap-1">
                      <span className="font-display text-4xl font-light">{formatPrice(s.price)}</span>
                    </div>
                    <p className={`mt-4 text-[13.5px] leading-relaxed ${featured ? 'text-cream/75' : 'text-bark/80'}`}>
                      {s.desc}
                    </p>

                    <ul className="mt-7 space-y-3">
                      {s.includes.map((inc) => (
                        <li key={inc} className="flex items-center gap-3 text-[13px]">
                          <span
                            className={`flex h-5 w-5 items-center justify-center rounded-full ${
                              featured ? 'bg-cream/15 text-sage' : 'bg-warm text-moss'
                            }`}
                          >
                            <Icon.Check className="text-[13px]" />
                          </span>
                          <span className={featured ? 'text-cream/85' : 'text-bark/85'}>{inc}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() =>
                        add({ id: s.id, name: s.name, sub: `${s.tier} set`, price: s.price })
                      }
                      className={`group mt-8 inline-flex items-center justify-center gap-3 rounded-full px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.16em] transition-all duration-500 ease-silk hover:gap-4 active:scale-[0.97] ${
                        featured ? 'bg-cream text-ink' : 'bg-ink text-cream'
                      }`}
                    >
                      Add the set
                      <span
                        className={`flex h-6 w-6 items-center justify-center rounded-full transition-transform duration-500 group-hover:translate-x-0.5 ${
                          featured ? 'bg-ink/10' : 'bg-cream/15'
                        }`}
                      >
                        <Icon.ArrowUR className="text-[13px]" />
                      </span>
                    </button>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
