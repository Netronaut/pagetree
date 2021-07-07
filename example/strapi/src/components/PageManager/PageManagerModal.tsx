import React, { ReactElement } from 'react';
import { useEffect, useRef, useState } from 'react';
import S from './PageManager.styles';
import { PageEntity } from '../../types';
import { useTapOutside } from './hooks';

interface PageManagerModalProps {
  pageId: number;
  pages: PageEntity[];
  close: () => void;
  onSave: (id: number, title: string, path: string) => void;
}

export const PageManagerModal = ({
  pageId,
  pages,
  close,
  onSave,
}: PageManagerModalProps): ReactElement => {
  const [editingPages, setEditingPage] = useState<PageEntity | undefined>(undefined);

  useEffect(() => {
    const currentPages = pages.find((page) => {
      return page.id === pageId;
    });
    pageId && setEditingPage(currentPages);
  }, [pageId]);

  const [titleValue, setTitleValue] = useState(editingPages?.title || '');
  const [pathValue, setPathValue] = useState(editingPages?.path || '');

  useEffect(() => {
    editingPages?.title && setTitleValue(editingPages.title);
    editingPages?.path && setPathValue(editingPages.path);
  }, [editingPages]);

  const wrapperRef = useRef(null);
  useTapOutside(wrapperRef, onClose);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;
    if (name === 'title') setTitleValue(value);
    if (name === 'path') setPathValue(value);
  };

  const handleKeyDownEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (titleValue !== '' && e.key === 'Enter') onSave(pageId, titleValue, pathValue);
    if (e.key === 'Escape') close();
  };

  return (
    <S.PageManagerModal ref={wrapperRef} data-testid="edit-modal">
      <button onClick={close}>x</button>
      <label>
        <span>Edit title</span>
        <input
          type="text"
          name="title"
          placeholder="The title of your page"
          data-testid="edit-input"
          defaultValue={editingPages?.title}
          onChange={handleChange}
          autoFocus
          onKeyDown={handleKeyDownEnter}
        />
      </label>
      <label>
        <span>Edit path</span>
        <input
          type="text"
          name="path"
          placeholder="The path of your page"
          data-testid="edit-input"
          defaultValue={editingPages?.path}
          onChange={handleChange}
          onKeyDown={handleKeyDownEnter}
        />
      </label>
      <S.PageItemButton
        disabled={titleValue == '' && pathValue == ''}
        onClick={() => onSave(pageId, titleValue, pathValue)}
      >
        Save
      </S.PageItemButton>
    </S.PageManagerModal>
  );
};
