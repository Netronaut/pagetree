import { CatalogComponentDescription } from '@pagetree/builder';

export const components = [
  {
    type: 'article-teaser',
    label: 'Article Teaser',
    tags: ['article'],
  },
  {
    type: 'headline',
    label: 'Headline',
    tags: ['headline'],
  },
  {
    type: 'another-teaser',
    label: 'Another Teaser',
    tags: ['article'],
  },
  {
    type: 'test-component',
    label: 'Test Component',
    tags: ['test'],
  },
  {
    type: 'test-component-2',
    label: 'Test Component 2',
    tags: ['test'],
  },
] as Array<CatalogComponentDescription>;
