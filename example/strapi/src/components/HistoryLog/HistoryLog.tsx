import React, { useEffect, useRef, useState } from 'react';
import { nanoid } from 'nanoid';
import { HistoryLogItem } from '../../types';
import { ArrowIcon } from '../icons';
import S from './HistoryLog.styles';
import { DetailsOfChanges } from './DetailsOfChanges';
import { useTapOutside } from '../PageManager/hooks';

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
