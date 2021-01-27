import * as catalog from '../catalog';

export const componentByType = catalog;

export const components = Object.values(catalog);

export const componentTypes = Object.keys(componentByType);

export type ComponentType = keyof typeof componentByType;
