export interface BlogPost {
  readonly slug: string;
  readonly title: string;
  readonly date: string;
  readonly excerpt: string;
  readonly content: string;
}

export const blogPosts: readonly BlogPost[] = [
  {
    slug: "why-natural-materials-matter",
    title: "Why Natural Materials Matter for Your Cat",
    date: "2026-02-15",
    excerpt:
      "Discover why we choose organic cotton, linen, and sisal for every PURRFECT product \u2014 and why your cat will thank you.",
    content: `When we set out to create PURRFECT, one principle guided every decision: if it touches your cat, it should be made from materials you'd trust against your own skin.

Most mass-produced cat toys rely on synthetic fabrics, chemical dyes, and plastic fillers. Cats groom themselves constantly, meaning whatever is on their toys ends up in their bodies. We took a different path.

![Collapsible Cat Tunnel made of Natural Linen](/images/products/cat-tunnel.png)

> "A cat's environment is their whole world. By bringing natural textures indoors, we help bridge the gap between their wild instincts and domestic comfort."

## Our Material Philosophy

Every PURRFECT product starts with raw, natural materials:

**Organic Cotton** \u2014 Grown without pesticides or synthetic fertilizers. Soft, durable, and safe if your cat decides to chew on it (they will).

**Natural Linen** \u2014 One of the strongest natural fibers available. Our cat tunnels use unbleached linen that actually gets softer with age.

**Sisal Rope** \u2014 Harvested from agave plants, sisal provides the perfect texture for scratching. It's biodegradable and incredibly durable.

**Birch Plywood** \u2014 FSC-certified, sustainably harvested. We use water-based, non-toxic finishes that are safe for curious tongues.

## The Sustainability Angle

Natural materials aren't just better for your cat \u2014 they're better for the planet. Every PURRFECT product is designed to biodegrade at end of life, unlike plastic alternatives that persist for centuries.

- Reduces microplastic pollution in our oceans
- Supports sustainable farming practices
- Ensures safe end-of-life disposal

We believe that caring for your cat and caring for the environment shouldn't be mutually exclusive.`,
  },
  {
    slug: "designing-the-wave-scratcher",
    title: "Designing the Wave: Form Meets Function",
    date: "2026-01-28",
    excerpt:
      "The story behind our bestselling Wave Cat Scratcher \u2014 how Scandinavian design principles shaped a product cats actually use.",
    content: `The Wave Cat Scratcher started as a simple question: why do most cat scratchers look like they belong in a garage?

Cat furniture has a reputation for being an eyesore. We wanted to create something that cat owners would be proud to display \u2014 something that looks like a piece of modern sculpture but functions as the perfect scratching surface.

![The Wave Cat Scratcher](/images/products/wave-scratcher.png)

## The Design Process

We studied how cats scratch. They need a stable surface, the right angle, and a texture that satisfies their natural instinct to mark and stretch. Most scratchers get one of these right. We wanted all three.

> "We didn't just want to make a scratcher that looked good. We wanted to make one that cats actually preferred over the couch."

The wave form emerged from dozens of prototypes. The curve follows a natural ergonomic line that lets cats stretch fully while scratching. The weighted birch plywood base keeps it planted, even with the most enthusiastic scratching sessions.

## Material Selection

We tested over fifteen different rope types before settling on premium sisal. It provides the perfect resistance \u2014 firm enough to satisfy the scratching urge, but with enough give to be gentle on claws.

The birch plywood body is finished with a water-based sealant that protects against moisture without introducing harmful chemicals. Every piece is hand-sanded for a smooth finish.

## The Result

A scratcher that cats love and humans don't need to hide when guests come over. That's the PURRFECT philosophy in action.`,
  },
  {
    slug: "understanding-catnip",
    title: "The Science of Catnip: What Every Cat Owner Should Know",
    date: "2026-01-10",
    excerpt:
      "Not all catnip is created equal. Learn what makes organic catnip different and how to use it responsibly.",
    content: `If you've ever watched a cat encounter catnip for the first time, you know it's something special. But what exactly is happening, and does the quality of catnip matter?

![Organic Catnip Pouch](/images/products/catnip-pouch.png)

## What Is Catnip?

Catnip (Nepeta cataria) is a member of the mint family. The active compound, nepetalactone, triggers a response in about 50-70% of cats. It's completely safe and non-addictive.

When a cat encounters nepetalactone, it binds to receptors in the nose that stimulate sensory neurons. The result is a temporary euphoric state that typically lasts 10-15 minutes, after which cats become temporarily immune to its effects for about 30 minutes.

> "Think of catnip as a sensory enrichment tool rather than just a treat. It encourages play, exercise, and mental stimulation."

## Why Organic Matters

Conventionally grown catnip often contains pesticide residues. Since cats interact with catnip by rubbing their faces in it, chewing it, and rolling in it, these residues have direct contact with their eyes, mouths, and skin.

Our organic catnip is:
- Grown without synthetic pesticides or fertilizers
- Harvested at peak potency for maximum nepetalactone content
- Air-dried to preserve essential oils
- Packaged in resealable kraft pouches to maintain freshness

![Knitted Mouse Toy](/images/products/mouse-toy.png)

## How to Use Catnip

A little goes a long way. Sprinkle a small pinch on scratchers, toys, or bedding. For our Knitted Mouse Toy, simply rub a bit into the fabric. Store the pouch sealed in a cool, dark place for maximum shelf life.

The best part? Watching your cat's pure joy. That never gets old.`,
  },
] as const;

export const getBlogPostBySlug = (slug: string): BlogPost | undefined =>
  blogPosts.find((p) => p.slug === slug);
