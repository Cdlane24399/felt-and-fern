import { Reveal, Button, Icon, Bezel } from './ui.jsx'
import { products, formatPrice } from '../data/products.js'
import { useCart } from '../lib/cart.jsx'

const arc = products.find((p) => p.id === 'arc')

export default function Spotlight() {
  const { add } = useCart()

  return (
    <section className="relative overflow-hidden bg-espresso py-24 text-cream sm:py-32">
      {/* glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-[60vw] w-[60vw] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(200,180,154,0.18),transparent_60%)] blur-3xl" />
      </div>

      <div className="shell relative grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* 3D model */}
        <Reveal>
          <div className="relative">
            <div className="rounded-[2.4rem] bg-cream/5 p-2 ring-1 ring-cream/10">
              <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-[radial-gradient(circle_at_50%_40%,#3a2d20,#241a12)]">
                <model-viewer
                  src={arc.model}
                  alt="Interactive 3D model of The Arc cat scratcher"
                  camera-controls
                  auto-rotate
                  auto-rotate-delay="0"
                  rotation-per-second="18deg"
                  interaction-prompt="none"
                  shadow-intensity="1.1"
                  shadow-softness="1"
                  exposure="1.05"
                  camera-orbit="35deg 78deg 4.2m"
                  field-of-view="30deg"
                  style={{ width: '100%', height: '100%' }}
                />
                <div className="pointer-events-none absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-ink/40 px-4 py-2 text-[10px] uppercase tracking-[0.18em] text-cream/80 backdrop-blur-md">
                  <Icon.Rotate className="text-[14px]" /> Drag to explore
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* copy */}
        <div>
          <Reveal>
            <span className="eyebrow text-clay">
              <span className="h-1 w-1 rounded-full bg-clay" /> Flagship · Furniture
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 font-display text-[clamp(2.4rem,5vw,4.2rem)] font-light leading-[0.98]">
              The Arc
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-3 font-display text-xl font-light italic text-clay">{arc.tagline}</p>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-cream/75">{arc.blurb}</p>
          </Reveal>

          <Reveal delay={0.22}>
            <ul className="mt-8 flex flex-wrap gap-2">
              {arc.materials.map((m) => (
                <li
                  key={m}
                  className="rounded-full bg-cream/8 px-4 py-1.5 text-[11px] uppercase tracking-[0.12em] text-cream/80 ring-1 ring-cream/10"
                >
                  {m}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.28}>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <button
                onClick={() =>
                  add({ id: arc.id, name: arc.code, sub: arc.name, price: arc.price, image: arc.image })
                }
                className="group inline-flex items-center gap-3 rounded-full bg-cream px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink transition-all duration-500 ease-silk hover:gap-4 active:scale-[0.97]"
              >
                Add to cart — {formatPrice(arc.price)}
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink/10 transition-all duration-500 ease-silk group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105">
                  <Icon.Bag className="text-[15px]" />
                </span>
              </button>
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-cream/55">
                <Icon.Check className="text-[15px] text-sage" /> CAD-engineered · verified
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
