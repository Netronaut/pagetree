import { logItem } from '@pagio/builder';
import React, { ReactElement, useState } from 'react';
import { LogList } from './Changelog.styles';
import { LogItem } from './LogItem';

interface ChangelogProps {
  logItems: logItem[];
}

export const Changelog = ({ logItems }: ChangelogProps): ReactElement => {
  const [currentVersionId] = useState<number | null>(logItems[1].id);
  return (
    <LogList>
      {logItems.map((logItem) => (
        <LogItem key={logItem.id} logItem={logItem} selected={currentVersionId === logItem.id} />
      ))}
    </LogList>
  );
};
