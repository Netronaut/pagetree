import React, { ChangeEvent, ReactElement, useRef, useState, KeyboardEvent } from 'react';
import omit from 'lodash.omit';
import isEmpty from 'lodash.isempty';
import { CloseIcon } from '../icons';
import { Button } from '../Button';
import { LargerMedium, SmallerBold, Smaller } from '../Typography';
import { color } from '../theme';
import { Input } from '../Input';
import { PageEntity } from '../types';
import { useTapOutside } from './useTapOutside';
import { ModalContainer, CloseButton, ModalLabel, ModalBg } from './Modal.styles';

interface EditPageModalProps {
  page: Partial<PageEntity>;
  onClose: () => void;
  onSave: (page: PageEntity) => void;
}

const validate = (name: string, value: string): string | undefined => {
  if (!value) {
    return `The ${name} field must be filled`;
  }
};

type EditPageModalErrors = Record<string, string | undefined>;

export const EditPageModal = ({ onClose, onSave, page }: EditPageModalProps): ReactElement => {
  const [formState, setFormState] = useState<Partial<PageEntity>>({ ...page });
  const [errors, setErrors] = useState<EditPageModalErrors>({});

  const wrapperRef = useRef(null);
  useTapOutside(wrapperRef, onClose);

  const handleChange = (e: KeyboardEvent<HTMLInputElement> | ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;

    if ((e as KeyboardEvent<HTMLInputElement>).key === 'Enter' && isEmpty(errors)) {
      return onSave(formState as PageEntity);
    }

    if ((e as KeyboardEvent<HTMLInputElement>).key === 'Escape') {
      return onClose();
    }

    setFormState({ ...formState, [name]: value });

    const newErrors = omit<EditPageModalErrors>(errors, [name]);
    const error = validate(name, value);
    if (error) {
      newErrors[name] = error;
    }
    setErrors(newErrors);
  };

  return (
    <>
      <ModalBg />

      <ModalContainer ref={wrapperRef}>
        <CloseButton onClick={onClose}>
          <CloseIcon />
        </CloseButton>
        <LargerMedium>Edit Page</LargerMedium>
        <ModalLabel>
          <SmallerBold color={color.gray2}>Page title</SmallerBold>
          <Input
            autoFocus
            type="text"
            name="title"
            placeholder="The title of your page"
            value={formState.title}
            onChange={handleChange}
            onKeyDown={handleChange}
            onBlur={handleChange}
          />
          <Smaller color={errors.title ? color.red : color.gray2}>
            {errors.title || 'Add a title identifiying your page in the page builder'}
          </Smaller>
        </ModalLabel>
        <ModalLabel>
          <SmallerBold color={color.gray2}>Page path</SmallerBold>
          <Input
            type="text"
            name="path"
            placeholder="The path of your page"
            value={formState.path}
            onChange={handleChange}
            onKeyDown={handleChange}
            onBlur={handleChange}
          />
          <Smaller color={errors.path ? color.red : color.gray2}>
            {errors.path || 'Add a path relative to your base URL'}
          </Smaller>
        </ModalLabel>
        <Button secondary onClick={() => isEmpty(errors) && onSave(formState as PageEntity)}>
          Save
        </Button>
      </ModalContainer>
    </>
  );
};
