import { PageHistory } from '..';

type VersionedPageHistory = Record<string, PageHistory>;

export const historyToVersions = (pageHistory: PageHistory) => {
  let versions = {} as VersionedPageHistory;

  pageHistory.forEach((historyItem) => {
    if (historyItem.version) {
      const sp = versions['<unversioned>']?.splice(0, versions['<unversioned>'].length);
      versions = { ...versions, [historyItem.version]: [historyItem].concat(sp) };
      return;
    }

    versions = {
      ...versions,
      ['<unversioned>']: versions['<unversioned>']?.concat(historyItem) || [historyItem],
    };
  });
  return versions;
};
