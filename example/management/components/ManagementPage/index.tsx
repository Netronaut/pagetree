import * as React from 'react';
import { useState, useContext } from 'react';
import axios from 'axios';
import { CreatePageForm } from './CreatePageForm';
import { PageList } from './PageList';
import { Modal } from './Modal';
import { Flex } from './PageItem';
import { apiUrls } from '../../apiUrls';
import { createUrlFromText } from '../../utils';
import { ManagementContext } from '../../utils/context';

export const ManagementPage: React.FC = () => {
  const { pages, changePages } = useContext(ManagementContext);

  const [editingPageId, seteditingPageId] = useState<number | undefined>(
    undefined,
  );

  const createPage = (title: string, link: string) => {
    axios
      .post(apiUrls.aricles, {
        title,
        link,
      })
      .then(response => {
        const copyPages = pages.slice();
        copyPages.push(response.data);
        changePages(copyPages);
      });
  };

  const handleOpenEdit = (id: number) => seteditingPageId(id);

  const handleCloseEdit = () => {
    seteditingPageId(undefined);
  };

  const handleSaveEdit = (id, value) => {
    seteditingPageId(undefined);
    axios
      .put(`${apiUrls.aricles}/${id}`, {
        title: value,
        link: createUrlFromText(value),
      })
      .then(response => {
        const copyPages = pages.slice();
        const findedIndex = copyPages.findIndex(
          page => page.id === response.data.id,
        );
        copyPages.splice(findedIndex, 1, response.data);
        changePages(copyPages);
      });
  };

  const handleRemove = (id: number) => {
    axios.delete(`${apiUrls.aricles}/${id}`).then(response => {
      const copyPages = pages.slice();
      const findedIndex = copyPages.findIndex(
        page => page.id === response.data.id,
      );
      copyPages.splice(findedIndex, 1);
      changePages(copyPages);
    });
  };

  return (
    <>
      <Flex flexDirection="column" alignItems="center" px={15}>
        <h1>Create Page</h1>
        <CreatePageForm save={createPage} />
        {pages.length && (
          <PageList
            pages={pages}
            openEdit={handleOpenEdit}
            remove={handleRemove}
          />
        )}
      </Flex>
      {editingPageId && (
        <Modal
          pageId={editingPageId}
          pages={pages}
          close={handleCloseEdit}
          save={handleSaveEdit}
        />
      )}
    </>
  );
};
