import React, { ReactElement, useContext, useMemo } from 'react';
import { useParams } from 'react-router';
import { Builder } from '@pagio/builder';
import { components, componentGroups } from '../../catalog';
import { ManagementContext } from '../../utils/context';
import { PageEntity } from '../../types';

interface PageBuilderProps {
  showPreview: boolean;
  onPageUpdate: (page: PageEntity) => void;
}

export const PageBuilder = ({ showPreview, onPageUpdate }: PageBuilderProps): ReactElement => {
  const { pageId } = useParams<{ pageId: string }>();
  const { pages } = useContext(ManagementContext);

  const page =
    useMemo(() => pages.find(({ id }) => String(id) === pageId), [pageId, pages]) ||
    ({} as PageEntity);

  const { pageContent } = page;

  return (
    <Builder
      pageContent={pageContent}
      onChange={(pageContentUpdate) => onPageUpdate({ ...page, pageContent: pageContentUpdate })}
      showPreview={showPreview}
      components={components}
      componentGroups={componentGroups}
    />
  );
};
