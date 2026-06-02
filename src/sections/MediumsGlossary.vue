<script setup lang="ts">
import { ref, computed } from 'vue'
import { mediumsConfig } from '../config'
import GooeyTextRow from '../components/GooeyTextRow.vue'

const mediums = mediumsConfig.items
const hoveredIndex = ref<number | null>(null)
const hovered = computed(() => {
  return hoveredIndex.value !== null ? mediums[hoveredIndex.value] : null
})
</script>

<template>
  <section
    v-if="mediums.length > 0"
    id="mediums"
    class="mediums-glossary"
  >
    <!-- Left — titles -->
    <div class="mediums-glossary__left">
      <p class="font-sans-body mediums-glossary__label">
        {{ mediumsConfig.sectionLabel }}
      </p>
      <GooeyTextRow
        v-for="(item, idx) in mediums"
        :key="idx"
        :item="item"
        :filter-id="`goo-suliu-${idx}`"
        @hover="hoveredIndex = idx"
        @leave-hover="hoveredIndex = null"
        @touchstart="hoveredIndex = idx"
        @touchend="hoveredIndex = null"
      />
    </div>

    <!-- Right — description on hover -->
    <div class="mediums-glossary__right">
      <div
        class="mediums-glossary__description"
        :style="{
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateY(0)' : 'translateY(12px)'
        }"
      >
        <template v-if="hovered">
          <p class="font-sans-body mediums-glossary__hover-en">
            {{ hovered.en }}
          </p>
          <p class="font-sans-body mediums-glossary__hover-desc">
            {{ hovered.description }}
          </p>
        </template>
      </div>
    </div>
  </section>
</template>

<style scoped>
.mediums-glossary {
  position: relative;
  width: 100%;
  min-height: 80vh;
  background: #050A0F;
  z-index: 4;
  display: flex;
  padding: 16vh 8vw;
  gap: 8vw;
}

.mediums-glossary__left {
  flex: 0 0 50%;
}

.mediums-glossary__label {
  font-size: 12px;
  letter-spacing: 0.3em;
  color: rgba(237,232,228,0.35);
  text-transform: uppercase;
  margin-bottom: 48px;
}

.mediums-glossary__right {
  flex: 1 1 50%;
  display: flex;
  align-items: center;
  position: relative;
}

.mediums-glossary__description {
  max-width: 420px;
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.mediums-glossary__hover-en {
  font-size: 12px;
  letter-spacing: 0.25em;
  color: #30B0D0;
  text-transform: uppercase;
  margin-bottom: 16px;
}

.mediums-glossary__hover-desc {
  font-size: 22px;
  line-height: 2;
  color: rgba(237,232,228,0.65);
  font-weight: 300;
}

@media (max-width: 768px) {
  .mediums-glossary {
    flex-direction: column;
    padding: 10vh 6vw;
    gap: 6vh;
  }
  .mediums-glossary__left,
  .mediums-glossary__right {
    flex: none;
    width: 100%;
  }
  .mediums-glossary__label {
    margin-bottom: 24px;
  }
  .mediums-glossary__hover-desc {
    font-size: 18px;
  }
}
</style>
