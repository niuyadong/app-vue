<script setup lang="ts">
import { galleryConfig } from '../config'

const textShadow = '0 2px 24px rgba(0,0,0,0.45)'
const PROJECTS = galleryConfig.projects

const emit = defineEmits<{
  select: [id: string]
}>()

const marginTops = [0, '-55vh', '-20vh', '-45vh']

const onImgEnter = (e: Event) => {
  ;(e.target as HTMLElement).style.transform = 'scale(1.03)'
}
const onImgLeave = (e: Event) => {
  ;(e.target as HTMLElement).style.transform = 'scale(1)'
}
const onTitleEnter = (e: MouseEvent) => {
  ;(e.currentTarget as HTMLElement).style.borderBottomColor = 'rgba(255,255,255,0.55)'
}
const onTitleLeave = (e: MouseEvent) => {
  ;(e.currentTarget as HTMLElement).style.borderBottomColor = 'transparent'
}
</script>

<template>
  <section
    v-if="PROJECTS.length > 0 || galleryConfig.title"
    class="immersive-gallery"
  >
    <!-- Section header -->
    <div class="immersive-gallery__header">
      <div
        class="font-sans-body immersive-gallery__section-label"
      >
        {{ galleryConfig.sectionLabel }}
      </div>
      <h2
        class="font-serif-display immersive-gallery__title"
      >
        {{ galleryConfig.title }}
      </h2>
    </div>

    <!-- Projects — asymmetric alternating layout -->
    <div class="immersive-gallery__projects">
      <div
        v-for="(project, i) in PROJECTS"
        :key="project.id"
        class="immersive-gallery__project"
        :style="{
          justifyContent: i % 2 === 0 ? 'flex-start' : 'flex-end',
          marginTop: marginTops[i] ?? 0,
          paddingLeft: i % 2 === 0 ? '5vw' : '40vw',
          paddingRight: i % 2 === 0 ? '40vw' : '5vw',
        }"
      >
        <div class="immersive-gallery__project-inner">
          <div
            class="immersive-gallery__image-wrapper"
            @click="emit('select', project.id)"
          >
            <img
              :src="project.image"
              :alt="project.title"
              width="600"
              height="900"
              class="immersive-gallery__image"
              loading="lazy"
              @mouseenter="onImgEnter"
              @mouseleave="onImgLeave"
            />
          </div>

          <!-- Meta -->
          <div class="immersive-gallery__meta">
            <div>
              <div
                class="font-sans-body immersive-gallery__project-id"
              >
                {{ project.id }}
              </div>
              <h3
                class="font-serif-display immersive-gallery__project-title"
                @click="emit('select', project.id)"
                @mouseenter="onTitleEnter"
                @mouseleave="onTitleLeave"
              >
                {{ project.title }}
              </h3>
            </div>
            <div class="immersive-gallery__project-info">
              <div
                class="font-sans-body immersive-gallery__project-location"
              >
                {{ project.location }}
              </div>
              <div
                class="font-sans-body immersive-gallery__project-year"
              >
                {{ project.year }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.immersive-gallery {
  position: relative;
  z-index: 2;
  background: transparent;
  padding-top: 15vh;
  padding-bottom: 15vh;
}

.immersive-gallery__header {
  padding: 0 2rem;
  margin-bottom: 10vh;
}

.immersive-gallery__section-label {
  font-size: 10px;
  letter-spacing: 0.25em;
  color: rgba(255,255,255,0.55);
  text-transform: uppercase;
  margin-bottom: 16px;
  text-shadow: v-bind(textShadow);
}

.immersive-gallery__title {
  font-size: clamp(28px, 4vw, 48px);
  font-weight: 200;
  color: #ffffff;
  letter-spacing: 0.05em;
  line-height: 1.2;
  margin: 0;
  text-shadow: v-bind(textShadow);
}

.immersive-gallery__projects {
  position: relative;
  padding: 0 2rem;
}

.immersive-gallery__project {
  display: flex;
}

.immersive-gallery__project-inner {
  width: 45vw;
  max-width: 600px;
}

.immersive-gallery__image-wrapper {
  width: 100%;
  aspect-ratio: 1024 / 1536;
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.immersive-gallery__image-wrapper:focus-visible,
.immersive-gallery__project-title:focus-visible {
  outline: 1px solid rgba(255,255,255,0.5);
  outline-offset: 4px;
}

.immersive-gallery__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.6s ease;
}

.immersive-gallery__meta {
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.immersive-gallery__project-id {
  font-size: 10px;
  letter-spacing: 0.2em;
  color: rgba(255,255,255,0.6);
  text-transform: uppercase;
  margin-bottom: 8px;
  text-shadow: v-bind(textShadow);
}

.immersive-gallery__project-title {
  font-size: 20px;
  font-weight: 300;
  color: #ffffff;
  letter-spacing: 0.08em;
  margin: 0;
  text-shadow: v-bind(textShadow);
  cursor: pointer;
  display: inline-block;
  border-bottom: 1px solid transparent;
  transition: border-color 0.3s ease;
}

.immersive-gallery__project-info {
  text-align: right;
}

.immersive-gallery__project-location {
  font-size: 10px;
  letter-spacing: 0.15em;
  color: rgba(255,255,255,0.6);
  text-shadow: v-bind(textShadow);
}

.immersive-gallery__project-year {
  font-size: 10px;
  letter-spacing: 0.15em;
  color: rgba(255,255,255,0.6);
  margin-top: 4px;
  text-shadow: v-bind(textShadow);
}
</style>
