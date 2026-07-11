import { describe, it, expect } from 'vitest'
import {
  siteConfig,
  navigationConfig,
  heroConfig,
  aboutConfig,
  servicesConfig,
  galleryConfig,
  footerConfig,
  contactConfig,
  projectDetailConfig,
  getProjectById,
} from '../config'

describe('siteConfig', () => {
  it('has required fields', () => {
    expect(siteConfig.language).toBe('zh-CN')
    expect(siteConfig.siteTitle).toBeTruthy()
    expect(siteConfig.siteDescription).toBeTruthy()
  })
})

describe('navigationConfig', () => {
  it('has brandMark and links', () => {
    expect(navigationConfig.brandMark).toBeTruthy()
    expect(navigationConfig.links.length).toBeGreaterThan(0)
    navigationConfig.links.forEach((link) => {
      expect(link.label).toBeTruthy()
      expect(link.targetId).toBeTruthy()
    })
  })
})

describe('heroConfig', () => {
  it('has all required fields', () => {
    expect(heroConfig.wordmarkText).toBeTruthy()
    expect(heroConfig.titleLine1).toBeTruthy()
    expect(heroConfig.ctaText).toBeTruthy()
    expect(heroConfig.ctaTargetId).toBeTruthy()
  })
})

describe('aboutConfig', () => {
  it('has required fields', () => {
    expect(aboutConfig.sectionLabel).toBeTruthy()
    expect(aboutConfig.title).toBeTruthy()
    expect(aboutConfig.intro).toBeTruthy()
    expect(aboutConfig.keywords.length).toBeGreaterThan(0)
    expect(aboutConfig.steps.length).toBeGreaterThan(0)
    aboutConfig.steps.forEach((step) => {
      expect(step.phase).toBeTruthy()
      expect(step.items.length).toBeGreaterThan(0)
    })
  })
})

describe('servicesConfig', () => {
  it('has categories with title and items', () => {
    expect(servicesConfig.sectionLabel).toBeTruthy()
    expect(servicesConfig.title).toBeTruthy()
    expect(servicesConfig.categories.length).toBeGreaterThan(0)
    servicesConfig.categories.forEach((category) => {
      expect(category.title).toBeTruthy()
      expect(category.items.length).toBeGreaterThan(0)
    })
  })
})

describe('galleryConfig', () => {
  it('has projects with required fields', () => {
    expect(galleryConfig.projects.length).toBeGreaterThan(0)
    galleryConfig.projects.forEach((project) => {
      expect(project.id).toBeTruthy()
      expect(project.title).toBeTruthy()
      expect(project.image).toBeTruthy()
      expect(project.subtitle).toBeTruthy()
      expect(Array.isArray(project.meta)).toBe(true)
      expect(Array.isArray(project.paragraphs)).toBe(true)
    })
  })
})

describe('contactConfig', () => {
  it('has required fields', () => {
    expect(contactConfig.address).toBeTruthy()
    expect(contactConfig.phone).toBeTruthy()
    expect(contactConfig.email).toBeTruthy()
  })
})

describe('footerConfig', () => {
  it('has basic fields', () => {
    expect(footerConfig.brandName).toBeTruthy()
    expect(footerConfig.copyright).toBeTruthy()
    expect(Array.isArray(footerConfig.columns)).toBe(true)
  })
})

describe('getProjectById', () => {
  it('returns correct project for existing id', () => {
    const project = getProjectById('001')
    expect(project).toBeDefined()
    expect(project?.id).toBe('001')
    expect(project?.title).toBeTruthy()
  })

  it('returns undefined for non-existing id', () => {
    const project = getProjectById('999')
    expect(project).toBeUndefined()
  })

  it('returns undefined for empty string', () => {
    const project = getProjectById('')
    expect(project).toBeUndefined()
  })
})

describe('projectDetailConfig', () => {
  it('has backLabel', () => {
    expect(projectDetailConfig.backLabel).toBeTruthy()
  })
})
