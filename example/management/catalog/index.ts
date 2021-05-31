import { default as headline } from './headline';
import { default as article } from './article-teaser';
import { default as testComponent } from './test-component';

export const components = [headline, article, testComponent];

export const componentGroups = Array.from(new Set(components.map(component => component.groupName))) ;
