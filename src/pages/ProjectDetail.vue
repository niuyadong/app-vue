<script setup lang="ts">
import { projectDetailConfig } from '../config'
import type { ProjectData } from '../config'

const props = defineProps<{
  project: ProjectData
}>()

const emit = defineEmits<{
  back: []
}>()

const textShadow = '0 2px 24px rgba(0,0,0,0.45)'
</script>

<template>
  <div
    style="
      position: relative;
      z-index: 10;
      min-height: 100vh;
      width: 100%;
      color: #ffffff;
    "
  >
    <!-- Top bar -->
    <div
      style="
        position: sticky;
        top: 0;
        z-index: 20;
        padding: 28px 4vw;
        display: flex;
        justify-content: space-between;
        align-items: center;
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        background: rgba(5,10,15,0.25);
      "
    >
      <button
        class="font-sans-body"
        style="
          background: transparent;
          border: 1px solid rgba(255,255,255,0.4);
          color: #ffffff;
          font-size: 11px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          padding: 10px 22px;
          border-radius: 30px;
          cursor: pointer;
          text-shadow: v-bind(textShadow);
        "
        @click="emit('back')"
      >
        {{ projectDetailConfig.backLabel || '←' }}
      </button>
      <div
        class="font-sans-body"
        style="
          font-size: 10px;
          letter-spacing: 0.3em;
          color: rgba(255,255,255,0.65);
          text-transform: uppercase;
          text-shadow: v-bind(textShadow);
        "
      >
        {{ project.id }} / {{ project.year }}
      </div>
    </div>

    <!-- Content — left article / right image -->
    <div
      style="
        display: grid;
        grid-template-columns: 1.2fr 1fr;
        gap: 6vw;
        padding: 6vh 5vw 12vh;
        align-items: start;
      "
    >
      <!-- Left — article -->
      <article style="max-width: 560px">
        <div
          class="font-sans-body"
          style="
            font-size: 10px;
            letter-spacing: 0.3em;
            color: rgba(255,255,255,0.6);
            text-transform: uppercase;
            margin-bottom: 18px;
            text-shadow: v-bind(textShadow);
          "
        >
          {{ project.location }} · {{ project.year }}
        </div>
        <h1
          class="font-serif-display"
          style="
            font-size: clamp(36px, 5vw, 72px);
            font-weight: 200;
            letter-spacing: 0.06em;
            line-height: 1.1;
            margin: 0;
            margin-bottom: 24px;
            color: #ffffff;
            text-shadow: v-bind(textShadow);
          "
        >
          {{ project.title }}
        </h1>
        <p
          class="font-serif-display"
          style="
            font-size: clamp(16px, 1.4vw, 20px);
            font-weight: 300;
            line-height: 1.6;
            color: rgba(255,255,255,0.82);
            font-style: italic;
            margin: 0;
            margin-bottom: 48px;
            text-shadow: v-bind(textShadow);
          "
        >
          {{ project.subtitle }}
        </p>

        <!-- Meta rows -->
        <div
          style="
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-bottom: 48px;
            padding-top: 20px;
            padding-bottom: 24px;
            border-top: 1px solid rgba(255,255,255,0.18);
            border-bottom: 1px solid rgba(255,255,255,0.18);
          "
        >
          <div
            v-for="m in project.meta"
            :key="m.label"
            style="display: flex; justify-content: space-between; gap: 20px"
          >
            <span
              class="font-sans-body"
              style="
                font-size: 10px;
                letter-spacing: 0.25em;
                color: rgba(255,255,255,0.55);
                text-transform: uppercase;
                text-shadow: v-bind(textShadow);
              "
            >
              {{ m.label }}
            </span>
            <span
              class="font-sans-body"
              style="
                font-size: 12px;
                letter-spacing: 0.12em;
                color: rgba(255,255,255,0.88);
                text-align: right;
                text-shadow: v-bind(textShadow);
              "
            >
              {{ m.value }}
            </span>
          </div>
        </div>

        <!-- Body paragraphs -->
        <div style="display: flex; flex-direction: column; gap: 24px">
          <p
            v-for="(p, idx) in project.paragraphs"
            :key="idx"
            class="font-sans-body"
            style="
              font-size: 15px;
              line-height: 2;
              font-weight: 300;
              color: rgba(255,255,255,0.82);
              margin: 0;
              text-shadow: v-bind(textShadow);
            "
          >
            {{ p }}
          </p>
        </div>
      </article>

      <!-- Right — image, sticky so it stays in view while article scrolls -->
      <div
        style="
          position: sticky;
          top: 120px;
          width: 100%;
          max-width: 420px;
          justify-self: center;
        "
      >
        <div
          style="
            width: 100%;
            aspect-ratio: 1024 / 1536;
            overflow: hidden;
          "
        >
          <img
            :src="project.image"
            :alt="project.title"
            style="
              width: 100%;
              height: 100%;
              object-fit: cover;
              display: block;
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>
