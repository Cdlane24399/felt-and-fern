import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Icon } from './ui.jsx'
import { useCart } from '../lib/cart.jsx'
import { formatPrice } from '../data/products.js'

const SHIP_THRESHOLD = 50

export default function CartDrawer() {
  const { items, subtotal, count, open, closeCart, inc, dec, remove, clear } = useCart()
  const [placed, setPlaced] = useState(false)

  const freeShip = subtotal >= SHIP_THRESHOLD
  const remaining = Math.max(0, SHIP_THRESHOLD - subtotal)
  const pct = Math.min(100, (subtotal / SHIP_THRESHOLD) * 100)

  const checkout = () => {
    setPlaced(true)
    setTimeout(() => {
      clear()
      setPlaced(false)
      closeCart()
    }, 2600)
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[80] bg-espresso/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={closeCart}
          />
          <motion.aside
            className="fixed inset-y-0 right-0 z-[90] flex w-full max-w-[440px] flex-col bg-cream shadow-[0_0_80px_-20px_rgba(43,33,24,0.5)]"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 38 }}
          >
            {/* header */}
            <div className="flex items-center justify-between border-b border-bark/10 px-6 py-5">
              <div className="flex items-center gap-2.5">
                <Icon.Bag className="text-[18px] text-ink" />
                <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-ink">
                  Your cart
                </span>
                {count > 0 && (
                  <span className="rounded-full bg-warm px-2 py-0.5 text-[11px] font-semibold text-bark">
                    {count}
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-warm text-ink transition hover:bg-sand"
                aria-label="Close cart"
              >
                <Icon.Close className="text-[18px]" />
              </button>
            </div>

            {/* free-ship progress */}
            {count > 0 && !placed && (
              <div className="border-b border-bark/10 px-6 py-4">
                <p className="text-[12px] text-bark/80">
                  {freeShip ? (
                    <span className="flex items-center gap-2 font-medium text-moss">
                      <Icon.Truck className="text-[15px]" /> You&apos;ve unlocked free carbon-neutral
                      shipping
                    </span>
                  ) : (
                    <>
                      Add <span className="font-semibold text-ink">{formatPrice(remaining)}</span> more
                      for free shipping
                    </>
                  )}
                </p>
                <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-warm">
                  <motion.div
                    className="h-full rounded-full bg-moss"
                    animate={{ width: `${pct}%` }}
                    transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.6 }}
                  />
                </div>
              </div>
            )}

            {/* body */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
              {placed ? (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex h-full flex-col items-center justify-center text-center"
                >
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                    className="flex h-20 w-20 items-center justify-center rounded-full bg-moss/15 text-moss"
                  >
                    <Icon.Check className="text-4xl" />
                  </motion.div>
                  <h3 className="mt-6 font-display text-3xl font-light text-ink">Thank you</h3>
                  <p className="mt-2 max-w-xs text-[13px] leading-relaxed text-bark/70">
                    This is a demo checkout — no payment was taken. In production, you&apos;d land on
                    a secure Stripe-powered confirmation.
                  </p>
                </motion.div>
              ) : count === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-warm text-bark/60">
                    <Icon.Bag className="text-3xl" />
                  </div>
                  <p className="mt-5 font-display text-2xl font-light text-ink">Nothing here yet</p>
                  <p className="mt-2 max-w-xs text-[13px] text-bark/65">
                    Your cart is waiting for something beautiful.
                  </p>
                  <button
                    onClick={closeCart}
                    className="mt-6 rounded-full bg-ink px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-cream"
                  >
                    Browse the collection
                  </button>
                </div>
              ) : (
                <ul className="space-y-4">
                  <AnimatePresence initial={false}>
                    {items.map((l) => (
                      <motion.li
                        key={l.id}
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="flex gap-4 overflow-hidden"
                      >
                        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-warm ring-1 ring-bark/10">
                          {l.image ? (
                            <img src={l.image} alt={l.name} className="h-full w-full object-cover" />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-bark/40">
                              <Icon.Paw className="text-2xl" />
                            </div>
                          )}
                        </div>
                        <div className="flex flex-1 flex-col">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="font-display text-lg font-light leading-tight text-ink">
                                {l.name}
                              </p>
                              <p className="text-[11px] uppercase tracking-[0.12em] text-bark/55">
                                {l.sub}
                              </p>
                            </div>
                            <button
                              onClick={() => remove(l.id)}
                              className="text-bark/40 transition hover:text-ink"
                              aria-label={`Remove ${l.name}`}
                            >
                              <Icon.Close className="text-[16px]" />
                            </button>
                          </div>
                          <div className="mt-auto flex items-center justify-between pt-2">
                            <div className="flex items-center gap-1 rounded-full bg-warm p-1">
                              <button
                                onClick={() => dec(l.id)}
                                className="flex h-7 w-7 items-center justify-center rounded-full text-ink transition hover:bg-cream"
                                aria-label="Decrease quantity"
                              >
                                <Icon.Minus className="text-[15px]" />
                              </button>
                              <span className="w-6 text-center text-[13px] font-semibold text-ink">
                                {l.qty}
                              </span>
                              <button
                                onClick={() => inc(l.id)}
                                className="flex h-7 w-7 items-center justify-center rounded-full text-ink transition hover:bg-cream"
                                aria-label="Increase quantity"
                              >
                                <Icon.Plus className="text-[15px]" />
                              </button>
                            </div>
                            <span className="font-display text-lg font-light text-ink">
                              {formatPrice(l.qty * l.price)}
                            </span>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {/* footer */}
            {count > 0 && !placed && (
              <div className="border-t border-bark/10 bg-canvas px-6 py-5">
                <div className="flex items-center justify-between text-[13px] text-bark/70">
                  <span>Subtotal</span>
                  <span className="font-display text-2xl font-light text-ink">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-bark/50">
                  Taxes calculated at checkout · {freeShip ? 'Free shipping' : 'Shipping from $4.50'}
                </p>
                <button
                  onClick={checkout}
                  className="group mt-4 flex w-full items-center justify-center gap-3 rounded-full bg-ink py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-cream transition-all duration-500 ease-silk hover:gap-4 active:scale-[0.98]"
                >
                  Checkout
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cream/15 transition-transform duration-500 group-hover:translate-x-0.5">
                    <Icon.ArrowUR className="text-[13px]" />
                  </span>
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
