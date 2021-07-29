import React, { useEffect, useRef, useState, ReactElement } from 'react';
import { ArrowIcon, PageHistory } from '@pagio/builder';
import { useTapOutside } from '../PageManager/hooks';
import { ChangeDetail } from './ChangeDetail';
import S from './HistoryLog.styles';

interface HistoryLogProps {
  history?: PageHistory;
}

export const HistoryLog = ({ history = [] }: HistoryLogProps): ReactElement => {
  const [isDisplayHistory, setIsDisplayHistory] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  useEffect(() => {
    ref.current && setHeight(ref.current?.clientHeight);
  }, [ref.current?.clientHeight]);

  useTapOutside(ref, () => setIsDisplayHistory(false));

  return (
    <S.HistoryWrapper ref={ref} height={height} isOpen={isDisplayHistory}>
      <section>
        <h3>History Log</h3>
        {history.map((historyItem, i) => (
          <ChangeDetail key={i} historyItem={historyItem} />
        ))}
      </section>
      <S.ShowHistoryButton
        isOpen={isDisplayHistory}
        onClick={() => setIsDisplayHistory(!isDisplayHistory)}
      >
        <ArrowIcon width={18} height={8} />
      </S.ShowHistoryButton>
    </S.HistoryWrapper>
  );
};
