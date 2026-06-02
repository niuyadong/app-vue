<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import type { MediumItem } from '../config'

const props = defineProps<{
  item: MediumItem
  filterId: string
}>()

const emit = defineEmits<{
  hover: []
  leaveHover: []
}>()

const text1Ref = ref<SVGTextElement | null>(null)
const text2Ref = ref<SVGTextElement | null>(null)
const textsGroupRef = ref<SVGGElement | null>(null)
const feBlurRef = ref<SVGFEGaussianBlurElement | null>(null)

let tl: gsap.core.Timeline | null = null
const primitiveValues = { stdDeviation: 0 }

onMounted(() => {
  if (!text1Ref.value || !text2Ref.value || !textsGroupRef.value || !feBlurRef.value) return

  gsap.set(text2Ref.value, { opacity: 0 })

  tl = gsap.timeline({
    paused: true,
    onComplete: () => {
      if (textsGroupRef.value) textsGroupRef.value.style.filter = 'none'
    },
    onReverseComplete: () => {
      if (textsGroupRef.value) textsGroupRef.value.style.filter = 'none'
    },
    onUpdate: () => {
      if (feBlurRef.value) {
        feBlurRef.value.setAttribute('stdDeviation', String(primitiveValues.stdDeviation))
      }
    },
  })

  tl.to(primitiveValues, { duration: 0.5, ease: 'none', stdDeviation: 1.5, startAt: { stdDeviation: 0 } }, 0)
  tl.to(primitiveValues, { duration: 0.5, ease: 'none', stdDeviation: 0 }, '>')
  tl.to(text1Ref.value, { duration: 1, ease: 'none', opacity: 0 }, 0)
  tl.to(text2Ref.value, { duration: 1, ease: 'none', opacity: 1 }, 0)
  tl.to(text1Ref.value, { duration: 1, ease: 'Power2.easeInOut', x: 8 }, 0)
  tl.to(text2Ref.value, { duration: 1, ease: 'Power2.easeInOut', startAt: { x: -8 }, x: 0 }, 0)
})

onUnmounted(() => {
  if (tl) tl.kill()
})

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

const onEnter = () => {
  if (textsGroupRef.value) {
    textsGroupRef.value.style.filter = `url(#${props.filterId})`
  }
  if (tl && !prefersReducedMotion.matches) tl.play()
  emit('hover')
}

const onLeave = () => {
  if (textsGroupRef.value) {
    textsGroupRef.value.style.filter = `url(#${props.filterId})`
  }
  if (tl && !prefersReducedMotion.matches) tl.reverse()
  emit('leaveHover')
}
</script>

<template>
  <div
    style="
      cursor: pointer;
      border-bottom: 1px solid rgba(255,255,255,0.08);
      padding: 28px 0;
      transition: border-color 0.4s;
    "
    @mouseenter="onEnter"
    @mouseleave="onLeave"
  >
    <svg
      viewBox="0 0 400 50"
      style="width: 100%; max-width: 500px; height: 50px; overflow: visible"
      preserveAspectRatio="xMinYMid meet"
    >
      <defs>
        <filter :id="filterId">
          <feGaussianBlur
            ref="feBlurRef"
            in="SourceGraphic"
            stdDeviation="0"
            result="blur"
          />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  1 0 1 0 0  0 0 0 16 -7"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
      <g ref="textsGroupRef">
        <text
          ref="text1Ref"
          x="0"
          y="35"
          fill="#EDE8E4"
          font-family="'Noto Serif SC', Georgia, serif"
          font-size="32"
          font-weight="300"
          letter-spacing="0.08em"
        >
          {{ item.cn }}
        </text>
        <text
          ref="text2Ref"
          x="0"
          y="35"
          fill="#30B0D0"
          font-family="'Noto Sans SC', Helvetica, sans-serif"
          font-size="28"
          font-weight="700"
          letter-spacing="0.12em"
        >
          {{ item.en }}
        </text>
      </g>
    </svg>
  </div>
</template>
