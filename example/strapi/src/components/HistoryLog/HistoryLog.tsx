import React, { useContext, useEffect, useRef, useState } from 'react';
import { nanoid } from 'nanoid';
import { HistoryLogContext } from '../../context';
import { ArrowIcon } from '../icons';
import S from './HistoryLog.styles';
import { DetailsOfChanges } from './DetailsOfChanges';

export const HistoryLog: React.FC = () => {
  const { historyLog } = useContext(HistoryLogContext);
  const [isDisplayHistory, setIsDisplayHistory] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  useEffect(() => {
    ref.current && setHeight(ref.current?.clientHeight);
  }, [ref.current?.clientHeight]);

  return (
    <S.HistoryWrapper ref={ref} height={height} isOpen={isDisplayHistory}>
      <section>
        <h3>History Log</h3>
        {historyLog?.map((historyItem) => (
          <DetailsOfChanges key={nanoid()} historyItem={historyItem} />
        ))}
      </section>
      <S.ShowHistoryButton
        isOpen={isDisplayHistory}
        onClick={() => setIsDisplayHistory(!isDisplayHistory)}
      >
        <ArrowIcon />
      </S.ShowHistoryButton>
    </S.HistoryWrapper>
  );
};
