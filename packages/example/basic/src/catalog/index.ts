import { CatalogComponentDescription } from '@pagetree/core';
import { Headline } from './Headline';
import { ArticleTeaser } from './ArticleTeaser';

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
] as Array<CatalogComponentDescription>;
