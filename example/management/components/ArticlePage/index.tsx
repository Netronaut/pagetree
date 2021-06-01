import React, { useState } from 'react';

type Props = {
  prop?: (val: any) => void;
};

export const ArticlePage: React.FC<Props> = ({ prop }) => {
  const [value, setValue] = useState('');
  const [link, setLInk] = useState('');

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setValue(value);
  };

  const createUrlFromText = (text: string) => {
    return (
      '/' +
      text
        .split('')
        .map(littera => {
          if (littera === ' ') return '-';
          return littera;
        })
        .join('')
        .toLowerCase()
    );
  };

  return (
    <>
      <h1>Create Article</h1>
      <input onChange={handleChange} />
      <button onClick={() => setLInk(createUrlFromText(value))}>
        create link
      </button>
      <h3>{link}</h3>
    </>
  );
};
