import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { PageTreeProvider, PageNode, PageTreeStateContext } from '@pagio/builder';
import { Canvas, Catalog, GlobalStyle, Header, theme } from '@pagio/components';
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
        <Header />
        <Canvas />
        <PageTreeStateContext.Consumer>
          {({ dragOver }) => <Catalog hide={dragOver !== undefined} />}
        </PageTreeStateContext.Consumer>
      </PageTreeProvider>
    </ThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
