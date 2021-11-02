import React, { useState, ReactElement } from 'react';
import { ArrowIcon, PageHistoryItem } from '@pagetree/builder';
import { ChangeDetailContainer, DetailsList } from './HistoryLog.styles';

interface ChangeDetailProps {
  historyItem: PageHistoryItem;
}

export const ChangeDetail = ({ historyItem }: ChangeDetailProps): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <ChangeDetailContainer isOpen={isOpen}>
      <header onClick={() => setIsOpen(!isOpen)}>
        {historyItem.date}
        <button>
          <ArrowIcon />
        </button>
      </header>
      {isOpen && (
        <DetailsList>
          {historyItem.change.map(({ type, key, value }, i) => (
            <li key={`index-${i}`}>
              <strong>{type}</strong>
              <span>{key.join('/')}</span>
              {typeof value === 'string' && <span>{value}</span>}
            </li>
          ))}
        </DetailsList>
      )}
    </ChangeDetailContainer>
  );
};
