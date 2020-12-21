import TextComponent from '../components/Text';

export const ComponentByType = {
  text: TextComponent,
};

export type ComponentType = keyof typeof ComponentByType;

export type Component = {
  text?: string;
  id: string;
  type: ComponentType;
};
