import React, { ReactElement, useState } from 'react';
import { Sidebar, LogList } from './Changelog.styles';
import { LogItem } from './LogItem';

import { mockData } from './mocks';

interface ChangelogProps {
  isOpenChangelog: boolean;
}

export const Changelog = ({ isOpenChangelog }: ChangelogProps): ReactElement => {
  const [currentVersionId] = useState<number | null>(mockData[1].id);
  return (
    <Sidebar isOpenChangelog={isOpenChangelog}>
      <LogList>
        {mockData.map((logItem) => (
          <LogItem key={logItem.id} logItem={logItem} selected={currentVersionId === logItem.id} />
        ))}
      </LogList>
    </Sidebar>
  );
};
