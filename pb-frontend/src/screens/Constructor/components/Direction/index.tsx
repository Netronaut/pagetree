import React from 'react';
import { ComponentByType } from '../../types';
import Container from '../Container';

type Props = {
  direction: 'row' | 'column';
  components: Array<any>;
};

export const Direction: React.FC<Props> = ({ direction, components }) => {
  return (
    <div style={{ display: 'flex', flexDirection: direction }}>
      {components.map((component, index) => {
        if (component.direction) {
          return (
            <Direction
              key={component.id}
              components={component.components}
              direction={component.direction}
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
          >
            <Component element={component} />
          </Container>
        );
      })}
    </div>
  );
};
