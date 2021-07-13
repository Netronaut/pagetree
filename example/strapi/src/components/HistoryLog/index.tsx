import React, { useContext, useState } from 'react';
import { nanoid } from 'nanoid';
import { HistoryLogContext } from '../../context';
import { ArrowIcon } from '../icons';
import S from './HistoryLog.styles';
import { HistoryLogItem } from '../../types';

export const HistoryLog: React.FC = () => {
  const { historyLog } = useContext(HistoryLogContext);
  const [isDisplayHistory, setIsDisplayHistory] = useState(true);

  {
    /* <S.HistoryWrapper isOpen={isDisplayHistory}> */
  }
  return (
    <S.HistoryWrapper isOpen={true}>
      <section>
        {historyLog?.map((historyItem) => (
          <DisplayChanges key={nanoid()} historyItem={historyItem} />
        ))}
      </section>
      <S.ShowHistoryButton
        isOpen={isDisplayHistory}
        // onClick={() => setIsDisplayHistory(!isDisplayHistory)}
      >
        <ArrowIcon isOpen={isDisplayHistory} />
      </S.ShowHistoryButton>
    </S.HistoryWrapper>
  );
};

type Props = {
  historyItem: HistoryLogItem;
};

const DisplayChanges: React.FC<Props> = ({ historyItem }) => {
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
