<script setup lang="ts">
import { galleryConfig } from '../config'

const textShadow = '0 2px 24px var(--color-shadow)'
const PROJECTS = galleryConfig.projects

const emit = defineEmits<{
  select: [id: string]
}>()

const rowOffsets = [0, '16vh', 0, '16vh']
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
          justifySelf: i % 2 === 0 ? 'start' : 'end',
          marginTop: rowOffsets[i] ?? 0,
        }"
      >
        <div class="immersive-gallery__project-inner">
          <div
            class="immersive-gallery__image-wrapper"
            tabindex="0"
            role="button"
            @click="emit('select', project.id)"
            @keydown.enter="emit('select', project.id)"
            @keydown.space.prevent="emit('select', project.id)"
          >
            <img
              :src="project.image"
              :alt="project.title"
              width="600"
              height="900"
              class="immersive-gallery__image"
              loading="lazy"
            />
          </div>

          <!-- Meta -->
          <div class="immersive-gallery__meta">
            <div>
              <div
                class="font-sans-body immersive-gallery__project-id"
              >
                <!-- {{ project.id }} -->
              </div>
              <button
                class="font-serif-display immersive-gallery__project-title"
                :aria-label="`查看 ${project.title} 详情`"
                @click="emit('select', project.id)"
              >
                {{ project.title }}
              </button>
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
  color: var(--color-white-65);
  text-transform: uppercase;
  margin-bottom: 16px;
  text-shadow: v-bind(textShadow);
}

.immersive-gallery__title {
  font-size: clamp(28px, 4vw, 48px);
  font-weight: 200;
  color: var(--color-white);
  letter-spacing: 0.05em;
  line-height: 1.2;
  margin: 0;
  text-shadow: v-bind(textShadow);
}

.immersive-gallery__projects {
  position: relative;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10vh 6vw;
}

.immersive-gallery__project {
  justify-content: center;
  display: flex;
  width: 100%;
}

.immersive-gallery__project-inner {
  width: min(45vw, 560px);
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
  outline: 1px solid var(--color-white-50);
  outline-offset: 4px;
}

.immersive-gallery__image-wrapper:hover .immersive-gallery__image,
.immersive-gallery__image-wrapper:focus-visible .immersive-gallery__image {
  transform: scale(1.03);
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
  color: var(--color-white-65);
  text-transform: uppercase;
  margin-bottom: 8px;
  text-shadow: v-bind(textShadow);
}

.immersive-gallery__project-title {
  font-size: 20px;
  font-weight: 300;
  color: var(--color-white);
  letter-spacing: 0.08em;
  margin: 0;
  text-shadow: v-bind(textShadow);
  cursor: pointer;
  display: flex;
  align-items: center;
  border-bottom: 1px solid transparent;
  transition: border-color 0.3s ease;
  background: none;
  border: none;
  padding: 0;
  font-family: inherit;
  text-align: left;
  min-height: 44px;
  outline: none;
}

.immersive-gallery__project-title:hover,
.immersive-gallery__project-title:focus-visible {
  border-bottom-color: var(--color-white-55);
}

.immersive-gallery__project-info {
  text-align: right;
}

.immersive-gallery__project-location {
  font-size: 10px;
  letter-spacing: 0.15em;
  color: var(--color-white-65);
  text-shadow: v-bind(textShadow);
}

.immersive-gallery__project-year {
  font-size: 10px;
  letter-spacing: 0.15em;
  color: var(--color-white-65);
  margin-top: 4px;
  text-shadow: v-bind(textShadow);
}

@media (max-width: 768px) {
  .immersive-gallery__projects {
    grid-template-columns: 1fr;
    gap: 8vh;
  }

  .immersive-gallery__project {
    justify-self: center !important;
    margin-top: 0 !important;
  }

  .immersive-gallery__project-inner {
    width: 90vw;
    max-width: none;
  }

  .immersive-gallery__header {
    padding: 0 5vw;
  }

  .immersive-gallery__projects {
    padding: 0 5vw;
  }
}
</style>
