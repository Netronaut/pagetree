import React from 'react';
import { StyledGroupWrapper } from './componentsStyles';

export const GroupWrapper: React.FC = ({ children }) => {
  return (
    <StyledGroupWrapper>
      <header>Group name</header>
      <section>
        {children}
      </section>
    </StyledGroupWrapper>
  );
};
