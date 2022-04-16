import React, { ReactElement, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { ThemeProvider } from 'styled-components';
import { PageNode, PageTreeProvider, PageTreeStateContext } from '@pagetree/builder';
import diff from 'changeset';
import { Canvas, Catalog, GlobalStyle, Header, PageEntity, theme } from '@pagetree/components';
import { getPage, savePage } from './api';
import { components } from './catalog';

export const PageBuilder = (): ReactElement | null => {
  const { pageId } = useParams<{ pageId: string }>();
  const [page, setPage] = useState<PageEntity>();

  const onUpdatePage = (page: PageEntity) => {
    savePage(page);
    setPage(page);
  };

  useEffect(() => {
    getPage(pageId).then(setPage);
  }, [pageId]);

  if (!page) {
    return null;
  }

  const onUpdatePageTree = (pageTree: PageNode) => {
    const nextPage = { ...page, pageContent: pageTree.valueOf() };

    nextPage.history = (nextPage.history || []).concat({
      date: new Date().toISOString(),
      change: diff(page.pageContent, nextPage.pageContent),
    });

    // eslint-disable-next-line no-console
    console.info('Page structure updated');
    // eslint-disable-next-line no-console
    console.log(pageTree.toString());

    onUpdatePage(nextPage);
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <PageTreeProvider
        onUpdate={onUpdatePageTree}
        pageTree={page.pageContent ? new PageNode(page.pageContent) : undefined}
        components={components}
      >
        <Header page={page} onUpdate={onUpdatePage} link="/" />
        <Canvas />
        <PageTreeStateContext.Consumer>
          {({ dragOver }) => <Catalog hide={dragOver !== undefined} />}
        </PageTreeStateContext.Consumer>
      </PageTreeProvider>
    </ThemeProvider>
  );
};
