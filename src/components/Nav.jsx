import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Icon } from './ui.jsx'
import { useCart } from '../lib/cart.jsx'

const LINKS = [
  { label: 'Shop', href: '#shop' },
  { label: 'Sets', href: '#sets' },
  { label: 'Fresh Play', href: '#subscribe' },
  { label: 'Materials', href: '#materials' },
  { label: 'Story', href: '#story' },
]

function Wordmark({ className = '', tone = 'ink' }) {
  const color = tone === 'cream' ? 'text-cream' : 'text-ink'
  return (
    <a
      href="#top"
      className={`flex items-center gap-2.5 transition-colors duration-500 ${color} ${className}`}
      aria-label="Felt & Fern home"
    >
      <svg viewBox="0 0 72 72" className="h-7 w-auto" fill="none" aria-hidden>
        <circle cx="36" cy="36" r="31" stroke="currentColor" strokeWidth="3" />
        <path
          d="M23 48V22h17M23 35h14M44 50V22M44 35c8 0 13-4 14-11"
          stroke="currentColor"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M50 27c5 1 9 5 10 10-6 0-10-4-10-10Z"
          fill="currentColor"
        />
      </svg>
      <span className="text-[13px] font-semibold uppercase tracking-[0.24em]">Felt &amp; Fern</span>
    </a>
  )
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { count, openCart, pulse } = useCart()
  const { scrollY } = useScroll()
  const scrolledRef = useRef(false)

  useMotionValueEvent(scrollY, 'change', (y) => {
    const next = y > 40
    if (scrolledRef.current === next) return
    scrolledRef.current = next
    setScrolled(next)
  })

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      >
        <motion.nav
          animate={{
            backgroundColor: scrolled ? 'rgba(247,243,236,0.82)' : 'rgba(247,243,236,0)',
            boxShadow: scrolled
              ? '0 16px 40px -24px rgba(43,33,24,0.4)'
              : '0 0 0 rgba(0,0,0,0)',
            marginTop: scrolled ? 14 : 22,
            width: scrolled ? 'min(980px, 94vw)' : 'min(1320px, 96vw)',
          }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={`flex items-center justify-between gap-4 rounded-full px-4 py-2.5 pl-6 ring-1 backdrop-blur-xl ${
            scrolled ? 'ring-bark/12' : 'ring-transparent'
          }`}
          style={{ willChange: 'width, margin, background-color' }}
        >
          <Wordmark tone={scrolled ? 'ink' : 'cream'} />

          <div className="hidden items-center gap-8 md:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`line-draw text-[12px] font-medium transition-colors duration-500 ${
                  scrolled ? 'text-bark/90 hover:text-ink' : 'text-cream/85 hover:text-cream'
                }`}
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <motion.button
              onClick={openCart}
              whileTap={{ scale: 0.94 }}
              className={`group relative flex items-center gap-2 rounded-full px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] soft-lift transition-colors duration-500 ${
                scrolled ? 'bg-ink text-cream' : 'bg-cream text-ink'
              }`}
            >
              <Icon.Bag className="text-[16px]" />
              <span className="hidden sm:inline">Cart</span>
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key={count + '-' + pulse}
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.4, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 22 }}
                    className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px] font-bold ${
                      scrolled ? 'bg-cream text-ink' : 'bg-ink text-cream'
                    }`}
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            <button
              onClick={() => setMenuOpen(true)}
              className={`flex h-10 w-10 items-center justify-center rounded-full ring-1 backdrop-blur-md transition-colors duration-500 md:hidden ${
                scrolled ? 'bg-white/60 ring-bark/15' : 'bg-cream/15 ring-cream/25'
              }`}
              aria-label="Open menu"
            >
              <span className="relative block h-3 w-4">
                <span className={`absolute left-0 top-0 h-px w-full ${scrolled ? 'bg-ink' : 'bg-cream'}`} />
                <span className={`absolute left-0 top-1.5 h-px w-full ${scrolled ? 'bg-ink' : 'bg-cream'}`} />
                <span className={`absolute left-0 top-3 h-px w-full ${scrolled ? 'bg-ink' : 'bg-cream'}`} />
              </span>
            </button>
          </div>
        </motion.nav>
      </motion.header>

      {/* Mobile full-screen glass menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[70] flex flex-col bg-cream/85 backdrop-blur-3xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between px-6 pt-8">
              <Wordmark />
              <button
                onClick={() => setMenuOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-cream"
                aria-label="Close menu"
              >
                <span className="relative block h-4 w-4">
                  <span className="absolute left-0 top-1/2 h-px w-full rotate-45 bg-cream" />
                  <span className="absolute left-0 top-1/2 h-px w-full -rotate-45 bg-cream" />
                </span>
              </button>
            </div>
            <nav className="flex flex-1 flex-col justify-center gap-2 px-8">
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ delay: 0.12 + i * 0.07, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="font-display text-5xl font-light tracking-tight text-ink"
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>
            <div className="px-8 pb-12 text-[11px] uppercase tracking-eyebrow text-bark/70">
              Design-led play · made for cats
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
