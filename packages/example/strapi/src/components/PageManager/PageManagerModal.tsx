import React, { ChangeEvent, ReactElement, useRef, useState, KeyboardEvent } from 'react';
import { PageItemButton, PageManagerModalContainer } from './PageManager.styles';

interface PageManagerModalProps {
  page: PageEntity;
  onClose: () => void;
  onSave: (page: PageEntity) => void;
}

export const PageManagerModal = ({
  onClose,
  onSave,
  ...props
}: PageManagerModalProps): ReactElement => {
  const [page, setPage] = useState({ ...props.page });

  const wrapperRef = useRef(null);
  useTapOutside(wrapperRef, onClose);

  const handleChange = (e: KeyboardEvent<HTMLInputElement> | ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;

    if ((e as KeyboardEvent<HTMLInputElement>).key === 'Enter' && page.title !== '') {
      return onSave(page);
    }

    if ((e as KeyboardEvent<HTMLInputElement>).key === 'Escape') {
      return onClose();
    }

    setPage({ ...page, [name]: value });
  };

  return (
    <PageManagerModalContainer ref={wrapperRef} data-testid="edit-modal">
      <button onClick={onClose}>x</button>
      <label>
        <span>Edit title</span>
        <input
          autoFocus
          type="text"
          name="title"
          placeholder="The title of your page"
          data-testid="edit-input"
          defaultValue={page.title}
          onChange={handleChange}
          onKeyDown={handleChange}
        />
      </label>
      <label>
        <span>Edit path</span>
        <input
          type="text"
          name="path"
          placeholder="The path of your page"
          data-testid="edit-input"
          defaultValue={page.path}
          onChange={handleChange}
          onKeyDown={handleChange}
        />
      </label>
      <PageItemButton disabled={page.title === '' || page.path === ''} onClick={() => onSave(page)}>
        Save
      </PageItemButton>
    </PageManagerModalContainer>
  );
};
