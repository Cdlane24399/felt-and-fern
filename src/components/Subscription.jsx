import { Reveal, Icon } from './ui.jsx'
import { subscriptions, formatPrice } from '../data/products.js'
import { useCart } from '../lib/cart.jsx'

export default function Subscription() {
  const { add } = useCart()

  return (
    <section id="subscribe" className="relative py-28 sm:py-36">
      <div className="shell grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-12">
        {/* copy */}
        <div className="lg:col-span-5">
          <Reveal>
            <span className="eyebrow">
              <span className="h-1 w-1 rounded-full bg-moss" /> Fresh Play · subscription
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 font-display text-[clamp(2rem,4.4vw,3.4rem)] font-light leading-[1.05] text-ink text-balance">
              New play, <span className="it text-bark">every season</span> — never any waste.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-7 max-w-md text-[15px] leading-relaxed text-bark/85">
              A quarterly box of fresh toys plus the replacement parts to revive the ones you have.
              Refill the catnip, swap a worn sisal panel, keep the joy — and keep it out of landfill.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <ul className="mt-8 space-y-3 text-[13.5px] text-bark/85">
              {['Skip, pause or cancel any time', 'Members save up to 15% on everything', 'Replacement parts at 85%+ less waste'].map(
                (t) => (
                  <li key={t} className="flex items-center gap-3">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-warm text-moss">
                      <Icon.Check className="text-[13px]" />
                    </span>
                    {t}
                  </li>
                ),
              )}
            </ul>
          </Reveal>
        </div>

        {/* plans */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-7">
          {subscriptions.map((s, i) => {
            const featured = s.featured
            return (
              <Reveal key={s.id} delay={i * 0.08} className="h-full">
                <div
                  className={`flex h-full flex-col rounded-[2rem] p-2 ring-1 transition-all duration-700 ease-silk ${
                    featured ? 'bg-espresso ring-espresso soft-lift-lg' : 'bg-white/50 ring-bark/10 soft-lift'
                  }`}
                >
                  <div
                    className={`flex h-full flex-col rounded-[1.6rem] px-6 py-7 ${
                      featured ? 'text-cream' : 'bg-canvas text-ink'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className={`font-display text-2xl font-light ${featured ? 'text-cream' : 'text-ink'}`}>
                        {s.name}
                      </h3>
                      {featured && <Icon.Star className="text-[14px] text-clay" />}
                    </div>
                    <p className={`mt-1 text-[11px] uppercase tracking-[0.16em] ${featured ? 'text-cream/55' : 'text-bark/55'}`}>
                      {s.cadence} · {s.save}
                    </p>

                    <div className="mt-6 flex items-end gap-1.5">
                      <span className="font-display text-5xl font-light leading-none">
                        {formatPrice(s.monthly)}
                      </span>
                      <span className={`pb-1 text-[12px] ${featured ? 'text-cream/60' : 'text-bark/60'}`}>
                        /mo
                      </span>
                    </div>
                    <p className={`mt-1.5 text-[12px] ${featured ? 'text-cream/55' : 'text-bark/55'}`}>
                      Billed {formatPrice(s.quarterly)} quarterly
                    </p>

                    <ul className="mt-6 space-y-2.5">
                      {s.perks.map((perk) => (
                        <li key={perk} className="flex items-center gap-2.5 text-[13px]">
                          <Icon.Check className={`text-[14px] ${featured ? 'text-sage' : 'text-moss'}`} />
                          <span className={featured ? 'text-cream/85' : 'text-bark/85'}>{perk}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() =>
                        add({
                          id: `sub-${s.id}`,
                          name: s.name,
                          sub: 'Quarterly subscription',
                          price: s.quarterly,
                        })
                      }
                      className={`group mt-auto inline-flex items-center justify-center gap-3 rounded-full px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.16em] transition-all duration-500 ease-silk hover:gap-4 active:scale-[0.97] ${
                        featured ? 'bg-cream text-ink' : 'bg-ink text-cream'
                      } mt-7`}
                    >
                      Start {s.name.split(' ').slice(-1)}
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
