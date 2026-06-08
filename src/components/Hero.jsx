import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button, Icon } from './ui.jsx'
import heroVideo from '../assets/video/hero-arc.mp4'
import arcImg from '../assets/products/the-arc.jpeg'

const word = {
  hidden: { opacity: 0, y: '110%' },
  show: (i) => ({
    opacity: 1,
    y: '0%',
    transition: { duration: 1, delay: 0.45 + i * 0.09, ease: [0.22, 1, 0.36, 1] },
  }),
}

function Line({ children, i }) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span variants={word} custom={i} initial="hidden" animate="show" className="block">
        {children}
      </motion.span>
    </span>
  )
}

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-22%'])
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0])

  return (
    <section ref={ref} id="top" className="relative min-h-[100dvh] w-full overflow-hidden">
      {/* full-bleed AI-generated product film */}
      <motion.div style={{ scale: videoScale }} className="absolute inset-0">
        <video
          className="h-full w-full object-cover"
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          fetchpriority="low"
          poster={arcImg}
        />
      </motion.div>

      {/* legibility scrims — keep cream text readable over the warm film */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso/85 via-espresso/30 to-espresso/35" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-espresso/65 via-espresso/10 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-espresso/40 to-transparent" />
      {/* film grain handled globally; add a faint inner vignette */}
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_180px_60px_rgba(26,21,16,0.35)]" />

      {/* content */}
      <motion.div
        style={{ y: contentY, opacity: fade }}
        className="relative z-10 flex min-h-[100dvh] flex-col justify-end pb-16 pt-36 sm:pb-20"
      >
        <div className="shell">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6"
          >
            <span className="eyebrow text-cream/85">
              <span className="h-1 w-1 rounded-full bg-sage" />
              Modern enrichment · sustainably made
            </span>
          </motion.div>

          <h1 className="max-w-[16ch] font-display text-[clamp(2.8rem,8.2vw,7.4rem)] font-light leading-[0.95] tracking-[-0.03em] text-cream [text-shadow:0_2px_40px_rgba(26,21,16,0.45)]">
            <Line i={0}>
              Play, <span className="it text-clay">perfected</span>
            </Line>
            <Line i={1}>for the homes</Line>
            <Line i={2}>cats quietly rule.</Line>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex max-w-xl flex-col gap-7"
          >
            <p className="text-balance text-[15px] leading-relaxed text-cream/80 sm:text-base">
              Thoughtfully engineered toys, furniture &amp; treats — crafted from natural materials
              and designed to look as good in your home as they feel for your cat.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button as="a" href="#shop">Shop the collection</Button>
              <Button as="a" href="#story" variant="ghost" icon={false}>
                <span className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ink/10 text-[13px]">
                    <Icon.Play />
                  </span>
                  Our story
                </span>
              </Button>
            </div>
          </motion.div>

          {/* product caption + trust row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-cream/15 pt-6 text-[11px] uppercase tracking-[0.16em] text-cream/65"
          >
            <span className="flex items-center gap-2 text-cream/85">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sage" /> On screen · The Arc
            </span>
            <span className="flex items-center gap-2"><Icon.Truck className="text-[15px]" /> Carbon-neutral shipping</span>
            <span className="hidden items-center gap-2 sm:flex"><Icon.Shield className="text-[15px]" /> Safety-tested · ASTM F963</span>
            <span className="hidden items-center gap-2 md:flex"><Icon.Paw className="text-[15px]" /> 30-day cat-approved</span>
          </motion.div>
        </div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        style={{ opacity: fade }}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 lg:block"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-cream/30 p-1.5">
          <motion.span
            className="h-1.5 w-1 rounded-full bg-cream/70"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </motion.div>
    </section>
  )
}
