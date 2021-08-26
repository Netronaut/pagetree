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
import { ModalContainer, CloseButton, ModalInput, ModalLabel } from './Modal.styles';
import { CloseIcon } from '../icons';
import { Button } from '../Button';
import { LargerMedium, SmallerBold, Smaller, Default } from '../Typography';
import { color } from '../theme';

interface EditPageModalProps {
  page: PageEntity;
  onClose: () => MouseEventHandler;
  onSave: (page: PageEntity) => void;
}

export const EditPageModal = ({ onClose, onSave, page }: EditPageModalProps): ReactElement => {
  const [formState, setFormState] = useState({ ...page });
  const [errors, setErrors] = useState({} as { [key: string]: string | undefined });

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
    setErrors({ ...errors, [name]: validate(name, value) });
  };

  const validate = (name: string, value: string): string | undefined => {
    if (!value) return `The ${name} field must be filled`;
  };

  return (
    <ModalContainer ref={wrapperRef}>
      <CloseButton onClick={onClose}>
        <CloseIcon />
      </CloseButton>
      <LargerMedium>Edit Page</LargerMedium>
      <ModalLabel>
        <SmallerBold color={color.gray5}>Page title</SmallerBold>
        <ModalInput
          autoFocus
          type="text"
          name="title"
          placeholder="The title of your page"
          value={formState.title}
          isError={!!errors.title}
          onChange={handleChange}
          onKeyDown={handleChange}
          onBlur={handleChange}
        />
        <Smaller color={errors.title ? color.red : color.gray5}>
          {errors.title || 'Add a title identifiying your page in the page builder'}
        </Smaller>
      </ModalLabel>
      <ModalLabel>
        <SmallerBold color={color.gray5}>Page path</SmallerBold>
        <ModalInput
          type="text"
          name="path"
          placeholder="The path of your page"
          value={formState.path}
          isError={!!errors.path}
          onChange={handleChange}
          onKeyDown={handleChange}
          onBlur={handleChange}
        />
        <Smaller color={errors.path ? color.red : color.gray5}>
          {errors.path || 'Add a path relative to your base URL'}
        </Smaller>
      </ModalLabel>
      <Button secondary onClick={onSave}>
        Save
      </Button>
    </ModalContainer>
  );
};
