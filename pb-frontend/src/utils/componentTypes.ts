import { Text } from '../screens/Constructor/components/Text';

export const componentByType = {
  text: Text,
};

export type ComponentType = keyof typeof componentByType;
