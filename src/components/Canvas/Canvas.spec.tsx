import React, { ReactElement } from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { CatalogComponentDescription } from '../../types';
import { PageTreeProvider } from '../../provider';
import { PageNode, PageNodeType } from '../../pageTree';
import { Canvas } from '../../components';

describe('Canvas', () => {
  const MockArticleTeaser = ({ label }: CatalogComponentDescription): ReactElement => (
    <span>{label}</span>
  );
  MockArticleTeaser.type = 'article-teaser';
  MockArticleTeaser.label = 'Article Teaser';
  const components = [MockArticleTeaser];
  let pageTree: PageNode;

  beforeEach(() => {
    pageTree = new PageNode({ childNodes: [] });
  });

  it('should render an empty page tree', () => {
    const { container } = render(
      <PageTreeProvider components={components}>
        <Canvas />
      </PageTreeProvider>,
    );

    expect(container.querySelectorAll('[data-pagetree-root]')).toHaveLength(1);
    expect(container.querySelectorAll('[data-page-node-type]')).toHaveLength(0);
  });

  it('should add a new component to an empty page tree', () => {
    const { container } = render(
      <>
        <PageTreeProvider components={components}>
          <Canvas />
        </PageTreeProvider>
      </>,
    );

    expect(
      container.querySelectorAll(`[data-page-node-type="${PageNodeType.Track}"]`),
    ).toHaveLength(0);

    fireEvent.drop(container.querySelector('[data-pagetree-root]') as Element, {
      dataTransfer: {
        getData: () =>
          JSON.stringify({
            componentDescription: {
              type: 'article-teaser',
            },
          }),
      },
    });

    expect(
      container.querySelectorAll(`[data-page-node-type="${PageNodeType.Track}"]`),
    ).toHaveLength(1);
    expect(container.querySelectorAll('[data-page-node-type="article-teaser"]')).toHaveLength(1);
    expect(screen.getAllByText('Article Teaser')).toHaveLength(1);
  });

  it('should add a new component to an existing node list', () => {
    pageTree.append(new PageNode({ type: 'article-teaser' }));

    const { container } = render(
      <PageTreeProvider components={components} pageTree={pageTree}>
        <Canvas />
      </PageTreeProvider>,
    );

    fireEvent.drop(container.querySelector(`[data-pagetree-root]`) as Element, {
      dataTransfer: {
        getData: () =>
          JSON.stringify({
            componentDescription: {
              type: 'article-teaser',
            },
          }),
      },
    });

    expect(
      container.querySelectorAll(`[data-page-node-type="${PageNodeType.Track}"]`),
    ).toHaveLength(1);
    expect(container.querySelectorAll('[data-page-node-type="article-teaser"]')).toHaveLength(2);
    expect(screen.getAllByText('Article Teaser')).toHaveLength(2);
  });

  it('should add a new component after an existing component', () => {
    const targetId = 'targetId';

    pageTree.append(new PageNode({ type: 'article-teaser', uuid: targetId }));

    const { container } = render(
      <PageTreeProvider components={components} pageTree={pageTree}>
        <Canvas />
      </PageTreeProvider>,
    );

    const target = container.querySelector(`[id="${targetId}"]`) as Element;
    fireEvent.drop(target, {
      dataTransfer: {
        getData: () =>
          JSON.stringify({
            componentDescription: {
              type: 'article-teaser',
            },
          }),
      },
    });

    expect(
      container.querySelectorAll(`[data-page-node-type="${PageNodeType.Track}"]`),
    ).toHaveLength(1);
    const nodes = container.querySelectorAll('[data-page-node-type="article-teaser"]');
    expect(nodes).toHaveLength(2);
    expect(nodes[0].getAttribute('id')).toBe(targetId);
    expect(screen.getAllByText('Article Teaser')).toHaveLength(2);
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
      <PageTreeProvider components={components} pageTree={pageTree}>
        <Canvas />
      </PageTreeProvider>,
    );

    expect(
      container.querySelectorAll(`[data-page-node-type="${PageNodeType.Track}"]`),
    ).toHaveLength(2);
    expect(container.querySelectorAll('[data-page-node-type="article-teaser"]')).toHaveLength(2);
    expect(screen.getAllByText('Article Teaser')).toHaveLength(2);

    fireEvent.drop(container.querySelector(`[id="${targetId}"]`) as Element, {
      dataTransfer: {
        getData: () =>
          JSON.stringify({
            componentDescription: {
              type: 'article-teaser',
            },
          }),
      },
    });

    expect(
      container.querySelectorAll(`[data-page-node-type="${PageNodeType.Track}"]`),
    ).toHaveLength(2);
    expect(container.querySelectorAll('[data-page-node-type="article-teaser"]')).toHaveLength(3);
    expect(screen.getAllByText('Article Teaser')).toHaveLength(3);
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
      <PageTreeProvider components={components} pageTree={pageTree}>
        <Canvas />
      </PageTreeProvider>,
    );

    expect(
      container.querySelectorAll(`[data-page-node-type="${PageNodeType.Track}"]`),
    ).toHaveLength(1);
    expect(container.querySelectorAll('[data-page-node-type="article-teaser"]')).toHaveLength(2);
    expect(screen.getAllByText('Article Teaser')).toHaveLength(2);

    // console.log(container.querySelector(`[id="${targetId}"]`)?.getAttribute('id'));

    fireEvent.drop(container.querySelector(`[id="${targetId}"]`) as Element, {
      dataTransfer: {
        getData: () =>
          JSON.stringify({
            componentDescription: {
              type: 'article-teaser',
            },
          }),
      },
    });

    const nodes = container.querySelectorAll('[data-page-node-type="article-teaser"]');
    expect(nodes).toHaveLength(3);
    expect(nodes[0].getAttribute('id')).toBe(targetId);
    expect(nodes[2].getAttribute('id')).toBe(secondId);
  });
});
