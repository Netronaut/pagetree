import React, { useState} from 'react';
import { StyledGroupWrapper, DropdownButton } from './componentsStyles';

type Props = {
  groupName?: string;
};

export const GroupWrapper: React.FC<Props> = ({ children, groupName='group name' }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <StyledGroupWrapper isOpen={isOpen}>
      <header onClick={() => setIsOpen(!isOpen)}>
        {groupName}
        <DropdownButton onClick={() => setIsOpen(!isOpen)} isOpen={isOpen}>
          <img src='/arrow.2ff401d5.svg' alt='arrow'/>
        </DropdownButton>
      </header>
      <section>
        {children}
      </section>
    </StyledGroupWrapper>
  );
};
