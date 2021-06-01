import React, { useState } from 'react';

type Props = {
  save: (value: string) => void;
};

export const CreateArticleForm: React.FC<Props> = ({ save }) => {
  const [linkValue, setLinkValue] = useState('');

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setLinkValue(value);
  };

  const handleClick = () => {
    save(linkValue);
    setLinkValue('');
  };

  const handleKeyDownEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') save(linkValue);
  };

  return (
    <>
      <input
        type="text"
        name="new-link-name"
        placeholder="Enter the link name"
        value={linkValue}
        onChange={handleChange}
        onKeyDown={handleKeyDownEnter}
      />
      <button onClick={handleClick}>Add link</button>
    </>
  );
};
