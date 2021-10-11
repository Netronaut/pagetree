import React, { ReactElement, useState } from 'react';
import { Button } from '../Button';
import { PageHistory } from '../types';
import { SmallerBold } from '../Typography';
import {
  LogItemRoot,
  LogItemDetail,
  LogItemDetailItem,
  Text,
  TextGray,
  TextCapitalized,
  RevertButtonContainer,
} from './Changelog.styles';
import { formatDate } from './formatDate';

interface LogItemProps {
  history: PageHistory;
  selected: boolean;
}

export const LogItem = ({ history, selected }: LogItemProps): ReactElement => {
  const [openedSubList, setOpenedSubList] = useState(selected || false);
  const version = history[0] && history[0].version;
  const historyItem = history.length > 0 && version ? history[0] : history[history.length - 1];

  return (
    <LogItemRoot onClick={() => setOpenedSubList(!openedSubList)} selected={selected}>
      <SmallerBold>{version || 'unversioned'}</SmallerBold>
      {historyItem && (
        <TextCapitalized>
          {formatDate(historyItem.date, 'DDD, dd MMM yyyy hh:mm:ss')}
        </TextCapitalized>
      )}
      {openedSubList && (
        <LogItemDetail>
          {history.length > 0 &&
            history.slice(version ? 1 : 0).map(({ date, changes }, i) => (
              <LogItemDetailItem key={i}>
                <TextGray>{formatDate(date, 'dd.mm.yy')}</TextGray>
                <Text>{changes?.length} changes</Text>
              </LogItemDetailItem>
            ))}
        </LogItemDetail>
      )}
      <RevertButtonContainer>
        <Button
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          Revert
        </Button>
      </RevertButtonContainer>
    </LogItemRoot>
  );
};
