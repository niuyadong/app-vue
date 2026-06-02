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
    class="site-footer"
  >
    <div
      v-if="footerConfig.videoPath"
      class="site-footer__video-bg"
    >
      <video
        autoplay
        loop
        muted
        playsinline
        class="site-footer__video"
      >
        <source :src="footerConfig.videoPath" type="video/mp4" />
      </video>
    </div>

    <div class="site-footer__content">
      <div v-if="footerConfig.visionText" class="site-footer__vision">
        <p
          class="font-serif-display site-footer__vision-text"
        >
          {{ footerConfig.visionText }}
        </p>
      </div>

      <div
        v-if="footerConfig.columns.length > 0"
        class="site-footer__columns"
      >
        <div v-for="col in footerConfig.columns" :key="col.heading">
          <p
            class="font-sans-body site-footer__col-heading"
          >
            {{ col.heading }}
          </p>
          <div class="site-footer__col-links">
            <template v-for="(entry, idx) in col.entries" :key="idx">
              <a
                v-if="entry.href"
                :href="entry.href"
                class="site-footer__link"
                @mouseenter="onLinkEnter"
                @mouseleave="onLinkLeave"
              >
                {{ entry.text }}
              </a>
              <span
                v-else
                class="site-footer__link-text"
              >
                {{ entry.text }}
              </span>
            </template>
          </div>
        </div>
      </div>

      <div class="site-footer__bottom">
        <p
          v-if="footerConfig.brandName"
          class="font-serif-display site-footer__brand"
        >
          {{ footerConfig.brandName }}
        </p>
        <p
          v-if="footerConfig.copyright"
          class="font-sans-body site-footer__copyright"
        >
          {{ footerConfig.copyright }}
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  position: relative;
  width: 100%;
  background: #050A0F;
  z-index: 4;
  overflow: hidden;
}

.site-footer__video-bg {
  position: absolute;
  inset: 0;
  opacity: 0.15;
  z-index: 0;
}

.site-footer__video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.site-footer__content {
  position: relative;
  z-index: 1;
  padding: 20vh 8vw 8vh;
}

.site-footer__vision {
  max-width: 720px;
  margin-bottom: 120px;
}

.site-footer__vision-text {
  font-size: 17px;
  font-weight: 300;
  line-height: 2.2;
  color: rgba(237,232,228,0.75);
  letter-spacing: 0.02em;
}

.site-footer__columns {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 48px;
  padding-bottom: 60px;
  border-bottom: 1px solid rgba(255,255,255,0.06);
}

.site-footer__col-heading {
  font-size: 11px;
  letter-spacing: 0.25em;
  color: rgba(237,232,228,0.65);
  text-transform: uppercase;
  margin-bottom: 16px;
}

.site-footer__col-links {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.site-footer__link {
  color: #EDE8E4;
  opacity: 0.75;
  font-size: 15px;
  text-decoration: none;
  line-height: 1.8;
  transition: opacity 0.4s;
  white-space: pre-line;
  min-height: 44px;
  display: flex;
  align-items: center;
}

.site-footer__link-text {
  color: #EDE8E4;
  opacity: 0.75;
  font-size: 15px;
  line-height: 1.8;
  white-space: pre-line;
  min-height: 44px;
  display: flex;
  align-items: center;
}

.site-footer__bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 32px;
}

.site-footer__brand {
  font-size: 16px;
  letter-spacing: 0.15em;
  color: rgba(237,232,228,0.5);
}

.site-footer__copyright {
  font-size: 12px;
  color: rgba(237,232,228,0.45);
}
</style>
