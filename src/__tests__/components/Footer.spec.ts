import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Footer from '../../sections/Footer.vue'

describe('Footer', () => {
  it('renders vision text', () => {
    const wrapper = mount(Footer)
    expect(wrapper.text()).toContain('我们相信')
  })

  it('renders brand name', () => {
    const wrapper = mount(Footer)
    expect(wrapper.text()).toContain('至禾设计')
  })

  it('renders copyright', () => {
    const wrapper = mount(Footer)
    expect(wrapper.text()).toContain('© 2024')
  })

  it('renders footer columns', () => {
    const wrapper = mount(Footer)
    expect(wrapper.text()).toContain('导航')
    expect(wrapper.text()).toContain('服务')
    expect(wrapper.text()).toContain('联系')
  })

  it('renders column links', () => {
    const wrapper = mount(Footer)
    const links = wrapper.findAll('a')
    const texts = links.map((a) => a.text())
    expect(texts).toContain('案例作品')
    expect(texts).toContain('私宅设计')
  })
})
