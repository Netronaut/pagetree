import { CatalogComponentDescription } from '@pagio/builder';
import { Headline } from './headline';
import { ArticleTeaser } from './article-teaser';
import { TestComponent } from './test-component';

export const components = [
  {
    type: 'article-teaser',
    label: 'Article Teaser',
    component: ArticleTeaser,
  },
  {
    type: 'headline',
    label: 'Headline',
    component: Headline,
  },
  {
    type: 'another-teaser',
    label: 'Another Teaser',
    component: ArticleTeaser,
  },
  {
    type: 'test-component',
    label: 'Test Component',
    component: TestComponent,
  },
  {
    type: 'test-component-2',
    label: 'Test Component 2',
    component: TestComponent,
  },
] as Array<CatalogComponentDescription>;
