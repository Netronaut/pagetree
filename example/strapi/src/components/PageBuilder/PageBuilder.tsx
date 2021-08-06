import React, { ReactElement, useContext, useMemo } from 'react';
import { useParams } from 'react-router';
import { Builder } from '@pagio/builder';
import { components } from '../../catalog';
import { ManagementContext } from '../../context';
import { PageEntity } from '../../types';
import { HistoryLog } from '../HistoryLog';

interface PageBuilderProps {
  showPreview: boolean;
  onPageUpdate: (page: PageEntity) => void;
}

export const PageBuilder = ({
  showPreview,
  onPageUpdate,
}: PageBuilderProps): ReactElement | null => {
  const { pageId } = useParams<{ pageId: string }>();
  const { pages } = useContext(ManagementContext);

  const page = useMemo(() => pages.find(({ id }) => String(id) === pageId), [pageId, pages]);

  if (!page) {
    return null;
  }

  return (
    <>
      <HistoryLog history={page.history} />
      <Builder
        pageContent={page.pageContent || {}}
        onChange={(pageContentUpdate) => onPageUpdate({ ...page, pageContent: pageContentUpdate })}
        showPreview={showPreview}
        components={components}
      />
    </>
  );
};
