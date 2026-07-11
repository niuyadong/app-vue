<script setup lang="ts">
import { navigationConfig } from '../config'

const props = defineProps<{
  activeTarget?: string
}>()

const textShadow = '0 2px 24px var(--color-shadow)'
const links = navigationConfig.links

const isActive = (targetId: string) => props.activeTarget === targetId
</script>

<template>
  <header class="site-nav">
    <a
      href="#hero-section"
      class="site-nav__brand"
    >
      <img
        v-if="navigationConfig.brandLogo"
        :src="navigationConfig.brandLogo"
        :alt="navigationConfig.brandMark"
        class="site-nav__brand-logo"
      />
      <span v-else>{{ navigationConfig.brandMark }}</span>
    </a>
    <nav class="site-nav__links">
      <a
        v-for="link in links"
        :key="link.targetId"
        :href="`#${link.targetId}`"
        class="font-sans-body site-nav__link"
        :class="{ 'site-nav__link--active': isActive(link.targetId) }"
        :aria-current="isActive(link.targetId) ? 'page' : undefined"
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
  color: var(--color-white);
  text-decoration: none;
  text-shadow: v-bind(textShadow);
  pointer-events: auto;
  min-height: 44px;
  display: flex;
  align-items: center;
}

.site-nav__brand-logo {
  height: 44px;
  width: auto;
  max-width: 220px;
  object-fit: contain;
  display: block;
}

.site-nav__links {
  display: flex;
  gap: 32px;
}

.site-nav__link {
  font-size: 13px;
  letter-spacing: 0.15em;
  color: var(--color-white-85);
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

.site-nav__link:hover,
.site-nav__link:focus-visible,
.site-nav__link--active {
  color: var(--color-white);
  text-decoration: underline;
  text-underline-offset: 4px;
}

.site-nav__brand:focus-visible {
  outline: 1px solid var(--color-white-50);
  outline-offset: 4px;
}
</style>
