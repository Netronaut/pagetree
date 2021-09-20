import { CatalogComponentDescription } from '@pagio/builder';
import { Headline } from './Headline';
import { ArticleTeaser } from './ArticleTeaser';

export const components = [
  {
    type: 'article-teaser',
    label: 'Article Teaser',
    component: ArticleTeaser,
    tags: ['teaser'],
  },
  {
    type: 'headline',
    label: 'Headline',
    component: Headline,
    tags: ['headline'],
  },
] as Array<CatalogComponentDescription>;
