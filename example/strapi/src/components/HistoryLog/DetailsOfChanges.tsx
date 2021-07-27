import React, { useState, ReactElement } from 'react';
import { HistoryLogItem, ArrowIcon } from '@pagio/builder';
import S from './HistoryLog.styles';

interface DetailsOfChangesProps {
  historyItem: HistoryLogItem;
}

export const DetailsOfChanges = ({ historyItem }: DetailsOfChangesProps): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <S.DetailsOfChanges isOpen={isOpen}>
      <header onClick={() => setIsOpen(!isOpen)}>
        {historyItem.date}
        <button>
          <ArrowIcon />
        </button>
      </header>
      {isOpen && (
        <S.DetailsList>
          {historyItem.change.map(({ type, key, value }, i) => (
            <li key={`index-${i}`}>
              <strong>{type}</strong>
              <span>{key.join('/')}</span>
              {typeof value === 'string' && <span>{value}</span>}
            </li>
          ))}
        </S.DetailsList>
      )}
    </S.DetailsOfChanges>
  );
};
