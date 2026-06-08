import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Reveal, Icon } from './ui.jsx'
import LazyModelViewer from './LazyModelViewer.jsx'
import { products, modelLoaders, formatPrice } from '../data/products.js'
import { useCartActions } from '../lib/cart.jsx'

const modeled = products.filter((p) => p.model)

const ORBIT = {
  arc: '35deg 78deg 4.2m',
  burrow: '30deg 80deg 3.4m',
  prey: '25deg 75deg 2.6m',
}

export default function ModelGallery() {
  const [active, setActive] = useState('prey')
  const { add } = useCartActions()
  const p = modeled.find((m) => m.id === active)

  return (
    <section className="relative overflow-hidden py-28 sm:py-32">
      <div className="shell">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="eyebrow justify-center">
              <span className="h-1 w-1 rounded-full bg-moss" /> Turn it over
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 font-display text-[clamp(2rem,4.6vw,3.4rem)] font-light leading-[1.04] text-ink text-balance">
              See every angle, in <span className="it text-bark">three dimensions</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-md text-[14px] leading-relaxed text-bark/75">
              Real product models — drag, spin and zoom each piece the way it sits in your room
              before you ever add it to cart.
            </p>
          </Reveal>
        </div>

        {/* tabs */}
        <Reveal delay={0.12}>
          <div className="mx-auto mt-12 flex w-max max-w-full items-center gap-1 rounded-full bg-white/50 p-1.5 ring-1 ring-bark/10 soft-lift">
            {modeled.map((m) => (
              <button
                key={m.id}
                onClick={() => setActive(m.id)}
                className={`relative rounded-full px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors duration-300 ${
                  active === m.id ? 'text-cream' : 'text-bark/70 hover:text-ink'
                }`}
              >
                {active === m.id && (
                  <motion.span
                    layoutId="model-pill"
                    className="absolute inset-0 rounded-full bg-ink"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{m.code}</span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* viewer */}
        <Reveal delay={0.1}>
          <div className="relative mx-auto mt-12 max-w-4xl">
            <div className="rounded-[2.6rem] bg-white/45 p-2 ring-1 ring-bark/10 soft-lift-lg">
              <div className="relative aspect-[16/11] overflow-hidden rounded-[2.2rem] bg-[radial-gradient(circle_at_50%_35%,#fbf8f2,#e8dfd1)] sm:aspect-[16/9]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <LazyModelViewer
                      srcLoader={modelLoaders[p.model]}
                      alt={`Interactive 3D model of ${p.name}`}
                      camera-controls
                      auto-rotate
                      auto-rotate-delay="3000"
                      rotation-per-second="16deg"
                      interaction-prompt="none"
                      shadow-intensity="1"
                      shadow-softness="1.2"
                      exposure="1.1"
                      camera-orbit={ORBIT[active]}
                      field-of-view="30deg"
                      style={{ width: '100%', height: '100%' }}
                    >
                      <div className="flex h-full w-full items-center justify-center text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-bark/50">
                        Loading 3D view
                      </div>
                    </LazyModelViewer>
                  </motion.div>
                </AnimatePresence>

                <div className="pointer-events-none absolute left-1/2 top-5 flex -translate-x-1/2 items-center gap-2 rounded-full bg-cream/80 px-4 py-2 text-[10px] uppercase tracking-[0.18em] text-bark/75 ring-1 ring-white/50 backdrop-blur-md">
                  <Icon.Rotate className="text-[14px]" /> Drag to rotate · scroll to zoom
                </div>

                {/* info card */}
                <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-center justify-between gap-4 rounded-[1.4rem] bg-cream/85 px-5 py-4 ring-1 ring-white/50 backdrop-blur-md sm:left-5 sm:right-auto sm:max-w-sm">
                  <div>
                    <div className="font-display text-2xl font-light text-ink">{p.code}</div>
                    <div className="text-[11px] uppercase tracking-[0.14em] text-bark/60">
                      {p.name} · {formatPrice(p.price)}
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      add({ id: p.id, name: p.code, sub: p.name, price: p.price, image: p.image })
                    }
                    className="group flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-cream transition-all duration-500 ease-silk hover:gap-3 active:scale-95"
                  >
                    Add
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cream/15 transition-transform duration-500 group-hover:translate-x-0.5">
                      <Icon.Bag className="text-[12px]" />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
