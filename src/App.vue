<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import FluidBackground from './components/FluidBackground.vue'
import Navigation from './components/Navigation.vue'
import HeroField from './sections/HeroField.vue'
import PhilosophyCarousel from './sections/PhilosophyCarousel.vue'
import ImmersiveGallery from './sections/ImmersiveGallery.vue'
import MediumsGlossary from './sections/MediumsGlossary.vue'
import Footer from './sections/Footer.vue'
import ProjectDetail from './pages/ProjectDetail.vue'
import { getProjectById } from './config'

gsap.registerPlugin(ScrollTrigger)

const fluidActive = ref(true)
const selectedProjectId = ref<string | null>(null)
const savedScroll = ref(0)

const selectedProject = computed(() => {
  return selectedProjectId.value ? getProjectById(selectedProjectId.value) : null
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

onMounted(() => {
  lenis = new Lenis({ lerp: 0.05 })

  lenis.on('scroll', ScrollTrigger.update)

  gsap.ticker.add((time) => {
    lenis?.raf(time * 1000)
  })
  gsap.ticker.lagSmoothing(0)

  // IntersectionObserver for fluid background
  if (!selectedProjectId.value) {
    const heroEl = document.getElementById('hero-section')
    const philEl = document.getElementById('philosophy')
    const galleryEl = document.getElementById('gallery')
    if (heroEl && philEl && galleryEl) {
      const visibility = { hero: true, phil: false, gallery: false }
      const observer = new IntersectionObserver(
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
})

onUnmounted(() => {
  lenis?.destroy()
})
</script>

<template>
  <a
    href="#hero-section"
    style="
      position: fixed;
      top: -40px;
      left: 0;
      z-index: 9999;
      background: #ffffff;
      color: #050A0F;
      padding: 8px 16px;
      font-size: 13px;
      text-decoration: none;
      transition: top 0.2s;
    "
    @focus="(e: FocusEvent) => { (e.target as HTMLElement).style.top = '0px' }"
    @blur="(e: FocusEvent) => { (e.target as HTMLElement).style.top = '-40px' }"
  >
    跳转到主内容
  </a>
  <div v-if="selectedProject && selectedProjectId">
    <div style="position: relative">
      <FluidBackground :is-active="true" />
      <ProjectDetail :project="selectedProject" @back="handleBack" />
    </div>
  </div>
  <div v-else style="position: relative">
    <FluidBackground :is-active="fluidActive" />
    <Navigation />
    <div id="hero-section" style="position: relative; z-index: 1">
      <HeroField />
    </div>
    <div id="philosophy" style="position: relative; z-index: 2">
      <PhilosophyCarousel />
    </div>
    <div id="gallery" style="position: relative; z-index: 3">
      <ImmersiveGallery @select="handleSelectProject" />
    </div>
    <div style="position: relative; z-index: 50">
      <div id="mediums">
        <MediumsGlossary />
      </div>
      <div id="footer">
        <Footer />
      </div>
    </div>
  </div>
</template>
