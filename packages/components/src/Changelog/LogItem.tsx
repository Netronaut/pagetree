import React, { ReactElement, useState } from 'react';
import { SmallerBold } from '../Typography';
import {
  LogItemRoot,
  LogItemDetail,
  LogItemDetailItem,
  Text,
  TextGray,
  TextCapitalized,
  RevertButton,
  RevertButtonContainer,
} from './Changelog.styles';

interface LogItemProps {
  logItem: {
    id: number;
    title: string;
    publishedDate: string;
    details: {
      id: number;
      data: string;
      changes: number;
    }[];
  };
  selected: boolean;
}

export const LogItem = ({ logItem, selected }: LogItemProps): ReactElement => {
  const [openedSubList, setOpenedSubList] = useState(selected || false);

  return (
    <LogItemRoot onClick={() => setOpenedSubList(!openedSubList)} selected={selected}>
      <SmallerBold>{logItem.title}</SmallerBold>
      <TextCapitalized>{logItem.publishedDate}</TextCapitalized>
      {openedSubList && (
        <LogItemDetail>
          {logItem.details.map((detail) => (
            <LogItemDetailItem key={detail.id}>
              <TextGray>{detail.data}</TextGray>
              <Text>{detail.changes} changes</Text>
            </LogItemDetailItem>
          ))}
        </LogItemDetail>
      )}
      <RevertButtonContainer>
        <RevertButton
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <SmallerBold>REVERT</SmallerBold>
        </RevertButton>
      </RevertButtonContainer>
    </LogItemRoot>
  );
};
