import React, { ReactElement, useMemo, useState } from 'react';
import { PageEntity, PageHistory } from '../types';
import { LogList } from './Changelog.styles';
import { LogItem } from './LogItem';

interface ChangelogProps {
  page: PageEntity;
}

type VersionedPageHistory = Record<string, PageHistory>;

export const Changelog = ({ page }: ChangelogProps): ReactElement => {
  const changesByVersion = useMemo(() => {
    let version = '<unversioned>';
    return page.history?.reduce((versions, historyItem) => {
      version = historyItem.version || version;
      return { ...versions, [version]: (versions[version] || []).concat(historyItem) };
    }, {} as VersionedPageHistory);
  }, [page.history]) as VersionedPageHistory;

  const [currentVersionId] = useState<string>(Object.keys(changesByVersion)[0]);
  return (
    <LogList>
      {Object.values(changesByVersion).map((history, i) => (
        <LogItem key={i} history={history} selected={currentVersionId === history[0].version} />
      ))}
    </LogList>
  );
};
