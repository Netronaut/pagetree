import { logItem } from '@pagio/builder';
import React, { ReactElement, useState } from 'react';
import { Sidebar } from '../Sidebar';
import { LogList } from './Changelog.styles';
import { LogItem } from './LogItem';

interface ChangelogProps {
  isChangelogOpen: boolean;
  logItems: logItem[];
}

export const Changelog = ({ isChangelogOpen, logItems }: ChangelogProps): ReactElement => {
  const [currentVersionId] = useState<number | null>(logItems[1].id);
  return (
    <Sidebar open={isChangelogOpen}>
      <LogList>
        {logItems.map((logItem) => (
          <LogItem key={logItem.id} logItem={logItem} selected={currentVersionId === logItem.id} />
        ))}
      </LogList>
    </Sidebar>
  );
};
