import * as catalog from '../catalog';

export type Component = typeof components[number];

export type ComponentType = Component['type'];

export const components = Object.values(catalog);

export const componentByType = components.reduce((acc, component) => {
  acc[component.type] = component;
  return acc;
}, {} as Record<ComponentType, Component>);

export const componentTypes = Object.keys(componentByType);
