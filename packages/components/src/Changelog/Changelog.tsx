import React, { ReactElement } from 'react';
import { SmallerBold } from '../Typography';
import {
  Sidebar,
  LogList,
  LogItem,
  SubList,
  SubListItem,
  Text,
  TextGray,
  TextCapitalized,
} from './Changelog.styles';

export const Changelog = (): ReactElement => (
  <Sidebar>
    <LogList>
      <LogItem>
        <SmallerBold>Version 11, 13 changes</SmallerBold>
        <TextCapitalized>Published: Mon, 07 Jun 2021 14:36:06</TextCapitalized>
      </LogItem>
      <LogItem>
        <SmallerBold>Curren Version</SmallerBold>
        <TextCapitalized>Published: Mon, 07 Jun 2021 14:36:06</TextCapitalized>
        <SubList>
          <SubListItem>
            <TextGray>07.07.21</TextGray>
            <Text>11 changes</Text>
          </SubListItem>
          <SubListItem>
            <TextGray>06.07.21</TextGray>
            <Text>2 changes</Text>
          </SubListItem>
          <SubListItem>
            <TextGray>03.07.21</TextGray>
            <Text>24 changes</Text>
          </SubListItem>
        </SubList>
      </LogItem>
      <LogItem>
        <SmallerBold>Version 10, 53 changes</SmallerBold>
        <TextCapitalized>Published: Thu, 30 May 2021 14:36:06 </TextCapitalized>
      </LogItem>
      <LogItem>
        <SmallerBold>Version 9, 53 changes</SmallerBold>
        <TextCapitalized>Published: Mon, 07 Jun 2021 14:36:06 </TextCapitalized>
      </LogItem>
      <LogItem>
        <SmallerBold>Version 8, 53 changes</SmallerBold>
        <TextCapitalized>Published: Mon, 07 Jun 2021 14:36:06 </TextCapitalized>
      </LogItem>
      <LogItem>
        <SmallerBold>Version 7, 22 changes</SmallerBold>
        <TextCapitalized>Published: Mon, 07 Jun 2021 14:36:06 </TextCapitalized>
      </LogItem>
    </LogList>
  </Sidebar>
);
