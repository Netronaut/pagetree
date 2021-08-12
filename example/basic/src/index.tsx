import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
  Canvas,
  PageTreeProvider,
  PageNode,
  Catalog,
  RemoveDropArea,
  PageTreeStateContext,
} from '@pagio/builder';
import { components } from './catalog';
import { Header } from './components';
import { GlobalStyle } from './globalStyle';
import { AppRoot } from './components/components.styles';

const App = () => {
  const [pageTree, setPageTree] = useState<PageNode>(
    new PageNode({
      childNodes: [{ type: 'headline' }, { type: 'article-teaser', uuid: 'article' }],
    }),
  );
  const [preview, setPreview] = useState(true);

  const handleUpdate = (pageTree: PageNode) => {
    // eslint-disable-next-line no-console
    console.info('Page structure updated');
    // eslint-disable-next-line no-console
    console.log(pageTree.toString());
    setPageTree(pageTree);
  };

  return (
    <AppRoot>
      <GlobalStyle />
      <PageTreeProvider
        onUpdate={handleUpdate}
        pageTree={pageTree}
        preview={preview}
        components={components}
      >
        <Header preview={preview} setPreview={setPreview} />
        <Canvas />
        {!preview && (
          <PageTreeStateContext.Consumer>
            {({ dragOver, dataTransfer }) => {
              const elements = [];
              if (dataTransfer?.sourceId) {
                elements.push(<RemoveDropArea key="remove" />);
              }
              if (!dragOver) {
                elements.push(<Catalog key="catalog" />);
              }
              return elements;
            }}
          </PageTreeStateContext.Consumer>
        )}
      </PageTreeProvider>
    </AppRoot>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
