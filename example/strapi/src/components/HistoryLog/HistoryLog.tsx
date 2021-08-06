import React, { useEffect, useRef, useState, ReactElement } from 'react';
import { ArrowIcon, PageHistory } from '@pagio/builder';
import { useTapOutside } from '../PageManager/hooks';
import { ChangeDetail } from './ChangeDetail';
import { HistoryWrapper, ShowHistoryButton } from './HistoryLog.styles';

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
    <HistoryWrapper ref={ref} height={height} isOpen={isDisplayHistory}>
      <section>
        {!history ? <h3>History Log is empty</h3> : <h3>History Log:</h3>}
        {history &&
          history
            .map((historyItem, i) => <ChangeDetail key={i} historyItem={historyItem} />)
            .reverse()}
      </section>
      <ShowHistoryButton
        isOpen={isDisplayHistory}
        onClick={() => setIsDisplayHistory(!isDisplayHistory)}
      >
        <ArrowIcon width={18} height={8} />
      </ShowHistoryButton>
    </HistoryWrapper>
  );
};
