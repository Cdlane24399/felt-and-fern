import { Reveal, Icon } from './ui.jsx'
import { products, formatPrice } from '../data/products.js'
import { useCart } from '../lib/cart.jsx'

function ProductCard({ p, i }) {
  const { add } = useCart()
  const onAdd = () =>
    add({ id: p.id, name: p.code, sub: p.name, price: p.price, image: p.image })

  return (
    <Reveal delay={i * 0.06} className={`${p.span} group`}>
      <div className="flex h-full flex-col rounded-[2rem] bg-white/45 p-2 ring-1 ring-bark/10 transition-all duration-700 ease-silk soft-lift hover:-translate-y-1 hover:shadow-[0_40px_80px_-40px_rgba(43,33,24,0.35)]">
        <div
          className="relative aspect-[5/4] overflow-hidden rounded-[1.6rem]"
          style={{ background: p.tone }}
        >
          <img
            src={p.image}
            alt={p.name}
            loading="lazy"
            className="img-zoom absolute inset-0 h-full w-full object-cover"
          />
          {/* badge */}
          {p.badge && (
            <span className="absolute left-4 top-4 rounded-full bg-cream/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-bark ring-1 ring-white/50 backdrop-blur-md">
              {p.badge}
            </span>
          )}
          {/* category */}
          <span className="absolute right-4 top-4 text-[10px] uppercase tracking-[0.18em] text-bark/55">
            {p.category}
          </span>

          {/* quick-add */}
          <button
            onClick={onAdd}
            aria-label={`Add ${p.code} to cart`}
            className="absolute bottom-4 right-4 flex h-12 w-12 translate-y-3 items-center justify-center rounded-full bg-ink text-cream opacity-0 shadow-lg transition-all duration-500 ease-silk hover:scale-105 active:scale-95 group-hover:translate-y-0 group-hover:opacity-100"
          >
            <Icon.Plus className="text-[20px]" />
          </button>
        </div>

        <div className="flex flex-1 flex-col px-4 pb-4 pt-5">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="font-display text-2xl font-light text-ink">{p.code}</h3>
            <span className="font-display text-xl font-light text-bark">{formatPrice(p.price)}</span>
          </div>
          <p className="mt-1 text-[12px] uppercase tracking-[0.12em] text-bark/55">{p.name}</p>
          <p className="mt-3 max-w-md text-[13.5px] leading-relaxed text-bark/80">{p.blurb}</p>

          <div className="mt-auto flex items-center justify-between gap-4 pt-6">
            <ul className="flex flex-wrap gap-1.5">
              {p.materials.slice(0, 3).map((m) => (
                <li
                  key={m}
                  className="rounded-full bg-warm px-2.5 py-1 text-[10px] uppercase tracking-[0.1em] text-bark/70"
                >
                  {m}
                </li>
              ))}
            </ul>
            <button
              onClick={onAdd}
              className="group/btn flex shrink-0 items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-cream transition-all duration-500 ease-silk hover:gap-3 active:scale-95"
            >
              Add
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cream/15 transition-transform duration-500 ease-silk group-hover/btn:translate-x-0.5">
                <Icon.ArrowUR className="text-[12px]" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </Reveal>
  )
}

export default function Collection() {
  return (
    <section id="shop" className="relative py-28 sm:py-36">
      <div className="shell">
        <div className="flex flex-col items-start justify-between gap-6 pb-14 sm:flex-row sm:items-end">
          <div>
            <Reveal>
              <span className="eyebrow">
                <span className="h-1 w-1 rounded-full bg-moss" /> The collection
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4.6vw,3.6rem)] font-light leading-[1.02] text-ink text-balance">
                Four objects, <span className="it text-bark">obsessively</span> made.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-xs text-[14px] leading-relaxed text-bark/75">
              Our debut line — a toy, a scratcher, a hideaway and a treat. Each engineered to a
              tech-pack and priced to live with.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          {products.map((p, i) => (
            <ProductCard key={p.id} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
