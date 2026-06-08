// Image-to-video hero: animates a real product still into a cinematic header
// using xAI Grok Imagine Video 1.5 (image-to-video) via the Vercel AI Gateway.
// Auth: AI_GATEWAY_API_KEY or VERCEL_OIDC_TOKEN (loaded from .env).
import 'dotenv/config'
import { experimental_generateVideo as generateVideo } from 'ai'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT = path.resolve(__dirname, '../src/assets/video')
fs.mkdirSync(OUT, { recursive: true })

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

// --- config ---
const SEED = path.resolve(__dirname, 'seed/the-arc-16x9.jpg')
const OUT_FILE = path.join(OUT, 'hero-arc.mp4')
const MODEL = 'xai/grok-imagine-video-1.5-preview' // image-to-video only
const DURATION = 6

const PROMPT =
  'A luxury product film of a sculptural white-and-sisal cat scratcher resting on a white ' +
  'plinth against a soft taupe studio backdrop. Ultra-slow, smooth cinematic camera push-in ' +
  'with a gentle parallax drift, gradually revealing the curve of the form. Warm late-afternoon ' +
  'sunlight slowly rakes across the natural woven sisal and the seamless backdrop, the soft ' +
  'shadow shifting subtly beneath it. Fine dust motes drift weightlessly through the beam of ' +
  'light. The scratcher stays completely solid, rigid and still — only the camera, the light and ' +
  'the dust move. Shallow depth of field, elegant and calm, high-end editorial commercial, ' +
  'photorealistic, delicate 35mm film grain. No morphing, no warping, no distortion, no text changes.'

function dataUri(file) {
  const ext = path.extname(file).toLowerCase()
  const mime = ext === '.png' ? 'image/png' : 'image/jpeg'
  const b64 = fs.readFileSync(file).toString('base64')
  return `data:${mime};base64,${b64}`
}

async function main() {
  if (!fs.existsSync(SEED)) throw new Error(`seed image missing: ${SEED}`)
  const image = dataUri(SEED)
  console.log(`seed: ${SEED} (${(fs.statSync(SEED).size / 1024).toFixed(0)} KB) · model: ${MODEL}`)

  for (let attempt = 1; attempt <= 5; attempt++) {
    try {
      console.log(`\n[hero-arc] attempt ${attempt} …`)
      const result = await generateVideo({
        model: MODEL,
        prompt: { image, text: PROMPT },
        duration: DURATION,
        maxRetries: 0,
        providerOptions: { xai: { resolution: '720p', pollTimeoutMs: 590000 } },
      })
      const bytes = result.videos[0].uint8Array
      fs.writeFileSync(OUT_FILE, bytes)
      console.log(`[hero-arc] ✓ wrote ${OUT_FILE} (${(bytes.length / 1e6).toFixed(2)} MB)`)
      console.log(JSON.stringify({ ok: true, file: OUT_FILE, model: MODEL }, null, 2))
      return
    } catch (err) {
      const msg = String(err?.message || err)
      console.warn(`[hero-arc] ✗ ${msg}`)
      if (/quota|rate|per minute|429/i.test(msg) && attempt < 5) {
        console.log('[hero-arc] rate limited — waiting 65s …')
        await sleep(65000)
        continue
      }
      throw err
    }
  }
}

main().catch((e) => {
  console.error('FAILED:', e?.message || e)
  process.exit(1)
})
