import type { PageData } from 'vitepress'
import { expect, test } from 'bun:test'
import { BreadcrumbsDataGenerator } from '../vitepress'

test('page is not index', () => {
  const pageData: PageData = {
    relativePath: 'a/b/c/d.md',
    filePath: 'a/b/c/d.md',
    title: 'd',
    description: '',
    headers: [],
    frontmatter: {},
  }

  const pages = ['a', 'a/b', 'a/b/index.md', 'a/b/c/d.md']

  const generator = new BreadcrumbsDataGenerator('Home', 'a')

  generator.generate(pageData, pages)

  expect(pageData.frontmatter.breadcrumbs).toEqual([
    { title: 'Home', link: '/a' },
    { title: 'b', link: '/a/b' },
    { title: 'c', link: '' },
    { title: 'd', link: '/a/b/c/d' },
  ])
})

test('page is index', () => {
  const pageData: PageData = {
    relativePath: 'a/b/c/d/index.md',
    filePath: 'a/b/c/d/index.md',
    title: 'd',
    description: '',
    headers: [],
    frontmatter: {},
  }

  const pages = ['a', 'a/b', 'a/b/index.md', 'a/b/c/d/index.md']

  const generator = new BreadcrumbsDataGenerator('Home', 'a')

  generator.generate(pageData, pages)

  expect(pageData.frontmatter.breadcrumbs).toEqual([
    { title: 'Home', link: '/a' },
    { title: 'b', link: '/a/b' },
    { title: 'c', link: '' },
    { title: 'd', link: '/a/b/c/d' },
  ])
})
