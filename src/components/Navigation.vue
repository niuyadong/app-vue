<script setup lang="ts">
import { navigationConfig } from '../config'

const textShadow = '0 2px 24px rgba(0,0,0,0.45)'
const links = navigationConfig.links

const onNavEnter = (e: MouseEvent) => {
  ;(e.target as HTMLElement).style.color = '#ffffff'
}
const onNavLeave = (e: MouseEvent) => {
  ;(e.target as HTMLElement).style.color = 'rgba(255,255,255,0.85)'
}
</script>

<template>
  <header class="site-nav">
    <a
      href="#hero-section"
      class="font-serif-display site-nav__brand"
    >
      {{ navigationConfig.brandMark }}
    </a>
    <nav class="site-nav__links">
      <a
        v-for="link in links"
        :key="link.targetId"
        :href="`#${link.targetId}`"
        class="font-sans-body site-nav__link"
        @mouseenter="onNavEnter"
        @mouseleave="onNavLeave"
      >
        {{ link.label }}
      </a>
    </nav>
  </header>
</template>

<style scoped>
.site-nav {
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
}

.site-nav__brand {
  font-size: 16px;
  letter-spacing: 0.2em;
  color: #ffffff;
  text-decoration: none;
  text-shadow: v-bind(textShadow);
  pointer-events: auto;
  min-height: 44px;
  display: flex;
  align-items: center;
}

.site-nav__links {
  display: flex;
  gap: 32px;
}

.site-nav__link {
  font-size: 13px;
  letter-spacing: 0.15em;
  color: rgba(255,255,255,0.85);
  text-decoration: none;
  text-transform: uppercase;
  text-shadow: v-bind(textShadow);
  transition: color 0.3s ease;
  pointer-events: auto;
  outline: none;
  min-height: 44px;
  display: flex;
  align-items: center;
}

.site-nav__link:focus-visible {
  color: #ffffff;
  text-decoration: underline;
  text-underline-offset: 4px;
}

.site-nav__brand:focus-visible {
  outline: 1px solid rgba(255,255,255,0.5);
  outline-offset: 4px;
}
</style>
