import React, { useEffect, useRef, useState } from 'react';
import { HistoryLogItem, ArrowIcon } from '@pagio/builder';
import { DetailsOfChanges } from './DetailsOfChanges';
import { useTapOutside } from '../PageManager/hooks';
import S from './HistoryLog.styles';

type Props = {
  historyLog: HistoryLogItem[];
};

export const HistoryLog: React.FC<Props> = ({ historyLog }) => {
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
        {historyLog?.map((historyItem, i) => (
          <DetailsOfChanges key={i} historyItem={historyItem} />
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
