import React from 'react';
import { ComponentByType } from '../../types';
import Container from '../Container';

type Props = {
  direction: 'row' | 'column';
  components: Array<any>;
  path?: number[];
};

export const Direction: React.FC<Props> = ({
  direction,
  components,
  path: parentPath = [],
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: direction }}>
      {components.map((component, index) => {
        const path = parentPath?.concat([index]);
        if (component.direction) {
          return (
            <Direction
              key={component.id}
              components={component.components}
              direction={component.direction}
              path={path}
            />
          );
        }
        const Component = ComponentByType[component.type as 'text'];
        return (
          <Container
            id={component.id}
            key={component.id}
            element={component}
            Component={ComponentByType[component.type as 'text']}
            path={path}
            parentDirection={direction}
          >
            <Component element={component} />
          </Container>
        );
      })}
    </div>
  );
};
