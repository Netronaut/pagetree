import * as React from 'react';
import {
  AddPrevComponentButton,
  SeparatorView,
  SeparatorWrapper,
} from './componentsStyles';

type SeparatorProps = {
  id: string;
  isSeparator: boolean;
  addPrevComponent: (id: string) => void;
};

const Separator = ({ id, addPrevComponent, isSeparator }: SeparatorProps) => {
  return (
    <SeparatorWrapper>
      {isSeparator && (
        <SeparatorView key={`separator_${id}`} id={id} className="separator">
          <AddPrevComponentButton onClick={() => addPrevComponent(id)}>
            +
          </AddPrevComponentButton>
        </SeparatorView>
      )}
    </SeparatorWrapper>
  );
};

export default Separator;
