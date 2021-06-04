import React, { useCallback, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Optional } from './types/helpers';
import { TPage } from './types';
import { Item, Tree, TSide } from './utils/tree';
import { TreeContext } from './utils/context';
import { ManagementContext } from '../example/management/utils/context';
import { apiUrls } from '../example/management/apiUrls';
import { useModal } from './hooks';
import {
  ConstructorScreen,
  DroppableContent,
  SavePageContentBatton,
} from './componentsStyles';
import { Components } from './hocs/createCatalogComponent';
import { Direction } from './components/Direction';
import { AddComponents } from './components/AddComponents';
import { CatalogModal } from './components/Modal/CatalogModal';

export * from './hocs/createCatalogComponent';

const makeElementVisible = (elementId: string) => {
  if (elementId) {
    const draggedItem = document.getElementById(elementId);
    if (draggedItem) {
      draggedItem.style.opacity = '1';
    }
  }
};

type Props = {
  pageContent: TPage;
  onChange: (val: TPage) => void;
  showPreview?: boolean;
  components?: Components;
  componentGroups?: string[];
};

export const Builder: React.FC<Props> = ({
  pageContent,
  onChange,
  showPreview,
  components,
  componentGroups,
}) => {
  const { articles, changeArticles } = useContext(ManagementContext);

  const setValue = (newValue: Optional<TPage>) => {
    onChange({ ...pageContent, ...newValue });
  };

  const [pageContentWasChange, setPageContentWasChange] = useState(false);

  useEffect(() => {
    const currentArticleTitle = location.pathname.split('/')[2];
    const currentArticle = articles.find(
      article => article.link === `/${currentArticleTitle}`,
    );
    currentArticle && setValue(currentArticle.pageContent);
  }, [articles]);

  const putPageContent = useCallback(() => {
    const currentArticleTitle = location.pathname.split('/')[2];
    const currentArticle = articles.find(
      article => article.link === `/${currentArticleTitle}`,
    );

    currentArticle &&
      axios
        .put(`${apiUrls.aricles}/${currentArticle.id}`, {
          pageContent,
        })
        .then(response => {
          const copyArticles = articles.slice();
          const findedIndex = copyArticles.findIndex(
            article => article.id === response.data.id,
          );
          copyArticles.splice(findedIndex, 1, response.data);
          changeArticles(copyArticles);
          setPageContentWasChange(false);
        });
  }, [pageContent]);

  const { isModalShown, onModalShow, onModalClose } = useModal();

  const addNew = (
    e: React.DragEvent<HTMLDivElement>,
    toId?: string,
    side?: TSide,
  ) => {
    const type = e.dataTransfer.getData('newItemType');
    if (!type) {
      const fromId = e.dataTransfer.getData('fromId');
      makeElementVisible(fromId);
      return;
    }

    const tree = new Tree(pageContent.structure);

    tree.add(new Item({ type } as { type: string }), toId, side);
    setValue({ structure: tree.getValue() });
    setPageContentWasChange(true);
    onModalClose();
  };

  const add = (
    e: React.DragEvent<HTMLDivElement>,
    toId?: string,
    side?: TSide,
  ) => {
    const fromId = e.dataTransfer.getData('fromId');

    makeElementVisible(fromId);

    if (fromId === toId) {
      return;
    }
    if (!fromId) {
      return addNew(e, toId, side);
    }

    const tree = new Tree(pageContent.structure);

    const { removedItem, lastComponentId, removedContainerId } = tree.remove(
      fromId,
    );

    if (removedItem) {
      tree.add(
        removedItem,
        removedContainerId === toId ? lastComponentId : toId,
        side,
      );
      setValue({ structure: tree.getValue() });
    }
    setPageContentWasChange(true);
  };

  const onConfigChange = (
    id: string,
    field: string,
    newValue: string,
    userControlledId?: string,
  ) => {
    if (pageContent) {
      setValue({
        config: {
          ...(pageContent.config || {}),
          [id]: {
            ...(pageContent.config?.[id] || {}),
            [field]: newValue,
            userControlledId: userControlledId ?? '',
          },
        },
      });
      setPageContentWasChange(true);
    }
  };

  const remove = (id: string) => {
    if (id) {
      const tree = new Tree(pageContent.structure);
      tree.remove(id);
      setValue({ structure: tree.getValue() });
    }
  };

  const content = !!pageContent.structure ? (
    <Direction
      direction={pageContent.structure.direction}
      components={pageContent.structure.components}
    />
  ) : null;

  return (
    <TreeContext.Provider
      value={{
        add,
        onConfigChange,
        config: pageContent.config,
        showPreview,
        components,
        componentGroups,
      }}
    >
      <ConstructorScreen>
        {showPreview ? (
          content
        ) : (
          <>
            <DroppableContent
              id="droppable-content"
              onDragOver={e => e.preventDefault()}
              onDrop={addNew}
            >
              {content}
            </DroppableContent>
            {isModalShown ? (
              <CatalogModal onModalClose={onModalClose} />
            ) : (
              <AddComponents onModalShow={onModalShow} />
            )}
          </>
        )}
        <SavePageContentBatton
          onClick={putPageContent}
          hidden={!pageContentWasChange}
        >
          save
        </SavePageContentBatton>
      </ConstructorScreen>
    </TreeContext.Provider>
  );
};
