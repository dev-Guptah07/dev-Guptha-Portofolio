<template>
  <canvas ref="canvas" class="starfield-canvas" :style="{ opacity: canvasOpacity }" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const canvas = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
let animId = 0
let stars: Array<any> = []
// reactive opacity bound to the canvas so we can fade it per-section
import { ref as vueRef } from 'vue'
const canvasOpacity = vueRef(0.45)

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min
}

function createStars(width: number, height: number) {
  const area = width * height
  const density = 4000 // pixels per star (smaller = more stars)
  const count = Math.max(140, Math.min(420, Math.floor(area / density)))
  stars = new Array(count).fill(0).map(() => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: rand(-0.08, 0.08),
    vy: rand(-0.05, 0.05),
    r: rand(0.9, 2.6),
    phase: Math.random() * Math.PI * 2,
    twinkleSpeed: rand(0.0014, 0.0040)
  }))
}

function resizeCanvas() {
  if (!canvas.value) return
  const dpr = window.devicePixelRatio || 1
  const rect = canvas.value.getBoundingClientRect()
  const w = Math.max(1, Math.floor(rect.width))
  const h = Math.max(1, Math.floor(rect.height))
  canvas.value.width = Math.floor(w * dpr)
  canvas.value.height = Math.floor(h * dpr)
  canvas.value.style.width = w + 'px'
  canvas.value.style.height = h + 'px'
  if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  createStars(w, h)
  // debug: log canvas render size so we can confirm visibility in devtools
  // you can remove these logs when happy
  // eslint-disable-next-line no-console
  console.debug('StarField resize =>', w + 'x' + h) 
}

function draw(t: number) {
  if (!ctx || !canvas.value) return
  const rect = canvas.value.getBoundingClientRect()
  const w = rect.width
  const h = rect.height
  ctx.clearRect(0, 0, w, h)

  // draw stars
  for (let i = 0; i < stars.length; i++) {
    const s = stars[i]
    s.x += s.vx
    s.y += s.vy

    // wrap
    if (s.x < -10) s.x = w + 10
    else if (s.x > w + 10) s.x = -10
    if (s.y < -10) s.y = h + 10
    else if (s.y > h + 10) s.y = -10

    const alpha = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin((t * s.twinkleSpeed) + s.phase))
    ctx.beginPath()
    const grd = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 3)
    grd.addColorStop(0, `rgba(255, 220, 255, ${1.0 * alpha})`)
    grd.addColorStop(0.4, `rgba(200, 140, 255, ${0.6 * alpha})`)
    grd.addColorStop(1, `rgba(120, 70, 140, 0)`)
    ctx.fillStyle = grd
    ctx.arc(s.x, s.y, s.r * 1.8, 0, Math.PI * 2)
    ctx.fill()
  }

  // subtle fiber-like connections (more frequent / stronger)
  const maxDist = Math.min(220, Math.max(80, (w + h) / 36))
  for (let i = 0; i < stars.length; i++) {
    for (let j = i + 1; j < stars.length; j++) {
      const a = stars[i]
      const b = stars[j]
      const dx = a.x - b.x
      const dy = a.y - b.y
      const d = Math.sqrt(dx * dx + dy * dy)
      if (d < maxDist) {
        const m = 1 - d / maxDist
        // primary stroke
        ctx.lineWidth = 0.9 * m + 0.2
        ctx.strokeStyle = `rgba(190, 150, 240, ${0.30 * m})`
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.stroke()
        // soft glow stroke for fiber effect
        ctx.lineWidth = 2.5 * m
        ctx.strokeStyle = `rgba(190, 150, 240, ${0.10 * m})`
        ctx.stroke()
      }
    }
  }

  animId = requestAnimationFrame(draw)
}

onMounted(() => {
  if (!canvas.value) return
  ctx = canvas.value.getContext('2d')
  resizeCanvas()
  // debug: quick confirmation that the canvas exists and its rect
  // eslint-disable-next-line no-console
  console.debug('StarField mounted rect =>', canvas.value?.getBoundingClientRect())
  // keep a resize observer to update
  const ro = new ResizeObserver(resizeCanvas)
  ro.observe(canvas.value)
  animId = requestAnimationFrame(draw)

  onUnmounted(() => {
    cancelAnimationFrame(animId)
    ro.disconnect()
  })
})
</script>

<style scoped>
.starfield-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  mix-blend-mode: normal;
  opacity: 1; /* allow inline style to control opacity */
  transition: opacity 320ms ease;
  /* subtle purple tint to help visibility on very dark themes while staying subtle */
  background: linear-gradient(180deg, rgba(150,80,200,0.02), rgba(0,0,0,0));
}
</style>
