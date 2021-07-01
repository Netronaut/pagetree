import * as React from 'react';
import { useState } from 'react';
import { createUrlFromText } from '../../utils';
import S from './PageManager.styles';

type Props = {
  save: (title: string, url: string) => void;
};

export const PageManagerAddPage: React.FC<Props> = ({ save }) => {
  const [title, setTitle] = useState('');

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setTitle(value);
  };

  const handleClick = () => {
    const url = createUrlFromText(title);
    save(title, url);
    setTitle('');
  };

  const handleKeyDownEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && title != '') {
      const url = createUrlFromText(title);
      save(title, url);
      setTitle('');
    }
  };

  return (
    <>
      <S.PageManagerAdd>
        <input
          type="text"
          placeholder="Enter a title for the new page..."
          value={title}
          onChange={handleChange}
          onKeyDown={handleKeyDownEnter}
        />
        <button disabled={title == ''} onClick={handleClick}>
          Add page
        </button>
      </S.PageManagerAdd>
    </>
  );
};
