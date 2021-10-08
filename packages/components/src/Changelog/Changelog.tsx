import React, { ReactElement, useMemo, useState } from 'react';
import { PageEntity, PageHistory } from '../types';
import { LogList } from './Changelog.styles';
import { LogItem } from './LogItem';
import { historyToVersions } from './historyToVersions';

interface ChangelogProps {
  page: PageEntity;
}

type VersionedPageHistory = Record<string, PageHistory>;

export const Changelog = ({ page }: ChangelogProps): ReactElement => {
  const changesByVersion = useMemo(() => {
    if (page.history) return historyToVersions(page.history);
    return {};
  }, [page.history]) as VersionedPageHistory;

  const [currentVersionId] = useState<string>(Object.keys(changesByVersion)[0] || '');
  return (
    <LogList>
      {Object.values(changesByVersion).map((history, i) => (
        <LogItem key={i} history={history} selected={currentVersionId === history[0].version} />
      ))}
    </LogList>
  );
};
