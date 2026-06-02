import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Navigation from '../../components/Navigation.vue'

describe('Navigation', () => {
  it('renders brand mark', () => {
    const wrapper = mount(Navigation)
    expect(wrapper.text()).toContain('至禾')
  })

  it('renders all navigation links', () => {
    const wrapper = mount(Navigation)
    const links = wrapper.findAll('nav a')
    expect(links.length).toBeGreaterThan(0)

    const labels = links.map((link) => link.text())
    expect(labels).toContain('案例')
    expect(labels).toContain('理念')
    expect(labels).toContain('介质')
    expect(labels).toContain('联系')
  })

  it('links have correct href attributes', () => {
    const wrapper = mount(Navigation)
    const links = wrapper.findAll('nav a')

    expect(links[0].attributes('href')).toBe('#gallery')
    expect(links[1].attributes('href')).toBe('#philosophy')
    expect(links[2].attributes('href')).toBe('#mediums')
    expect(links[3].attributes('href')).toBe('#footer')
  })
})
