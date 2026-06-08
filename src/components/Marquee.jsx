import { Icon } from './ui.jsx'

const ITEMS = [
  'Organic cotton',
  'FSC-certified birch',
  'Natural sisal',
  'Recycled felt',
  'Non-toxic dyes',
  'Refillable & repairable',
  'Plastic-free packaging',
  'Designed in studio',
]

function Row() {
  return (
    <div className="marquee-track flex shrink-0 items-center gap-10 pr-10">
      {ITEMS.map((t) => (
        <span key={t} className="flex items-center gap-10 whitespace-nowrap">
          <span className="font-display text-2xl font-light italic text-bark/80 sm:text-3xl">
            {t}
          </span>
          <Icon.Paw className="text-[18px] text-clay" />
        </span>
      ))}
    </div>
  )
}

export default function Marquee() {
  return (
    <section aria-hidden className="relative overflow-hidden border-y border-bark/10 bg-canvas py-7">
      <div className="flex w-max">
        <Row />
        <Row />
      </div>
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-canvas to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-canvas to-transparent" />
    </section>
  )
}
