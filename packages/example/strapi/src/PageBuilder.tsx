import React, { ReactElement, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { ThemeProvider } from 'styled-components';
import { PageNode, PageTreeProvider, PageTreeStateContext } from '@pagio/builder';
import diff from 'changeset';
import {
  Canvas,
  Catalog,
  GlobalStyle,
  Header,
  Changelog,
  FixedContainer,
  PageEntity,
  Sidebar,
  theme,
} from '@pagio/components';
import { getPage, savePage } from './api';
import { components } from './catalog';

import { mockData } from '../../../components/src/Changelog/mocks';

export const PageBuilder = (): ReactElement | null => {
  const { pageId } = useParams<{ pageId: string }>();
  const [page, setPage] = useState<PageEntity | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const onToggleChangelog = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    getPage(pageId).then(setPage);
  }, [pageId]);

  const onUpdatePageTree = (pageTree: PageNode) => {
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

    onUpdatePage(nextPage);
  };

  const onUpdatePage = (page: PageEntity) => {
    savePage(page);
    setPage(page);
  };

  if (!page) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <PageTreeProvider
        onUpdate={onUpdatePageTree}
        pageTree={page.pageContent ? new PageNode(page.pageContent) : undefined}
        components={components}
      >
        <Canvas />
        <FixedContainer sidebarOpen={sidebarOpen}>
          <PageTreeStateContext.Consumer>
            {({ dragOver }) => <Catalog hide={dragOver !== undefined} />}
          </PageTreeStateContext.Consumer>
          <Header
            page={page}
            onUpdate={onUpdatePage}
            link="/"
            onToggleChangelog={onToggleChangelog}
            sidebarOpen={sidebarOpen}
          />
          <Sidebar open={sidebarOpen}>{sidebarOpen && <Changelog logItems={mockData} />}</Sidebar>
        </FixedContainer>
      </PageTreeProvider>
    </ThemeProvider>
  );
};
