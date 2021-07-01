import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import S from './PageManager.styles';
import { TPageData } from '../../types';

type Props = {
  pageId: number;
  pages: TPageData[];
  close: () => void;
  save: (id: number, v: string) => void;
};

const useClickOutsede = (ref: React.RefObject<HTMLInputElement>, close: () => void) => {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLDivElement;
      if (ref && !ref.current?.contains(target)) close();
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [ref]);
};

export const PageManagerModal: React.FC<Props> = ({ pageId, pages, close, save }) => {
  const [editingPages, setEditingPage] = useState<TPageData | undefined>(undefined);

  useEffect(() => {
    const currentPages = pages.find((page) => {
      return page.id === pageId;
    });
    pageId && setEditingPage(currentPages);
  }, [pageId]);

  const [value, setValue] = useState('');

  const wrapperRef = useRef(null);
  useClickOutsede(wrapperRef, close);
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setValue(value);
  };

  const handleKeyDownEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (value !== '' && e.key === 'Enter') save(pageId, value);
    if (e.key === 'Escape') close();
  };

  return (
    <S.PageManagerModal ref={wrapperRef} data-testid="edit-modal">
      <button onClick={close}>x</button>
      <label>
        <span>Edit title</span>
        <input
          type="text"
          placeholder="The title of your page"
          data-testid="edit-input"
          defaultValue={editingPages?.title}
          onChange={handleChange}
          autoFocus
          onKeyDown={handleKeyDownEnter}
        />
      </label>
      <S.PageManagerRowButton disabled={value == ''} onClick={() => save(pageId, value)}>
        Save
      </S.PageManagerRowButton>
    </S.PageManagerModal>
  );
};
