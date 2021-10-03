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

  return (
    <LogItemRoot onClick={() => setOpenedSubList(!openedSubList)} selected={selected}>
      <SmallerBold>{history[0].version}</SmallerBold>
      <TextCapitalized>{formatDate(history[0].date, 'DDD, dd MMM yyyy hh:mm:ss')}</TextCapitalized>
      {openedSubList && (
        <LogItemDetail>
          {history.slice(1).map(({ date, changes }, i) => (
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
