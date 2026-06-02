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
    style="
      position: relative;
      width: 100%;
      min-height: 80vh;
      background: #050A0F;
      z-index: 4;
      display: flex;
      padding: 16vh 8vw;
      gap: 8vw;
    "
  >
    <!-- Left — titles -->
    <div style="flex: 0 0 50%">
      <p
        class="font-sans-body"
        style="
          font-size: 12px;
          letter-spacing: 0.3em;
          color: rgba(237,232,228,0.35);
          text-transform: uppercase;
          margin-bottom: 48px;
        "
      >
        {{ mediumsConfig.sectionLabel }}
      </p>
      <GooeyTextRow
        v-for="(item, idx) in mediums"
        :key="idx"
        :item="item"
        :filter-id="`goo-suliu-${idx}`"
        @hover="hoveredIndex = idx"
        @leave-hover="hoveredIndex = null"
      />
    </div>

    <!-- Right — description on hover -->
    <div
      style="
        flex: 1 1 50%;
        display: flex;
        align-items: center;
        position: relative;
      "
    >
      <div
        style="
          max-width: 420px;
          transition: opacity 0.4s ease, transform 0.4s ease;
        "
        :style="{
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateY(0)' : 'translateY(12px)'
        }"
      >
        <template v-if="hovered">
          <p
            class="font-sans-body"
            style="
              font-size: 12px;
              letter-spacing: 0.25em;
              color: #30B0D0;
              text-transform: uppercase;
              margin-bottom: 16px;
            "
          >
            {{ hovered.en }}
          </p>
          <p
            class="font-sans-body"
            style="
              font-size: 22px;
              line-height: 2;
              color: rgba(237,232,228,0.65);
              font-weight: 300;
            "
          >
            {{ hovered.description }}
          </p>
        </template>
      </div>
    </div>
  </section>
</template>
