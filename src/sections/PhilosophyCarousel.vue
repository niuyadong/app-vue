<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { philosophyConfig } from '../config'

gsap.registerPlugin(ScrollTrigger)

const WORDS = philosophyConfig.rollingWords
const sectionRef = ref<HTMLDivElement | null>(null)
const ringRef = ref<HTMLDivElement | null>(null)
const rotation = ref({ value: 0 })
const speed = ref({ value: 0 })
let rafId = 0
let gsapCtx: gsap.Context | null = null

onMounted(() => {
  const section = sectionRef.value
  const ring = ringRef.value
  if (!section || !ring) return

  gsapCtx = gsap.context(() => {
    gsap.to(rotation.value, {
      value: 360,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          speed.value.value = self.getVelocity() * 0.0003
        },
      },
    })
  })

  let currentRotation = 0
  let currentSpeed = 0
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

  const animateRing = () => {
    rafId = requestAnimationFrame(animateRing)

    if (prefersReducedMotion.matches) {
      ring.style.transform = 'rotateX(0deg)'
      return
    }

    currentRotation += (rotation.value.value - currentRotation) * 0.08
    currentSpeed += (speed.value.value - currentSpeed) * 0.1
    speed.value.value *= 0.95

    const absSpeed = Math.abs(currentSpeed)
    const skewAmount = Math.min(absSpeed * 12, 10)
    const scaleX = 1 + Math.min(absSpeed * 0.2, 0.12)

    ring.style.transform = `rotateX(${currentRotation}deg)`

    const items = ring.querySelectorAll<HTMLElement>('[data-ring-item]')
    items.forEach((item) => {
      const blurVal = Math.min(absSpeed * 1.5, 2)
      item.style.filter = blurVal > 0.1 ? `blur(${blurVal}px)` : 'none'
      const inner = item.querySelector<HTMLElement>('span')
      if (inner) {
        inner.style.transform = `skewX(${currentSpeed > 0 ? skewAmount : -skewAmount}deg) scaleX(${scaleX})`
      }
    })
  }

  animateRing()
})

onUnmounted(() => {
  cancelAnimationFrame(rafId)
  gsapCtx?.revert()
})

const totalItems = WORDS.length * 2
const angleStep = 360 / totalItems
const radius = 280
</script>

<template>
  <section
    ref="sectionRef"
    style="position: relative; width: 100%; overflow: hidden"
  >
    <div
      style="
        width: 100%;
        min-height: 100vh;
        background: transparent;
        display: flex;
      "
    >
      <!-- Left 30% — text panel -->
      <div style="flex: 0 0 30%; position: relative">
        <div
          style="
            position: sticky;
            top: 0;
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 0 5vw 0 4vw;
          "
        >
          <p
            v-if="philosophyConfig.eyebrow"
            class="font-sans-body"
            style="
              font-size: 13px;
              letter-spacing: 0.25em;
              color: rgba(255,255,255,0.7);
              text-transform: uppercase;
              margin-bottom: 24px;
              text-shadow: 0 2px 24px rgba(0,0,0,0.45);
            "
          >
            {{ philosophyConfig.eyebrow }}
          </p>
          <h2
            v-if="philosophyConfig.title"
            class="font-serif-display"
            style="
              font-size: clamp(28px, 2.5vw, 42px);
              font-weight: 300;
              line-height: 1.35;
              color: #ffffff;
              margin-bottom: 28px;
              text-shadow: 0 2px 24px rgba(0,0,0,0.45);
            "
          >
            {{ philosophyConfig.title }}
          </h2>
          <p
            v-if="philosophyConfig.body"
            class="font-sans-body"
            style="
              font-size: 15px;
              line-height: 2;
              color: rgba(255,255,255,0.8);
              font-weight: 300;
              text-shadow: 0 2px 24px rgba(0,0,0,0.45);
            "
          >
            {{ philosophyConfig.body }}
          </p>
        </div>
      </div>

      <!-- Right 70% — rolling text ring -->
      <div style="flex: 0 0 70%; position: relative">
        <div
          style="
            position: sticky;
            top: 0;
            width: 100%;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding-top: 6vh;
            perspective: 1000px;
            perspective-origin: 50% 55%;
          "
        >
          <div
            ref="ringRef"
            style="
              position: relative;
              width: 100%;
              height: 560px;
              transform-style: preserve-3d;
            "
          >
            <div
              v-for="(word, i) in [...WORDS, ...WORDS]"
              :key="`${word}-${i}`"
              data-ring-item
              style="
                position: absolute;
                width: 100%;
                text-align: center;
                left: 0;
                top: 50%;
                backface-visibility: hidden;
                will-change: filter;
              "
              :style="{
                transform: `rotateX(${i * angleStep}deg) translateZ(${radius}px) translateY(-50%)`
              }"
            >
              <span
                style="
                  display: inline-block;
                  font-family: 'Noto Serif SC', Georgia, serif;
                  font-size: clamp(42px, 8vw, 100px);
                  font-weight: 300;
                  color: #ffffff;
                  letter-spacing: 0.06em;
                  line-height: 1.1;
                  will-change: transform;
                  text-shadow: 0 2px 30px rgba(0,0,0,0.55);
                "
              >
                {{ word }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
