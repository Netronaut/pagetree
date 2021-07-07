import React, { ReactElement } from 'react';
import { useEffect, useRef, useState } from 'react';
import { PageEntity } from '../../types';
import { useTapOutside } from './hooks';
import S from './PageManager.styles';

interface PageManagerModalProps {
  pageId: number;
  pages: PageEntity[];
  onClose: () => void;
  onSave: ({ id, title, path }: { id: number; title: string; path: string }) => void;
}

export const PageManagerModal = ({
  pageId,
  pages,
  onClose,
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
    if (titleValue !== '' && e.key === 'Enter')
      onSave({ id: pageId, title: titleValue, path: pathValue });
    if (e.key === 'Escape') onClose();
  };

  return (
    <S.PageManagerModal ref={wrapperRef} data-testid="edit-modal">
      <button onClick={onClose}>x</button>
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
        onClick={() => onSave({ id: pageId, title: titleValue, path: pathValue })}
      >
        Save
      </S.PageItemButton>
    </S.PageManagerModal>
  );
};
