# AGENTS.md

`app-vue` 项目的 AI 智能体专用指南。本文档面向需要理解、修改或扩展本代码库的 AI 编程智能体。以下所有事实均源自实际的项目文件。

## 项目概述

`app-vue` 是 **至禾设计（KISSH Design）** 的品牌展示单页网站，至禾设计是一家高端室内空间设计工作室。这是一个无后端、无 Vue Router 的客户端 Vue 3 + TypeScript + Vite 单页应用（SPA）。

网站围绕暗黑、极简、东方侘寂美学设计。内容均为静态，并集中在 `src/config.ts` 中管理。导航通过页内锚点链接（`#sectionId`）实现；项目详情视图通过 `App.vue` 中的条件渲染呈现，而非路由切换。

核心产品目标（来自 `PRODUCT.md`）：
- 传达极简与东方侘寂美学的设计理念。
- 展示沉浸式的作品集。
- 在首屏内建立高端、克制、值得信赖的品牌印象。
- 通过页脚引导潜在客户进行咨询/联系。

## 技术栈

| 层级 | 技术 | 版本 / 说明 |
|---|---|---|
| 框架 | Vue 3 | `^3.5.34`，使用 Composition API 与 `<script setup lang="ts">` 单文件组件 |
| 语言 | TypeScript | `~6.0.2` |
| 构建工具 | Vite | `^8.0.12` |
| 样式 | Tailwind CSS v4 | `^4.3.0`，通过 `@tailwindcss/vite` 引入 |
| 3D / WebGL | Three.js | `^0.184.0`，在 `FluidBackground.vue` 中自定义 GLSL 流体模拟 |
| 动画 | GSAP + ScrollTrigger | `^3.15.0` |
| 平滑滚动 | Lenis | `@studio-freight/lenis ^1.0.42` |
| 单元测试 | Vitest | `^3.0.0`，配合 `@vue/test-utils` 与 `happy-dom` |
| 端到端测试 | Playwright | `@playwright/test ^1.60.0` |
| 字体 | Google Fonts | `Noto Sans SC` 与 `Noto Serif SC` |

`package.json` 中设置了 `"type": "module"`，因此所有 `.js` / `.ts` 文件均按 ESM 处理。

## 项目结构

```
app-vue/
├── e2e/                          # Playwright 端到端测试
│   └── navigation.spec.ts
├── public/                       # 静态资源，构建时原样复制到 dist/
│   ├── favicon.svg
│   └── images/
│       ├── project-1.jpg
│       ├── project-2.jpg
│       ├── project-3.jpg
│       └── project-4.jpg
├── src/
│   ├── __tests__/                # Vitest 单元测试
│   │   ├── setup.ts
│   │   ├── config.spec.ts
│   │   └── components/
│   │       ├── Footer.spec.ts
│   │       └── Navigation.spec.ts
│   ├── components/               # 可复用的 UI / 动画组件
│   │   ├── FluidBackground.vue   # Three.js WebGL 流体背景
│   │   ├── GooeyTextRow.vue      # SVG + GSAP 流体文字过渡
│   │   └── Navigation.vue        # 固定站点头部导航
│   ├── pages/                    # 全屏详情页
│   │   └── ProjectDetail.vue
│   ├── sections/                 # 页面级滚动区块
│   │   ├── HeroField.vue
│   │   ├── PhilosophyCarousel.vue
│   │   ├── ImmersiveGallery.vue
│   │   ├── MediumsGlossary.vue
│   │   └── Footer.vue
│   ├── App.vue                   # 根组件，负责 Lenis + ScrollTrigger 编排
│   ├── config.ts                 # 所有站点内容、类型与 getProjectById()
│   ├── main.ts                   # Vue 应用入口
│   ├── style.css                 # Tailwind 引入 + 设计 token
│   └── vite-env.d.ts             # Vite 客户端类型
├── index.html                    # SPA 外壳，中文语言，字体预连接
├── package.json
├── vite.config.ts
├── vitest.config.ts
├── playwright.config.ts
├── tsconfig.json                 # 仅用于项目引用
├── tsconfig.app.json
└── tsconfig.node.json
```

### 架构模式

- **无全局状态库。** 所有状态均为组件内的本地 `ref` / `computed`。
- **无 Vue Router。** 主页使用锚点链接。项目详情通过设置 `App.vue` 中的 `selectedProjectId` 并条件渲染 `ProjectDetail.vue` 来展示。
- **内容集中管理。** 所有文案、项目数据、导航与类型均位于 `src/config.ts`。组件消费配置对象，不硬编码业务内容。
- **异步加载重组件。** `FluidBackground.vue` 使用 `defineAsyncComponent` 加载，以减小初始包体积。
- **代码分割。** `vite.config.ts` 将 `three`、`gsap` 与 `lenis` 拆分为独立 chunk。

## 构建与测试命令

所有命令均定义在 `package.json` 中：

```bash
# 开发服务器（Vite，默认 http://localhost:5173）
npm run dev

# 生产构建（输出到 dist/）
npm run build

# 本地预览生产构建
npm run preview

# 以监听模式运行单元测试
npm run test

# 单次运行单元测试（适合 CI）
npm run test:run

# 使用 Vitest UI 运行单元测试
npm run test:ui

# 运行 Playwright 端到端测试
npm run e2e

# 以 UI 模式运行 Playwright 端到端测试
npm run e2e:ui
```

### 构建说明

- `dist/` 由 `npm run build` 生成，并已在 `.gitignore` 中列出。工作树中可能已存在预构建的 `dist/`，请勿将其视为源码。
- `vite.config.ts` 手动对重依赖进行 chunk 拆分以优化缓存：
  - `three`
  - `gsap`
  - `lenis`（同时匹配 `@studio-freight/lenis` 与 `lenis`）
- `optimizeDeps.include` 预打包 `three`、`gsap` 与 `@studio-freight/lenis`。
- `chunkSizeWarningLimit` 设置为 `500`（kB）。

## 代码风格指南

- **单文件组件风格：** 所有 Vue 组件均使用 `<script setup lang="ts">`。
- **样式：** 组件样式几乎均为 `scoped`。Tailwind v4 工具类通过 `src/style.css` 全局可用。
- **CSS 变量 / Token：** 全局设计 token 定义在 `src/style.css` 中，例如：
  - `--color-bg-primary: #050A0F`
  - `--color-text-primary: #EDE8E4`
  - `--color-accent: #30B0D0`
- **类名规范：** 组件使用类似 BEM 的命名约定，例如 `.immersive-gallery__project-title`。
- **响应式断点：** 主要移动端断点为 `768px`；媒体查询内联在 scoped 样式中。
- **排版：** 标题使用 `'Noto Serif SC', Georgia, serif`；正文使用 `'Noto Sans SC', 'Helvetica Neue', Arial, sans-serif`。
- **CSS 与 JS 绑定：** 部分组件在 scoped CSS 中使用 `v-bind()` 将 JS 变量同步到样式值。
- **减少动画：** 所有动画较重的组件必须尊重 `prefers-reduced-motion: reduce`。`FluidBackground.vue`、`PhilosophyCarousel.vue`、`GooeyTextRow.vue` 与 `App.vue` 已有相关实现；新增动画时请遵循相同模式。
- **可访问性：** 保持语义化 HTML、图片使用描述性 `alt` 文本、可见的 `focus-visible` 样式，并为非原生按钮的交互元素提供键盘事件处理（`Enter` / `Space`）。

## 测试说明

### 单元测试（Vitest）

- 配置：`vitest.config.ts`
- 环境：`happy-dom`
- 已启用全局模式（每个文件无需导入 `describe`、`it`、`expect`）。
- 初始化文件：`src/__tests__/setup.ts`
- 测试匹配模式：`src/**/*.spec.ts`
- 测试中禁用 CSS 处理（`css: false`）。

当前单元测试：
- `src/__tests__/config.spec.ts` —— 校验所有配置对象与 `getProjectById()`。
- `src/__tests__/components/Navigation.spec.ts` —— 校验品牌渲染与锚点 `href` 值。
- `src/__tests__/components/Footer.spec.ts` —— 校验愿景文案、品牌名、版权信息、栏目与链接。

使用 `npm run test`（监听模式）或 `npm run test:run`（CI）运行。

### 端到端测试（Playwright）

- 配置：`playwright.config.ts`
- 测试目录：`e2e/`
- 浏览器：仅 Chromium（`Desktop Chrome`）。
- 基础 URL：`http://localhost:5173`
- Playwright 自动启动 `npm run dev` 作为 Web 服务器。
- CI 行为：当 `process.env.CI` 设置时，启用 `forbidOnly`、2 次重试、1 个 worker。
- 报告器：HTML（`playwright-report/index.html`）。

当前 E2E 测试（`e2e/navigation.spec.ts`）覆盖：
- 首页品牌可见性。
- 导航链接数量与标签。
- 主标题存在性。
- 画廊卡片渲染。
- 点击项目标题进入项目详情视图。
- 返回按钮流程目前标记为 `test.fixme`，原因是 Lenis 平滑滚动冲突。

使用 `npm run e2e` 或 `npm run e2e:ui` 运行。

### 已知的测试覆盖缺口

以下内容目前未被自动化测试覆盖：
- `FluidBackground.vue` 的 WebGL 渲染。
- GSAP / ScrollTrigger 动画行为。
- Lenis 平滑滚动交互。
- 响应式断点。
- 基础键盘导航之外的可访问性。

## 部署流程

- 项目生成标准的静态 Vite SPA。运行 `npm run build`，然后部署 `dist/` 内容即可。
- 仓库中 **没有 CI/CD 配置**（没有 `.github/workflows/`、没有 Docker、没有 `vercel.json` 或 `netlify.toml` 等平台专属配置文件）。
- 除 `playwright.config.ts` 中使用 `process.env.CI` 外，**没有使用其他环境变量**。不存在 `.env` 文件，代码中也不使用 `import.meta.env` 或 `VITE_*` 变量。
- 静态图片位于 `public/images/`，构建时原样复制到 `dist/images/`。
- `index.html` 通过 `preconnect` 从 `https://fonts.googleapis.com` 与 `https://fonts.gstatic.com` 加载 Google Fonts。

## 安全注意事项

### 已落实的良好实践

- 源码中未使用 `v-html`、`innerHTML`、`document.write`、`eval()` 或 `Function()`。
- 没有运行时网络请求（`fetch`、`axios`、`XMLHttpRequest`）；所有数据均为静态配置。
- 未从不受信任的输入动态注入 `href` / `src`。
- 图片均具有 `alt` 属性。
- 交互式自定义元素（画廊项、`GooeyTextRow`）使用了 `role="button"`、`tabindex="0"` 与键盘事件处理。
- `App.vue` 中提供了跳转到主内容的 skip link。

### 缺口与建议

- **未配置 Content-Security-Policy（CSP）** 元标签或响应头。
- **未配置安全响应头**，例如 `X-Frame-Options`、`X-Content-Type-Options`、`Referrer-Policy`。
- 外部资源（Google Fonts）加载未使用 Subresource Integrity（SRI）；动态 CSS 通常如此，但应予以记录。
- `playwright-report/` 与 `test-results/` 目前被 Git 追踪。它们属于构建/测试产物，通常应加入 `.gitignore`。
- `dist/` 已在 `.gitignore` 中，但可能已存在于工作树；CI 中应重新生成构建，而非依赖本地输出。
- `footerConfig.videoPath` 当前为空字符串，因此页脚 `<video>` 元素永远不会渲染。如果后续填充，请验证并清理来源 URL。

## 重要实现说明

- **Lenis + GSAP ScrollTrigger：** `App.vue` 初始化 Lenis 并通过 GSAP ticker 驱动。ScrollTrigger 已全局注册。新增滚动驱动动画时，请确保在 `onUnmounted` 中清理，并尊重 `prefers-reduced-motion`。
- **流体背景生命周期：** `App.vue` 通过 `IntersectionObserver` 观察 `FluidBackground.vue`。当 `#hero-section`、`#philosophy` 或 `#gallery` 可见时（`threshold: 0.05`），背景处于激活状态；项目详情打开时也会被强制激活。
- **项目详情滚动恢复：** 关闭项目详情时，`App.vue` 会在 `requestAnimationFrame` 中从保存的值恢复 `window.scrollY`。这是已知的 `test.fixme` E2E 问题的根源；修改导航或滚动行为时应谨慎处理。
- **Tailwind v4：** 项目使用 Tailwind CSS v4 与新 Vite 插件。除非有意迁移到 v4 之前的基于 CSS 的配置，否则请勿添加 `tailwind.config.js`。

## 常用参考

| 用途 | 文件 |
|---|---|
| 包脚本与依赖 | `package.json` |
| Vite 构建配置 | `vite.config.ts` |
| Vitest 配置 | `vitest.config.ts` |
| Playwright 配置 | `playwright.config.ts` |
| 站点内容与类型 | `src/config.ts` |
| 根组件 / 滚动编排 | `src/App.vue` |
| 全局样式与设计 token | `src/style.css` |
| SPA 外壳与字体 | `index.html` |
| 产品需求 | `PRODUCT.md` |
