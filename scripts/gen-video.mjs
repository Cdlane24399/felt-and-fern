// Generates the hero video(s) via the Vercel AI Gateway (xAI Grok Imagine Video).
// Auth: AI_GATEWAY_API_KEY or VERCEL_OIDC_TOKEN (loaded from .env).
import 'dotenv/config'
import { experimental_generateVideo as generateVideo } from 'ai'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT = path.resolve(__dirname, '../src/assets/video')
fs.mkdirSync(OUT, { recursive: true })

const MODELS = ['xai/grok-imagine-video-1.5-preview', 'xai/grok-imagine-video']

// Art direction: warm, editorial, calm — complements the cream product photography.
const SCENES = [
  {
    name: 'hero-ambient',
    prompt:
      'Cinematic macro film of warm morning sunlight slowly sweeping across a cream linen and pale birch-wood surface in a minimalist Scandinavian studio. Fine dust motes drift weightlessly through soft volumetric light beams, gentle shadows shift. Extremely shallow depth of field, calm, editorial, muted warm cream and oat tones, 35mm film grain, slow graceful camera drift. No text.',
  },
  {
    name: 'hero-cat',
    prompt:
      'Cinematic slow-motion footage of a calm grey tabby cat stretching and gently pawing in a sunlit minimalist living room with cream walls, pale oak floor and warm morning light. Soft dust motes float, shallow depth of field, serene and tender mood, muted warm editorial color grade, 35mm film grain, slow elegant camera move. No text.',
  },
]

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

// One request per minute is allowed for balances < $100, so we go strictly
// sequential, disable SDK auto-retries, and wait out rate limits ourselves.
async function gen(scene) {
  for (const model of MODELS) {
    for (let attempt = 1; attempt <= 4; attempt++) {
      try {
        console.log(`\n[${scene.name}] model=${model} attempt=${attempt}`)
        const result = await generateVideo({
          model,
          prompt: scene.prompt,
          aspectRatio: '16:9',
          duration: 6,
          maxRetries: 0,
          providerOptions: { xai: { resolution: '720p', pollTimeoutMs: 590000 } },
        })
        const bytes = result.videos[0].uint8Array
        const file = path.join(OUT, `${scene.name}.mp4`)
        fs.writeFileSync(file, bytes)
        console.log(`[${scene.name}] ✓ wrote ${file} (${(bytes.length / 1e6).toFixed(2)} MB) via ${model}`)
        return { scene: scene.name, ok: true, model, file }
      } catch (err) {
        const msg = String(err?.message || err)
        console.warn(`[${scene.name}] ✗ ${msg}`)
        if (/quota|rate|per minute|429/i.test(msg)) {
          console.log(`[${scene.name}] rate limited — waiting 65s…`)
          await sleep(65000)
          continue // retry same model
        }
        break // different error (e.g. bad model) — try next model
      }
    }
  }
  return { scene: scene.name, ok: false }
}

const which = process.argv[2] // optional: only run one scene by name
const todo = which ? SCENES.filter((s) => s.name === which) : SCENES

const results = []
for (const scene of todo) {
  results.push(await gen(scene))
  if (todo.length > 1) await sleep(65000) // space requests apart
}
console.log('\n=== SUMMARY ===')
console.log(JSON.stringify(results, null, 2))
if (!results.some((r) => r.ok)) process.exit(1)
