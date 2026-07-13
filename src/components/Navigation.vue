<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue'
import { navigationConfig } from '../config'

const props = defineProps<{
  activeTarget?: string
}>()

const textShadow = '0 2px 24px var(--color-shadow)'
const links = navigationConfig.links

const isActive = (targetId: string) => props.activeTarget === targetId

const isMenuOpen = ref(false)
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
const closeMenu = () => {
  isMenuOpen.value = false
}

const handleClickOutside = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  if (!target.closest('.site-nav')) {
    closeMenu()
  }
}

const handleNavKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && isMenuOpen.value) {
    e.preventDefault()
    closeMenu()
  }
}

watch(isMenuOpen, (open) => {
  if (open) {
    document.addEventListener('click', handleClickOutside)
    window.addEventListener('keydown', handleNavKeydown)
  } else {
    document.removeEventListener('click', handleClickOutside)
    window.removeEventListener('keydown', handleNavKeydown)
  }
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('keydown', handleNavKeydown)
})
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

    <button
      class="site-nav__menu-toggle"
      type="button"
      aria-label="导航菜单"
      :aria-expanded="isMenuOpen"
      aria-controls="site-nav-menu"
      @click="toggleMenu"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <circle cx="12" cy="6" r="2.5" />
        <circle cx="12" cy="18" r="2.5" />
      </svg>
    </button>

    <div
      id="site-nav-menu"
      class="site-nav__menu-panel"
      :class="{ 'site-nav__menu-panel--open': isMenuOpen }"
    >
      <a
        v-for="link in links"
        :key="link.targetId"
        :href="`#${link.targetId}`"
        class="font-sans-body site-nav__menu-link"
        :class="{ 'site-nav__menu-link--active': isActive(link.targetId) }"
        :aria-current="isActive(link.targetId) ? 'page' : undefined"
        @click="closeMenu"
      >
        {{ link.label }}
      </a>
    </div>
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

.site-nav__menu-toggle {
  display: none;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: var(--color-white-08);
  border: 1px solid var(--color-border-light);
  border-radius: 50%;
  color: var(--color-white);
  cursor: pointer;
  outline: none;
  pointer-events: auto;
  transition: background 0.3s ease, border-color 0.3s ease;
}

.site-nav__menu-toggle:hover,
.site-nav__menu-toggle:focus-visible {
  background: var(--color-white-18);
  border-color: var(--color-white-50);
}

.site-nav__menu-panel {
  display: none;
  position: absolute;
  top: calc(100% - 8px);
  right: 4vw;
  min-width: 160px;
  flex-direction: column;
  background: var(--color-bg-glass);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-md);
  padding: 8px 0;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  pointer-events: auto;
  z-index: 110;
}

.site-nav__menu-panel--open {
  display: flex;
}

.site-nav__menu-link {
  padding: 12px 20px;
  font-size: 14px;
  letter-spacing: 0.1em;
  color: var(--color-white-85);
  text-decoration: none;
  text-transform: uppercase;
  transition: color 0.3s ease, background-color 0.3s ease;
  outline: none;
  white-space: nowrap;
  pointer-events: auto;
}

.site-nav__menu-link:hover,
.site-nav__menu-link:focus-visible,
.site-nav__menu-link--active {
  color: var(--color-white);
  background-color: var(--color-white-08);
}

@media (max-width: 768px) {
  .site-nav {
    padding: 16px 5vw;
  }

  .site-nav__brand-logo {
    height: 36px;
    max-width: 160px;
  }

  .site-nav__links {
    display: none;
  }

  .site-nav__menu-toggle {
    display: flex;
  }

  .site-nav__menu-panel {
    right: 5vw;
  }
}
</style>
