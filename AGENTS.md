# 至禾设计 (KISSH Design) 品牌展示网站 — Agent 指南

本文件面向 AI 编码助手。阅读前请默认不了解本项目；以下信息均基于仓库实际内容整理。

---

## 1. 项目概述

这是一个为 **至禾设计（KISSH Design）** 打造的高端室内设计品牌展示网站，核心目标是：

- 以视觉语言传递「极简主义与东方侘寂美学」的设计哲学
- 通过沉浸式作品集展示设计实力
- 在首屏建立高端、克制、可信赖的品牌印象
- 引导潜在客户产生咨询/联系行为

产品定义与品牌调性详见 [`PRODUCT.md`](./PRODUCT.md)。README（[`README.md`](./README.md)）仅为 Vite + Vue 3 模板说明，不包含业务信息。

站点语言：**中文（zh-CN）**，部分区域使用英文标签。

### 关键配置

| 文件 | 作用 |
|------|------|
| `package.json` | 依赖、脚本、项目元信息 |
| `vite.config.ts` | Vite + Vue + Tailwind CSS v4 插件；手动代码分割 |
| `vitest.config.ts` | 单元/组件测试配置 |
| `playwright.config.ts` | E2E 测试配置 |
| `tsconfig.json` / `tsconfig.app.json` / `tsconfig.node.json` | TypeScript 项目引用配置 |
| `index.html` | HTML 入口，加载 Google Fonts，声明 dark color-scheme |
| `src/config.ts` | 所有文案、类型、项目数据的中央配置 |

---

## 2. 技术栈

- **框架**：Vue 3（Composition API，`<script setup lang="ts">`）
- **语言**：TypeScript ~6.0.2
- **构建工具**：Vite ^8.0.12
- **CSS 框架**：Tailwind CSS ^4.3.0，通过 `@tailwindcss/vite` 集成
- **动画**：GSAP ^3.15.0 + ScrollTrigger
- **3D / WebGL**：Three.js ^0.184.0（自定义 Shader 流体背景）
- **平滑滚动**：Lenis（`@studio-freight/lenis` ^1.0.42）
- **单元测试**：Vitest ^3.0.0 + `@vue/test-utils` ^2.4.10 + `happy-dom`
- **E2E 测试**：Playwright ^1.60.0
- **字体**：Google Fonts — Noto Sans SC / Noto Serif SC

---

## 3. 代码组织

```
src/
├── main.ts                    # 应用启动入口
├── App.vue                    # 根布局、平滑滚动、项目详情状态
├── config.ts                  # 所有内容配置与 TypeScript 类型
├── style.css                  # 全局样式、Tailwind 引入、CSS Token
├── vite-env.d.ts              # Vite 客户端类型
├── components/                # 可复用 UI 组件
│   ├── Navigation.vue
│   ├── FluidBackground.vue    # WebGL 流体背景（异步加载）
│   └── GooeyTextRow.vue       # SVG 文字 gooey 过渡效果
├── sections/                  # 页面区块
│   ├── HeroField.vue
│   ├── PhilosophyCarousel.vue
│   ├── ImmersiveGallery.vue
│   ├── MediumsGlossary.vue
│   └── Footer.vue
├── pages/                     # 全屏视图
│   └── ProjectDetail.vue
└── __tests__/                 # 单元/组件测试
    ├── setup.ts
    ├── config.spec.ts
    └── components/
        ├── Navigation.spec.ts
        └── Footer.spec.ts
```

### 架构要点

- **单页应用（SPA）**，没有安装 Vue Router。页面内导航使用锚点链接（`#hero-section`、`#philosophy`、`#gallery`、`#mediums`、`#footer`）。
- **项目详情页**通过 `App.vue` 中的 `selectedProjectId` 状态原地切换；返回首页时通过 `window.scrollTo` 恢复之前保存的滚动位置。
- **流体背景**通过 `defineAsyncComponent` 异步加载，并在 `App.vue` 中通过 `IntersectionObserver` 监测 `hero-section`、`philosophy`、`gallery` 的可见性来启停渲染，降低 GPU 占用。
- **平滑滚动**使用 Lenis，并与 GSAP `ScrollTrigger` 同步；检测到 `prefers-reduced-motion: reduce` 时降低/禁用平滑滚动。

---

## 4. 构建与运行命令

```bash
# 安装依赖
npm install

# 开发服务器（默认 http://localhost:5173）
npm run dev

# 生产构建，输出到 dist/
npm run build

# 预览生产构建
npm run preview

# 单元测试（Vitest watch 模式）
npm run test

# 单元测试（单次运行）
npm run test:run

# 单元测试（UI 模式）
npm run test:ui

# E2E 测试（Playwright）
npm run e2e

# E2E 测试（Playwright UI 模式）
npm run e2e:ui
```

### Vite 构建配置摘要

- 插件：`@vitejs/plugin-vue`、`@tailwindcss/vite`
- 手动分包：
  - `three`
  - `gsap`
  - `lenis`
- `chunkSizeWarningLimit: 500`
- `optimizeDeps.include`: `['three', 'gsap', '@studio-freight/lenis']`

---

## 5. 代码风格指南

### Vue / TypeScript

- 统一使用 **Composition API** + `<script setup lang="ts">`。
- 类型定义集中在 `src/config.ts`；新增内容字段优先扩展该文件中的接口与配置对象。
- 组件样式使用 **`<style scoped>`**。
- 命名类名时使用 BEM-like 前缀，例如 `.site-nav__link`、`.hero-field__cta`。
- 避免在组件中硬编码文案；文案应来自 `config.ts` 的对应配置对象。

### 样式

- Tailwind CSS v4 在 `src/style.css` 中通过 `@import "tailwindcss";` 引入。
- 设计 Token 通过 CSS 自定义属性管理，例如：
  - `--color-bg-primary: #050A0F`
  - `--color-text-primary: #EDE8E4`
  - `--color-accent: #30B0D0`
- 站点为**深色主题**，禁止引入高饱和、模板化配色。
- 字体类：
  - `.font-serif-display` → Noto Serif SC
  - `.font-sans-body` → Noto Sans SC
- 移动端断点：`max-width: 768px`。

### 交互与动效

- 所有动画必须响应 `prefers-reduced-motion: reduce`：
  - 已在 `App.vue`（Lenis）、`FluidBackground.vue`（渲染循环）、`PhilosophyCarousel.vue`（旋转环）、`GooeyTextRow.vue`（hover 动画）中处理。
  - 全局 CSS 在 `style.css` 的 `@media (prefers-reduced-motion: reduce)` 中强制缩短动画时长。
- 关键交互元素（按钮、链接）需有清晰的 `:focus-visible` 样式。
- 图片必须有描述性 `alt` 文本。
- 可点击的 `div` 需设置 `tabindex="0"`、`role="button"`，并支持 `keydown.enter` / `keydown.space`。
- 链接/按钮的最小点击高度建议保持 `44px`。

### 图片与静态资源

- 图片统一放在 `public/images/`，代码中引用相对路径，例如 `images/project-1.jpg`。
- Logo：`public/images/topLeftLogo.png`（导航）、`public/images/centerLogo.png`（Hero）。
- Favicon：`public/favicon.svg`。

---

## 6. 测试说明

### 单元/组件测试（Vitest）

- 配置：`vitest.config.ts`
- 环境：`happy-dom`
- 全局 API：`globals: true`
- 初始化文件：`src/__tests__/setup.ts`
- 测试匹配：`src/**/*.spec.ts`

当前已有测试覆盖：

- `src/__tests__/config.spec.ts`：校验所有配置对象及 `getProjectById`
- `src/__tests__/components/Navigation.spec.ts`：导航 Logo、链接、href
- `src/__tests__/components/Footer.spec.ts`：页脚文案、栏目、链接

运行示例：

```bash
npm run test:run
```

### E2E 测试（Playwright）

- 配置：`playwright.config.ts`
- 测试目录：`e2e/`
- 浏览器：Desktop Chromium
- Base URL：`http://localhost:5173`
- 会自动启动 `npm run dev` 作为 webServer

当前测试：

- `e2e/navigation.spec.ts`：首页导航、Hero 内容、画廊卡片、进入项目详情。
- 其中「详情页点击返回回到首页」用例标记为 `test.fixme`，原因：Lenis 平滑滚动与自动化测试中的 `window.scrollTo` 行为存在冲突，后续可优化 `handleBack` 的滚动恢复逻辑。

运行示例：

```bash
npm run e2e
npm run e2e:ui
```

### 新增测试建议

- 新增配置字段时，在 `config.spec.ts` 中补充断言。
- 新增可交互组件时，优先编写组件级 Vitest 测试，覆盖渲染、事件、边界条件。
- 涉及滚动/动画的关键路径可补充 Playwright E2E，但需注意 `prefers-reduced-motion` 与 Lenis 对自动化断言的影响。

---

## 7. 部署说明

- 本项目是纯前端静态 SPA，部署产物为 `dist/` 目录。
- 构建命令：
  ```bash
  npm run build
  ```
- 可将 `dist/` 部署到任意静态托管服务（Netlify、Vercel、GitHub Pages、CDN 等）。
- 由于使用锚点导航，无需服务器端路由。
- 若未来增加路由，请确保服务器对所有路径回退到 `index.html`。

---

## 8. 安全注意事项

- **纯静态站点**：无后端、无认证、无数据库，不处理敏感用户输入。
- **WebGL/Three.js**：`FluidBackground.vue` 中的 Shader 仅接收鼠标指针坐标和固定 uniform，不执行任何动态代码或外部输入，无 XSS 风险。
- **外部资源**：页面从 `https://fonts.googleapis.com` 加载字体；请确保部署环境允许访问该域名，或在 CSP 中正确放行。
- **无环境密钥**：仓库中不存在 `.env` 或 API Key；静态资源均直接放在 `public/`。
- **依赖安全**：建议定期运行 `npm audit`，并及时升级 `three`、`gsap`、`vue` 等核心依赖。

---

## 9. 给 Agent 的实操提示

- **改文案**：优先改 `src/config.ts`，而不是组件模板。
- **新增项目**：在 `src/config.ts` 的 `galleryConfig.projects` 中追加项目数据，并将图片放入 `public/images/`。
- **新增区块**：在 `src/sections/` 新建组件，在 `App.vue` 中引入并放置到合适位置；保持 `z-index` 与现有层级一致。
- **改导航/页脚**：数据来自 `navigationConfig` / `footerConfig`。
- **动效修改**：必须同时考虑 `prefers-reduced-motion` 分支。
- **流体背景修改**：保留 `isActive` prop 和 `IntersectionObserver` 逻辑，避免持续全屏渲染导致性能问题。
- **避免引入 Vue Router**：当前架构没有路由；若确需路由，应评估对平滑滚动、锚点和 E2E 测试的影响。
