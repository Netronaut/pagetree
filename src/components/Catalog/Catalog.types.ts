export interface CatalogComponent {
  (props: { type: string; id: string }): JSX.Element;
  type: string;
  componentName: string;
  groupName: string | undefined;
}

export interface ProductionComponentProps {
  id: string;
  config?: Record<string, string>;
}
