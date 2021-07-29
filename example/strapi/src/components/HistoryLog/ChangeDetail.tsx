import React, { useState, ReactElement } from 'react';
import { ArrowIcon, PageHistoryItem } from '@pagio/builder';
import { formatISO9075 } from 'date-fns';
import S from './HistoryLog.styles';

interface ChangeDetailProps {
  historyItem: PageHistoryItem;
}

export const ChangeDetail = ({ historyItem }: ChangeDetailProps): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <S.ChangeDetail isOpen={isOpen}>
      <header onClick={() => setIsOpen(!isOpen)}>
        {formatISO9075(historyItem.date)}
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
    </S.ChangeDetail>
  );
};
