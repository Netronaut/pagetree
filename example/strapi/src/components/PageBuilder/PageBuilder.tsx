import React, { ReactElement, useContext, useMemo } from 'react';
import { useParams } from 'react-router';
import { PageCanvas } from '@pagio/builder';
import { components } from '../../catalog';
import { ManagementContext } from '../../context';
import { PageEntity } from '../../types';
import { HistoryLog } from '../HistoryLog';

interface PageBuilderProps {
  onPageUpdate: (page: PageEntity) => void;
}

export const PageBuilder = ({ onPageUpdate }: PageBuilderProps): ReactElement | null => {
  const { pageId } = useParams<{ pageId: string }>();
  const { pages } = useContext(ManagementContext);

  const page = useMemo(() => pages.find(({ id }) => String(id) === pageId), [pageId, pages]);

  if (!page) {
    return null;
  }

  return (
    <>
      <HistoryLog history={page.history} />
      <PageCanvas
        pageContent={page.pageContent || {}}
        onChange={(pageContentUpdate) => onPageUpdate({ ...page, pageContent: pageContentUpdate })}
        components={components}
      />
    </>
  );
};
