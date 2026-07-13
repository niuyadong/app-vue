import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Navigation from '../../components/Navigation.vue'
import { navigationConfig } from '../../config'

const expectedHrefs = navigationConfig.links.map((link) => `#${link.targetId}`)

describe('Navigation', () => {
  it('renders brand logo image', () => {
    const wrapper = mount(Navigation)
    const logo = wrapper.find('.site-nav__brand-logo')
    expect(logo.exists()).toBe(true)
    expect(logo.attributes('src')).toBe(navigationConfig.brandLogo)
    expect(logo.attributes('alt')).toBe('至禾')
  })

  it('renders all navigation links', () => {
    const wrapper = mount(Navigation)
    const links = wrapper.findAll('nav a')
    expect(links.length).toBeGreaterThan(0)

    const labels = links.map((link) => link.text())
    expect(labels).toContain('首页')
    expect(labels).toContain('关于我们')
    expect(labels).toContain('服务')
    expect(labels).toContain('案例')
    expect(labels).toContain('联系')
  })

  it('links have correct href attributes', () => {
    const wrapper = mount(Navigation)
    const links = wrapper.findAll('nav a')

    expect(links.length).toBe(expectedHrefs.length)
    links.forEach((link, index) => {
      expect(link.attributes('href')).toBe(expectedHrefs[index])
    })
  })
})
