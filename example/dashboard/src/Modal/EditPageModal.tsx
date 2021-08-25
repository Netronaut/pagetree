import React, {
  ChangeEvent,
  ReactElement,
  useRef,
  useState,
  KeyboardEvent,
  MouseEventHandler,
} from 'react';
import { PageEntity } from '../../../strapi/src/types';
import { useTapOutside } from '../../../strapi/src/components/PageManager/hooks';
import { ModalContainer, CloseButton, ModalInput } from './Modal.styles';
import { CloseIcon } from '../icons';
import { Button } from '../Button';
import { LargerMedium, SmallerBold, Smaller, Default } from '../Typography';

interface EditPageModalProps {
  page: PageEntity;
  onClose: () => MouseEventHandler;
  onSave: (page: PageEntity) => void;
}

export const EditPageModal = ({ onClose, onSave, page }: EditPageModalProps): ReactElement => {
  const [formState, setFormState] = useState({ ...page });

  const wrapperRef = useRef(null);
  useTapOutside(wrapperRef, onClose);

  const handleChange = (e: KeyboardEvent<HTMLInputElement> | ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;

    if ((e as KeyboardEvent<HTMLInputElement>).key === 'Enter' && page.title !== '') {
      return onSave(formState);
    }

    if ((e as KeyboardEvent<HTMLInputElement>).key === 'Escape') {
      return onClose();
    }

    setFormState({ ...formState, [name]: value });
  };

  return (
    <ModalContainer ref={wrapperRef} data-testid="edit-modal">
      <CloseButton onClick={onClose}>
        <CloseIcon />
      </CloseButton>
      <LargerMedium>Edit Page</LargerMedium>
      <label>
        <SmallerBold>Page title</SmallerBold>
        <Default as="div">
          <ModalInput
            autoFocus
            type="text"
            name="title"
            placeholder="The title of your page"
            data-testid="edit-input"
            value={formState.title}
            defaultValue={page.title}
            onChange={handleChange}
            onKeyDown={handleChange}
          />
        </Default>
        <Smaller>Add a title identifiying your page in the page builder</Smaller>
      </label>
      <label>
        <SmallerBold>Page title</SmallerBold>
        <Default as="div">
          <ModalInput
            type="text"
            name="path"
            placeholder="The path of your page"
            data-testid="edit-input"
            value={formState.path}
            defaultValue={page.path}
            onChange={handleChange}
            onKeyDown={handleChange}
          />
        </Default>
        <Smaller>Add a path relative to your base URL</Smaller>
      </label>
      <Button secondary onClick={onSave}>
        Save
      </Button>
    </ModalContainer>
  );
};
