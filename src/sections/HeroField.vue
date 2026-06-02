<script setup lang="ts">
import { heroConfig } from '../config'

const textShadow = '0 2px 24px rgba(0,0,0,0.45)'

const handleCta = () => {
  if (heroConfig.ctaTargetId) {
    document.getElementById(heroConfig.ctaTargetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const handleEnter = (e: MouseEvent) => {
  const el = e.currentTarget as HTMLElement
  el.style.background = 'rgba(255,255,255,0.18)'
  el.style.borderColor = 'rgba(255,255,255,0.8)'
}

const handleLeave = (e: MouseEvent) => {
  const el = e.currentTarget as HTMLElement
  el.style.background = 'rgba(255,255,255,0.08)'
  el.style.borderColor = 'rgba(255,255,255,0.5)'
}
</script>

<template>
  <section class="hero-field">
    <div
      class="hero-grid hero-field__grid"
    >
      <div class="hero-field__wordmark">
        <p
          class="font-serif-display hero-field__title"
        >
          {{ heroConfig.wordmarkText }}
        </p>
      </div>

      <div class="hero-field__content">
        <p
          v-if="heroConfig.eyebrow"
          class="font-sans-body hero-field__eyebrow"
        >
          {{ heroConfig.eyebrow }}
        </p>

        <h1
          class="font-serif-display hero-field__headline"
        >
          {{ heroConfig.titleLine1 }}
          <br v-if="heroConfig.titleLine2" />
          {{ heroConfig.titleLine2 }}
        </h1>

        <p
          v-if="heroConfig.descriptionLine1 || heroConfig.descriptionLine2"
          class="font-sans-body hero-field__description"
        >
          {{ heroConfig.descriptionLine1 }}
          <br v-if="heroConfig.descriptionLine2" />
          {{ heroConfig.descriptionLine2 }}
        </p>

        <a
          v-if="heroConfig.ctaText && heroConfig.ctaTargetId"
          :href="`#${heroConfig.ctaTargetId}`"
          class="font-sans-body hero-field__cta"
          @mouseenter="handleEnter"
          @mouseleave="handleLeave"
        >
          {{ heroConfig.ctaText }}
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-field {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  overflow: hidden;
}

.hero-field__grid {
  flex: 1 1 auto;
  position: relative;
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  align-items: center;
  padding: 0 6vw;
  gap: 6vw;
}

.hero-field__wordmark {
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-field__title {
  font-size: clamp(48px, 7vw, 96px);
  font-weight: 300;
  color: #ffffff;
  letter-spacing: 0.12em;
  text-shadow: v-bind(textShadow);
  margin: 0;
}

.hero-field__content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  text-align: left;
  max-width: 440px;
}

.hero-field__eyebrow {
  font-size: 12px;
  letter-spacing: 0.3em;
  color: rgba(255, 255, 255, 0.75);
  text-transform: uppercase;
  margin-bottom: 28px;
  margin-left: 60px;
  text-shadow: v-bind(textShadow);
}

.hero-field__headline {
  font-size: clamp(32px, 3vw, 52px);
  font-weight: 300;
  line-height: 1.3;
  color: #ffffff;
  word-break: keep-all;
  margin-bottom: 24px;
  margin-left: 60px;
  text-shadow: v-bind(textShadow);
}

.hero-field__description {
  font-size: 14px;
  line-height: 1.9;
  color: rgba(255, 255, 255, 0.75);
  font-weight: 300;
  margin-bottom: 40px;
  margin-left: 60px;
  text-shadow: v-bind(textShadow);
}

.hero-field__cta {
  display: inline-block;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 40px;
  padding: 14px 32px;
  color: #ffffff;
  font-size: 13px;
  letter-spacing: 0.15em;
  cursor: pointer;
  text-decoration: none;
  transition: background 0.3s ease, border-color 0.3s ease;
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  margin-left: 60px;
  outline: none;
}

.hero-field__cta:focus-visible {
  background: rgba(255, 255, 255, 0.18);
  border-color: rgba(255, 255, 255, 0.8);
  outline: 1px solid rgba(255, 255, 255, 0.4);
  outline-offset: 4px;
}

@media (max-width: 768px) {
  .hero-field__grid {
    grid-template-columns: 1fr;
    padding: 0 6vw;
    gap: 4vh;
    padding-top: 12vh;
    padding-bottom: 8vh;
  }

  .hero-field__title {
    font-size: clamp(36px, 12vw, 64px);
    letter-spacing: 0.1em;
  }

  .hero-field__eyebrow,
  .hero-field__headline,
  .hero-field__description,
  .hero-field__cta {
    margin-left: 0;
  }

  .hero-field__headline {
    font-size: clamp(24px, 8vw, 36px);
  }
}
</style>
