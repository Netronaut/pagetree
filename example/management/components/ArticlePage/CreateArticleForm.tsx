import React, { useState } from 'react';
import { createUrlFromText } from '../../utils';

type Props = {
  save: (title: string, url: string) => void;
};

export const CreateArticleForm: React.FC<Props> = ({ save }) => {
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
    if (e.key === 'Enter') {
      const url = createUrlFromText(title);
      save(title, url);
      setTitle('');
    }
  };

  return (
    <>
      <input
        type="text"
        name="new-link-name"
        placeholder="Enter the link name"
        value={title}
        onChange={handleChange}
        onKeyDown={handleKeyDownEnter}
      />
      <button onClick={handleClick}>Add link</button>
    </>
  );
};
