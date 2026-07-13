<script setup lang="ts">
import { computed, ref, watch, nextTick } from 'vue'
import { projectDetailConfig } from '../config'
import type { ProjectData } from '../config'

const props = defineProps<{
  project: ProjectData
}>()

const emit = defineEmits<{
  back: []
}>()

const textShadow = '0 2px 24px var(--color-shadow)'

const images = computed(() =>
  props.project.images.length > 0 ? props.project.images : [props.project.image]
)
const activeIndex = ref(0)
const activeImage = computed(() => images.value[activeIndex.value])

const setActive = (index: number) => {
  activeIndex.value = index
}

const nextImage = () => {
  activeIndex.value = (activeIndex.value + 1) % images.value.length
}

const prevImage = () => {
  activeIndex.value = (activeIndex.value - 1 + images.value.length) % images.value.length
}

const handleGalleryKeydown = (e: KeyboardEvent) => {
  if (e.key === 'ArrowRight') {
    e.preventDefault()
    nextImage()
  } else if (e.key === 'ArrowLeft') {
    e.preventDefault()
    prevImage()
  }
}

const isLightboxOpen = ref(false)
const lightboxRef = ref<HTMLDivElement | null>(null)

const openLightbox = () => {
  isLightboxOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  isLightboxOpen.value = false
  document.body.style.overflow = ''
}

watch(isLightboxOpen, (open) => {
  if (open) {
    document.addEventListener('keydown', handleLightboxKeydown)
    nextTick(() => lightboxRef.value?.focus())
  } else {
    document.removeEventListener('keydown', handleLightboxKeydown)
  }
})

const handleLightboxKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    e.preventDefault()
    closeLightbox()
  } else if (e.key === 'ArrowRight') {
    e.preventDefault()
    nextImage()
  } else if (e.key === 'ArrowLeft') {
    e.preventDefault()
    prevImage()
  }
}
</script>

<template>
  <div class="project-detail">
    <!-- Top bar -->
    <div class="project-detail__topbar">
      <button
        class="font-sans-body project-detail__back-btn"
        @click="emit('back')"
      >
        {{ projectDetailConfig.backLabel || '←' }}
      </button>
      <div class="font-sans-body project-detail__id">
        {{ project.id }}{{ project.year ? ` / ${project.year}` : '' }}
      </div>
    </div>

    <!-- Content — left article / right image -->
    <div class="project-detail__grid">
      <!-- Left — article -->
      <article class="project-detail__article">
        <div class="font-sans-body project-detail__location">
          {{ [project.location, project.year].filter(Boolean).join(' · ') }}
        </div>
        <h1 class="font-serif-display project-detail__title">
          {{ project.title }}
        </h1>
        <p class="font-serif-display project-detail__subtitle">
          {{ project.subtitle }}
        </p>

        <!-- Meta rows -->
        <div class="project-detail__meta-rows">
          <div
            v-for="m in project.meta"
            :key="m.label"
            class="project-detail__meta-row"
          >
            <span class="font-sans-body project-detail__meta-label">
              {{ m.label }}
            </span>
            <span class="font-sans-body project-detail__meta-value">
              {{ m.value }}
            </span>
          </div>
        </div>

        <!-- Body paragraphs -->
        <div class="project-detail__body">
          <p
            v-for="(p, idx) in project.paragraphs"
            :key="idx"
            class="font-sans-body project-detail__paragraph"
          >
            {{ p }}
          </p>
        </div>
      </article>

      <!-- Right — image gallery -->
      <div
        class="project-detail__gallery"
        tabindex="0"
        role="region"
        aria-label="项目图片画廊，按左右方向键切换"
        @keydown="handleGalleryKeydown"
      >
        <div
          class="project-detail__main-image"
          tabindex="0"
          role="button"
          aria-label="点击放大查看图片"
          @click="openLightbox"
          @keydown.enter="openLightbox"
          @keydown.space.prevent="openLightbox"
        >
          <img
            :key="activeImage"
            :src="activeImage"
            :alt="`${project.title} 项目图片 ${activeIndex + 1} / ${images.length}`"
            width="800"
            height="600"
            class="project-detail__image"
          />
          <div class="project-detail__zoom-hint">
            <span>点击放大</span>
          </div>
          <div
            v-if="images.length > 1"
            class="project-detail__counter"
          >
            {{ String(activeIndex + 1).padStart(2, '0') }} / {{ String(images.length).padStart(2, '0') }}
          </div>
        </div>

        <div
          v-if="images.length > 1"
          class="project-detail__thumbnails"
          role="tablist"
          aria-label="图片缩略图"
        >
          <button
            v-for="(img, idx) in images"
            :key="idx"
            class="project-detail__thumb"
            :class="{ 'project-detail__thumb--active': idx === activeIndex }"
            role="tab"
            :aria-selected="idx === activeIndex"
            :aria-label="`查看第 ${idx + 1} 张图片`"
            @click="setActive(idx)"
          >
            <img
              :src="img"
              :alt="`${project.title} 缩略图 ${idx + 1}`"
              class="project-detail__thumb-img"
              loading="lazy"
            />
          </button>
        </div>
      </div>
    </div>
  </div>

  <Teleport to="body">
    <div
      v-if="isLightboxOpen"
      ref="lightboxRef"
      class="project-detail__lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="图片放大查看"
      tabindex="-1"
      @click.self="closeLightbox"
    >
      <button
        class="project-detail__lightbox-close"
        aria-label="关闭放大视图"
        @click="closeLightbox"
      >
        ×
      </button>

      <div class="project-detail__lightbox-inner">
        <button
          v-if="images.length > 1"
          class="project-detail__lightbox-nav project-detail__lightbox-nav--prev"
          aria-label="上一张"
          @click="prevImage"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <img
          :key="activeImage"
          :src="activeImage"
          :alt="`${project.title} 项目图片 ${activeIndex + 1} / ${images.length}`"
          class="project-detail__lightbox-image"
        />

        <button
          v-if="images.length > 1"
          class="project-detail__lightbox-nav project-detail__lightbox-nav--next"
          aria-label="下一张"
          @click="nextImage"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      <div
        v-if="images.length > 1"
        class="project-detail__lightbox-counter"
      >
        {{ String(activeIndex + 1).padStart(2, '0') }} / {{ String(images.length).padStart(2, '0') }}
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.project-detail {
  position: relative;
  z-index: 10;
  min-height: 100vh;
  width: 100%;
  color: var(--color-white);
}

.project-detail__topbar {
  position: sticky;
  top: 0;
  z-index: 20;
  padding: 28px 4vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  background: var(--color-bg-glass);
}

.project-detail__back-btn {
  background: transparent;
  border: 1px solid var(--color-white-40);
  color: var(--color-white);
  font-size: 11px;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  padding: 10px 22px;
  border-radius: 40px;
  cursor: pointer;
  text-shadow: v-bind(textShadow);
  min-height: 44px;
  outline: none;
}

.project-detail__back-btn:hover,
.project-detail__back-btn:focus-visible {
  border-color: var(--color-white);
  background: var(--color-white-08);
}

.project-detail__back-btn:focus-visible {
  outline: 1px solid var(--color-white-40);
  outline-offset: 4px;
}

.project-detail__id {
  font-size: 10px;
  letter-spacing: 0.3em;
  color: var(--color-white-65);
  text-transform: uppercase;
  text-shadow: v-bind(textShadow);
}

.project-detail__grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 6vw;
  padding: 6vh 5vw 12vh;
  align-items: start;
}

.project-detail__article {
  max-width: 560px;
}

.project-detail__location {
  font-size: 10px;
  letter-spacing: 0.3em;
  color: var(--color-white-65);
  text-transform: uppercase;
  margin-bottom: 18px;
  text-shadow: v-bind(textShadow);
}

.project-detail__title {
  font-size: clamp(36px, 5vw, 72px);
  font-weight: 200;
  letter-spacing: 0.06em;
  line-height: 1.1;
  margin: 0;
  margin-bottom: 24px;
  color: var(--color-white);
  text-shadow: v-bind(textShadow);
}

.project-detail__subtitle {
  font-size: clamp(16px, 1.4vw, 20px);
  font-weight: 300;
  line-height: 1.6;
  color: var(--color-white-82);
  font-style: italic;
  margin: 0;
  margin-bottom: 48px;
  text-shadow: v-bind(textShadow);
}

.project-detail__meta-rows {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 48px;
  padding-top: 20px;
  padding-bottom: 24px;
  border-top: 1px solid var(--color-border-light);
  border-bottom: 1px solid var(--color-border-light);
}

.project-detail__meta-row {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.project-detail__meta-label {
  font-size: 10px;
  letter-spacing: 0.25em;
  color: var(--color-white-65);
  text-transform: uppercase;
  text-shadow: v-bind(textShadow);
}

.project-detail__meta-value {
  font-size: 12px;
  letter-spacing: 0.12em;
  color: var(--color-white-88);
  text-align: right;
  text-shadow: v-bind(textShadow);
}

.project-detail__body {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.project-detail__paragraph {
  font-size: 15px;
  line-height: 2;
  font-weight: 300;
  color: var(--color-white-82);
  margin: 0;
  text-shadow: v-bind(textShadow);
}

.project-detail__gallery {
  position: sticky;
  top: 120px;
  width: 100%;
  max-width: 710px;
  max-height: calc(100vh - 140px);
  overflow-y: auto;
  justify-self: center;
  display: flex;
  flex-direction: column;
  gap: 20px;
  outline: none;
}

.project-detail__gallery:focus-visible {
  outline: 1px solid var(--color-white-40);
  outline-offset: 4px;
}

.project-detail__main-image {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
}

.project-detail__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  animation: image-fade-in 0.5s ease;
}

@keyframes image-fade-in {
  from {
    opacity: 0;
    transform: scale(1.02);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.project-detail__counter {
  position: absolute;
  bottom: 16px;
  right: 16px;
  padding: 6px 12px;
  background: var(--color-bg-glass);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-pill);
  font-size: 11px;
  letter-spacing: 0.1em;
  color: var(--color-white);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}

.project-detail__thumbnails {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.project-detail__thumb {
  position: relative;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: 0;
  cursor: pointer;
  outline: none;
  opacity: 0.7;
  transition: opacity 0.3s ease, border-color 0.3s ease;
}

.project-detail__thumb:hover,
.project-detail__thumb:focus-visible {
  opacity: 1;
  border-color: var(--color-white-50);
}

.project-detail__thumb--active,
.project-detail__thumb--active:hover,
.project-detail__thumb--active:focus-visible {
  opacity: 1;
  border-color: var(--color-white);
}

.project-detail__thumb-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.project-detail__main-image {
  cursor: zoom-in;
}

.project-detail__zoom-hint {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(5, 10, 15, 0.35);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.project-detail__main-image:hover .project-detail__zoom-hint,
.project-detail__main-image:focus-visible .project-detail__zoom-hint {
  opacity: 1;
}

.project-detail__zoom-hint span {
  padding: 10px 20px;
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-pill);
  background: var(--color-bg-glass);
  color: var(--color-white);
  font-size: 12px;
  letter-spacing: 0.15em;
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}

.project-detail__lightbox {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(5, 10, 15, 0.96);
  padding: 5vh 5vw;
  outline: none;
}

.project-detail__lightbox-inner {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: min(1200px, 85vw);
  max-height: 85vh;
}

.project-detail__lightbox-image {
  max-width: 100%;
  max-height: 85vh;
  width: auto;
  height: auto;
  object-fit: contain;
  animation: image-fade-in 0.4s ease;
}

.project-detail__lightbox-close {
  position: absolute;
  top: 24px;
  right: 24px;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-white-08);
  border: 1px solid var(--color-border-light);
  border-radius: 50%;
  color: var(--color-white);
  font-size: var(--font-size-icon-sm);
  line-height: 1;
  cursor: pointer;
  outline: none;
  transition: background 0.3s ease, border-color 0.3s ease;
}

.project-detail__lightbox-close:hover,
.project-detail__lightbox-close:focus-visible {
  background: var(--color-white-18);
  border-color: var(--color-white-50);
}

.project-detail__lightbox-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-white-08);
  border: 1px solid var(--color-border-light);
  border-radius: 50%;
  color: var(--color-white);
  cursor: pointer;
  outline: none;
  transition: background 0.3s ease, border-color 0.3s ease;
}

.project-detail__lightbox-nav:hover,
.project-detail__lightbox-nav:focus-visible {
  background: var(--color-white-18);
  border-color: var(--color-white-50);
}

.project-detail__lightbox-nav svg {
  width: 24px;
  height: 24px;
}

.project-detail__lightbox-nav--prev {
  left: -64px;
}

.project-detail__lightbox-nav--next {
  right: -64px;
}

.project-detail__lightbox-counter {
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  padding: 6px 14px;
  background: var(--color-bg-glass);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-pill);
  font-size: 11px;
  letter-spacing: 0.1em;
  color: var(--color-white);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}

@media (max-width: 1024px) {
  .project-detail__grid {
    grid-template-columns: 1fr;
    gap: 8vh;
  }

  .project-detail__gallery {
    position: relative;
    top: 0;
    max-height: none;
    order: -1;
  }
}

@media (max-width: 768px) {
  .project-detail__lightbox {
    padding: 5vh 16px;
  }

  .project-detail__lightbox-inner {
    max-width: 100%;
  }

  .project-detail__lightbox-nav--prev {
    left: 8px;
  }

  .project-detail__lightbox-nav--next {
    right: 8px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .project-detail__image {
    animation: none;
  }
}
</style>
