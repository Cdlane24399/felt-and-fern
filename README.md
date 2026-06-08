# PURRFECT — Storefront (Demo)

A high-end, customer-facing demo storefront for **PURRFECT**, the minimalist cat-toy brand.
Built to show off the four launch products with an AI-generated hero film, interactive 3D models,
and a working (mock) cart — using real pricing pulled from the internal docs.

> This is a first-version demo. Cart + checkout are mocked client-side (no payment is taken).

## Highlights

- **AI-generated hero video** — a full-bleed cinematic header. `src/assets/video/hero-arc.mp4` is
  an **image-to-video** clip: a real product still (The Arc, `scripts/seed/the-arc-16x9.jpg`)
  animated with a slow push-in via **xAI Grok Imagine Video 1.5** (`scripts/gen-hero-i2v.mjs`)
  through the **Vercel AI Gateway**. An ambient text-to-video alternate lives in
  `scripts/gen-video.mjs` → `hero-ambient.mp4`.
- **Interactive 3D** — real product models (`<model-viewer>`) you can drag, spin and zoom
  (The Prey, The Arc, The Burrow) in the Spotlight + 3D gallery sections.
- **Editorial-luxury design system** — Fraunces (display) + Plus Jakarta Sans (UI), warm
  cream/espresso palette, double-bezel cards, button-in-button CTAs, film-grain overlay,
  spring-physics motion, and scroll-reveal choreography (Framer Motion).
- **Working mock cart** — add/remove, quantity steppers, free-shipping progress, localStorage
  persistence, slide-in drawer, and an animated checkout success state.
- **Real pricing from the docs** — the four SKUs (`progress.json`), the Good-Better-Best
  curated sets, and the Fresh Play subscription tiers (`task-1.4-pricing-strategy`).

## Stack

React 18 · Vite 6 · Tailwind CSS 3 · Framer Motion · `@google/model-viewer`

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
```

## Regenerate the hero video

Auth uses the Vercel AI Gateway via `AI_GATEWAY_API_KEY` or `VERCEL_OIDC_TOKEN` (pulled into
`.env`, gitignored). Video generation needs gateway credits.

```bash
node scripts/gen-hero-i2v.mjs            # the hero: image-to-video from a product still
node scripts/gen-video.mjs hero-ambient  # alternate: ambient text-to-video scene
```

Image-to-video takes the seed image as a base64 **data URI** (`prompt: { image, text }`) — no
hosting needed. Inspect a result with ffmpeg/Python: `ffprobe` for metadata, frame extraction +
numpy frame-diffs to confirm smooth motion and no warping.

Notes from building this:
- `xai/grok-imagine-video-1.5-preview` is **image-to-video only** (no text-to-video) — used for the hero.
- `xai/grok-imagine-video` supports text-to-video — used for the ambient alternate.
- Below a $100 gateway balance, video is rate-limited to **1 request/minute** — scripts disable
  SDK retries and wait out 429s.

## Assets

- Product photography + 3D GLBs are sourced from the parent project
  (`../progress-app/src/assets`, `../3d-assets`) and copied into `src/assets/`.
- Logo: the "P with cat ear + tail" mark from the PURRFECT design system.

## Structure

```
src/
  App.jsx                 # page composition
  components/
    Nav.jsx               # fluid-island nav + mobile glass menu
    Hero.jsx              # AI video hero with parallax
    Marquee.jsx           # materials marquee
    Story.jsx             # brand philosophy / positioning
    Spotlight.jsx         # The Arc, interactive 3D, on espresso
    Collection.jsx        # 4-SKU shoppable bento
    ModelGallery.jsx      # tabbed 3D viewer
    Sets.jsx              # Good-Better-Best tiers
    Subscription.jsx      # Fresh Play plans
    Materials.jsx         # sustainability + impact bento
    Footer.jsx            # newsletter CTA + footer
    CartDrawer.jsx        # slide-in cart + mock checkout
    ui.jsx                # icons, Reveal, Button, Bezel
  data/products.js        # catalogue + pricing (from docs)
  lib/cart.jsx            # cart context (localStorage)
scripts/gen-video.mjs     # AI Gateway video generation
```
