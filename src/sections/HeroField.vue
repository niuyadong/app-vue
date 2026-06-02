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
  <section
    style="
      position: relative;
      width: 100%;
      height: 100vh;
      display: flex;
      overflow: hidden;
    "
  >
    <div
      style="
        flex: 1 1 auto;
        position: relative;
        display: grid;
        grid-template-columns: 1.4fr 1fr;
        align-items: center;
        padding: 0 6vw;
        gap: 6vw;
      "
    >
      <div style="display: flex; align-items: center; justify-content: center">
        <h2
          class="font-serif-display"
          style="
            font-size: clamp(48px, 7vw, 112px);
            font-weight: 300;
            color: #ffffff;
            letter-spacing: 0.15em;
            text-shadow: v-bind(textShadow);
            margin: 0;
          "
        >
          {{ heroConfig.wordmarkText }}
        </h2>
      </div>

      <div
        style="
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          text-align: left;
          max-width: 440px;
        "
      >
        <p
          v-if="heroConfig.eyebrow"
          class="font-sans-body"
          style="
            font-size: 12px;
            letter-spacing: 0.3em;
            color: rgba(255,255,255,0.75);
            text-transform: uppercase;
            margin-bottom: 28px;
            margin-left: 60px;
            text-shadow: v-bind(textShadow);
          "
        >
          {{ heroConfig.eyebrow }}
        </p>

        <h1
          class="font-serif-display"
          style="
            font-size: clamp(32px, 3vw, 52px);
            font-weight: 300;
            line-height: 1.3;
            color: #ffffff;
            word-break: keep-all;
            margin-bottom: 24px;
            margin-left: 60px;
            text-shadow: v-bind(textShadow);
          "
        >
          {{ heroConfig.titleLine1 }}
          <br v-if="heroConfig.titleLine2" />
          {{ heroConfig.titleLine2 }}
        </h1>

        <p
          v-if="heroConfig.descriptionLine1 || heroConfig.descriptionLine2"
          class="font-sans-body"
          style="
            font-size: 14px;
            line-height: 1.9;
            color: rgba(255,255,255,0.75);
            font-weight: 300;
            margin-bottom: 40px;
            margin-left: 60px;
            text-shadow: v-bind(textShadow);
          "
        >
          {{ heroConfig.descriptionLine1 }}
          <br v-if="heroConfig.descriptionLine2" />
          {{ heroConfig.descriptionLine2 }}
        </p>

        <button
          v-if="heroConfig.ctaText"
          class="font-sans-body"
          style="
            background: rgba(255,255,255,0.08);
            border: 1px solid rgba(255,255,255,0.5);
            border-radius: 40px;
            padding: 14px 32px;
            color: #ffffff;
            font-size: 13px;
            letter-spacing: 0.15em;
            cursor: pointer;
            transition: all 0.3s ease;
            backdrop-filter: blur(6px);
            -webkit-backdrop-filter: blur(6px);
            margin-left: 60px;
          "
          @click="handleCta"
          @mouseenter="handleEnter"
          @mouseleave="handleLeave"
        >
          {{ heroConfig.ctaText }}
        </button>
      </div>
    </div>
  </section>
</template>
