import React, { useState, ChangeEvent, ReactElement, KeyboardEvent } from 'react';
import slugify from 'slugify';
import { PageEntity } from '../../types';
import S from './PageManager.styles';

interface AddPageInputProps {
  onSave: (page: PageEntity) => void;
}

export const AddPageInput = ({ onSave }: AddPageInputProps): ReactElement => {
  const [title, setTitle] = useState('');

  const save = () => {
    onSave({ title, path: `/${slugify(title, { lower: true })}` });
    setTitle('');
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement> | KeyboardEvent<HTMLInputElement>) => {
    if ((e as KeyboardEvent<HTMLInputElement>).key === 'Enter' && title != '') {
      return save();
    }
    setTitle(e.currentTarget.value);
  };

  return (
    <S.AddPageInput>
      <input
        type="text"
        placeholder="Enter a title for the new page..."
        value={title}
        onChange={handleChange}
        onKeyDown={handleChange}
      />
      <S.PageItemButton disabled={title == ''} onClick={() => save()}>
        Add page
      </S.PageItemButton>
    </S.AddPageInput>
  );
};
