import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { ArrowIcon } from '../icons';
import S from './HistoryLog.styles';
import { HistoryLogItem } from '@pagio/builder';

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
          {historyItem.change.map((item) => {
            const { type, key, value } = item;
            return (
              <li key={nanoid()}>
                <strong>{type}</strong>
                <span>{key.join('/')}</span>
                {typeof value === 'string' && <span>{value}</span>}
              </li>
            );
          })}
        </S.DetailsList>
      )}
    </S.DetailsOfChanges>
  );
};
