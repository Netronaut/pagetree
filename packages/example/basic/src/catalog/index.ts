import { CatalogComponentDescription } from '@pagetree/builder';
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
    type: 'test-component',
    label: 'Test Component',
    component: TestComponent,
  },
] as Array<CatalogComponentDescription>;
