<script setup lang="ts">
import { aboutConfig } from '../config'

const steps = aboutConfig.steps
</script>

<template>
  <section
    class="about-section"
  >
    <div class="about-section__container">
      <p class="font-sans-body about-section__label">
        {{ aboutConfig.sectionLabel }}
      </p>

      <div class="about-section__intro">
        <h2 class="font-serif-display about-section__title">
          {{ aboutConfig.title }}
        </h2>
        <p class="font-sans-body about-section__body">
          {{ aboutConfig.intro }}
        </p>
        <div class="about-section__keywords">
          <span
            v-for="(keyword, idx) in aboutConfig.keywords"
            :key="idx"
            class="font-sans-body about-section__keyword"
          >
            {{ keyword }}
          </span>
        </div>
      </div>

      <div class="about-section__timeline">
        <div
          v-for="(step, idx) in steps"
          :key="idx"
          class="about-section__step"
        >
          <div class="about-section__step-marker">
            <span class="about-section__step-number">{{ String(idx + 1).padStart(2, '0') }}</span>
            <div class="about-section__step-line" />
          </div>
          <div class="about-section__step-content">
            <h3 class="font-serif-display about-section__step-title">
              {{ step.phase }}
            </h3>
            <ul class="about-section__step-list">
              <li
                v-for="(item, itemIdx) in step.items"
                :key="itemIdx"
                class="font-sans-body about-section__step-item"
              >
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-section {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: var(--color-bg-primary);
  z-index: 4;
  padding: 16vh 8vw;
}

.about-section__container {
  max-width: 1200px;
  margin: 0 auto;
}

.about-section__label {
  font-size: 12px;
  letter-spacing: 0.3em;
  color: var(--color-text-faint);
  text-transform: uppercase;
  margin-bottom: 48px;
}

.about-section__intro {
  margin-bottom: 80px;
}

.about-section__title {
  font-size: clamp(28px, 3vw, 42px);
  font-weight: 300;
  line-height: 1.35;
  color: var(--color-white);
  margin-bottom: 24px;
}

.about-section__body {
  font-size: 15px;
  line-height: 2;
  color: var(--color-text-secondary);
  font-weight: 300;
  max-width: 720px;
  margin-bottom: 28px;
}

.about-section__keywords {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.about-section__keyword {
  display: inline-block;
  padding: 8px 16px;
  border: 1px solid var(--color-border-light);
  border-radius: 40px;
  font-size: 12px;
  letter-spacing: 0.1em;
  color: var(--color-white-85);
  text-transform: uppercase;
}

.about-section__timeline {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.about-section__step {
  display: flex;
  gap: 24px;
  padding-bottom: 48px;
}

.about-section__step:last-child {
  padding-bottom: 0;
}

.about-section__step:last-child .about-section__step-line {
  display: none;
}

.about-section__step-marker {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 0 0 48px;
}

.about-section__step-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border: 1px solid var(--color-accent-subtle);
  border-radius: 50%;
  font-family: 'Noto Sans SC', 'Helvetica Neue', Arial, sans-serif;
  font-size: 13px;
  letter-spacing: 0.05em;
  color: var(--color-accent);
}

.about-section__step-line {
  width: 1px;
  flex: 1 1 auto;
  background: var(--color-border);
  margin-top: 16px;
}

.about-section__step-content {
  flex: 1 1 auto;
  padding-top: 8px;
}

.about-section__step-title {
  font-size: 22px;
  font-weight: 300;
  line-height: 1.4;
  color: var(--color-white);
  margin-bottom: 16px;
}

.about-section__step-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 8px 32px;
}

.about-section__step-item {
  position: relative;
  padding-left: 16px;
  font-size: 14px;
  line-height: 1.8;
  color: var(--color-text-tertiary);
  font-weight: 300;
}

.about-section__step-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 10px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--color-accent-soft);
}

@media (max-width: 768px) {
  .about-section {
    padding: 10vh 6vw;
  }

  .about-section__label {
    margin-bottom: 24px;
  }

  .about-section__intro {
    margin-bottom: 48px;
  }

  .about-section__title {
    font-size: clamp(24px, 6vw, 32px);
  }

  .about-section__body {
    font-size: 14px;
    line-height: 1.9;
  }

  .about-section__step {
    gap: 16px;
    padding-bottom: 32px;
  }

  .about-section__step-marker {
    flex: 0 0 40px;
  }

  .about-section__step-number {
    width: 40px;
    height: 40px;
    font-size: 12px;
  }

  .about-section__step-title {
    font-size: 18px;
  }

  .about-section__step-list {
    grid-template-columns: 1fr;
    gap: 6px;
  }
}
</style>
