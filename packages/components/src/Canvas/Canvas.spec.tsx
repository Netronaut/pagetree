import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { PageNode, PageNodeType, PageTreeProvider } from '@pagetree/builder';
import { Catalog } from '../Catalog';
import * as theme from '../theme';
import { Canvas } from './Canvas';
import { ThemeProvider } from 'styled-components';

describe('Canvas', () => {
  const components = [{ type: 'article-teaser', label: 'Article Teaser' }];
  let pageTree: PageNode;

  beforeEach(() => {
    pageTree = new PageNode({ childNodes: [] });
  });

  it('should render an empty page tree', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <PageTreeProvider components={components}>
          <Canvas />
        </PageTreeProvider>
      </ThemeProvider>,
    );

    expect(container.querySelectorAll('[data-pagetree-root]')).toHaveLength(1);
    expect(container.querySelectorAll('[data-page-node-type]')).toHaveLength(0);
  });

  it('should add a new component to an empty page tree', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <PageTreeProvider components={components}>
          <Canvas />
          <Catalog expanded={true} />
        </PageTreeProvider>
      </ThemeProvider>,
    );

    expect(
      container.querySelectorAll(`[data-page-node-type="${PageNodeType.Track}"]`),
    ).toHaveLength(0);

    fireEvent.dragStart(container.querySelector('[data-component-description]') as Element);
    fireEvent.drop(container.querySelector('[data-pagetree-root]') as Element);

    expect(
      container.querySelectorAll(`[data-page-node-type="${PageNodeType.Track}"]`),
    ).toHaveLength(1);
    expect(container.querySelectorAll('[data-page-node-type="article-teaser"]')).toHaveLength(1);
  });

  it('should add a new component to an existing node list', () => {
    pageTree.append(new PageNode({ type: 'article-teaser' }));

    const { container } = render(
      <ThemeProvider theme={theme}>
        <PageTreeProvider components={components} pageTree={pageTree}>
          <Canvas />
          <Catalog expanded={true} />
        </PageTreeProvider>
      </ThemeProvider>,
    );

    fireEvent.dragStart(container.querySelector('[data-component-description]') as Element);
    fireEvent.drop(container.querySelector('[data-pagetree-root]') as Element);

    expect(
      container.querySelectorAll(`[data-page-node-type="${PageNodeType.Track}"]`),
    ).toHaveLength(1);
    expect(container.querySelectorAll('[data-page-node-type="article-teaser"]')).toHaveLength(2);
  });

  it('should add a new component after an existing component', () => {
    const targetId = 'targetId';

    pageTree.append(new PageNode({ type: 'article-teaser', uuid: targetId }));

    const { container } = render(
      <ThemeProvider theme={theme}>
        <PageTreeProvider components={components} pageTree={pageTree}>
          <Canvas />
          <Catalog expanded={true} />
        </PageTreeProvider>
      </ThemeProvider>,
    );

    fireEvent.dragStart(container.querySelector('[data-component-description]') as Element);
    fireEvent.drop(container.querySelector(`[id="${targetId}"]`) as Element);

    expect(
      container.querySelectorAll(`[data-page-node-type="${PageNodeType.Track}"]`),
    ).toHaveLength(1);
    const nodes = container.querySelectorAll('[data-page-node-type="article-teaser"]');
    expect(nodes).toHaveLength(2);
    expect(nodes[0].getAttribute('id')).toBe(targetId);
  });

  it('should add a new component next to a deep nested component', () => {
    const targetId = 'targetId';

    pageTree
      .append(new PageNode({ type: 'article-teaser' }))
      .append(
        new PageNode({ childNodes: [] }).append(
          new PageNode({ type: 'article-teaser', uuid: targetId }),
        ),
      );

    const { container } = render(
      <ThemeProvider theme={theme}>
        <PageTreeProvider components={components} pageTree={pageTree}>
          <Canvas />
          <Catalog expanded={true} />
        </PageTreeProvider>
      </ThemeProvider>,
    );

    expect(
      container.querySelectorAll(`[data-page-node-type="${PageNodeType.Track}"]`),
    ).toHaveLength(2);
    expect(container.querySelectorAll('[data-page-node-type="article-teaser"]')).toHaveLength(2);

    fireEvent.dragStart(container.querySelector('[data-component-description]') as Element);
    fireEvent.drop(container.querySelector(`[id="${targetId}"]`) as Element);

    expect(
      container.querySelectorAll(`[data-page-node-type="${PageNodeType.Track}"]`),
    ).toHaveLength(2);
    expect(container.querySelectorAll('[data-page-node-type="article-teaser"]')).toHaveLength(3);
  });

  it('should add a new component between two existing components', () => {
    const targetId = 'insertRef';
    const secondId = 'secondId';

    pageTree = new PageNode({
      childNodes: [
        { uuid: targetId, type: 'article-teaser' },
        { uuid: secondId, type: 'article-teaser' },
      ],
    });

    const { container } = render(
      <ThemeProvider theme={theme}>
        <PageTreeProvider components={components} pageTree={pageTree}>
          <Canvas />
          <Catalog expanded={true} />
        </PageTreeProvider>
      </ThemeProvider>,
    );

    expect(
      container.querySelectorAll(`[data-page-node-type="${PageNodeType.Track}"]`),
    ).toHaveLength(1);
    expect(container.querySelectorAll('[data-page-node-type="article-teaser"]')).toHaveLength(2);

    fireEvent.dragStart(container.querySelector('[data-component-description]') as Element);
    fireEvent.drop(container.querySelector(`[id="${targetId}"]`) as Element);

    const nodes = container.querySelectorAll('[data-page-node-type="article-teaser"]');
    expect(nodes).toHaveLength(3);
    expect(nodes[0].getAttribute('id')).toBe(targetId);
    expect(nodes[2].getAttribute('id')).toBe(secondId);
  });
});
