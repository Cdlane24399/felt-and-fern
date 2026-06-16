// Product catalogue. Pricing and specs are drawn from the Felt & Fern launch docs:
// progress.json (the four launch SKUs) and task-1.4 pricing strategy
// (Good-Better-Best sets + Fresh Play subscription).

import arcImg from '../assets/products/the-arc.jpeg'
import burrowImg from '../assets/products/the-burrow.jpeg'
import preyImg from '../assets/products/the-prey.jpeg'
import blissImg from '../assets/products/the-bliss.jpeg'

export const modelLoaders = {
  arc: () => import('../assets/models/the-arc.glb?url'),
  burrow: () => import('../assets/models/the-burrow.glb?url'),
  prey: () => import('../assets/models/the-prey.glb?url'),
}

export const products = [
  {
    id: 'prey',
    code: 'The Prey',
    name: 'Knitted Mouse Toy',
    sku: 'FF-TOY-MOUSE-001',
    category: 'Toys',
    price: 16,
    tagline: 'Handcrafted play, naturally.',
    badge: 'Bestseller',
    blurb:
      'Hand-knit from organic cotton with a hand-spun jute tail and a refillable catnip core. Weighted to skitter the way real prey moves.',
    materials: ['Organic cotton', 'Hand-spun jute', 'Refillable catnip'],
    image: preyImg,
    model: 'prey',
    span: 'lg:col-span-7',
    tone: '#efe6d6',
  },
  {
    id: 'arc',
    code: 'The Arc',
    name: 'Wave Cat Scratcher',
    sku: 'FF-SCRATCH-ARC-001',
    category: 'Furniture',
    price: 89,
    tagline: 'Sculpture meets scratch.',
    badge: 'CAD-engineered',
    blurb:
      'A single ribbon of steam-bent FSC birch wrapped in replaceable natural sisal. Engineered as furniture first — a lounge your cat happens to love to claw.',
    materials: ['FSC birch ply', 'Natural sisal', 'Replaceable panel'],
    image: arcImg,
    model: 'arc',
    span: 'lg:col-span-5',
    tone: '#ece2d2',
  },
  {
    id: 'burrow',
    code: 'The Burrow',
    name: 'Collapsible Cat Tunnel',
    sku: 'FF-HOUSE-BURROW-001',
    category: 'Accessories',
    price: 48,
    tagline: 'A cozy hideaway for curious cats.',
    badge: 'Collapses flat',
    blurb:
      'A stonewashed linen shell lined in soft recycled felt that folds flat in seconds. Ships with a felt mouse waiting at the far end.',
    materials: ['Stonewashed linen', 'Recycled felt', 'Felt mouse incl.'],
    image: burrowImg,
    model: 'burrow',
    span: 'lg:col-span-5',
    tone: '#eee6d8',
  },
  {
    id: 'bliss',
    code: 'The Bliss',
    name: 'Organic Catnip Pouch',
    sku: 'FF-CATNIP-BLISS-001',
    category: 'Treats',
    price: 12,
    tagline: 'Pure bliss, organically grown.',
    badge: 'Single-origin',
    blurb:
      'Single-origin organic catnip, hand-filled into a kraft pouch and tied with twine. Roughly three months of joy per bag.',
    materials: ['Organic catnip', 'Kraft pouch', '~3 month supply'],
    image: blissImg,
    model: null,
    span: 'lg:col-span-7',
    tone: '#f0e8da',
  },
]

// Good-Better-Best curated sets (task-1.4 pricing strategy).
export const sets = [
  {
    id: 'minimalist-paw',
    tier: 'Good',
    name: 'The Minimalist Paw',
    price: 19.99,
    desc: 'Three core toys, thoughtfully simple. The gentlest way to meet Felt & Fern.',
    includes: ['3 core toys', 'Non-toxic materials', 'Gift-ready sleeve'],
  },
  {
    id: 'felt-fern-play',
    tier: 'Better',
    name: 'The Felt & Fern Play Set',
    price: 34.99,
    desc: 'Our flagship. Five toys and an interactive wand for solo and shared play.',
    includes: ['5 toys + 1 wand', 'Eco-friendly build', 'Enrichment guide'],
    featured: true,
  },
  {
    id: 'ultimate',
    tier: 'Best',
    name: 'The Full-Fern Experience',
    price: 49.99,
    desc: 'Everything, beautifully boxed. Seven toys, organic catnip, premium packaging.',
    includes: ['7 toys + catnip', 'Interactive toy', 'Premium gift box'],
  },
]

// Fresh Play subscription (task-1.4 recurring revenue model).
export const subscriptions = [
  {
    id: 'essentials',
    name: 'Fresh Play Essentials',
    cadence: 'Quarterly',
    monthly: 5.99,
    quarterly: 17.99,
    save: '10% off retail',
    perks: ['3 new toys each season', '1 replacement part', 'Pause or cancel anytime'],
  },
  {
    id: 'deluxe',
    name: 'Fresh Play Deluxe',
    cadence: 'Quarterly',
    monthly: 9.99,
    quarterly: 29.99,
    save: '15% off retail',
    perks: ['5 new toys each season', '2 replacement parts', 'Organic catnip refill', 'Free carbon-neutral shipping'],
    featured: true,
  },
]

export const formatPrice = (n) =>
  Number.isInteger(n) ? `$${n}` : `$${n.toFixed(2)}`
