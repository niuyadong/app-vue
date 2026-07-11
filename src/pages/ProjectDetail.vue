<script setup lang="ts">
import { projectDetailConfig } from '../config'
import type { ProjectData } from '../config'

const props = defineProps<{
  project: ProjectData
}>()

const emit = defineEmits<{
  back: []
}>()

const textShadow = '0 2px 24px var(--color-shadow)'
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

      <!-- Right — image, sticky so it stays in view while article scrolls -->
      <div class="project-detail__image-wrapper">
        <div class="project-detail__image-container">
          <img
            :src="project.image"
            :alt="project.title"
            width="420"
            height="630"
            class="project-detail__image"
          />
        </div>
      </div>
    </div>
  </div>
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

.project-detail__image-wrapper {
  position: sticky;
  top: 120px;
  width: 100%;
  max-width: 420px;
  justify-self: center;
}

.project-detail__image-container {
  width: 100%;
  aspect-ratio: 1024 / 1536;
  overflow: hidden;
}

.project-detail__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
</style>
