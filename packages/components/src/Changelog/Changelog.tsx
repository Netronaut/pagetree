import React, { ReactElement, useMemo } from 'react';
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

  return (
    <LogList>
      {Object.values(changesByVersion).map((history, i) => {
        const machedVersion = history?.find((item) => item.version == page?.version)?.version;
        return <LogItem key={i} history={history} selected={Boolean(machedVersion)} />;
      })}
    </LogList>
  );
};
