<script setup lang="ts">
import { footerConfig } from '../config'

const hasContent = footerConfig.visionText || footerConfig.brandName || footerConfig.columns.length > 0

const onLinkEnter = (e: MouseEvent) => {
  ;(e.target as HTMLElement).style.opacity = '1'
}
const onLinkLeave = (e: MouseEvent) => {
  ;(e.target as HTMLElement).style.opacity = '0.6'
}
</script>

<template>
  <footer
    v-if="hasContent"
    id="footer"
    style="
      position: relative;
      width: 100%;
      background: #050A0F;
      z-index: 4;
      overflow: hidden;
    "
  >
    <div
      v-if="footerConfig.videoPath"
      style="position: absolute; inset: 0; opacity: 0.15; z-index: 0"
    >
      <video
        autoplay
        loop
        muted
        playsinline
        style="width: 100%; height: 100%; object-fit: cover"
      >
        <source :src="footerConfig.videoPath" type="video/mp4" />
      </video>
    </div>

    <div
      style="position: relative; z-index: 1; padding: 20vh 8vw 8vh"
    >
      <div v-if="footerConfig.visionText" style="max-width: 720px; margin-bottom: 120px">
        <p
          class="font-serif-display"
          style="
            font-size: 17px;
            font-weight: 300;
            line-height: 2.2;
            color: rgba(237,232,228,0.75);
            letter-spacing: 0.02em;
          "
        >
          {{ footerConfig.visionText }}
        </p>
      </div>

      <div
        v-if="footerConfig.columns.length > 0"
        style="
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 48px;
          padding-bottom: 60px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        "
      >
        <div v-for="col in footerConfig.columns" :key="col.heading">
          <p
            class="font-sans-body"
            style="
              font-size: 11px;
              letter-spacing: 0.25em;
              color: rgba(237,232,228,0.3);
              text-transform: uppercase;
              margin-bottom: 16px;
            "
          >
            {{ col.heading }}
          </p>
          <div style="display: flex; flex-direction: column; gap: 8px">
            <template v-for="(entry, idx) in col.entries" :key="idx">
              <a
                v-if="entry.href"
                :href="entry.href"
                style="
                  color: #EDE8E4;
                  opacity: 0.6;
                  font-size: 15px;
                  text-decoration: none;
                  line-height: 1.8;
                  transition: opacity 0.4s;
                  white-space: pre-line;
                "
                @mouseenter="onLinkEnter"
                @mouseleave="onLinkLeave"
              >
                {{ entry.text }}
              </a>
              <span
                v-else
                style="
                  color: #EDE8E4;
                  opacity: 0.6;
                  font-size: 15px;
                  line-height: 1.8;
                  white-space: pre-line;
                "
              >
                {{ entry.text }}
              </span>
            </template>
          </div>
        </div>
      </div>

      <div
        style="
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 32px;
        "
      >
        <p
          v-if="footerConfig.brandName"
          class="font-serif-display"
          style="
            font-size: 16px;
            letter-spacing: 0.15em;
            color: rgba(237,232,228,0.5);
          "
        >
          {{ footerConfig.brandName }}
        </p>
        <p
          v-if="footerConfig.copyright"
          class="font-sans-body"
          style="
            font-size: 12px;
            color: rgba(237,232,228,0.25);
          "
        >
          {{ footerConfig.copyright }}
        </p>
      </div>
    </div>
  </footer>
</template>
