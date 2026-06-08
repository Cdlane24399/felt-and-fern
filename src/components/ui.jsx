import { motion } from 'framer-motion'

/* ---------------------------------------------------------------- icons
   Ultra-light, precise line icons (≈1px stroke), Phosphor-light spirit. */
const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.25,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export const Icon = {
  ArrowUR: (p) => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...p}>
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  ),
  Bag: (p) => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...p}>
      <path d="M6 8h12l-1 12H7L6 8Z" />
      <path d="M9 8a3 3 0 0 1 6 0" />
    </svg>
  ),
  Plus: (p) => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...p}>
      <path d="M12 6v12M6 12h12" />
    </svg>
  ),
  Minus: (p) => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...p}>
      <path d="M6 12h12" />
    </svg>
  ),
  Close: (p) => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...p}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  ),
  Leaf: (p) => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...p}>
      <path d="M5 19C5 11 11 5 19 5c0 8-6 14-14 14Z" />
      <path d="M5 19C8 14 12 11 16 9" />
    </svg>
  ),
  Recycle: (p) => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...p}>
      <path d="M8 5 6 8l3 1M16 5l2 3-3 1M9 18l-3-1 1-3M15 18l3-1-1-3" />
      <path d="M12 4v4M5.5 14.5 8 11M18.5 14.5 16 11" />
    </svg>
  ),
  Paw: (p) => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...p}>
      <circle cx="7.5" cy="9.5" r="1.6" />
      <circle cx="12" cy="7.5" r="1.6" />
      <circle cx="16.5" cy="9.5" r="1.6" />
      <path d="M12 12c-3 0-5 2-5 4.2C7 18 9 18.5 12 18.5s5-.5 5-2.3C17 14 15 12 12 12Z" />
    </svg>
  ),
  Check: (p) => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...p}>
      <path d="m5 12.5 4.5 4.5L19 7" />
    </svg>
  ),
  Star: (p) => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" stroke="none" {...p}>
      <path d="M12 3.5l2.4 5 5.6.7-4.1 3.8 1.1 5.5L12 16.9 6.9 18.5 8 13 3.9 9.2l5.6-.7Z" />
    </svg>
  ),
  Play: (p) => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...p}>
      <path d="M9 7.5v9l7-4.5-7-4.5Z" />
    </svg>
  ),
  Rotate: (p) => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...p}>
      <path d="M4 12a8 8 0 0 1 13.7-5.6M20 12A8 8 0 0 1 6.3 17.6" />
      <path d="M18 3v3.5h-3.5M6 21v-3.5h3.5" />
    </svg>
  ),
  Truck: (p) => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...p}>
      <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z" />
      <circle cx="7" cy="18" r="1.6" />
      <circle cx="17.5" cy="18" r="1.6" />
    </svg>
  ),
  Shield: (p) => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" {...base} {...p}>
      <path d="M12 3 19 6v6c0 4-3 7-7 9-4-2-7-5-7-9V6l7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
}

/* ------------------------------------------------------------- Reveal
   Heavy fade-up + de-blur on enter, gated by viewport. */
export function Reveal({ children, delay = 0, y = 28, className = '', as = 'div' }) {
  const M = motion[as] || motion.div
  return (
    <M
      className={className}
      initial={{ opacity: 0, y, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-12% 0px -12% 0px' }}
      transition={{ duration: 0.95, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </M>
  )
}

/* ----------------------------------------------------- Button (island) */
export function Button({
  children,
  variant = 'primary',
  icon = true,
  as = 'button',
  className = '',
  ...rest
}) {
  const Comp = motion[as] || motion.button
  const palette =
    variant === 'primary'
      ? 'bg-ink text-cream'
      : variant === 'ghost'
        ? 'bg-white/60 text-ink ring-1 ring-bark/15 backdrop-blur-md'
        : 'bg-espresso text-cream'
  return (
    <Comp
      whileTap={{ scale: 0.97 }}
      className={`group relative inline-flex items-center gap-3 rounded-full px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] transition-all duration-500 ease-silk soft-lift hover:gap-4 ${palette} ${className}`}
      {...rest}
    >
      <span className="translate-y-[0.5px]">{children}</span>
      {icon && (
        <span
          className={`flex h-7 w-7 items-center justify-center rounded-full text-[15px] transition-all duration-500 ease-silk group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105 ${
            variant === 'ghost' ? 'bg-ink/10 text-ink' : 'bg-cream/15 text-cream'
          }`}
        >
          <Icon.ArrowUR />
        </span>
      )}
    </Comp>
  )
}

/* ------------------------------------------------- Double-bezel shell */
export function Bezel({ children, className = '', radius = '2rem', pad = 'p-2' }) {
  return (
    <div
      className={`bg-white/40 ring-1 ring-bark/10 ${pad} soft-lift ${className}`}
      style={{ borderRadius: radius }}
    >
      <div
        className="inset-highlight h-full w-full overflow-hidden bg-warm"
        style={{ borderRadius: `calc(${radius} - 0.5rem)` }}
      >
        {children}
      </div>
    </div>
  )
}
