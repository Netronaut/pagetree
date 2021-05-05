import { default as headline } from './headline';
import { default as article } from './article-teaser';
import { default as testComponent } from './test-component';

export const componentGroups = [
  { name: 'component group 1', components: [headline, article] },
  { name: 'component group 2', components: [testComponent] },
  { name: 'component group 3', components: [headline, testComponent] },
  { name: 'component group 4', components: [testComponent, article] },
  { name: 'component group 5', components: [article] },
  { name: 'component group 6', components: [headline] },
];

export const components = [headline, article, testComponent];
