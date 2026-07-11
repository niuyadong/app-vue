<script setup lang="ts">
import { servicesConfig } from '../config'

const categories = servicesConfig.categories
</script>

<template>
  <section
    class="services-section"
  >
    <div class="services-section__container">
      <p class="font-sans-body services-section__label">
        {{ servicesConfig.sectionLabel }}
      </p>
      <h2 class="font-serif-display services-section__title">
        {{ servicesConfig.title }}
      </h2>

      <div class="services-section__grid">
        <div
          v-for="(category, idx) in categories"
          :key="idx"
          class="services-section__card"
        >
          <h3 class="font-serif-display services-section__card-title">
            {{ category.title }}
          </h3>
          <ul class="services-section__card-list">
            <li
              v-for="(item, itemIdx) in category.items"
              :key="itemIdx"
              class="font-sans-body services-section__card-item"
            >
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.services-section {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: var(--color-bg-secondary);
  z-index: 4;
  padding: 16vh 8vw;
}

.services-section__container {
  max-width: 1200px;
  margin: 0 auto;
}

.services-section__label {
  font-size: 12px;
  letter-spacing: 0.3em;
  color: var(--color-text-faint);
  text-transform: uppercase;
  margin-bottom: 24px;
}

.services-section__title {
  font-size: clamp(28px, 3vw, 42px);
  font-weight: 300;
  line-height: 1.35;
  color: var(--color-white);
  margin-bottom: 64px;
}

.services-section__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.services-section__card {
  border: 1px solid var(--color-border);
  padding: 32px;
  transition: border-color 0.3s ease, background-color 0.3s ease;
}

.services-section__card:hover {
  border-color: var(--color-accent-subtle);
  background-color: var(--color-white-02);
}

.services-section__card-title {
  font-size: 20px;
  font-weight: 300;
  line-height: 1.4;
  color: var(--color-white);
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--color-border);
}

.services-section__card-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.services-section__card-item {
  position: relative;
  padding-left: 14px;
  font-size: 13px;
  line-height: 1.6;
  color: var(--color-text-tertiary);
  font-weight: 300;
}

.services-section__card-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 9px;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: var(--color-text-faint);
}

@media (max-width: 1024px) {
  .services-section__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .services-section {
    padding: 10vh 6vw;
  }

  .services-section__title {
    font-size: clamp(24px, 6vw, 32px);
    margin-bottom: 40px;
  }

  .services-section__grid {
    grid-template-columns: 1fr;
  }

  .services-section__card {
    padding: 24px;
  }

  .services-section__card-title {
    font-size: 18px;
  }
}
</style>
