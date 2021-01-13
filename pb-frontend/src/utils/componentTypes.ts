import { Text } from '../screens/Constructor/components/Text';

export const componentByType = {
  text: Text,
};

export const componentTypes = Object.keys(componentByType);

export type ComponentType = keyof typeof componentByType;
