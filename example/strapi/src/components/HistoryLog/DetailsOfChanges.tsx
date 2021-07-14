import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { ArrowIcon } from '../icons';
import S from './HistoryLog.styles';
import { HistoryLogItem } from '../../types';

type Props = {
  historyItem: HistoryLogItem;
};

export const DetailsOfChanges: React.FC<Props> = ({ historyItem }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <S.HistoryGroup onClick={() => setIsOpen(!isOpen)} isOpen={isOpen}>
      <header>
        {historyItem.date}
        <button>
          <ArrowIcon isOpen={isOpen} />
        </button>
      </header>
      {isOpen && (
        <S.HistoryGroupItem>
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
        </S.HistoryGroupItem>
      )}
    </S.HistoryGroup>
  );
};
