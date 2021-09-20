import React, { ReactElement, useState } from 'react';
import { Sidebar, LogList } from './Changelog.styles';
import { LogItem } from './LogItem';

import { mockData } from './mocks';

interface ChangelogProps {
  isChangelogOpen: boolean;
}

export const Changelog = ({ isChangelogOpen }: ChangelogProps): ReactElement => {
  const [currentVersionId] = useState<number | null>(mockData[1].id);
  return (
    <Sidebar isChangelogOpen={isChangelogOpen}>
      <LogList>
        {mockData.map((logItem) => (
          <LogItem key={logItem.id} logItem={logItem} selected={currentVersionId === logItem.id} />
        ))}
      </LogList>
    </Sidebar>
  );
};
