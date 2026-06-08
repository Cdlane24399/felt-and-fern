import { useState } from 'react'
import { Reveal, Icon } from './ui.jsx'

function NewsletterCTA() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  const submit = (e) => {
    e.preventDefault()
    if (!email) return
    setDone(true)
  }
  return (
    <Reveal>
      <div className="relative overflow-hidden rounded-[2.6rem] bg-espresso p-2 ring-1 ring-espresso soft-lift-lg">
        <div className="relative overflow-hidden rounded-[2.2rem] bg-[radial-gradient(circle_at_50%_-20%,#3c2e21,#221912)] px-8 py-16 text-center sm:px-16 sm:py-20">
          <div className="pointer-events-none absolute -right-10 top-0 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(200,180,154,0.22),transparent_60%)] blur-2xl" />
          <span className="eyebrow justify-center text-clay">
            <span className="h-1 w-1 rounded-full bg-clay" /> Join the litter
          </span>
          <h2 className="mx-auto mt-6 max-w-2xl font-display text-[clamp(2rem,4.6vw,3.6rem)] font-light leading-[1.04] text-cream text-balance">
            Be first to the <span className="it text-clay">first sale</span>.
          </h2>
          <p className="mx-auto mt-5 max-w-md text-[14px] leading-relaxed text-cream/70">
            Early access to new drops, restocks and a member-only welcome offer. No noise — just
            beautifully made things for your cat.
          </p>

          {done ? (
            <div className="mx-auto mt-9 flex max-w-md items-center justify-center gap-3 rounded-full bg-cream/10 px-6 py-4 text-[13px] text-cream ring-1 ring-cream/15">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sage/30 text-sage">
                <Icon.Check className="text-[14px]" />
              </span>
              You&apos;re on the list — welcome to PURRFECT.
            </div>
          ) : (
            <form
              onSubmit={submit}
              className="mx-auto mt-9 flex max-w-md flex-col items-stretch gap-2 sm:flex-row"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@home.com"
                className="flex-1 rounded-full bg-cream/10 px-6 py-4 text-[14px] text-cream placeholder-cream/40 outline-none ring-1 ring-cream/15 transition focus:ring-cream/40"
              />
              <button
                type="submit"
                className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-cream px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink transition-all duration-500 ease-silk hover:gap-3.5 active:scale-[0.97]"
              >
                Notify me
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ink/10 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-px">
                  <Icon.ArrowUR className="text-[13px]" />
                </span>
              </button>
            </form>
          )}
        </div>
      </div>
    </Reveal>
  )
}

const COLS = [
  { title: 'Shop', links: ['The Prey', 'The Arc', 'The Burrow', 'The Bliss', 'Curated sets'] },
  { title: 'Fresh Play', links: ['Essentials', 'Deluxe', 'Replacement parts', 'Gift a box'] },
  { title: 'Company', links: ['Our story', 'Materials', 'Sustainability', 'Stockists'] },
  { title: 'Care', links: ['Shipping', 'Returns', '30-day guarantee', 'Contact'] },
]

export default function Footer() {
  return (
    <footer className="relative pb-10 pt-8">
      <div className="shell">
        <NewsletterCTA />

        <div className="mt-20 grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-6">
          {/* brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5">
              <svg viewBox="520 250 190 280" className="h-7 w-auto" fill="currentColor" aria-hidden>
                <path d="M540 300 L540 520 L572 520 L572 440 L620 440 C668 440 700 408 700 368 C700 328 668 296 620 296 L572 296 L572 280 L588 264 L556 264 L540 280 Z M572 328 L612 328 C644 328 668 340 668 368 C668 396 644 408 612 408 L572 408 L572 328 Z" />
                <path d="M652 296 L668 264 L700 296 C684 296 668 296 652 296 Z" />
              </svg>
              <span className="text-[14px] font-semibold uppercase tracking-[0.36em] text-ink">
                Purrfect
              </span>
            </div>
            <p className="mt-5 max-w-xs text-[13px] leading-relaxed text-bark/70">
              Minimalist, sustainably made cat toys & furniture for design-conscious homes.
              Engineered around feline instinct.
            </p>
            <div className="mt-6 flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-bark/55">
              <span className="h-1.5 w-1.5 rounded-full bg-sage" /> On the road to a first sale
            </div>
          </div>

          {COLS.map((c) => (
            <div key={c.title}>
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-bark/55">
                {c.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#shop" className="line-draw text-[13px] text-bark/85 hover:text-ink">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-bark/10 pt-8 text-[11px] uppercase tracking-[0.14em] text-bark/50 sm:flex-row">
          <span>© {2026} PURRFECT · Designed for cats</span>
          <span className="flex items-center gap-2">
            <Icon.Paw className="text-[14px]" /> A demo storefront · prices from internal docs
          </span>
        </div>
      </div>
    </footer>
  )
}
