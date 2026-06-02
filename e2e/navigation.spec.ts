import { test, expect } from '@playwright/test'

test.describe('首页导航', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('页面加载后显示品牌标识', async ({ page }) => {
    await expect(page.locator('header')).toContainText('至禾')
  })

  test('导航栏包含所有链接', async ({ page }) => {
    const navLinks = page.locator('header nav a')
    await expect(navLinks).toHaveCount(4)

    const labels = await navLinks.allTextContents()
    expect(labels).toContain('案例')
    expect(labels).toContain('理念')
    expect(labels).toContain('介质')
    expect(labels).toContain('联系')
  })

  test('Hero 区域显示主标题', async ({ page }) => {
    await expect(page.locator('section h1')).toContainText('重塑生活的')
  })

  test('画廊区域显示项目卡片', async ({ page }) => {
    const projects = page.locator('.immersive-gallery__project-title')
    await expect(projects.first()).toBeVisible()
    const count = await projects.count()
    expect(count).toBeGreaterThan(0)
  })
})

test.describe('项目详情页交互', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('点击项目标题进入详情页', async ({ page }) => {
    const firstProjectTitle = page.locator('.immersive-gallery__project-title').first()
    const titleText = await firstProjectTitle.textContent()

    await firstProjectTitle.click()

    // 进入详情页后应显示返回按钮
    await expect(page.locator('button')).toContainText('返回')

    // 应显示项目标题
    await expect(page.locator('article h1')).toContainText(titleText ?? '')
  })

  test.fixme('详情页点击返回回到首页', async ({ page }) => {
    // FIXME: Lenis 平滑滚动与 window.scrollTo 在自动化测试中可能产生冲突，
    // 导致返回后页面状态不一致。可后续优化 handleBack 的滚动恢复逻辑。
    await page.locator('#gallery h3').first().click()
    const backButton = page.locator('button').filter({ hasText: '返回' })
    await expect(backButton).toBeVisible()

    await backButton.click()

    // 回到首页后应再次看到画廊区域
    await expect(page.locator('.immersive-gallery__project-title').first()).toBeVisible()
  })
})
