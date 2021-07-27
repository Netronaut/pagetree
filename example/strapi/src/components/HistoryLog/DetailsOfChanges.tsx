import React, { useState } from 'react';
import { HistoryLogItem } from '@pagio/builder';
import { ArrowIcon } from '../icons';
import S from './HistoryLog.styles';

type Props = {
  historyItem: HistoryLogItem;
};

export const DetailsOfChanges: React.FC<Props> = ({ historyItem }) => {
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
