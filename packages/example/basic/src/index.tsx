import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { PageTreeProvider, PageNode, PageTreeStateContext } from '@pagetree/builder';
import { Canvas, Catalog, DropToRemove, GlobalStyle, Header, theme } from '@pagetree/components';

import { components } from './catalog';

const App = () => {
  const [pageTree, setPageTree] = useState<PageNode>(
    new PageNode({
      childNodes: [{ type: 'headline' }, { type: 'article-teaser', uuid: 'article' }],
    }),
  );

  const handleUpdate = (pageTree: PageNode) => {
    // eslint-disable-next-line no-console
    console.info('Page structure updated');
    // eslint-disable-next-line no-console
    console.log(pageTree.toString());
    setPageTree(pageTree);
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <PageTreeProvider onUpdate={handleUpdate} pageTree={pageTree} components={components}>
        <Header page={{ title: 'A test page', path: '', starred: false }} />
        <Canvas />
        <PageTreeStateContext.Consumer>
          {({ dragOver, dataTransfer }) => (
            <>
              <Catalog hide={dragOver !== undefined} />
              <DropToRemove hide={!dataTransfer || dataTransfer.sourceId === undefined} />
            </>
          )}
        </PageTreeStateContext.Consumer>
      </PageTreeProvider>
    </ThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
