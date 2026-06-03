<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, defineAsyncComponent, nextTick, watch } from 'vue'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navigation from './components/Navigation.vue'
import HeroField from './sections/HeroField.vue'
import PhilosophyCarousel from './sections/PhilosophyCarousel.vue'
import ImmersiveGallery from './sections/ImmersiveGallery.vue'
import MediumsGlossary from './sections/MediumsGlossary.vue'
import Footer from './sections/Footer.vue'
import ProjectDetail from './pages/ProjectDetail.vue'
import { getProjectById } from './config'

const FluidBackground = defineAsyncComponent(() => import('./components/FluidBackground.vue'))

gsap.registerPlugin(ScrollTrigger)

const fluidActive = ref(true)
const selectedProjectId = ref<string | null>(null)
const savedScroll = ref(0)

const selectedProject = computed(() => {
  return selectedProjectId.value ? getProjectById(selectedProjectId.value) : null
})

const fluidActiveOverall = computed(() => {
  if (selectedProjectId.value) return true
  return fluidActive.value
})

const handleSelectProject = (id: string) => {
  savedScroll.value = window.scrollY
  selectedProjectId.value = id
}

const handleBack = () => {
  selectedProjectId.value = null
  requestAnimationFrame(() => {
    window.scrollTo(0, savedScroll.value)
  })
}

let lenis: Lenis | null = null
let observer: IntersectionObserver | null = null
let tickerCallback: ((time: number) => void) | null = null

const initFluidObserver = () => {
  observer?.disconnect()
  observer = null
  const heroEl = document.getElementById('hero-section')
  const philEl = document.getElementById('philosophy')
  const galleryEl = document.getElementById('gallery')
  if (heroEl && philEl && galleryEl) {
    const visibility = { hero: true, phil: false, gallery: false }
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === heroEl) visibility.hero = entry.isIntersecting
          if (entry.target === philEl) visibility.phil = entry.isIntersecting
          if (entry.target === galleryEl) visibility.gallery = entry.isIntersecting
        })
        fluidActive.value = visibility.hero || visibility.phil || visibility.gallery
      },
      { threshold: 0.05 }
    )
    observer.observe(heroEl)
    observer.observe(philEl)
    observer.observe(galleryEl)
  }
}

onMounted(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

  lenis = new Lenis({
    lerp: prefersReducedMotion.matches ? 1 : 0.05,
    smoothWheel: !prefersReducedMotion.matches,
  })

  lenis.on('scroll', ScrollTrigger.update)

  tickerCallback = (time: number) => {
    lenis?.raf(time * 1000)
  }
  gsap.ticker.add(tickerCallback)
  gsap.ticker.lagSmoothing(0)

  initFluidObserver()
})

watch(selectedProjectId, (val) => {
  if (val === null) {
    nextTick(() => {
      initFluidObserver()
    })
  }
})

onUnmounted(() => {
  if (tickerCallback) gsap.ticker.remove(tickerCallback)
  observer?.disconnect()
  lenis?.destroy()
  lenis = null
})
</script>

<template>
  <a
    href="#hero-section"
    class="skip-link"
  >
    跳转到主内容
  </a>
  <FluidBackground :is-active="fluidActiveOverall" />
  <div
    v-if="selectedProject && selectedProjectId"
    class="app__detail"
  >
    <ProjectDetail
      :project="selectedProject"
      @back="handleBack"
    />
  </div>
  <div
    v-else
    class="app__main"
  >
    <Navigation />
    <div
      id="hero-section"
      class="app__hero"
    >
      <HeroField />
    </div>
    <div
      id="philosophy"
      class="app__philosophy"
    >
      <PhilosophyCarousel />
    </div>
    <div
      id="gallery"
      class="app__gallery"
    >
      <ImmersiveGallery @select="handleSelectProject" />
    </div>
    <div class="app__bottom">
      <div id="mediums">
        <MediumsGlossary />
      </div>
      <div id="footer">
        <Footer />
      </div>
    </div>
  </div>
</template>

<style scoped>
.app__detail {
  position: relative;
  z-index: 10;
}

.app__main {
  position: relative;
}

.app__hero {
  position: relative;
  z-index: 1;
}

.app__philosophy {
  position: relative;
  z-index: 2;
}

.app__gallery {
  position: relative;
  z-index: 3;
}

.app__bottom {
  position: relative;
  z-index: 50;
}
</style>
