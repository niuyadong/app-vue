<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, defineAsyncComponent, nextTick, watch } from 'vue'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navigation from './components/Navigation.vue'
import HeroField from './sections/HeroField.vue'
import PhilosophyCarousel from './sections/PhilosophyCarousel.vue'
import MediumsGlossary from './sections/MediumsGlossary.vue'
import AboutSection from './sections/AboutSection.vue'
import ServicesSection from './sections/ServicesSection.vue'
import ImmersiveGallery from './sections/ImmersiveGallery.vue'
import Footer from './sections/Footer.vue'
import ProjectDetail from './pages/ProjectDetail.vue'
import { getProjectById } from './config'

const FluidBackground = defineAsyncComponent(() => import('./components/FluidBackground.vue'))

gsap.registerPlugin(ScrollTrigger)

const fluidActive = ref(false)
const selectedProjectId = ref<string | null>(null)
const savedScroll = ref(0)
const currentHash = ref(window.location.hash || '#hero-section')
const activeSectionId = ref(currentHash.value.replace('#', ''))

const selectedProject = computed(() => {
  return selectedProjectId.value ? getProjectById(selectedProjectId.value) : null
})

const isHomePage = computed(() => !['#about', '#services'].includes(currentHash.value))
const isAboutPage = computed(() => currentHash.value === '#about')
const isServicesPage = computed(() => currentHash.value === '#services')

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
let sectionObserver: IntersectionObserver | null = null
let tickerCallback: ((time: number) => void) | null = null
let handleAnchorClick: ((e: MouseEvent) => void) | null = null

const scrollToHash = (hash: string) => {
  const id = hash.replace('#', '')
  const el = document.getElementById(id)
  if (el && lenis) {
    lenis.scrollTo(el, { offset: 0 })
  } else if (el) {
    el.scrollIntoView({ behavior: 'auto' })
  }
}

const initFluidObserver = () => {
  observer?.disconnect()
  observer = null

  if (!isHomePage.value) {
    fluidActive.value = false
    return
  }

  const heroEl = document.getElementById('hero-section')
  const galleryEl = document.getElementById('gallery')
  if (!heroEl || !galleryEl) return

  const visibility = { hero: true, gallery: false }
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.target === heroEl) visibility.hero = entry.isIntersecting
        if (entry.target === galleryEl) visibility.gallery = entry.isIntersecting
      })
      fluidActive.value = visibility.hero || visibility.gallery
    },
    { threshold: 0.05 }
  )
  observer.observe(heroEl)
  observer.observe(galleryEl)
}

const initSectionObserver = () => {
  sectionObserver?.disconnect()
  sectionObserver = null

  if (!isHomePage.value) return

  const ids = ['hero-section', 'gallery', 'footer']
  const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
  if (els.length === 0) return

  sectionObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting)
      if (visible.length === 0) return
      const top = visible.reduce((a, b) => (a.intersectionRatio > b.intersectionRatio ? a : b))
      activeSectionId.value = top.target.id
    },
    { threshold: [0, 0.25, 0.5, 0.75, 1] }
  )
  els.forEach((el) => sectionObserver.observe(el))
}

const handleHashChange = () => {
  currentHash.value = window.location.hash || '#hero-section'
  activeSectionId.value = currentHash.value.replace('#', '')

  nextTick(() => {
    initFluidObserver()
    initSectionObserver()

    if (isHomePage.value) {
      // Scroll to the requested home anchor
      scrollToHash(currentHash.value)
    } else {
      // Page views start at top
      window.scrollTo(0, 0)
      lenis?.scrollTo(0, { immediate: true })
    }
  })
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

  handleAnchorClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement
    const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null
    if (!anchor) return
    const hash = anchor.getAttribute('href')
    if (!hash || hash.length < 2) return
    e.preventDefault()
    window.location.hash = hash
  }

  window.addEventListener('hashchange', handleHashChange)
  document.addEventListener('click', handleAnchorClick)

  nextTick(() => {
    initFluidObserver()
    initSectionObserver()
    if (isHomePage.value) {
      scrollToHash(currentHash.value)
    } else {
      window.scrollTo(0, 0)
    }
  })
})

watch(selectedProjectId, (val) => {
  if (val === null) {
    nextTick(() => {
      initFluidObserver()
    })
  }
})

onUnmounted(() => {
  window.removeEventListener('hashchange', handleHashChange)
  if (handleAnchorClick) document.removeEventListener('click', handleAnchorClick)
  if (tickerCallback) gsap.ticker.remove(tickerCallback)
  observer?.disconnect()
  sectionObserver?.disconnect()
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
    <Navigation :active-target="activeSectionId" />

    <!-- Home view -->
    <main
      v-if="isHomePage"
      class="app__home"
    >
      <div
        id="hero-section"
        class="app__hero"
      >
        <HeroField />
      </div>
      <PhilosophyCarousel />
      <div id="mediums">
        <MediumsGlossary />
      </div>
      <div
        id="gallery"
        class="app__gallery"
      >
        <ImmersiveGallery @select="handleSelectProject" />
      </div>
      <div id="footer">
        <Footer />
      </div>
    </main>

    <!-- About page -->
    <main
      v-if="isAboutPage"
      class="app__page"
    >
      <AboutSection />
      <Footer />
    </main>

    <!-- Services page -->
    <main
      v-if="isServicesPage"
      class="app__page"
    >
      <ServicesSection />
      <Footer />
    </main>
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

.app__home,
.app__page {
  position: relative;
}

.app__hero {
  position: relative;
  z-index: 1;
}

.app__gallery {
  position: relative;
  z-index: 3;
}

.app__page {
  z-index: 4;
}
</style>
