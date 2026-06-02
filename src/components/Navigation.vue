<script setup lang="ts">
import { navigationConfig } from '../config'

const textShadow = '0 2px 24px rgba(0,0,0,0.45)'
const links = navigationConfig.links
</script>

<template>
  <header
    style="
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 100;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 28px 4vw;
      pointer-events: none;
    "
  >
    <a
      href="#hero-section"
      class="font-serif-display"
      style="
        font-size: 16px;
        letter-spacing: 0.2em;
        color: #ffffff;
        text-decoration: none;
        text-shadow: v-bind(textShadow);
        pointer-events: auto;
      "
    >
      {{ navigationConfig.brandMark }}
    </a>
    <nav style="display: flex; gap: 32px">
      <a
        v-for="link in links"
        :key="link.targetId"
        :href="`#${link.targetId}`"
        class="font-sans-body"
        style="
          font-size: 13px;
          letter-spacing: 0.15em;
          color: rgba(255,255,255,0.85);
          text-decoration: none;
          text-transform: uppercase;
          text-shadow: v-bind(textShadow);
          transition: color 0.3s ease;
          pointer-events: auto;
        "
        @mouseenter="(e: MouseEvent) => { (e.target as HTMLElement).style.color = '#ffffff' }"
        @mouseleave="(e: MouseEvent) => { (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.85)' }"
      >
        {{ link.label }}
      </a>
    </nav>
  </header>
</template>
