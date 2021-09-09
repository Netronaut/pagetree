import React, { ReactElement, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import diff from 'changeset';
import {
  Canvas,
  Catalog,
  PageNode,
  PageTreeProvider,
  PageTreeStateContext,
  RemoveDropArea,
} from '@pagio/builder';
import { components } from '../../catalog';
import { PageEntity } from '../../types';
import { HistoryLog } from '../HistoryLog';
import { Header } from '../Header';
import { getPage, savePage } from '../../api';

export const PageBuilder = (): ReactElement | null => {
  const { pageId } = useParams<{ pageId: string }>();
  const [preview, setPreview] = useState(false);
  const [page, setPage] = useState<PageEntity | null>(null);

  useEffect(() => {
    getPage(pageId).then(setPage);
  }, [pageId]);

  const handleUpdate = (pageTree: PageNode) => {
    const previousPage = page as PageEntity;
    const nextPage = { ...previousPage, pageContent: pageTree.valueOf() };

    nextPage.history = (nextPage.history || []).concat({
      date: new Date().toISOString(),
      change: diff(previousPage.pageContent, nextPage.pageContent),
    });

    // eslint-disable-next-line no-console
    console.info('Page structure updated');
    // eslint-disable-next-line no-console
    console.log(pageTree.toString());

    savePage(nextPage);
    setPage(nextPage);
  };

  if (!page) {
    return null;
  }

  return (
    <PageTreeProvider
      pageTree={page.pageContent ? new PageNode(page.pageContent) : undefined}
      components={components}
      onUpdate={handleUpdate}
      preview={preview}
    >
      <Header preview={preview} setPreview={setPreview} />
      <HistoryLog history={page.history} />
      <Canvas />
      {!preview && (
        <PageTreeStateContext.Consumer>
          {({ dragOver, dataTransfer }) => (
            <>
              <RemoveDropArea
                key="remove"
                hide={!dataTransfer || dataTransfer.sourceId === undefined}
              />
              <Catalog hide={dragOver !== undefined} />
            </>
          )}
        </PageTreeStateContext.Consumer>
      )}
    </PageTreeProvider>
  );
};
