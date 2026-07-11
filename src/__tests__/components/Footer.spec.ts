import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Footer from '../../sections/Footer.vue'

describe('Footer', () => {
  it('renders vision text', () => {
    const wrapper = mount(Footer)
    expect(wrapper.text()).toContain('我们坚持')
  })

  it('renders brand name', () => {
    const wrapper = mount(Footer)
    expect(wrapper.text()).toContain('合作伙伴')
  })

  it('renders copyright', () => {
    const wrapper = mount(Footer)
    expect(wrapper.text()).toMatch(/© \d{4}/)
    expect(wrapper.text()).toContain('至禾装饰')
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
    expect(texts).toContain('关于我们')
    expect(texts).toContain('服务体系')
    expect(texts).toContain('精选案例')
    expect(texts).toContain('联系我们')
    expect(texts).toContain('空间设计')
    expect(texts).toContain('装饰施工')
  })
})
